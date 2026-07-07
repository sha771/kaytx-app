import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import TechnologyEngineeringCommandCenter from '@/components/ai-agent/dashboard/technology-engineering/TechnologyEngineeringCommandCenter';

export default function TechnologyEngineeringCommandCenterPage() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TechnologyEngineeringCommandCenter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
