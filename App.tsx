import React, { ErrorInfo, useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { app as firebaseApp } from './src/utils/firebase';

// Simple error fallback component
const ErrorFallback = ({ error, resetError }: { error: Error, resetError: () => void }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Something went wrong</Text>
    <Text style={styles.errorMessage}>{error.toString()}</Text>
    <TouchableOpacity style={styles.errorButton} onPress={resetError}>
      <Text style={styles.errorButtonText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}

const App = () => {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized
    try {
      if (firebaseApp) {
        console.log('Firebase initialized successfully');
        setIsFirebaseInitialized(true);
      }
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  }, []);

  // Show loading screen while Firebase initializes
  if (!isFirebaseInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#171720',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    color: '#FF3B30',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorMessage: {
    color: '#CCCCCC',
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#171720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  }
});

export default App;
