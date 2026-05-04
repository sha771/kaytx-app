 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Smartphone, Signal, Settings, Plus, Trash2, PenLine } from 'lucide-react-native';

interface SIMCard {
  id: string;
  carrier: string;
  number: string;
  plan: string;
  dataUsed: string;
  dataLimit: string;
  status: 'active' | 'inactive';
}

const mockSIMCards: SIMCard[] = [
  {
    id: '1',
    carrier: 'Verizon',
    number: '+1 (555) 123-4567',
    plan: 'Unlimited Premium',
    dataUsed: '15.2 GB',
    dataLimit: 'Unlimited',
    status: 'active'
  },
  {
    id: '2',
    carrier: 'AT&T',
    number: '+1 (555) 987-6543',
    plan: 'Business Pro',
    dataUsed: '8.7 GB',
    dataLimit: '50 GB',
    status: 'active'
  }
];

export default function SIMScreen() {
  const [simCards, setSIMCards] = useState<SIMCard[]>(mockSIMCards);
  const [selectedSIM, setSelectedSIM] = useState<string>('1');

  const SIMCard = ({ sim }: { sim: SIMCard }) => (
    <TouchableOpacity 
      style={[styles.simCard, selectedSIM === sim.id && styles.selectedCard]}
      onPress={() => setSelectedSIM(sim.id)}
    >
      <View style={styles.simHeader}>
        <View style={styles.simInfo}>
          <Smartphone size={24} color="#007AFF" />
          <View style={styles.simDetails}>
            <Text style={styles.carrier}>{sim.carrier}</Text>
            <Text style={styles.number}>{sim.number}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: sim.status === 'active' ? '#34C759' : '#FF3B30' }]}>
          <Text style={styles.statusText}>{sim.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.simStats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Plan</Text>
          <Text style={styles.statValue}>{sim.plan}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Data Used</Text>
          <Text style={styles.statValue}>{sim.dataUsed} / {sim.dataLimit}</Text>
        </View>
      </View>
      
      <View style={styles.simActions}>
        <TouchableOpacity style={styles.actionButton}>
          <PenLine size={16} color="#007AFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Settings size={16} color="#007AFF" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
          <Trash2 size={16} color="#FF3B30" />
          <Text style={[styles.actionText, styles.dangerText]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'SIM Management',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Signal size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>SIM Card Management</Text>
              <Text style={styles.subtitle}>Manage your cellular connections</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add SIM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active SIM Cards</Text>
          {simCards.map(sim => (
            <SIMCard key={sim.id} sim={sim} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Settings size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Network Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Signal size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Signal Test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Smartphone size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>Device Info</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600'
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
  simCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  selectedCard: {
    borderColor: '#007AFF',
    borderWidth: 2
  },
  simHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  simInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  simDetails: {
    flex: 1
  },
  carrier: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  number: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  simStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  stat: {
    flex: 1
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  simActions: {
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
    gap: 4
  },
  dangerButton: {
    backgroundColor: '#ffebee'
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  dangerText: {
    color: '#FF3B30'
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
