import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Search, Plus, Funnel, Phone, Mail, MessageSquare, 
  MoreVertical, Star, Building2, MapPin, Calendar, Tag, User
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const CONTACTS = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    company: 'TechCorp Inc.',
    title: 'VP of Engineering',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    status: 'hot',
    tags: ['Enterprise', 'Decision Maker'],
    lastContact: '2 hours ago',
    deals: 3,
    value: '$450K',
    starred: true
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    company: 'Global Solutions',
    title: 'CTO',
    email: 'mchen@globalsol.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    status: 'warm',
    tags: ['Mid-Market', 'Technical'],
    lastContact: '1 day ago',
    deals: 2,
    value: '$320K',
    starred: true
  },
  { 
    id: '3', 
    name: 'Emily Rodriguez', 
    company: 'Innovate LLC',
    title: 'Product Director',
    email: 'emily@innovate.co',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    status: 'cold',
    tags: ['Startup', 'Product'],
    lastContact: '3 days ago',
    deals: 1,
    value: '$85K',
    starred: false
  },
  { 
    id: '4', 
    name: 'David Kim', 
    company: 'Future Systems',
    title: 'CEO',
    email: 'david@futuresys.io',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    status: 'hot',
    tags: ['Enterprise', 'C-Suite'],
    lastContact: '5 hours ago',
    deals: 4,
    value: '$670K',
    starred: true
  },
  { 
    id: '5', 
    name: 'Lisa Thompson', 
    company: 'DataDriven Co',
    title: 'Head of Data',
    email: 'lisa@datadriven.io',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    status: 'warm',
    tags: ['Analytics', 'Technical'],
    lastContact: '12 hours ago',
    deals: 2,
    value: '$210K',
    starred: false
  },
  { 
    id: '6', 
    name: 'James Wilson', 
    company: 'CloudFirst Inc',
    title: 'VP Sales',
    email: 'jwilson@cloudfirst.com',
    phone: '+1 (555) 678-9012',
    location: 'Chicago, IL',
    status: 'cold',
    tags: ['Cloud', 'Sales'],
    lastContact: '1 week ago',
    deals: 1,
    value: '$150K',
    starred: false
  },
];

const FILTERS = ['All', 'Hot', 'Warm', 'Cold', 'Starred', 'Recent'];

export default function ContactsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredContacts = CONTACTS.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                         (activeFilter === 'Starred' && contact.starred) ||
                         contact.status === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'hot': return '#EF4444';
      case 'warm': return '#F59E0B';
      case 'cold': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Contacts</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Plus size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search contacts..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Funnel size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={Funnel}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterChip,
                activeFilter === filter && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: activeFilter === filter ? '#fff' : theme.colors.text }
              ]}>
                {Funnel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 50)}>
            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: theme.colors.card }]}
              onPress={() => router.push(`/ai-agent/social-crm/contact-detail?id=${item.id}`)}
            >
              <View style={styles.contactHeader}>
                <View style={[styles.avatar, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.contactMain}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.contactName, { color: theme.colors.text }]}>{item.name}</Text>
                    {item.starred && <Star size={16} color="#F59E0B" fill="#F59E0B" />}
                  </View>
                  <Text style={[styles.contactTitle, { color: theme.colors.textSecondary }]}>
                    {item.title} at {item.company}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.contactDetails}>
                <View style={styles.detailRow}>
                  <Building2 size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{item.company}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MapPin size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{item.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{item.lastContact}</Text>
                </View>
              </View>

              <View style={styles.contactFooter}>
                <View style={styles.tagsRow}>
                  {item.tags.map((tag, i) => (
                    <View key={i} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.valueBox}>
                  <Text style={[styles.valueText, { color: '#10B981' }]}>{item.value}</Text>
                  <Text style={[styles.dealsText, { color: theme.colors.textSecondary }]}>{item.deals} deals</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                  <Phone size={16} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                  <Mail size={16} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                  <MessageSquare size={16} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.background }]}>
                  <MoreVertical size={16} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 12, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  filterScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterText: { fontSize: 13, fontWeight: '600' },
  listContent: { padding: 16 },
  contactCard: { padding: 16, borderRadius: 16, marginBottom: 12 },
  contactHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  contactMain: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contactName: { fontSize: 16, fontWeight: '600' },
  contactTitle: { fontSize: 13, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '700' },
  contactDetails: { marginBottom: 12, gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 13 },
  contactFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, flex: 1 },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 11 },
  valueBox: { alignItems: 'flex-end' },
  valueText: { fontSize: 16, fontWeight: '700' },
  dealsText: { fontSize: 11, marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
});
