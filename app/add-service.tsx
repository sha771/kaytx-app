 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Check, Search, Globe, Mail, Lock, ShieldCheck } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { SUPPORTED_SERVICES } from '@/constants/services';
import { Service } from '@/types/messaging';
import { trpc } from '@/lib/trpc';

export default function AddServiceScreen() {
  const { theme } = useTheme();
  const { connectedServices, connectService } = useMessaging();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Fetch subscription for premium gating
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  // Connection Form State
  const [apiKey, setApiKey] = useState('');
  const [instanceId, setInstanceId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectionMode, setConnectionMode] = useState<'api' | 'credentials'>('api');

  const [isConnecting, setIsConnecting] = useState(false);

  // TRPC Mutations
  const connectWithCreds = trpc.platforms.connectCredentials.useMutation();

  const filteredServices = SUPPORTED_SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = async () => {
    if (!selectedService) return;

    setIsConnecting(true);
    try {
      if (connectionMode === 'credentials') {
        if (!email.trim() || !password.trim()) {
          Alert.alert('Error', 'Please enter both Email and Password');
          setIsConnecting(false);
          return;
        }

        const result = await connectWithCreds.mutateAsync({
          platformId: selectedService.id,
          platformName: selectedService.name,
          email: email.trim(),
          password: password.trim(),
        });

        if (result.success) {
          await connectService(selectedService.id, { email: email.trim(), sessionId: result.sessionId });
          Alert.alert('Success', `${selectedService.name} connected successfully!`);
          router.back();
        } else {
          throw new Error('Verification failed');
        }
      } else {
        if (!apiKey.trim()) {
          Alert.alert('Error', 'Please enter an API Key');
          setIsConnecting(false);
          return;
        }

        await connectService(selectedService.id, { apiKey: apiKey.trim(), instanceId });
        Alert.alert('Success', `${selectedService.name} connected successfully!`);
        router.back();
      }
    } catch (error: any) {
      console.error('[AddService] Connection error:', error);
      Alert.alert(
        'Connection Failed',
        error?.message || 'Could not establish connection. Please check your credentials or backend status.'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const renderForm = () => {
    if (!selectedService) return null;

    return (
      <View style={styles.formContainer}>
        <View style={[styles.serviceIconLarge, { backgroundColor: selectedService.color }]}>
          {React.createElement(selectedService.icon, { size: 32, color: 'white' })}
        </View>
        <Text style={[styles.formTitle, { color: theme.colors.text }]}>
          Connect {selectedService.name}
        </Text>

        <View style={[styles.modeSelector, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity
            style={[styles.modeButton, connectionMode === 'api' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setConnectionMode('api')}
          >
            <Text style={[styles.modeButtonText, { color: connectionMode === 'api' ? 'white' : theme.colors.text }]}>API Key</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, connectionMode === 'credentials' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setConnectionMode('credentials')}
          >
            <Text style={[styles.modeButtonText, { color: connectionMode === 'credentials' ? 'white' : theme.colors.text }]}>Login</Text>
          </TouchableOpacity>
        </View>

        {connectionMode === 'api' ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>API Key / Token</Text>
              <View style={styles.inputWrapper}>
                <ShieldCheck size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text, borderColor: theme.colors.border }]}
                  placeholder="sk_live_..."
                  placeholderTextColor={theme.colors.secondaryText}
                  value={apiKey}
                  onChangeText={setApiKey}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Instance ID (Optional)</Text>
              <View style={styles.inputWrapper}>
                <Globe size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text, borderColor: theme.colors.border }]}
                  placeholder="Cloud ID"
                  placeholderTextColor={theme.colors.secondaryText}
                  value={instanceId}
                  onChangeText={setInstanceId}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text, borderColor: theme.colors.border }]}
                  placeholder="account@email.com"
                  placeholderTextColor={theme.colors.secondaryText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text, borderColor: theme.colors.border }]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.secondaryText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary, opacity: isConnecting ? 0.7 : 1 }]}
          onPress={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Establish Connection</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setSelectedService(null)}
          disabled={isConnecting}
        >
          <Text style={[styles.cancelButtonText, { color: theme.colors.secondaryText }]}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => router.back()}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {selectedService ? 'Connection Details' : 'Add Service'}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => selectedService ? setSelectedService(null) : router.back()}
          >
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {selectedService ? renderForm() : (
          <>
            <View style={styles.searchContainer}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search services..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.servicesGrid}>
                {filteredServices.map((service) => {
                  const isConnected = connectedServices.includes(service.id);
                  const Icon = service.icon;
                  const isPremium = (service as Service & { isPremium?: boolean }).isPremium;

                  return (
                    <TouchableOpacity
                      key={service.id}
                      style={[
                        styles.serviceCard,
                        { backgroundColor: theme.colors.cardBackground },
                        isConnected && styles.connectedCard,
                      ]}
                      onPress={() => {
                        if (isConnected) return;
                        if (isPremium && !isEnterprise) {
                          router.push('/enterprise/billing');
                          return;
                        }
                        setSelectedService(service);
                      }}
                      disabled={isConnected}
                    >
                      <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                        <Icon size={24} color="white" />
                      </View>

                      <View style={styles.serviceTitleRow}>
                        <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                          {service.name}
                        </Text>
                        {isPremium && !isEnterprise && <Lock size={12} color={theme.colors.secondaryText} style={{ marginLeft: 4 }} />}
                      </View>

                      <Text style={[styles.serviceDescription, { color: theme.colors.secondaryText }]}>
                        {service.description}
                      </Text>

                      {isConnected ? (
                        <View style={[styles.connectedBadge, { backgroundColor: theme.colors.success }]}>
                          <Check size={14} color="white" />
                          <Text style={styles.connectedText}>Connected</Text>
                        </View>
                      ) : (
                        <View style={[styles.connectButton, { backgroundColor: theme.colors.primary }]}>
                          <Text style={styles.connectButtonText}>Connect</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  serviceCard: {
    width: '47%',
    margin: '1.5%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectedCard: {
    opacity: 0.7,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 14,
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  connectedText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  modeSelector: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 44,
    paddingRight: 16,
    fontSize: 15,
  },
  submitButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
});