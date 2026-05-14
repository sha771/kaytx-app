 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Headphones as HeadphonesIcon, MessageCircle, Phone, Clock, Star, Users } from 'lucide-react-native';

interface SupportTicket {
  id: string;
  customer: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  channel: 'email' | 'chat' | 'phone' | 'social';
  assignedTo: string;
  createdAt: string;
  responseTime: string;
}

interface SupportAgent {
  id: string;
  name: string;
  status: 'online' | 'busy' | 'offline';
  activeTickets: number;
  rating: number;
  responseTime: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: '1',
    customer: 'John Smith',
    subject: 'Login issues with mobile app',
    priority: 'high',
    status: 'in-progress',
    channel: 'chat',
    assignedTo: 'Sarah Wilson',
    createdAt: '2 hours ago',
    responseTime: '15 min'
  },
  {
    id: '2',
    customer: 'Emily Davis',
    subject: 'Billing question about subscription',
    priority: 'medium',
    status: 'open',
    channel: 'email',
    assignedTo: 'Mike Johnson',
    createdAt: '4 hours ago',
    responseTime: 'Pending'
  }
];

const mockAgents: SupportAgent[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    status: 'online',
    activeTickets: 5,
    rating: 4.8,
    responseTime: '12 min'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    status: 'busy',
    activeTickets: 8,
    rating: 4.6,
    responseTime: '18 min'
  }
];

export default function CustomerSupportScreen() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [agents, setAgents] = useState<SupportAgent[]>(mockAgents);
  const [activeTab, setActiveTab] = useState<'tickets' | 'agents'>('tickets');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#007AFF';
      case 'in-progress': return '#FF9500';
      case 'resolved': return '#34C759';
      case 'closed': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <MessageCircle size={16} color="#007AFF" />;
      case 'chat': return <MessageCircle size={16} color="#34C759" />;
      case 'phone': return <Phone size={16} color="#FF9500" />;
      case 'social': return <Users size={16} color="#FF3B30" />;
      default: return <MessageCircle size={16} color="#8E8E93" />;
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#34C759';
      case 'busy': return '#FF9500';
      case 'offline': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const TicketCard = ({ ticket }: { ticket: SupportTicket }) => (
    <TouchableOpacity style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketSubject}>{ticket.subject}</Text>
          <Text style={styles.ticketCustomer}>{ticket.customer}</Text>
        </View>
        <View style={styles.ticketBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) }]}>
            <Text style={styles.badgeText}>{ticket.priority.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
            <Text style={styles.badgeText}>{ticket.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.ticketDetails}>
        <View style={styles.ticketMeta}>
          {getChannelIcon(ticket.channel)}
          <Text style={styles.metaText}>{ticket.channel}</Text>
          <Clock size={16} color="#666" />
          <Text style={styles.metaText}>{ticket.createdAt}</Text>
        </View>
        <Text style={styles.assignedAgent}>Assigned to {ticket.assignedTo}</Text>
      </View>
      
      <View style={styles.ticketFooter}>
        <Text style={styles.responseTime}>Response: {ticket.responseTime}</Text>
        <View style={styles.ticketActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={16} color="#007AFF" />
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={16} color="#007AFF" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const AgentCard = ({ agent }: { agent: SupportAgent }) => (
    <TouchableOpacity style={styles.agentCard}>
      <View style={styles.agentHeader}>
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>{agent.name}</Text>
          <View style={styles.agentStatus}>
            <View style={[styles.statusIndicator, { backgroundColor: getAgentStatusColor(agent.status) }]} />
            <Text style={styles.statusText}>{agent.status}</Text>
          </View>
        </View>
        <View style={styles.agentRating}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{agent.rating}</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{agent.activeTickets}</Text>
          <Text style={styles.metricLabel}>Active Tickets</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{agent.responseTime}</Text>
          <Text style={styles.metricLabel}>Avg Response</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Customer Support',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <HeadphonesIcon size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Customer Support</Text>
              <Text style={styles.subtitle}>Manage support tickets and agents</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MessageCircle size={24} color="#007AFF" />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Open Tickets</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color="#34C759" />
            <Text style={styles.statValue}>15 min</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color="#FFD700" />
            <Text style={styles.statValue}>4.7</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tickets' && styles.activeTab]}
            onPress={() => setActiveTab('tickets')}
          >
            <MessageCircle size={20} color={activeTab === 'tickets' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'tickets' && styles.activeTabText]}>
              Support Tickets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'agents' && styles.activeTab]}
            onPress={() => setActiveTab('agents')}
          >
            <Users size={20} color={activeTab === 'agents' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'agents' && styles.activeTabText]}>
              Support Agents
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'tickets' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Tickets</Text>
            {tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support Team</Text>
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <MessageCircle size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>New Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <HeadphonesIcon size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Star size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Feedback</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  activeTab: {
    backgroundColor: '#007AFF'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabText: {
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
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  ticketInfo: {
    flex: 1,
    marginRight: 12
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4
  },
  ticketCustomer: {
    fontSize: 14,
    color: '#666'
  },
  ticketBadges: {
    gap: 4
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },
  ticketDetails: {
    marginBottom: 12
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  metaText: {
    fontSize: 12,
    color: '#666'
  },
  assignedAgent: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  responseTime: {
    fontSize: 12,
    color: '#666'
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 8
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    gap: 4
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  },
  agentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  agentInfo: {
    flex: 1
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize'
  },
  agentRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  metric: {
    alignItems: 'center'
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
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
