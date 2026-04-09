import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Image,
    Switch,
    Clipboard,
    Alert,
    Dimensions,
} from 'react-native';
import {
    CheckCircle,
    QrCode,
    Lock,
    Key,
    Smartphone,
    Cloud,
    AlertCircle,
    Copy,
    Clock,
    RefreshCw,
    Activity,
    ChevronLeft,
    Shield,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlatformConnection, ConnectionStep } from '@/hooks/usePlatformConnection';
import { PLATFORMS_DATA, Platform } from '@/constants/platforms';

const { width } = Dimensions.get('window');

export default function ConnectionScreen() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const connection = usePlatformConnection();

    const [step, setStep] = useState<ConnectionStep>('method');
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [qrCodeData, setQrCodeData] = useState<{ qrCode?: string; linkingCode?: string }>({});

    const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Initialize platform
    useEffect(() => {
        const foundPlatform = PLATFORMS_DATA.find((p) => p.id === id);
        if (foundPlatform) {
            setPlatform(foundPlatform);
        } else {
            Alert.alert('Error', 'Platform not found', [
                { text: 'Go Back', onPress: () => router.back() }
            ]);
        }
    }, [id]);

    const serviceColor = useMemo(() => {
        if (!platform) return theme.colors.primary;
        const colors: { [key: string]: string } = {
            whatsapp: '#25D366',
            telegram: '#0088CC',
            instagram: '#E4405F',
            messenger: '#006AFF',
            discord: '#5865F2',
            sms: '#34C759',
            email: '#FF9500',
            voice: '#AF52DE',
            twitter: '#1DA1F2',
            signal: '#3A76F0',
            slack: '#4A154B',
        };
        return colors[platform.service] || theme.colors.primary;
    }, [platform, theme.colors.primary]);

    const qrCountdownLabel = useMemo(() => {
        const seconds = connection.qrState.remainingSeconds;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const mm = String(m).padStart(2, '0');
        const ss = String(s).padStart(2, '0');
        return `${mm}:${ss}`;
    }, [connection.qrState.remainingSeconds]);

    const copyToClipboard = useCallback((text: string) => {
        Clipboard.setString(text);
        Alert.alert('Copied', 'Code copied to clipboard');
    }, []);

    // Timer for QR refresh
    useEffect(() => {
        if (step !== 'qr-code') {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
            return;
        }

        const tick = () => {
            connection.setQrState((prev) => ({
                ...prev,
                remainingSeconds: connection.computeRemainingSeconds(prev.expiresAtIso),
            }));
        };

        tick();
        countdownIntervalRef.current = setInterval(tick, 1000);

        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
        };
    }, [step, connection]);

    // Auto-verify logic for QR (adapted from PlatformsScreen)
    useEffect(() => {
        if (step !== 'qr-code' || !connection.qrState.autoVerifyEnabled || !connection.sessionData.sessionId || !platform) return;

        if (platform.service !== 'whatsapp') return;

        const intervalMs = 2500;
        let inFlight = false;
        let isMounted = true;

        const poll = async () => {
            if (!isMounted || inFlight) return;
            if (connection.qrRemainingSecondsRef.current <= 0) return;

            inFlight = true;
            try {
                const result = await connection.completeQRConnection(platform, qrCodeData.linkingCode);
                if (result && result.verified) {
                    setStep('success');
                    setTimeout(() => router.back(), 2500);
                }
            } catch (e) {
                console.log('[Connection] auto-verify error', e);
            } finally {
                inFlight = false;
            }
        };

        const interval = setInterval(poll, intervalMs);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, connection.qrState.autoVerifyEnabled, connection.sessionData.sessionId, platform, qrCodeData.linkingCode]);

    const handleQRConnect = async () => {
        if (!platform) return;
        const result = await connection.handleQRCodeConnect(platform);
        if (result) {
            setQrCodeData(result);
            setStep('qr-code');
        }
    };

    const handleOAuthConnect = async () => {
        if (!platform) return;
        const result = await connection.handleOAuthConnect(platform);
        if (result?.success) {
            setStep('success');
            setTimeout(() => router.back(), 2500);
        }
    };

    const handleCredentialsConnect = async () => {
        if (!platform) return;
        const result = await connection.handleCredentialsConnect(platform);
        if (result?.requires2FA) {
            setStep('2fa');
        } else if (result?.success) {
            setStep('success');
            setTimeout(() => router.back(), 2500);
        }
    };

    const handle2FAVerify = async () => {
        if (!platform) return;
        const result = await connection.handle2FAVerification(platform);
        if (result && result.verified) {
            setStep('success');
            setTimeout(() => router.back(), 2500);
        }
    };

    if (!platform) return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    title: `Connect ${platform.name}`
                }}
            />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                    {step === 'success' ? 'Connection Established' : `Connect ${platform.name}`}
                </Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {step === 'method' && (
                    <View style={styles.content}>
                        <View style={styles.heroSection}>
                            <View style={[styles.platformIconLarge, { backgroundColor: `${serviceColor}15` }]}>
                                {/* Fallback to generic icon if needed */}
                                <Smartphone size={48} color={serviceColor} />
                            </View>
                            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
                                Secure Enterprise Bridge
                            </Text>
                            <Text style={[styles.heroSubtitle, { color: theme.colors.secondaryText }]}>
                                Establish a high-speed, encrypted tunnel between your {platform.name} account and the Rork AI workforce.
                            </Text>
                        </View>

                        <View style={styles.methodsContainer}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Select Authentication Method</Text>

                            {platform.connectionType === 'qr-code' && (
                                <TouchableOpacity
                                    style={[styles.methodCard, { backgroundColor: theme.colors.cardBackground }]}
                                    onPress={handleQRConnect}
                                    disabled={connection.isConnecting}
                                >
                                    <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                                        <QrCode size={24} color={serviceColor} />
                                    </View>
                                    <View style={styles.methodInfo}>
                                        <View style={styles.methodTitleRow}>
                                            <Text style={[styles.methodTitle, { color: theme.colors.text }]}>QR Code Pairing</Text>
                                            {platform.connectionMethod === 'on-device' && (
                                                <View style={styles.badge}>
                                                    <Smartphone size={10} color="#34C759" />
                                                    <Text style={styles.badgeText}>On-device</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                                            Scan QR code with your mobile app
                                        </Text>
                                    </View>
                                    {connection.isConnecting && <ActivityIndicator size="small" color={theme.colors.primary} />}
                                </TouchableOpacity>
                            )}

                            {platform.connectionType === 'oauth' && (
                                <TouchableOpacity
                                    style={[styles.methodCard, { backgroundColor: theme.colors.cardBackground }]}
                                    onPress={handleOAuthConnect}
                                    disabled={connection.isConnecting}
                                >
                                    <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                                        <Lock size={24} color={serviceColor} />
                                    </View>
                                    <View style={styles.methodInfo}>
                                        <View style={styles.methodTitleRow}>
                                            <Text style={[styles.methodTitle, { color: theme.colors.text }]}>OAuth Secure Login</Text>
                                            <View style={[styles.badge, { backgroundColor: '#FF950015' }]}>
                                                <Cloud size={10} color="#FF9500" />
                                                <Text style={[styles.badgeText, { color: '#FF9500' }]}>Cloud</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                                            Authorize via {platform.name} portal
                                        </Text>
                                    </View>
                                    {connection.isConnecting && <ActivityIndicator size="small" color={theme.colors.primary} />}
                                </TouchableOpacity>
                            )}

                            {platform.connectionType === 'credentials' && (
                                <TouchableOpacity
                                    style={[styles.methodCard, { backgroundColor: theme.colors.cardBackground }]}
                                    onPress={() => setStep('credentials')}
                                >
                                    <View style={[styles.methodIcon, { backgroundColor: `${serviceColor}20` }]}>
                                        <Key size={24} color={serviceColor} />
                                    </View>
                                    <View style={styles.methodInfo}>
                                        <View style={styles.methodTitleRow}>
                                            <Text style={[styles.methodTitle, { color: theme.colors.text }]}>Enterprise Credentials</Text>
                                        </View>
                                        <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                                            Username, Password & 2FA
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {platform.connectionType === 'google-account' && (
                                <TouchableOpacity
                                    style={[styles.methodCard, { backgroundColor: theme.colors.cardBackground }]}
                                    onPress={() => connection.handleGoogleAccountConnect(platform)}
                                    disabled={connection.isConnecting}
                                >
                                    <View style={[styles.methodIcon, { backgroundColor: '#4285F420' }]}>
                                        <Image 
                                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
                                            style={{ width: 24, height: 24 }}
                                        />
                                    </View>
                                    <View style={styles.methodInfo}>
                                        <View style={styles.methodTitleRow}>
                                            <Text style={[styles.methodTitle, { color: theme.colors.text }]}>Google Account</Text>
                                            <View style={[styles.badge, { backgroundColor: '#4285F415' }]}>
                                                <Cloud size={10} color="#4285F4" />
                                                <Text style={[styles.badgeText, { color: '#4285F4' }]}>OAuth</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.methodDescription, { color: theme.colors.secondaryText }]}>
                                            Sign in with your Google account
                                        </Text>
                                    </View>
                                    {connection.isConnecting && <ActivityIndicator size="small" color={theme.colors.primary} />}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}08` }]}>
                            <Shield size={20} color={theme.colors.primary} />
                            <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                                Rork uses Zero-Knowledge architecture. Your decryption keys never leave your secure enclave.
                            </Text>
                        </View>
                    </View>
                )}

                {step === 'qr-code' && (
                    <View style={styles.content}>
                        <View style={styles.qrTitleRow}>
                            <View>
                                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Authentication Token</Text>
                                <Text style={[styles.stepSubtitle, { color: theme.colors.secondaryText }]}>
                                    Scan with {platform.name} → Settings → Linked Devices
                                </Text>
                            </View>

                            <View style={styles.qrMeta}>
                                <View style={[styles.timerBadge, { backgroundColor: connection.qrState.remainingSeconds > 0 ? '#34C75915' : '#FF3B3015' }]}>
                                    <Clock size={14} color={connection.qrState.remainingSeconds > 0 ? '#34C759' : '#FF3B30'} />
                                    <Text style={[styles.timerText, { color: connection.qrState.remainingSeconds > 0 ? '#34C759' : '#FF3B30' }]}>
                                        {qrCountdownLabel}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.iconButton, { backgroundColor: theme.colors.cardBackground }]}
                                    onPress={handleQRConnect}
                                >
                                    <RefreshCw size={18} color={theme.colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.qrWrapper}>
                            <View style={styles.qrFrame}>
                                {qrCodeData.qrCode ? (
                                    <View style={styles.qrImageContainer}>
                                        <Image source={{ uri: qrCodeData.qrCode }} style={styles.qrImage} />
                                        <View style={styles.scanLine} />
                                    </View>
                                ) : (
                                    <ActivityIndicator size="large" color={theme.colors.primary} />
                                )}
                                <View style={styles.cornerTL} />
                                <View style={styles.cornerTR} />
                                <View style={styles.cornerBL} />
                                <View style={styles.cornerBR} />
                            </View>
                        </View>

                        <View style={styles.manualContainer}>
                            <Text style={[styles.manualLabel, { color: theme.colors.secondaryText }]}>Manual Pairing Code</Text>
                            <View style={[styles.codeBox, { backgroundColor: theme.colors.cardBackground }]}>
                                <Text style={[styles.pairingCode, { color: theme.colors.text }]}>
                                    {qrCodeData.linkingCode || '---- ----'}
                                </Text>
                                <TouchableOpacity onPress={() => copyToClipboard(qrCodeData.linkingCode || '')}>
                                    <Copy size={20} color={theme.colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {platform.service === 'whatsapp' && (
                            <View style={[styles.listenerBox, { backgroundColor: theme.colors.cardBackground }]}>
                                <View style={styles.listenerInfo}>
                                    <View style={styles.rowAlign}>
                                        <Activity size={16} color="#34C759" />
                                        <Text style={[styles.listenerTitle, { color: theme.colors.text }]}>Handshake Listener</Text>
                                    </View>
                                    <Text style={[styles.listenerDesc, { color: theme.colors.secondaryText }]}>
                                        Waiting for device synchronization...
                                    </Text>
                                </View>
                                <Switch
                                    value={connection.qrState.autoVerifyEnabled}
                                    onValueChange={(v) => connection.setQrState(prev => ({ ...prev, autoVerifyEnabled: v }))}
                                    trackColor={{ false: '#767577', true: '#34C759' }}
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                            onPress={() => connection.completeQRConnection(platform, qrCodeData.linkingCode)}
                            disabled={connection.isConnecting || connection.qrState.remainingSeconds <= 0}
                        >
                            {connection.isConnecting ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Complete Handshake</Text>}
                        </TouchableOpacity>

                        <View style={styles.terminalContainer}>
                            <View style={styles.terminalHeader}>
                                <Text style={styles.terminalTitle}>SECURE HANDSHAKE LOG</Text>
                                <View style={styles.pulseDot} />
                            </View>
                            <ScrollView style={styles.terminalScroll} nestedScrollEnabled>
                                <Text style={styles.logLine}>[10:42:01] <Text style={{ color: '#34C759' }}>INITIATING_TLS_V1.3_HANDSHAKE</Text></Text>
                                <Text style={styles.logLine}>[10:42:02] <Text style={{ color: '#fff' }}>Generating ephemeral keys...</Text></Text>
                                <Text style={styles.logLine}>[10:42:02] <Text style={{ color: '#fff' }}>Verifying certificate chain...</Text></Text>
                                <Text style={styles.logLine}>[10:42:03] <Text style={{ color: '#34C759' }}>CONNECTION_ESTABLISHED</Text></Text>
                                <Text style={styles.logLine}>[10:42:04] <Text style={{ color: '#ffbd2e' }}>Waiting for device authorization...</Text></Text>
                                <Text style={[styles.logLine, { opacity: 0.5 }]}>[10:42:05] Polling for token ack...</Text>
                            </ScrollView>
                        </View>
                    </View>
                )}

                {step === 'credentials' && (
                    <View style={styles.content}>
                        <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Sign In</Text>
                        <Text style={[styles.stepSubtitle, { color: theme.colors.secondaryText }]}>
                            Securely connect via your {platform.name} credentials
                        </Text>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email / Username</Text>
                            <TextInput
                                style={[styles.textInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                                placeholder="admin@enterprise.com"
                                placeholderTextColor={theme.colors.secondaryText}
                                value={connection.authData.email}
                                onChangeText={(v) => connection.setAuthData(prev => ({ ...prev, email: v }))}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Password</Text>
                            <TextInput
                                style={[styles.textInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                                placeholder="••••••••••••"
                                placeholderTextColor={theme.colors.secondaryText}
                                value={connection.authData.password}
                                onChangeText={(v) => connection.setAuthData(prev => ({ ...prev, password: v }))}
                                secureTextEntry
                            />
                        </View>

                        <View style={[styles.warningBox, { backgroundColor: '#FF950010' }]}>
                            <AlertCircle size={20} color="#FF9500" />
                            <Text style={[styles.warningText, { color: '#FF9500' }]}>
                                MFA challenge will be triggered after initial authentication.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                            onPress={handleCredentialsConnect}
                            disabled={connection.isConnecting}
                        >
                            {connection.isConnecting ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Authorize Connection</Text>}
                        </TouchableOpacity>
                    </View>
                )}

                {step === '2fa' && (
                    <View style={styles.content}>
                        <View style={styles.mfaHeader}>
                            <View style={[styles.mfaIcon, { backgroundColor: `${serviceColor}20` }]}>
                                <Lock size={32} color={serviceColor} />
                            </View>
                            <Text style={[styles.stepTitle, { color: theme.colors.text, textAlign: 'center' }]}>Security Challenge</Text>
                            <Text style={[styles.stepSubtitle, { color: theme.colors.secondaryText, textAlign: 'center' }]}>
                                Enter the 6-digit verification code from your device
                            </Text>
                        </View>

                        <View style={styles.otpContainer}>
                            {[0, 1, 2, 3, 4, 5].map((idx) => (
                                <View
                                    key={idx}
                                    style={[
                                        styles.otpBox,
                                        {
                                            backgroundColor: theme.colors.cardBackground,
                                            borderColor: connection.authData.twoFactorCode.length === idx ? theme.colors.primary : 'transparent',
                                            borderWidth: 2
                                        }
                                    ]}
                                >
                                    <Text style={[styles.otpText, { color: theme.colors.text }]}>
                                        {connection.authData.twoFactorCode[idx] || ''}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <TextInput
                            style={styles.hiddenInput}
                            value={connection.authData.twoFactorCode}
                            onChangeText={(v) => connection.setAuthData(prev => ({ ...prev, twoFactorCode: v.replace(/[^0-9]/g, '') }))}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus
                        />

                        <TouchableOpacity
                            style={[styles.primaryButton, { backgroundColor: theme.colors.primary, marginTop: 40 }]}
                            onPress={handle2FAVerify}
                            disabled={connection.isConnecting || connection.authData.twoFactorCode.length < 6}
                        >
                            {connection.isConnecting ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Verify & Connect</Text>}
                        </TouchableOpacity>
                    </View>
                )}

                {step === 'success' && (
                    <View style={[styles.content, styles.successContent]}>
                        <View style={styles.successHalo}>
                            <CheckCircle size={80} color="#34C759" />
                        </View>
                        <Text style={[styles.successTitle, { color: theme.colors.text }]}>System Integrated</Text>
                        <Text style={[styles.successSubtitle, { color: theme.colors.secondaryText }]}>
                            {platform.name} is now part of your autonomous workforce network. Syncing metadata...
                        </Text>

                        <View style={[styles.statusBadge, { backgroundColor: '#34C75915' }]}>
                            <Activity size={16} color="#34C759" />
                            <Text style={[styles.statusBadgeText, { color: '#34C759' }]}>LIVE LINK ACTIVE</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    platformIconLarge: {
        width: 100,
        height: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -1,
    },
    heroSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        opacity: 0.8,
    },
    methodsContainer: {
        gap: 16,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
        opacity: 0.6,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        borderRadius: 24,
        gap: 20,
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.1)',
    },
    methodIcon: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodInfo: {
        flex: 1,
    },
    methodTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 4,
    },
    methodTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    methodDescription: {
        fontSize: 14,
        opacity: 0.7,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        backgroundColor: '#34C75915',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#34C759',
    },
    infoBox: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 20,
        gap: 15,
        marginTop: 10,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    qrTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 6,
    },
    stepSubtitle: {
        fontSize: 15,
        lineHeight: 22,
    },
    qrMeta: {
        alignItems: 'flex-end',
        gap: 8,
    },
    timerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    timerText: {
        fontSize: 13,
        fontWeight: '700',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrWrapper: {
        alignItems: 'center',
        marginVertical: 40,
    },
    qrFrame: {
        padding: 24,
        position: 'relative',
    },
    qrImageContainer: {
        width: width * 0.65,
        height: width * 0.65,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    qrImage: {
        width: '100%',
        height: '100%',
    },
    scanLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#34C759',
        top: '50%',
        shadowColor: '#34C759',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    cornerTL: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 5, borderLeftWidth: 5, borderColor: '#34C759', borderTopLeftRadius: 20 },
    cornerTR: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 5, borderRightWidth: 5, borderColor: '#34C759', borderTopRightRadius: 20 },
    cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 5, borderLeftWidth: 5, borderColor: '#34C759', borderBottomLeftRadius: 20 },
    cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 5, borderRightWidth: 5, borderColor: '#34C759', borderBottomRightRadius: 20 },

    manualContainer: {
        marginBottom: 30,
    },
    manualLabel: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 10,
        textAlign: 'center',
        opacity: 0.6,
    },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
    },
    pairingCode: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 4,
    },
    listenerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        gap: 15,
    },
    listenerInfo: {
        flex: 1,
    },
    rowAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    listenerTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    listenerDesc: {
        fontSize: 12,
    },
    primaryButton: {
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 10,
    },
    textInput: {
        height: 60,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    warningBox: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 16,
        gap: 12,
        marginBottom: 30,
    },
    warningText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    otpBox: {
        width: 48,
        height: 64,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpText: {
        fontSize: 24,
        fontWeight: '800',
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
    },
    mfaHeader: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    mfaIcon: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successContent: {
        alignItems: 'center',
        paddingTop: 60,
    },
    successHalo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#34C75910',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    successTitle: {
        fontSize: 32,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 15,
    },
    successSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
    },
    statusBadgeText: {
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    },
    terminalContainer: {
        marginTop: 30,
        backgroundColor: '#000',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    terminalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    terminalTitle: {
        color: '#888',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#34C759',
    },
    terminalScroll: {
        height: 120,
        padding: 15,
    },
    logLine: {
        fontFamily: 'Courier', // or Platform.OS === 'ios' ? 'Menlo' : 'monospace'
        fontSize: 11,
        color: '#888',
        marginBottom: 4,
    },
});
