import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-production-officer', uid: 'ktx-18-chief-production-officer', title: 'AI Chief Production Officer', route: '/ai-agent/manufacturing/chief-production-officer', color: '#5C6BC0', level: 'c_level', efficiency: '84%' },
  { id: 'ai-vp-manufacturing', uid: 'ktx-18-vp-manufacturing', title: 'AI VP Manufacturing', route: '/ai-agent/manufacturing/vp-manufacturing', color: '#5C6BC0', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-quality-assurance', uid: 'ktx-18-vp-quality-assurance', title: 'AI VP Quality Assurance', route: '/ai-agent/manufacturing/vp-quality-assurance', color: '#5C6BC0', level: 'vp_director', efficiency: '76%' },
  { id: 'ai-vp-operations', uid: 'ktx-18-vp-operations', title: 'AI VP Operations', route: '/ai-agent/manufacturing/vp-operations', color: '#5C6BC0', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-maintenance', uid: 'ktx-18-vp-maintenance', title: 'AI VP Maintenance', route: '/ai-agent/manufacturing/vp-maintenance', color: '#5C6BC0', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-supply-chain', uid: 'ktx-18-vp-supply-chain', title: 'AI VP Supply Chain', route: '/ai-agent/manufacturing/vp-supply-chain', color: '#5C6BC0', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-continuous-improvement', uid: 'ktx-18-vp-continuous-improvement', title: 'AI VP Continuous Improvement', route: '/ai-agent/manufacturing/vp-continuous-improvement', color: '#5C6BC0', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-safety', uid: 'ktx-18-vp-safety', title: 'AI VP Safety', route: '/ai-agent/manufacturing/vp-safety', color: '#5C6BC0', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-engineering', uid: 'ktx-18-vp-engineering', title: 'AI VP Engineering', route: '/ai-agent/manufacturing/vp-engineering', color: '#5C6BC0', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-planning', uid: 'ktx-18-vp-planning', title: 'AI VP Planning', route: '/ai-agent/manufacturing/vp-planning', color: '#5C6BC0', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-production-manager', uid: 'ktx-18-production-manager', title: 'AI Production Manager', route: '/ai-agent/manufacturing/production-manager', color: '#5C6BC0', level: 'manager', efficiency: '82%' },
  { id: 'ai-quality-manager', uid: 'ktx-18-quality-manager', title: 'AI Quality Manager', route: '/ai-agent/manufacturing/quality-manager', color: '#5C6BC0', level: 'manager', efficiency: '81%' },
  { id: 'ai-safety-manager', uid: 'ktx-18-safety-manager', title: 'AI Safety Manager', route: '/ai-agent/manufacturing/safety-manager', color: '#5C6BC0', level: 'manager', efficiency: '94%' },
  { id: 'ai-maintenance-manager', uid: 'ktx-18-maintenance-manager', title: 'AI Maintenance Manager', route: '/ai-agent/manufacturing/maintenance-manager', color: '#5C6BC0', level: 'manager', efficiency: '87%' },
  { id: 'ai-supply-chain-manager', uid: 'ktx-18-supply-chain-manager', title: 'AI Supply Chain Manager', route: '/ai-agent/manufacturing/supply-chain-manager', color: '#5C6BC0', level: 'manager', efficiency: '85%' },
  { id: 'ai-planning-manager', uid: 'ktx-18-planning-manager', title: 'AI Planning Manager', route: '/ai-agent/manufacturing/planning-manager', color: '#5C6BC0', level: 'manager', efficiency: '84%' },
  { id: 'ai-production-planner', uid: 'ktx-18-production-planner', title: 'AI Production Planner', route: '/ai-agent/manufacturing/production-planner', color: '#5C6BC0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-quality-inspector', uid: 'ktx-18-quality-inspector', title: 'AI Quality Inspector', route: '/ai-agent/manufacturing/quality-inspector', color: '#5C6BC0', level: 'c_level', efficiency: '75%' },
  { id: 'ai-supply-chain-coordinator', uid: 'ktx-18-supply-chain-coordinator', title: 'AI Supply Chain Coordinator', route: '/ai-agent/manufacturing/supply-chain-coordinator', color: '#5C6BC0', level: 'c_level', efficiency: '84%' },
  { id: 'ai-maintenance-technician', uid: 'ktx-18-maintenance-technician', title: 'AI Maintenance Technician', route: '/ai-agent/manufacturing/maintenance-technician', color: '#5C6BC0', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-inventory-controller', uid: 'ktx-18-inventory-controller', title: 'AI Inventory Controller', route: '/ai-agent/manufacturing/inventory-controller', color: '#5C6BC0', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-lean-specialist', uid: 'ktx-18-lean-specialist', title: 'AI Lean Specialist', route: '/ai-agent/manufacturing/lean-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-safety-inspector', uid: 'ktx-18-safety-inspector', title: 'AI Safety Inspector', route: '/ai-agent/manufacturing/safety-inspector', color: '#5C6BC0', level: 'c_level', efficiency: '88%' },
  { id: 'ai-logistics-coordinator', uid: 'ktx-18-logistics-coordinator', title: 'AI Logistics Coordinator', route: '/ai-agent/manufacturing/logistics-coordinator', color: '#5C6BC0', level: 'c_level', efficiency: '83%' },
  { id: 'ai-production-supervisor', uid: 'ktx-18-production-supervisor', title: 'AI Production Supervisor', route: '/ai-agent/manufacturing/production-supervisor', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-assembly-line-supervisor', uid: 'ktx-18-assembly-line-supervisor', title: 'AI Assembly Line Supervisor', route: '/ai-agent/manufacturing/assembly-line-supervisor', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-machine-operator', uid: 'ktx-18-machine-operator', title: 'AI Machine Operator', route: '/ai-agent/manufacturing/machine-operator', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-cnc-operator', uid: 'ktx-18-cnc-operator', title: 'AI CNC Operator', route: '/ai-agent/manufacturing/cnc-operator', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-welder', uid: 'ktx-18-welder', title: 'AI Welder', route: '/ai-agent/manufacturing/welder', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-fabricator', uid: 'ktx-18-fabricator', title: 'AI Fabricator', route: '/ai-agent/manufacturing/fabricator', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-quality-control-analyst', uid: 'ktx-18-quality-control-analyst', title: 'AI Quality Control Analyst', route: '/ai-agent/manufacturing/quality-control-analyst', color: '#5C6BC0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-testing-technician', uid: 'ktx-18-testing-technician', title: 'AI Testing Technician', route: '/ai-agent/manufacturing/testing-technician', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-calibration-specialist', uid: 'ktx-18-calibration-specialist', title: 'AI Calibration Specialist', route: '/ai-agent/manufacturing/calibration-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-maintenance-planner', uid: 'ktx-18-maintenance-planner', title: 'AI Maintenance Planner', route: '/ai-agent/manufacturing/maintenance-planner', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-reliability-engineer', uid: 'ktx-18-reliability-engineer', title: 'AI Reliability Engineer', route: '/ai-agent/manufacturing/reliability-engineer', color: '#5C6BC0', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-predictive-maintenance-specialist', uid: 'ktx-18-predictive-maintenance-specialist', title: 'AI Predictive Maintenance Specialist', route: '/ai-agent/manufacturing/predictive-maintenance-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-warehouse-manager', uid: 'ktx-18-warehouse-manager', title: 'AI Warehouse Manager', route: '/ai-agent/manufacturing/warehouse-manager', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-material-handler', uid: 'ktx-18-material-handler', title: 'AI Material Handler', route: '/ai-agent/manufacturing/material-handler', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-forklift-operator', uid: 'ktx-18-forklift-operator', title: 'AI Forklift Operator', route: '/ai-agent/manufacturing/forklift-operator', color: '#5C6BC0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-shipping-receiver', uid: 'ktx-18-shipping-receiver', title: 'AI Shipping/Receiver', route: '/ai-agent/manufacturing/shipping-receiver', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-lean-manufacturing-coach', uid: 'ktx-18-lean-manufacturing-coach', title: 'AI Lean Manufacturing Coach', route: '/ai-agent/manufacturing/lean-manufacturing-coach', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-kaizen-specialist', uid: 'ktx-18-kaizen-specialist', title: 'AI Kaizen Specialist', route: '/ai-agent/manufacturing/kaizen-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-six-sigma-black-belt', uid: 'ktx-18-six-sigma-black-belt', title: 'AI Six Sigma Black Belt', route: '/ai-agent/manufacturing/six-sigma-black-belt', color: '#5C6BC0', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-process-engineer', uid: 'ktx-18-process-engineer', title: 'AI Process Engineer', route: '/ai-agent/manufacturing/process-engineer', color: '#5C6BC0', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-industrial-engineer', uid: 'ktx-18-industrial-engineer', title: 'AI Industrial Engineer', route: '/ai-agent/manufacturing/industrial-engineer', color: '#5C6BC0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-safety-coordinator', uid: 'ktx-18-safety-coordinator', title: 'AI Safety Coordinator', route: '/ai-agent/manufacturing/safety-coordinator', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-ergonomics-specialist', uid: 'ktx-18-ergonomics-specialist', title: 'AI Ergonomics Specialist', route: '/ai-agent/manufacturing/ergonomics-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-hazmat-specialist', uid: 'ktx-18-hazmat-specialist', title: 'AI Hazmat Specialist', route: '/ai-agent/manufacturing/hazmat-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-occupational-health-specialist', uid: 'ktx-18-occupational-health-specialist', title: 'AI Occupational Health Specialist', route: '/ai-agent/manufacturing/occupational-health-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-demand-planner', uid: 'ktx-18-demand-planner', title: 'AI Demand Planner', route: '/ai-agent/manufacturing/demand-planner', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-capacity-planner', uid: 'ktx-18-capacity-planner', title: 'AI Capacity Planner', route: '/ai-agent/manufacturing/capacity-planner', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-production-scheduler', uid: 'ktx-18-production-scheduler', title: 'AI Production Scheduler', route: '/ai-agent/manufacturing/production-scheduler', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-mps-planner', uid: 'ktx-18-mps-planner', title: 'AI MPS Planner', route: '/ai-agent/manufacturing/mps-planner', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-mrp-controller', uid: 'ktx-18-mrp-controller', title: 'AI MRP Controller', route: '/ai-agent/manufacturing/mrp-controller', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-bom-analyst', uid: 'ktx-18-bom-analyst', title: 'AI BOM Analyst', route: '/ai-agent/manufacturing/bom-analyst', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-work-in-progress-tracker', uid: 'ktx-18-work-in-progress-tracker', title: 'AI Work in Progress Tracker', route: '/ai-agent/manufacturing/work-in-progress-tracker', color: '#5C6BC0', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-production-analyst', uid: 'ktx-18-production-analyst', title: 'AI Production Analyst', route: '/ai-agent/manufacturing/production-analyst', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-throughput-analyst', uid: 'ktx-18-throughput-analyst', title: 'AI Throughput Analyst', route: '/ai-agent/manufacturing/throughput-analyst', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-oee-specialist', uid: 'ktx-18-oee-specialist', title: 'AI OEE Specialist', route: '/ai-agent/manufacturing/oee-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-scrap-reduction-specialist', uid: 'ktx-18-scrap-reduction-specialist', title: 'AI Scrap Reduction Specialist', route: '/ai-agent/manufacturing/scrap-reduction-specialist', color: '#5C6BC0', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-tooling-engineer', uid: 'ktx-18-tooling-engineer', title: 'AI Tooling Engineer', route: '/ai-agent/manufacturing/tooling-engineer', color: '#5C6BC0', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-die-setter', uid: 'ktx-18-die-setter', title: 'AI Die Setter', route: '/ai-agent/manufacturing/die-setter', color: '#5C6BC0', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-setup-technician', uid: 'ktx-18-setup-technician', title: 'AI Setup Technician', route: '/ai-agent/manufacturing/setup-technician', color: '#5C6BC0', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-production-director-1', uid: 'ktx-18-production-director-1', title: 'AI Production Director I', route: '/ai-agent/manufacturing/production-director-1', color: '#5C6BC0', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-production-director-2', uid: 'ktx-18-production-director-2', title: 'AI Production Director II', route: '/ai-agent/manufacturing/production-director-2', color: '#5C6BC0', level: 'vp_director', efficiency: '94%' },
  { id: 'ai-quality-director-1', uid: 'ktx-18-quality-director-1', title: 'AI Quality Director I', route: '/ai-agent/manufacturing/quality-director-1', color: '#5C6BC0', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-quality-director-2', uid: 'ktx-18-quality-director-2', title: 'AI Quality Director II', route: '/ai-agent/manufacturing/quality-director-2', color: '#5C6BC0', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-engineering-manager-1', uid: 'ktx-18-engineering-manager-1', title: 'AI Engineering Manager I', route: '/ai-agent/manufacturing/engineering-manager-1', color: '#5C6BC0', level: 'manager', efficiency: '91%' },
  { id: 'ai-engineering-manager-2', uid: 'ktx-18-engineering-manager-2', title: 'AI Engineering Manager II', route: '/ai-agent/manufacturing/engineering-manager-2', color: '#5C6BC0', level: 'manager', efficiency: '92%' },
  { id: 'ai-safety-director-1', uid: 'ktx-18-safety-director-1', title: 'AI Safety Director I', route: '/ai-agent/manufacturing/safety-director-1', color: '#5C6BC0', level: 'vp_director', efficiency: '90%' },
  { id: 'ai-safety-director-2', uid: 'ktx-18-safety-director-2', title: 'AI Safety Director II', route: '/ai-agent/manufacturing/safety-director-2', color: '#5C6BC0', level: 'vp_director', efficiency: '91%' },
  { id: 'ai-continuous-improvement-manager-1', uid: 'ktx-18-continuous-improvement-manager-1', title: 'AI Continuous Improvement Manager I', route: '/ai-agent/manufacturing/continuous-improvement-manager-1', color: '#5C6BC0', level: 'manager', efficiency: '94%' },
  { id: 'ai-continuous-improvement-manager-2', uid: 'ktx-18-continuous-improvement-manager-2', title: 'AI Continuous Improvement Manager II', route: '/ai-agent/manufacturing/continuous-improvement-manager-2', color: '#5C6BC0', level: 'manager', efficiency: '95%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Manufacturing & Production - AI Agents</Text>
      <Text style={s.sub}>120 AI Agents & Employees</Text>
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
