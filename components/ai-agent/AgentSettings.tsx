import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Settings, Building, User, Scale, Mic, Target, Clock, Cpu, Link, DollarSign, 
  GraduationCap, FileText, Shield, ChevronRight, Save, RefreshCw, CheckCircle, 
  AlertTriangle, Info, ToggleLeft, ToggleRight, Sliders, Globe, Lock, Bell 
} from 'lucide-react-native';
import { AIEmployee } from '@/constants/aiEmployees';

interface AgentSettingsProps {
  agent: Partial<AIEmployee>;
}

export const AgentSettings: React.FC<AgentSettingsProps> = ({ agent }) => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('company');

  const settingsSections = [
    { id: 'company', label: 'Company Setup', icon: Building },
    { id: 'profile', label: 'Profile Setup', icon: User },
    { id: 'negotiation', label: 'Negotiation Rules', icon: Scale },
    { id: 'voice', label: 'Voice & Personality', icon: Mic },
    { id: 'experience', label: 'Experience Goals', icon: Target },
    { id: 'business', label: 'Business Hours', icon: Clock },
    { id: 'ai', label: 'AI Configurations', icon: Cpu },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'pricing', label: 'Pricing & Limits', icon: DollarSign },
    { id: 'training', label: 'Training', icon: GraduationCap },
    { id: 'rules', label: 'Rules & Regulations', icon: FileText },
    { id: 'behaviors', label: 'Behaviors & Limits', icon: Shield },
  ];

  const renderCompanySetup = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Building size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Company Setup</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Organization Details</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Company Name</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Kaytx AI"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Industry</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Technology"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Company Size</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Enterprise (500+)"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Department Configuration</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Department</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue={agent.hierarchy?.department || 'Operations'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Team Lead</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Not Assigned"
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderProfileSetup = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <User size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Profile Setup</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Basic Information</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Agent Name</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue={agent.name}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Title/Role</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue={agent.title}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Description</Text>
            <TextInput
              style={[styles.settingTextArea, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue={agent.description}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Display Settings</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Show in Public Directory</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Allow others to discover this agent</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Enable Avatar</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Show agent avatar in UI</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderNegotiationRules = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Scale size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Negotiation Rules & Limits</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Negotiation Authority</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Max Approval Amount</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="$10,000"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Discount Limit</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="15%"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Escalation Rules</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Auto-Escalate High Value</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Automatically escalate deals above threshold</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Require Human Approval</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>For decisions exceeding limits</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderVoicePersonality = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Mic size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Voice & Personality</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Voice Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Voice Type</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Professional"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Speaking Rate</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="Normal"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Language</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="English (US)"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Personality Traits</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Friendly Tone</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Use casual, approachable language</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Empathetic Responses</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Show understanding and empathy</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Professional Formality</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Maintain professional standards</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderExperienceGoals = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Target size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Experience Goals</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Performance Targets</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Success Rate Goal</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="95%"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Response Time Goal</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="< 1 second"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Customer Satisfaction Goal</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="90%"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Learning Objectives</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Continuous Learning</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Enable ongoing skill improvement</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Feedback Integration</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Learn from user feedback</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderBusinessHours = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Clock size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Business Hours</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Availability Schedule</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Operating Hours</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="24/7"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Time Zone</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="UTC"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Availability Rules</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>24/7 Operation</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Agent available at all times</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Holiday Mode</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Reduced capacity on holidays</Text>
            </View>
            <Switch value={false} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Maintenance Windows</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Scheduled downtime allowed</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderAIConfigurations = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Cpu size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>AI Configurations</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Model Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>AI Model</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="GPT-4 Turbo"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Temperature</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="0.7"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Max Tokens</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="4096"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Advanced Settings</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Streaming Responses</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Enable real-time response streaming</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Context Retention</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Remember conversation context</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderIntegrations = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Link size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Integrations</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Connected Services</Text>
          
          {[
            { name: 'CRM System', status: 'Connected', color: '#34C759' },
            { name: 'Analytics Platform', status: 'Connected', color: '#34C759' },
            { name: 'Email Service', status: 'Connected', color: '#34C759' },
            { name: 'Calendar', status: 'Pending', color: '#FF9500' },
            { name: 'Slack', status: 'Not Connected', color: '#8E8E93' },
          ].map((integration, index) => (
            <View key={index} style={[styles.integrationItem, { borderBottomColor: theme.colors.border }]}>
              <Globe size={20} color={integration.color} />
              <View style={styles.integrationInfo}>
                <Text style={[styles.integrationName, { color: theme.colors.text }]}>{integration.name}</Text>
                <Text style={[styles.integrationStatus, { color: integration.color }]}>{integration.status}</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.secondaryText} />
            </View>
          ))}
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>API Configuration</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Enable API Access</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Allow external API calls</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Webhook Support</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Enable webhook notifications</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderPricingLimits = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <DollarSign size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Pricing & Limits</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Cost Configuration</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Monthly Budget</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="$1,200"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Cost Per Task</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="$0.05"
            />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Usage Limits</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Daily Task Limit</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="10,000"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>API Call Limit</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="100,000/day"
            />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Overage Protection</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Stop when limits reached</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderTraining = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <GraduationCap size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Training</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Training Status</Text>
          
          <View style={styles.trainingItem}>
            <CheckCircle size={20} color="#34C759" />
            <View style={styles.trainingInfo}>
              <Text style={[styles.trainingName, { color: theme.colors.text }]}>Basic Capability Training</Text>
              <Text style={[styles.trainingDate, { color: theme.colors.secondaryText }]}>Completed: Jan 15, 2026</Text>
            </View>
          </View>
          
          <View style={styles.trainingItem}>
            <CheckCircle size={20} color="#34C759" />
            <View style={styles.trainingInfo}>
              <Text style={[styles.trainingName, { color: theme.colors.text }]}>Advanced Skills Training</Text>
              <Text style={[styles.trainingDate, { color: theme.colors.secondaryText }]}>Completed: Mar 15, 2026</Text>
            </View>
          </View>
          
          <View style={styles.trainingItem}>
            <AlertTriangle size={20} color="#FF9500" />
            <View style={styles.trainingInfo}>
              <Text style={[styles.trainingName, { color: theme.colors.text }]}>Specialization Training</Text>
              <Text style={[styles.trainingDate, { color: theme.colors.secondaryText }]}>In Progress: 65% complete</Text>
            </View>
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Training Settings</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Auto-Training</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Automatically learn from interactions</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Scheduled Updates</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Weekly model updates</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderRulesRegulations = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <FileText size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Rules & Regulations</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Compliance Rules</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>GDPR Compliance</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Follow data protection regulations</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>SOC 2 Standards</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Maintain security compliance</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Industry Regulations</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Follow industry-specific rules</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Data Handling</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Data Encryption</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Encrypt all data at rest</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Audit Logging</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Log all agent activities</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderBehaviorsLimits = () => (
    <View style={styles.settingsContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Shield size={24} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Behaviors & Limits</Text>
        </View>
        
        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Behavioral Rules</Text>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Politeness Enforcement</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Always maintain polite tone</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Fact Verification</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Verify facts before stating</Text>
            </View>
            <Switch value={true} />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Avoid Harmful Content</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Block inappropriate responses</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={[styles.groupTitle, { color: theme.colors.text }]}>Operational Limits</Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Max Concurrent Tasks</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="50"
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.secondaryText }]}>Task Timeout (seconds)</Text>
            <TextInput
              style={[styles.settingInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              defaultValue="300"
            />
          </View>
          
          <View style={styles.switchItem}>
            <View>
              <Text style={[styles.switchLabel, { color: theme.colors.text }]}>Rate Limiting</Text>
              <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>Limit request frequency</Text>
            </View>
            <Switch value={true} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'company': return renderCompanySetup();
      case 'profile': return renderProfileSetup();
      case 'negotiation': return renderNegotiationRules();
      case 'voice': return renderVoicePersonality();
      case 'experience': return renderExperienceGoals();
      case 'business': return renderBusinessHours();
      case 'ai': return renderAIConfigurations();
      case 'integrations': return renderIntegrations();
      case 'pricing': return renderPricingLimits();
      case 'training': return renderTraining();
      case 'rules': return renderRulesRegulations();
      case 'behaviors': return renderBehaviorsLimits();
      default: return renderCompanySetup();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.sidebar}>
        <View style={styles.sidebarContent}>
          {settingsSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sidebarItem,
                activeSection === section.id && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <section.icon size={18} color={activeSection === section.id ? '#fff' : theme.colors.secondaryText} />
              <Text
                style={[
                  styles.sidebarItemText,
                  { color: activeSection === section.id ? '#fff' : theme.colors.text },
                ]}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.mainContent}>
        {renderActiveSection()}
        
        <View style={styles.saveSection}>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}>
            <Save size={18} color="#fff" />
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.resetBtn, { backgroundColor: theme.colors.border }]}>
            <RefreshCw size={18} color={theme.colors.text} />
            <Text style={[styles.resetBtnText, { color: theme.colors.text }]}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  sidebarContent: {
    padding: 8,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  sidebarItemText: {
    fontSize: 13,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
  },
  settingsContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  settingInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  settingTextArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  integrationStatus: {
    fontSize: 12,
  },
  trainingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  trainingInfo: {
    flex: 1,
  },
  trainingName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  trainingDate: {
    fontSize: 12,
  },
  saveSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
