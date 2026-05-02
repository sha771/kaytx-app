 
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
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  Clock,
  User,
  Calendar,
  X,
  Pencil,
  CircleCheck,
  Target,
  ChartBar,
  Award,
} from 'lucide-react-native';
import { mockDeals } from '@/utils/mockNegotiationData';
import type { Deal } from '@/types/negotiation';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

export default function DealsScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedStage, setSelectedStage] = useState<'all' | Deal['stage']>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // tRPC data fetching
  const { data: dealsData, isLoading: dealsLoading, refetch: refetchDeals } = trpc.negotiation.getDeals.useQuery();
  const createDealMutation = trpc.negotiation.createDeal.useMutation();
  const updateDealMutation = trpc.negotiation.updateDeal.useMutation();
  const deleteDealMutation = trpc.negotiation.deleteDeal.useMutation();

  const stages: Deal['stage'][] = ['discovery', 'qualification', 'proposal', 'negotiation', 'closing', 'won', 'lost'];

  const filteredDeals = (dealsData || mockDeals).filter((deal: Deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = selectedStage === 'all' || deal.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = (dealsData || mockDeals).filter((d: Deal) => d.stage === stage);
    return acc;
  }, {} as Record<Deal['stage'], Deal[]>);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'won':
        return '#34C759';
      case 'closing':
        return '#5AC8FA';
      case 'negotiation':
        return '#FF9500';
      case 'proposal':
        return '#007AFF';
      case 'qualification':
        return '#AF52DE';
      case 'discovery':
        return '#FF2D92';
      case 'lost':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const totalValue = mockDeals.reduce((sum: number, deal: Deal) => sum + deal.value, 0);
  const wonDeals = mockDeals.filter((d: Deal) => d.stage === 'won');
  const wonValue = wonDeals.reduce((sum: number, deal: Deal) => sum + deal.value, 0);
  const avgProbability = mockDeals.reduce((sum: number, deal: Deal) => sum + deal.probability, 0) / mockDeals.length;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Deals Pipeline',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
              <Plus size={24} color="#FF2D92" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.topSection}>
          <View style={styles.searchBar}>
            <Search size={18} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search deals..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#E8F5FF' }]}>
              <DollarSign size={20} color="#007AFF" />
              <Text style={[styles.statValue, { color: '#007AFF' }]}>${(totalValue / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>Pipeline</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}>
              <Award size={20} color="#34C759" />
              <Text style={[styles.statValue, { color: '#34C759' }]}>{wonDeals.length}</Text>
              <Text style={styles.statLabel}>Won Deals</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F5' }]}>
              <TrendingUp size={20} color="#FF2D92" />
              <Text style={[styles.statValue, { color: '#FF2D92' }]}>${(wonValue / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F5F0FF' }]}>
              <Target size={20} color="#AF52DE" />
              <Text style={[styles.statValue, { color: '#AF52DE' }]}>{avgProbability.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Avg Probability</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stageFilter}>
            <TouchableOpacity
              style={[styles.stageChip, selectedStage === 'all' && styles.stageChipActive]}
              onPress={() => setSelectedStage('all')}
            >
              <Text style={[styles.stageChipText, selectedStage === 'all' && styles.stageChipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {stages.map((stage) => (
              <TouchableOpacity
                key={stage}
                style={[styles.stageChip, selectedStage === stage && styles.stageChipActive]}
                onPress={() => setSelectedStage(stage)}
              >
                <View style={[styles.stageDot, { backgroundColor: getStageColor(stage) }]} />
                <Text style={[styles.stageChipText, selectedStage === stage && styles.stageChipTextActive]}>
                  {stage.charAt(0).toUpperCase() + stage.slice(1)} ({dealsByStage[stage].length})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.dealsList}>
            {filteredDeals.map((deal) => (
              <TouchableOpacity
                key={deal.id}
                style={styles.dealCard}
                onPress={() => setSelectedDeal(deal)}
              >
                <View style={styles.dealHeader}>
                  <View style={styles.dealHeaderLeft}>
                    <Text style={styles.dealTitle}>{deal.title}</Text>
                    <Text style={styles.dealCompany}>{deal.customerCompany}</Text>
                  </View>
                  <View style={[styles.stageBadge, { backgroundColor: getStageColor(deal.stage) + '20' }]}>
                    <View style={[styles.stageBadgeDot, { backgroundColor: getStageColor(deal.stage) }]} />
                    <Text style={[styles.stageBadgeText, { color: getStageColor(deal.stage) }]}>
                      {deal.stage}
                    </Text>
                  </View>
                </View>

                <View style={styles.dealMeta}>
                  <View style={styles.dealMetaItem}>
                    <User size={14} color="#8E8E93" />
                    <Text style={styles.dealMetaText}>{deal.customerName}</Text>
                  </View>
                  <View style={styles.dealMetaItem}>
                    <User size={14} color="#8E8E93" />
                    <Text style={styles.dealMetaText}>Owner: {deal.owner}</Text>
                  </View>
                </View>

                <View style={styles.dealValueRow}>
                  <View style={styles.dealValueItem}>
                    <DollarSign size={16} color="#34C759" />
                    <Text style={styles.dealValue}>${deal.value.toLocaleString()}</Text>
                  </View>
                  <View style={styles.dealProbability}>
                    <Target size={14} color="#FF2D92" />
                    <Text style={styles.dealProbabilityText}>{deal.probability}% probability</Text>
                  </View>
                </View>

                <View style={styles.dealFooter}>
                  <View style={styles.dealFooterItem}>
                    <Calendar size={14} color="#8E8E93" />
                    <Text style={styles.dealFooterText}>
                      Close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.dealFooterItem}>
                    <Clock size={14} color="#8E8E93" />
                    <Text style={styles.dealFooterText}>
                      Updated: {new Date(deal.lastActivity).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                {deal.discountOffered && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{deal.discountOffered}% Discount Offered</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={selectedDeal !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedDeal(null)}
        >
          {selectedDeal && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Deal Details</Text>
                <View style={styles.modalHeaderActions}>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Pencil size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedDeal(null)}>
                    <X size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.modalDealHeader}>
                  <Text style={styles.modalDealTitle}>{selectedDeal.title}</Text>
                  <View style={[styles.modalStageBadge, { backgroundColor: getStageColor(selectedDeal.stage) + '20' }]}>
                    <Text style={[styles.modalStageBadgeText, { color: getStageColor(selectedDeal.stage) }]}>
                      {selectedDeal.stage.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalValueCard}>
                  <Text style={styles.modalValueLabel}>Deal Value</Text>
                  <Text style={styles.modalValueAmount}>${selectedDeal.value.toLocaleString()}</Text>
                  <View style={styles.modalProbabilityRow}>
                    <Target size={18} color="#FF2D92" />
                    <Text style={styles.modalProbabilityText}>{selectedDeal.probability}% probability</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Customer Information</Text>
                  <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Contact:</Text>
                      <Text style={styles.infoValue}>{selectedDeal.customerName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Company:</Text>
                      <Text style={styles.infoValue}>{selectedDeal.customerCompany}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Owner:</Text>
                      <Text style={styles.infoValue}>{selectedDeal.owner}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Deal Information</Text>
                  <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Product:</Text>
                      <Text style={styles.infoValue}>{selectedDeal.product}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Expected Close:</Text>
                      <Text style={styles.infoValue}>
                        {new Date(selectedDeal.expectedCloseDate).toLocaleDateString()}
                      </Text>
                    </View>
                    {selectedDeal.discountOffered && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Discount:</Text>
                        <Text style={[styles.infoValue, { color: '#FF9500' }]}>
                          {selectedDeal.discountOffered}%
                        </Text>
                      </View>
                    )}
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Last Activity:</Text>
                      <Text style={styles.infoValue}>
                        {new Date(selectedDeal.lastActivity).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedDeal.notes && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Notes</Text>
                    <View style={styles.notesCard}>
                      <Text style={styles.notesText}>{selectedDeal.notes}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Pipeline Stage</Text>
                  <View style={styles.pipelineStages}>
                    {stages.map((stage) => {
                      const isActive = stage === selectedDeal.stage;
                      const stageIndex = stages.indexOf(stage);
                      const currentIndex = stages.indexOf(selectedDeal.stage);
                      const isPassed = stageIndex < currentIndex;

                      return (
                        <View key={stage} style={styles.pipelineStageItem}>
                          <View
                            style={[
                              styles.pipelineStageCircle,
                              {
                                backgroundColor: isActive || isPassed ? getStageColor(stage) : '#E5E5EA',
                              },
                            ]}
                          >
                            {(isActive || isPassed) && <CircleCheck size={16} color="#FFFFFF" />}
                          </View>
                          <Text
                            style={[
                              styles.pipelineStageText,
                              {
                                color: isActive || isPassed ? getStageColor(stage) : '#8E8E93',
                                fontWeight: isActive ? '600' : '400',
                              },
                            ]}
                          >
                            {stage}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.modalActionsSection}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <CircleCheck size={20} color="#FFFFFF" />
                    <Text style={styles.primaryButtonText}>Mark as Won</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryButton, { borderColor: '#007AFF' }]}>
                    <Text style={[styles.secondaryButtonText, { color: '#007AFF' }]}>Move to Next Stage</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowAddModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Deal</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Deal Title</Text>
                <TextInput style={styles.input} placeholder="Enterprise Package" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Customer Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Company</Text>
                <TextInput style={styles.input} placeholder="Acme Corp" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Deal Value</Text>
                <TextInput
                  style={styles.input}
                  placeholder="75000"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Product/Service</Text>
                <TextInput style={styles.input} placeholder="Enterprise Plan" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Expected Close Date</Text>
                <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#8E8E93" />
              </View>

              <TouchableOpacity style={styles.createButton}>
                <Plus size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Deal</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  statLabel: {
    fontSize: 10,
    color: '#8E8E93',
  },
  stageFilter: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  stageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    gap: 6,
  },
  stageChipActive: {
    backgroundColor: '#FF2D92',
  },
  stageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stageChipText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  stageChipTextActive: {
    color: '#FFFFFF',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  dealsList: {
    padding: 16,
    gap: 16,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealHeaderLeft: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  dealCompany: {
    fontSize: 14,
    color: '#8E8E93',
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  stageBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stageBadgeText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  dealMeta: {
    gap: 6,
    marginBottom: 12,
  },
  dealMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dealMetaText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  dealValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dealValueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#34C759',
  },
  dealProbability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealProbabilityText: {
    fontSize: 13,
    color: '#FF2D92',
    fontWeight: '500' as const,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealFooterText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  discountBadge: {
    marginTop: 12,
    backgroundColor: '#FFF5F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '600' as const,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalHeaderActions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  modalHeaderButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalDealHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalDealTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalStageBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalStageBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  modalValueCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  modalValueLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  modalValueAmount: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: '#34C759',
    marginBottom: 12,
  },
  modalProbabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalProbabilityText: {
    fontSize: 15,
    color: '#FF2D92',
    fontWeight: '600' as const,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  notesText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  pipelineStages: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  pipelineStageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pipelineStageCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipelineStageText: {
    fontSize: 15,
    textTransform: 'capitalize' as const,
  },
  modalActionsSection: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
