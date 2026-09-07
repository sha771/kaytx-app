import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function SalesRevenueScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Sales & Revenue AI Agents
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            60 AI agents for sales and revenue management
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Sales & Revenue Department
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI-powered solutions for sales operations, revenue management, customer acquisition, and business development.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Main Agents (14)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI Sales Director, AI Revenue Manager, AI Business Development Manager, AI Sales Operations Manager, AI Lead Development Manager, AI Sales Representative, AI Sales Executive, AI CRM Assistant, AI Proposal Generator, AI Negotiator, AI Pricing Analyst, AI Sales Forecasting Agent, AI Sales Enablement Agent, AI Customer Success Manager
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Sub-Agents (46)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Specialized AI agents for pipeline management, lead generation, customer relationships, sales analytics, pricing strategy, forecasting, deal management, and customer success.
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