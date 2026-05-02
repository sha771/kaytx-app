 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Shield, Plus, PenLine, Trash2, TrendingUp, CircleAlert } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Objection {
  id: string;
  type: string;
  objection: string;
  response: string;
  successRate: number;
  usageCount: number;
}

export default function ObjectionHandlingScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [objections, setObjections] = useState<Objection[]>([
    {
      id: '1',
      type: 'Price',
      objection: 'Your price is too high',
      response: 'I understand price is important. Let me break down the value you receive and how it compares to alternatives. Our solution actually saves you money in the long run through increased efficiency.',
      successRate: 78,
      usageCount: 145,
    },
    {
      id: '2',
      type: 'Timing',
      objection: 'Now is not a good time',
      response: 'I appreciate your honesty. When would be a better time to revisit this? In the meantime, can I share how other clients in similar situations benefited from acting sooner?',
      successRate: 65,
      usageCount: 98,
    },
    {
      id: '3',
      type: 'Competition',
      objection: 'We are already working with someone else',
      response: 'That is great that you are working with someone. Many of our best clients also work with competitors. What would it take for us to earn a portion of your business?',
      successRate: 72,
      usageCount: 112,
    },
    {
      id: '4',
      type: 'Authority',
      objection: 'I need to talk to my manager',
      response: 'Absolutely, I understand. To help you present this to your manager, what specific information would be most valuable? Can we schedule a call with both of you?',
      successRate: 81,
      usageCount: 156,
    },
  ]);

  const deleteObjection = (id: string) => {
    setObjections(objections.filter(obj => obj.id !== id));
  };

  const filteredObjections = objections.filter(obj =>
    obj.objection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obj.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Objection Handling',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Objection Library</Text>
          <Text style={styles.headerSubtitle}>{objections.length} responses configured</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search objections..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <TrendingUp size={18} color="#10B981" />
          <Text style={styles.statValue}>74%</Text>
          <Text style={styles.statLabel}>Avg Success</Text>
        </View>
        <View style={styles.statCard}>
          <Shield size={18} color="#60A5FA" />
          <Text style={styles.statValue}>{objections.length}</Text>
          <Text style={styles.statLabel}>Total Responses</Text>
        </View>
        <View style={styles.statCard}>
          <CircleAlert size={18} color="#F59E0B" />
          <Text style={styles.statValue}>511</Text>
          <Text style={styles.statLabel}>Times Used</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {filteredObjections.map((objection) => (
          <View key={objection.id} style={styles.objectionCard}>
            <View style={styles.objectionHeader}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{objection.type}</Text>
              </View>
              <View style={styles.successBadge}>
                <Text style={styles.successBadgeText}>{objection.successRate}% Success</Text>
              </View>
            </View>

            <View style={styles.objectionContent}>
              <Text style={styles.objectionLabel}>Common Objection:</Text>
              <Text style={styles.objectionText}>{objection.objection}</Text>
            </View>

            <View style={styles.responseContent}>
              <Text style={styles.responseLabel}>AI Response:</Text>
              <Text style={styles.responseText}>{objection.response}</Text>
            </View>

            <View style={styles.objectionFooter}>
              <Text style={styles.usageText}>Used {objection.usageCount} times</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <PenLine size={16} color="#10B981" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => deleteObjection(objection.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                  <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addNewCard}>
          <Plus size={24} color="#10B981" />
          <Text style={styles.addNewText}>Add New Objection Response</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    backgroundColor: '#10B981',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  objectionCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  objectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  successBadge: {
    backgroundColor: '#1A3A2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  successBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  objectionContent: {
    marginBottom: 12,
  },
  objectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6,
  },
  objectionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  responseContent: {
    backgroundColor: '#0F1621',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  responseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 6,
  },
  responseText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  objectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  usageText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  addNewCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 8,
  },
});
