 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Mail, KeyRound } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function VerifyEmailScreen() {
  const { theme } = useTheme();
  const { verifyEmail } = useAuth();
  const router = useRouter();

  const params = useLocalSearchParams();

  const initialToken = useMemo(() => {
    const tokenParam = params?.token;
    if (!tokenParam) return '';
    return Array.isArray(tokenParam) ? String(tokenParam[0] || '') : String(tokenParam);
  }, [params]);

  const initialEmail = useMemo(() => {
    const emailParam = params?.email;
    if (!emailParam) return '';
    return Array.isArray(emailParam) ? String(emailParam[0] || '') : String(emailParam);
  }, [params]);

  const [email] = useState(initialEmail);
  const [token, setToken] = useState(initialToken);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      Alert.alert('Error', 'Please enter your verification code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(token);
      Alert.alert('Email Verified', 'You can now log in.', [
        {
          text: 'OK',
          onPress: () => router.replace('/auth/login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Verify Email</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Enter the verification code</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Email"
              placeholderTextColor={theme.colors.secondaryText}
              value={email}
              editable={false}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <KeyRound size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Verification Code"
              placeholderTextColor={theme.colors.secondaryText}
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => router.replace('/auth/login')}>
            <Text style={[styles.loginLinkText, { color: theme.colors.secondaryText }]}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  verifyButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginLinkText: {
    fontSize: 14,
  },
});
