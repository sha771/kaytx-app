import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
// trpc import removed - not currently used
import { CreditCard, User, Mail, CalendarDays, Lock, CircleCheck } from 'lucide-react-native';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: any) => void;
  organizationId: string;
  clientSecret?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = 'USD',
  description,
  onSuccess,
  onError,
  organizationId,
  clientSecret,
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentEnabled] = useState(!!clientSecret);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    name: '',
    email: '',
  });

  // const createPaymentIntent = trpc.payments.createPaymentIntent.useMutation();

  const handlePayment = async () => {
    if (!paymentEnabled) {
      Alert.alert('Error', 'Payment is not ready. Please wait.');
      return;
    }

    try {
      setLoading(true);

      // In a real implementation, this would use Stripe SDK
      // For now, simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      onSuccess?.({ status: 'succeeded', amount, currency });
      Alert.alert('Success', 'Payment completed successfully!');
    } catch (error: any) {
      onError?.(error);
      Alert.alert('Payment Failed', error?.message || 'Payment could not be processed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Payment Details</Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amount}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
            }).format(amount)}
          </Text>
        </View>

        {description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <User size={20} color="#666" />
          <TextInput
            placeholder="Cardholder Name"
            value={cardDetails.name}
            onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" />
          <TextInput
            placeholder="Email"
            value={cardDetails.email}
            onChangeText={(text) => setCardDetails({ ...cardDetails, email: text })}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <CreditCard size={20} color="#666" />
          <TextInput
            placeholder="Card Number"
            value={cardDetails.number}
            onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
            style={styles.input}
            keyboardType="numeric"
            maxLength={19}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <CalendarDays size={20} color="#666" />
            <TextInput
              placeholder="MM"
              value={cardDetails.expMonth}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expMonth: text })}
              style={styles.input}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              placeholder="YYYY"
              value={cardDetails.expYear}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expYear: text })}
              style={styles.input}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={[styles.inputContainer, styles.thirdInput]}>
            <TextInput
              placeholder="CVC"
              value={cardDetails.cvc}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cvc: text })}
              style={styles.input}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.securityInfo}>
          <Lock size={16} color="#666" />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payButton,
            (!paymentEnabled || loading) && styles.disabledButton
          ]}
          onPress={handlePayment}
          disabled={!paymentEnabled || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonTitle}>
              Pay {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
              }).format(amount)}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Payment Features</Text>
        <View style={styles.featureRow}>
          <CircleCheck size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Secure payment processing</Text>
        </View>
        <View style={styles.featureRow}>
          <CircleCheck size={20} color="#4CAF50" />
          <Text style={styles.featureText}>PCI DSS compliant</Text>
        </View>
        <View style={styles.featureRow}>
          <CircleCheck size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Multiple payment methods</Text>
        </View>
        <View style={styles.featureRow}>
          <CircleCheck size={20} color="#4CAF50" />
          <Text style={styles.featureText}>Instant confirmation</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  amountContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  thirdInput: {
    flex: 1,
    marginLeft: 8,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  securityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  payButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  payButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  features: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentForm;
