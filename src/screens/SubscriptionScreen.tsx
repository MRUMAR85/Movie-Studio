import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import PlaceholderImage from '../components/PlaceholderImage';

// Subscription plans
const subscriptionPlans = [
  {
    id: '1',
    name: 'Basic',
    price: '$8.99',
    period: 'month',
    features: [
      'Access to all content',
      'Standard video quality',
      'Watch on 1 device at a time',
      'Limited downloads'
    ],
    color: '#282833',
    recommended: false
  },
  {
    id: '2',
    name: 'Premium',
    price: '$12.99',
    period: 'month',
    features: [
      'Access to all content',
      'Full HD video quality',
      'Watch on 2 devices at a time',
      'Unlimited downloads',
      'No ads'
    ],
    color: '#ff3b30',
    recommended: true
  },
  {
    id: '3',
    name: 'Family',
    price: '$19.99',
    period: 'month',
    features: [
      'Access to all content',
      '4K Ultra HD video quality',
      'Watch on 4 devices at a time',
      'Unlimited downloads',
      'No ads',
      'Family sharing'
    ],
    color: '#282833',
    recommended: false
  }
];

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('2'); // Default to Premium

  // Handle navigation safely
  const handleGoBack = () => {
    try {
      navigation.goBack();
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

  // Handle payment navigation
  const handleContinue = () => {
    try {
      const selectedPlanDetails = subscriptionPlans.find(plan => plan.id === selectedPlan);
      // @ts-ignore
      navigation.navigate('Payment', { planDetails: selectedPlanDetails });
    } catch (error) {
      console.error('Error navigating to payment:', error);
      alert('Unable to proceed to payment at this time. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Choose Plan</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Choose the plan that's right for you</Text>
        <Text style={styles.subtitle}>All plans include HD video, cancel anytime, and our satisfaction guarantee.</Text>
        
        <View style={styles.planCardsContainer}>
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard, 
                { borderColor: plan.id === selectedPlan ? '#ff3b30' : 'transparent' },
                { backgroundColor: plan.color }
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>RECOMMENDED</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>/{plan.period}</Text>
                </View>
              </View>
              
              <View style={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <PlaceholderImage
                      width={18}
                      height={18}
                      text="✓"
                      backgroundColor="transparent"
                      color="#0aff08"
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
        </Text>
      </ScrollView>
    </View>
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
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  planCardsContainer: {
    marginBottom: 32,
  },
  planCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  recommendedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
  },
  recommendedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    marginBottom: 20,
  },
  planName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  planPeriod: {
    color: '#8E8E93',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#ff3b30',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    color: '#8E8E93',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  }
});

export default SubscriptionScreen; 