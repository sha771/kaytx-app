import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Heart, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, Smile, TrendingUp, GraduationCap, Settings, Cpu, Layers } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'ai-customer-success-director-1', name: 'Customer Success Director', description: 'Customer Success Director AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-director-2', name: 'Customer Success Director', description: 'Customer Success Director AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-experience-design-director-1', name: 'Experience Design Director', description: 'Experience Design Director AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-design-director-2', name: 'Experience Design Director', description: 'Experience Design Director AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-customer-insights-manager-1', name: 'Customer Insights Manager', description: 'Customer Insights Manager AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insights-manager-2', name: 'Customer Insights Manager', description: 'Customer Insights Manager AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insights-manager-3', name: 'Customer Insights Manager', description: 'Customer Insights Manager AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-journey-optimization-specialist-1', name: 'Journey Optimization Specialist', description: 'Journey Optimization Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-journey-optimization-specialist-2', name: 'Journey Optimization Specialist', description: 'Journey Optimization Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-journey-optimization-specialist-3', name: 'Journey Optimization Specialist', description: 'Journey Optimization Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-voice-of-customer-specialist-1', name: 'Voice of Customer Specialist', description: 'Voice of Customer Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-voice-of-customer-specialist-2', name: 'Voice of Customer Specialist', description: 'Voice of Customer Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  // Customer Success Managers (15)
  { id: 'ai-customer-success-manager-1', name: 'Customer Success Manager 1', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-2', name: 'Customer Success Manager 2', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-3', name: 'Customer Success Manager 3', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-4', name: 'Customer Success Manager 4', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-5', name: 'Customer Success Manager 5', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-6', name: 'Customer Success Manager 6', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-7', name: 'Customer Success Manager 7', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-8', name: 'Customer Success Manager 8', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-9', name: 'Customer Success Manager 9', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-10', name: 'Customer Success Manager 10', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-11', name: 'Customer Success Manager 11', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-12', name: 'Customer Success Manager 12', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-13', name: 'Customer Success Manager 13', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-14', name: 'Customer Success Manager 14', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  { id: 'ai-customer-success-manager-15', name: 'Customer Success Manager 15', description: 'Customer Success Manager AI Agent', icon: Users, color: '#9C27B0' },
  // Customer Support Specialists (12)
  { id: 'ai-customer-support-specialist-1', name: 'Customer Support Specialist 1', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-2', name: 'Customer Support Specialist 2', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-3', name: 'Customer Support Specialist 3', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-4', name: 'Customer Support Specialist 4', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-5', name: 'Customer Support Specialist 5', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-6', name: 'Customer Support Specialist 6', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-7', name: 'Customer Support Specialist 7', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-8', name: 'Customer Support Specialist 8', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-9', name: 'Customer Support Specialist 9', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-10', name: 'Customer Support Specialist 10', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-11', name: 'Customer Support Specialist 11', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  { id: 'ai-customer-support-specialist-12', name: 'Customer Support Specialist 12', description: 'Customer Support Specialist AI Agent', icon: MessageSquare, color: '#2196F3' },
  // Experience Designers (10)
  { id: 'ai-experience-designer-1', name: 'Experience Designer 1', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-2', name: 'Experience Designer 2', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-3', name: 'Experience Designer 3', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-4', name: 'Experience Designer 4', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-5', name: 'Experience Designer 5', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-6', name: 'Experience Designer 6', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-7', name: 'Experience Designer 7', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-8', name: 'Experience Designer 8', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-9', name: 'Experience Designer 9', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  { id: 'ai-experience-designer-10', name: 'Experience Designer 10', description: 'Experience Designer AI Agent', icon: Smile, color: '#E91E63' },
  // Customer Journey Specialists (8)
  { id: 'ai-customer-journey-specialist-1', name: 'Customer Journey Specialist 1', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-2', name: 'Customer Journey Specialist 2', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-3', name: 'Customer Journey Specialist 3', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-4', name: 'Customer Journey Specialist 4', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-5', name: 'Customer Journey Specialist 5', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-6', name: 'Customer Journey Specialist 6', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-7', name: 'Customer Journey Specialist 7', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  { id: 'ai-customer-journey-specialist-8', name: 'Customer Journey Specialist 8', description: 'Customer Journey Specialist AI Agent', icon: Activity, color: '#FF5722' },
  // Feedback Analysts (6)
  { id: 'ai-feedback-analyst-1', name: 'Feedback Analyst 1', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-feedback-analyst-2', name: 'Feedback Analyst 2', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-feedback-analyst-3', name: 'Feedback Analyst 3', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-feedback-analyst-4', name: 'Feedback Analyst 4', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-feedback-analyst-5', name: 'Feedback Analyst 5', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-feedback-analyst-6', name: 'Feedback Analyst 6', description: 'Feedback Analyst AI Agent', icon: MessageSquare, color: '#00BCD4' },
  // Customer Retention Specialists (6)
  { id: 'ai-customer-retention-specialist-1', name: 'Customer Retention Specialist 1', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-retention-specialist-2', name: 'Customer Retention Specialist 2', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-retention-specialist-3', name: 'Customer Retention Specialist 3', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-retention-specialist-4', name: 'Customer Retention Specialist 4', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-retention-specialist-5', name: 'Customer Retention Specialist 5', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-retention-specialist-6', name: 'Customer Retention Specialist 6', description: 'Customer Retention Specialist AI Agent', icon: Heart, color: '#E91E63' },
  // Customer Onboarding Specialists (5)
  { id: 'ai-customer-onboarding-specialist-1', name: 'Customer Onboarding Specialist 1', description: 'Customer Onboarding Specialist AI Agent', icon: Users, color: '#4CAF50' },
  { id: 'ai-customer-onboarding-specialist-2', name: 'Customer Onboarding Specialist 2', description: 'Customer Onboarding Specialist AI Agent', icon: Users, color: '#4CAF50' },
  { id: 'ai-customer-onboarding-specialist-3', name: 'Customer Onboarding Specialist 3', description: 'Customer Onboarding Specialist AI Agent', icon: Users, color: '#4CAF50' },
  { id: 'ai-customer-onboarding-specialist-4', name: 'Customer Onboarding Specialist 4', description: 'Customer Onboarding Specialist AI Agent', icon: Users, color: '#4CAF50' },
  { id: 'ai-customer-onboarding-specialist-5', name: 'Customer Onboarding Specialist 5', description: 'Customer Onboarding Specialist AI Agent', icon: Users, color: '#4CAF50' },
  // Customer Training Specialists (5)
  { id: 'ai-customer-training-specialist-1', name: 'Customer Training Specialist 1', description: 'Customer Training Specialist AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'ai-customer-training-specialist-2', name: 'Customer Training Specialist 2', description: 'Customer Training Specialist AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'ai-customer-training-specialist-3', name: 'Customer Training Specialist 3', description: 'Customer Training Specialist AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'ai-customer-training-specialist-4', name: 'Customer Training Specialist 4', description: 'Customer Training Specialist AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'ai-customer-training-specialist-5', name: 'Customer Training Specialist 5', description: 'Customer Training Specialist AI Agent', icon: GraduationCap, color: '#9C27B0' },
  // Customer Advocacy Specialists (4)
  { id: 'ai-customer-advocacy-specialist-1', name: 'Customer Advocacy Specialist 1', description: 'Customer Advocacy Specialist AI Agent', icon: Star, color: '#FF9800' },
  { id: 'ai-customer-advocacy-specialist-2', name: 'Customer Advocacy Specialist 2', description: 'Customer Advocacy Specialist AI Agent', icon: Star, color: '#FF9800' },
  { id: 'ai-customer-advocacy-specialist-3', name: 'Customer Advocacy Specialist 3', description: 'Customer Advocacy Specialist AI Agent', icon: Star, color: '#FF9800' },
  { id: 'ai-customer-advocacy-specialist-4', name: 'Customer Advocacy Specialist 4', description: 'Customer Advocacy Specialist AI Agent', icon: Star, color: '#FF9800' },
  // Customer Insight Analysts (6)
  { id: 'ai-customer-insight-analyst-1', name: 'Customer Insight Analyst 1', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insight-analyst-2', name: 'Customer Insight Analyst 2', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insight-analyst-3', name: 'Customer Insight Analyst 3', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insight-analyst-4', name: 'Customer Insight Analyst 4', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insight-analyst-5', name: 'Customer Insight Analyst 5', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  { id: 'ai-customer-insight-analyst-6', name: 'Customer Insight Analyst 6', description: 'Customer Insight Analyst AI Agent', icon: TrendingUp, color: '#673AB7' },
  // Customer Communication Specialists (5)
  { id: 'ai-customer-communication-specialist-1', name: 'Customer Communication Specialist 1', description: 'Customer Communication Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-customer-communication-specialist-2', name: 'Customer Communication Specialist 2', description: 'Customer Communication Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-customer-communication-specialist-3', name: 'Customer Communication Specialist 3', description: 'Customer Communication Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-customer-communication-specialist-4', name: 'Customer Communication Specialist 4', description: 'Customer Communication Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  { id: 'ai-customer-communication-specialist-5', name: 'Customer Communication Specialist 5', description: 'Customer Communication Specialist AI Agent', icon: MessageSquare, color: '#00BCD4' },
  // Customer Quality Specialists (4)
  { id: 'ai-customer-quality-specialist-1', name: 'Customer Quality Specialist 1', description: 'Customer Quality Specialist AI Agent', icon: Shield, color: '#4CAF50' },
  { id: 'ai-customer-quality-specialist-2', name: 'Customer Quality Specialist 2', description: 'Customer Quality Specialist AI Agent', icon: Shield, color: '#4CAF50' },
  { id: 'ai-customer-quality-specialist-3', name: 'Customer Quality Specialist 3', description: 'Customer Quality Specialist AI Agent', icon: Shield, color: '#4CAF50' },
  { id: 'ai-customer-quality-specialist-4', name: 'Customer Quality Specialist 4', description: 'Customer Quality Specialist AI Agent', icon: Shield, color: '#4CAF50' },
  // Customer Satisfaction Specialists (4)
  { id: 'ai-customer-satisfaction-specialist-1', name: 'Customer Satisfaction Specialist 1', description: 'Customer Satisfaction Specialist AI Agent', icon: Smile, color: '#FF9800' },
  { id: 'ai-customer-satisfaction-specialist-2', name: 'Customer Satisfaction Specialist 2', description: 'Customer Satisfaction Specialist AI Agent', icon: Smile, color: '#FF9800' },
  { id: 'ai-customer-satisfaction-specialist-3', name: 'Customer Satisfaction Specialist 3', description: 'Customer Satisfaction Specialist AI Agent', icon: Smile, color: '#FF9800' },
  { id: 'ai-customer-satisfaction-specialist-4', name: 'Customer Satisfaction Specialist 4', description: 'Customer Satisfaction Specialist AI Agent', icon: Smile, color: '#FF9800' },
  // Customer Loyalty Specialists (3)
  { id: 'ai-customer-loyalty-specialist-1', name: 'Customer Loyalty Specialist 1', description: 'Customer Loyalty Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-loyalty-specialist-2', name: 'Customer Loyalty Specialist 2', description: 'Customer Loyalty Specialist AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'ai-customer-loyalty-specialist-3', name: 'Customer Loyalty Specialist 3', description: 'Customer Loyalty Specialist AI Agent', icon: Heart, color: '#E91E63' },
  // Customer Value Specialists (3)
  { id: 'ai-customer-value-specialist-1', name: 'Customer Value Specialist 1', description: 'Customer Value Specialist AI Agent', icon: TrendingUp, color: '#4CAF50' },
  { id: 'ai-customer-value-specialist-2', name: 'Customer Value Specialist 2', description: 'Customer Value Specialist AI Agent', icon: TrendingUp, color: '#4CAF50' },
  { id: 'ai-customer-value-specialist-3', name: 'Customer Value Specialist 3', description: 'Customer Value Specialist AI Agent', icon: TrendingUp, color: '#4CAF50' },
  // Customer Segmentation Specialists (3)
  { id: 'ai-customer-segmentation-specialist-1', name: 'Customer Segmentation Specialist 1', description: 'Customer Segmentation Specialist AI Agent', icon: Users, color: '#2196F3' },
  { id: 'ai-customer-segmentation-specialist-2', name: 'Customer Segmentation Specialist 2', description: 'Customer Segmentation Specialist AI Agent', icon: Users, color: '#2196F3' },
  { id: 'ai-customer-segmentation-specialist-3', name: 'Customer Segmentation Specialist 3', description: 'Customer Segmentation Specialist AI Agent', icon: Users, color: '#2196F3' },
  // Customer Analytics Specialists (4)
  { id: 'ai-customer-analytics-specialist-1', name: 'Customer Analytics Specialist 1', description: 'Customer Analytics Specialist AI Agent', icon: ChartBarBig, color: '#9C27B0' },
  { id: 'ai-customer-analytics-specialist-2', name: 'Customer Analytics Specialist 2', description: 'Customer Analytics Specialist AI Agent', icon: ChartBarBig, color: '#9C27B0' },
  { id: 'ai-customer-analytics-specialist-3', name: 'Customer Analytics Specialist 3', description: 'Customer Analytics Specialist AI Agent', icon: ChartBarBig, color: '#9C27B0' },
  { id: 'ai-customer-analytics-specialist-4', name: 'Customer Analytics Specialist 4', description: 'Customer Analytics Specialist AI Agent', icon: ChartBarBig, color: '#9C27B0' },
  // Customer Data Specialists (3)
  { id: 'ai-customer-data-specialist-1', name: 'Customer Data Specialist 1', description: 'Customer Data Specialist AI Agent', icon: Activity, color: '#00BCD4' },
  { id: 'ai-customer-data-specialist-2', name: 'Customer Data Specialist 2', description: 'Customer Data Specialist AI Agent', icon: Activity, color: '#00BCD4' },
  { id: 'ai-customer-data-specialist-3', name: 'Customer Data Specialist 3', description: 'Customer Data Specialist AI Agent', icon: Activity, color: '#00BCD4' },
  // Customer Research Specialists (3)
  { id: 'ai-customer-research-specialist-1', name: 'Customer Research Specialist 1', description: 'Customer Research Specialist AI Agent', icon: Target, color: '#FF5722' },
  { id: 'ai-customer-research-specialist-2', name: 'Customer Research Specialist 2', description: 'Customer Research Specialist AI Agent', icon: Target, color: '#FF5722' },
  { id: 'ai-customer-research-specialist-3', name: 'Customer Research Specialist 3', description: 'Customer Research Specialist AI Agent', icon: Target, color: '#FF5722' },
  // Customer Strategy Specialists (2)
  { id: 'ai-customer-strategy-specialist-1', name: 'Customer Strategy Specialist 1', description: 'Customer Strategy Specialist AI Agent', icon: Star, color: '#9C27B0' },
  { id: 'ai-customer-strategy-specialist-2', name: 'Customer Strategy Specialist 2', description: 'Customer Strategy Specialist AI Agent', icon: Star, color: '#9C27B0' },
  // Customer Operations Specialists (4)
  { id: 'ai-customer-operations-specialist-1', name: 'Customer Operations Specialist 1', description: 'Customer Operations Specialist AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'ai-customer-operations-specialist-2', name: 'Customer Operations Specialist 2', description: 'Customer Operations Specialist AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'ai-customer-operations-specialist-3', name: 'Customer Operations Specialist 3', description: 'Customer Operations Specialist AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'ai-customer-operations-specialist-4', name: 'Customer Operations Specialist 4', description: 'Customer Operations Specialist AI Agent', icon: Settings, color: '#607D8B' },
  // Customer Technology Specialists (2)
  { id: 'ai-customer-technology-specialist-1', name: 'Customer Technology Specialist 1', description: 'Customer Technology Specialist AI Agent', icon: Cpu, color: '#3F51B5' },
  { id: 'ai-customer-technology-specialist-2', name: 'Customer Technology Specialist 2', description: 'Customer Technology Specialist AI Agent', icon: Cpu, color: '#3F51B5' },
  // Customer Process Specialists (2)
  { id: 'ai-customer-process-specialist-1', name: 'Customer Process Specialist 1', description: 'Customer Process Specialist AI Agent', icon: Layers, color: '#009688' },
  { id: 'ai-customer-process-specialist-2', name: 'Customer Process Specialist 2', description: 'Customer Process Specialist AI Agent', icon: Layers, color: '#009688' },
  // Customer Compliance Specialists (2)
  { id: 'ai-customer-compliance-specialist-1', name: 'Customer Compliance Specialist 1', description: 'Customer Compliance Specialist AI Agent', icon: Shield, color: '#F44336' },
  { id: 'ai-customer-compliance-specialist-2', name: 'Customer Compliance Specialist 2', description: 'Customer Compliance Specialist AI Agent', icon: Shield, color: '#F44336' },
];

export default function CustomerExperienceDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#9C27B020' }]}><Heart size={48} color="#9C27B0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Customer Experience</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Customer Excellence</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#9C27B022' }]}><Star size={12} color="#9C27B0" /><Text style={[styles.badgeText, { color: '#9C27B0' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Satisfaction',value:'94%',icon:Activity,color:'#007AFF'},{label:'Retention',value:'88%',icon:Clock,color:'#FF9500'},{label:'NPS',value:'72',icon:Target,color:'#9C27B0'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Customer Experience department drives customer satisfaction through AI-powered support, success management, and experience optimization. Our agents ensure every customer interaction is exceptional.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/customer/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#9C27B012' }]}><act.icon size={24} color="#9C27B0" /><Text style={[styles.actionText, { color: '#9C27B0' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="customer-index" agentName="Index" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
