import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Heart, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EF444415' }]}><Heart size={48} color="#EF4444" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Healthcare & Medical - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}><Users size={12} color="#EF4444" /><Text style={[styles.badgeText, { color: '#EF4444' }]}>42 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="appointment-optimizer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/appointment-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Appointment Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="audit-preparer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/audit-preparer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Audit Preparer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="balance-collector" onPress={() => router.push('/ai-agent/healthcare/sub-agents/balance-collector')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Balance Collector</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="benchmark-reporter" onPress={() => router.push('/ai-agent/healthcare/sub-agents/benchmark-reporter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Benchmark Reporter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="care-plan-manager" onPress={() => router.push('/ai-agent/healthcare/sub-agents/care-plan-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Care Plan Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="care-transition-coordinator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/care-transition-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Care Transition Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="charge-capture-agent" onPress={() => router.push('/ai-agent/healthcare/sub-agents/charge-capture-agent')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Charge Capture Agent</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="claims-optimizer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/claims-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Claims Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="clinical-strategy-advisor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/clinical-strategy-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Clinical Strategy Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="code-assigner" onPress={() => router.push('/ai-agent/healthcare/sub-agents/code-assigner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Code Assigner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="coding-compliance-auditor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/coding-compliance-auditor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Coding Compliance Auditor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="coding-update-tracker" onPress={() => router.push('/ai-agent/healthcare/sub-agents/coding-update-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Coding Update Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="compliance-training-coordinator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/compliance-training-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Compliance Training Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="data-integrity-checker" onPress={() => router.push('/ai-agent/healthcare/sub-agents/data-integrity-checker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Data Integrity Checker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="denial-manager" onPress={() => router.push('/ai-agent/healthcare/sub-agents/denial-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Denial Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="discharge-planner" onPress={() => router.push('/ai-agent/healthcare/sub-agents/discharge-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Discharge Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="feedback-coordinator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/feedback-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Feedback Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="follow-up-scheduler" onPress={() => router.push('/ai-agent/healthcare/sub-agents/follow-up-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Follow Up Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="improvement-planner" onPress={() => router.push('/ai-agent/healthcare/sub-agents/improvement-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Improvement Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="intake-coordinator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/intake-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Intake Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="medical-policy-reviewer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/medical-policy-reviewer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Medical Policy Reviewer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="metric-analyzer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/metric-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Metric Analyzer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="no-show-predictor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/no-show-predictor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>No Show Predictor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="outcome-tracker" onPress={() => router.push('/ai-agent/healthcare/sub-agents/outcome-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Outcome Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="payment-poster" onPress={() => router.push('/ai-agent/healthcare/sub-agents/payment-poster')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Payment Poster</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pre-authorization-agent" onPress={() => router.push('/ai-agent/healthcare/sub-agents/pre-authorization-agent')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pre Authorization Agent</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="provider-calendar-manager" onPress={() => router.push('/ai-agent/healthcare/sub-agents/provider-calendar-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Provider Calendar Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="quality-standards-enforcer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/quality-standards-enforcer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Quality Standards Enforcer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="record-organizer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/record-organizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Record Organizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="referral-processor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/referral-processor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Referral Processor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="regulation-tracker" onPress={() => router.push('/ai-agent/healthcare/sub-agents/regulation-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Regulation Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="regulatory-compliance-monitor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/regulatory-compliance-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Regulatory Compliance Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="release-manager" onPress={() => router.push('/ai-agent/healthcare/sub-agents/release-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Release Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="remote-monitor" onPress={() => router.push('/ai-agent/healthcare/sub-agents/remote-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Remote Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="revenue-cycle-analyst" onPress={() => router.push('/ai-agent/healthcare/sub-agents/revenue-cycle-analyst')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Revenue Cycle Analyst</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="satisfaction-analyzer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/satisfaction-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Satisfaction Analyzer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="service-improvement-planner" onPress={() => router.push('/ai-agent/healthcare/sub-agents/service-improvement-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Service Improvement Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="service-navigator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/service-navigator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Service Navigator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="staff-scheduler" onPress={() => router.push('/ai-agent/healthcare/sub-agents/staff-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Staff Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tech-troubleshooter" onPress={() => router.push('/ai-agent/healthcare/sub-agents/tech-troubleshooter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tech Troubleshooter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="virtual-visit-facilitator" onPress={() => router.push('/ai-agent/healthcare/sub-agents/virtual-visit-facilitator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Virtual Visit Facilitator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="workflow-optimizer" onPress={() => router.push('/ai-agent/healthcare/sub-agents/workflow-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#EF444420' }]}><Heart size={28} color="#EF4444" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Workflow Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
});
