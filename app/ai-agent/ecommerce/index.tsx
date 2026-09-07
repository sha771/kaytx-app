import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function EcommerceScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            E-Commerce AI Agents
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            60 AI agents for e-commerce and online retail management
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              E-Commerce Department
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI-powered solutions for online stores, marketplaces, retail operations, and customer experience management.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Main Agents (14)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI E-Commerce Director, AI Store Manager, AI Product Manager, AI Marketing Manager, AI Customer Service Manager, AI Operations Manager, AI Sales Manager, AI Finance Manager, AI HR Manager, AI IT Manager, AI Legal Manager, AI Supply Chain Manager, AI Analytics Manager, AI Security Manager
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Sub-Agents (46)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Specialized AI agents for inventory management, order processing, customer support, marketing campaigns, sales optimization, operations, finance, HR, IT, legal, supply chain, analytics, and security in e-commerce.
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