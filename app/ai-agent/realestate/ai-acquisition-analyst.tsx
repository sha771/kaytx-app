import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ArrowRight, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function RedirectPage() {
  const { theme } = useTheme();
  const router = useRouter();
  React.useEffect(() => { router.replace('/ai-agent/realestate/acquisition-analyst.tsx'); }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.center}><Activity size={32} color="#33691E" /><Text style={[styles.text, { color: theme.colors.textSecondary }]}>Redirecting...</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({container:{flex:1},center:{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:100},text:{fontSize:16,marginTop:12}});
