import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-medical-officer', uid: 'ktx-17-chief-medical-officer', title: 'AI Chief Medical Officer', route: '/ai-agent/healthcare/chief-medical-officer', color: '#EC407A', level: 'c_level', efficiency: '83%' },
  { id: 'ai-vp-healthcare-operations', uid: 'ktx-17-vp-healthcare-operations', title: 'AI VP Healthcare Operations', route: '/ai-agent/healthcare/vp-healthcare-operations', color: '#EC407A', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-patient-experience', uid: 'ktx-17-vp-patient-experience', title: 'AI VP Patient Experience', route: '/ai-agent/healthcare/vp-patient-experience', color: '#EC407A', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-clinical-services', uid: 'ktx-17-vp-clinical-services', title: 'AI VP Clinical Services', route: '/ai-agent/healthcare/vp-clinical-services', color: '#EC407A', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-medical-affairs', uid: 'ktx-17-vp-medical-affairs', title: 'AI VP Medical Affairs', route: '/ai-agent/healthcare/vp-medical-affairs', color: '#EC407A', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-nursing-services', uid: 'ktx-17-vp-nursing-services', title: 'AI VP Nursing Services', route: '/ai-agent/healthcare/vp-nursing-services', color: '#EC407A', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-revenue-cycle', uid: 'ktx-17-vp-revenue-cycle', title: 'AI VP Revenue Cycle', route: '/ai-agent/healthcare/vp-revenue-cycle', color: '#EC407A', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-vp-health-information', uid: 'ktx-17-vp-health-information', title: 'AI VP Health Information', route: '/ai-agent/healthcare/vp-health-information', color: '#EC407A', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-quality-safety', uid: 'ktx-17-vp-quality-safety', title: 'AI VP Quality & Safety', route: '/ai-agent/healthcare/vp-quality-safety', color: '#EC407A', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-pharmacy-services', uid: 'ktx-17-vp-pharmacy-services', title: 'AI VP Pharmacy Services', route: '/ai-agent/healthcare/vp-pharmacy-services', color: '#EC407A', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-laboratory-services', uid: 'ktx-17-vp-laboratory-services', title: 'AI VP Laboratory Services', route: '/ai-agent/healthcare/vp-laboratory-services', color: '#EC407A', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-patient-services-manager', uid: 'ktx-17-patient-services-manager', title: 'AI Patient Services Manager', route: '/ai-agent/healthcare/patient-services-manager', color: '#EC407A', level: 'manager', efficiency: '84%' },
  { id: 'ai-medical-billing-manager', uid: 'ktx-17-medical-billing-manager', title: 'AI Medical Billing Manager', route: '/ai-agent/healthcare/medical-billing-manager', color: '#EC407A', level: 'manager', efficiency: '77%' },
  { id: 'ai-scheduling-manager', uid: 'ktx-17-scheduling-manager', title: 'AI Scheduling Manager', route: '/ai-agent/healthcare/scheduling-manager', color: '#EC407A', level: 'manager', efficiency: '82%' },
  { id: 'ai-clinical-manager', uid: 'ktx-17-clinical-manager', title: 'AI Clinical Manager', route: '/ai-agent/healthcare/clinical-manager', color: '#EC407A', level: 'manager', efficiency: '86%' },
  { id: 'ai-nursing-manager', uid: 'ktx-17-nursing-manager', title: 'AI Nursing Manager', route: '/ai-agent/healthcare/nursing-manager', color: '#EC407A', level: 'manager', efficiency: '85%' },
  { id: 'ai-pharmacy-manager', uid: 'ktx-17-pharmacy-manager', title: 'AI Pharmacy Manager', route: '/ai-agent/healthcare/pharmacy-manager', color: '#EC407A', level: 'manager', efficiency: '84%' },
  { id: 'ai-laboratory-manager', uid: 'ktx-17-laboratory-manager', title: 'AI Laboratory Manager', route: '/ai-agent/healthcare/laboratory-manager', color: '#EC407A', level: 'manager', efficiency: '83%' },
  { id: 'ai-patient-coordinator', uid: 'ktx-17-patient-coordinator', title: 'AI Patient Coordinator', route: '/ai-agent/healthcare/patient-coordinator', color: '#EC407A', level: 'c_level', efficiency: '89%' },
  { id: 'ai-medical-coder', uid: 'ktx-17-medical-coder', title: 'AI Medical Coder', route: '/ai-agent/healthcare/medical-coder', color: '#EC407A', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-billing-specialist', uid: 'ktx-17-billing-specialist', title: 'AI Billing Specialist', route: '/ai-agent/healthcare/billing-specialist', color: '#EC407A', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-care-coordinator', uid: 'ktx-17-care-coordinator', title: 'AI Care Coordinator', route: '/ai-agent/healthcare/care-coordinator', color: '#EC407A', level: 'c_level', efficiency: '88%' },
  { id: 'ai-health-records-specialist', uid: 'ktx-17-health-records-specialist', title: 'AI Health Records Specialist', route: '/ai-agent/healthcare/health-records-specialist', color: '#EC407A', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-telehealth-support', uid: 'ktx-17-telehealth-support', title: 'AI Telehealth Support', route: '/ai-agent/healthcare/telehealth-support', color: '#EC407A', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-healthcare-compliance', uid: 'ktx-17-healthcare-compliance', title: 'AI Healthcare Compliance', route: '/ai-agent/healthcare/healthcare-compliance', color: '#EC407A', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-quality-improvement-specialist', uid: 'ktx-17-quality-improvement-specialist', title: 'AI Quality Improvement Specialist', route: '/ai-agent/healthcare/quality-improvement-specialist', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-claims-specialist', uid: 'ktx-17-claims-specialist', title: 'AI Claims Specialist', route: '/ai-agent/healthcare/claims-specialist', color: '#EC407A', level: 'team_lead', efficiency: '81%' },
  { id: 'ai-claims-processor', uid: 'ktx-17-claims-processor', title: 'AI Claims Processor', route: '/ai-agent/healthcare/claims-processor', color: '#EC407A', level: 'team_lead', efficiency: '80%' },
  { id: 'ai-charge-capture-specialist', uid: 'ktx-17-charge-capture-specialist', title: 'AI Charge Capture Specialist', route: '/ai-agent/healthcare/charge-capture-specialist', color: '#EC407A', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-denial-management-specialist', uid: 'ktx-17-denial-management-specialist', title: 'AI Denial Management Specialist', route: '/ai-agent/healthcare/denial-management-specialist', color: '#EC407A', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-patient-intake-specialist', uid: 'ktx-17-patient-intake-specialist', title: 'AI Patient Intake Specialist', route: '/ai-agent/healthcare/patient-intake-specialist', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-registration-specialist', uid: 'ktx-17-registration-specialist', title: 'AI Registration Specialist', route: '/ai-agent/healthcare/registration-specialist', color: '#EC407A', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-insurance-verification-specialist', uid: 'ktx-17-insurance-verification-specialist', title: 'AI Insurance Verification Specialist', route: '/ai-agent/healthcare/insurance-verification-specialist', color: '#EC407A', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-prior-authorization-specialist', uid: 'ktx-17-prior-authorization-specialist', title: 'AI Prior Authorization Specialist', route: '/ai-agent/healthcare/prior-authorization-specialist', color: '#EC407A', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-scheduling-specialist', uid: 'ktx-17-scheduling-specialist', title: 'AI Scheduling Specialist', route: '/ai-agent/healthcare/scheduling-specialist', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-appointment-coordinator', uid: 'ktx-17-appointment-coordinator', title: 'AI Appointment Coordinator', route: '/ai-agent/healthcare/appointment-coordinator', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-clinical-documentation-specialist', uid: 'ktx-17-clinical-documentation-specialist', title: 'AI Clinical Documentation Specialist', route: '/ai-agent/healthcare/clinical-documentation-specialist', color: '#EC407A', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-health-information-technician', uid: 'ktx-17-health-information-technician', title: 'AI Health Information Technician', route: '/ai-agent/healthcare/health-information-technician', color: '#EC407A', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-release-of-information-specialist', uid: 'ktx-17-release-of-information-specialist', title: 'AI Release of Information Specialist', route: '/ai-agent/healthcare/release-of-information-specialist', color: '#EC407A', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-medical-records-clerk', uid: 'ktx-17-medical-records-clerk', title: 'AI Medical Records Clerk', route: '/ai-agent/healthcare/medical-records-clerk', color: '#EC407A', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-telehealth-coordinator', uid: 'ktx-17-telehealth-coordinator', title: 'AI Telehealth Coordinator', route: '/ai-agent/healthcare/telehealth-coordinator', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-remote-patient-monitoring-specialist', uid: 'ktx-17-remote-patient-monitoring-specialist', title: 'AI Remote Patient Monitoring Specialist', route: '/ai-agent/healthcare/remote-patient-monitoring-specialist', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-telemedicine-support-specialist', uid: 'ktx-17-telemedicine-support-specialist', title: 'AI Telemedicine Support Specialist', route: '/ai-agent/healthcare/telemedicine-support-specialist', color: '#EC407A', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-hipaa-compliance-specialist', uid: 'ktx-17-hipaa-compliance-specialist', title: 'AI HIPAA Compliance Specialist', route: '/ai-agent/healthcare/hipaa-compliance-specialist', color: '#EC407A', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-regulatory-compliance-specialist', uid: 'ktx-17-regulatory-compliance-specialist', title: 'AI Regulatory Compliance Specialist', route: '/ai-agent/healthcare/regulatory-compliance-specialist', color: '#EC407A', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-clinical-risk-specialist', uid: 'ktx-17-clinical-risk-specialist', title: 'AI Clinical Risk Specialist', route: '/ai-agent/healthcare/clinical-risk-specialist', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-patient-safety-specialist', uid: 'ktx-17-patient-safety-specialist', title: 'AI Patient Safety Specialist', route: '/ai-agent/healthcare/patient-safety-specialist', color: '#EC407A', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-infection-control-specialist', uid: 'ktx-17-infection-control-specialist', title: 'AI Infection Control Specialist', route: '/ai-agent/healthcare/infection-control-specialist', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-quality-assurance-analyst', uid: 'ktx-17-quality-assurance-analyst', title: 'AI Quality Assurance Analyst', route: '/ai-agent/healthcare/quality-assurance-analyst', color: '#EC407A', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-performance-improvement-coordinator', uid: 'ktx-17-performance-improvement-coordinator', title: 'AI Performance Improvement Coordinator', route: '/ai-agent/healthcare/performance-improvement-coordinator', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-patient-satisfaction-specialist', uid: 'ktx-17-patient-satisfaction-specialist', title: 'AI Patient Satisfaction Specialist', route: '/ai-agent/healthcare/patient-satisfaction-specialist', color: '#EC407A', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-case-manager', uid: 'ktx-17-case-manager', title: 'AI Case Manager', route: '/ai-agent/healthcare/case-manager', color: '#EC407A', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-discharge-planner', uid: 'ktx-17-discharge-planner', title: 'AI Discharge Planner', route: '/ai-agent/healthcare/discharge-planner', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-utilization-management-specialist', uid: 'ktx-17-utilization-management-specialist', title: 'AI Utilization Management Specialist', route: '/ai-agent/healthcare/utilization-management-specialist', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-transitions-of-care-coordinator', uid: 'ktx-17-transitions-of-care-coordinator', title: 'AI Transitions of Care Coordinator', route: '/ai-agent/healthcare/transitions-of-care-coordinator', color: '#EC407A', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-medical-necessity-reviewer', uid: 'ktx-17-medical-necessity-reviewer', title: 'AI Medical Necessity Reviewer', route: '/ai-agent/healthcare/medical-necessity-reviewer', color: '#EC407A', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-care-pathway-coordinator', uid: 'ktx-17-care-pathway-coordinator', title: 'AI Care Pathway Coordinator', route: '/ai-agent/healthcare/care-pathway-coordinator', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-pharmacy-technician', uid: 'ktx-17-pharmacy-technician', title: 'AI Pharmacy Technician', route: '/ai-agent/healthcare/pharmacy-technician', color: '#EC407A', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-medication-reconciliation-specialist', uid: 'ktx-17-medication-reconciliation-specialist', title: 'AI Medication Reconciliation Specialist', route: '/ai-agent/healthcare/medication-reconciliation-specialist', color: '#EC407A', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-drug-interaction-specialist', uid: 'ktx-17-drug-interaction-specialist', title: 'AI Drug Interaction Specialist', route: '/ai-agent/healthcare/drug-interaction-specialist', color: '#EC407A', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-healthcare-operations-manager-1', uid: 'ktx-17-healthcare-operations-manager-1', title: 'AI Healthcare Operations Manager I', route: '/ai-agent/healthcare/healthcare-operations-manager-1', color: '#EC407A', level: 'manager', efficiency: '90%' },
  { id: 'ai-healthcare-operations-manager-2', uid: 'ktx-17-healthcare-operations-manager-2', title: 'AI Healthcare Operations Manager II', route: '/ai-agent/healthcare/healthcare-operations-manager-2', color: '#EC407A', level: 'manager', efficiency: '91%' },
  { id: 'ai-healthcare-quality-director-1', uid: 'ktx-17-healthcare-quality-director-1', title: 'AI Healthcare Quality Director I', route: '/ai-agent/healthcare/healthcare-quality-director-1', color: '#EC407A', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-healthcare-quality-director-2', uid: 'ktx-17-healthcare-quality-director-2', title: 'AI Healthcare Quality Director II', route: '/ai-agent/healthcare/healthcare-quality-director-2', color: '#EC407A', level: 'vp_director', efficiency: '93%' },
  { id: 'ai-healthcare-safety-specialist-1', uid: 'ktx-17-healthcare-safety-specialist-1', title: 'AI Healthcare Safety Specialist I', route: '/ai-agent/healthcare/healthcare-safety-specialist-1', color: '#EC407A', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-healthcare-safety-specialist-2', uid: 'ktx-17-healthcare-safety-specialist-2', title: 'AI Healthcare Safety Specialist II', route: '/ai-agent/healthcare/healthcare-safety-specialist-2', color: '#EC407A', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-healthcare-analytics-manager-1', uid: 'ktx-17-healthcare-analytics-manager-1', title: 'AI Healthcare Analytics Manager I', route: '/ai-agent/healthcare/healthcare-analytics-manager-1', color: '#EC407A', level: 'manager', efficiency: '94%' },
  { id: 'ai-healthcare-analytics-manager-2', uid: 'ktx-17-healthcare-analytics-manager-2', title: 'AI Healthcare Analytics Manager II', route: '/ai-agent/healthcare/healthcare-analytics-manager-2', color: '#EC407A', level: 'manager', efficiency: '95%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Healthcare & Medical - AI Agents</Text>
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
