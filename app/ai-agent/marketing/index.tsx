import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-marketing-officer', uid: 'ktx-03-chief-marketing-officer', title: 'AI Chief Marketing Officer', route: '/ai-agent/marketing/chief-marketing-officer', color: '#E91E63', level: 'c_level', efficiency: '77%' },
  { id: 'ai-vp-marketing', uid: 'ktx-03-vp-marketing', title: 'AI VP Marketing', route: '/ai-agent/marketing/vp-marketing', color: '#E91E63', level: 'vp_director', efficiency: '80%' },
  { id: 'ai-vp-brand', uid: 'ktx-03-vp-brand', title: 'AI VP Brand', route: '/ai-agent/marketing/vp-brand', color: '#E91E63', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-vp-growth', uid: 'ktx-03-vp-growth', title: 'AI VP Growth', route: '/ai-agent/marketing/vp-growth', color: '#E91E63', level: 'vp_director', efficiency: '79%' },
  { id: 'ai-vp-content', uid: 'ktx-03-vp-content', title: 'AI VP Content', route: '/ai-agent/marketing/vp-content', color: '#E91E63', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-digital', uid: 'ktx-03-vp-digital', title: 'AI VP Digital', route: '/ai-agent/marketing/vp-digital', color: '#E91E63', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-marketing-manager', uid: 'ktx-03-marketing-manager', title: 'AI Marketing Manager', route: '/ai-agent/marketing/marketing-manager', color: '#E91E63', level: 'manager', efficiency: '75%' },
  { id: 'ai-content-marketing-agent', uid: 'ktx-03-content-marketing-agent', title: 'AI Content Marketing Agent', route: '/ai-agent/marketing/content-marketing-agent', color: '#E91E63', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-seo-specialist', uid: 'ktx-03-seo-specialist', title: 'AI SEO Specialist', route: '/ai-agent/marketing/seo-specialist', color: '#E91E63', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-social-media-manager', uid: 'ktx-03-social-media-manager', title: 'AI Social Media Manager', route: '/ai-agent/marketing/social-media-manager', color: '#E91E63', level: 'manager', efficiency: '76%' },
  { id: 'ai-email-marketing-agent', uid: 'ktx-03-email-marketing-agent', title: 'AI Email Marketing Agent', route: '/ai-agent/marketing/email-marketing-agent', color: '#E91E63', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-ad-campaign-manager', uid: 'ktx-03-ad-campaign-manager', title: 'AI Ad Campaign Manager', route: '/ai-agent/marketing/ad-campaign-manager', color: '#E91E63', level: 'manager', efficiency: '89%' },
  { id: 'ai-marketing-analytics-agent', uid: 'ktx-03-marketing-analytics-agent', title: 'AI Marketing Analytics Agent', route: '/ai-agent/marketing/marketing-analytics-agent', color: '#E91E63', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-brand-manager', uid: 'ktx-03-brand-manager', title: 'AI Brand Manager', route: '/ai-agent/marketing/brand-manager', color: '#E91E63', level: 'manager', efficiency: '87%' },
  { id: 'ai-growth-hacker', uid: 'ktx-03-growth-hacker', title: 'AI Growth Hacker', route: '/ai-agent/marketing/growth-hacker', color: '#E91E63', level: 'team_lead', efficiency: '87%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Marketing & Growth - AI Agents</Text>
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
