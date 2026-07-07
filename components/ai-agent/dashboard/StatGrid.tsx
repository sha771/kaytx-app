import React from 'react';
import { View, StyleSheet } from 'react-native';
import MetricCard from './MetricCard';
import { StatGridProps } from './types';

export default function StatGrid({ metrics, columns = 2 }: StatGridProps) {
  return (
    <View style={styles.container}>
      {metrics.map((metric) => (
        <View key={metric.id} style={[styles.item, { width: `${100 / columns}%` }]}>
          <MetricCard metric={metric} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  item: {
    padding: 8,
  },
});
