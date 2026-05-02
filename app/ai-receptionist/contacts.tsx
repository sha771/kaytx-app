 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  Users,
  Search,
  Plus,
  ListFilter,
  Tag,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  MessageSquare,
  Activity,
  Shield,
  MailPlus,
  PhoneCall,
  Building,
  PlugZap,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';

export default function ContactsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSegment, setSelectedSegment] = useState<'all' | 'vip' | 'regular' | 'new' | 'inactive'>('all');
  const [autoSync, setAutoSync] = useState<boolean>(true);

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: contacts = [], isLoading } = trpc.receptionist.getContacts.useQuery();
  const { data: connectors = [] } = trpc.receptionist.getConnectors.useQuery();
  const { data: statsData } = trpc.receptionist.getContactStats.useQuery();

  const segments = useMemo(() => [
    { id: 'all', label: 'All', count: contacts.length, color: '#8E8E93' },
    { id: 'vip', label: 'VIP', count: contacts.filter(c => c.segment === 'vip').length, color: '#FF2D92' },
    { id: 'regular', label: 'Regular', count: contacts.filter(c => c.segment === 'regular').length, color: '#007AFF' },
    { id: 'new', label: 'New', count: contacts.filter(c => c.segment === 'new').length, color: '#34C759' },
    { id: 'inactive', label: 'Inactive', count: contacts.filter(c => c.segment === 'inactive').length, color: '#8E8E93' },
  ], [contacts]);

  const stats = useMemo(() => [
    { title: 'Total Contacts', value: statsData?.total?.toString() ?? '0', delta: '+23 this week', icon: Users, color: '#007AFF' },
    { title: 'VIP Coverage', value: statsData?.vip?.toString() ?? '0', delta: '98% SLA', icon: Star, color: '#FF2D92' },
    { title: 'Engaged Leads', value: statsData?.engaged?.toString() ?? '0', delta: '+14% QoQ', icon: TrendingUp, color: '#34C759' },
    { title: 'Avg Sentiment', value: statsData?.sentiment?.toString() ?? '0', delta: 'Stable', icon: MessageSquare, color: '#FF9500' },
  ], [statsData]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSegment = selectedSegment === 'all' || contact.segment === selectedSegment;
      return matchesSearch && matchesSegment;
    });
  }, [contacts, searchQuery, selectedSegment]);

  const getSegmentColor = (segment: string) => {
    const seg = segments.find(s => s.id === segment);
    return seg?.color || '#8E8E93';
  };

  const smartViews = [
    { id: 'handoff', label: 'Needs handoff', count: 6 },
    { id: 'callbacks', label: 'Callbacks today', count: 11 },
    { id: 'pipeline', label: 'Pipeline at risk', count: 4 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="receptionist-contacts-screen">
      <Stack.Screen
        options={{
          title: 'CRM Contacts',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>CRM Contacts</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}
            testID="receptionist-contacts-subtitle">
            Enterprise-grade directory with live CRM sync and AI playbooks
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}
          contentContainerStyle={styles.statsContainer}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            stats.map(stat => {
              const Icon = stat.icon;
              return (
                <View
                  key={stat.title}
                  style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-contacts-stat-${stat.title}`}
                >
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Icon size={20} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{stat.title}</Text>
                  <Text style={[styles.statDelta, { color: stat.color }]}>{stat.delta}</Text>
                </View>
              );
            })
          )}
        </ScrollView>

        <View style={[styles.syncCard, { backgroundColor: theme.colors.cardBackground }]}
          testID="receptionist-contacts-sync-card">
          {!isEnterprise && (
            <TouchableOpacity 
              style={styles.lockOverlay}
              onPress={() => router.push('/enterprise-admin')}
            >
              <Lock size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          <View style={styles.syncHeader}>
            <View style={styles.syncTitleRow}>
              <PlugZap size={18} color={theme.colors.primary} />
              <Text style={[styles.syncTitle, { color: theme.colors.text }]}>Connected platforms</Text>
            </View>
            <Switch
              value={autoSync}
              onValueChange={value => {
                console.log('Auto sync toggled', value);
                setAutoSync(value);
              }}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={autoSync ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.connectorGrid}>
            {connectors.map(connector => (
              <View key={connector.id} style={[styles.connectorCard, { backgroundColor: theme.colors.background }]}
                testID={`receptionist-contacts-connector-${connector.id}`}>
                <View style={styles.connectorBadge}>
                  <Building size={12} color={theme.colors.primary} />
                </View>
                <Text style={[styles.connectorName, { color: theme.colors.text }]}>{connector.name}</Text>
                <Text style={[styles.connectorProvider, { color: theme.colors.secondaryText }]}>{connector.provider}</Text>
                <View
                  style={[styles.connectorStatus, {
                    backgroundColor:
                      connector.status === 'connected'
                        ? '#34C75930'
                        : connector.status === 'error'
                        ? '#FF3B3030'
                        : '#FFCC0230',
                  }]}
                >
                  <Text
                    style={[styles.connectorStatusText, {
                      color:
                        connector.status === 'connected'
                          ? '#34C759'
                          : connector.status === 'error'
                          ? '#FF3B30'
                          : '#FF9500',
                    }]}
                  >
                    {connector.status === 'connected' && 'Synced'}
                    {connector.status === 'syncing' && 'Syncing'}
                    {connector.status === 'error' && 'Action needed'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-contacts-search">
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search contacts, tags, playbooks..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-contacts-Filter"
          >
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            testID="receptionist-contacts-add"
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.segmentsScroll}
          contentContainerStyle={styles.segmentsContainer}
        >
          {segments.map(segment => (
            <TouchableOpacity
              key={segment.id}
              style={[
                styles.segmentButton,
                selectedSegment === segment.id && {
                  backgroundColor: segment.color,
                },
                selectedSegment !== segment.id && {
                  backgroundColor: theme.colors.cardBackground,
                },
              ]}
              onPress={() => setSelectedSegment(segment.id as any)}
              testID={`receptionist-contacts-segment-${segment.id}`}
            >
              <Text
                style={[
                  styles.segmentLabel,
                  {
                    color: selectedSegment === segment.id ? 'white' : theme.colors.text,
                  },
                ]}
              >
                {segment.label}
              </Text>
              <View
                style={[
                  styles.segmentCount,
                  {
                    backgroundColor:
                      selectedSegment === segment.id ? 'rgba(255,255,255,0.3)' : `${segment.color}20`,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentCountText,
                    {
                      color: selectedSegment === segment.id ? 'white' : segment.color,
                    },
                  ]}
                >
                  {segment.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.smartViewScroll}
          contentContainerStyle={styles.smartViewContainer}
        >
          {smartViews.map(view => (
            <View key={view.id} style={[styles.smartViewCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`receptionist-contacts-smartview-${view.id}`}>
              <Activity size={16} color={theme.colors.primary} />
              <Text style={[styles.smartViewLabel, { color: theme.colors.text }]}>{view.label}</Text>
              <Text style={[styles.smartViewCount, { color: theme.colors.secondaryText }]}>{view.count}</Text>
            </View>
          ))}
        </ScrollView>

        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contactsList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <View style={[styles.contactCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`receptionist-contacts-card-${item.id}`}>
              <View style={styles.contactHeader}>
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatar, { backgroundColor: getSegmentColor(item.segment) }]}>
                    <Text style={styles.avatarText}>
                      {item.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </Text>
                  </View>
                  {item.segment === 'vip' && (
                    <View style={styles.vipBadge}>
                      <Star size={12} color="#FF2D92" fill="#FF2D92" />
                    </View>
                  )}
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactName, { color: theme.colors.text }]}>{item.name}</Text>
                  {item.company && (
                    <Text style={[styles.contactCompany, { color: theme.colors.secondaryText }]}>
                      {item.company}
                    </Text>
                  )}
                  {item.activePlaybook && (
                    <View style={[styles.playbookBadge, { backgroundColor: `${theme.colors.primary}15` }]}
                      testID={`receptionist-contacts-playbook-${item.id}`}>
                      <Shield size={12} color={theme.colors.primary} />
                      <Text style={[styles.playbookText, { color: theme.colors.primary }]}>{item.activePlaybook}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.quickAction} testID={`receptionist-contacts-call-${item.id}`}>
                  <PhoneCall size={18} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.contactDetails}>
                <View style={styles.detailRow}>
                  <Phone size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                    {item.phone}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Mail size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                    {item.email}
                  </Text>
                </View>
                {item.location && (
                  <View style={styles.detailRow}>
                    <MapPin size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                      {item.location}
                    </Text>
                  </View>
                )}
              </View>

              {item.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {item.tags.map(tag => (
                    <View
                      key={`${item.id}-${tag}`}
                      style={[styles.tag, { backgroundColor: `${getSegmentColor(item.segment)}20` }]}
                    >
                      <Tag size={10} color={getSegmentColor(item.segment)} />
                      <Text style={[styles.tagText, { color: getSegmentColor(item.segment) }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.contactStats}>
                <View style={styles.statItem}>
                  <Phone size={14} color={theme.colors.primary} />
                  <Text style={[styles.statItemValue, { color: theme.colors.text }]}>
                    {item.totalCalls}
                  </Text>
                  <Text style={[styles.statItemLabel, { color: theme.colors.secondaryText }]}>calls</Text>
                </View>
                <View style={styles.statItem}>
                  <Star size={14} color="#FFCC02" />
                  <Text style={[styles.statItemValue, { color: theme.colors.text }]}>
                    {item.satisfaction}
                  </Text>
                  <Text style={[styles.statItemLabel, { color: theme.colors.secondaryText }]}>rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.statItemValue, { color: theme.colors.text }]}>
                    {item.lastContact}
                  </Text>
                </View>
              </View>

              <View style={styles.contactActions}>
                <TouchableOpacity style={[styles.contactButton, { backgroundColor: `${theme.colors.primary}15` }]}
                  testID={`receptionist-contacts-message-${item.id}`}>
                  <MessageSquare size={14} color={theme.colors.primary} />
                  <Text style={[styles.contactButtonText, { color: theme.colors.primary }]}>Send Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.contactButton, { backgroundColor: theme.colors.background }]}
                  testID={`receptionist-contacts-email-${item.id}`}>
                  <MailPlus size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.contactButtonText, { color: theme.colors.secondaryText }]}>Email recap</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsScroll: {
    marginBottom: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  statDelta: {
    fontSize: 11,
    fontWeight: '600',
  },
  syncCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  syncHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  syncTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  connectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  connectorCard: {
    width: '47%',
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  connectorBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 8,
  },
  connectorName: {
    fontSize: 15,
    fontWeight: '600',
  },
  connectorProvider: {
    fontSize: 12,
    marginBottom: 8,
  },
  connectorStatus: {
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  connectorStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
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
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentsScroll: {
    marginBottom: 12,
  },
  segmentsContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  segmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentCount: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  segmentCountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  smartViewScroll: {
    marginBottom: 20,
  },
  smartViewContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  smartViewCard: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  smartViewLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  smartViewCount: {
    fontSize: 12,
    fontWeight: '700',
  },
  contactsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  contactCard: {
    padding: 20,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  vipBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  contactCompany: {
    fontSize: 14,
    marginBottom: 6,
  },
  playbookBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  playbookText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  contactDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  contactStats: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    gap: 20,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statItemValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  statItemLabel: {
    fontSize: 12,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
