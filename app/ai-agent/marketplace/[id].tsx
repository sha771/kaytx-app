import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Star,
  Download,
  Share2,
  Heart,
  CheckCircle,
  User,
  Bot,
  Shield,
  Tag,
  ChevronRight,
  Play,
  Plus,
  Sparkles,
  Code,
  Cpu,
  Layers,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface AgentTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  installs: number;
  author: string;
  authorAvatar: string;
  verified: boolean;
  price: 'free' | number;
  tags: string[];
  capabilities: string[];
  features: string[];
  screenshots: string[];
  version: string;
  lastUpdated: string;
  requirements: string[];
  compatibility: string[];
}

const TEMPLATE_DATA: AgentTemplate = {
  id: 'accounting-pro',
  name: 'Accounting Pro AI',
  tagline: 'Complete financial management solution for growing businesses',
  description: 'Accounting Pro AI is a comprehensive financial management agent that automates bookkeeping, invoicing, expense tracking, financial reporting, and tax preparation. Built with enterprise-grade security and compliance standards.',
  category: 'Finance',
  rating: 4.8,
  reviews: 2847,
  installs: 15632,
  author: 'Kaydex Labs',
  authorAvatar: '',
  verified: true,
  price: 'free',
  tags: ['accounting', 'finance', 'bookkeeping', 'invoicing', 'taxes'],
  capabilities: ['Automated Bookkeeping', 'Invoice Generation', 'Expense Tracking', 'Financial Reports', 'Tax Preparation', 'Bank Reconciliation'],
  features: [
    'Real-time financial dashboard',
    'Automated transaction categorization',
    'Multi-currency support',
    'Tax compliance checking',
    'Custom report builder',
    'Bank integration (5000+ banks)',
    'Receipt scanning & OCR',
    'Collaborative workflows',
  ],
  screenshots: ['dashboard', 'reports', 'invoices', 'expenses'],
  version: '3.2.1',
  lastUpdated: '2026-02-28',
  requirements: ['Kaydex Platform v2.0+', 'Financial API access', 'Storage: 500MB'],
  compatibility: ['QuickBooks', 'Xero', 'FreshBooks', 'Stripe', 'PayPal'],
};

const REVIEWS = [
  {
    id: '1',
    user: 'Sarah Johnson',
    avatar: '',
    rating: 5,
    date: '2026-02-25',
    text: 'This agent has transformed our accounting process. We\'ve saved over 20 hours per week on bookkeeping tasks.',
    helpful: 234,
  },
  {
    id: '2',
    user: 'Michael Chen',
    avatar: '',
    rating: 5,
    date: '2026-02-20',
    text: 'The integration with our existing systems was seamless. The AI accurately categorizes 98% of transactions automatically.',
    helpful: 189,
  },
  {
    id: '3',
    user: 'Emily Rodriguez',
    avatar: '',
    rating: 4,
    date: '2026-02-15',
    text: 'Great agent overall. Would love to see more customization options for the reporting features.',
    helpful: 87,
  },
];

export default function AgentTemplateDetailScreen() {
  const router = useRouter();
  const { id: _id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [isLiked, setIsLiked] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'reviews'>('overview');

  const template = TEMPLATE_DATA;

  const handleInstall = () => {
    setIsInstalled(true);
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={star <= Math.floor(rating) ? '#F59E0B' : '#E5E7EB'}
            fill={star <= Math.floor(rating) ? '#F59E0B' : 'transparent'}
          />
        ))}
        <Text style={[styles.ratingText, { color: colors.text }]}>{rating}</Text>
      </View>
    );
  };

  const renderTab = (tab: typeof activeTab, label: string) => (
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === tab && { backgroundColor: colors.tint },
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabText,
          { color: activeTab === tab ? 'white' : colors.icon },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderOverviewTab = () => (
    <Animated.View entering={FadeInUp} style={styles.tabContent}>
      {/* About */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <Text style={[styles.description, { color: colors.icon }]}>
          {template.description}
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Capabilities</Text>
        <View style={styles.capabilitiesGrid}>
          {template.capabilities.map((capability, index) => (
            <View key={index} style={[styles.capabilityCard, { backgroundColor: colors.background }]}>
              <CheckCircle size={16} color={colors.tint} />
              <Text style={[styles.capabilityText, { color: colors.text }]}>
                {capability}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Compatibility */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Integrations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.integrationsRow}>
            {template.compatibility.map((integration, index) => (
              <View key={index} style={[styles.integrationChip, { backgroundColor: colors.background }]}>
                <Layers size={14} color={colors.tint} />
                <Text style={[styles.integrationText, { color: colors.text }]}>
                  {integration}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Requirements */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Requirements</Text>
        {template.requirements.map((req, index) => (
          <View key={index} style={styles.requirementRow}>
            <Cpu size={16} color={colors.icon} />
            <Text style={[styles.requirementText, { color: colors.icon }]}>{req}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  const renderFeaturesTab = () => (
    <Animated.View entering={FadeInUp} style={styles.tabContent}>
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
        <View style={styles.featuresList}>
          {template.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={[styles.featureBullet, { backgroundColor: colors.tint }]}>
                <CheckCircle size={12} color="white" />
              </View>
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Demo Video Placeholder */}
      <TouchableOpacity style={[styles.demoCard, { backgroundColor: colors.card }]}>
        <View style={[styles.demoIcon, { backgroundColor: colors.tint + '15' }]}>
          <Play size={32} color={colors.tint} />
        </View>
        <View style={styles.demoInfo}>
          <Text style={[styles.demoTitle, { color: colors.text }]}>Watch Demo</Text>
          <Text style={[styles.demoSubtitle, { color: colors.icon }]}>
            See the agent in action (3:45)
          </Text>
        </View>
        <ChevronRight size={20} color={colors.icon} />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderReviewsTab = () => (
    <Animated.View entering={FadeInUp} style={styles.tabContent}>
      {/* Rating Summary */}
      <View style={[styles.ratingSummary, { backgroundColor: colors.card }]}>
        <View style={styles.ratingBig}>
          <Text style={[styles.ratingNumber, { color: colors.text }]}>{template.rating}</Text>
          {renderStars(template.rating)}
          <Text style={[styles.reviewsCount, { color: colors.icon }]}>
            {template.reviews.toLocaleString()} reviews
          </Text>
        </View>
        <View style={styles.ratingBars}>
          {[5, 4, 3, 2, 1].map((stars) => (
            <View key={stars} style={styles.ratingBarRow}>
              <Text style={[styles.ratingBarLabel, { color: colors.icon }]}>{stars}</Text>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <View style={[styles.ratingBarTrack, { backgroundColor: colors.background }]}>
                <View
                  style={[
                    styles.ratingBarFill,
                    {
                      width: `${stars === 5 ? 75 : stars === 4 ? 15 : stars === 3 ? 6 : stars === 2 ? 3 : 1}%`,
                      backgroundColor: stars >= 4 ? '#10B981' : stars === 3 ? '#F59E0B' : '#EF4444',
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Review Cards */}
      {REVIEWS.map((review, index) => (
        <Animated.View
          key={review.id}
          entering={FadeInUp.delay(index * 100)}
          style={[styles.reviewCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.reviewHeader}>
            <View style={[styles.reviewAvatar, { backgroundColor: colors.tint }]}>
              <User size={20} color="white" />
            </View>
            <View style={styles.reviewMeta}>
              <Text style={[styles.reviewName, { color: colors.text }]}>{review.user}</Text>
              <Text style={[styles.reviewDate, { color: colors.icon }]}>{review.date}</Text>
            </View>
            <View style={styles.reviewRating}>
              {renderStars(review.rating)}
            </View>
          </View>
          <Text style={[styles.reviewText, { color: colors.icon }]}>{review.text}</Text>
          <View style={styles.reviewActions}>
            <TouchableOpacity style={styles.helpfulButton}>
              <Heart size={14} color={colors.icon} />
              <Text style={[styles.helpfulText, { color: colors.icon }]}>
                Helpful ({review.helpful})
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share2 size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Heart
              size={22}
              color={isLiked ? '#EF4444' : colors.text}
              fill={isLiked ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeIn} style={styles.heroSection}>
          <View style={[styles.iconContainer, { backgroundColor: colors.tint }]}>
            <Bot size={48} color="white" />
          </View>

          <View style={styles.heroInfo}>
            <View style={styles.titleRow}>
              <Text style={[styles.templateName, { color: colors.text }]}>
                {template.name}
              </Text>
              {template.verified && (
                <View style={styles.verifiedBadge}>
                  <Shield size={14} color={colors.tint} />
                </View>
              )}
            </View>
            <Text style={[styles.tagline, { color: colors.icon }]}>
              {template.tagline}
            </Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              {renderStars(template.rating)}
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                {template.reviews.toLocaleString()} reviews
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Download size={16} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {template.installs > 1000
                  ? `${(template.installs / 1000).toFixed(1)}K`
                  : template.installs}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>installs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Sparkles size={16} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>v{template.version}</Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                {template.lastUpdated}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {template.tags.map((tag, index) => (
              <View key={index} style={[styles.tagChip, { backgroundColor: colors.tint + '15' }]}>
                <Tag size={12} color={colors.tint} />
                <Text style={[styles.tagText, { color: colors.tint }]}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Install Button */}
          <TouchableOpacity
            style={[
              styles.installButton,
              { backgroundColor: isInstalled ? '#10B981' : colors.tint },
            ]}
            onPress={handleInstall}
            disabled={isInstalled}
          >
            {isInstalled ? (
              <>
                <CheckCircle size={20} color="white" />
                <Text style={styles.installButtonText}>Installed</Text>
              </>
            ) : (
              <>
                <Plus size={20} color="white" />
                <Text style={styles.installButtonText}>
                  {template.price === 'free' ? 'Install Free' : `$${template.price}`}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {renderTab('overview', 'Overview')}
          {renderTab('features', 'Features')}
          {renderTab('reviews', 'Reviews')}
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'features' && renderFeaturesTab()}
        {activeTab === 'reviews' && renderReviewsTab()}

        {/* Author Section */}
        <View style={[styles.authorSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer</Text>
          <View style={styles.authorRow}>
            <View style={[styles.authorAvatar, { backgroundColor: colors.tint }]}>
              <Code size={24} color="white" />
            </View>
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: colors.text }]}>
                {template.author}
              </Text>
              <Text style={[styles.authorSubtitle, { color: colors.icon }]}>
                Verified Developer
              </Text>
            </View>
            <TouchableOpacity style={[styles.followButton, { borderColor: colors.tint }]}>
              <Text style={[styles.followText, { color: colors.tint }]}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  heroInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  templateName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981' + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 32,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  installButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  installButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabContent: {
    gap: 12,
  },
  section: {
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  capabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  capabilityText: {
    fontSize: 13,
  },
  integrationsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  integrationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  integrationText: {
    fontSize: 13,
    fontWeight: '500',
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
  },
  featuresList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  demoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoInfo: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  demoSubtitle: {
    fontSize: 13,
  },
  ratingSummary: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  ratingBig: {
    alignItems: 'center',
    paddingRight: 24,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewsCount: {
    fontSize: 12,
    marginTop: 4,
  },
  ratingBars: {
    flex: 1,
    paddingLeft: 24,
    gap: 6,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingBarLabel: {
    fontSize: 12,
    width: 16,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    borderRadius: 3,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewMeta: {
    flex: 1,
    marginLeft: 12,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 12,
    marginTop: 2,
  },
  reviewRating: {
    marginLeft: 'auto',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    fontSize: 12,
  },
  authorSection: {
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  authorSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  followText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
