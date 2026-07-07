import React from 'react';
import { Stack } from 'expo-router';

export default function RetailStoresLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#03050A' },
      }}
    />
  );
}
