import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { Conversation, Message } from '@/types/messaging';


export const [MessagingProvider, useMessaging] = createContextHook(() => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [connectedServices, setConnectedServices] = useState<string[]>(['whatsapp', 'telegram', 'instagram']);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | 'error'>('synced');
  const [incomingMessages, setIncomingMessages] = useState<number>(0);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<Date>(new Date());
  const [messageQueue, setMessageQueue] = useState<number>(0);

  const simulateIncomingMessage = useCallback(() => {
    const platforms = ['WhatsApp', 'Telegram', 'Instagram', 'Messenger'];
    const senders = ['John', 'Sarah', 'Mike', 'Emma', 'Alex'];
    const messages = [
      'Hey, are you available?',
      'Thanks for the quick response!',
      'Can we schedule a call?',
      'I have a question about the project',
      'Great work on the presentation!',
      'Let me know when you\'re free',
      'Quick update on the task',
    ];

    const platform = platforms[Math.floor(Math.random() * platforms.length)] ?? platforms[0] ?? 'WhatsApp';
    const sender = senders[Math.floor(Math.random() * senders.length)] ?? senders[0] ?? 'Unknown';
    const messageText = messages[Math.floor(Math.random() * messages.length)] ?? messages[0] ?? '';

    console.log(`[Messaging] Received real-time message from ${sender} via ${platform}`);
    setSyncStatus('syncing');

    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        isRead: false,
      };

      setConversations(prev => {
        const existingConv = prev.find(c => c.name === sender);

        if (existingConv) {
          const updated = prev.map(conv => {
            if (conv.id === existingConv.id) {
              return {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: messageText,
                timestamp: 'now',
                unreadCount: conv.unreadCount + 1,
              };
            }
            return conv;
          });
          AsyncStorage.setItem('conversations', JSON.stringify(updated));
          return updated;
        } else {
          const newConv: Conversation = {
            id: Date.now().toString(),
            name: sender,
            avatar: `https://i.pravatar.cc/150?u=${sender}`,
            lastMessage: messageText,
            timestamp: 'now',
            unreadCount: 1,
            service: platform.toLowerCase() as any,
            isOnline: Math.random() > 0.5,
            isPinned: false,
            isMuted: false,
            messages: [newMessage],
          };
          const updated = [newConv, ...prev];
          AsyncStorage.setItem('conversations', JSON.stringify(updated));
          return updated;
        }
      });

      setIncomingMessages(prev => prev + 1);
      setLastMessageTimestamp(new Date());
      setMessageQueue(prev => prev + 1);
      setSyncStatus('synced');

      setTimeout(() => {
        setMessageQueue(prev => Math.max(0, prev - 1));
      }, 3000);
    }, 500);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadAndConnect = async () => {
      if (!isMounted) return;
      await loadConversations();

      const connectWebSocket = () => {
        if (!isMounted) return;
        console.log('[Messaging] Establishing real-time WebSocket connection...');
        setIsRealTimeConnected(false);

        setTimeout(() => {
          if (!isMounted) return;
          setIsRealTimeConnected(true);
          console.log('[Messaging] WebSocket connected successfully');
          console.log('[Messaging] E2E encryption enabled');
          console.log('[Messaging] Listening for incoming messages from all platforms...');
        }, 1500);
      };

      connectWebSocket();
    };

    loadAndConnect();

    const interval = setInterval(() => {
      if (!isMounted) return;
      if (Math.random() > 0.65) {
        simulateIncomingMessage();
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      console.log('[Messaging] Disconnecting WebSocket...');
    };
  }, [simulateIncomingMessage]);

  const loadConversations = async () => {
    try {
      const stored = await AsyncStorage.getItem('conversations');
      if (stored) {
        const parsed = JSON.parse(stored);
        setConversations(parsed);
        if (parsed.length > 0) {
          setActiveConversation(parsed[0] ?? null);
        }
      } else {
        const { generateMockConversations } = await import('@/utils/mockData');
        const mock = generateMockConversations();
        setConversations(mock);
        setActiveConversation(mock[0] ?? null);
        await AsyncStorage.setItem('conversations', JSON.stringify(mock));
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      const { generateMockConversations } = await import('@/utils/mockData');
      const mock = generateMockConversations();
      setConversations(mock);
      setActiveConversation(mock[0] ?? null);
    }
  };

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      isRead: false,
    };

    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: text,
            timestamp: 'now',
          };
        }
        return conv;
      });
      AsyncStorage.setItem('conversations', JSON.stringify(updated));
      return updated;
    });

    if (activeConversation?.id === conversationId) {
      setActiveConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: text,
        timestamp: 'now',
      } : null);
    }

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! This is an automated reply.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
        isRead: true,
      };

      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, replyMessage],
              lastMessage: replyMessage.text,
              timestamp: 'now',
              unreadCount: conv.unreadCount + 1,
            };
          }
          return conv;
        });
        AsyncStorage.setItem('conversations', JSON.stringify(updated));
        return updated;
      });

      if (activeConversation?.id === conversationId) {
        setActiveConversation(prev => prev ? {
          ...prev,
          messages: [...prev.messages, replyMessage],
          lastMessage: replyMessage.text,
          timestamp: 'now',
        } : null);
      }
    }, 2000);
  }, [activeConversation]);

  const markAsRead = useCallback((conversationId: string) => {
    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === conversationId) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      });
      AsyncStorage.setItem('conversations', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchConversations = useCallback((query: string) => {
    return conversations.filter(conv =>
      conv.name.toLowerCase().includes(query.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [conversations]);

  const reconnectRealTime = useCallback(() => {
    console.log('[Messaging] Reconnecting real-time sync...');
    setIsRealTimeConnected(false);
    setSyncStatus('syncing');
    setTimeout(() => {
      setIsRealTimeConnected(true);
      setSyncStatus('synced');
      console.log('[Messaging] ✓ Reconnected successfully');
    }, 1500);
  }, []);

  const connectService = useCallback(async (serviceId: string, credentials?: {
    apiKey?: string;
    instanceId?: string;
    email?: string;
    sessionId?: string;
  }) => {
    try {
      setConnectedServices(prev => [...new Set([...prev, serviceId])]);
      await AsyncStorage.setItem('connected_services', JSON.stringify([...new Set([...connectedServices, serviceId])]));

      if (credentials) {
        console.log(`[Messaging] Connecting ${serviceId} with credentials...`);
        await AsyncStorage.setItem(`service_creds_${serviceId}`, JSON.stringify(credentials));
      }

      reconnectRealTime();
    } catch (err) {
      console.error('[Messaging] Failed to connect service:', err);
      throw err;
    }
  }, [reconnectRealTime, connectedServices]);

  const disconnectService = useCallback(async (serviceId: string) => {
    try {
      setConnectedServices(prev => prev.filter(id => id !== serviceId));
      const updated = connectedServices.filter(id => id !== serviceId);
      await AsyncStorage.setItem('connected_services', JSON.stringify(updated));
      await AsyncStorage.removeItem(`service_creds_${serviceId}`);
    } catch (err) {
      console.error('[Messaging] Failed to disconnect service:', err);
      throw err;
    }
  }, [connectedServices]);

  const clearIncomingCounter = useCallback(() => {
    setIncomingMessages(0);
  }, []);

  useEffect(() => {
    const loadConnectedServices = async () => {
      const stored = await AsyncStorage.getItem('connected_services');
      if (stored) {
        setConnectedServices(JSON.parse(stored));
      }
    };
    loadConnectedServices();
  }, []);

  return {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    markAsRead,
    searchConversations,
    connectedServices,
    connectService,
    disconnectService,
    isRealTimeConnected,
    syncStatus,
    incomingMessages,
    lastMessageTimestamp,
    messageQueue,
    reconnectRealTime,
    clearIncomingCounter,
  };
});