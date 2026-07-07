import React from 'react';
import { View, StyleSheet } from 'react-native';
import TechnologyEngineeringCommandCenter from '../../../components/ai-agent/dashboard/technology-engineering/TechnologyEngineeringCommandCenter';

export default function TechnologyEngineeringCommandCenterPage() {
  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      <TechnologyEngineeringCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
