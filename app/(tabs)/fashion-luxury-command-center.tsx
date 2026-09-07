import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function FashionLuxuryCommandCenter() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Fashion & Luxury Command Center
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            AI-powered fashion and luxury brand management
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Fashion & Luxury Department
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Comprehensive AI solutions for fashion brands, luxury goods, retail operations, and customer experience management.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Key Features
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              • AI Trend Analysis and Forecasting
              • Inventory Management and Optimization
              • Customer Personalization and Styling
              • Supply Chain and Production Planning
              • Brand Marketing and Social Media
              • Luxury Customer Experience Management
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Navigate to AI Agents
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Access specialized AI agents for fashion design, retail operations, marketing, and customer service in the dedicated Fashion & Luxury department.
            </Text>
          </View>
        </View>
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});