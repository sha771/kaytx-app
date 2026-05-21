import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CommandCenterPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Command Center</Text>
        <Text style={styles.subtitle}>Centralized AI Operations Hub</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000000' },
  subtitle: { fontSize: 15, marginTop: 6, fontWeight: '500', color: '#8E8E93' },
});
