import React from 'react';
import { View, StyleSheet } from 'react-native';
import TradingCommandCenter from './command-center';

/**
 * Trading & Investment Department
 * Securities trading, portfolio management, investment analysis, and financial markets operations
 */
export default function TradingInvestmentIndex() {
  return (
    <View style={styles.container}>
      <TradingCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
