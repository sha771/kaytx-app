 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Users,
  Search,
  Plus,
  ListFilter,
  EllipsisVertical,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Building,
  User,
  Star,
  ArrowLeft,
  Pencil,
  Trash2,
  MessageSquare,
  Clock,
  CircleCheck,
  CircleAlert,
  Target,
  ChartBar,
  ChartPie,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  value: number;
  lastContact: string;
  source: string;
  tags: string[];
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate: string;
  contact: string;
  company: string;
}

interface CRMMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ForecastItem {
  id: string;
  month: string;
  target: number;
  achieved: number;
  pipeline: number;
  probability: number;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    position: 'Marketing Director',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    status: 'customer',
    value: 25000,
    lastContact: '2 days ago',
    source: 'Website',
    tags: ['VIP', 'Enterprise'],
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'Startup.io',
    position: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'prospect',
    value: 15000,
    lastContact: '1 week ago',
    source: 'Referral',
    tags: ['Hot Lead'],
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@design.co',
    phone: '+1 (555) 456-7890',
    company: 'Design Co.',
    position: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'lead',
    value: 8000,
    lastContact: '3 days ago',
    source: 'Social Media',
    tags: ['Creative'],
  },
];

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Enterprise Software License',
    value: 50000,
    stage: 'negotiation',
    probability: 80,
    closeDate: '2024-02-15',
    contact: 'Sarah Johnson',
    company: 'TechCorp Inc.',
  },
  {
    id: '2',
    title: 'Marketing Automation Setup',
    value: 25000,
    stage: 'proposal',
    probability: 60,
    closeDate: '2024-02-28',
    contact: 'Mike Chen',
    company: 'Startup.io',
  },
];

const crmMetrics: CRMMetric[] = [
  {
    title: 'Autonomous Leads',
    value: '1,247',
    change: '+15%',
    icon: Users,
    color: '#007AFF',
  },
  {
    title: 'Self-Closing Deals',
    value: '8',
    change: '+2',
    icon: Target,
    color: '#34C759',
  },
  {
    title: 'Pipeline ROI',
    value: '$840K',
    change: '+22%',
    icon: DollarSign,
    color: '#FF9500',
  },
  {
    title: 'Lead Velocity',
    value: '4.2d',
    change: '-12%',
    icon: TrendingUp,
    color: '#AF52DE',
  },
];

const mockForecast: ForecastItem[] = [
  { id: '1', month: 'Feb', target: 50000, achieved: 32000, pipeline: 45000, probability: 75 },
  { id: '2', month: 'Mar', target: 55000, achieved: 12000, pipeline: 68000, probability: 60 },
  { id: '3', month: 'Apr', target: 60000, achieved: 0, pipeline: 82000, probability: 45 },
];

export default function CRMScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'contacts' | 'deals' | 'forecasting' | 'analytics'>('contacts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'lead' | 'prospect' | 'customer'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'customer': return '#34C759';
      case 'prospect': return '#007AFF';
      case 'lead': return '#FF9500';
      case 'inactive': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return '#8E8E93';
      case 'qualification': return '#007AFF';
      case 'proposal': return '#FF9500';
      case 'negotiation': return '#AF52DE';
      case 'closed-won': return '#34C759';
      case 'closed-lost': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderMetric = ({ item }: { item: CRMMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.contactHeader}>
        <View style={styles.contactInfo}>
          <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
          <View style={styles.contactDetails}>
            <View style={styles.contactName}>
              <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={[styles.position, { color: theme.colors.secondaryText }]}>
              {item.position} at {item.company}
            </Text>
            <View style={styles.contactMeta}>
              <Text style={[styles.value, { color: theme.colors.primary }]}>
                ${item.value.toLocaleString()}
              </Text>
              <Text style={[styles.lastContact, { color: theme.colors.secondaryText }]}>
                Last contact: {item.lastContact}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.contactActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={16} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Mail size={16} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <EllipsisVertical size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactFooter}>
        <View style={styles.tags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.source, { color: theme.colors.secondaryText }]}>Source: {item.source}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDeal = ({ item }: { item: Deal }) => (
    <TouchableOpacity style={[styles.dealCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <Text style={[styles.dealTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.dealCompany, { color: theme.colors.secondaryText }]}>
            {item.company} • {item.contact}
          </Text>
        </View>
        <Text style={[styles.dealValue, { color: theme.colors.primary }]}>
          ${item.value.toLocaleString()}
        </Text>
      </View>

      <View style={styles.dealDetails}>
        <View style={styles.dealStage}>
          <View style={[styles.stageIndicator, { backgroundColor: getStageColor(item.stage) }]} />
          <Text style={[styles.stageText, { color: theme.colors.text }]}>
            {item.stage.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={styles.dealMeta}>
          <Text style={[styles.probability, { color: theme.colors.secondaryText }]}>
            {item.probability}% probability
          </Text>
          <Text style={[styles.closeDate, { color: theme.colors.secondaryText }]}>
            Close: {item.closeDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderForecastItem = ({ item }: { item: ForecastItem }) => {
    const projected = item.achieved + (item.pipeline * (item.probability / 100));
    const progress = (item.achieved / item.target) * 100;

    return (
      <View style={[styles.forecastCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.forecastHeader}>
          <Text style={[styles.forecastMonth, { color: theme.colors.text }]}>{item.month}</Text>
          <Text style={[styles.forecastTarget, { color: theme.colors.secondaryText }]}>Target: ${item.target.toLocaleString()}</Text>
        </View>

        <View style={styles.forecastProgress}>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
            <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: theme.colors.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.primary }]}>{progress.toFixed(0)}%</Text>
        </View>

        <View style={styles.forecastStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Achieved</Text>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>${item.achieved.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Pipeline</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>${item.pipeline.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Projected</Text>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>${projected.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContacts = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search contacts..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {(['all', 'lead', 'prospect', 'customer'] as const).map((Filter) => (
            <TouchableOpacity
              key={Filter}
              style={[
                styles.filterChip,
                filterStatus === Filter && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(Filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: filterStatus === Filter ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.contactsContainer}
      />
    </ScrollView>
  );

  const renderDeals = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={mockDeals}
        renderItem={renderDeal}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.dealsContainer}
      />
    </ScrollView>
  );

  const renderForecasting = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Q1 Performance</Text>
          <ChartPie size={20} color={theme.colors.secondaryText} />
        </View>
        <FlatList
          data={mockForecast}
          renderItem={renderForecastItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.forecastContainer}
        />
      </View>
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CRM Analytics</Text>
        <FlatList
          data={crmMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Unified CRM Header */}
      <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Autonomous CRM</Text>
          <TouchableOpacity style={[styles.plusBtn, { backgroundColor: theme.colors.primary }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMetrics}>
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>2,482</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Synced Contacts</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: '#34C759' }]}>$450k</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Autonomous Pipeline</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {(['contacts', 'deals', 'forecasting', 'analytics'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.pTab,
                selectedTab === tab && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.pTabText,
                  {
                    color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {selectedTab === 'contacts' && renderContacts()}
        {selectedTab === 'deals' && renderDeals()}
        {selectedTab === 'forecasting' && renderForecasting()}
        {selectedTab === 'analytics' && renderAnalytics()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactsContainer: {
    gap: 12,
  },
  contactCard: {
    padding: 16,
    borderRadius: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  position: {
    fontSize: 14,
    marginBottom: 8,
  },
  contactMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  lastContact: {
    fontSize: 12,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  contactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  source: {
    fontSize: 12,
  },
  dealsContainer: {
    gap: 12,
  },
  dealCard: {
    padding: 16,
    borderRadius: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dealCompany: {
    fontSize: 14,
  },
  dealValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  dealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealStage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dealMeta: {
    alignItems: 'flex-end',
  },
  probability: {
    fontSize: 12,
    marginBottom: 2,
  },
  closeDate: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  forecastContainer: {
    gap: 12,
  },
  forecastCard: {
    padding: 16,
    borderRadius: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  forecastMonth: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastTarget: {
    fontSize: 14,
  },
  forecastProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  forecastStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  hMetric: {
    alignItems: 'center',
  },
  hMetricVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  hMetricLab: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  hMetricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  tabsWrapper: {
    marginBottom: 16,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(150,150,150,0.05)',
  },
  pTabText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

