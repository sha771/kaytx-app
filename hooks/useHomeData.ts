import { useMemo } from 'react';
import { useMessaging } from '@/providers/MessagingProvider';

export function useHomeData() {
  const { conversations } = useMessaging();

  const stats = useMemo(() => ({
    totalMessages: conversations.reduce((sum, c) => sum + c.messages.length, 0),
    activeChats: conversations.filter(c => c.unreadCount > 0).length,
    unreadTotal: conversations.reduce((sum, c) => sum + c.unreadCount, 0),
  }), [conversations]);

  const recentConversations = useMemo(() => 
    conversations.slice(0, 5),
    [conversations]
  );

  return {
    conversations,
    stats,
    recentConversations,
  };
}
