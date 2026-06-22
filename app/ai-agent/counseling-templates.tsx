import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCounselingTemplates } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton, Skeleton } from '@/components/ai-agent/CounselingAnimations';

export default function CounselingTemplatesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  const { data: templates, isLoading } = useCounselingTemplates({
    category: selectedCategory || undefined,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Counseling Templates</Text>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} height={120} style={styles.skeleton} />
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load templates</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Counseling Templates</Text>
        <AnimatedButton
          title="Create Template"
          onPress={() => setShowCreateForm(true)}
          variant="primary"
          size="small"
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.categoryChip,
              selectedCategory === category.value && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.value)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.value && styles.selectedCategoryText,
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Templates List */}
      <ScrollView style={styles.templatesList}>
        {templates?.map((template: any) => (
          <AnimatedCard key={template.id} style={styles.templateCard}>
            <View style={styles.templateHeader}>
              <Text style={styles.templateName}>{template.name}</Text>
              <View style={[
                styles.categoryBadge,
                { backgroundColor: getCategoryColor(template.category) }
              ]}>
                <Text style={styles.categoryBadgeText}>
                  {template.category}
                </Text>
              </View>
            </View>
            
            <Text style={styles.templateDescription}>
              {template.description}
            </Text>
            
            <View style={styles.templateMeta}>
              <Text style={styles.metaText}>
                Mode: {template.counselingMode.replace(/_/g, ' ')}
              </Text>
              <Text style={styles.metaText}>
                Duration: {template.duration}
              </Text>
              <Text style={styles.metaText}>
                Priority: {template.severity}
              </Text>
            </View>
            
            <View style={styles.templateActions}>
              <AnimatedButton
                title="Use Template"
                onPress={() => {
                  // Navigate to create session with template
                }}
                variant="primary"
                size="small"
              />
              <AnimatedButton
                title="View Details"
                onPress={() => {
                  // Show template details
                }}
                variant="secondary"
                size="small"
              />
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    performance: '#ef4444',
    development: '#22c55e',
    crisis: '#f59e0b',
    coordination: '#6366f1',
    mentorship: '#8b5cf6',
    escalation: '#dc2626',
    peer_support: '#0891b2',
  };
  return colors[category] || '#6b7280';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  selectedCategory: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  templatesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  templateCard: {
    marginBottom: 16,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  templateDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  templateMeta: {
    marginBottom: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  skeleton: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
});
