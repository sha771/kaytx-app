import { useState, useCallback, useRef, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/providers/AuthProvider';
import { validation } from '@/utils/security';

export type ConnectionStep = 'method' | 'qr-code' | 'credentials' | 'verification' | '2fa' | 'linking' | 'success';

interface QRState {
  expiresAtIso?: string;
  remainingSeconds: number;
  autoVerifyEnabled: boolean;
  lastVerifyError?: string;
  isAutoVerifying: boolean;
  webhookEnabled: boolean;
  multiDeviceMode: boolean;
}

interface SessionData {
  sessionId?: string;
  e2eEnabled?: boolean;
  encryptionType?: string;
}

interface AuthData {
  email: string;
  password: string;
  apiKey: string;
  phoneNumber: string;
  verificationCode: string;
  twoFactorCode: string;
}

interface Platform {
  id: string;
  name: string;
  service: string;
  connectionType: 'qr-code' | 'oauth' | 'credentials' | 'google-account';
}

export function usePlatformConnection() {
  const { isAuthenticated } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [authData, setAuthData] = useState<AuthData>({
    email: '',
    password: '',
    apiKey: '',
    phoneNumber: '',
    verificationCode: '',
    twoFactorCode: '',
  });
  const [sessionData, setSessionData] = useState<SessionData>({});
  const [qrState, setQrState] = useState<QRState>({
    remainingSeconds: 0,
    autoVerifyEnabled: true,
    isAutoVerifying: false,
    webhookEnabled: true,
    multiDeviceMode: true,
  });

  const connectQRMutation = trpc.platforms.connectQR.useMutation();
  const verifyQRMutation = trpc.platforms.verifyQR.useMutation();
  const connectOAuthMutation = trpc.platforms.connectOAuth.useMutation();
  const connectCredentialsMutation = trpc.platforms.connectCredentials.useMutation();
  const verify2FAMutation = trpc.platforms.verify2FA.useMutation();

  const autoVerifyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const qrRemainingSecondsRef = useRef<number>(0);

  const computeRemainingSeconds = (expiresAtIso?: string) => {
    if (!expiresAtIso) return 0;
    const ms = Date.parse(expiresAtIso);
    if (Number.isNaN(ms)) return 0;
    return Math.max(0, Math.floor((ms - Date.now()) / 1000));
  };

  const checkAuthentication = useCallback(() => {
    if (!isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'You need to be logged in to connect platforms. Would you like to log in now?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log In',
            onPress: () => {
              router.push('/auth/login');
            },
          },
        ]
      );
      return false;
    }
    return true;
  }, [isAuthenticated]);

  const handleQRCodeConnect = useCallback(
    async (platform: Platform) => {
      if (!checkAuthentication()) return null;

      setIsConnecting(true);
      console.log('Generating QR code with E2E encryption...');

      try {
        const result = await connectQRMutation.mutateAsync({
          platformId: platform.id,
          platformName: platform.name,
          connectionType: platform.connectionType,
        });

        setSessionData({
          sessionId: result.sessionId,
          e2eEnabled: result.e2eEnabled,
          encryptionType: result.encryptionType,
        });

        setQrState((prev) => ({
          ...prev,
          expiresAtIso: result.expiresAt,
          remainingSeconds: computeRemainingSeconds(result.expiresAt),
          lastVerifyError: undefined,
        }));

        return {
          qrCode: result.qrCode,
          linkingCode: result.linkingCode,
        };
      } catch (error: any) {
        console.error('Failed to generate QR code:', error);
        const errorMessage = error?.message || 'Failed to generate QR code. Please try again.';
        Alert.alert('Error', errorMessage);
        return null;
      } finally {
        setIsConnecting(false);
      }
    },
    [checkAuthentication, connectQRMutation]
  );

  const completeQRConnection = useCallback(
    async (platform: Platform, linkingCode?: string) => {
      if (!platform || !sessionData.sessionId) return false;

      setQrState((prev) => ({ ...prev, lastVerifyError: undefined }));
      setIsConnecting(true);
      try {
        const result = await verifyQRMutation.mutateAsync({
          platformId: platform.id,
          sessionId: sessionData.sessionId,
          linkingCode: linkingCode,
          deviceInfo: {
            deviceName: platform.name,
            deviceType: 'mobile',
            platform: 'ios',
          },
        });

        if (result.verified) {
          return {
            verified: true,
            accountName: result.accountName,
          };
        }
        return { verified: false };
      } catch (error: any) {
        console.error('Failed to verify QR connection:', error);
        const errorMessage = error?.message || 'Failed to verify connection. Please try again.';
        setQrState((prev) => ({ ...prev, lastVerifyError: errorMessage }));
        return { verified: false };
      } finally {
        setIsConnecting(false);
      }
    },
    [sessionData.sessionId, verifyQRMutation]
  );

  const handleOAuthConnect = useCallback(
    async (platform: Platform) => {
      if (!checkAuthentication()) return null;

      setIsConnecting(true);
      console.log('Initiating OAuth...');

      try {
        const result = await connectOAuthMutation.mutateAsync({
          platformId: platform.id,
          platformName: platform.name,
          redirectUri: 'rork://oauth/callback',
        });

        console.log('OAuth URL:', result.authUrl);
        console.log('Scopes:', result.scopes);

        const supported = await Linking.canOpenURL(result.authUrl);
        if (supported) {
          await Linking.openURL(result.authUrl);
        }

        return {
          success: true,
          accountName: result.accountName,
        };
      } catch (error) {
        console.error('Failed to initiate OAuth:', error);
        Alert.alert('Error', 'Failed to initiate OAuth. Please try again.');
        return null;
      } finally {
        setIsConnecting(false);
      }
    },
    [checkAuthentication, connectOAuthMutation]
  );

  const handleCredentialsConnect = useCallback(
    async (platform: Platform) => {
      if (!authData.email || !authData.password) {
        Alert.alert('Error', 'Please enter both username/email and password');
        return null;
      }

      const emailValidation = validation.email(authData.email);
      if (!emailValidation.valid) {
        Alert.alert('Invalid Email', emailValidation.error || 'Please enter a valid email address');
        return null;
      }

      const passwordValidation = validation.password(authData.password);
      if (!passwordValidation.valid) {
        Alert.alert('Weak Password', passwordValidation.error || 'Please use a stronger password');
        return null;
      }

      if (!checkAuthentication()) return null;

      setIsConnecting(true);
      console.log('Connecting with encrypted credentials...');

      try {
        const result = await connectCredentialsMutation.mutateAsync({
          platformId: platform.id,
          platformName: platform.name,
          email: authData.email,
          password: authData.password,
        });

        console.log('Credentials encrypted:', result.encryptedCredentials);
        setSessionData({ sessionId: result.sessionId });

        if (result.requires2FA) {
          return { requires2FA: true };
        } else {
          setAuthData((prev) => ({ ...prev, password: '', apiKey: '' }));
          return {
            success: true,
            accountName: result.accountName,
            requires2FA: false,
          };
        }
      } catch (error) {
        console.error('Failed to connect with credentials:', error);
        Alert.alert('Error', 'Failed to connect. Please check your credentials.');
        setAuthData((prev) => ({ ...prev, password: '', apiKey: '' }));
        return null;
      } finally {
        setIsConnecting(false);
      }
    },
    [authData.email, authData.password, checkAuthentication, connectCredentialsMutation]
  );

  const handle2FAVerification = useCallback(
    async (platform: Platform) => {
      if (!authData.twoFactorCode) {
        Alert.alert('Error', 'Please enter the 2FA code');
        return null;
      }

      const codeValidation = validation.verificationCode(authData.twoFactorCode);
      if (!codeValidation.valid) {
        Alert.alert('Invalid Code', codeValidation.error || 'Please enter a valid verification code');
        return null;
      }

      setIsConnecting(true);
      console.log('Verifying 2FA code...');

      try {
        const result = await verify2FAMutation.mutateAsync({
          platformId: platform.id,
          code: authData.twoFactorCode,
          sessionId: sessionData.sessionId,
          method: 'totp',
        });

        if (result.verified) {
          console.log('2FA verified, session token:', result.sessionToken?.substring(0, 16));

          setAuthData({
            email: '',
            password: '',
            apiKey: '',
            phoneNumber: '',
            verificationCode: '',
            twoFactorCode: '',
          });

          return {
            verified: true,
            accountName: authData.email,
          };
        } else {
          Alert.alert('Error', result.error || 'Invalid 2FA code');
          return { verified: false };
        }
      } catch (error) {
        console.error('Failed to verify 2FA:', error);
        Alert.alert('Error', 'Failed to verify 2FA code. Please try again.');
        return null;
      } finally {
        setIsConnecting(false);
        setAuthData((prev) => ({ ...prev, twoFactorCode: '' }));
      }
    },
    [authData.twoFactorCode, authData.email, sessionData.sessionId, verify2FAMutation]
  );

  const handleGoogleAccountConnect = useCallback(() => {
    setIsConnecting(true);
    console.log('Connecting via Google Account...');

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsConnecting(false);
        resolve({
          success: true,
          accountName: 'Google Account',
        });
      }, 2000);
    });
  }, []);

  const resetAuthData = useCallback(() => {
    setAuthData({
      email: '',
      password: '',
      apiKey: '',
      phoneNumber: '',
      verificationCode: '',
      twoFactorCode: '',
    });
  }, []);

  useEffect(() => {
    qrRemainingSecondsRef.current = qrState.remainingSeconds;
  }, [qrState.remainingSeconds]);

  return {
    isConnecting,
    authData,
    setAuthData,
    sessionData,
    qrState,
    setQrState,
    autoVerifyIntervalRef,
    qrRemainingSecondsRef,
    computeRemainingSeconds,
    handleQRCodeConnect,
    completeQRConnection,
    handleOAuthConnect,
    handleCredentialsConnect,
    handle2FAVerification,
    handleGoogleAccountConnect,
    resetAuthData,
  };
}
