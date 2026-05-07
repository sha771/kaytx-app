import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Building2, ArrowRight, Briefcase, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubAgentsIndex() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF615' }]}><Building2 size={48} color="#8B5CF6" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Real Estate & Property - Sub-Agents</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Helper & Sub-Agent Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Users size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>42 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <TouchableOpacity key="asset-performance-tracker" onPress={() => router.push('/ai-agent/realestate/sub-agents/asset-performance-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Asset Performance Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="budget-tracker" onPress={() => router.push('/ai-agent/realestate/sub-agents/budget-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Budget Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="building-systems-monitor" onPress={() => router.push('/ai-agent/realestate/sub-agents/building-systems-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Building Systems Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="capital-deployment-planner" onPress={() => router.push('/ai-agent/realestate/sub-agents/capital-deployment-planner')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Capital Deployment Planner</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="communication-coordinator" onPress={() => router.push('/ai-agent/realestate/sub-agents/communication-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Communication Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="comparable-analyzer" onPress={() => router.push('/ai-agent/realestate/sub-agents/comparable-analyzer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Comparable Analyzer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="contractor-coordinator" onPress={() => router.push('/ai-agent/realestate/sub-agents/contractor-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Contractor Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="cost-estimator" onPress={() => router.push('/ai-agent/realestate/sub-agents/cost-estimator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Cost Estimator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="critical-date-tracker" onPress={() => router.push('/ai-agent/realestate/sub-agents/critical-date-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Critical Date Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="deal-screener" onPress={() => router.push('/ai-agent/realestate/sub-agents/deal-screener')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Deal Screener</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="development-pipeline-manager" onPress={() => router.push('/ai-agent/realestate/sub-agents/development-pipeline-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Development Pipeline Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="disposition-advisor" onPress={() => router.push('/ai-agent/realestate/sub-agents/disposition-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Disposition Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="due-diligence-coordinator" onPress={() => router.push('/ai-agent/realestate/sub-agents/due-diligence-coordinator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Due Diligence Coordinator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="energy-manager" onPress={() => router.push('/ai-agent/realestate/sub-agents/energy-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Energy Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="feasibility-analyst" onPress={() => router.push('/ai-agent/realestate/sub-agents/feasibility-analyst')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Feasibility Analyst</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="issue-resolver" onPress={() => router.push('/ai-agent/realestate/sub-agents/issue-resolver')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Issue Resolver</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lead-qualifier" onPress={() => router.push('/ai-agent/realestate/sub-agents/lead-qualifier')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lead Qualifier</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lease-abstractor" onPress={() => router.push('/ai-agent/realestate/sub-agents/lease-abstractor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lease Abstractor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lease-enforcer" onPress={() => router.push('/ai-agent/realestate/sub-agents/lease-enforcer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lease Enforcer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="lease-negotiator" onPress={() => router.push('/ai-agent/realestate/sub-agents/lease-negotiator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Lease Negotiator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="listing-creator" onPress={() => router.push('/ai-agent/realestate/sub-agents/listing-creator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Listing Creator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="maintenance-dispatcher" onPress={() => router.push('/ai-agent/realestate/sub-agents/maintenance-dispatcher')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Maintenance Dispatcher</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="market-cycle-analyst" onPress={() => router.push('/ai-agent/realestate/sub-agents/market-cycle-analyst')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Market Cycle Analyst</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="market-trend-reporter" onPress={() => router.push('/ai-agent/realestate/sub-agents/market-trend-reporter')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Market Trend Reporter</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="noi-optimizer" onPress={() => router.push('/ai-agent/realestate/sub-agents/noi-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Noi Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="permit-tracker" onPress={() => router.push('/ai-agent/realestate/sub-agents/permit-tracker')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Permit Tracker</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="portfolio-strategy-advisor" onPress={() => router.push('/ai-agent/realestate/sub-agents/portfolio-strategy-advisor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Portfolio Strategy Advisor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="property-performance-monitor" onPress={() => router.push('/ai-agent/realestate/sub-agents/property-performance-monitor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Property Performance Monitor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="rent-collector" onPress={() => router.push('/ai-agent/realestate/sub-agents/rent-collector')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Rent Collector</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="rent-escalation-calculator" onPress={() => router.push('/ai-agent/realestate/sub-agents/rent-escalation-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Rent Escalation Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="return-calculator" onPress={() => router.push('/ai-agent/realestate/sub-agents/return-calculator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Return Calculator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="satisfaction-surveyor" onPress={() => router.push('/ai-agent/realestate/sub-agents/satisfaction-surveyor')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Satisfaction Surveyor</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="space-optimizer" onPress={() => router.push('/ai-agent/realestate/sub-agents/space-optimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Space Optimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tenant-qualifier" onPress={() => router.push('/ai-agent/realestate/sub-agents/tenant-qualifier')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tenant Qualifier</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="tenant-retention-strategist" onPress={() => router.push('/ai-agent/realestate/sub-agents/tenant-retention-strategist')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Tenant Retention Strategist</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="timeline-manager" onPress={() => router.push('/ai-agent/realestate/sub-agents/timeline-manager')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Timeline Manager</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="underwriting-assistant" onPress={() => router.push('/ai-agent/realestate/sub-agents/underwriting-assistant')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Underwriting Assistant</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vacancy-minimizer" onPress={() => router.push('/ai-agent/realestate/sub-agents/vacancy-minimizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vacancy Minimizer</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="value-estimator" onPress={() => router.push('/ai-agent/realestate/sub-agents/value-estimator')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Value Estimator</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="vendor-dispatcher" onPress={() => router.push('/ai-agent/realestate/sub-agents/vendor-dispatcher')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Vendor Dispatcher</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="virtual-tour-builder" onPress={() => router.push('/ai-agent/realestate/sub-agents/virtual-tour-builder')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Virtual Tour Builder</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity key="work-order-prioritizer" onPress={() => router.push('/ai-agent/realestate/sub-agents/work-order-prioritizer')} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <View style={[styles.agentIcon, { backgroundColor: '#8B5CF620' }]}><Building2 size={28} color="#8B5CF6" /></View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>Work Order Prioritizer</Text>
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
