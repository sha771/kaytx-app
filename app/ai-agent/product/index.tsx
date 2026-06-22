import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-vp-product', uid: 'ktx-10-vp-product', title: 'AI VP Product', route: '/ai-agent/product/vp-product', color: '#FF5722', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-product-strategy', uid: 'ktx-10-vp-product-strategy', title: 'AI VP Product Strategy', route: '/ai-agent/product/vp-product-strategy', color: '#FF5722', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-product-operations', uid: 'ktx-10-vp-product-operations', title: 'AI VP Product Operations', route: '/ai-agent/product/vp-product-operations', color: '#FF5722', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-product-marketing', uid: 'ktx-10-vp-product-marketing', title: 'AI VP Product Marketing', route: '/ai-agent/product/vp-product-marketing', color: '#FF5722', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-product-design', uid: 'ktx-10-vp-product-design', title: 'AI VP Product Design', route: '/ai-agent/product/vp-product-design', color: '#FF5722', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-product-analytics', uid: 'ktx-10-vp-product-analytics', title: 'AI VP Product Analytics', route: '/ai-agent/product/vp-product-analytics', color: '#FF5722', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-product-innovation', uid: 'ktx-10-vp-product-innovation', title: 'AI VP Product Innovation', route: '/ai-agent/product/vp-product-innovation', color: '#FF5722', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-product-growth', uid: 'ktx-10-vp-product-growth', title: 'AI VP Product Growth', route: '/ai-agent/product/vp-product-growth', color: '#FF5722', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-product-manager', uid: 'ktx-10-product-manager', title: 'AI Product Manager', route: '/ai-agent/product/product-manager', color: '#FF5722', level: 'manager', efficiency: '81%' },
  { id: 'ai-senior-product-manager', uid: 'ktx-10-senior-product-manager', title: 'AI Senior Product Manager', route: '/ai-agent/product/senior-product-manager', color: '#FF5722', level: 'manager', efficiency: '83%' },
  { id: 'ai-group-product-manager', uid: 'ktx-10-group-product-manager', title: 'AI Group Product Manager', route: '/ai-agent/product/group-product-manager', color: '#FF5722', level: 'manager', efficiency: '84%' },
  { id: 'ai-technical-product-manager', uid: 'ktx-10-technical-product-manager', title: 'AI Technical Product Manager', route: '/ai-agent/product/technical-product-manager', color: '#FF5722', level: 'manager', efficiency: '82%' },
  { id: 'ai-product-owner', uid: 'ktx-10-product-owner', title: 'AI Product Owner', route: '/ai-agent/product/product-owner', color: '#FF5722', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-product-manager-sub', uid: 'ktx-10-product-manager-sub', title: 'AI Product Manager (sub)', route: '/ai-agent/product/product-manager-sub', color: '#FF5722', level: 'manager', efficiency: '83%' },
  { id: 'ai-associate-product-manager', uid: 'ktx-10-associate-product-manager', title: 'AI Associate Product Manager', route: '/ai-agent/product/associate-product-manager', color: '#FF5722', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-product-analyst', uid: 'ktx-10-product-analyst', title: 'AI Product Analyst', route: '/ai-agent/product/product-analyst', color: '#FF5722', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-senior-product-analyst', uid: 'ktx-10-senior-product-analyst', title: 'AI Senior Product Analyst', route: '/ai-agent/product/senior-product-analyst', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ux-researcher', uid: 'ktx-10-ux-researcher', title: 'AI UX Researcher', route: '/ai-agent/product/ux-researcher', color: '#FF5722', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-user-researcher', uid: 'ktx-10-user-researcher', title: 'AI User Researcher', route: '/ai-agent/product/user-researcher', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-customer-insight-specialist', uid: 'ktx-10-customer-insight-specialist', title: 'AI Customer Insight Specialist', route: '/ai-agent/product/customer-insight-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-market-researcher', uid: 'ktx-10-market-researcher', title: 'AI Market Researcher', route: '/ai-agent/product/market-researcher', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-competitive-intelligence-product', uid: 'ktx-10-competitive-intelligence-product', title: 'AI Competitive Intelligence (Product)', route: '/ai-agent/product/competitive-intelligence-product', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-marketer', uid: 'ktx-10-product-marketer', title: 'AI Product Marketer', route: '/ai-agent/product/product-marketer', color: '#FF5722', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-product-content-strategist', uid: 'ktx-10-product-content-strategist', title: 'AI Product Content Strategist', route: '/ai-agent/product/product-content-strategist', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-designer', uid: 'ktx-10-product-designer', title: 'AI Product Designer', route: '/ai-agent/product/product-designer', color: '#FF5722', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ux-designer', uid: 'ktx-10-ux-designer', title: 'AI UX Designer', route: '/ai-agent/product/ux-designer', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ui-designer', uid: 'ktx-10-ui-designer', title: 'AI UI Designer', route: '/ai-agent/product/ui-designer', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-design-system-manager', uid: 'ktx-10-design-system-manager', title: 'AI Design System Manager', route: '/ai-agent/product/design-system-manager', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-release-manager', uid: 'ktx-10-release-manager', title: 'AI Release Manager', route: '/ai-agent/product/release-manager', color: '#FF5722', level: 'manager', efficiency: '81%' },
  { id: 'ai-product-coordinator', uid: 'ktx-10-product-coordinator', title: 'AI Product Coordinator', route: '/ai-agent/product/product-coordinator', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-operations-specialist', uid: 'ktx-10-product-operations-specialist', title: 'AI Product Operations Specialist', route: '/ai-agent/product/product-operations-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-support-liaison', uid: 'ktx-10-product-support-liaison', title: 'AI Product Support Liaison', route: '/ai-agent/product/product-support-liaison', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-sales-liaison', uid: 'ktx-10-product-sales-liaison', title: 'AI Product Sales Liaison', route: '/ai-agent/product/product-sales-liaison', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-engineering-liaison', uid: 'ktx-10-product-engineering-liaison', title: 'AI Product Engineering Liaison', route: '/ai-agent/product/product-engineering-liaison', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-quality-specialist', uid: 'ktx-10-product-quality-specialist', title: 'AI Product Quality Specialist', route: '/ai-agent/product/product-quality-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-data-analyst', uid: 'ktx-10-product-data-analyst', title: 'AI Product Data Analyst', route: '/ai-agent/product/product-data-analyst', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-metrics-specialist', uid: 'ktx-10-product-metrics-specialist', title: 'AI Product Metrics Specialist', route: '/ai-agent/product/product-metrics-specialist', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-strategist', uid: 'ktx-10-product-strategist', title: 'AI Product Strategist', route: '/ai-agent/product/product-strategist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-innovation-manager', uid: 'ktx-10-product-innovation-manager', title: 'AI Product Innovation Manager', route: '/ai-agent/product/product-innovation-manager', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-roadmap-owner', uid: 'ktx-10-product-roadmap-owner', title: 'AI Product Roadmap Owner', route: '/ai-agent/product/product-roadmap-owner', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-backlog-manager', uid: 'ktx-10-product-backlog-manager', title: 'AI Product Backlog Manager', route: '/ai-agent/product/product-backlog-manager', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-agile-product-owner', uid: 'ktx-10-agile-product-owner', title: 'AI Agile Product Owner', route: '/ai-agent/product/agile-product-owner', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-scrum-product-owner', uid: 'ktx-10-scrum-product-owner', title: 'AI Scrum Product Owner', route: '/ai-agent/product/scrum-product-owner', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-growth-hacker', uid: 'ktx-10-product-growth-hacker', title: 'AI Product Growth Hacker', route: '/ai-agent/product/product-growth-hacker', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-optimization-specialist', uid: 'ktx-10-product-optimization-specialist', title: 'AI Product Optimization Specialist', route: '/ai-agent/product/product-optimization-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-localization-specialist', uid: 'ktx-10-product-localization-specialist', title: 'AI Product Localization Specialist', route: '/ai-agent/product/product-localization-specialist', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-accessibility-specialist', uid: 'ktx-10-product-accessibility-specialist', title: 'AI Product Accessibility Specialist', route: '/ai-agent/product/product-accessibility-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-usability-specialist', uid: 'ktx-10-product-usability-specialist', title: 'AI Product Usability Specialist', route: '/ai-agent/product/product-usability-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-testing-coordinator', uid: 'ktx-10-product-testing-coordinator', title: 'AI Product Testing Coordinator', route: '/ai-agent/product/product-testing-coordinator', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-validation-specialist', uid: 'ktx-10-product-validation-specialist', title: 'AI Product Validation Specialist', route: '/ai-agent/product/product-validation-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-documentation-specialist', uid: 'ktx-10-product-documentation-specialist', title: 'AI Product Documentation Specialist', route: '/ai-agent/product/product-documentation-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-training-specialist', uid: 'ktx-10-product-training-specialist', title: 'AI Product Training Specialist', route: '/ai-agent/product/product-training-specialist', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-communication-specialist', uid: 'ktx-10-product-communication-specialist', title: 'AI Product Communication Specialist', route: '/ai-agent/product/product-communication-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-community-manager', uid: 'ktx-10-product-community-manager', title: 'AI Product Community Manager', route: '/ai-agent/product/product-community-manager', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-feedback-manager', uid: 'ktx-10-product-feedback-manager', title: 'AI Product Feedback Manager', route: '/ai-agent/product/product-feedback-manager', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-success-manager', uid: 'ktx-10-product-success-manager', title: 'AI Product Success Manager', route: '/ai-agent/product/product-success-manager', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-customer-success', uid: 'ktx-10-product-customer-success', title: 'AI Product Customer Success', route: '/ai-agent/product/product-customer-success', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-onboarding-specialist', uid: 'ktx-10-product-onboarding-specialist', title: 'AI Product Onboarding Specialist', route: '/ai-agent/product/product-onboarding-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-adoption-specialist', uid: 'ktx-10-product-adoption-specialist', title: 'AI Product Adoption Specialist', route: '/ai-agent/product/product-adoption-specialist', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-retention-specialist', uid: 'ktx-10-product-retention-specialist', title: 'AI Product Retention Specialist', route: '/ai-agent/product/product-retention-specialist', color: '#FF5722', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-product-churn-specialist', uid: 'ktx-10-product-churn-specialist', title: 'AI Product Churn Specialist', route: '/ai-agent/product/product-churn-specialist', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-lifecycle-manager', uid: 'ktx-10-product-lifecycle-manager', title: 'AI Product Lifecycle Manager', route: '/ai-agent/product/product-lifecycle-manager', color: '#FF5722', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-product-portfolio-manager', uid: 'ktx-10-product-portfolio-manager', title: 'AI Product Portfolio Manager', route: '/ai-agent/product/product-portfolio-manager', color: '#FF5722', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-product-strategy-director', uid: 'ktx-10-product-strategy-director', title: 'AI Product Strategy Director', route: '/ai-agent/product/product-strategy-director', color: '#FF5722', level: 'team_lead', efficiency: '83%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Product Management - AI Agents</Text>
      <Text style={s.sub}>60 AI Agents & Employees</Text>
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
