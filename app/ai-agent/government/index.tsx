import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-administrative-officer-gov', uid: 'ktx-20-chief-administrative-officer-gov', title: 'AI Chief Administrative Officer (Gov)', route: '/ai-agent/government/chief-administrative-officer-gov', color: '#78909C', level: 'c_level', efficiency: '94%' },
  { id: 'ai-vp-public-policy', uid: 'ktx-20-vp-public-policy', title: 'AI VP Public Policy', route: '/ai-agent/government/vp-public-policy', color: '#78909C', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-regulatory-affairs', uid: 'ktx-20-vp-regulatory-affairs', title: 'AI VP Regulatory Affairs', route: '/ai-agent/government/vp-regulatory-affairs', color: '#78909C', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-public-engagement', uid: 'ktx-20-vp-public-engagement', title: 'AI VP Public Engagement', route: '/ai-agent/government/vp-public-engagement', color: '#78909C', level: 'vp_director', efficiency: '76%' },
  { id: 'ai-vp-government-operations', uid: 'ktx-20-vp-government-operations', title: 'AI VP Government Operations', route: '/ai-agent/government/vp-government-operations', color: '#78909C', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-intergovernmental-affairs', uid: 'ktx-20-vp-intergovernmental-affairs', title: 'AI VP Intergovernmental Affairs', route: '/ai-agent/government/vp-intergovernmental-affairs', color: '#78909C', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-civic-services', uid: 'ktx-20-vp-civic-services', title: 'AI VP Civic Services', route: '/ai-agent/government/vp-civic-services', color: '#78909C', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-public-safety', uid: 'ktx-20-vp-public-safety', title: 'AI VP Public Safety', route: '/ai-agent/government/vp-public-safety', color: '#78909C', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-urban-planning', uid: 'ktx-20-vp-urban-planning', title: 'AI VP Urban Planning', route: '/ai-agent/government/vp-urban-planning', color: '#78909C', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-environmental-services', uid: 'ktx-20-vp-environmental-services', title: 'AI VP Environmental Services', route: '/ai-agent/government/vp-environmental-services', color: '#78909C', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-social-services', uid: 'ktx-20-vp-social-services', title: 'AI VP Social Services', route: '/ai-agent/government/vp-social-services', color: '#78909C', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-technology-innovation', uid: 'ktx-20-vp-technology-innovation', title: 'AI VP Technology & Innovation', route: '/ai-agent/government/vp-technology-innovation', color: '#78909C', level: 'vp_director', efficiency: '90%' },
  { id: 'ai-policy-manager', uid: 'ktx-20-policy-manager', title: 'AI Policy Manager', route: '/ai-agent/government/policy-manager', color: '#78909C', level: 'manager', efficiency: '94%' },
  { id: 'ai-grants-manager', uid: 'ktx-20-grants-manager', title: 'AI Grants Manager', route: '/ai-agent/government/grants-manager', color: '#78909C', level: 'manager', efficiency: '94%' },
  { id: 'ai-regulatory-manager', uid: 'ktx-20-regulatory-manager', title: 'AI Regulatory Manager', route: '/ai-agent/government/regulatory-manager', color: '#78909C', level: 'manager', efficiency: '87%' },
  { id: 'ai-public-engagement-manager', uid: 'ktx-20-public-engagement-manager', title: 'AI Public Engagement Manager', route: '/ai-agent/government/public-engagement-manager', color: '#78909C', level: 'manager', efficiency: '86%' },
  { id: 'ai-civic-services-manager', uid: 'ktx-20-civic-services-manager', title: 'AI Civic Services Manager', route: '/ai-agent/government/civic-services-manager', color: '#78909C', level: 'manager', efficiency: '85%' },
  { id: 'ai-urban-planning-manager', uid: 'ktx-20-urban-planning-manager', title: 'AI Urban Planning Manager', route: '/ai-agent/government/urban-planning-manager', color: '#78909C', level: 'manager', efficiency: '88%' },
  { id: 'ai-policy-analyst', uid: 'ktx-20-policy-analyst', title: 'AI Policy Analyst', route: '/ai-agent/government/policy-analyst', color: '#78909C', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-regulatory-specialist', uid: 'ktx-20-regulatory-specialist', title: 'AI Regulatory Specialist', route: '/ai-agent/government/regulatory-specialist', color: '#78909C', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-public-affairs-specialist', uid: 'ktx-20-public-affairs-specialist', title: 'AI Public Affairs Specialist', route: '/ai-agent/government/public-affairs-specialist', color: '#78909C', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-grants-specialist', uid: 'ktx-20-grants-specialist', title: 'AI Grants Specialist', route: '/ai-agent/government/grants-specialist', color: '#78909C', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-government-compliance', uid: 'ktx-20-government-compliance', title: 'AI Government Compliance', route: '/ai-agent/government/government-compliance', color: '#78909C', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-transparency-officer', uid: 'ktx-20-transparency-officer', title: 'AI Transparency Officer', route: '/ai-agent/government/transparency-officer', color: '#78909C', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-legislative-analyst', uid: 'ktx-20-legislative-analyst', title: 'AI Legislative Analyst', route: '/ai-agent/government/legislative-analyst', color: '#78909C', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-budget-analyst', uid: 'ktx-20-budget-analyst', title: 'AI Budget Analyst', route: '/ai-agent/government/budget-analyst', color: '#78909C', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-program-evaluator', uid: 'ktx-20-program-evaluator', title: 'AI Program Evaluator', route: '/ai-agent/government/program-evaluator', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-performance-auditor', uid: 'ktx-20-performance-auditor', title: 'AI Performance Auditor', route: '/ai-agent/government/performance-auditor', color: '#78909C', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-public-communications', uid: 'ktx-20-public-communications', title: 'AI Public Communications', route: '/ai-agent/government/public-communications', color: '#78909C', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-media-relations', uid: 'ktx-20-media-relations', title: 'AI Media Relations', route: '/ai-agent/government/media-relations', color: '#78909C', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-community-outreach', uid: 'ktx-20-community-outreach', title: 'AI Community Outreach', route: '/ai-agent/government/community-outreach', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-stakeholder-engagement', uid: 'ktx-20-stakeholder-engagement', title: 'AI Stakeholder Engagement', route: '/ai-agent/government/stakeholder-engagement', color: '#78909C', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-citizen-services-specialist', uid: 'ktx-20-citizen-services-specialist', title: 'AI Citizen Services Specialist', route: '/ai-agent/government/citizen-services-specialist', color: '#78909C', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-permit-specialist', uid: 'ktx-20-permit-specialist', title: 'AI Permit Specialist', route: '/ai-agent/government/permit-specialist', color: '#78909C', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-licensing-specialist', uid: 'ktx-20-licensing-specialist', title: 'AI Licensing Specialist', route: '/ai-agent/government/licensing-specialist', color: '#78909C', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-inspections-coordinator', uid: 'ktx-20-inspections-coordinator', title: 'AI Inspections Coordinator', route: '/ai-agent/government/inspections-coordinator', color: '#78909C', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-zoning-specialist', uid: 'ktx-20-zoning-specialist', title: 'AI Zoning Specialist', route: '/ai-agent/government/zoning-specialist', color: '#78909C', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-land-use-planner', uid: 'ktx-20-land-use-planner', title: 'AI Land Use Planner', route: '/ai-agent/government/land-use-planner', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-transportation-planner', uid: 'ktx-20-transportation-planner', title: 'AI Transportation Planner', route: '/ai-agent/government/transportation-planner', color: '#78909C', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-infrastructure-coordinator', uid: 'ktx-20-infrastructure-coordinator', title: 'AI Infrastructure Coordinator', route: '/ai-agent/government/infrastructure-coordinator', color: '#78909C', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-environmental-analyst', uid: 'ktx-20-environmental-analyst', title: 'AI Environmental Analyst', route: '/ai-agent/government/environmental-analyst', color: '#78909C', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-sustainability-coordinator', uid: 'ktx-20-sustainability-coordinator', title: 'AI Sustainability Coordinator', route: '/ai-agent/government/sustainability-coordinator', color: '#78909C', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-climate-action-specialist', uid: 'ktx-20-climate-action-specialist', title: 'AI Climate Action Specialist', route: '/ai-agent/government/climate-action-specialist', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-emergency-management', uid: 'ktx-20-emergency-management', title: 'AI Emergency Management', route: '/ai-agent/government/emergency-management', color: '#78909C', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-public-safety-analyst', uid: 'ktx-20-public-safety-analyst', title: 'AI Public Safety Analyst', route: '/ai-agent/government/public-safety-analyst', color: '#78909C', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-social-services-coordinator', uid: 'ktx-20-social-services-coordinator', title: 'AI Social Services Coordinator', route: '/ai-agent/government/social-services-coordinator', color: '#78909C', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-benefits-administrator', uid: 'ktx-20-benefits-administrator', title: 'AI Benefits Administrator', route: '/ai-agent/government/benefits-administrator', color: '#78909C', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-case-manager', uid: 'ktx-20-case-manager', title: 'AI Case Manager', route: '/ai-agent/government/case-manager', color: '#78909C', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-technology-specialist', uid: 'ktx-20-technology-specialist', title: 'AI Technology Specialist', route: '/ai-agent/government/technology-specialist', color: '#78909C', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-digital-services', uid: 'ktx-20-digital-services', title: 'AI Digital Services', route: '/ai-agent/government/digital-services', color: '#78909C', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-open-data-coordinator', uid: 'ktx-20-open-data-coordinator', title: 'AI Open Data Coordinator', route: '/ai-agent/government/open-data-coordinator', color: '#78909C', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-cybersecurity-analyst', uid: 'ktx-20-cybersecurity-analyst', title: 'AI Cybersecurity Analyst', route: '/ai-agent/government/cybersecurity-analyst', color: '#78909C', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-records-manager', uid: 'ktx-20-records-manager', title: 'AI Records Manager', route: '/ai-agent/government/records-manager', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-foia-specialist', uid: 'ktx-20-foia-specialist', title: 'AI FOIA Specialist', route: '/ai-agent/government/foia-specialist', color: '#78909C', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ethics-officer', uid: 'ktx-20-ethics-officer', title: 'AI Ethics Officer', route: '/ai-agent/government/ethics-officer', color: '#78909C', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-integrity-officer', uid: 'ktx-20-integrity-officer', title: 'AI Integrity Officer', route: '/ai-agent/government/integrity-officer', color: '#78909C', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-audit-specialist', uid: 'ktx-20-audit-specialist', title: 'AI Audit Specialist', route: '/ai-agent/government/audit-specialist', color: '#78909C', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-risk-assessment-specialist', uid: 'ktx-20-risk-assessment-specialist', title: 'AI Risk Assessment Specialist', route: '/ai-agent/government/risk-assessment-specialist', color: '#78909C', level: 'team_lead', efficiency: '84%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Government & Public Sector - AI Agents</Text>
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
