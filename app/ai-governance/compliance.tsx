/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Scale, Shield, CheckCircle, AlertTriangle, FileText, 
  ArrowLeft, ChevronRight, Globe, Lock, Eye, Award,
  Clock, Calendar, Download, Upload, Zap
} from 'lucide-react-native';

interface ComplianceStandard {
  id: string;
  name: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
  lastAudit: string;
  nextAudit: string;
}

interface ComplianceReport {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
}

const complianceStandards: ComplianceStandard[] = [
  {
    id: '1',
    name: 'EU AI Act',
    status: 'compliant',
    score: 98,
    lastAudit: '2024-01-15',
    nextAudit: '2024-07-15'
  },
  {
    id: '2',
    name: 'ISO 27001',
    status: 'compliant',
    score: 96,
    lastAudit: '2024-01-10',
    nextAudit: '2024-07-10'
  },
  {
    id: '3',
    name: 'SOC2 Type II',
    status: 'partial',
    score: 89,
    lastAudit: '2024-01-08',
    nextAudit: '2024-04-08'
  },
  {
    id: '4',
    name: 'GDPR AI',
    status: 'compliant',
    score: 95,
    lastAudit: '2024-01-05',
    nextAudit: '2024-07-05'
  },
];

const complianceReports: ComplianceReport[] = [
  { id: '1', name: 'Q4 2023 Compliance Report', type: 'Quarterly', date: '2024-01-15', status: 'completed' },
  { id: '2', name: 'EU AI Act Assessment', type: 'Standard', date: '2024-01-10', status: 'completed' },
  { id: '3', name: 'SOC2 Type II Audit', type: 'Annual', date: '2024-01-08', status: 'in_progress' },
  { id: '4', name: 'GDPR Data Protection Impact', type: 'Assessment', date: '2024-01-20', status: 'pending' },
];

export default function ComplianceScreen() {
  const [selectedStandard, setSelectedStandard] = useState<ComplianceStandard | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#10b981';
      case 'partial': return '#f59e0b';
      case 'non-compliant': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#06b6d4';
      case 'pending': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const StandardCard = ({ standard }: { standard: ComplianceStandard }) => (
    <TouchableOpacity 
      style={[styles.standardCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(standard.status)}30` }]}
      onPress={() => setSelectedStandard(standard)}
    >
      <View style={styles.standardHeader}>
        <View style={[styles.standardIcon, { backgroundColor: `${getStatusColor(standard.status)}20` }]}>
          <Scale size={24} color={getStatusColor(standard.status)} />
        </View>
        <View style={styles.standardInfo}>
          <Text style={[styles.standardName, { color: '#f9fafb' }]}>{standard.name}</Text>
          <Text style={[styles.standardMeta, { color: '#9ca3af' }]}>
            Score: {standard.score}% • Last: {standard.lastAudit}
          </Text>
        </View>
        <View style={[styles.standardStatus, { backgroundColor: `${getStatusColor(standard.status)}20` }]}>
          <Text style={[styles.standardStatusText, { color: getStatusColor(standard.status) }]}>{standard.status}</Text>
        </View>
      </View>
      <View style={styles.standardFooter}>
        <View style={styles.standardFooterItem}>
          <Calendar size={16} color="#9ca3af" />
          <Text style={[styles.standardFooterText, { color: '#9ca3af' }]}>Next: {standard.nextAudit}</Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  const ReportCard = ({ report }: { report: ComplianceReport }) => (
    <View style={[styles.reportCard, { backgroundColor: 'rgba(10, 15, 25, 0.6)', borderLeftWidth: 3, borderLeftColor: getReportStatusColor(report.status) }]}>
      <View style={styles.reportHeader}>
        <View style={[styles.reportIcon, { backgroundColor: `${getReportStatusColor(report.status)}20` }]}>
          <FileText size={20} color={getReportStatusColor(report.status)} />
        </View>
        <View style={styles.reportInfo}>
          <Text style={[styles.reportName, { color: '#f9fafb' }]}>{report.name}</Text>
          <Text style={[styles.reportType, { color: '#9ca3af' }]}>{report.type} • {report.date}</Text>
        </View>
        <View style={[styles.reportStatus, { backgroundColor: `${getReportStatusColor(report.status)}20` }]}>
          <Text style={[styles.reportStatusText, { color: getReportStatusColor(report.status) }]}>{report.status}</Text>
        </View>
      </View>
      <View style={styles.reportActions}>
        <TouchableOpacity style={[styles.reportAction, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Download size={16} color="#06b6d4" />
          <Text style={[styles.reportActionText, { color: '#06b6d4' }]}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#f9fafb" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Compliance</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Regulatory Compliance Monitor</Text>
          </View>
        </View>

        {/* Compliance Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Compliance Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>94.5%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Overall Score</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Award size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>3/4</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Standards Met</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>1</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Action Required</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance Standards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>Compliance Standards</Text>
          <View style={styles.standardsGrid}>
            {complianceStandards.map(standard => (
              <StandardCard key={standard.id} standard={standard} />
            ))}
          </View>
        </View>

        {/* Compliance Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Compliance Reports</Text>
            <TouchableOpacity style={[styles.generateButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Upload size={16} color="#06b6d4" />
              <Text style={[styles.generateButtonText, { color: '#06b6d4' }]}>Generate Report</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reportsGrid}>
            {complianceReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </View>
        </View>

        {/* Compliance Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Upcoming Audits</Text>
          <View style={[styles.timelineContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#f59e0b' }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: '#f9fafb' }]}>SOC2 Type II Audit</Text>
                <Text style={[styles.timelineDate, { color: '#9ca3af' }]}>April 8, 2024</Text>
              </View>
              <View style={[styles.timelineBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Text style={[styles.timelineBadgeText, { color: '#f59e0b' }]}>In 45 days</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#06b6d4' }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: '#f9fafb' }]}>EU AI Act Review</Text>
                <Text style={[styles.timelineDate, { color: '#9ca3af' }]}>July 15, 2024</Text>
              </View>
              <View style={[styles.timelineBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Text style={[styles.timelineBadgeText, { color: '#06b6d4' }]}>In 183 days</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#10b981' }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: '#f9fafb' }]}>ISO 27001 Renewal</Text>
                <Text style={[styles.timelineDate, { color: '#9ca3af' }]}>July 10, 2024</Text>
              </View>
              <View style={[styles.timelineBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.timelineBadgeText, { color: '#10b981' }]}>In 178 days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Required Actions</Text>
          <View style={[styles.actionsContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <AlertTriangle size={24} color="#f59e0b" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Complete SOC2 Type II Evidence Collection</Text>
                <Text style={[styles.actionMeta, { color: '#9ca3af' }]}>Due: March 15, 2024 • Priority: High</Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Text style={[styles.actionButtonText, { color: '#06b6d4' }]}>Start</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Shield size={24} color="#06b6d4" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Update GDPR Data Processing Agreement</Text>
                <Text style={[styles.actionMeta, { color: '#9ca3af' }]}>Due: February 28, 2024 • Priority: Medium</Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Text style={[styles.actionButtonText, { color: '#06b6d4' }]}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  generateButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  overviewContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    alignItems: 'center',
    flex: 1,
  },
  overviewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  standardsGrid: {
    gap: 12,
  },
  standardCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  standardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  standardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  standardInfo: {
    flex: 1,
  },
  standardName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  standardMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  standardStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  standardStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  standardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  standardFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  standardFooterText: {
    fontSize: 12,
    fontWeight: '400',
  },
  reportsGrid: {
    gap: 12,
  },
  reportCard: {
    padding: 16,
    borderRadius: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  reportType: {
    fontSize: 12,
    fontWeight: '400',
  },
  reportStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  reportStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  reportAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reportActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timelineContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    fontWeight: '400',
  },
  timelineBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  timelineBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionsContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionMeta: {
    fontSize: 12,
    fontWeight: '400',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
