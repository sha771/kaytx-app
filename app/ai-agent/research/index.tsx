import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-vp-research', uid: 'ktx-12-vp-research', title: 'AI VP Research', route: '/ai-agent/research/vp-research', color: '#009688', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-vp-innovation', uid: 'ktx-12-vp-innovation', title: 'AI VP Innovation', route: '/ai-agent/research/vp-innovation', color: '#009688', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-rd-operations', uid: 'ktx-12-vp-rd-operations', title: 'AI VP R&D Operations', route: '/ai-agent/research/vp-rd-operations', color: '#009688', level: 'vp_director', efficiency: '75%' },
  { id: 'ai-vp-rd-technology', uid: 'ktx-12-vp-rd-technology', title: 'AI VP R&D Technology', route: '/ai-agent/research/vp-rd-technology', color: '#009688', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-research-strategy', uid: 'ktx-12-vp-research-strategy', title: 'AI VP Research Strategy', route: '/ai-agent/research/vp-research-strategy', color: '#009688', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-research-partnerships', uid: 'ktx-12-vp-research-partnerships', title: 'AI VP Research Partnerships', route: '/ai-agent/research/vp-research-partnerships', color: '#009688', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-research-funding', uid: 'ktx-12-vp-research-funding', title: 'AI VP Research Funding', route: '/ai-agent/research/vp-research-funding', color: '#009688', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-ip-management', uid: 'ktx-12-vp-ip-management', title: 'AI VP IP Management', route: '/ai-agent/research/vp-ip-management', color: '#009688', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-research-lead', uid: 'ktx-12-research-lead', title: 'AI Research Lead', route: '/ai-agent/research/research-lead', color: '#009688', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-innovation-manager', uid: 'ktx-12-innovation-manager', title: 'AI Innovation Manager', route: '/ai-agent/research/innovation-manager', color: '#009688', level: 'manager', efficiency: '82%' },
  { id: 'ai-rd-manager', uid: 'ktx-12-rd-manager', title: 'AI R&D Manager', route: '/ai-agent/research/rd-manager', color: '#009688', level: 'manager', efficiency: '84%' },
  { id: 'ai-lab-manager', uid: 'ktx-12-lab-manager', title: 'AI Lab Manager', route: '/ai-agent/research/lab-manager', color: '#009688', level: 'manager', efficiency: '86%' },
  { id: 'ai-research-scientist', uid: 'ktx-12-research-scientist', title: 'AI Research Scientist', route: '/ai-agent/research/research-scientist', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-senior-research-scientist', uid: 'ktx-12-senior-research-scientist', title: 'AI Senior Research Scientist', route: '/ai-agent/research/senior-research-scientist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-principal-research-scientist', uid: 'ktx-12-principal-research-scientist', title: 'AI Principal Research Scientist', route: '/ai-agent/research/principal-research-scientist', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-research-engineer', uid: 'ktx-12-research-engineer', title: 'AI Research Engineer', route: '/ai-agent/research/research-engineer', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-rd-engineer', uid: 'ktx-12-rd-engineer', title: 'AI R&D Engineer', route: '/ai-agent/research/rd-engineer', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-prototype-engineer', uid: 'ktx-12-prototype-engineer', title: 'AI Prototype Engineer', route: '/ai-agent/research/prototype-engineer', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-material-scientist', uid: 'ktx-12-material-scientist', title: 'AI Material Scientist', route: '/ai-agent/research/material-scientist', color: '#009688', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-chemistry-researcher', uid: 'ktx-12-chemistry-researcher', title: 'AI Chemistry Researcher', route: '/ai-agent/research/chemistry-researcher', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-physics-researcher', uid: 'ktx-12-physics-researcher', title: 'AI Physics Researcher', route: '/ai-agent/research/physics-researcher', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-biology-researcher', uid: 'ktx-12-biology-researcher', title: 'AI Biology Researcher', route: '/ai-agent/research/biology-researcher', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-scientist-research', uid: 'ktx-12-data-scientist-research', title: 'AI Data Scientist (Research)', route: '/ai-agent/research/data-scientist-research', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-applied-scientist', uid: 'ktx-12-applied-scientist', title: 'AI Applied Scientist', route: '/ai-agent/research/applied-scientist', color: '#009688', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-theoretical-scientist', uid: 'ktx-12-theoretical-scientist', title: 'AI Theoretical Scientist', route: '/ai-agent/research/theoretical-scientist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-experimental-scientist', uid: 'ktx-12-experimental-scientist', title: 'AI Experimental Scientist', route: '/ai-agent/research/experimental-scientist', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-innovation-analyst', uid: 'ktx-12-innovation-analyst', title: 'AI Innovation Analyst', route: '/ai-agent/research/innovation-analyst', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-research-associate', uid: 'ktx-12-research-associate', title: 'AI Research Associate', route: '/ai-agent/research/research-associate', color: '#009688', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-research-assistant', uid: 'ktx-12-research-assistant', title: 'AI Research Assistant', route: '/ai-agent/research/research-assistant', color: '#009688', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-postdoctoral-researcher', uid: 'ktx-12-postdoctoral-researcher', title: 'AI Postdoctoral Researcher', route: '/ai-agent/research/postdoctoral-researcher', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-graduate-researcher', uid: 'ktx-12-graduate-researcher', title: 'AI Graduate Researcher', route: '/ai-agent/research/graduate-researcher', color: '#009688', level: 'team_lead', efficiency: '79%' },
  { id: 'ai-phd-candidate-research', uid: 'ktx-12-phd-candidate-research', title: 'AI PhD Candidate (Research)', route: '/ai-agent/research/phd-candidate-research', color: '#009688', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-research-coordinator', uid: 'ktx-12-research-coordinator', title: 'AI Research Coordinator', route: '/ai-agent/research/research-coordinator', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-lab-technician', uid: 'ktx-12-lab-technician', title: 'AI Lab Technician', route: '/ai-agent/research/lab-technician', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-lab-supervisor', uid: 'ktx-12-lab-supervisor', title: 'AI Lab Supervisor', route: '/ai-agent/research/lab-supervisor', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-equipment-specialist', uid: 'ktx-12-equipment-specialist', title: 'AI Equipment Specialist', route: '/ai-agent/research/equipment-specialist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-safety-officer-research', uid: 'ktx-12-safety-officer-research', title: 'AI Safety Officer (Research)', route: '/ai-agent/research/safety-officer-research', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-quality-control-research', uid: 'ktx-12-quality-control-research', title: 'AI Quality Control (Research)', route: '/ai-agent/research/quality-control-research', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-patent-researcher', uid: 'ktx-12-patent-researcher', title: 'AI Patent Researcher', route: '/ai-agent/research/patent-researcher', color: '#009688', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-patent-specialist-research', uid: 'ktx-12-patent-specialist-research', title: 'AI Patent Specialist (Research)', route: '/ai-agent/research/patent-specialist-research', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-ip-strategist-research', uid: 'ktx-12-ip-strategist-research', title: 'AI IP Strategist (Research)', route: '/ai-agent/research/ip-strategist-research', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-technology-transfer-specialist', uid: 'ktx-12-technology-transfer-specialist', title: 'AI Technology Transfer Specialist', route: '/ai-agent/research/technology-transfer-specialist', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-licensing-specialist-research', uid: 'ktx-12-licensing-specialist-research', title: 'AI Licensing Specialist (Research)', route: '/ai-agent/research/licensing-specialist-research', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-research-grant-writer', uid: 'ktx-12-research-grant-writer', title: 'AI Research Grant Writer', route: '/ai-agent/research/research-grant-writer', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-research-fundraiser', uid: 'ktx-12-research-fundraiser', title: 'AI Research Fundraiser', route: '/ai-agent/research/research-fundraiser', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-research-communicator', uid: 'ktx-12-research-communicator', title: 'AI Research Communicator', route: '/ai-agent/research/research-communicator', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-scientific-writer', uid: 'ktx-12-scientific-writer', title: 'AI Scientific Writer', route: '/ai-agent/research/scientific-writer', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-publication-specialist', uid: 'ktx-12-publication-specialist', title: 'AI Publication Specialist', route: '/ai-agent/research/publication-specialist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-peer-reviewer', uid: 'ktx-12-peer-reviewer', title: 'AI Peer Reviewer', route: '/ai-agent/research/peer-reviewer', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-conference-organizer', uid: 'ktx-12-conference-organizer', title: 'AI Conference Organizer', route: '/ai-agent/research/conference-organizer', color: '#009688', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-research-collaboration-manager', uid: 'ktx-12-research-collaboration-manager', title: 'AI Research Collaboration Manager', route: '/ai-agent/research/research-collaboration-manager', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-university-liaison', uid: 'ktx-12-university-liaison', title: 'AI University Liaison', route: '/ai-agent/research/university-liaison', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-industry-partner-liaison', uid: 'ktx-12-industry-partner-liaison', title: 'AI Industry Partner Liaison', route: '/ai-agent/research/industry-partner-liaison', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-research-data-manager', uid: 'ktx-12-research-data-manager', title: 'AI Research Data Manager', route: '/ai-agent/research/research-data-manager', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-research-statistician', uid: 'ktx-12-research-statistician', title: 'AI Research Statistician', route: '/ai-agent/research/research-statistician', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-computational-scientist', uid: 'ktx-12-computational-scientist', title: 'AI Computational Scientist', route: '/ai-agent/research/computational-scientist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-simulation-specialist', uid: 'ktx-12-simulation-specialist', title: 'AI Simulation Specialist', route: '/ai-agent/research/simulation-specialist', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-modeling-specialist', uid: 'ktx-12-modeling-specialist', title: 'AI Modeling Specialist', route: '/ai-agent/research/modeling-specialist', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-bioinformatics-specialist', uid: 'ktx-12-bioinformatics-specialist', title: 'AI Bioinformatics Specialist', route: '/ai-agent/research/bioinformatics-specialist', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-cheminformatics-specialist', uid: 'ktx-12-cheminformatics-specialist', title: 'AI Cheminformatics Specialist', route: '/ai-agent/research/cheminformatics-specialist', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-clinical-researcher', uid: 'ktx-12-clinical-researcher', title: 'AI Clinical Researcher', route: '/ai-agent/research/clinical-researcher', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-preclinical-researcher', uid: 'ktx-12-preclinical-researcher', title: 'AI Preclinical Researcher', route: '/ai-agent/research/preclinical-researcher', color: '#009688', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-regulatory-affairs-research', uid: 'ktx-12-regulatory-affairs-research', title: 'AI Regulatory Affairs (Research)', route: '/ai-agent/research/regulatory-affairs-research', color: '#009688', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-research-ethics-specialist', uid: 'ktx-12-research-ethics-specialist', title: 'AI Research Ethics Specialist', route: '/ai-agent/research/research-ethics-specialist', color: '#009688', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-irb-coordinator', uid: 'ktx-12-irb-coordinator', title: 'AI IRB Coordinator', route: '/ai-agent/research/irb-coordinator', color: '#009688', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-animal-care-specialist', uid: 'ktx-12-animal-care-specialist', title: 'AI Animal Care Specialist', route: '/ai-agent/research/animal-care-specialist', color: '#009688', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-biosafety-officer', uid: 'ktx-12-biosafety-officer', title: 'AI Biosafety Officer', route: '/ai-agent/research/biosafety-officer', color: '#009688', level: 'team_lead', efficiency: '84%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Research & Development - AI Agents</Text>
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
