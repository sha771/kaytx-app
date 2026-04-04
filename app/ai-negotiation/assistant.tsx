import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Send,
  Mic,
  Bot,
  Settings,
  Sparkles,
  TrendingUp,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your Negotiation Assistant. I can help analyze deals, suggest counter-offers, or roleplay scenarios.",
    sender: 'ai',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: "Can you review the terms for the Acme Corp deal?",
    sender: 'user',
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    text: "I see they've requested a 15% discount. Given their volume, we can authorize 10%, but try to ask for a longer contract term in exchange.",
    sender: 'ai',
    timestamp: '10:01 AM',
  },
];

export default function NegotiationAssistantScreen() {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've noted that strategy. Would you like me to draft an email response based on this?",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Negotiation Assistant',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Settings size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary + '20' }]}>
              <Bot size={32} color={theme.colors.primary} />
            </View>
            <View style={styles.statusDot} />
          </View>
          <View>
            <Text style={[styles.assistantName, { color: theme.colors.text }]}>Deal Copilot</Text>
            <Text style={[styles.assistantStatus, { color: theme.colors.secondaryText }]}>Online • Analyzed 12 active deals</Text>
          </View>
        </View>

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeCard}>
            <TrendingUp size={24} color={theme.colors.primary} style={styles.welcomeIcon} />
            <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>
              Strategic Deal Support
            </Text>
            <Text style={[styles.welcomeText, { color: theme.colors.secondaryText }]}>
              Ask me to simulate a negotiation, review contract terms, or suggest closing strategies.
            </Text>
          </View>

          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user'
                  ? [styles.userBubble, { backgroundColor: theme.colors.primary }]
                  : [styles.aiBubble, { backgroundColor: theme.colors.cardBackground }],
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  { color: message.sender === 'user' ? '#fff' : theme.colors.text },
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  { color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : theme.colors.secondaryText },
                ]}
              >
                {message.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity style={styles.iconButton}>
            <Mic size={24} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.secondaryText}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSend}
          >
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#fff',
  },
  assistantName: {
    fontSize: 18,
    fontWeight: '700',
  },
  assistantStatus: {
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 20,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeIcon: {
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 24,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
