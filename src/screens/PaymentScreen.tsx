import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from '../components/PlaceholderImage';

const PaymentScreen = () => {
  const navigation = useNavigation();
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle back navigation safely
  const handleGoBack = () => {
    try {
      if (isProcessing) {
        Alert.alert(
          'Payment in Progress',
          'A payment is currently being processed. Are you sure you want to cancel?',
          [
            { text: 'Stay', style: 'cancel' },
            { 
              text: 'Cancel Payment', 
              style: 'destructive',
              onPress: () => {
                setIsProcessing(false);
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Navigation error:', error);
      try {
        // @ts-ignore
        navigation.navigate('Main');
      } catch (navError) {
        console.error('Fallback navigation error:', navError);
      }
    }
  };

  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const chunks = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      chunks.push(cleaned.substring(i, i + 4));
    }
    return chunks.join(' ').trim().substring(0, 19); // max 16 digits + 3 spaces
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text: string) => {
    setExpiry(formatExpiry(text));
  };

  const handleSubmit = () => {
    // Prevent multiple submissions
    if (isProcessing) {
      return;
    }
    
    // Simple validation
    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid card number');
      return;
    }
    
    if (expiry.length !== 5) {
      Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    if (cvv.length !== 3) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return;
    }

    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Payment Successful',
        'Your subscription has been activated successfully!',
        [
          {
            text: 'Continue to App',
            onPress: () => {
              try {
                // @ts-ignore
                navigation.navigate('Main');
              } catch (error) {
                console.error('Navigation error after payment:', error);
                // Try to reset navigation
                try {
                  // @ts-ignore
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                  });
                } catch (resetError) {
                  console.error('Failed to reset navigation:', resetError);
                }
              }
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <PlaceholderImage
            width={24}
            height={24}
            text="←"
            backgroundColor="transparent"
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.paymentMethodSelector}>
          <View style={styles.paymentMethodHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={[styles.paymentOption, styles.selectedOption]}>
              <PlaceholderImage
                width={24}
                height={24}
                text="💳"
                backgroundColor="transparent"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.paymentOptionText}>Credit Card</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption}>
              <PlaceholderImage
                width={24}
                height={24}
                text="P"
                backgroundColor="transparent"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.paymentOptionText}>PayPal</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Card Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#666"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />
              <View style={styles.cardTypeIcon}>
                <PlaceholderImage
                  width={32}
                  height={24}
                  text="VISA"
                  backgroundColor="transparent"
                  color="#1434CB"
                />
              </View>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Holder</Text>
            <TextInput
              style={[styles.input, styles.regularInput]}
              placeholder="John Smith"
              placeholderTextColor="#666"
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>
          
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={[styles.input, styles.regularInput]}
                placeholder="MM/YY"
                placeholderTextColor="#666"
                value={expiry}
                onChangeText={handleExpiryChange}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={[styles.input, styles.regularInput]}
                placeholder="123"
                placeholderTextColor="#666"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.saveCardContainer}
            onPress={() => setSaveCard(!saveCard)}
          >
            <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
              {saveCard && (
                <PlaceholderImage
                  width={16}
                  height={16}
                  text="✓"
                  backgroundColor="transparent"
                  color="white"
                />
              )}
            </View>
            <Text style={styles.saveCardText}>Save card for future payments</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Premium Plan</Text>
            <Text style={styles.summaryValue}>$12.99/month</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>$1.04</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$14.03/month</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          disabled={isProcessing}
          onPress={handleSubmit}
        >
          {isProcessing ? (
            <Text style={styles.payButtonText}>Processing...</Text>
          ) : (
            <Text style={styles.payButtonText}>Pay Now $14.03</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.securePayment}>
          <PlaceholderImage
            width={20}
            height={20}
            text="🔒"
            backgroundColor="transparent"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.secureText}>Secure payment processing</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282833',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#282833',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  paymentMethodSelector: {
    marginBottom: 24,
  },
  paymentMethodHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#282833',
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#ff3b30',
  },
  paymentOptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#282833',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    color: 'white',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  regularInput: {
    backgroundColor: '#282833',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  cardTypeIcon: {
    paddingHorizontal: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#8E8E93',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
  },
  saveCardText: {
    color: 'white',
    fontSize: 16,
  },
  summaryContainer: {
    backgroundColor: '#282833',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#8E8E93',
    fontSize: 16,
  },
  summaryValue: {
    color: 'white',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#3a3a3c',
    marginVertical: 12,
  },
  totalLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#ff3b30',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  securePayment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureText: {
    color: '#8E8E93',
    fontSize: 14,
  }
});

export default PaymentScreen; 