/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 * @description RelatedFeatures Component - Reusable navigation component for linking related features
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { ArrowUpRight } from 'lucide-react-native';
import {
  getRelatedFeatures,
  RelatedFeature,
  NAVIGATION_GROUPS,
} from '@/constants/feature-relationships';

interface RelatedFeaturesProps {
  featureId: string;
  title?: string;
  maxItems?: number;
  showCategory?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
  filterCategories?: string[];
}

export function RelatedFeatures({
  featureId,
  title = 'Related Features',
  maxItems = 6,
  showCategory = true,
  layout = 'horizontal',
  filterCategories,
}: RelatedFeaturesProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  let features = getRelatedFeatures(featureId);

  // Filter by categories if specified
  if (filterCategories && filterCategories.length > 0) {
    features = features.filter(f =>
      filterCategories.some(cat =>
        f.category.toLowerCase().includes(cat.toLowerCase())
      )
    );
  }

  // Limit items
  features = features.slice(0, maxItems);

  if (features.length === 0) return null;

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  const renderFeatureCard = (feature: RelatedFeature) => {
    const Icon = feature.icon;

    return (
      <TouchableOpacity
        key={feature.id}
        style={[
          styles.featureCard,
          layout === 'vertical' && styles.featureCardVertical,
          layout === 'grid' && { width: (width - 48) / 2 },
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => handleNavigate(feature.route)}
        activeOpacity={0.7}
      >
        <View style={styles.featureContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
            <Icon size={20} color={feature.color} />
          </View>
          <View style={styles.featureText}>
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              {feature.title}
            </Text>
            {showCategory && (
              <Text style={[styles.featureCategory, { color: theme.colors.secondaryText }]}>
                {feature.category}
              </Text>
            )}
          </View>
        </View>
        <ArrowUpRight size={16} color={theme.colors.secondaryText} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
      <ScrollView
        horizontal={layout === 'horizontal'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          layout === 'horizontal'
            ? styles.horizontalContainer
            : layout === 'grid'
            ? styles.gridContainer
            : styles.verticalContainer
        }
      >
        {features.map(renderFeatureCard)}
      </ScrollView>
    </View>
  );
}

// Quick Links Component for navigation groups
interface QuickLinksProps {
  groupId: keyof typeof NAVIGATION_GROUPS;
  title?: string;
  maxItems?: number;
}

export function QuickLinks({
  groupId,
  title,
  maxItems = 8,
}: QuickLinksProps) {
  const { theme } = useTheme();

  const groupFeatures = NAVIGATION_GROUPS[groupId] || [];
  const features = groupFeatures
    .slice(0, maxItems)
    .map(id => {

      const allFeatures = require('@/constants/feature-relationships').FEATURE_RELATIONSHIPS;
      const feature = allFeatures[id];
      if (!feature || !feature.icon) return null;
      return {
        id: feature.id,
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
        color: feature.color,
        route: feature.route,
        category: groupId.charAt(0).toUpperCase() + groupId.slice(1),
      };
    })
    .filter(Boolean) as RelatedFeature[];

  if (features.length === 0) return null;

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title || `${groupId.charAt(0).toUpperCase() + groupId.slice(1)} Features`}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}
      >
        {features.map(feature => {
          const Icon = feature.icon;
          return (
            <TouchableOpacity
              key={feature.id}
              style={[styles.quickLinkCard, { backgroundColor: theme.colors.card }]}
              onPress={() => handleNavigate(feature.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.quickIconContainer, { backgroundColor: `${feature.color}20` }]}>
                <Icon size={24} color={feature.color} />
              </View>
              <Text style={[styles.quickLinkTitle, { color: theme.colors.text }]}>
                {feature.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Cross-Category Links Component
interface CrossCategoryLinksProps {
  category: string;
  currentFeatureId: string;
}

export function CrossCategoryLinks({ category, currentFeatureId }: CrossCategoryLinksProps) {
  const { theme } = useTheme();

  const {
    CROSS_CATEGORY_LINKS,
    getFeaturesByCategory,
     
  } = require('@/constants/feature-relationships');

  const relatedCategories = CROSS_CATEGORY_LINKS[currentFeatureId] || [];

  if (relatedCategories.length === 0) return null;

  const allFeatures: RelatedFeature[] = [];
  relatedCategories.forEach(cat => {
    const catFeatures = getFeaturesByCategory(cat);
    allFeatures.push(...catFeatures.slice(0, 3));
  });

  if (allFeatures.length === 0) return null;

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        You Might Also Like
      </Text>
      <View style={styles.crossCategoryContainer}>
        {allFeatures.slice(0, 4).map(feature => {
          const Icon = feature.icon;
          return (
            <TouchableOpacity
              key={feature.id}
              style={[styles.crossCategoryCard, { backgroundColor: theme.colors.card }]}
              onPress={() => handleNavigate(feature.route)}
              activeOpacity={0.7}
            >
              <Icon size={20} color={feature.color} />
              <Text style={[styles.crossCategoryText, { color: theme.colors.text }]}>
                {feature.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  horizontalContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  verticalContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  gridContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 200,
    marginRight: 12,
  },
  featureCardVertical: {
    marginRight: 0,
    marginBottom: 8,
    width: '100%',
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureCategory: {
    fontSize: 12,
    marginTop: 2,
  },
  quickLinkCard: {
    width: 100,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  quickIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  crossCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  crossCategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  crossCategoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default RelatedFeatures;
