import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, TrendingUp, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950015' }]}><TrendingUp size={48} color="#FF9500" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Sales & Revenue - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>42 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="activity-logger" onPress={() => router.push('/ai-agent/sales/sub-agents/activity-logger')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Activity Logger</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="alliance-coordinator" onPress={() => router.push('/ai-agent/sales/sub-agents/alliance-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Alliance Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="batna-calculator" onPress={() => router.push('/ai-agent/sales/sub-agents/batna-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Batna Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="channel-performance-tracker" onPress={() => router.push('/ai-agent/sales/sub-agents/channel-performance-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Channel Performance Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="closing-strategist" onPress={() => router.push('/ai-agent/sales/sub-agents/closing-strategist')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Closing Strategist</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="co-marketing-coordinator" onPress={() => router.push('/ai-agent/sales/sub-agents/co-marketing-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Co Marketing Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="competitor-price-tracker" onPress={() => router.push('/ai-agent/sales/sub-agents/competitor-price-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Competitor Price Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="concession-tracker" onPress={() => router.push('/ai-agent/sales/sub-agents/concession-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Concession Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="contact-updater" onPress={() => router.push('/ai-agent/sales/sub-agents/contact-updater')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Contact Updater</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="content-recommender" onPress={() => router.push('/ai-agent/sales/sub-agents/content-recommender')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Content Recommender</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="crm-data-cleaner" onPress={() => router.push('/ai-agent/sales/sub-agents/crm-data-cleaner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Crm Data Cleaner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="deal-structurer" onPress={() => router.push('/ai-agent/sales/sub-agents/deal-structurer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Deal Structurer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="demo-coordinator" onPress={() => router.push('/ai-agent/sales/sub-agents/demo-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Demo Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="discount-approver" onPress={() => router.push('/ai-agent/sales/sub-agents/discount-approver')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Discount Approver</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="discovery-questioner" onPress={() => router.push('/ai-agent/sales/sub-agents/discovery-questioner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Discovery Questioner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="forecast-validator" onPress={() => router.push('/ai-agent/sales/sub-agents/forecast-validator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Forecast Validator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lead-scorer" onPress={() => router.push('/ai-agent/sales/sub-agents/lead-scorer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lead Scorer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="margin-calculator" onPress={() => router.push('/ai-agent/sales/sub-agents/margin-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Margin Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="market-expander" onPress={() => router.push('/ai-agent/sales/sub-agents/market-expander')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Market Expander</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="objection-handler" onPress={() => router.push('/ai-agent/sales/sub-agents/objection-handler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Objection Handler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="outreach-sequencer" onPress={() => router.push('/ai-agent/sales/sub-agents/outreach-sequencer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Outreach Sequencer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="partner-onboarding-agent" onPress={() => router.push('/ai-agent/sales/sub-agents/partner-onboarding-agent')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Partner Onboarding Agent</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="partnership-scout" onPress={() => router.push('/ai-agent/sales/sub-agents/partnership-scout')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Partnership Scout</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pipeline-analyst" onPress={() => router.push('/ai-agent/sales/sub-agents/pipeline-analyst')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pipeline Analyst</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pipeline-organizer" onPress={() => router.push('/ai-agent/sales/sub-agents/pipeline-organizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pipeline Organizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pipeline-weighter" onPress={() => router.push('/ai-agent/sales/sub-agents/pipeline-weighter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pipeline Weighter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="playbook-updater" onPress={() => router.push('/ai-agent/sales/sub-agents/playbook-updater')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Playbook Updater</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pricing-calculator" onPress={() => router.push('/ai-agent/sales/sub-agents/pricing-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pricing Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="pricing-optimizer" onPress={() => router.push('/ai-agent/sales/sub-agents/pricing-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Pricing Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="proposal-reviewer" onPress={() => router.push('/ai-agent/sales/sub-agents/proposal-reviewer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Proposal Reviewer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="prospect-researcher" onPress={() => router.push('/ai-agent/sales/sub-agents/prospect-researcher')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Prospect Researcher</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="quota-tracker" onPress={() => router.push('/ai-agent/sales/sub-agents/quota-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Quota Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="reporting-automator" onPress={() => router.push('/ai-agent/sales/sub-agents/reporting-automator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Reporting Automator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="revenue-modeler" onPress={() => router.push('/ai-agent/sales/sub-agents/revenue-modeler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Revenue Modeler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="sales-process-auditor" onPress={() => router.push('/ai-agent/sales/sub-agents/sales-process-auditor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Sales Process Auditor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="seasonality-adjuster" onPress={() => router.push('/ai-agent/sales/sub-agents/seasonality-adjuster')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Seasonality Adjuster</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="stakeholder-mapper" onPress={() => router.push('/ai-agent/sales/sub-agents/stakeholder-mapper')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Stakeholder Mapper</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="template-selector" onPress={() => router.push('/ai-agent/sales/sub-agents/template-selector')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Template Selector</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="term-analyzer" onPress={() => router.push('/ai-agent/sales/sub-agents/term-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Term Analyzer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="territory-planner" onPress={() => router.push('/ai-agent/sales/sub-agents/territory-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Territory Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="training-scheduler" onPress={() => router.push('/ai-agent/sales/sub-agents/training-scheduler')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Training Scheduler</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="trend-analyzer" onPress={() => router.push('/ai-agent/sales/sub-agents/trend-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#FF950020' }]}><TrendingUp size={28} color="#FF9500" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Trend Analyzer</Text>
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
