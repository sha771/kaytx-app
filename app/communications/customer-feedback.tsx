 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { MessageCircle, Star, TrendingUp, Users, ChartBar, Heart } from 'lucide-react-native';

interface Feedback {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  category: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
  sentiment: 'positive' | 'neutral' | 'negative';
}

const mockFeedback: Feedback[] = [
  {
    id: '1',
    customer: 'John Smith',
    rating: 5,
    comment: 'Excellent service! The team was very responsive and helpful.',
    category: 'Service',
    date: '2024-01-18',
    status: 'new',
    sentiment: 'positive'
  },
  {
    id: '2',
    customer: 'Sarah Johnson',
    rating: 3,
    comment: 'Good product but delivery was delayed.',
    category: 'Delivery',
    date: '2024-01-17',
    status: 'reviewed',
    sentiment: 'neutral'
  },
  {
    id: '3',
    customer: 'Mike Wilson',
    rating: 2,
    comment: 'Had issues with the app crashing frequently.',
    category: 'Technical',
    date: '2024-01-16',
    status: 'resolved',
    sentiment: 'negative'
  }
];

export default function CustomerFeedbackScreen() {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#34C759';
      case 'neutral': return '#FF9500';
      case 'negative': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#007AFF';
      case 'reviewed': return '#FF9500';
      case 'resolved': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const FeedbackCard = ({ item }: { item: Feedback }) => (
    <TouchableOpacity style={styles.feedbackCard}>
      <View style={styles.feedbackHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.feedbackDate}>{item.date}</Text>
        </View>
        <View style={styles.badges}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
          </View>
          <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor(item.sentiment) }]}>
            <Text style={styles.badgeText}>{item.sentiment.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.ratingSection}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              size={16} 
              color={star <= item.rating ? '#FFD700' : '#E5E5E5'} 
              fill={star <= item.rating ? '#FFD700' : 'transparent'}
            />
          ))}
        </View>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      
      <Text style={styles.comment}>{item.comment}</Text>
      
      <View style={styles.feedbackActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={16} color="#007AFF" />
          <Text style={styles.actionText}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#FF3B30" />
          <Text style={styles.actionText}>Follow Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredFeedback = selectedFilter === 'all' 
    ? feedback 
    : feedback.filter(item => item.sentiment === selectedFilter);

  const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Customer Feedback',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <MessageCircle size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Customer Feedback</Text>
              <Text style={styles.subtitle}>Monitor and respond to customer feedback</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.statValue}>{averageRating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color="#007AFF" />
            <Text style={styles.statValue}>{feedback.length}</Text>
            <Text style={styles.statLabel}>Total Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#34C759" />
            <Text style={styles.statValue}>+12%</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          {['all', 'positive', 'neutral', 'negative'].map(filter => (
            <TouchableOpacity
              key={Filter}
              style={[styles.filterButton, selectedFilter === Filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(Filter as any)}
            >
              <Text style={[styles.filterText, selectedFilter === Filter && styles.activeFilterText]}>
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Feedback</Text>
          {filteredFeedback.map(item => (
            <FeedbackCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <ChartBarBig size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <MessageCircle size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Send Survey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <TrendingUp size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Trends</Text>
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
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  activeFilterText: {
    color: '#fff'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12
  },
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  customerInfo: {
    flex: 1
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  badges: {
    flexDirection: 'row',
    gap: 8
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  stars: {
    flexDirection: 'row',
    gap: 2
  },
  category: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  comment: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
    marginBottom: 12
  },
  feedbackActions: {
    flexDirection: 'row',
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    gap: 4,
    flex: 1,
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  quickActionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center'
  }
});