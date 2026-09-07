/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Send, Plus, MoreVertical, Archive, Trash2, Download, Search, MessageSquare, Clock, Tag, Brain, FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '../../lib/api-client';

interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  userId: string;
  metadata?: {
    sources?: string[];
    knowledgeNodes?: string[];
    confidence?: number;
    relatedQuestions?: string[];
  };
}

interface ChatConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  status: 'active' | 'archived' | 'deleted';
  tags?: string[];
  context?: {
    department?: string;
    project?: string;
    topic?: string;
  };
}

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
const chatApi = async (endpoint: string, options?: any) => {
  const res = await fetch(`${API_BASE}/api/v1/company-brain${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return res.json();
};

export default function CompanyBrainChat() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showConversations, setShowConversations] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const userId = 'user1';

  useEffect(() => {
    loadConversations().finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      const data = await chatApi('/chat/conversations?userId=user1&organizationId=default');
      const items: ChatConversation[] = (Array.isArray(data) ? data : data.conversations || data.data || []).map((item: any) => ({
        id: item.id,
        userId: item.userId || userId,
        title: item.title,
        createdAt: new Date(item.createdAt || item.created_at),
        updatedAt: new Date(item.updatedAt || item.updated_at),
        messageCount: item.messageCount || item.message_count || 0,
        status: item.status || 'active',
        tags: item.tags,
        context: item.context,
      }));
      setConversations(items);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await chatApi('/chat/conversations/' + conversationId + '/messages');
      const items: ChatMessage[] = (Array.isArray(data) ? data : data.messages || data.data || []).map((item: any) => ({
        id: item.id,
        conversationId: item.conversationId || item.conversation_id || conversationId,
        role: item.role,
        content: item.content,
        timestamp: new Date(item.timestamp || item.createdAt || item.created_at),
        userId: item.userId || item.user_id || 'system',
        metadata: item.metadata,
      }));
      setMessages(items);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const createNewConversation = async () => {
    try {
      const data = await chatApi('/chat/conversations', {
        method: 'POST',
        body: JSON.stringify({
          organizationId: 'default',
          userId,
          title: 'New Conversation',
          assistantType: 'knowledge',
        }),
      });
      const conv = data.conversation || data.data || data;
      const newConversation: ChatConversation = {
        id: conv.id,
        userId: conv.userId || userId,
        title: conv.title || 'New Conversation',
        createdAt: new Date(conv.createdAt || conv.created_at),
        updatedAt: new Date(conv.updatedAt || conv.updated_at),
        messageCount: conv.messageCount || conv.message_count || 0,
        status: conv.status || 'active',
        tags: conv.tags,
        context: conv.context,
      };

      setConversations([newConversation, ...conversations]);
      setSelectedConversation(newConversation);
      setMessages([]);
      setShowConversations(false);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedConversation || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'temp-' + Date.now(),
      conversationId: selectedConversation.id,
      role: 'user',
      content: inputText,
      timestamp: new Date(),
      userId,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const data = await chatApi('/chat/messages', {
        method: 'POST',
        body: JSON.stringify({
          organizationId: 'default',
          conversationId: selectedConversation.id,
          userId,
          content: userMessage.content,
        }),
      });

      const assistantMsg = data.assistantMessage || data.assistant || data.reply || data.data;
      if (assistantMsg) {
        const assistantMessage: ChatMessage = {
          id: assistantMsg.id || 'msg-' + Date.now(),
          conversationId: assistantMsg.conversationId || assistantMsg.conversation_id || selectedConversation.id,
          role: 'assistant',
          content: assistantMsg.content,
          timestamp: new Date(assistantMsg.timestamp || assistantMsg.createdAt || assistantMsg.created_at),
          userId: 'system',
          metadata: assistantMsg.metadata,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }

      const updatedConversations = conversations.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, updatedAt: new Date(), messageCount: conv.messageCount + 1 }
          : conv
      );
      setConversations(updatedConversations);
      setSelectedConversation(prev => prev ? { ...prev, updatedAt: new Date(), messageCount: prev.messageCount + 1 } : prev);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = (conversation: ChatConversation) => {
    setSelectedConversation(conversation);
    setShowConversations(false);
  };

  const archiveConversation = async () => {
    if (!selectedConversation) return;
    try {
      await chatApi('/chat/conversations/' + selectedConversation.id + '/archive', { method: 'PUT' });
      const updatedConversations = conversations.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, status: 'archived' as const }
          : conv
      );
      setConversations(updatedConversations);
      setSelectedConversation(null);
      setShowMenu(false);
      setShowConversations(true);
    } catch (error) {
      console.error('Error archiving conversation:', error);
    }
  };

  const deleteConversation = async () => {
    if (!selectedConversation) return;
    try {
      await chatApi('/chat/conversations/' + selectedConversation.id, { method: 'DELETE' });
      const updatedConversations = conversations.filter(conv => conv.id !== selectedConversation.id);
      setConversations(updatedConversations);
      setSelectedConversation(null);
      setShowMenu(false);
      setShowConversations(true);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const exportConversation = () => {
    if (!selectedConversation) return;
    console.log('Exporting conversation:', selectedConversation.id);
    setShowMenu(false);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderMessage = (message: ChatMessage) => (
    <View
      key={message.id}
      style={[
        styles.messageBubble,
        message.role === 'user' ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.role === 'user' ? styles.userMessageText : styles.assistantMessageText,
        ]}
      >
        {message.content}
      </Text>
      <View style={styles.messageFooter}>
        <Text style={styles.messageTime}>{formatTimestamp(message.timestamp)}</Text>
        {message.metadata?.confidence && (
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>{Math.round(message.metadata.confidence * 100)}%</Text>
          </View>
        )}
      </View>
      {message.metadata?.sources && message.metadata.sources.length > 0 && (
        <View style={styles.sourcesContainer}>
          <Text style={styles.sourcesLabel}>Sources:</Text>
          {message.metadata.sources.map((source, index) => (
            <TouchableOpacity key={index} style={styles.sourceTag}>
              <FileText size={12} color="#6366f1" />
              <Text style={styles.sourceText}>{source}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderConversationItem = (conversation: ChatConversation) => (
    <TouchableOpacity
      key={conversation.id}
      style={[
        styles.conversationItem,
        selectedConversation?.id === conversation.id && styles.selectedConversation,
      ]}
      onPress={() => selectConversation(conversation)}
    >
      <View style={styles.conversationIcon}>
        <MessageSquare size={20} color="#6366f1" />
      </View>
      <View style={styles.conversationInfo}>
        <Text style={styles.conversationTitle} numberOfLines={1}>
          {conversation.title}
        </Text>
        <View style={styles.conversationMeta}>
          <Clock size={12} color="#64748b" />
          <Text style={styles.conversationTime}>{formatTimestamp(conversation.updatedAt)}</Text>
          <Text style={styles.conversationCount}>{conversation.messageCount} messages</Text>
        </View>
        {conversation.tags && conversation.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {conversation.tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Tag size={10} color="#6366f1" />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowConversations(!showConversations)}>
          <MessageSquare size={24} color="#6366f1" />
        </TouchableOpacity>
        <Text style={styles.title}>Company Brain Chat</Text>
        {selectedConversation && (
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <MoreVertical size={24} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      {/* Conversation Menu */}
      {showMenu && selectedConversation && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={archiveConversation}>
            <Archive size={20} color="#64748b" />
            <Text style={styles.menuItemText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={exportConversation}>
            <Download size={20} color="#64748b" />
            <Text style={styles.menuItemText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={deleteConversation}>
            <Trash2 size={20} color="#ef4444" />
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Conversations Sidebar */}
      {showConversations && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.newConversationButton} onPress={createNewConversation}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.newConversationText}>New Conversation</Text>
          </TouchableOpacity>
          {initialLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#6366f1" />
              <Text style={styles.loadingText}>Loading conversations...</Text>
            </View>
          ) : (
            <ScrollView style={styles.conversationsList}>
              {conversations.map(renderConversationItem)}
            </ScrollView>
          )}
        </View>
      )}

      {/* Chat Area */}
      {!showConversations && (
        <View style={styles.chatArea}>
          {selectedConversation ? (
            <>
              {/* Messages */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
              >
                {messages.map(renderMessage)}
                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#6366f1" />
                    <Text style={styles.loadingText}>Thinking...</Text>
                  </View>
                )}
              </ScrollView>

              {/* Input Area */}
              <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 10 }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Ask anything about your company..."
                  placeholderTextColor="#64748b"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={2000}
                />
                <TouchableOpacity
                  style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                  onPress={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Send size={20} color="#ffffff" />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Brain size={64} color="#6366f1" />
              <Text style={styles.emptyStateTitle}>Start a Conversation</Text>
              <Text style={styles.emptyStateText}>
                Ask questions about your company knowledge, processes, and decisions
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={createNewConversation}>
                <Plus size={20} color="#ffffff" />
                <Text style={styles.startButtonText}>New Conversation</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#64748b',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  newConversationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  newConversationText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  conversationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  selectedConversation: {
    backgroundColor: '#e0e7ff',
  },
  conversationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  conversationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationTime: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
    marginRight: 8,
  },
  conversationCount: {
    fontSize: 12,
    color: '#64748b',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#6366f1',
    marginLeft: 2,
  },
  chatArea: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6366f1',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  assistantMessageText: {
    color: '#1e293b',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  messageTime: {
    fontSize: 11,
    color: '#94a3b8',
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  confidenceText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
  },
  sourcesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  sourcesLabel: {
    fontSize: 11,
    color: '#64748b',
    marginRight: 8,
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 11,
    color: '#6366f1',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1e293b',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
