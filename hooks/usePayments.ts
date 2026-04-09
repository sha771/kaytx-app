import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/trpc-client';

// Payment hooks
export const usePayments = (filters?: {
  status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
}) => {
  return useQuery({
    queryKey: ['payments', 'list', filters],
    queryFn: () => apiClient.payments.getPayments.query(filters),
  });
};

export const usePayment = (paymentId: string) => {
  return useQuery({
    queryKey: ['payments', 'detail', paymentId],
    queryFn: () => apiClient.payments.getPayment.query(paymentId),
    enabled: !!paymentId,
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payments', 'methods'],
    queryFn: () => apiClient.payments.getPaymentMethods.query(),
  });
};

export const usePaymentStats = () => {
  return useQuery({
    queryKey: ['payments', 'stats'],
    queryFn: () => apiClient.payments.getStats.query(),
  });
};

export const useInvoices = (filters?: {
  status?: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: ['payments', 'invoices', filters],
    queryFn: () => apiClient.payments.getInvoices.query(filters),
  });
};

export const useInvoice = (invoiceId: string) => {
  return useQuery({
    queryKey: ['payments', 'invoice', invoiceId],
    queryFn: () => apiClient.payments.getInvoice.query(invoiceId),
    enabled: !!invoiceId,
  });
};

export const useRefunds = (filters?: {
  limit?: number;
  offset?: number;
  startDate?: Date;
  endDate?: Date;
}) => {
  return useQuery({
    queryKey: ['payments', 'refunds', filters],
    queryFn: () => apiClient.payments.getRefunds.query(filters),
  });
};

export const useCustomerBalance = (customerId?: string) => {
  return useQuery({
    queryKey: ['payments', 'balance', customerId],
    queryFn: () => apiClient.payments.getCustomerBalance.query(customerId),
  });
};

// Mutations
export const useCreatePaymentIntent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency?: string;
      paymentMethodId?: string;
      invoiceId?: string;
      description?: string;
      metadata?: Record<string, any>;
      confirmImmediately?: boolean;
    }) => apiClient.payments.createIntent.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      paymentIntentId: string;
    }) => apiClient.payments.confirmPayment.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      paymentMethodId: string;
      isDefault?: boolean;
    }) => apiClient.payments.createPaymentMethod.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'methods'] });
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethodId: string) => 
      apiClient.payments.deletePaymentMethod.mutate(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'methods'] });
    },
  });
};

export const useSetDefaultPaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethodId: string) => 
      apiClient.payments.setDefaultPaymentMethod.mutate(paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'methods'] });
    },
  });
};

export const useCreateRefund = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      paymentId: string;
      amount: number;
      reason: string;
      metadata?: Record<string, any>;
    }) => apiClient.payments.createRefund.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'refunds'] });
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      customerId: string;
      amount: number;
      currency?: string;
      description?: string;
      dueDate?: Date;
      metadata?: Record<string, any>;
    }) => apiClient.payments.createInvoice.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'invoices'] });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      invoiceId: string;
      updates: {
        description?: string;
        dueDate?: Date;
        metadata?: Record<string, any>;
      };
    }) => apiClient.payments.updateInvoice.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'invoices'] });
    },
  });
};
