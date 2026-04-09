/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { apiClient, apiCall, setAuthToken, clearAuthToken, APIError } from '../lib/trpc-client';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'enterprise_admin' | 'admin' | 'user';
  status: 'active' | 'suspended' | 'deleted' | 'pending';
  organizationId: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
  deviceId?: string;
  totp?: string;
  recoveryCode?: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from storage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Validate token with backend
      const result = await apiCall(() => apiClient.auth.me.query());
      
      if (result.data) {
        setAuthState({
          user: result.data,
          token,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        // Token is invalid, clear it
        clearAuthToken();
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      clearAuthToken();
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const result = await apiCall(() => 
        apiClient.auth.login.mutate(credentials)
      );

      if (result.data) {
        const { token, refreshToken, userId, organizationId, email } = result.data;
        
        // Store tokens
        setAuthToken(token);
        localStorage.setItem('refreshToken', refreshToken);

        // Get user details
        const userResult = await apiCall(() => apiClient.auth.me.query());
        
        if (userResult.data) {
          setAuthState({
            user: userResult.data,
            token,
            isLoading: false,
            isAuthenticated: true,
          });

          // Navigate to main app
          router.replace('/(tabs)');
          return { success: true, user: userResult.data };
        }
      }

      throw new Error('Login failed');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      if (error instanceof APIError) {
        return { 
          success: false, 
          error: error.message,
          code: error.code 
        };
      }
      
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const result = await apiCall(() => 
        apiClient.auth.register.mutate(data)
      );

      if (result.data) {
        const { token, refreshToken, userId, organizationId, email } = result.data;
        
        // Store tokens
        setAuthToken(token);
        localStorage.setItem('refreshToken', refreshToken);

        // Get user details
        const userResult = await apiCall(() => apiClient.auth.me.query());
        
        if (userResult.data) {
          setAuthState({
            user: userResult.data,
            token,
            isLoading: false,
            isAuthenticated: true,
          });

          // Navigate to email verification or main app
          if (!userResult.data.emailVerified) {
            router.replace('/auth/verify-email');
          } else {
            router.replace('/(tabs)');
          }
          
          return { success: true, user: userResult.data };
        }
      }

      throw new Error('Registration failed');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      if (error instanceof APIError) {
        return { 
          success: false, 
          error: error.message,
          code: error.code 
        };
      }
      
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call backend logout
      await apiCall(() => apiClient.auth.logout.mutate());
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local state regardless of API call success
      clearAuthToken();
      localStorage.removeItem('refreshToken');
      
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

      // Navigate to login
      router.replace('/auth/login');
    }
  }, []);

  const verifyEmail = useCallback(async (token: string, verificationCode?: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.auth.verifyEmail.mutate({ token, verificationCode })
      );

      if (result.data) {
        // Refresh user data
        await initializeAuth();
        return { success: true };
      }

      throw new Error('Email verification failed');
    } catch (error) {
      if (error instanceof APIError) {
        return { 
          success: false, 
          error: error.message,
          code: error.code 
        };
      }
      
      return { 
        success: false, 
        error: 'Email verification failed. Please try again.' 
      };
    }
  }, [initializeAuth]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.auth.resetPassword.mutate({ email })
      );

      return { 
        success: true, 
        message: 'Password reset email sent. Please check your inbox.' 
      };
    } catch (error) {
      if (error instanceof APIError) {
        return { 
          success: false, 
          error: error.message,
          code: error.code 
        };
      }
      
      return { 
        success: false, 
        error: 'Password reset failed. Please try again.' 
      };
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const result = await apiCall(() => 
        apiClient.auth.refreshToken.mutate({ refreshToken })
      );

      if (result.data) {
        const { token: newToken, refreshToken: newRefreshToken } = result.data;
        
        setAuthToken(newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        return { success: true };
      }

      throw new Error('Token refresh failed');
    } catch (error) {
      // Refresh failed, logout user
      await logout();
      return { success: false };
    }
  }, [logout]);

  // MFA functions
  const getMFAStatus = useCallback(async () => {
    try {
      const result = await apiCall(() => apiClient.auth.mfa.status.query());
      return { success: true, data: result.data };
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Failed to get MFA status' };
    }
  }, []);

  const setupMFA = useCallback(async () => {
    try {
      const result = await apiCall(() => apiClient.auth.mfa.setup.mutate());
      return { success: true, data: result.data };
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Failed to setup MFA' };
    }
  }, []);

  const enableMFA = useCallback(async (totp: string) => {
    try {
      const result = await apiCall(() => apiClient.auth.mfa.enable.mutate({ totp }));
      
      if (result.data) {
        // Refresh user data
        await initializeAuth();
        return { success: true };
      }
      
      throw new Error('Failed to enable MFA');
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Failed to enable MFA' };
    }
  }, [initializeAuth]);

  const disableMFA = useCallback(async (totp: string) => {
    try {
      const result = await apiCall(() => apiClient.auth.mfa.disable.mutate({ totp }));
      
      if (result.data) {
        // Refresh user data
        await initializeAuth();
        return { success: true };
      }
      
      throw new Error('Failed to disable MFA');
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Failed to disable MFA' };
    }
  }, [initializeAuth]);

  // SSO functions
  const startSSOFlow = useCallback(async (provider: 'oidc' | 'saml', orgSlug: string) => {
    try {
      if (provider === 'oidc') {
        const result = await apiCall(() => 
          apiClient.auth.sso.oidcStart.mutate({ orgSlug })
        );
        return { success: true, data: result.data };
      } else {
        const result = await apiCall(() => 
          apiClient.auth.sso.samlStart.mutate({ orgSlug })
        );
        return { success: true, data: result.data };
      }
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Failed to start SSO flow' };
    }
  }, []);

  const handleSSOCallback = useCallback(async (
    provider: 'oidc' | 'saml', 
    orgSlug: string, 
    params: any
  ) => {
    try {
      let result;
      
      if (provider === 'oidc') {
        result = await apiCall(() => 
          apiClient.auth.sso.oidcCallback.mutate(params)
        );
      } else {
        result = await apiCall(() => 
          apiClient.auth.sso.samlCallback.mutate({ orgSlug, ...params })
        );
      }

      if (result.data) {
        const { token, refreshToken } = result.data;
        
        // Store tokens
        setAuthToken(token);
        localStorage.setItem('refreshToken', refreshToken);

        // Get user details
        const userResult = await apiCall(() => apiClient.auth.me.query());
        
        if (userResult.data) {
          setAuthState({
            user: userResult.data,
            token,
            isLoading: false,
            isAuthenticated: true,
          });

          router.replace('/(tabs)');
          return { success: true, user: userResult.data };
        }
      }

      throw new Error('SSO callback failed');
    } catch (error) {
      if (error instanceof APIError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'SSO authentication failed' };
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    verifyEmail,
    resetPassword,
    refreshToken,
    getMFAStatus,
    setupMFA,
    enableMFA,
    disableMFA,
    startSSOFlow,
    handleSSOCallback,
  };
}

// Permission checking utility
export function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = useCallback((permission: string) => {
    if (!user) return false;
    
    // Super admin has all permissions
    if (user.role === 'super_admin') return true;
    
    // Check role-based permissions
    const rolePermissions = {
      enterprise_admin: [
        'user_manage', 'team_manage', 'billing_manage', 'settings_manage'
      ],
      admin: [
        'user_read', 'team_read', 'analytics_read'
      ],
      user: [
        'profile_read', 'profile_update'
      ]
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  }, [user]);
  
  const hasRole = useCallback((role: string) => {
    return user?.role === role;
  }, [user]);
  
  return { hasPermission, hasRole };
}
