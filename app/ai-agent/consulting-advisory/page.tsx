import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfessionalServicesCommandCenter from './professional-services-command-center';

/**
 * Consulting & Advisory Department Page
 * Strategic advisory, management consulting, and professional services oversight
 */
export default function ConsultingAdvisoryPage() {
  return (
    <View style={styles.container}>
      <ProfessionalServicesCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
