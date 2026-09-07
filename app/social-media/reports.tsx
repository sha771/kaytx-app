 
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { FileText, Download, Calendar, BarChart3, TrendingUp, Users, Clock, ChevronRight, Plus } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'ready' | 'generating' | 'scheduled';
}

export default function PerformanceReports() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const reportTypes = [
    { id: '1', title: 'Weekly Summary', icon: Calendar, color: '#007AFF', desc: 'Overview of last 7 days' },
    { id: '2', title: 'Engagement Report', icon: TrendingUp, color: '#34C759', desc: 'Detailed engagement metrics' },
    { id: '3', title: 'Audience Insights', icon: Users, color: '#FF9500', desc: 'Demographics & growth' },
    { id: '4', title: 'Content Performance', icon: BarChart3, color: '#AF52DE', desc: 'Post-level analytics' },
  ];

  const recentReports: Report[] = [
    { id: '1', title: 'January 2024 Monthly Report', type: 'Monthly Summary', date: 'Feb 1, 2024', status: 'ready' },
    { id: '2', title: 'Week 4 Performance', type: 'Weekly Summary', date: 'Jan 28, 2024', status: 'ready' },
    { id: '3', title: 'Q4 2023 Analysis', type: 'Quarterly Report', date: 'Jan 15, 2024', status: 'ready' },
    { id: '4', title: 'Campaign: New Year Sale', type: 'Campaign Report', date: 'Jan 10, 2024', status: 'ready' },
  ];

  const scheduledReports: Report[] = [
    { id: '1', title: 'February Monthly Report', type: 'Monthly Summary', date: 'Mar 1, 2024', status: 'scheduled' },
    { id: '2', title: 'Week 5 Performance', type: 'Weekly Summary', date: 'Feb 4, 2024', status: 'scheduled' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Performance Reports',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Quick Generate */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Generate</Text>
          <View style={styles.reportTypes}>
            {reportTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity key={type.id} style={[styles.reportTypeCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={[styles.reportTypeIcon, { backgroundColor: `${type.color}15` }]}>
                    <IconComponent size={22} color={type.color} />
                  </View>
                  <Text style={[styles.reportTypeTitle, { color: theme.colors.text }]}>{type.title}</Text>
                  <Text style={[styles.reportTypeDesc, { color: theme.colors.secondaryText }]}>{type.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Create Custom Report */}
        <TouchableOpacity style={[styles.customButton, { backgroundColor: theme.colors.primary }]}>
          <Plus size={20} color="#FFF" />
          <Text style={styles.customButtonText}>Create Custom Report</Text>
        </TouchableOpacity>

        {/* Recent Reports */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Reports</Text>
          {recentReports.map((report) => (
            <TouchableOpacity key={report.id} style={[styles.reportCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.reportIcon, { backgroundColor: '#007AFF15' }]}>
                <FileText size={20} color="#007AFF" />
              </View>
              <View style={styles.reportInfo}>
                <Text style={[styles.reportTitle, { color: theme.colors.text }]}>{report.title}</Text>
                <Text style={[styles.reportMeta, { color: theme.colors.secondaryText }]}>{report.type} � {report.date}</Text>
              </View>
              <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: '#34C75915' }]}>
                <Download size={18} color="#34C759" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scheduled Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduled Reports</Text>
            <TouchableOpacity>
              <Text style={[styles.manageBtn, { color: theme.colors.primary }]}>Manage</Text>
            </TouchableOpacity>
          </View>
          {scheduledReports.map((report) => (
            <View key={report.id} style={[styles.scheduledCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.scheduledIcon, { backgroundColor: '#FF950015' }]}>
                <Clock size={18} color="#FF9500" />
              </View>
              <View style={styles.scheduledInfo}>
                <Text style={[styles.scheduledTitle, { color: theme.colors.text }]}>{report.title}</Text>
                <Text style={[styles.scheduledMeta, { color: theme.colors.secondaryText }]}>Scheduled for {report.date}</Text>
              </View>
              <ChevronRight size={18} color={theme.colors.secondaryText} />
            </View>
          ))}
        </View>

        {/* Export Options */}
        <View style={[styles.exportCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.exportTitle, { color: theme.colors.text }]}>Export Options</Text>
          <View style={styles.exportOptions}>
            <TouchableOpacity style={[styles.exportOption, { borderColor: theme.colors.border }]}>
              <Text style={[styles.exportOptionText, { color: theme.colors.text }]}>PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.exportOption, { borderColor: theme.colors.border }]}>
              <Text style={[styles.exportOptionText, { color: theme.colors.text }]}>CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.exportOption, { borderColor: theme.colors.border }]}>
              <Text style={[styles.exportOptionText, { color: theme.colors.text }]}>Excel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  manageBtn: { fontSize: 14, fontWeight: '600' },
  reportTypes: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  reportTypeCard: { width: '48%', padding: 16, borderRadius: 14 },
  reportTypeIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  reportTypeTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  reportTypeDesc: { fontSize: 11 },
  customButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 14, gap: 10, marginBottom: 24 },
  customButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  reportCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 10 },
  reportIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  reportMeta: { fontSize: 12 },
  downloadBtn: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  scheduledCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 10 },
  scheduledIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  scheduledInfo: { flex: 1 },
  scheduledTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  scheduledMeta: { fontSize: 12 },
  exportCard: { padding: 16, borderRadius: 14, marginBottom: 20 },
  exportTitle: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  exportOptions: { flexDirection: 'row', gap: 12 },
  exportOption: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  exportOptionText: { fontSize: 14, fontWeight: '600' },
});
