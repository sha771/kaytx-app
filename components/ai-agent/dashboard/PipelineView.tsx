import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Check, Clock, AlertCircle, Loader2 } from 'lucide-react-native';
import { PipelineViewProps } from './types';

export default function PipelineView({ steps }: PipelineViewProps) {
  const { theme } = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return Check;
      case 'active': return Loader2;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22C55E';
      case 'active': return theme.colors.primary;
      case 'error': return '#EF4444';
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Execution Pipeline
      </Text>
      
      <View style={styles.pipelineContainer}>
        {steps.map((step, index) => {
          const Icon = getStatusIcon(step.status);
          const color = getStatusColor(step.status);
          const isLast = index === steps.length - 1;

          return (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepContent}>
                <View style={[styles.iconContainer, { borderColor: color }]}>
                  <Icon size={16} color={color} />
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepName, { color: theme.colors.text }]}>
                    {step.name}
                  </Text>
                  {step.description && (
                    <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                      {step.description}
                    </Text>
                  )}
                  {step.duration && (
                    <Text style={[styles.stepDuration, { color: theme.colors.textSecondary }]}>
                      {step.duration}
                    </Text>
                  )}
                </View>
              </View>
              {!isLast && <View style={[styles.connector, { backgroundColor: color }]} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  pipelineContainer: {
    gap: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 11,
    marginBottom: 2,
  },
  stepDuration: {
    fontSize: 10,
    fontFamily: 'monospace',
  },
  connector: {
    width: 2,
    marginLeft: 15,
    marginTop: 4,
    marginBottom: 4,
    height: 20,
  },
});
