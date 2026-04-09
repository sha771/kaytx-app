/**
 * Error Boundary Component
 * Catches and handles errors throughout the app
 */

import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Log error to monitoring service
    // This would integrate with your monitoring system
    if (process.env.NODE_ENV === 'production') {
      // Send error to monitoring service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error; onRetry: () => void }> = ({ error, onRetry }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors?.background || '#fff' }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors?.text || '#000' }]}>
          Oops! Something went wrong
        </Text>
        <Text style={[styles.message, { color: theme.colors?.textSecondary || '#666' }]}>
          {error?.message || 'An unexpected error occurred'}
        </Text>
        
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <Text style={[styles.stackTrace, { color: theme.colors?.textSecondary || '#666' }]}>
            {error.stack}
          </Text>
        )}
        
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors?.primary || '#007AFF' }]} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  stackTrace: {
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'left',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    maxHeight: 200,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const ErrorBoundary = ErrorBoundaryClass;
