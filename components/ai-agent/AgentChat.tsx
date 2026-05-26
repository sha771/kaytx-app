import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Send, Bot, User, MoreVertical, Copy, ThumbsUp, ThumbsDown, RefreshCw, Paperclip, Mic, Lightbulb, X, Play, Square, FileText, Image as ImageIcon } from 'lucide-react-native';
import { AIEmployee } from '@/constants/aiEmployees';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface AgentChatProps {
  agent: Partial<AIEmployee>;
}

export const AgentChat: React.FC<AgentChatProps> = ({ agent }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm ${agent.name}, your ${agent.title || 'AI Agent'}. How can I help you today? I can assist with ${agent.capabilities?.slice(0, 3).join(', ') || 'various tasks'}.`,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputText, agent),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, agentInfo: any): string => {
    const responses = [
      `I understand you're asking about "${userInput}". Based on my capabilities in ${agentInfo.capabilities?.join(', ') || 'various areas'}, I can help you with that.`,
      `Great question! As ${agentInfo.name}, I specialize in ${agentInfo.description || 'automated tasks'}. Let me assist you with this.`,
      `I've processed your request. Using my expertise in ${agentInfo.capabilities?.[0] || 'task automation'}, I can provide the following insights...`,
      `Thank you for your message. I'm currently analyzing this and will provide a comprehensive response based on my training and capabilities.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getCopilotSuggestions = (): string[] => {
    const base = agent.capabilities || ['Task Automation', 'Analysis', 'Reporting'];
    return [
      `Help me with ${base[0]?.toLowerCase() || 'this task'}`,
      `What are your latest insights on ${base[1]?.toLowerCase() || 'performance'}?`,
      'Summarize recent activity',
      'Show me optimization recommendations',
      'Draft a report based on my data',
      `Run a ${base[2]?.toLowerCase() || 'quick'} analysis`,
    ].slice(0, 6);
  };

  const copilotSuggestions = getCopilotSuggestions();

  const applySuggestion = (suggestion: string) => {
    setInputText(suggestion);
    setShowSuggestions(false);
    // Auto-send for copilot feel after short delay
    setTimeout(() => {
      if (suggestion.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: suggestion,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: generateAIResponse(suggestion, agent),
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          setShowSuggestions(true);
        }, 1200);
      }
    }, 300);
  };

  const handleAttachment = () => {
    const fileTypes = ['report.pdf', 'data.csv', 'image.png', 'notes.txt'];
    const file = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const attachMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `📎 Attached: ${file}`,
      timestamp: new Date(),
      attachments: [file],
    };
    setMessages(prev => [...prev, attachMsg]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now()+2).toString(),
        role: 'assistant',
        content: `Thanks for the ${file.split('.').pop()} file. I've analyzed it using my ${agent.capabilities?.[0] || 'core'} capabilities.`,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1400);
  };

  const handleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      const voiceMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: '🎤 Voice note (12s): "Please analyze the latest metrics and suggest next actions."',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, voiceMsg]);
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now()+3).toString(),
          role: 'assistant',
          content: 'Voice transcribed and processed. Here are 3 prioritized recommendations based on current performance data...',
          timestamp: new Date(),
        }]);
        setIsTyping(false);
      }, 1600);
    } else {
      setIsRecording(true);
      setTimeout(() => setIsRecording(false), 4000); // auto stop demo
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: `Hello! I'm ${agent.name}, your ${agent.title || 'AI Agent'}. How can I help you today?`,
      timestamp: new Date(),
    }]);
    setInputText('');
    setShowSuggestions(true);
  };

  const copyMessage = (content: string) => {
    // In real app use Clipboard.setString(content)
    console.log('Copied to clipboard:', content);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <Bot size={24} color={agent.color || '#007AFF'} />
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{agent.name}</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]}>Online • Active</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerBtn} onPress={clearChat}>
          <X size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn}>
          <MoreVertical size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.role === 'user'
                  ? { backgroundColor: theme.colors.primary }
                  : { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
              ]}
            >
              <View style={styles.messageHeader}>
                {message.role === 'assistant' && <Bot size={16} color={agent.color || '#007AFF'} />}
                <Text
                  style={[
                    styles.messageRole,
                    { color: message.role === 'user' ? '#fff' : theme.colors.text },
                  ]}
                >
                  {message.role === 'user' ? 'You' : agent.name}
                </Text>
                <Text style={[styles.messageTime, { color: message.role === 'user' ? '#fff80' : theme.colors.secondaryText }]}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <Text
                style={[
                  styles.messageContent,
                  { color: message.role === 'user' ? '#fff' : theme.colors.text },
                ]}
              >
                {message.content}
              </Text>
                {message.role === 'assistant' && (
                  <View style={styles.messageActions}>
                    <TouchableOpacity style={styles.messageActionBtn} onPress={() => copyMessage(message.content)}>
                      <Copy size={14} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageActionBtn}>
                      <ThumbsUp size={14} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageActionBtn}>
                      <ThumbsDown size={14} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageActionBtn} onPress={() => {
                      setInputText(`Regarding: "${message.content.substring(0,60)}..." `);
                    }}>
                      <RefreshCw size={14} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageWrapper, styles.assistantMessageWrapper]}>
            <View style={[styles.messageBubble, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, { backgroundColor: agent.color || '#007AFF' }]} />
                <View style={[styles.typingDot, { backgroundColor: agent.color || '#007AFF' }]} />
                <View style={[styles.typingDot, { backgroundColor: agent.color || '#007AFF' }]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Copilot Suggestions - ChatGPT style quick actions */}
      {showSuggestions && copilotSuggestions.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.suggestionsScroll, { backgroundColor: theme.colors.cardBackground, borderTopColor: theme.colors.border }]}
          contentContainerStyle={styles.suggestionsContent}
        >
          <View style={styles.copilotHeader}>
            <Lightbulb size={14} color={agent.color || '#007AFF'} />
            <Text style={[styles.copilotLabel, { color: theme.colors.secondaryText }]}>Copilot</Text>
          </View>
          {copilotSuggestions.map((sug, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.suggestionChip, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}
              onPress={() => applySuggestion(sug)}
            >
              <Text style={[styles.suggestionText, { color: theme.colors.text }]} numberOfLines={1}>{sug}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setShowSuggestions(false)} style={styles.suggestionClose}>
            <X size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </ScrollView>
      )}

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground, borderTopColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.inputBtn} onPress={handleAttachment}>
          <Paperclip size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
          placeholder={`Message ${agent.name}... (or use copilot suggestions above)`}
          placeholderTextColor={theme.colors.secondaryText}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={2000}
        />
        <TouchableOpacity style={styles.inputBtn} onPress={handleVoice}>
          {isRecording ? <Square size={20} color="#FF3B30" /> : <Mic size={20} color={theme.colors.secondaryText} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputBtn} onPress={clearChat}>
          <X size={18} color={theme.colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.border }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Send size={20} color={inputText.trim() ? '#fff' : theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerBtn: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  assistantMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  messageRole: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 10,
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  messageActionBtn: {
    padding: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    gap: 8,
  },
  inputBtn: {
    padding: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
  sendBtn: {
    padding: 12,
    borderRadius: 20,
  },
  suggestionsScroll: {
    maxHeight: 52,
    borderTopWidth: 1,
  },
  suggestionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  copilotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  copilotLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  suggestionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: 180,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  suggestionClose: {
    padding: 6,
    marginLeft: 4,
  },
});
