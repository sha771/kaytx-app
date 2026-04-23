/**
 * React hooks for real-time functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import realtimeService, { ConnectionStatus } from '../lib/realtime-service';

// Hook for connection status
export function useRealtimeStatus() {
  const [status, setStatus] = useState<ConnectionStatus>(realtimeService.getConnectionStatus());

  useEffect(() => {
    const updateStatus = () => setStatus(realtimeService.getConnectionStatus());
    
    realtimeService.on('status', updateStatus);
    
    return () => {
      realtimeService.off('status', updateStatus);
    };
  }, []);

  const connect = useCallback(() => {
    realtimeService.connect();
  }, []);

  const disconnect = useCallback(() => {
    realtimeService.disconnect();
  }, []);

  return {
    status,
    connect,
    disconnect,
  };
}

// Hook for subscribing to real-time events
export function useRealtimeSubscription<T = any>(
  event: string,
  callback: (data: T) => void,
  deps: any[] = []
) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Subscribe to event
    realtimeService.subscribe(event, (data: T) => {
      callbackRef.current(data);
    });
    setIsSubscribed(true);

    // Cleanup
    return () => {
      realtimeService.unsubscribe(event);
      setIsSubscribed(false);
    };
  }, [event, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return isSubscribed;
}

// Hook for real-time data with automatic subscription
export function useRealtimeData<T = any>(
  event: string,
  initialValue: T | null = null
) {
  const [data, setData] = useState<T | null>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useRealtimeSubscription<T>(event, (newData) => {
    setData(newData);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error };
}

// Hook for real-time chat/conversation updates
export function useRealtimeChat(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Subscribe to new messages
  useRealtimeSubscription(`conversation:${conversationId}:message`, (message) => {
    setMessages(prev => [...prev, message]);
  }, [conversationId]);

  // Subscribe to typing indicators
  useRealtimeSubscription(`conversation:${conversationId}:typing`, (data) => {
    setIsTyping(data.isTyping);
  }, [conversationId]);

  // Subscribe to online users
  useRealtimeSubscription(`conversation:${conversationId}:online`, (users) => {
    setOnlineUsers(users);
  }, [conversationId]);

  const sendMessage = useCallback((content: string) => {
    return realtimeService.send('conversation:message', {
      conversationId,
      content,
      timestamp: Date.now(),
    });
  }, [conversationId]);

  const sendTypingIndicator = useCallback((isTyping: boolean) => {
    return realtimeService.send('conversation:typing', {
      conversationId,
      isTyping,
      timestamp: Date.now(),
    });
  }, [conversationId]);

  return {
    messages,
    isTyping,
    onlineUsers,
    sendMessage,
    sendTypingIndicator,
  };
}

// Hook for real-time AI agent updates
export function useRealtimeAgent(agentId: string) {
  const [agent, setAgent] = useState<any>(null);
  const [status, setStatus] = useState<string>('offline');
  const [metrics, setMetrics] = useState<any>(null);

  // Subscribe to agent status updates
  useRealtimeSubscription(`agent:${agentId}:status`, (data) => {
    setStatus(data.status);
    setAgent(prev => prev ? { ...prev, ...data } : data);
  }, [agentId]);

  // Subscribe to agent metrics
  useRealtimeSubscription(`agent:${agentId}:metrics`, (data) => {
    setMetrics(data);
  }, [agentId]);

  // Subscribe to agent responses
  useRealtimeSubscription(`agent:${agentId}:response`, (data) => {
    // Handle agent response
    console.log('Agent response:', data);
  }, [agentId]);

  const sendCommand = useCallback((command: string, params: any = {}) => {
    return realtimeService.send('agent:command', {
      agentId,
      command,
      params,
      timestamp: Date.now(),
    });
  }, [agentId]);

  return {
    agent,
    status,
    metrics,
    sendCommand,
  };
}

// Hook for real-time monitoring updates
export function useRealtimeMonitoring() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  // Subscribe to alerts
  useRealtimeSubscription('monitoring:alert', (alert) => {
    setAlerts(prev => [alert, ...prev.slice(0, 99)]); // Keep last 100 alerts
  }, []);

  // Subscribe to metrics
  useRealtimeSubscription('monitoring:metrics', (data) => {
    setMetrics(data);
  }, []);

  // Subscribe to system status
  useRealtimeSubscription('monitoring:status', (status) => {
    setSystemStatus(status);
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    return realtimeService.send('monitoring:acknowledge', {
      alertId,
      timestamp: Date.now(),
    });
  }, []);

  return {
    alerts,
    metrics,
    systemStatus,
    acknowledgeAlert,
  };
}

// Hook for real-time lead updates
export function useRealtimeLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);

  // Subscribe to lead updates
  useRealtimeSubscription('lead:updated', (data) => {
    setLeads(prev => {
      const index = prev.findIndex(lead => lead.id === data.lead.id);
      if (index >= 0) {
        const newLeads = [...prev];
        newLeads[index] = data.lead;
        return newLeads;
      }
      return [...prev, data.lead];
    });
    
    setUpdates(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 updates
  }, []);

  // Subscribe to new leads
  useRealtimeSubscription('lead:created', (data) => {
    setLeads(prev => [data.lead, ...prev]);
    setUpdates(prev => [data, ...prev.slice(0, 49)]);
  }, []);

  return {
    leads,
    updates,
  };
}

// Hook for real-time email campaign updates
export function useRealtimeCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);

  // Subscribe to campaign updates
  useRealtimeSubscription('campaign:updated', (data) => {
    setCampaigns(prev => {
      const index = prev.findIndex(campaign => campaign.id === data.campaign.id);
      if (index >= 0) {
        const newCampaigns = [...prev];
        newCampaigns[index] = data.campaign;
        return newCampaigns;
      }
      return [...prev, data.campaign];
    });
    
    setUpdates(prev => [data, ...prev.slice(0, 49)]);
  }, []);

  // Subscribe to campaign status changes
  useRealtimeSubscription('campaign:status', (data) => {
    setCampaigns(prev => {
      const index = prev.findIndex(campaign => campaign.id === data.campaignId);
      if (index >= 0) {
        const newCampaigns = [...prev];
        newCampaigns[index] = { ...newCampaigns[index], status: data.status };
        return newCampaigns;
      }
      return prev;
    });
  }, []);

  return {
    campaigns,
    updates,
  };
}

// Hook for real-time payment updates
export function useRealtimePayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);

  // Subscribe to payment updates
  useRealtimeSubscription('payment:updated', (data) => {
    setPayments(prev => {
      const index = prev.findIndex(payment => payment.id === data.payment.id);
      if (index >= 0) {
        const newPayments = [...prev];
        newPayments[index] = data.payment;
        return newPayments;
      }
      return [...prev, data.payment];
    });
    
    setUpdates(prev => [data, ...prev.slice(0, 49)]);
  }, []);

  // Subscribe to payment status changes
  useRealtimeSubscription('payment:status', (data) => {
    setPayments(prev => {
      const index = prev.findIndex(payment => payment.id === data.paymentId);
      if (index >= 0) {
        const newPayments = [...prev];
        newPayments[index] = { ...newPayments[index], status: data.status };
        return newPayments;
      }
      return prev;
    });
  }, []);

  return {
    payments,
    updates,
  };
}

// Hook for real-time notifications
export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Subscribe to new notifications
  useRealtimeSubscription('notification:new', (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 99)]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  // Subscribe to notification read status
  useRealtimeSubscription('notification:read', (data) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === data.notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    return realtimeService.send('notification:read', {
      notificationId,
      timestamp: Date.now(),
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    return realtimeService.send('notification:read_all', {
      timestamp: Date.now(),
    });
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
