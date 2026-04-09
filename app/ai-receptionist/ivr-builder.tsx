 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  Plus,
  Phone,
  MessageSquare,
  Settings,
  Play,
  Trash2,
  Edit,
  Save,
  X,
  Lock,
} from 'lucide-react-native';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

export default function IVRBuilderScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: nodes = [], isLoading, refetch } = trpc.receptionist.getIVRNodes.useQuery();
  const utils = trpc.useUtils();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNode, setEditingNode] = useState<any | null>(null);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodePrompt, setNewNodePrompt] = useState('');
  const [newNodeType, setNewNodeType] = useState<string>('menu');

  const addNodeMutation = trpc.receptionist.addIVRNode.useMutation({
    onSuccess: () => {
      utils.receptionist.getIVRNodes.invalidate();
      setModalVisible(false);
      resetForm();
    },
  });

  const deleteNodeMutation = trpc.receptionist.deleteIVRNode.useMutation({
    onSuccess: () => utils.receptionist.getIVRNodes.invalidate(),
  });

  const resetForm = () => {
    setNewNodeTitle('');
    setNewNodePrompt('');
    setEditingNode(null);
  };

  const addNode = () => {
    if (!isEnterprise) {
      router.push('/enterprise-admin');
      return;
    }
    addNodeMutation.mutate({
      title: newNodeTitle,
      prompt: newNodePrompt,
      type: newNodeType as any,
    });
  };

  const deleteNode = (id: string) => {
    deleteNodeMutation.mutate({ id });
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'menu':
        return <MessageSquare size={20} color="#3B82F6" />;
      case 'transfer':
        return <Phone size={20} color="#10B981" />;
      case 'voicemail':
        return <MessageSquare size={20} color="#F59E0B" />;
      case 'action':
        return <Settings size={20} color="#8B5CF6" />;
      default:
        return <MessageSquare size={20} color="#64748B" />;
    }
  };

  const nodeTypes: string[] = ['menu', 'transfer', 'voicemail', 'action', 'message'];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'IVR Builder',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.headerButton}
            >
              <Plus size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>IVR Flow Builder</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              Create custom call flows for your business
            </Text>
          </View>

          <View style={styles.flowContainer}>
            <TouchableOpacity style={[styles.testButton, { backgroundColor: theme.colors.success }]} >
              <Play size={20} color="#fff" />
              <Text style={styles.testButtonText}>Test IVR Flow</Text>
            </TouchableOpacity>

            {!isEnterprise && (
              <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]} >
                <Lock size={48} color={theme.colors.primary} style={{ marginBottom: 16 }} />
                <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Enterprise Feature</Text>
                <Text style={[styles.lockDescription, { color: theme.colors.secondaryText }]}>
                  Custom IVR menus and advanced call routing are available on the Enterprise plan.
                </Text>
                <TouchableOpacity 
                  style={[styles.upgradeButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => router.push('/enterprise-admin')}
                >
                  <Text style={styles.upgradeButtonText}>Upgrade to Enterprise</Text>
                </TouchableOpacity>
              </View>
            )}

            {nodes.map((node: any, index: number) => (
              <View key={node.id}>
                {index > 0 && <View style={[styles.connector, { backgroundColor: theme.colors.border }]} />}
                
                <View style={[styles.nodeCard, { backgroundColor: theme.colors.cardBackground }]} >
                  <View style={styles.nodeHeader}>
                    <View style={styles.nodeHeaderLeft}>
                      {getNodeIcon(node.type)}
                      <View style={styles.nodeInfo}>
                        <Text style={[styles.nodeTitle, { color: theme.colors.text }]}>{node.title}</Text>
                        <Text style={[styles.nodeType, { color: theme.colors.secondaryText }]}>{node.type.toUpperCase()}</Text>
                      </View>
                    </View>
                    {isEnterprise && (
                      <View style={styles.nodeActions}>
                        <TouchableOpacity
                          onPress={() => {
                            setEditingNode(node);
                            setNewNodeTitle(node.title);
                            setNewNodePrompt(node.prompt);
                            setNewNodeType(node.type);
                            setModalVisible(true);
                          }}
                          style={styles.iconButton}
                        >
                          <Edit size={18} color={theme.colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deleteNode(node.id)}
                          style={styles.iconButton}
                        >
                          <Trash2 size={18} color={theme.colors.error} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <View style={[styles.promptContainer, { backgroundColor: theme.colors.background }]} >
                    <Text style={[styles.promptLabel, { color: theme.colors.secondaryText }]}>Prompt:</Text>
                    <Text style={[styles.promptText, { color: theme.colors.text }]}>{node.prompt}</Text>
                  </View>

                  {node.options && node.options.length > 0 && (
                    <View style={styles.optionsContainer}>
                      <Text style={[styles.optionsLabel, { color: theme.colors.secondaryText }]}>Options:</Text>
                      {node.options.map((option: any) => (
                        <View key={option.key} style={styles.optionRow}>
                          <View style={[styles.optionKey, { backgroundColor: theme.colors.primary }]} >
                            <Text style={styles.optionKeyText}>{option.key}</Text>
                          </View>
                          <Text style={[styles.optionLabelText, { color: theme.colors.text }]}>{option.label}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {node.action && (
                    <View style={[styles.actionContainer, { backgroundColor: theme.colors.background }]} >
                      <Text style={[styles.actionLabel, { color: theme.colors.secondaryText }]}>Action:</Text>
                      <Text style={[styles.actionText, { color: theme.colors.success }]}>{node.action}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {isEnterprise && (
              <TouchableOpacity
                style={[styles.addNodeButton, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
                onPress={() => setModalVisible(true)}
              >
                <Plus size={24} color={theme.colors.primary} />
                <Text style={[styles.addNodeText, { color: theme.colors.primary }]}>Add Node</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.saveContainer}>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} >
              <Save size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Save IVR Flow</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]} >
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]} >
              <Text style={[styles.modalTitle, { color: theme.colors.text }]} >
                {editingNode ? 'Edit Node' : 'Add New Node'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} >
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.inputLabel, { color: theme.colors.secondaryText }]}>Node Title</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
                placeholder="Enter node title"
                placeholderTextColor={theme.colors.secondaryText}
                value={newNodeTitle}
                onChangeText={setNewNodeTitle}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.secondaryText }]}>Prompt Message</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.colors.text, backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
                placeholder="Enter prompt message"
                placeholderTextColor={theme.colors.secondaryText}
                value={newNodePrompt}
                onChangeText={setNewNodePrompt}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.secondaryText }]}>Node Type</Text>
              <View style={styles.typeSelector}>
                {nodeTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      { backgroundColor: theme.colors.background, borderColor: theme.colors.border },
                      newNodeType === type && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
                    ]}
                    onPress={() => setNewNodeType(type)}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        { color: theme.colors.secondaryText },
                        newNodeType === type && { color: '#fff' },
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={[styles.modalSaveButton, { backgroundColor: theme.colors.primary }]} onPress={addNode} >
                <Text style={styles.modalSaveButtonText}>
                  {editingNode ? 'Update Node' : 'Add Node'}
                </Text>
              </TouchableOpacity>
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
  },
  subtitle: {
    fontSize: 16,
  },
  flowContainer: {
    padding: 16,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  connector: {
    width: 2,
    height: 20,
    marginLeft: 24,
  },
  nodeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  nodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nodeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  nodeType: {
    fontSize: 12,
    fontWeight: '600',
  },
  nodeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  promptContainer: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  promptText: {
    fontSize: 14,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionsLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  optionKey: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionKeyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  optionLabelText: {
    fontSize: 14,
  },
  actionContainer: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  addNodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
    gap: 8,
  },
  addNodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  saveContainer: {
    padding: 16,
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
    maxHeight: '80%',
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
  },
  typeButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  modalSaveButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
