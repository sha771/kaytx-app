import React from 'react';
import { View } from 'react-native';
import OperationsCommandCenter from '@/components/ai-agent/dashboard/operations-management/OperationsCommandCenter';

export default function EnterpriseOperationsCommand() {
  return (
    <View style={{ flex: 1 }}>
      <OperationsCommandCenter />
    </View>
  );
}
