import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  BarChart3, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Sparkles, 
  Settings,
  Shield,
  ChevronRight
} from 'lucide-react-native';

interface AgentFeaturesProps {
  agentId: string;
  agentName: string;
}

const features = [
  { 
    id: 'insights-analysis', 
    label: 'Insights & Analysis', 
    icon: BarChart3,
    description: 'Performance analytics'
  },
  { 
    id: 'summary-notes', 
    label: 'Summary & Notes', 
    icon: FileText,
    description: 'Documentation & notes'
  },
  { 
    id: 'task-deal-management', 
    label: 'Task & Deal Management', 
    icon: CheckSquare,
    description: 'Tasks & deals'
  },
  { 
    id: 'performance-tracking', 
    label: 'Performance Tracking', 
    icon: TrendingUp,
    description: 'Goals & metrics'
  },
  { 
    id: 'predictive-insights', 
    label: 'Predictive Insights', 
    icon: Sparkles,
    description: 'AI predictions'
  },
  { 
    id: 'memory-settings', 
    label: 'Memory & Settings', 
    icon: Settings,
    description: 'Configuration'
  },
  { 
    id: 'privacy', 
    label: 'Privacy', 
    icon: Shield,
    description: 'Data protection & compliance'
  },
];

export default function AgentFeatures({ agentId, agentName }: AgentFeaturesProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const navigateToFeature = (featureId: string) => {
    router.push({
      pathname: `/ai-agent/features/${featureId}`,
      params: { agentId, agentName }
    } as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Features & Tools</Text>
      <View style={styles.grid}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { backgroundColor: theme.colors.background }]}
            onPress={() => navigateToFeature(feature.id)}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <feature.icon size={22} color={theme.colors.primary} />
            </View>
            <View style={styles.content}>
              <Text style={[styles.featureLabel, { color: theme.colors.text }]}>
                {feature.label}
              </Text>
              <Text style={[styles.featureDesc, { color: theme.colors.textSecondary }]}>
                {feature.description}
              </Text>
            </View>
            <ChevronRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  grid: {
    gap: 10,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  featureLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
  },
});
