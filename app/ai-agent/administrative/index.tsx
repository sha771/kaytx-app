import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-administrative-officer', uid: 'ktx-13-chief-administrative-officer', title: 'AI Chief Administrative Officer', route: '/ai-agent/administrative/chief-administrative-officer', color: '#795548', level: 'c_level', efficiency: '92%' },
  { id: 'ai-vp-admin-operations', uid: 'ktx-13-vp-admin-operations', title: 'AI VP Admin Operations', route: '/ai-agent/administrative/vp-admin-operations', color: '#795548', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-facilities', uid: 'ktx-13-vp-facilities', title: 'AI VP Facilities', route: '/ai-agent/administrative/vp-facilities', color: '#795548', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-office-services', uid: 'ktx-13-vp-office-services', title: 'AI VP Office Services', route: '/ai-agent/administrative/vp-office-services', color: '#795548', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-reception', uid: 'ktx-13-vp-reception', title: 'AI VP Reception', route: '/ai-agent/administrative/vp-reception', color: '#795548', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-records-management', uid: 'ktx-13-vp-records-management', title: 'AI VP Records Management', route: '/ai-agent/administrative/vp-records-management', color: '#795548', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-support-services', uid: 'ktx-13-vp-support-services', title: 'AI VP Support Services', route: '/ai-agent/administrative/vp-support-services', color: '#795548', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-catering', uid: 'ktx-13-vp-catering', title: 'AI VP Catering', route: '/ai-agent/administrative/vp-catering', color: '#795548', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-admin-manager', uid: 'ktx-13-admin-manager', title: 'AI Admin Manager', route: '/ai-agent/administrative/admin-manager', color: '#795548', level: 'manager', efficiency: '87%' },
  { id: 'ai-office-manager', uid: 'ktx-13-office-manager', title: 'AI Office Manager', route: '/ai-agent/administrative/office-manager', color: '#795548', level: 'manager', efficiency: '94%' },
  { id: 'ai-facilities-manager', uid: 'ktx-13-facilities-manager', title: 'AI Facilities Manager', route: '/ai-agent/administrative/facilities-manager', color: '#795548', level: 'manager', efficiency: '88%' },
  { id: 'ai-reception-manager', uid: 'ktx-13-reception-manager', title: 'AI Reception Manager', route: '/ai-agent/administrative/reception-manager', color: '#795548', level: 'manager', efficiency: '85%' },
  { id: 'ai-records-manager', uid: 'ktx-13-records-manager', title: 'AI Records Manager', route: '/ai-agent/administrative/records-manager', color: '#795548', level: 'manager', efficiency: '86%' },
  { id: 'ai-catering-manager', uid: 'ktx-13-catering-manager', title: 'AI Catering Manager', route: '/ai-agent/administrative/catering-manager', color: '#795548', level: 'manager', efficiency: '84%' },
  { id: 'ai-executive-assistant', uid: 'ktx-13-executive-assistant', title: 'AI Executive Assistant', route: '/ai-agent/administrative/executive-assistant', color: '#795548', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-senior-executive-assistant', uid: 'ktx-13-senior-executive-assistant', title: 'AI Senior Executive Assistant', route: '/ai-agent/administrative/senior-executive-assistant', color: '#795548', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-administrative-assistant', uid: 'ktx-13-administrative-assistant', title: 'AI Administrative Assistant', route: '/ai-agent/administrative/administrative-assistant', color: '#795548', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-office-assistant', uid: 'ktx-13-office-assistant', title: 'AI Office Assistant', route: '/ai-agent/administrative/office-assistant', color: '#795548', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-receptionist', uid: 'ktx-13-receptionist', title: 'AI Receptionist', route: '/ai-agent/administrative/receptionist', color: '#795548', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-front-desk-coordinator', uid: 'ktx-13-front-desk-coordinator', title: 'AI Front Desk Coordinator', route: '/ai-agent/administrative/front-desk-coordinator', color: '#795548', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-facilities-coordinator', uid: 'ktx-13-facilities-coordinator', title: 'AI Facilities Coordinator', route: '/ai-agent/administrative/facilities-coordinator', color: '#795548', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-maintenance-coordinator', uid: 'ktx-13-maintenance-coordinator', title: 'AI Maintenance Coordinator', route: '/ai-agent/administrative/maintenance-coordinator', color: '#795548', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-travel-coordinator', uid: 'ktx-13-travel-coordinator', title: 'AI Travel Coordinator', route: '/ai-agent/administrative/travel-coordinator', color: '#795548', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-travel-agent', uid: 'ktx-13-travel-agent', title: 'AI Travel Agent', route: '/ai-agent/administrative/travel-agent', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-expense-manager', uid: 'ktx-13-expense-manager', title: 'AI Expense Manager', route: '/ai-agent/administrative/expense-manager', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-document-controller', uid: 'ktx-13-document-controller', title: 'AI Document Controller', route: '/ai-agent/administrative/document-controller', color: '#795548', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-records-specialist', uid: 'ktx-13-records-specialist', title: 'AI Records Specialist', route: '/ai-agent/administrative/records-specialist', color: '#795548', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-archivist', uid: 'ktx-13-archivist', title: 'AI Archivist', route: '/ai-agent/administrative/archivist', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-file-clerk', uid: 'ktx-13-file-clerk', title: 'AI File Clerk', route: '/ai-agent/administrative/file-clerk', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-mail-room-clerk', uid: 'ktx-13-mail-room-clerk', title: 'AI Mail Room Clerk', route: '/ai-agent/administrative/mail-room-clerk', color: '#795548', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-courier', uid: 'ktx-13-courier', title: 'AI Courier', route: '/ai-agent/administrative/courier', color: '#795548', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-cleaning-supervisor', uid: 'ktx-13-cleaning-supervisor', title: 'AI Cleaning Supervisor', route: '/ai-agent/administrative/cleaning-supervisor', color: '#795548', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-janitor', uid: 'ktx-13-janitor', title: 'AI Janitor', route: '/ai-agent/administrative/janitor', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-custodian', uid: 'ktx-13-custodian', title: 'AI Custodian', route: '/ai-agent/administrative/custodian', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-groundskeeper', uid: 'ktx-13-groundskeeper', title: 'AI Groundskeeper', route: '/ai-agent/administrative/groundskeeper', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-building-maintenance', uid: 'ktx-13-building-maintenance', title: 'AI Building Maintenance', route: '/ai-agent/administrative/building-maintenance', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-hvac-specialist', uid: 'ktx-13-hvac-specialist', title: 'AI HVAC Specialist', route: '/ai-agent/administrative/hvac-specialist', color: '#795548', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-electrical-specialist', uid: 'ktx-13-electrical-specialist', title: 'AI Electrical Specialist', route: '/ai-agent/administrative/electrical-specialist', color: '#795548', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-plumbing-specialist', uid: 'ktx-13-plumbing-specialist', title: 'AI Plumbing Specialist', route: '/ai-agent/administrative/plumbing-specialist', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-carpenter', uid: 'ktx-13-carpenter', title: 'AI Carpenter', route: '/ai-agent/administrative/carpenter', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-painter', uid: 'ktx-13-painter', title: 'AI Painter', route: '/ai-agent/administrative/painter', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-landscaper', uid: 'ktx-13-landscaper', title: 'AI Landscaper', route: '/ai-agent/administrative/landscaper', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-security-guard', uid: 'ktx-13-security-guard', title: 'AI Security Guard', route: '/ai-agent/administrative/security-guard', color: '#795548', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-reception-security', uid: 'ktx-13-reception-security', title: 'AI Reception Security', route: '/ai-agent/administrative/reception-security', color: '#795548', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-parking-attendant', uid: 'ktx-13-parking-attendant', title: 'AI Parking Attendant', route: '/ai-agent/administrative/parking-attendant', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-valet', uid: 'ktx-13-valet', title: 'AI Valet', route: '/ai-agent/administrative/valet', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-concierge', uid: 'ktx-13-concierge', title: 'AI Concierge', route: '/ai-agent/administrative/concierge', color: '#795548', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-catering-coordinator', uid: 'ktx-13-catering-coordinator', title: 'AI Catering Coordinator', route: '/ai-agent/administrative/catering-coordinator', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-food-service-worker', uid: 'ktx-13-food-service-worker', title: 'AI Food Service Worker', route: '/ai-agent/administrative/food-service-worker', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-bartender', uid: 'ktx-13-bartender', title: 'AI Bartender', route: '/ai-agent/administrative/bartender', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-waitstaff', uid: 'ktx-13-waitstaff', title: 'AI Waitstaff', route: '/ai-agent/administrative/waitstaff', color: '#795548', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-kitchen-staff', uid: 'ktx-13-kitchen-staff', title: 'AI Kitchen Staff', route: '/ai-agent/administrative/kitchen-staff', color: '#795548', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-chef-administrative', uid: 'ktx-13-chef-administrative', title: 'AI Chef (Administrative)', route: '/ai-agent/administrative/chef-administrative', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-sous-chef', uid: 'ktx-13-sous-chef', title: 'AI Sous Chef', route: '/ai-agent/administrative/sous-chef', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-baker', uid: 'ktx-13-baker', title: 'AI Baker', route: '/ai-agent/administrative/baker', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-event-coordinator', uid: 'ktx-13-event-coordinator', title: 'AI Event Coordinator', route: '/ai-agent/administrative/event-coordinator', color: '#795548', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-conference-room-attendant', uid: 'ktx-13-conference-room-attendant', title: 'AI Conference Room Attendant', route: '/ai-agent/administrative/conference-room-attendant', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-meeting-room-assistant', uid: 'ktx-13-meeting-room-assistant', title: 'AI Meeting Room Assistant', route: '/ai-agent/administrative/meeting-room-assistant', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-inventory-clerk', uid: 'ktx-13-inventory-clerk', title: 'AI Inventory Clerk', route: '/ai-agent/administrative/inventory-clerk', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-supplies-coordinator', uid: 'ktx-13-supplies-coordinator', title: 'AI Supplies Coordinator', route: '/ai-agent/administrative/supplies-coordinator', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-vendor-coordinator', uid: 'ktx-13-vendor-coordinator', title: 'AI Vendor Coordinator', route: '/ai-agent/administrative/vendor-coordinator', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-procurement-administrative', uid: 'ktx-13-procurement-administrative', title: 'AI Procurement (Administrative)', route: '/ai-agent/administrative/procurement-administrative', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-office-supplies-manager', uid: 'ktx-13-office-supplies-manager', title: 'AI Office Supplies Manager', route: '/ai-agent/administrative/office-supplies-manager', color: '#795548', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-equipment-specialist', uid: 'ktx-13-equipment-specialist', title: 'AI Equipment Specialist', route: '/ai-agent/administrative/equipment-specialist', color: '#795548', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-furniture-specialist', uid: 'ktx-13-furniture-specialist', title: 'AI Furniture Specialist', route: '/ai-agent/administrative/furniture-specialist', color: '#795548', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-space-planner', uid: 'ktx-13-space-planner', title: 'AI Space Planner', route: '/ai-agent/administrative/space-planner', color: '#795548', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-lease-administrator', uid: 'ktx-13-lease-administrator', title: 'AI Lease Administrator', route: '/ai-agent/administrative/lease-administrator', color: '#795548', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-property-administrator', uid: 'ktx-13-property-administrator', title: 'AI Property Administrator', route: '/ai-agent/administrative/property-administrator', color: '#795548', level: 'team_lead', efficiency: '83%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Administrative - AI Agents</Text>
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
