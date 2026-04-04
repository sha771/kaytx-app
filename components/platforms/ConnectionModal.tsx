import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  Switch,
  Clipboard,
  Alert,
} from 'react-native';
import {
  X,
  CheckCircle,
  QrCode,
  Lock,
  Key,
  Mail,
  Smartphone,
  Cloud,
  AlertCircle,
  Scan,
  Copy,
  Clock,
  RefreshCw,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import type { Platform } from './PlatformCard';
import type { ConnectionStep } from '@/hooks/usePlatformConnection';

interface ConnectionModalProps {
  visible: boolean;
  platform: Platform | null;
  step: ConnectionStep;
  qrCode?: string;
  linkingCode?: string;
  isConnecting: boolean;
  authData: {
    email: string;
    password: string;
    twoFactorCode: string;
  };
  qrState: {
    remainingSeconds: number;
    autoVerifyEnabled: boolean;
    isAutoVerifying: boolean;
    lastVerifyError?: string;
    webhookEnabled: boolean;
    multiDeviceMode: boolean;
    expiresAtIso?: string;
  };
  onClose: () => void;
  onQRConnect: () => void;
  onOAuthConnect: () => void;
  onCredentialsConnect: () => void;
  on2FAVerify: () => void;
  onGoogleAccountConnect: () => void;
  onCompleteQR: () => void;
  onRefreshQR: () => void;
  onSetStep: (step: ConnectionStep) => void;
  onAuthDataChange: (data: Partial<{ email: string; password: string; twoFactorCode: string }>) => void;
  onQRStateChange: (data: Partial<{ autoVerifyEnabled: boolean; webhookEnabled: boolean; multiDeviceMode: boolean }>) => void;
  getColorForService: (service: string) => string;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = React.memo(({
  visible,
  platform,
  step,
  qrCode,
  linkingCode,
  isConnecting,
  authData,
  qrState,
  onClose,
  onQRConnect,
  onOAuthConnect,
  onCredentialsConnect,
  on2FAVerify,
  onGoogleAccountConnect,
  onCompleteQR,
  onRefreshQR,
  onSetStep,
  onAuthDataChange,
  onQRStateChange,
  getColorForService,
}) => {
  const { theme } = useTheme();
  const serviceColor = platform ? getColorForService(platform.service) : theme.colors.primary;

  const qrCountdownLabel = useMemo(() => {
    const seconds = qrState.remainingSeconds;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
  }, [qrState.remainingSeconds]);

  const copyToClipboard = useCallback((text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Code copied to clipboard');
  }, []);

  if (!platform) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {step === 'success' ? 'Connected!' : `Connect ${platform.name}`}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {step === 'success' && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#34C759" />
              </View>
              <Text style={[styles.successText, { color: theme.colors.text }]}>
                Successfully connected to {platform.name}!
              </Text>
              <View
                style={[
                  styles.connectionTypeBadge,
                  {
                    backgroundColor: platform.connectionMethod === 'on-device' ? '#34C75920' : '#FF950020',
                  },
                ]}
              >
                {platform.connectionMethod === 'on-device' ? (
                  <Smartphone size={16} color="#34C759" />
                ) : (
                  <Cloud size={16} color="#FF9500" />
                )}
                <Text
                  style={[
                    styles.connectionTypeText,
                    {
                      color: platform.connectionMethod === 'on-device' ? '#34C759' : '#FF9500',
                    },
                  ]}
                >
                  {platform.connectionMethod === 'on-device' ? 'On-device connection' : 'Cloud connection'}
                </Text>
              </View>
            </View>
          )}

          {step === 'method' && (
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.modalDescription, { color: theme.colors.secondaryText }]}>
                Choose how you want to connect your {platform.name} account
              </Text>

              {platform.connectionType === 'qr-code' && (
                <TouchableOpacity
                  style={[styles.methodCard, { backgroundColor: theme.colors.background }]}
                  onPress={onQRConnect}
                  disabled={isConnecting}
                >
                  <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                    <QrCode size={24} color={serviceColor} />
                  </View>
                  <View style={styles.methodInfo}>
                    <View style={styles.methodTitleRow}>
                      <Text style={[styles.methodTitle, { color: theme.colors.text }]}>QR Code Pairing</Text>
                      {platform.connectionMethod === 'on-device' && (
                        <View style={styles.onDeviceBadge}>
                          <Smartphone size={10} color="#34C759" />
                          <Text style={styles.onDeviceText}>On-device</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                      Scan QR code with your {platform.name} app
                    </Text>
                  </View>
                  {isConnecting && <ActivityIndicator color={theme.colors.primary} />}
                </TouchableOpacity>
              )}

              {platform.connectionType === 'oauth' && (
                <TouchableOpacity
                  style={[styles.methodCard, { backgroundColor: theme.colors.background }]}
                  onPress={onOAuthConnect}
                  disabled={isConnecting}
                >
                  <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                    <Lock size={24} color={serviceColor} />
                  </View>
                  <View style={styles.methodInfo}>
                    <View style={styles.methodTitleRow}>
                      <Text style={[styles.methodTitle, { color: theme.colors.text }]}>OAuth Authentication</Text>
                      <View style={styles.cloudBadge}>
                        <Cloud size={10} color="#FF9500" />
                        <Text style={styles.cloudText}>Cloud</Text>
                      </View>
                    </View>
                    <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                      Secure login with {platform.name}
                    </Text>
                  </View>
                  {isConnecting && <ActivityIndicator color={theme.colors.primary} />}
                </TouchableOpacity>
              )}

              {platform.connectionType === 'credentials' && (
                <TouchableOpacity
                  style={[styles.methodCard, { backgroundColor: theme.colors.background }]}
                  onPress={() => onSetStep('credentials')}
                >
                  <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                    <Key size={24} color={serviceColor} />
                  </View>
                  <View style={styles.methodInfo}>
                    <View style={styles.methodTitleRow}>
                      <Text style={[styles.methodTitle, { color: theme.colors.text }]}>Username & Password</Text>
                      <View style={styles.cloudBadge}>
                        <Cloud size={10} color="#FF9500" />
                        <Text style={styles.cloudText}>Cloud</Text>
                      </View>
                    </View>
                    <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                      Sign in with your credentials + 2FA
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {platform.connectionType === 'google-account' && (
                <TouchableOpacity
                  style={[styles.methodCard, { backgroundColor: theme.colors.background }]}
                  onPress={onGoogleAccountConnect}
                  disabled={isConnecting}
                >
                  <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                    <Mail size={24} color={serviceColor} />
                  </View>
                  <View style={styles.methodInfo}>
                    <View style={styles.methodTitleRow}>
                      <Text style={[styles.methodTitle, { color: theme.colors.text }]}>Google Account</Text>
                      <View style={styles.onDeviceBadge}>
                        <Smartphone size={10} color="#34C759" />
                        <Text style={styles.onDeviceText}>On-device</Text>
                      </View>
                    </View>
                    <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                      Pair with Google Messages app
                    </Text>
                  </View>
                  {isConnecting && <ActivityIndicator color={theme.colors.primary} />}
                </TouchableOpacity>
              )}

              <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}10` }]}>
                <AlertCircle size={20} color={theme.colors.primary} />
                <Text style={[styles.infoText, { color: theme.colors.text }]}>
                  Your credentials are encrypted with zero-access encryption. We cannot decrypt your messages.
                </Text>
              </View>
            </ScrollView>
          )}

          {step === 'qr-code' && (
            <ScrollView style={styles.modalBody}>
              <View style={styles.qrTitleRow}>
                <Text style={[styles.qrTitle, { color: theme.colors.text }]}>Scan QR Code</Text>

                <View style={styles.qrMetaRight}>
                  <View
                    style={[
                      styles.qrExpiryBadge,
                      { backgroundColor: qrState.remainingSeconds > 0 ? '#34C75915' : '#FF3B3015' },
                    ]}
                  >
                    <Clock size={14} color={qrState.remainingSeconds > 0 ? '#34C759' : '#FF3B30'} />
                    <Text
                      style={[
                        styles.qrExpiryText,
                        { color: qrState.remainingSeconds > 0 ? '#34C759' : '#FF3B30' },
                      ]}
                    >
                      {qrState.remainingSeconds > 0 ? `Expires in ${qrCountdownLabel}` : 'Expired'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.qrRefreshButton, { backgroundColor: `${theme.colors.primary}12` }]}
                    onPress={onRefreshQR}
                    disabled={isConnecting}
                  >
                    <RefreshCw size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.qrDescription, { color: theme.colors.secondaryText }]}>
                Open {platform.name} on your phone and scan this QR code for instant connection
              </Text>

              <View style={styles.qrCodeContainer}>
                {qrCode && <Image source={{ uri: qrCode }} style={styles.qrCodeImage} />}
              </View>

              <View style={styles.orDivider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.secondaryText }]} />
                <Text style={[styles.orText, { color: theme.colors.secondaryText }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.secondaryText }]} />
              </View>

              <Text style={[styles.linkingCodeLabel, { color: theme.colors.text }]}>
                Enter this code manually:
              </Text>
              <View style={[styles.linkingCodeContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.linkingCode, { color: theme.colors.text }]}>{linkingCode}</Text>
                <TouchableOpacity onPress={() => copyToClipboard(linkingCode || '')}>
                  <Copy size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={[styles.instructionBox, { backgroundColor: `${theme.colors.primary}10` }]}>
                <Scan size={20} color={theme.colors.primary} />
                <View style={styles.instructionTextContainer}>
                  <Text style={[styles.instructionTitle, { color: theme.colors.text }]}>How to scan:</Text>
                  <Text style={[styles.instructionText, { color: theme.colors.secondaryText }]}>
                    1. Open {platform.name} on your phone{'\n'}
                    2. Go to Settings → Linked Devices{'\n'}
                    3. Tap &quot;Link a Device&quot; and scan this code
                  </Text>
                </View>
              </View>

              {platform.service === 'whatsapp' && (
                <View style={[styles.autoVerifyCard, { backgroundColor: theme.colors.background }]}>
                  <View style={styles.autoVerifyRow}>
                    <View style={styles.autoVerifyLeft}>
                      <Text style={[styles.autoVerifyTitle, { color: theme.colors.text }]}>Auto-verify</Text>
                      <Text style={[styles.autoVerifySubtitle, { color: theme.colors.secondaryText }]}>
                        We&apos;ll automatically detect WhatsApp device linking.
                      </Text>
                    </View>
                    <Switch
                      value={qrState.autoVerifyEnabled}
                      onValueChange={(v) => onQRStateChange({ autoVerifyEnabled: v })}
                      trackColor={{ false: '#767577', true: theme.colors.primary }}
                      thumbColor={qrState.autoVerifyEnabled ? '#fff' : '#f4f3f4'}
                    />
                  </View>

                  <View style={styles.autoVerifyActions}>
                    <TouchableOpacity
                      style={[styles.verifyNowButton, { backgroundColor: `${theme.colors.primary}14` }]}
                      onPress={onCompleteQR}
                      disabled={isConnecting || qrState.remainingSeconds <= 0}
                    >
                      {isConnecting ? (
                        <ActivityIndicator color={theme.colors.primary} />
                      ) : (
                        <>
                          <CheckCircle size={18} color={theme.colors.primary} />
                          <Text style={[styles.verifyNowText, { color: theme.colors.primary }]}>Verify now</Text>
                        </>
                      )}
                    </TouchableOpacity>

                    <View style={styles.autoVerifyStatus}>
                      <Activity
                        size={14}
                        color={qrState.isAutoVerifying ? '#34C759' : theme.colors.secondaryText}
                      />
                      <Text style={[styles.autoVerifyStatusText, { color: theme.colors.secondaryText }]}>
                        {qrState.isAutoVerifying ? 'Listening…' : 'Auto-verify paused'}
                      </Text>
                    </View>
                  </View>

                  {!!qrState.lastVerifyError && (
                    <View style={styles.qrErrorRow}>
                      <AlertCircle size={14} color="#FF3B30" />
                      <Text style={[styles.qrErrorText, { color: theme.colors.text }]}>
                        {qrState.lastVerifyError}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={onCompleteQR}
                disabled={isConnecting || qrState.remainingSeconds <= 0}
              >
                {isConnecting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.submitButtonText}>I&apos;ve Scanned the Code</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}

          {step === 'credentials' && (
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Username or Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                placeholder="your@email.com or username"
                placeholderTextColor={theme.colors.secondaryText}
                value={authData.email}
                onChangeText={(text) => onAuthDataChange({ email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.secondaryText}
                value={authData.password}
                onChangeText={(text) => onAuthDataChange({ password: text })}
                secureTextEntry
              />

              <View style={[styles.warningBox, { backgroundColor: '#FF950020' }]}>
                <AlertCircle size={20} color="#FF9500" />
                <Text style={[styles.warningText, { color: theme.colors.text }]}>
                  You may need to complete 2FA verification in the next step
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={onCredentialsConnect}
                disabled={isConnecting}
              >
                {isConnecting ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Sign In</Text>}
              </TouchableOpacity>
            </ScrollView>
          )}

          {step === '2fa' && (
            <View style={styles.modalBody}>
              <Text style={[styles.verificationTitle, { color: theme.colors.text }]}>
                Two-Factor Authentication
              </Text>
              <Text style={[styles.verificationDescription, { color: theme.colors.secondaryText }]}>
                Enter the 2FA code from your authenticator app or SMS
              </Text>
              <TextInput
                style={[
                  styles.verificationInput,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="000000"
                placeholderTextColor={theme.colors.secondaryText}
                value={authData.twoFactorCode}
                onChangeText={(text) => onAuthDataChange({ twoFactorCode: text })}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={on2FAVerify}
                disabled={isConnecting}
              >
                {isConnecting ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Verify</Text>}
              </TouchableOpacity>
            </View>
          )}

          {step === 'linking' && (
            <View style={styles.linkingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={[styles.linkingTitle, { color: theme.colors.text }]}>Linking Account...</Text>
              <Text style={[styles.linkingDescription, { color: theme.colors.secondaryText }]}>
                Please complete the emoji verification in your Google Messages app
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});

ConnectionModal.displayName = 'ConnectionModal';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  methodDescription: {
    fontSize: 13,
  },
  onDeviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#34C75920',
  },
  onDeviceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#34C759',
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#FF950020',
  },
  cloudText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF9500',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  qrTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  qrMetaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qrExpiryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  qrExpiryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  qrRefreshButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  qrDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
  },
  qrCodeImage: {
    width: 250,
    height: 250,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.2,
  },
  orText: {
    fontSize: 12,
    fontWeight: '600',
  },
  linkingCodeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  linkingCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  linkingCode: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 4,
  },
  instructionBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 13,
    lineHeight: 20,
  },
  autoVerifyCard: {
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  autoVerifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  autoVerifyLeft: {
    flex: 1,
  },
  autoVerifyTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  autoVerifySubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  autoVerifyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  verifyNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  verifyNowText: {
    fontSize: 13,
    fontWeight: '800',
  },
  autoVerifyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  autoVerifyStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  qrErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  qrErrorText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  warningBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  verificationTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  verificationDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  verificationInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '600',
    marginBottom: 16,
  },
  linkingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  linkingTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  linkingDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  connectionTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  connectionTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
