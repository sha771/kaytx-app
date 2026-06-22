import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-predictive-engine', uid: 'ktx-00-predictive-engine', title: 'AI Predictive Engine', route: '/ai-agent/cross-department/predictive-engine', color: '#8B5CF6', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-sentiment-core', uid: 'ktx-00-sentiment-core', title: 'AI Sentiment Core', route: '/ai-agent/cross-department/sentiment-core', color: '#8B5CF6', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-anomaly-detector', uid: 'ktx-00-anomaly-detector', title: 'AI Anomaly Detector', route: '/ai-agent/cross-department/anomaly-detector', color: '#8B5CF6', level: 'c_level', efficiency: '88%' },
  { id: 'ai-swarm-controller', uid: 'ktx-00-swarm-controller', title: 'AI Swarm Controller', route: '/ai-agent/cross-department/swarm-controller', color: '#8B5CF6', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-learn-engine', uid: 'ktx-00-learn-engine', title: 'AI Learn Engine', route: '/ai-agent/cross-department/learn-engine', color: '#8B5CF6', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-orchestrator', uid: 'ktx-00-orchestrator', title: 'AI Orchestrator', route: '/ai-agent/cross-department/orchestrator', color: '#8B5CF6', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-governance-overseer', uid: 'ktx-00-governance-overseer', title: 'AI Governance Overseer', route: '/ai-agent/cross-department/governance-overseer', color: '#8B5CF6', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-compliance-guardian', uid: 'ktx-00-compliance-guardian', title: 'AI Compliance Guardian', route: '/ai-agent/cross-department/compliance-guardian', color: '#8B5CF6', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-ethics-monitor', uid: 'ktx-00-ethics-monitor', title: 'AI Ethics Monitor', route: '/ai-agent/cross-department/ethics-monitor', color: '#8B5CF6', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-bias-detector', uid: 'ktx-00-bias-detector', title: 'AI Bias Detector', route: '/ai-agent/cross-department/bias-detector', color: '#8B5CF6', level: 'c_level', efficiency: '87%' },
  { id: 'ai-layer-bridge', uid: 'ktx-00-layer-bridge', title: 'AI Layer Bridge', route: '/ai-agent/cross-department/layer-bridge', color: '#8B5CF6', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-department-liaison', uid: 'ktx-00-department-liaison', title: 'AI Department Liaison', route: '/ai-agent/cross-department/department-liaison', color: '#8B5CF6', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-cross-functional-coordinator', uid: 'ktx-00-cross-functional-coordinator', title: 'AI Cross-Functional Coordinator', route: '/ai-agent/cross-department/cross-functional-coordinator', color: '#8B5CF6', level: 'c_level', efficiency: '92%' },
  { id: 'ai-enterprise-architect', uid: 'ktx-00-enterprise-architect', title: 'AI Enterprise Architect', route: '/ai-agent/cross-department/enterprise-architect', color: '#8B5CF6', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-innovation-catalyst', uid: 'ktx-00-innovation-catalyst', title: 'AI Innovation Catalyst', route: '/ai-agent/cross-department/innovation-catalyst', color: '#8B5CF6', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-change-management-agent', uid: 'ktx-00-change-management-agent', title: 'AI Change Management Agent', route: '/ai-agent/cross-department/change-management-agent', color: '#8B5CF6', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-crisis-response-coordinator', uid: 'ktx-00-crisis-response-coordinator', title: 'AI Crisis Response Coordinator', route: '/ai-agent/cross-department/crisis-response-coordinator', color: '#8B5CF6', level: 'c_level', efficiency: '85%' },
  { id: 'ai-knowledge-synthesizer', uid: 'ktx-00-knowledge-synthesizer', title: 'AI Knowledge Synthesizer', route: '/ai-agent/cross-department/knowledge-synthesizer', color: '#8B5CF6', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-performance-benchmark', uid: 'ktx-00-performance-benchmark', title: 'AI Performance Benchmark', route: '/ai-agent/cross-department/performance-benchmark', color: '#8B5CF6', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-resource-optimizer', uid: 'ktx-00-resource-optimizer', title: 'AI Resource Optimizer', route: '/ai-agent/cross-department/resource-optimizer', color: '#8B5CF6', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-strategy-simulator', uid: 'ktx-00-strategy-simulator', title: 'AI Strategy Simulator', route: '/ai-agent/cross-department/strategy-simulator', color: '#8B5CF6', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-talent-mobility-agent', uid: 'ktx-00-talent-mobility-agent', title: 'AI Talent Mobility Agent', route: '/ai-agent/cross-department/talent-mobility-agent', color: '#8B5CF6', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-vendor-management-agent', uid: 'ktx-00-vendor-management-agent', title: 'AI Vendor Management Agent', route: '/ai-agent/cross-department/vendor-management-agent', color: '#8B5CF6', level: 'team_lead', efficiency: '77%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Cross-Department - AI Agents</Text>
      <Text style={s.sub}>{agents.length} AI Agents & Employees</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
