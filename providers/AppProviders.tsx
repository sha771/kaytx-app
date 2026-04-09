

import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { AIAssistantProvider } from './AIAssistantProvider';
import { MessagingProvider } from './MessagingProvider';
import { CommandCenterProvider } from './CommandCenterProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ErrorBoundary>
          <AuthProvider>
            <ErrorBoundary>
              <AIAssistantProvider>
                <ErrorBoundary>
                  <CommandCenterProvider>
                    <MessagingProvider>
                      {children}
                    </MessagingProvider>
                  </CommandCenterProvider>
                </ErrorBoundary>
              </AIAssistantProvider>
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
