import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/trpc-client';

// Notification hooks
export const useNotifications = (filters?: {
  isRead?: boolean;
  type?: string;
  priority?: 'low' | 'medium' | 'high';
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: ['notifications', 'list', filters],
    queryFn: () => apiClient.notifications.list.query(filters),
  });
};

export const useNotificationStats = () => {
  return useQuery({
    queryKey: ['notifications', 'stats'],
    queryFn: () => apiClient.notifications.getStats.query(),
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      type: 'info' | 'success' | 'warning' | 'error' | 'alert';
      title: string;
      message: string;
      priority?: 'low' | 'medium' | 'high';
      channels?: string[];
      data?: Record<string, any>;
    }) => apiClient.notifications.create.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      apiClient.notifications.markAsRead.mutate(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiClient.notifications.markAllAsRead.mutate(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => 
      apiClient.notifications.delete.mutate(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useSendEmailNotification = () => {
  return useMutation({
    mutationFn: (data: {
      to: string;
      subject: string;
      html: string;
      text?: string;
    }) => apiClient.notifications.sendEmail.mutate(data),
  });
};

export const useSendPushNotification = () => {
  return useMutation({
    mutationFn: (data: {
      title: string;
      body: string;
      data?: Record<string, any>;
    }) => apiClient.notifications.sendPush.mutate(data),
  });
};

export const useSendSMSNotification = () => {
  return useMutation({
    mutationFn: (data: {
      to: string;
      message: string;
    }) => apiClient.notifications.sendSMS.mutate(data),
  });
};

export const useBatchCreateNotifications = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notifications: {
      type: 'info' | 'success' | 'warning' | 'error' | 'alert';
      title: string;
      message: string;
      priority?: 'low' | 'medium' | 'high';
      channels?: string[];
      data?: Record<string, any>;
    }[]) => apiClient.notifications.batchCreate.mutate(notifications),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
