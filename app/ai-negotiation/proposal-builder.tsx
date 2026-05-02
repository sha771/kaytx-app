 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Plus,
  FileText,
  Send,
  Save,
  Eye,
  Trash2,
  Copy,
  Download,
  X,
  Pencil,
} from 'lucide-react-native';

interface ProposalSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface Proposal {
  id: string;
  title: string;
  clientName: string;
  value: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted';
  createdAt: string;
  sections: ProposalSection[];
}

export default function ProposalBuilderScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Enterprise Solution Proposal',
      clientName: 'Acme Corporation',
      value: 125000,
      status: 'sent',
      createdAt: '2024-01-03',
      sections: [
        {
          id: '1',
          title: 'Executive Summary',
          content: 'Overview of the proposed solution...',
          order: 1,
        },
        {
          id: '2',
          title: 'Solution Overview',
          content: 'Detailed description of our offering...',
          order: 2,
        },
      ],
    },
    {
      id: '2',
      title: 'Marketing Automation Package',
      clientName: 'Tech Solutions Inc',
      value: 85000,
      status: 'viewed',
      createdAt: '2024-01-02',
      sections: [],
    },
    {
      id: '3',
      title: 'Custom CRM Implementation',
      clientName: 'Global Enterprises',
      value: 250000,
      status: 'draft',
      createdAt: '2024-01-01',
      sections: [],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#64748B';
      case 'sent':
        return '#3B82F6';
      case 'viewed':
        return '#F59E0B';
      case 'accepted':
        return '#10B981';
      default:
        return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Pencil size={16} color="#64748B" />;
      case 'sent':
        return <Send size={16} color="#3B82F6" />;
      case 'viewed':
        return <Eye size={16} color="#F59E0B" />;
      case 'accepted':
        return <FileText size={16} color="#10B981" />;
      default:
        return <FileText size={16} color="#64748B" />;
    }
  };

  const stats = {
    total: proposals.length,
    draft: proposals.filter((p) => p.status === 'draft').length,
    sent: proposals.filter((p) => p.status === 'sent').length,
    accepted: proposals.filter((p) => p.status === 'accepted').length,
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Proposal Builder',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.headerButton}
            >
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Build Winning Proposals</Text>
          <Text style={styles.subtitle}>Create and track professional proposals</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#64748B' }]}>{stats.draft}</Text>
            <Text style={styles.statLabel}>Draft</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>{stats.sent}</Text>
            <Text style={styles.statLabel}>Sent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>{stats.accepted}</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Proposals</Text>

          {proposals.map((proposal) => (
            <View key={proposal.id} style={styles.proposalCard}>
              <View style={styles.proposalHeader}>
                <View style={styles.proposalInfo}>
                  <Text style={styles.proposalTitle}>{proposal.title}</Text>
                  <Text style={styles.clientName}>{proposal.clientName}</Text>
                  <Text style={styles.proposalValue}>
                    ${proposal.value.toLocaleString()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(proposal.status) + '20' },
                  ]}
                >
                  <View style={styles.statusContent}>
                    {getStatusIcon(proposal.status)}
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(proposal.status) },
                      ]}
                    >
                      {proposal.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.proposalMeta}>
                <Text style={styles.metaText}>
                  Created: {new Date(proposal.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.metaText}>
                  {proposal.sections.length} sections
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setSelectedProposal(proposal);
                    setModalVisible(true);
                  }}
                >
                  <Pencil size={18} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Copy size={18} color="#8B5CF6" />
                  <Text style={styles.actionButtonText}>Clone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Download size={18} color="#10B981" />
                  <Text style={styles.actionButtonText}>Export</Text>
                </TouchableOpacity>

                {proposal.status === 'draft' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Send size={18} color="#F59E0B" />
                    <Text style={styles.actionButtonText}>Send</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.templatesSection}>
          <Text style={styles.sectionTitle}>Quick Start Templates</Text>
          <View style={styles.templatesGrid}>
            {[
              'Enterprise Solution',
              'Marketing Package',
              'Consulting Services',
              'Product License',
            ].map((template, index) => (
              <TouchableOpacity key={index} style={styles.templateCard}>
                <FileText size={24} color="#3B82F6" />
                <Text style={styles.templateName}>{template}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedProposal(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedProposal ? 'Edit Proposal' : 'New Proposal'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedProposal(null);
                }}
              >
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Proposal Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter proposal title"
                placeholderTextColor="#64748B"
                defaultValue={selectedProposal?.title}
              />

              <Text style={styles.inputLabel}>Client Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter client name"
                placeholderTextColor="#64748B"
                defaultValue={selectedProposal?.clientName}
              />

              <Text style={styles.inputLabel}>Deal Value</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter deal value"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                defaultValue={selectedProposal?.value.toString()}
              />

              <Text style={styles.inputLabel}>Sections</Text>
              {selectedProposal?.sections.map((section) => (
                <View key={section.id} style={styles.sectionCard}>
                  <View style={styles.sectionCardHeader}>
                    <Text style={styles.sectionCardTitle}>{section.title}</Text>
                    <TouchableOpacity>
                      <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.addSectionButton}>
                <Plus size={20} color="#3B82F6" />
                <Text style={styles.addSectionText}>Add Section</Text>
              </TouchableOpacity>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.saveButton}>
                  <Save size={20} color="#fff" />
                  <Text style={styles.saveButtonText}>Save Proposal</Text>
                </TouchableOpacity>

                {selectedProposal && selectedProposal.status === 'draft' && (
                  <TouchableOpacity style={styles.sendButton}>
                    <Send size={20} color="#fff" />
                    <Text style={styles.sendButtonText}>Send to Client</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerButton: {
    marginRight: 16,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  proposalCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  proposalInfo: {
    flex: 1,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  proposalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  proposalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  templatesSection: {
    padding: 16,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  sectionCard: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  addSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
    gap: 8,
    marginTop: 8,
  },
  addSectionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  modalActions: {
    gap: 12,
    marginTop: 24,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
