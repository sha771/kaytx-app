import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  ChevronLeft,
  Gauge,
  Radio,
  Route,
  Users,
} from 'lucide-react-native';
import { DepartmentDashboard } from '@/constants/departmentDashboards';

type Props = {
  department: DepartmentDashboard;
  onBack: () => void;
  onOpenDepartment: () => void;
};

function Movement({ value, risk }: { value: number; risk?: boolean }) {
  const positive = !risk;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <View style={styles.movement}>
      <Icon size={16} color={positive ? '#34d399' : '#fb7185'} />
      <Text style={[styles.movementText, { color: positive ? '#34d399' : '#fb7185' }]}>
        {value > 0 ? '+' : ''}{value.toFixed(1)}%
      </Text>
    </View>
  );
}

function Chart({ department }: { department: DepartmentDashboard }) {
  return (
    <View style={styles.chart}>
      {department.chart.map((value, index) => (
        <View key={`${department.id}-${index}`} style={styles.chartSlot}>
          <View
            style={[
              styles.chartBar,
              {
                height: `${value}%`,
                backgroundColor: index % 5 === 0 ? department.accent : department.color,
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

function Allocation({ department }: { department: DepartmentDashboard }) {
  return (
    <View style={styles.widget}>
      <View style={styles.widgetHeader}>
        <Gauge size={18} color={department.color} />
        <Text style={styles.widgetTitle}>AI Agent Allocation</Text>
      </View>
      {department.allocation.map((item) => (
        <View key={item.label} style={styles.progressRow}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>{item.label}</Text>
            <Text style={styles.progressValue}>{item.value}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${item.value}%`, backgroundColor: department.color }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

function Pipeline({ department }: { department: DepartmentDashboard }) {
  return (
    <View style={styles.widgetWide}>
      <View style={styles.widgetHeader}>
        <Route size={18} color={department.color} />
        <Text style={styles.widgetTitle}>{department.shortName} Execution Pipeline</Text>
      </View>
      <View style={styles.pipeline}>
        {department.pipeline.map((stage, index) => (
          <View key={stage} style={[styles.pipelineStage, { borderColor: department.color }]}>
            <Text style={styles.pipelineNumber}>0{index + 1}</Text>
            <Text style={styles.pipelineText}>{stage}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function DepartmentDashboardDetail({ department, onBack, onOpenDepartment }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={22} color="#d1fae5" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>
            DEPARTMENT {String(department.number).padStart(2, '0')} / {department.category.toUpperCase()} / LIVE
          </Text>
          <Text style={styles.title}>{department.name} Dashboard</Text>
          <Text style={styles.subtitle}>
            Separate command dashboard for this department's AI agents, employees, automation, execution pipeline, live signals, and operating risks.
          </Text>
        </View>
        <View style={[styles.livePill, { borderColor: department.color }]}>
          <Radio size={14} color={department.color} />
          <Text style={[styles.liveText, { color: department.color }]}>ACTIVE</Text>
        </View>
      </View>

      <View style={styles.heroGrid}>
        <View style={styles.hero}>
          <Text style={styles.panelLabel}>{department.headlineLabel}</Text>
          <Text style={[styles.heroValue, { color: department.color }]}>{department.headlineMetric}</Text>
          <Movement value={department.movement} />
          <Chart department={department} />
        </View>

        <View style={styles.metricStack}>
          <View style={styles.metricCard}>
            <Bot size={20} color={department.color} />
            <Text style={styles.metricValue}>{department.agents}</Text>
            <Text style={styles.metricLabel}>AI agents</Text>
          </View>
          <View style={styles.metricCard}>
            <Users size={20} color={department.accent} />
            <Text style={styles.metricValue}>{department.employees}</Text>
            <Text style={styles.metricLabel}>employees</Text>
          </View>
          <View style={styles.metricCard}>
            <Activity size={20} color="#34d399" />
            <Text style={styles.metricValue}>{department.automation}%</Text>
            <Text style={styles.metricLabel}>automation</Text>
          </View>
          <View style={styles.metricCard}>
            <AlertTriangle size={20} color={department.risk > 35 ? '#fb7185' : '#fbbf24'} />
            <Text style={styles.metricValue}>{department.risk}</Text>
            <Text style={styles.metricLabel}>risk index</Text>
          </View>
        </View>
      </View>

      <View style={styles.dashboardGrid}>
        <Pipeline department={department} />
        <Allocation department={department} />

        <View style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Activity size={18} color={department.color} />
            <Text style={styles.widgetTitle}>Live Signals</Text>
          </View>
          {department.signals.map((signal) => (
            <View key={signal.label} style={styles.signalRow}>
              <Text style={styles.signalLabel}>{signal.label}</Text>
              <Text
                style={[
                  styles.signalValue,
                  { color: signal.tone === 'down' ? '#fb7185' : signal.tone === 'up' ? '#34d399' : '#e5e7eb' },
                ]}
              >
                {signal.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.widget}>
          <View style={styles.widgetHeader}>
            <AlertTriangle size={18} color={department.accent} />
            <Text style={styles.widgetTitle}>Department Watchlist</Text>
          </View>
          {department.watchlist.map((item, index) => (
            <View key={item} style={styles.watchRow}>
              <Text style={[styles.watchIndex, { color: department.accent }]}>{index + 1}</Text>
              <Text style={styles.watchText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Briefcase size={18} color={department.color} />
            <Text style={styles.widgetTitle}>Department KPI</Text>
          </View>
          <Text style={[styles.bigKpi, { color: department.accent }]}>{department.secondaryMetric}</Text>
          <Text style={styles.kpiLabel}>{department.secondaryLabel}</Text>
          <View style={styles.kpiLine}>
            <Text style={styles.kpiSmall}>Efficiency</Text>
            <Text style={styles.kpiSmallValue}>{department.efficiency}%</Text>
          </View>
          <View style={styles.kpiLine}>
            <Text style={styles.kpiSmall}>Automation</Text>
            <Text style={styles.kpiSmallValue}>{department.automation}%</Text>
          </View>
        </View>

        <Pressable style={[styles.openButton, { borderColor: department.color }]} onPress={onOpenDepartment}>
          <Briefcase size={18} color={department.color} />
          <Text style={styles.openButtonText}>Open {department.shortName} Agent Department</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050807',
  },
  content: {
    padding: 18,
    paddingBottom: 46,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f3d33',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b1210',
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '900',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 4,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    maxWidth: 900,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#07140f',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '900',
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  hero: {
    flexGrow: 1,
    flexBasis: 560,
    backgroundColor: '#0b1210',
    borderWidth: 1,
    borderColor: '#17251f',
    borderRadius: 8,
    padding: 14,
    minHeight: 360,
  },
  panelLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heroValue: {
    fontSize: 50,
    lineHeight: 58,
    fontWeight: '900',
    marginTop: 6,
  },
  movement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  movementText: {
    fontSize: 13,
    fontWeight: '900',
  },
  chart: {
    flex: 1,
    minHeight: 220,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1f2937',
    paddingLeft: 8,
    paddingBottom: 8,
    marginTop: 8,
  },
  chartSlot: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#0f1a16',
  },
  chartBar: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  metricStack: {
    flexGrow: 1,
    flexBasis: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    flexGrow: 1,
    flexBasis: 130,
    backgroundColor: '#0b1210',
    borderWidth: 1,
    borderColor: '#17251f',
    borderRadius: 8,
    padding: 14,
    minHeight: 130,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 12,
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  widgetWide: {
    flexGrow: 1,
    flexBasis: 560,
    backgroundColor: '#0b1210',
    borderColor: '#17251f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  widget: {
    flexGrow: 1,
    flexBasis: 280,
    backgroundColor: '#0b1210',
    borderColor: '#17251f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  widgetTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '900',
  },
  pipeline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pipelineStage: {
    flexGrow: 1,
    flexBasis: 120,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#07100d',
    padding: 10,
  },
  pipelineNumber: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '900',
  },
  pipelineText: {
    color: '#e5e7eb',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 5,
  },
  progressRow: {
    marginBottom: 11,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  progressValue: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#111827',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#17251f',
    paddingVertical: 9,
  },
  signalLabel: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  signalValue: {
    fontSize: 13,
    fontWeight: '900',
  },
  watchRow: {
    flexDirection: 'row',
    gap: 9,
    paddingVertical: 8,
  },
  watchIndex: {
    width: 18,
    fontSize: 12,
    fontWeight: '900',
  },
  watchText: {
    flex: 1,
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  bigKpi: {
    fontSize: 36,
    fontWeight: '900',
  },
  kpiLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 14,
  },
  kpiLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#17251f',
    paddingTop: 9,
    marginTop: 8,
  },
  kpiSmall: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  kpiSmallValue: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '900',
  },
  openButton: {
    flexGrow: 1,
    flexBasis: 280,
    minHeight: 74,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#07100d',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 14,
  },
  openButtonText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '900',
  },
});
