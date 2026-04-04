import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    unreadOnly: z.boolean().optional(),
    limit: z.number().optional()
  }))
  .query(({ input }) => {
    console.log('[Notifications] Fetching notifications', input);
    
    const notifications = [
      {
        id: '1',
        type: 'message',
        title: 'New message from Sarah',
        body: 'Hey, can we discuss the project timeline?',
        isRead: false,
        timestamp: new Date().toISOString(),
        priority: 'high'
      },
      {
        id: '2',
        type: 'system',
        title: 'System Update',
        body: 'New features have been deployed',
        isRead: false,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        priority: 'medium'
      },
      {
        id: '3',
        type: 'alert',
        title: 'Campaign Performance',
        body: 'Your campaign exceeded target by 25%',
        isRead: true,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        priority: 'low'
      }
    ];

    let filtered = notifications;
    
    if (input.unreadOnly) {
      filtered = filtered.filter(n => !n.isRead);
    }
    
    if (input.limit) {
      filtered = filtered.slice(0, input.limit);
    }

    return {
      notifications: filtered,
      total: filtered.length,
      unreadCount: notifications.filter(n => !n.isRead).length
    };
  });
