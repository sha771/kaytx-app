 
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
  Mail,
  MessageSquare,
  FileText,
  Phone,
  Copy,
  Pencil,
  X,
  Star,
  TrendingUp,
  CircleCheck,
} from 'lucide-react-native';
import { mockNegotiationTemplates } from '@/utils/mockNegotiationData';
import type { NegotiationTemplate } from '@/types/negotiation';

export default function TemplatesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<NegotiationTemplate | null>(null);
  const [filterType, setFilterType] = useState<'all' | NegotiationTemplate['type']>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTemplates = mockNegotiationTemplates.filter((template: NegotiationTemplate) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={18} color="#007AFF" />;
      case 'sms':
        return <MessageSquare size={18} color="#34C759" />;
      case 'call-script':
        return <Phone size={18} color="#FF9500" />;
      case 'proposal':
        return <FileText size={18} color="#AF52DE" />;
      default:
        return <FileText size={18} color="#8E8E93" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return '#007AFF';
      case 'sms':
        return '#34C759';
      case 'call-script':
        return '#FF9500';
      case 'proposal':
        return '#AF52DE';
      default:
        return '#8E8E93';
    }
  };

  const totalTemplates = mockNegotiationTemplates.length;
  const avgSuccessRate =
    mockNegotiationTemplates.reduce((sum: number, t: NegotiationTemplate) => sum + t.successRate, 0) /
    totalTemplates;
  const totalUsage = mockNegotiationTemplates.reduce(
    (sum: number, t: NegotiationTemplate) => sum + t.timesUsed,
    0,
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Templates & Scripts',
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
              placeholder="Search templates..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#E8F5FF' }]}>
              <FileText size={20} color="#007AFF" />
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{totalTemplates}</Text>
              <Text style={styles.statLabel}>Templates</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}>
              <Star size={20} color="#34C759" />
              <Text style={[styles.statValue, { color: '#34C759' }]}>{avgSuccessRate.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Avg Success</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F5' }]}>
              <TrendingUp size={20} color="#FF2D92" />
              <Text style={[styles.statValue, { color: '#FF2D92' }]}>{totalUsage}</Text>
              <Text style={styles.statLabel}>Total Usage</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilters}>
            <TouchableOpacity
              style={[styles.typeChip, filterType === 'all' && styles.typeChipActive]}
              onPress={() => setFilterType('all')}
            >
              <Text style={[styles.typeChipText, filterType === 'all' && styles.typeChipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {(['email', 'sms', 'call-script', 'proposal'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeChip, filterType === type && styles.typeChipActive]}
                onPress={() => setFilterType(type)}
              >
                {getTypeIcon(type)}
                <Text style={[styles.typeChipText, filterType === type && styles.typeChipTextActive]}>
                  {type === 'call-script' ? 'Call Script' : type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.templatesList}>
            {filteredTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateCard}
                onPress={() => setSelectedTemplate(template)}
              >
                <View style={styles.templateHeader}>
                  <View style={[styles.typeIconContainer, { backgroundColor: getTypeColor(template.type) + '20' }]}>
                    {getTypeIcon(template.type)}
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={styles.templateTitle}>{template.title}</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{template.category}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.templatePreview} numberOfLines={3}>
                  {template.content}
                </Text>

                <View style={styles.templateStats}>
                  <View style={styles.statItem}>
                    <Star size={14} color="#FFD700" />
                    <Text style={styles.statText}>{template.successRate}% success</Text>
                  </View>
                  <View style={styles.statItem}>
                    <TrendingUp size={14} color="#34C759" />
                    <Text style={styles.statText}>Used {template.timesUsed}x</Text>
                  </View>
                </View>

                <View style={styles.variablesSection}>
                  <Text style={styles.variablesLabel}>Variables:</Text>
                  <View style={styles.variablesList}>
                    {template.variables.slice(0, 3).map((variable: string, index: number) => (
                      <View key={index} style={styles.variableChip}>
                        <Text style={styles.variableText}>{`{{${variable}}}`}</Text>
                      </View>
                    ))}
                    {template.variables.length > 3 && (
                      <Text style={styles.moreVariables}>+{template.variables.length - 3} more</Text>
                    )}
                  </View>
                </View>

                <View style={styles.templateActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Copy size={16} color="#007AFF" />
                    <Text style={styles.actionButtonText}>Copy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Pencil size={16} color="#FF2D92" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={selectedTemplate !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedTemplate(null)}
        >
          {selectedTemplate && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Template Details</Text>
                <View style={styles.modalHeaderActions}>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Copy size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Pencil size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTemplate(null)}>
                    <X size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.modalTemplateHeader}>
                  <View style={[styles.modalTypeIcon, { backgroundColor: getTypeColor(selectedTemplate.type) + '20' }]}>
                    {getTypeIcon(selectedTemplate.type)}
                  </View>
                  <Text style={styles.modalTemplateTitle}>{selectedTemplate.title}</Text>
                  <View style={styles.modalCategoryBadge}>
                    <Text style={styles.modalCategoryText}>{selectedTemplate.category}</Text>
                  </View>
                </View>

                <View style={styles.modalStatsRow}>
                  <View style={styles.modalStatCard}>
                    <Text style={styles.modalStatValue}>{selectedTemplate.successRate}%</Text>
                    <Text style={styles.modalStatLabel}>Success Rate</Text>
                  </View>
                  <View style={styles.modalStatCard}>
                    <Text style={styles.modalStatValue}>{selectedTemplate.timesUsed}</Text>
                    <Text style={styles.modalStatLabel}>Times Used</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Template Content</Text>
                  <View style={styles.contentCard}>
                    <Text style={styles.contentText}>{selectedTemplate.content}</Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Available Variables</Text>
                  <Text style={styles.modalVariablesTitle}>Available Variables</Text>
                  <Text style={styles.modalVariablesDescription}>
                    Use these placeholders in your template. They will be automatically replaced with actual values.
                  </Text>
                  <View style={styles.modalVariablesList}>
                    {selectedTemplate.variables.map((variable: string, index: number) => (
                      <View key={index} style={styles.modalVariableItem}>
                        <View style={styles.modalVariableChip}>
                          <Text style={styles.modalVariableText}>{`{{${variable}}}`}</Text>
                        </View>
                        <TouchableOpacity style={styles.copyVariableButton}>
                          <Copy size={14} color="#007AFF" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Performance</Text>
                  <View style={styles.performanceCard}>
                    <View style={styles.performanceRow}>
                      <Star size={18} color="#FFD700" />
                      <View style={styles.performanceInfo}>
                        <Text style={styles.performanceLabel}>Success Rate</Text>
                        <Text style={styles.performanceValue}>{selectedTemplate.successRate}%</Text>
                      </View>
                    </View>
                    <View style={styles.performanceRow}>
                      <TrendingUp size={18} color="#34C759" />
                      <View style={styles.performanceInfo}>
                        <Text style={styles.performanceLabel}>Total Usage</Text>
                        <Text style={styles.performanceValue}>{selectedTemplate.timesUsed} times</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.modalActionsSection}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Copy size={20} color="#FFFFFF" />
                    <Text style={styles.primaryButtonText}>Copy Template</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <Pencil size={20} color="#FF2D92" />
                    <Text style={styles.secondaryButtonText}>Edit Template</Text>
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
              <Text style={styles.modalTitle}>New Template</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Template Title</Text>
                <TextInput style={styles.input} placeholder="Follow-up Email" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Type</Text>
                <View style={styles.typeOptions}>
                  <TouchableOpacity style={styles.typeOption}>
                    <Mail size={20} color="#007AFF" />
                    <Text style={styles.typeOptionText}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.typeOption}>
                    <MessageSquare size={20} color="#34C759" />
                    <Text style={styles.typeOptionText}>SMS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.typeOption}>
                    <Phone size={20} color="#FF9500" />
                    <Text style={styles.typeOptionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.typeOption}>
                    <FileText size={20} color="#AF52DE" />
                    <Text style={styles.typeOptionText}>Proposal</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Category</Text>
                <TextInput style={styles.input} placeholder="Prospecting, Follow-up, etc." placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Template Content</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Hi {{firstName}}, ..."
                  placeholderTextColor="#8E8E93"
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Variables (comma separated)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="firstName, companyName, productName"
                  placeholderTextColor="#8E8E93"
                />
              </View>

              <TouchableOpacity style={styles.createButton}>
                <CircleCheck size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Template</Text>
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
  typeFilters: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    gap: 6,
  },
  typeChipActive: {
    backgroundColor: '#FF2D92',
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  typeChipTextActive: {
    color: '#FFFFFF',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  templatesList: {
    padding: 16,
    gap: 16,
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  templateHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  typeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#8E8E93',
    textTransform: 'capitalize' as const,
  },
  templatePreview: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8E8E93',
    marginBottom: 12,
  },
  templateStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  variablesSection: {
    marginBottom: 12,
  },
  variablesLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#8E8E93',
    marginBottom: 6,
  },
  variablesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  variableChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFF0F5',
    borderRadius: 6,
  },
  variableText: {
    fontSize: 11,
    color: '#FF2D92',
    fontFamily: 'monospace',
  },
  moreVariables: {
    fontSize: 11,
    color: '#8E8E93',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#1A1A1A',
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
  modalTemplateHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTemplateTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCategoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  modalCategoryText: {
    fontSize: 13,
    color: '#8E8E93',
    textTransform: 'capitalize' as const,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modalStatCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  modalStatValue: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#FF2D92',
    marginBottom: 4,
  },
  modalStatLabel: {
    fontSize: 13,
    color: '#8E8E93',
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
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  variablesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  variablesHelp: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 18,
  },
  modalVariablesList: {
    gap: 8,
  },
  modalVariableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  modalVariableChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF0F5',
    borderRadius: 8,
  },
  modalVariableText: {
    fontSize: 14,
    color: '#FF2D92',
    fontFamily: 'monospace',
  },
  copyVariableButton: {
    padding: 8,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF2D92',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FF2D92',
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
  textArea: {
    minHeight: 150,
    paddingTop: 14,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 8,
  },
  typeOptionText: {
    fontSize: 14,
    color: '#1A1A1A',
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
