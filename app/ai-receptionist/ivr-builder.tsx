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
  Phone,
  MessageSquare,
  Settings,
  Play,
  Trash2,
  Edit,
  Save,
  X,
} from 'lucide-react-native';

interface IVRNode {
  id: string;
  type: 'menu' | 'action' | 'transfer' | 'voicemail' | 'message';
  title: string;
  prompt: string;
  options?: IVROption[];
  action?: string;
}

interface IVROption {
  key: string;
  label: string;
  nextNodeId?: string;
}

export default function IVRBuilderScreen() {
  const [nodes, setNodes] = useState<IVRNode[]>([
    {
      id: '1',
      type: 'menu',
      title: 'Main Menu',
      prompt: 'Thank you for calling. Press 1 for Sales, 2 for Support, 3 for Billing',
      options: [
        { key: '1', label: 'Sales', nextNodeId: '2' },
        { key: '2', label: 'Support', nextNodeId: '3' },
        { key: '3', label: 'Billing', nextNodeId: '4' },
      ],
    },
    {
      id: '2',
      type: 'transfer',
      title: 'Transfer to Sales',
      prompt: 'Transferring you to our sales team',
      action: '+1 (555) 100-0001',
    },
    {
      id: '3',
      type: 'transfer',
      title: 'Transfer to Support',
      prompt: 'Connecting you with our support team',
      action: '+1 (555) 100-0002',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNode, setEditingNode] = useState<IVRNode | null>(null);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodePrompt, setNewNodePrompt] = useState('');
  const [newNodeType, setNewNodeType] = useState<IVRNode['type']>('menu');

  const addNode = () => {
    const newNode: IVRNode = {
      id: Date.now().toString(),
      type: newNodeType,
      title: newNodeTitle || 'New Node',
      prompt: newNodePrompt || 'Enter prompt...',
      options: newNodeType === 'menu' ? [] : undefined,
    };
    setNodes([...nodes, newNode]);
    setModalVisible(false);
    setNewNodeTitle('');
    setNewNodePrompt('');
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id));
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

  const nodeTypes: IVRNode['type'][] = ['menu', 'transfer', 'voicemail', 'action', 'message'];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'IVR Builder',
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
          <Text style={styles.title}>IVR Flow Builder</Text>
          <Text style={styles.subtitle}>
            Create custom call flows for your business
          </Text>
        </View>

        <View style={styles.flowContainer}>
          <TouchableOpacity style={styles.testButton}>
            <Play size={20} color="#fff" />
            <Text style={styles.testButtonText}>Test IVR Flow</Text>
          </TouchableOpacity>

          {nodes.map((node, index) => (
            <View key={node.id}>
              {index > 0 && <View style={styles.connector} />}
              
              <View style={styles.nodeCard}>
                <View style={styles.nodeHeader}>
                  <View style={styles.nodeHeaderLeft}>
                    {getNodeIcon(node.type)}
                    <View style={styles.nodeInfo}>
                      <Text style={styles.nodeTitle}>{node.title}</Text>
                      <Text style={styles.nodeType}>{node.type.toUpperCase()}</Text>
                    </View>
                  </View>
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
                      <Edit size={18} color="#3B82F6" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteNode(node.id)}
                      style={styles.iconButton}
                    >
                      <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.promptContainer}>
                  <Text style={styles.promptLabel}>Prompt:</Text>
                  <Text style={styles.promptText}>{node.prompt}</Text>
                </View>

                {node.options && node.options.length > 0 && (
                  <View style={styles.optionsContainer}>
                    <Text style={styles.optionsLabel}>Options:</Text>
                    {node.options.map((option) => (
                      <View key={option.key} style={styles.optionRow}>
                        <View style={styles.optionKey}>
                          <Text style={styles.optionKeyText}>{option.key}</Text>
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {node.action && (
                  <View style={styles.actionContainer}>
                    <Text style={styles.actionLabel}>Action:</Text>
                    <Text style={styles.actionText}>{node.action}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addNodeButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={24} color="#3B82F6" />
            <Text style={styles.addNodeText}>Add Node</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Save size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save IVR Flow</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingNode ? 'Edit Node' : 'Add New Node'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Node Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter node title"
                placeholderTextColor="#64748B"
                value={newNodeTitle}
                onChangeText={setNewNodeTitle}
              />

              <Text style={styles.inputLabel}>Prompt Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter prompt message"
                placeholderTextColor="#64748B"
                value={newNodePrompt}
                onChangeText={setNewNodePrompt}
                multiline
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>Node Type</Text>
              <View style={styles.typeSelector}>
                {nodeTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      newNodeType === type && styles.typeButtonActive,
                    ]}
                    onPress={() => setNewNodeType(type)}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        newNodeType === type && styles.typeButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.modalSaveButton} onPress={addNode}>
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
  flowContainer: {
    padding: 16,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: '#334155',
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
    color: '#fff',
    marginBottom: 4,
  },
  nodeType: {
    fontSize: 12,
    color: '#64748B',
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
    color: '#64748B',
    marginBottom: 6,
  },
  promptText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
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
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionKeyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  optionLabel: {
    fontSize: 14,
    color: '#94A3B8',
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
