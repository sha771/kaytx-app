import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Brain, Wrench, FlaskConical, SlidersHorizontal } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiDataScientistPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5E35B120' }]}>
          <Briefcase size={56} color="#5E35B1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Data Scientist</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Data Science & ML Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5E35B122' }]}><Briefcase size={12} color="#5E35B1" /><Text style={[styles.badgeText, { color: '#5E35B1' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Models',value:'47',icon: Brain, color: '#34C759'},
          {label:'Uptime',value:'99.5%',icon: Activity, color: '#007AFF'},
          {label:'Response',value:'1.3s',icon: Clock, color: '#FF9500'},
          {label:'Accuracy',value:'95.8%',icon: Target, color: '#9C27B0'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Data Scientist engineers features, designs experiments, tunes models, and performs statistical analysis. Builds ML pipelines and conducts R&D for advanced modeling approaches.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Feature Engineering','Experiment Design','Model Tuning','Statistical Analysis','ML Pipeline','Research & Development'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#9C27B018' }]}>
              <Text style={[styles.tagText, { color: '#9C27B0' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ai-data-scientist', '/ds/features', '/ds/experiments', '/ds/model-tuning'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {[
          {n:'AI Feature Engineer',i:Wrench,r:'/ai-agent/data/sub-agents/feature-engineer',c:'#9C27B0'},
          {n:'AI Experiment Designer',i:FlaskConical,r:'/ai-agent/data/sub-agents/experiment-designer',c:'#007AFF'},
          {n:'AI Model Tuner',i:SlidersHorizontal,r:'/ai-agent/data/sub-agents/model-tuner',c:'#FF9500'}
        ].map((sa,i)=>(
          <TouchableOpacity key={i} onPress={()=>router.push(sa.r as any)} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7',marginTop:i>0?8:0}]}>
            <sa.i size={24} color={sa.c}/>
            <View style={styles.parentInfo}>
              <Text style={[styles.parentName,{color:theme.colors.text}]}>{sa.n}</Text>
              <Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Sub-Agent</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary}/>
          </TouchableOpacity>
        ))}
      </View>

      <AgentFeatures agentId="ai-data-scientist" agentName="AI Data Scientist" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
