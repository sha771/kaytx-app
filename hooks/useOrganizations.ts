import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/trpc-client';

// Organization hooks
export const useOrganization = () => {
  return useQuery({
    queryKey: ['organizations', 'current'],
    queryFn: () => (apiClient as any).organizations?.get?.query(),
  });
};

export const useOrganizationMembers = (filters?: {
  role?: string;
  status?: 'active' | 'inactive' | 'pending';
  limit?: number;
  offset?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['organizations', 'members', filters],
    queryFn: () => (apiClient as any).organizations?.getMembers?.query(filters),
  });
};

export const useOrganizationInvitations = () => {
  return useQuery({
    queryKey: ['organizations', 'invitations'],
    queryFn: () => (apiClient as any).organizations?.getInvitations?.query(),
  });
};

export const useOrganizationStats = () => {
  return useQuery({
    queryKey: ['organizations', 'stats'],
    queryFn: () => (apiClient as any).organizations.getStats.query(),
  });
};

export const useOrganizationSettings = () => {
  return useQuery({
    queryKey: ['organizations', 'settings'],
    queryFn: () => (apiClient as any).organizations.getSettings.query(),
  });
};

export const useOrganizationBilling = () => {
  return useQuery({
    queryKey: ['organizations', 'billing'],
    queryFn: () => (apiClient as any).organizations.getBilling.query(),
  });
};

export const useOrganizationUsage = (filters?: {
  startDate?: Date;
  endDate?: Date;
}) => {
  return useQuery({
    queryKey: ['organizations', 'usage', filters],
    queryFn: () => (apiClient as any).organizations.getUsage.query(filters),
  });
};

export const useOrganizationAuditLog = (filters?: {
  limit?: number;
  offset?: number;
  action?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  return useQuery({
    queryKey: ['organizations', 'audit', filters],
    queryFn: () => (apiClient as any).organizations.getAuditLog.query(filters),
  });
};

// Mutations
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      name: string;
      description?: string;
      industry?: string;
      size?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
      website?: string;
      logo?: string;
      settings?: Record<string, any>;
    }) => (apiClient as any).organizations.create.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      name?: string;
      description?: string;
      industry?: string;
      size?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
      website?: string;
      logo?: string;
      settings?: Record<string, any>;
    }) => (apiClient as any).organizations.update.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      email: string;
      role: string;
      permissions?: string[];
      message?: string;
    }) => (apiClient as any).organizations.inviteMember.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'invitations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations', 'members'] });
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invitationId: string) => 
      (apiClient as any).organizations.acceptInvitation.mutate(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations', 'invitations'] });
    },
  });
};

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invitationId: string) => 
      (apiClient as any).organizations.declineInvitation.mutate(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'invitations'] });
    },
  });
};

export const useCancelInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invitationId: string) => 
      (apiClient as any).organizations.cancelInvitation.mutate(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'invitations'] });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      userId: string;
      role: string;
      permissions?: string[];
    }) => (apiClient as any).organizations.updateMemberRole.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'members'] });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => 
      (apiClient as any).organizations.removeMember.mutate(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'members'] });
    },
  });
};

export const useLeaveOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => (apiClient as any).organizations.leave.mutate(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganizationSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (settings: Record<string, any>) => 
      (apiClient as any).organizations.updateSettings.mutate(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'settings'] });
    },
  });
};

export const useUpdateOrganizationBilling = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      billingEmail?: string;
      billingAddress?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      taxId?: string;
    }) => (apiClient as any).organizations.updateBilling.mutate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations', 'billing'] });
    },
  });
};
