import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  testID?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('[ErrorBoundary] captured error', error);
    return { hasError: true, errorMessage: error.message };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] component stack', errorInfo.componentStack);
  }

  private handleReset = () => {
    console.log('[ErrorBoundary] reset triggered');
    this.setState({ hasError: false }, () => {
      if (this.props.onReset) {
        this.props.onReset();
      }
    });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback} testID={this.props.testID ?? 'error-boundary-fallback'}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.props.fallbackMessage ?? 'We could not render this section right now.'}</Text>
          {this.state.errorMessage ? (
            <Text style={styles.details}>{this.state.errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={this.handleReset} testID="error-boundary-reset-button">
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  fallback: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#D1D1D6',
    marginBottom: 8,
  },
  details: {
    fontSize: 12,
    color: '#A1A1AA',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
