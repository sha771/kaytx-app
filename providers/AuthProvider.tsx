import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { trpc } from '@/lib/trpc';
import { advancedAudit, AuditEventType, AuditSeverity } from '@/lib/advanced-audit-stub';
import { encryptionAtRest } from '@/utils/encryptionAtRest';
import { monitoring } from '@/utils/monitoring';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  role: string;
  avatar?: string;
  organizationId?: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  status?: string;
  failedLoginAttempts?: number;
  accountLockedUntil?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ userId: string; email: string; verificationToken?: string }>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = trpc.auth.login.useMutation();
  const registerMutation = trpc.auth.register.useMutation();
  const verifyEmailMutation = trpc.auth.verifyEmail.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();
  const refreshMutation = trpc.auth.refreshToken.useMutation();

  const loadStoredAuth = useCallback(async () => {
    try {
      const endTimer = monitoring.startTimer('auth_load');
      
      const [storedToken, storedUser] = await Promise.all([
        encryptionAtRest.secureRetrieve(AUTH_TOKEN_KEY),
        encryptionAtRest.secureRetrieve(USER_DATA_KEY),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        advancedAudit.log({
          type: AuditEventType.USER_LOGIN,
          severity: AuditSeverity.INFO,
          action: 'Session restored from storage',
          result: 'success',
        });
        
        monitoring.info('auth', 'Session restored successfully');
      }
      
      endTimer();
    } catch (error) {
      console.error('[AuthProvider] Failed to load stored auth:', error);
      monitoring.error('auth', 'Failed to load stored auth', error as Error);
      await clearStoredAuth();
    } finally {
      // Ensure loading state is set to false even if there are errors
      setTimeout(() => setIsLoading(false), 0);
    }
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  const clearStoredAuth = async () => {
    try {
      await Promise.all([
        encryptionAtRest.secureDelete(AUTH_TOKEN_KEY),
        encryptionAtRest.secureDelete(REFRESH_TOKEN_KEY),
        encryptionAtRest.secureDelete(USER_DATA_KEY),
      ]);
    } catch (error) {
      console.error('[AuthProvider] Failed to clear stored auth:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const endTimer = monitoring.startTimer('auth_login');
      
      const result = await loginMutation.mutateAsync({ email, password });

      const userData: User = {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        name: `${result.user.firstName} ${result.user.lastName}`,
        role: result.user.role,
        organizationId: result.user.organizationId,
      };

      await Promise.all([
        encryptionAtRest.secureStore(AUTH_TOKEN_KEY, result.token),
        encryptionAtRest.secureStore(REFRESH_TOKEN_KEY, result.refreshToken),
        encryptionAtRest.secureStore(USER_DATA_KEY, JSON.stringify(userData)),
      ]);

      setToken(result.token);
      setUser(userData);

      advancedAudit.log({
        type: AuditEventType.USER_LOGIN,
        severity: AuditSeverity.INFO,
        userId: userData.id,
        userEmail: userData.email,
        action: 'User logged in successfully',
        result: 'success',
      });

      monitoring.info('auth', 'Login successful', { userId: userData.id });
      endTimer();
    } catch (error) {
      advancedAudit.log({
        type: AuditEventType.USER_LOGIN,
        severity: AuditSeverity.WARNING,
        userEmail: email,
        action: 'Login attempt failed',
        result: 'failure',
        errorMessage: (error as Error).message,
      });

      monitoring.error('auth', 'Login failed', error as Error, { email });
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const endTimer = monitoring.startTimer('auth_register');
      
      const result = await registerMutation.mutateAsync({
        email,
        password,
        firstName,
        lastName,
        termsAccepted: true,
        privacyPolicyAccepted: true,
      });

      advancedAudit.log({
        type: AuditEventType.USER_REGISTER,
        severity: AuditSeverity.INFO,
        userId: result.userId,
        userEmail: result.email,
        action: 'User registered successfully',
        result: 'success',
      });

      monitoring.info('auth', 'Registration successful', { userId: result.userId });
      endTimer();

      return {
        userId: result.userId,
        email: result.email,
        verificationToken: (result as any).verificationToken,
      };
    } catch (error) {
      advancedAudit.log({
        type: AuditEventType.USER_REGISTER,
        severity: AuditSeverity.WARNING,
        userEmail: email,
        action: 'Registration attempt failed',
        result: 'failure',
        errorMessage: (error as Error).message,
      });

      monitoring.error('auth', 'Registration failed', error as Error, { email });
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    await verifyEmailMutation.mutateAsync({ token });
  };

  const logout = async () => {
    try {
      const endTimer = monitoring.startTimer('auth_logout');
      
      if (token) {
        await logoutMutation.mutateAsync();
      }

      await clearStoredAuth();
      
      const userId = user?.id;
      setToken(null);
      setUser(null);

      advancedAudit.log({
        type: AuditEventType.USER_LOGOUT,
        severity: AuditSeverity.INFO,
        ...(userId !== undefined ? { userId } : {}),
        action: 'User logged out successfully',
        result: 'success',
      });

      monitoring.info('auth', 'Logout successful', { userId });
      endTimer();
    } catch (error) {
      console.error('[AuthProvider] Logout failed:', error);
      monitoring.error('auth', 'Logout failed', error as Error);
      await clearStoredAuth();
      setToken(null);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = await encryptionAtRest.secureRetrieve(REFRESH_TOKEN_KEY);
      
      if (!storedRefreshToken) {
        throw new Error('No refresh token available');
      }

      const result = await refreshMutation.mutateAsync({
        refreshToken: storedRefreshToken,
      });

      await encryptionAtRest.secureStore(AUTH_TOKEN_KEY, result.token);

      setToken(result.token);

      monitoring.info('auth', 'Token refreshed successfully');
    } catch (error) {
      console.error('[AuthProvider] Token refresh failed:', error);
      monitoring.error('auth', 'Token refresh failed', error as Error);
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    verifyEmail,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
