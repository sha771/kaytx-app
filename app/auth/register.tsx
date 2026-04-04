import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function RegisterScreen() {
  const { theme } = useTheme();
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    termsAccepted: false,
    privacyPolicyAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!formData.termsAccepted || !formData.privacyPolicyAccepted) {
      Alert.alert('Error', 'Please accept the terms and privacy policy');
      return;
    }

    setIsLoading(true);
    try {
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Sign up to get started
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <User size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="First Name"
                placeholderTextColor={theme.colors.secondaryText}
                value={formData.firstName}
                onChangeText={text => setFormData(prev => ({ ...prev, firstName: text }))}
                autoCapitalize="words"
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <User size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Last Name"
                placeholderTextColor={theme.colors.secondaryText}
                value={formData.lastName}
                onChangeText={text => setFormData(prev => ({ ...prev, lastName: text }))}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Email"
              placeholderTextColor={theme.colors.secondaryText}
              value={formData.email}
              onChangeText={text => setFormData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Phone Number (Optional)"
              placeholderTextColor={theme.colors.secondaryText}
              value={formData.phoneNumber}
              onChangeText={text => setFormData(prev => ({ ...prev, phoneNumber: text }))}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Password"
              placeholderTextColor={theme.colors.secondaryText}
              value={formData.password}
              onChangeText={text => setFormData(prev => ({ ...prev, password: text }))}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <EyeOff size={20} color={theme.colors.secondaryText} />
              ) : (
                <Eye size={20} color={theme.colors.secondaryText} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={theme.colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.secondaryText}
              value={formData.confirmPassword}
              onChangeText={text => setFormData(prev => ({ ...prev, confirmPassword: text }))}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color={theme.colors.secondaryText} />
              ) : (
                <Eye size={20} color={theme.colors.secondaryText} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <Switch
              value={formData.termsAccepted}
              onValueChange={value => setFormData(prev => ({ ...prev, termsAccepted: value }))}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={formData.termsAccepted ? '#fff' : '#f4f3f4'}
            />
            <Text style={[styles.checkboxText, { color: theme.colors.text }]}>
              I accept the Terms of Service
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Switch
              value={formData.privacyPolicyAccepted}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, privacyPolicyAccepted: value }))
              }
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={formData.privacyPolicyAccepted ? '#fff' : '#f4f3f4'}
            />
            <Text style={[styles.checkboxText, { color: theme.colors.text }]}>
              I accept the Privacy Policy
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.back()}
          >
            <Text style={[styles.loginLinkText, { color: theme.colors.secondaryText }]}>
              Already have an account?{' '}
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Sign In</Text>
            </Text>
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
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
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
  eyeIcon: {
    padding: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkboxText: {
    fontSize: 14,
    flex: 1,
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  loginLinkText: {
    fontSize: 14,
  },
});
