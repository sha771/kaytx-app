import React from 'react';
import { Stack } from 'expo-router';

export default function EnergyUtilitiesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#03050A' },
      }}
    />
  );
}
