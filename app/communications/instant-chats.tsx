 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { MessageCircle, Send, Search, ListFilter, Star, Archive, Trash2, GripHorizontal } from 'lucide-react-native';

const conversations = [
  { id: 1, name: 'John Smith', lastMessage: 'Hey, how are you doing?', time: '2m ago', unread: 2, online: true },
  { id: 2, name: 'Sarah Johnson', lastMessage: 'Thanks for the help!', time: '15m ago', unread: 0, online: false },
  { id: 3, name: 'Mike Wilson', lastMessage: 'See you tomorrow', time: '1h ago', unread: 1, online: true },
  { id: 4, name: 'Emma Davis', lastMessage: 'Perfect, let me know', time: '2h ago', unread: 0, online: false },
];

const messages = [
  { id: 1, sender: 'John Smith', content: 'Hey, how are you doing?', time: '2:30 PM', isMe: false },
  { id: 2, sender: 'Me', content: 'I\'m doing great! How about you?', time: '2:32 PM', isMe: true },
  { id: 3, sender: 'John Smith', content: 'Pretty good, just working on some projects', time: '2:33 PM', isMe: false },
];

export default function InstantChatsScreen() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Instant Chats & DM',
          headerStyle: { backgroundColor: '#10B981' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.content}>
        {/* Conversations List */}
        <View style={styles.conversationsList}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <ListFilter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.conversationsScroll}>
            {filteredConversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                style={[
                  styles.conversationItem,
                  selectedConversation === conversation.id && styles.selectedConversation
                ]}
                onPress={() => setSelectedConversation(conversation.id)}
              >
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatar, { backgroundColor: conversation.online ? '#10B981' : '#6B7280' }]}>
                    <Text style={styles.avatarText}>{conversation.name.charAt(0)}</Text>
                  </View>
                  {conversation.online && <View style={styles.onlineIndicator} />}
                </View>
                
                <View style={styles.conversationInfo}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>{conversation.name}</Text>
                    <Text style={styles.conversationTime}>{conversation.time}</Text>
                  </View>
                  <View style={styles.conversationFooter}>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {conversation.lastMessage}
                    </Text>
                    {conversation.unread > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{conversation.unread}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chat Area */}
        <View style={styles.chatArea}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <View style={styles.chatHeader}>
                <View style={styles.chatHeaderInfo}>
                  <Text style={styles.chatHeaderName}>
                    {conversations.find(c => c.id === selectedConversation)?.name}
                  </Text>
                  <Text style={styles.chatHeaderStatus}>Online</Text>
                </View>
                <View style={styles.chatHeaderActions}>
                  <TouchableOpacity style={styles.headerAction}>
                    <Star size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerAction}>
                    <Archive size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerAction}>
                    <GripHorizontal size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Messages */}
              <ScrollView style={styles.messagesContainer}>
                {messages.map((message) => (
                  <View
                    key={message.id}
                    style={[
                      styles.messageItem,
                      message.isMe ? styles.myMessage : styles.theirMessage
                    ]}
                  >
                    <Text style={[
                      styles.messageContent,
                      message.isMe ? styles.myMessageText : styles.theirMessageText
                    ]}>
                      {message.content}
                    </Text>
                    <Text style={styles.messageTime}>{message.time}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Message Input */}
              <View style={styles.messageInputContainer}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                  <Send size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noChatSelected}>
              <MessageCircle size={64} color="#D1D5DB" />
              <Text style={styles.noChatText}>Select a conversation to start chatting</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  conversationsList: {
    width: '35%',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    padding: 4,
  },
  conversationsScroll: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
    gap: 12,
  },
  selectedConversation: {
    backgroundColor: '#EFF6FF',
    borderRightWidth: 3,
    borderRightColor: '#10B981',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chatHeaderStatus: {
    fontSize: 14,
    color: '#10B981',
  },
  chatHeaderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerAction: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    padding: 12,
    borderRadius: 16,
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
  },
  theirMessageText: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  messageInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'flex-end',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#10B981',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noChatSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  noChatText: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
});
