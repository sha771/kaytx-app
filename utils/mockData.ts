import type { Conversation, Message, ServiceType } from '@/types/messaging';

const makeMessage = (id: string, text: string, isOwn: boolean, isRead: boolean, timestamp: string): Message => ({
  id,
  text,
  timestamp,
  isOwn,
  isRead,
});

const makeConversation = (
  id: string,
  name: string,
  service: ServiceType,
  messages: Message[],
  opts?: Partial<Omit<Conversation, 'id' | 'name' | 'service' | 'messages' | 'lastMessage' | 'timestamp' | 'unreadCount'>>
): Conversation => {
  const last = messages[messages.length - 1];
  return {
    id,
    name,
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
    lastMessage: last?.text ?? '',
    timestamp: last?.timestamp ?? 'now',
    unreadCount: messages.filter((m) => !m.isOwn && !m.isRead).length,
    isOnline: opts?.isOnline ?? true,
    isPinned: opts?.isPinned ?? false,
    isMuted: opts?.isMuted ?? false,
    service,
    messages,
  };
};

export const generateMockConversations = (): Conversation[] => {
  const now = new Date();
  const t1 = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const conv1Messages: Message[] = [
    makeMessage('m1', 'Hey! Can you share the latest update?', false, false, t1),
    makeMessage('m2', 'Sure — I will send it in a minute.', true, true, t1),
  ];

  const conv2Messages: Message[] = [
    makeMessage('m3', 'Reminder: meeting at 3pm.', false, true, t1),
    makeMessage('m4', 'Got it, thanks!', true, true, t1),
  ];

  const conv3Messages: Message[] = [
    makeMessage('m5', 'Can we schedule a call tomorrow?', false, false, t1),
  ];

  return [
    makeConversation('c1', 'Sarah', 'whatsapp', conv1Messages, { isOnline: true }),
    makeConversation('c2', 'Mike', 'telegram', conv2Messages, { isOnline: false }),
    makeConversation('c3', 'Emma', 'instagram', conv3Messages, { isOnline: true }),
  ];
};
