import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  { id: 'ai-data-scientist', uid: 'ktx-di-data-scientist', title: 'Data Scientist', route: '/ai-agent/data-intelligence/data-scientist', color: '#00BCD4', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-data-analyst', uid: 'ktx-di-data-analyst', title: 'Data Analyst', route: '/ai-agent/data-intelligence/data-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-business-intelligence-specialist', uid: 'ktx-di-business-intelligence-specialist', title: 'Business Intelligence Specialist', route: '/ai-agent/data-intelligence/business-intelligence-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-machine-learning-engineer', uid: 'ktx-di-machine-learning-engineer', title: 'Machine Learning Engineer', route: '/ai-agent/data-intelligence/machine-learning-engineer', color: '#00BCD4', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-data-engineer', uid: 'ktx-di-data-engineer', title: 'Data Engineer', route: '/ai-agent/data-intelligence/data-engineer', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-warehouse-specialist', uid: 'ktx-di-data-warehouse-specialist', title: 'Data Warehouse Specialist', route: '/ai-agent/data-intelligence/data-warehouse-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-etl-developer', uid: 'ktx-di-etl-developer', title: 'ETL Developer', route: '/ai-agent/data-intelligence/etl-developer', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-quality-specialist', uid: 'ktx-di-data-quality-specialist', title: 'Data Quality Specialist', route: '/ai-agent/data-intelligence/data-quality-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-governance-specialist', uid: 'ktx-di-data-governance-specialist', title: 'Data Governance Specialist', route: '/ai-agent/data-intelligence/data-governance-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-visualization-expert', uid: 'ktx-di-data-visualization-expert', title: 'Data Visualization Expert', route: '/ai-agent/data-intelligence/data-visualization-expert', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-statistical-analyst', uid: 'ktx-di-statistical-analyst', title: 'Statistical Analyst', route: '/ai-agent/data-intelligence/statistical-analyst', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-predictive-modeling-specialist', uid: 'ktx-di-predictive-modeling-specialist', title: 'Predictive Modeling Specialist', route: '/ai-agent/data-intelligence/predictive-modeling-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-data-architect', uid: 'ktx-di-data-architect', title: 'Data Architect', route: '/ai-agent/data-intelligence/data-architect', color: '#00BCD4', level: 'manager', efficiency: '91%' },
  { id: 'ai-database-administrator', uid: 'ktx-di-database-administrator', title: 'Database Administrator', route: '/ai-agent/data-intelligence/database-administrator', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-big-data-specialist', uid: 'ktx-di-big-data-specialist', title: 'Big Data Specialist', route: '/ai-agent/data-intelligence/big-data-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-real-time-data-processing-expert', uid: 'ktx-di-real-time-data-processing-expert', title: 'Real-Time Data Processing Expert', route: '/ai-agent/data-intelligence/real-time-data-processing-expert', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-security-specialist', uid: 'ktx-di-data-security-specialist', title: 'Data Security Specialist', route: '/ai-agent/data-intelligence/data-security-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-data-privacy-specialist', uid: 'ktx-di-data-privacy-specialist', title: 'Data Privacy Specialist', route: '/ai-agent/data-intelligence/data-privacy-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-product-manager', uid: 'ktx-di-data-product-manager', title: 'Data Product Manager', route: '/ai-agent/data-intelligence/data-product-manager', color: '#00BCD4', level: 'manager', efficiency: '87%' },
  { id: 'ai-analytics-platform-specialist', uid: 'ktx-di-analytics-platform-specialist', title: 'Analytics Platform Specialist', route: '/ai-agent/data-intelligence/analytics-platform-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-platform-engineer', uid: 'ktx-di-data-platform-engineer', title: 'Data Platform Engineer', route: '/ai-agent/data-intelligence/data-platform-engineer', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-operations-specialist', uid: 'ktx-di-data-operations-specialist', title: 'Data Operations Specialist', route: '/ai-agent/data-intelligence/data-operations-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-catalog-specialist', uid: 'ktx-di-data-catalog-specialist', title: 'Data Catalog Specialist', route: '/ai-agent/data-intelligence/data-catalog-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-master-data-management-specialist', uid: 'ktx-di-master-data-management-specialist', title: 'Master Data Management Specialist', route: '/ai-agent/data-intelligence/master-data-management-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-mining-specialist', uid: 'ktx-di-data-mining-specialist', title: 'Data Mining Specialist', route: '/ai-agent/data-intelligence/data-mining-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-integration-specialist', uid: 'ktx-di-data-integration-specialist', title: 'Data Integration Specialist', route: '/ai-agent/data-intelligence/data-integration-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-migration-specialist', uid: 'ktx-di-data-migration-specialist', title: 'Data Migration Specialist', route: '/ai-agent/data-intelligence/data-migration-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-cleansing-specialist', uid: 'ktx-di-data-cleansing-specialist', title: 'Data Cleansing Specialist', route: '/ai-agent/data-intelligence/data-cleansing-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-validation-specialist', uid: 'ktx-di-data-validation-specialist', title: 'Data Validation Specialist', route: '/ai-agent/data-intelligence/data-validation-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-enrichment-specialist', uid: 'ktx-di-data-enrichment-specialist', title: 'Data Enrichment Specialist', route: '/ai-agent/data-intelligence/data-enrichment-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-transformation-specialist', uid: 'ktx-di-data-transformation-specialist', title: 'Data Transformation Specialist', route: '/ai-agent/data-intelligence/data-transformation-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-modeling-specialist', uid: 'ktx-di-data-modeling-specialist', title: 'Data Modeling Specialist', route: '/ai-agent/data-intelligence/data-modeling-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-warehousing-specialist', uid: 'ktx-di-data-warehousing-specialist', title: 'Data Warehousing Specialist', route: '/ai-agent/data-intelligence/data-warehousing-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-lake-specialist', uid: 'ktx-di-data-lake-specialist', title: 'Data Lake Specialist', route: '/ai-agent/data-intelligence/data-lake-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-pipeline-specialist', uid: 'ktx-di-data-pipeline-specialist', title: 'Data Pipeline Specialist', route: '/ai-agent/data-intelligence/data-pipeline-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-streaming-specialist', uid: 'ktx-di-data-streaming-specialist', title: 'Data Streaming Specialist', route: '/ai-agent/data-intelligence/data-streaming-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-batch-specialist', uid: 'ktx-di-data-batch-specialist', title: 'Data Batch Specialist', route: '/ai-agent/data-intelligence/data-batch-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-real-time-specialist', uid: 'ktx-di-data-real-time-specialist', title: 'Data Real-Time Specialist', route: '/ai-agent/data-intelligence/data-real-time-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-historical-specialist', uid: 'ktx-di-data-historical-specialist', title: 'Data Historical Specialist', route: '/ai-agent/data-intelligence/data-historical-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-current-specialist', uid: 'ktx-di-data-current-specialist', title: 'Data Current Specialist', route: '/ai-agent/data-intelligence/data-current-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-predictive-specialist', uid: 'ktx-di-data-predictive-specialist', title: 'Data Predictive Specialist', route: '/ai-agent/data-intelligence/data-predictive-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-prescriptive-specialist', uid: 'ktx-di-data-prescriptive-specialist', title: 'Data Prescriptive Specialist', route: '/ai-agent/data-intelligence/data-prescriptive-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-diagnostic-specialist', uid: 'ktx-di-data-diagnostic-specialist', title: 'Data Diagnostic Specialist', route: '/ai-agent/data-intelligence/data-diagnostic-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-descriptive-specialist', uid: 'ktx-di-data-descriptive-specialist', title: 'Data Descriptive Specialist', route: '/ai-agent/data-intelligence/data-descriptive-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-cognitive-specialist', uid: 'ktx-di-data-cognitive-specialist', title: 'Data Cognitive Specialist', route: '/ai-agent/data-intelligence/data-cognitive-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-generative-specialist', uid: 'ktx-di-data-generative-specialist', title: 'Data Generative Specialist', route: '/ai-agent/data-intelligence/data-generative-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-data-discriminative-specialist', uid: 'ktx-di-data-discriminative-specialist', title: 'Data Discriminative Specialist', route: '/ai-agent/data-intelligence/data-discriminative-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-supervised-specialist', uid: 'ktx-di-data-supervised-specialist', title: 'Data Supervised Specialist', route: '/ai-agent/data-intelligence/data-supervised-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-unsupervised-specialist', uid: 'ktx-di-data-unsupervised-specialist', title: 'Data Unsupervised Specialist', route: '/ai-agent/data-intelligence/data-unsupervised-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-reinforcement-specialist', uid: 'ktx-di-data-reinforcement-specialist', title: 'Data Reinforcement Specialist', route: '/ai-agent/data-intelligence/data-reinforcement-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-transfer-specialist', uid: 'ktx-di-data-transfer-specialist', title: 'Data Transfer Specialist', route: '/ai-agent/data-intelligence/data-transfer-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-few-shot-specialist', uid: 'ktx-di-data-few-shot-specialist', title: 'Data Few-Shot Specialist', route: '/ai-agent/data-intelligence/data-few-shot-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-zero-shot-specialist', uid: 'ktx-di-data-zero-shot-specialist', title: 'Data Zero-Shot Specialist', route: '/ai-agent/data-intelligence/data-zero-shot-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-multimodal-specialist', uid: 'ktx-di-data-multimodal-specialist', title: 'Data Multimodal Specialist', route: '/ai-agent/data-intelligence/data-multimodal-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-cross-lingual-specialist', uid: 'ktx-di-data-cross-lingual-specialist', title: 'Data Cross-Lingual Specialist', route: '/ai-agent/data-intelligence/data-cross-lingual-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-domain-adaptation-specialist', uid: 'ktx-di-data-domain-adaptation-specialist', title: 'Data Domain Adaptation Specialist', route: '/ai-agent/data-intelligence/data-domain-adaptation-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-fine-tuning-specialist', uid: 'ktx-di-data-fine-tuning-specialist', title: 'Data Fine-Tuning Specialist', route: '/ai-agent/data-intelligence/data-fine-tuning-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-prompt-specialist', uid: 'ktx-di-data-prompt-specialist', title: 'Data Prompt Specialist', route: '/ai-agent/data-intelligence/data-prompt-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-embedding-specialist', uid: 'ktx-di-data-embedding-specialist', title: 'Data Embedding Specialist', route: '/ai-agent/data-intelligence/data-embedding-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-data-vector-specialist', uid: 'ktx-di-data-vector-specialist', title: 'Data Vector Specialist', route: '/ai-agent/data-intelligence/data-vector-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-graph-specialist', uid: 'ktx-di-data-graph-specialist', title: 'Data Graph Specialist', route: '/ai-agent/data-intelligence/data-graph-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-data-network-specialist', uid: 'ktx-di-data-network-specialist', title: 'Data Network Specialist', route: '/ai-agent/data-intelligence/data-network-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-data-temporal-specialist', uid: 'ktx-di-data-temporal-specialist', title: 'Data Temporal Specialist', route: '/ai-agent/data-intelligence/data-temporal-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '84%' },
  { id: 'ai-data-spatial-specialist', uid: 'ktx-di-data-spatial-specialist', title: 'Data Spatial Specialist', route: '/ai-agent/data-intelligence/data-spatial-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-data-text-specialist', uid: 'ktx-di-data-text-specialist', title: 'Data Text Specialist', route: '/ai-agent/data-intelligence/data-text-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-data-image-specialist', uid: 'ktx-di-data-image-specialist', title: 'Data Image Specialist', route: '/ai-agent/data-intelligence/data-image-specialist', color: '#00BCD4', level: 'team_lead', efficiency: '88%' },
];

export default function DataIntelligenceDepartment() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Data Intelligence - AI Agents</Text>
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
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},
  title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},
  al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
