import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-customer-officer', uid: 'ktx-01-chief-customer-officer', title: 'AI Chief Customer Officer', route: '/ai-agent/customer-experience/chief-customer-officer', color: '#00BCD4', level: 'c_level', efficiency: '90%' },
  { id: 'ai-vp-customer-success', uid: 'ktx-01-vp-customer-success', title: 'AI VP Customer Success', route: '/ai-agent/customer-experience/vp-customer-success', color: '#00BCD4', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-support', uid: 'ktx-01-vp-support', title: 'AI VP Support', route: '/ai-agent/customer-experience/vp-support', color: '#00BCD4', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-experience', uid: 'ktx-01-vp-experience', title: 'AI VP Experience', route: '/ai-agent/customer-experience/vp-experience', color: '#00BCD4', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-retention', uid: 'ktx-01-vp-retention', title: 'AI VP Retention', route: '/ai-agent/customer-experience/vp-retention', color: '#00BCD4', level: 'vp_director', efficiency: '80%' },
  { id: 'ai-vp-loyalty', uid: 'ktx-01-vp-loyalty', title: 'AI VP Loyalty', route: '/ai-agent/customer-experience/vp-loyalty', color: '#00BCD4', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-customer-insights', uid: 'ktx-01-vp-customer-insights', title: 'AI VP Customer Insights', route: '/ai-agent/customer-experience/vp-customer-insights', color: '#00BCD4', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-customer-service', uid: 'ktx-01-vp-customer-service', title: 'AI VP Customer Service', route: '/ai-agent/customer-experience/vp-customer-service', color: '#00BCD4', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-customer-experience-operations', uid: 'ktx-01-vp-customer-experience-operations', title: 'AI VP Customer Experience Operations', route: '/ai-agent/customer-experience/vp-customer-experience-operations', color: '#00BCD4', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-voice-of-customer', uid: 'ktx-01-vp-voice-of-customer', title: 'AI VP Voice of Customer', route: '/ai-agent/customer-experience/vp-voice-of-customer', color: '#00BCD4', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-customer-success-manager', uid: 'ktx-01-customer-success-manager', title: 'AI Customer Success Manager', route: '/ai-agent/customer-experience/customer-success-manager', color: '#00BCD4', level: 'manager', efficiency: '88%' },
  { id: 'ai-support-manager', uid: 'ktx-01-support-manager', title: 'AI Support Manager', route: '/ai-agent/customer-experience/support-manager', color: '#00BCD4', level: 'manager', efficiency: '85%' },
  { id: 'ai-experience-manager', uid: 'ktx-01-experience-manager', title: 'AI Experience Manager', route: '/ai-agent/customer-experience/experience-manager', color: '#00BCD4', level: 'manager', efficiency: '86%' },
  { id: 'ai-retention-manager', uid: 'ktx-01-retention-manager', title: 'AI Retention Manager', route: '/ai-agent/customer-experience/retention-manager', color: '#00BCD4', level: 'manager', efficiency: '81%' },
  { id: 'ai-loyalty-manager', uid: 'ktx-01-loyalty-manager', title: 'AI Loyalty Manager', route: '/ai-agent/customer-experience/loyalty-manager', color: '#00BCD4', level: 'manager', efficiency: '84%' },
  { id: 'ai-customer-insights-manager', uid: 'ktx-01-customer-insights-manager', title: 'AI Customer Insights Manager', route: '/ai-agent/customer-experience/customer-insights-manager', color: '#00BCD4', level: 'manager', efficiency: '84%' },
  { id: 'ai-receptionist', uid: 'ktx-01-receptionist', title: 'AI Receptionist', route: '/ai-agent/customer-experience/receptionist', color: '#00BCD4', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-customer-support-agent', uid: 'ktx-01-customer-support-agent', title: 'AI Customer Support Agent', route: '/ai-agent/customer-experience/customer-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-technical-support-agent', uid: 'ktx-01-technical-support-agent', title: 'AI Technical Support Agent', route: '/ai-agent/customer-experience/technical-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-billing-support-agent', uid: 'ktx-01-billing-support-agent', title: 'AI Billing Support Agent', route: '/ai-agent/customer-experience/billing-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-product-support-agent', uid: 'ktx-01-product-support-agent', title: 'AI Product Support Agent', route: '/ai-agent/customer-experience/product-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-pre-sales-support-agent', uid: 'ktx-01-pre-sales-support-agent', title: 'AI Pre-Sales Support Agent', route: '/ai-agent/customer-experience/pre-sales-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-ticket-resolution-agent', uid: 'ktx-01-ticket-resolution-agent', title: 'AI Ticket Resolution Agent', route: '/ai-agent/customer-experience/ticket-resolution-agent', color: '#00BCD4', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-escalation-specialist', uid: 'ktx-01-escalation-specialist', title: 'AI Escalation Specialist', route: '/ai-agent/customer-experience/escalation-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-complaint-handling-agent', uid: 'ktx-01-complaint-handling-agent', title: 'AI Complaint Handling Agent', route: '/ai-agent/customer-experience/complaint-handling-agent', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-crisis-management-specialist', uid: 'ktx-01-crisis-management-specialist', title: 'AI Crisis Management Specialist', route: '/ai-agent/customer-experience/crisis-management-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-customer-service-lead', uid: 'ktx-01-customer-service-lead', title: 'AI Customer Service Lead', route: '/ai-agent/customer-experience/customer-service-lead', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-retention-specialist', uid: 'ktx-01-retention-specialist', title: 'AI Retention Specialist', route: '/ai-agent/customer-experience/retention-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-churn-prevention-specialist', uid: 'ktx-01-churn-prevention-specialist', title: 'AI Churn Prevention Specialist', route: '/ai-agent/customer-experience/churn-prevention-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-win-back-specialist', uid: 'ktx-01-win-back-specialist', title: 'AI Win-Back Specialist', route: '/ai-agent/customer-experience/win-back-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-customer-lifecycle-manager', uid: 'ktx-01-customer-lifecycle-manager', title: 'AI Customer Lifecycle Manager', route: '/ai-agent/customer-experience/customer-lifecycle-manager', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-onboarding-specialist', uid: 'ktx-01-onboarding-specialist', title: 'AI Onboarding Specialist', route: '/ai-agent/customer-experience/onboarding-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-loyalty-engagement-agent', uid: 'ktx-01-loyalty-engagement-agent', title: 'AI Loyalty & Engagement Agent', route: '/ai-agent/customer-experience/loyalty-engagement-agent', color: '#00BCD4', level: 'team_lead', efficiency: '78%' },
  { id: 'ai-rewards-program-specialist', uid: 'ktx-01-rewards-program-specialist', title: 'AI Rewards Program Specialist', route: '/ai-agent/customer-experience/rewards-program-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-loyalty-analyst', uid: 'ktx-01-loyalty-analyst', title: 'AI Loyalty Analyst', route: '/ai-agent/customer-experience/loyalty-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-membership-manager', uid: 'ktx-01-membership-manager', title: 'AI Membership Manager', route: '/ai-agent/customer-experience/membership-manager', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-feedback-survey-agent', uid: 'ktx-01-feedback-survey-agent', title: 'AI Feedback & Survey Agent', route: '/ai-agent/customer-experience/feedback-survey-agent', color: '#00BCD4', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-nps-specialist', uid: 'ktx-01-nps-specialist', title: 'AI NPS Specialist', route: '/ai-agent/customer-experience/nps-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-customer-satisfaction-analyst', uid: 'ktx-01-customer-satisfaction-analyst', title: 'AI Customer Satisfaction Analyst', route: '/ai-agent/customer-experience/customer-satisfaction-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-sentiment-analysis-specialist', uid: 'ktx-01-sentiment-analysis-specialist', title: 'AI Sentiment Analysis Specialist', route: '/ai-agent/customer-experience/sentiment-analysis-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-experience-designer', uid: 'ktx-01-experience-designer', title: 'AI Experience Designer', route: '/ai-agent/customer-experience/experience-designer', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-journey-mapper', uid: 'ktx-01-journey-mapper', title: 'AI Journey Mapper', route: '/ai-agent/customer-experience/journey-mapper', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-touchpoint-optimizer', uid: 'ktx-01-touchpoint-optimizer', title: 'AI Touchpoint Optimizer', route: '/ai-agent/customer-experience/touchpoint-optimizer', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-customer-segmentation-specialist', uid: 'ktx-01-customer-segmentation-specialist', title: 'AI Customer Segmentation Specialist', route: '/ai-agent/customer-experience/customer-segmentation-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-personalization-specialist', uid: 'ktx-01-personalization-specialist', title: 'AI Personalization Specialist', route: '/ai-agent/customer-experience/personalization-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-customer-data-analyst', uid: 'ktx-01-customer-data-analyst', title: 'AI Customer Data Analyst', route: '/ai-agent/customer-experience/customer-data-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-behavioral-analyst', uid: 'ktx-01-behavioral-analyst', title: 'AI Behavioral Analyst', route: '/ai-agent/customer-experience/behavioral-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-voice-of-customer-analyst', uid: 'ktx-01-voice-of-customer-analyst', title: 'AI Voice of Customer Analyst', route: '/ai-agent/customer-experience/voice-of-customer-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-quality-assurance-specialist', uid: 'ktx-01-quality-assurance-specialist', title: 'AI Quality Assurance Specialist', route: '/ai-agent/customer-experience/quality-assurance-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-support-training-specialist', uid: 'ktx-01-support-training-specialist', title: 'AI Support Training Specialist', route: '/ai-agent/customer-experience/support-training-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-knowledge-base-manager', uid: 'ktx-01-knowledge-base-manager', title: 'AI Knowledge Base Manager', route: '/ai-agent/customer-experience/knowledge-base-manager', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-chatbot-trainer', uid: 'ktx-01-chatbot-trainer', title: 'AI Chatbot Trainer', route: '/ai-agent/customer-experience/chatbot-trainer', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-social-media-support-agent', uid: 'ktx-01-social-media-support-agent', title: 'AI Social Media Support Agent', route: '/ai-agent/customer-experience/social-media-support-agent', color: '#00BCD4', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-community-manager', uid: 'ktx-01-community-manager', title: 'AI Community Manager', route: '/ai-agent/customer-experience/community-manager', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-forum-moderator', uid: 'ktx-01-forum-moderator', title: 'AI Forum Moderator', route: '/ai-agent/customer-experience/forum-moderator', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-user-generated-content-moderator', uid: 'ktx-01-user-generated-content-moderator', title: 'AI User Generated Content Moderator', route: '/ai-agent/customer-experience/user-generated-content-moderator', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-customer-advocate', uid: 'ktx-01-customer-advocate', title: 'AI Customer Advocate', route: '/ai-agent/customer-experience/customer-advocate', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-customer-education-specialist', uid: 'ktx-01-customer-education-specialist', title: 'AI Customer Education Specialist', route: '/ai-agent/customer-experience/customer-education-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-help-desk-coordinator', uid: 'ktx-01-help-desk-coordinator', title: 'AI Help Desk Coordinator', route: '/ai-agent/customer-experience/help-desk-coordinator', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-service-level-agreement-monitor', uid: 'ktx-01-service-level-agreement-monitor', title: 'AI Service Level Agreement Monitor', route: '/ai-agent/customer-experience/service-level-agreement-monitor', color: '#00BCD4', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-continuous-improvement-specialist', uid: 'ktx-01-continuous-improvement-specialist', title: 'AI Continuous Improvement Specialist', route: '/ai-agent/customer-experience/continuous-improvement-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-customer-experience-innovator', uid: 'ktx-01-customer-experience-innovator', title: 'AI Customer Experience Innovator', route: '/ai-agent/customer-experience/customer-experience-innovator', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Customer Experience - AI Agents</Text>
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
