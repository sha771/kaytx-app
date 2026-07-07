import React from 'react';
import { Stack } from 'expo-router';

export default function EventManagementLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#03050A' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="agents" />
      <Stack.Screen name="planning" />
      <Stack.Screen name="ticketing" />
      <Stack.Screen name="venues" />
      <Stack.Screen name="attendees" />
      <Stack.Screen name="vendors" />
      <Stack.Screen name="sponsors" />
      <Stack.Screen name="marketing" />
      <Stack.Screen name="live-operations" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="financial" />
      <Stack.Screen name="global-operations" />
      <Stack.Screen name="system-health" />
      <Stack.Screen name="ai-insights" />
      <Stack.Screen name="activity-feed" />
    </Stack>
  );
}
