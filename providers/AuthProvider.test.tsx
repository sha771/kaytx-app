import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from './AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/lib/trpc', () => {
  const useMutation = () => ({
    mutateAsync: jest.fn(),
  });

  return {
    __esModule: true,
    trpc: {
      auth: {
        login: { useMutation },
        register: { useMutation },
        verifyEmail: { useMutation },
        logout: { useMutation },
        refreshToken: { useMutation },
      },
    },
  };
});

jest.mock('@/utils/encryptionAtRest', () => ({
  encryptionAtRest: {
    secureRetrieve: jest.fn().mockResolvedValue(null),
    secureStore: jest.fn().mockResolvedValue(undefined),
    secureDelete: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@/utils/monitoring', () => ({
  monitoring: {
    startTimer: jest.fn().mockReturnValue(() => {}),
    error: jest.fn(),
  },
}));

jest.mock('@/lib/advanced-audit-stub', () => ({
  advancedAudit: {
    logEvent: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);

describe('AuthProvider', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should initialize with unauthenticated state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    }, { timeout: 10000 });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('should provide auth context methods', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.register).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.refreshToken).toBe('function');
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});
