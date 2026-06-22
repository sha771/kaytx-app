import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-legal-officer', uid: 'ktx-08-chief-legal-officer', title: 'AI Chief Legal Officer', route: '/ai-agent/legal/chief-legal-officer', color: '#3F51B5', level: 'c_level', efficiency: '89%' },
  { id: 'ai-general-counsel', uid: 'ktx-08-general-counsel', title: 'AI General Counsel', route: '/ai-agent/legal/general-counsel', color: '#3F51B5', level: 'c_level', efficiency: '88%' },
  { id: 'ai-vp-legal', uid: 'ktx-08-vp-legal', title: 'AI VP Legal', route: '/ai-agent/legal/vp-legal', color: '#3F51B5', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-vp-compliance', uid: 'ktx-08-vp-compliance', title: 'AI VP Compliance', route: '/ai-agent/legal/vp-compliance', color: '#3F51B5', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-contracts', uid: 'ktx-08-vp-contracts', title: 'AI VP Contracts', route: '/ai-agent/legal/vp-contracts', color: '#3F51B5', level: 'vp_director', efficiency: '80%' },
  { id: 'ai-vp-intellectual-property', uid: 'ktx-08-vp-intellectual-property', title: 'AI VP Intellectual Property', route: '/ai-agent/legal/vp-intellectual-property', color: '#3F51B5', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-governance', uid: 'ktx-08-vp-governance', title: 'AI VP Governance', route: '/ai-agent/legal/vp-governance', color: '#3F51B5', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-litigation', uid: 'ktx-08-vp-litigation', title: 'AI VP Litigation', route: '/ai-agent/legal/vp-litigation', color: '#3F51B5', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-corporate-secretary', uid: 'ktx-08-vp-corporate-secretary', title: 'AI VP Corporate Secretary', route: '/ai-agent/legal/vp-corporate-secretary', color: '#3F51B5', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-ethics', uid: 'ktx-08-vp-ethics', title: 'AI VP Ethics', route: '/ai-agent/legal/vp-ethics', color: '#3F51B5', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-compliance-manager', uid: 'ktx-08-compliance-manager', title: 'AI Compliance Manager', route: '/ai-agent/legal/compliance-manager', color: '#3F51B5', level: 'manager', efficiency: '82%' },
  { id: 'ai-contracts-manager', uid: 'ktx-08-contracts-manager', title: 'AI Contracts Manager', route: '/ai-agent/legal/contracts-manager', color: '#3F51B5', level: 'manager', efficiency: '84%' },
  { id: 'ai-ip-manager', uid: 'ktx-08-ip-manager', title: 'AI IP Manager', route: '/ai-agent/legal/ip-manager', color: '#3F51B5', level: 'manager', efficiency: '83%' },
  { id: 'ai-governance-manager', uid: 'ktx-08-governance-manager', title: 'AI Governance Manager', route: '/ai-agent/legal/governance-manager', color: '#3F51B5', level: 'manager', efficiency: '85%' },
  { id: 'ai-litigation-manager', uid: 'ktx-08-litigation-manager', title: 'AI Litigation Manager', route: '/ai-agent/legal/litigation-manager', color: '#3F51B5', level: 'manager', efficiency: '82%' },
  { id: 'ai-legal-researcher', uid: 'ktx-08-legal-researcher', title: 'AI Legal Researcher', route: '/ai-agent/legal/legal-researcher', color: '#3F51B5', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-contract-specialist', uid: 'ktx-08-contract-specialist', title: 'AI Contract Specialist', route: '/ai-agent/legal/contract-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-compliance-analyst', uid: 'ktx-08-compliance-analyst', title: 'AI Compliance Analyst', route: '/ai-agent/legal/compliance-analyst', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-regulatory-specialist', uid: 'ktx-08-regulatory-specialist', title: 'AI Regulatory Specialist', route: '/ai-agent/legal/regulatory-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ip-specialist', uid: 'ktx-08-ip-specialist', title: 'AI IP Specialist', route: '/ai-agent/legal/ip-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-patent-attorney', uid: 'ktx-08-patent-attorney', title: 'AI Patent Attorney', route: '/ai-agent/legal/patent-attorney', color: '#3F51B5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-trademark-specialist', uid: 'ktx-08-trademark-specialist', title: 'AI Trademark Specialist', route: '/ai-agent/legal/trademark-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-copyright-specialist', uid: 'ktx-08-copyright-specialist', title: 'AI Copyright Specialist', route: '/ai-agent/legal/copyright-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-corporate-secretary', uid: 'ktx-08-corporate-secretary', title: 'AI Corporate Secretary', route: '/ai-agent/legal/corporate-secretary', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-board-governance-specialist', uid: 'ktx-08-board-governance-specialist', title: 'AI Board Governance Specialist', route: '/ai-agent/legal/board-governance-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ethics-compliance-officer', uid: 'ktx-08-ethics-compliance-officer', title: 'AI Ethics Compliance Officer', route: '/ai-agent/legal/ethics-compliance-officer', color: '#3F51B5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-privacy-specialist', uid: 'ktx-08-data-privacy-specialist', title: 'AI Data Privacy Specialist', route: '/ai-agent/legal/data-privacy-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-gdpr-specialist', uid: 'ktx-08-gdpr-specialist', title: 'AI GDPR Specialist', route: '/ai-agent/legal/gdpr-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ccpa-specialist', uid: 'ktx-08-ccpa-specialist', title: 'AI CCPA Specialist', route: '/ai-agent/legal/ccpa-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-employment-law-specialist', uid: 'ktx-08-employment-law-specialist', title: 'AI Employment Law Specialist', route: '/ai-agent/legal/employment-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-labor-law-specialist', uid: 'ktx-08-labor-law-specialist', title: 'AI Labor Law Specialist', route: '/ai-agent/legal/labor-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-commercial-law-specialist', uid: 'ktx-08-commercial-law-specialist', title: 'AI Commercial Law Specialist', route: '/ai-agent/legal/commercial-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-international-law-specialist', uid: 'ktx-08-international-law-specialist', title: 'AI International Law Specialist', route: '/ai-agent/legal/international-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-ma-attorney', uid: 'ktx-08-ma-attorney', title: 'AI M&A Attorney', route: '/ai-agent/legal/ma-attorney', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-securities-law-specialist', uid: 'ktx-08-securities-law-specialist', title: 'AI Securities Law Specialist', route: '/ai-agent/legal/securities-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-banking-law-specialist', uid: 'ktx-08-banking-law-specialist', title: 'AI Banking Law Specialist', route: '/ai-agent/legal/banking-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-tax-law-specialist', uid: 'ktx-08-tax-law-specialist', title: 'AI Tax Law Specialist', route: '/ai-agent/legal/tax-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-environmental-law-specialist', uid: 'ktx-08-environmental-law-specialist', title: 'AI Environmental Law Specialist', route: '/ai-agent/legal/environmental-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-healthcare-law-specialist', uid: 'ktx-08-healthcare-law-specialist', title: 'AI Healthcare Law Specialist', route: '/ai-agent/legal/healthcare-law-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-litigation-attorney', uid: 'ktx-08-litigation-attorney', title: 'AI Litigation Attorney', route: '/ai-agent/legal/litigation-attorney', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-dispute-resolution-specialist', uid: 'ktx-08-dispute-resolution-specialist', title: 'AI Dispute Resolution Specialist', route: '/ai-agent/legal/dispute-resolution-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-arbitration-specialist', uid: 'ktx-08-arbitration-specialist', title: 'AI Arbitration Specialist', route: '/ai-agent/legal/arbitration-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-mediation-specialist', uid: 'ktx-08-mediation-specialist', title: 'AI Mediation Specialist', route: '/ai-agent/legal/mediation-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-contract-reviewer', uid: 'ktx-08-contract-reviewer', title: 'AI Contract Reviewer', route: '/ai-agent/legal/contract-reviewer', color: '#3F51B5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-legal-operations-specialist', uid: 'ktx-08-legal-operations-specialist', title: 'AI Legal Operations Specialist', route: '/ai-agent/legal/legal-operations-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-legal-project-manager', uid: 'ktx-08-legal-project-manager', title: 'AI Legal Project Manager', route: '/ai-agent/legal/legal-project-manager', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-e-discovery-specialist', uid: 'ktx-08-e-discovery-specialist', title: 'AI E-Discovery Specialist', route: '/ai-agent/legal/e-discovery-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-legal-technology-specialist', uid: 'ktx-08-legal-technology-specialist', title: 'AI Legal Technology Specialist', route: '/ai-agent/legal/legal-technology-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-document-automation-specialist', uid: 'ktx-08-document-automation-specialist', title: 'AI Document Automation Specialist', route: '/ai-agent/legal/document-automation-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-risk-management-legal', uid: 'ktx-08-risk-management-legal', title: 'AI Risk Management (Legal)', route: '/ai-agent/legal/risk-management-legal', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-policy-drafter', uid: 'ktx-08-policy-drafter', title: 'AI Policy Drafter', route: '/ai-agent/legal/policy-drafter', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-training-compliance-legal', uid: 'ktx-08-training-compliance-legal', title: 'AI Training Compliance (Legal)', route: '/ai-agent/legal/training-compliance-legal', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-audit-support-legal', uid: 'ktx-08-audit-support-legal', title: 'AI Audit Support (Legal)', route: '/ai-agent/legal/audit-support-legal', color: '#3F51B5', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-external-counsel-coordinator', uid: 'ktx-08-external-counsel-coordinator', title: 'AI External Counsel Coordinator', route: '/ai-agent/legal/external-counsel-coordinator', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-filings-specialist', uid: 'ktx-08-filings-specialist', title: 'AI Filings Specialist', route: '/ai-agent/legal/filings-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-licensing-specialist', uid: 'ktx-08-licensing-specialist', title: 'AI Licensing Specialist', route: '/ai-agent/legal/licensing-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-permits-specialist', uid: 'ktx-08-permits-specialist', title: 'AI Permits Specialist', route: '/ai-agent/legal/permits-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-regulatory-affairs-specialist', uid: 'ktx-08-regulatory-affairs-specialist', title: 'AI Regulatory Affairs Specialist', route: '/ai-agent/legal/regulatory-affairs-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-standards-compliance-specialist', uid: 'ktx-08-standards-compliance-specialist', title: 'AI Standards Compliance Specialist', route: '/ai-agent/legal/standards-compliance-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-ethics-helpline', uid: 'ktx-08-ethics-helpline', title: 'AI Ethics Helpline', route: '/ai-agent/legal/ethics-helpline', color: '#3F51B5', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-whistleblower-support', uid: 'ktx-08-whistleblower-support', title: 'AI Whistleblower Support', route: '/ai-agent/legal/whistleblower-support', color: '#3F51B5', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-legal-analytics-specialist', uid: 'ktx-08-legal-analytics-specialist', title: 'AI Legal Analytics Specialist', route: '/ai-agent/legal/legal-analytics-specialist', color: '#3F51B5', level: 'team_lead', efficiency: '84%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Legal & Compliance - AI Agents</Text>
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
