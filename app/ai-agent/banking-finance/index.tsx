import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Landmark, Activity, ArrowRight, Users, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const DEPARTMENT_AGENTS = [
  { id: 'chief-banking-officer', name: 'Chief Banking Officer', description: 'Chief Banking Officer AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'vp-retail-banking', name: 'VP Retail Banking', description: 'VP Retail Banking AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'vp-commercial-banking', name: 'VP Commercial Banking', description: 'VP Commercial Banking AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'vp-investment-banking', name: 'VP Investment Banking', description: 'VP Investment Banking AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'vp-wealth-management', name: 'VP Wealth Management', description: 'VP Wealth Management AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'risk-compliance-director', name: 'Risk & Compliance Director', description: 'Risk & Compliance Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'lending-operations-director', name: 'Lending Operations Director', description: 'Lending Operations Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'payments-strategy-director', name: 'Payments Strategy Director', description: 'Payments Strategy Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'treasury-director', name: 'Treasury Director', description: 'Treasury Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'digital-banking-director', name: 'Digital Banking Director', description: 'Digital Banking Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'branch-network-director', name: 'Branch Network Director', description: 'Branch Network Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'customer-experience-director', name: 'Customer Experience Director', description: 'Customer Experience Director AI Agent', icon: Users, color: '#2563EB' },
  { id: 'product-director', name: 'Product Director', description: 'Product Director AI Agent', icon: DollarSign, color: '#2563EB' },
  { id: 'operations-director', name: 'Operations Director', description: 'Operations Director AI Agent', icon: Landmark, color: '#2563EB' },
  { id: 'technology-director', name: 'Technology Director', description: 'Technology Director AI Agent', icon: Landmark, color: '#2563EB' },
  // Sub-agents would be listed here (45 total)
];

export default function BankingFinanceDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#2563EB20' }]}><Landmark size={48} color="#2563EB" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Banking & Finance</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Banking Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#2563EB22' }]}><Users size={12} color="#2563EB" /><Text style={[styles.badgeText, { color: '#2563EB' }]}>60 Agents</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Banking & Finance department manages all banking operations through AI-powered agents. From lending and payments to risk management and digital banking, our agents ensure efficient and compliant financial services.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/banking-finance/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      <AgentFeatures agentId="banking-finance-index" agentName="Banking & Finance Department" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
});