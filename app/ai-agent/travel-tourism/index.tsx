import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function TravelTourismScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Travel & Tourism AI Agents
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            60 AI agents for travel, tourism, and hospitality management
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Travel & Tourism Department
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI-powered solutions for travel agencies, tourism boards, hotels, airlines, and hospitality businesses.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Main Agents (14)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI Travel Director, AI Hotel Manager, AI Tour Guide, AI Booking Agent, AI Concierge, AI Revenue Manager, AI Customer Experience Manager, AI Marketing Manager, AI Operations Manager, AI Sales Manager, AI Finance Manager, AI HR Manager, AI IT Manager, AI Legal Manager
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Sub-Agents (46)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Specialized AI agents for travel planning, booking management, customer service, revenue optimization, marketing campaigns, operations, sales, finance, HR, IT, and legal functions in the travel and tourism industry.
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