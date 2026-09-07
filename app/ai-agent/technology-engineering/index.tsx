import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function TechnologyEngineeringScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Technology & Engineering AI Agents
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            60 AI agents for technology and engineering management
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Technology & Engineering Department
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI-powered solutions for software development, IT operations, infrastructure management, and engineering processes.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Main Agents (14)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              AI CTO, AI VP Engineering, AI VP Infrastructure, AI VP AI/ML, AI VP Security Tech, AI Chief Architect, AI DevOps Manager, AI Frontend Lead, AI Backend Lead, AI SRE Lead, AI QA Manager, AI Database Admin, AI Network Engineer, AI Security Engineer
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Sub-Agents (46)
            </Text>
            <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
              Specialized AI agents for development, testing, deployment, monitoring, security, database management, networking, and cloud operations.
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