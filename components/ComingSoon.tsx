import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Users, TrendingUp, Zap } from 'lucide-react-native';
import { router } from 'expo-router';

interface FeaturePageProps {
  title: string;
  subtitle?: string;
  features?: string[];
  stats?: { label: string; value: string }[];
  showBackButton?: boolean;
}

export default function FeaturePage({ 
  title, 
  subtitle, 
  features = [],
  stats = [],
  showBackButton = true 
}: FeaturePageProps) {
  console.log('[FeaturePage] render', { title });
  
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="feature-page">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#007AFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {subtitle ?? 'Advanced features and capabilities for your business needs.'}
          </Text>
        </View>

        {stats.length > 0 && (
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={`stat-${stat.label}-${index}`} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {features.length > 0 ? (
            features.map((feature, index) => (
              <View key={`feature-${feature.slice(0, 20)}-${index}`} style={styles.featureItem}>
                <Star size={16} color="#FFD700" style={styles.featureIcon} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))
          ) : (
            <View style={styles.defaultFeatures}>
              <View style={styles.featureItem}>
                <Zap size={16} color="#007AFF" style={styles.featureIcon} />
                <Text style={styles.featureText}>Real-time processing and analytics</Text>
              </View>
              <View style={styles.featureItem}>
                <Users size={16} color="#007AFF" style={styles.featureIcon} />
                <Text style={styles.featureText}>Team collaboration and management</Text>
              </View>
              <View style={styles.featureItem}>
                <TrendingUp size={16} color="#007AFF" style={styles.featureIcon} />
                <Text style={styles.featureText}>Advanced reporting and insights</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: 12,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 80,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    marginBottom: 16,
    color: '#1A1A1A',
  },
  defaultFeatures: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
});

// Legacy ComingSoon component for backward compatibility
export function ComingSoon({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <FeaturePage 
      title={title} 
      subtitle={subtitle ?? 'Advanced features and capabilities for your business needs.'}
      showBackButton={true}
      ={[
        'Real-time data processing and analytics',
        'Advanced automation and workflow management', 
        'Seamless integration with existing tools',
        'Enterprise-grade security and compliance',
        'Customizable dashboards and reporting',
        '24/7 customer support and monitoring'
      ]}
      ={[
        { label: 'Active Users', value: '10K+' },
        { label: 'Success Rate', value: '99.9%' },
        { label: 'Integrations', value: '500+' },
        { label: 'Uptime', value: '99.99%' }
      ]}
    />
  );
}