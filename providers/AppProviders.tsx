import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';
import { httpLink } from '@trpc/client';
import superjson from 'superjson';
import { secureStorage } from '@/utils/security';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { AIAssistantProvider } from './AIAssistantProvider';
import { MessagingProvider } from './MessagingProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: `${process.env.EXPO_PUBLIC_RORK_API_BASE_URL || 'http://localhost:3000'}/api/trpc`,
          transformer: superjson,
          async headers() {
            const [token, csrfToken, sessionId] = await Promise.all([
              secureStorage.getItem('@auth_token'),
              secureStorage.getItem('@csrf_token'),
              secureStorage.getItem('@session_id'),
            ]);

            return {
              authorization: token ? `Bearer ${token}` : '',
              'x-csrf-token': csrfToken ?? '',
              'x-session-id': sessionId ?? '',
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider>
            <ErrorBoundary>
              <AuthProvider>
                <ErrorBoundary>
                  <AIAssistantProvider>
                    <ErrorBoundary>
                      <MessagingProvider>
                        {children}
                      </MessagingProvider>
                    </ErrorBoundary>
                  </AIAssistantProvider>
                </ErrorBoundary>
              </AuthProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
