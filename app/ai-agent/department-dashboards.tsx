import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  ChevronLeft,
  Gauge,
  LayoutGrid,
  Radio,
  Route,
  Sparkles,
  Users,
} from 'lucide-react-native';
import {
  DepartmentDashboard,
  departmentDashboardSummary,
  departmentDashboards,
} from '@/constants/departmentDashboards';

const formatSigned = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

function MetricCard({
  label,
  value,
  detail,
  color,
  tone = 'up',
}: {
  label: string;
  value: string;
  detail: string;
  color: string;
  tone?: 'up' | 'down';
}) {
  const ToneIcon = tone === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <ToneIcon size={16} color={tone === 'up' ? '#34d399' : '#fb7185'} />
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricDetail}>{detail}</Text>
    </View>
  );
}

function MiniChart({ values, color, accent }: { values: number[]; color: string; accent: string }) {
  return (
    <View style={styles.chartPanel}>
      <View style={styles.chartGrid}>
        {values.map((value, index) => (
          <View key={`${value}-${index}`} style={styles.chartColumn}>
            <View
              style={[
                styles.chartBar,
                {
                  height: `${value}%`,
                  backgroundColor: index % 5 === 0 ? accent : color,
                  opacity: index < values.length - 3 ? 0.7 : 1,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.chartFooter}>
        <Text style={styles.chartFooterText}>LIVE FEED</Text>
        <Text style={[styles.chartFooterText, { color }]}>12H SIGNAL</Text>
      </View>
    </View>
  );
}

function ProgressRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>{value}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function Pipeline({ department }: { department: DepartmentDashboard }) {
  return (
    <View style={styles.pipeline}>
      {department.pipeline.map((stage, index) => (
        <View key={stage} style={[styles.pipelineStage, { borderColor: department.color }]}>
          <Text style={styles.pipelineNumber}>0{index + 1}</Text>
          <Text style={styles.pipelineText}>{stage}</Text>
        </View>
      ))}
    </View>
  );
}

function DepartmentSwitcher({
  selectedId,
  onSelect,
  columns,
}: {
  selectedId: string;
  onSelect: (department: DepartmentDashboard) => void;
  columns: number;
}) {
  const cardWidth = columns >= 4 ? '24%' : columns === 3 ? '32%' : '48%';

  return (
    <View style={styles.switcherGrid}>
      {departmentDashboards.map((department) => {
        const isSelected = selectedId === department.id;
        return (
          <Pressable
            key={department.id}
            onPress={() => onSelect(department)}
            style={[
              styles.departmentTile,
              { width: cardWidth, borderColor: isSelected ? department.color : '#1f2937' },
              isSelected && { backgroundColor: '#10251d' },
            ]}
          >
            <View style={styles.tileTop}>
              <Text style={[styles.tileNumber, { color: department.color }]}>
                {String(department.number).padStart(2, '0')}
              </Text>
              <Text style={styles.tileAgents}>{department.agents} AI</Text>
            </View>
            <Text style={styles.tileName} numberOfLines={2}>{department.name}</Text>
            <Text style={styles.tileMeta}>{department.category}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function DepartmentDashboardsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<DepartmentDashboard>(departmentDashboards[14]);
  const columns = width >= 1180 ? 4 : width >= 820 ? 3 : 2;

  const riskTone = selected.risk > 35 ? 'down' : 'up';
  const summaryStats = useMemo(
    () => [
      { label: 'Departments', value: `${departmentDashboardSummary.departmentCount}`, detail: 'full operating map', icon: LayoutGrid },
      { label: 'AI Agents', value: `${departmentDashboardSummary.agentCount.toLocaleString()}`, detail: 'available workforce', icon: Bot },
      { label: 'Employees', value: `${departmentDashboardSummary.employeeCount.toLocaleString()}`, detail: 'human operators', icon: Users },
      { label: 'Automation', value: `${departmentDashboardSummary.averageAutomation}%`, detail: 'average coverage', icon: Sparkles },
    ],
    [],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={22} color="#d1fae5" />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>KAYTX AI AGENTS & EMPLOYEES</Text>
          <Text style={styles.title}>38 Department Command Dashboards</Text>
          <Text style={styles.subtitle}>
            Trading-style operational dashboards for AI agents, employees, workflow execution, risk, automation, and department performance.
          </Text>
        </View>
      </View>

      <View style={styles.summaryGrid}>
        {summaryStats.map((stat) => (
          <View key={stat.label} style={styles.summaryCard}>
            <stat.icon size={18} color="#34d399" />
            <Text style={styles.summaryValue}>{stat.value}</Text>
            <Text style={styles.summaryLabel}>{stat.label}</Text>
            <Text style={styles.summaryDetail}>{stat.detail}</Text>
          </View>
        ))}
      </View>

      <View style={styles.commandPanel}>
        <View style={styles.commandHeader}>
          <View>
            <Text style={styles.commandEyebrow}>
              DEPT {String(selected.number).padStart(2, '0')} / {selected.category.toUpperCase()} / LIVE
            </Text>
            <Text style={styles.commandTitle}>{selected.name}</Text>
          </View>
          <View style={[styles.livePill, { borderColor: selected.color }]}>
            <Radio size={14} color={selected.color} />
            <Text style={[styles.livePillText, { color: selected.color }]}>ACTIVE</Text>
          </View>
        </View>

        <View style={styles.heroGrid}>
          <View style={styles.heroPrimary}>
            <Text style={styles.heroLabel}>{selected.headlineLabel}</Text>
            <Text style={[styles.heroValue, { color: selected.color }]}>{selected.headlineMetric}</Text>
            <View style={styles.heroMovement}>
              <ArrowUpRight size={17} color="#34d399" />
              <Text style={styles.heroMovementText}>{formatSigned(selected.movement)} live movement</Text>
            </View>
            <MiniChart values={selected.chart} color={selected.color} accent={selected.accent} />
          </View>

          <View style={styles.heroSide}>
            <MetricCard
              label={selected.secondaryLabel}
              value={selected.secondaryMetric}
              detail={`${selected.agents} AI agents / ${selected.employees} employees`}
              color={selected.accent}
            />
            <MetricCard
              label="Automation"
              value={`${selected.automation}%`}
              detail="workflow coverage"
              color={selected.color}
            />
            <MetricCard
              label="Risk Index"
              value={`${selected.risk}`}
              detail={selected.risk > 35 ? 'heightened watch' : 'normal band'}
              color={selected.risk > 35 ? '#fb7185' : '#34d399'}
              tone={riskTone}
            />
          </View>
        </View>

        <View style={styles.panelGrid}>
          <View style={styles.widgetLarge}>
            <View style={styles.widgetHeader}>
              <Route size={18} color={selected.color} />
              <Text style={styles.widgetTitle}>Execution Pipeline</Text>
            </View>
            <Pipeline department={selected} />
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <Gauge size={18} color={selected.color} />
              <Text style={styles.widgetTitle}>Agent Allocation</Text>
            </View>
            {selected.allocation.map((item) => (
              <ProgressRow key={item.label} label={item.label} value={item.value} color={selected.color} />
            ))}
          </View>

          <View style={styles.widget}>
            <View style={styles.widgetHeader}>
              <Activity size={18} color={selected.color} />
              <Text style={styles.widgetTitle}>Live Signals</Text>
            </View>
            {selected.signals.map((signal) => (
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
              <AlertTriangle size={18} color={selected.accent} />
              <Text style={styles.widgetTitle}>Watchlist</Text>
            </View>
            {selected.watchlist.map((item, index) => (
              <View key={item} style={styles.watchRow}>
                <Text style={[styles.watchIndex, { color: selected.accent }]}>{index + 1}</Text>
                <Text style={styles.watchText}>{item}</Text>
              </View>
            ))}
          </View>

          <Pressable style={[styles.openDepartment, { borderColor: selected.color }]} onPress={() => router.push(selected.route as never)}>
            <Briefcase size={18} color={selected.color} />
            <Text style={styles.openDepartmentText}>Open {selected.shortName} Department</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.switcherHeader}>
        <Text style={styles.sectionTitle}>All 38 Departments</Text>
        <Text style={styles.sectionSubtitle}>Select any department to load its related dashboard.</Text>
      </View>
      <DepartmentSwitcher selectedId={selected.id} onSelect={setSelected} columns={columns} />
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
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    marginBottom: 18,
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
  headerText: {
    flex: 1,
  },
  eyebrow: {
    color: '#34d399',
    fontSize: 11,
    letterSpacing: 0,
    fontWeight: '800',
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
    marginTop: 8,
    maxWidth: 900,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  summaryCard: {
    minWidth: 150,
    flexGrow: 1,
    backgroundColor: '#0b1210',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  summaryValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
  },
  summaryLabel: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  summaryDetail: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 3,
  },
  commandPanel: {
    borderWidth: 1,
    borderColor: '#1f3d33',
    borderRadius: 8,
    backgroundColor: '#07100d',
    padding: 14,
    marginBottom: 18,
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  commandEyebrow: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
  },
  commandTitle: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  livePill: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#07140f',
  },
  livePillText: {
    fontSize: 11,
    fontWeight: '900',
  },
  heroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  heroPrimary: {
    flexGrow: 1,
    flexBasis: 520,
    minHeight: 330,
    backgroundColor: '#0b1210',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#17251f',
    padding: 14,
  },
  heroSide: {
    flexGrow: 1,
    flexBasis: 260,
    gap: 10,
  },
  heroLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  heroValue: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '900',
    marginTop: 6,
  },
  heroMovement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  heroMovementText: {
    color: '#34d399',
    fontSize: 13,
    fontWeight: '700',
  },
  metricCard: {
    backgroundColor: '#0b1210',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#17251f',
    padding: 14,
    minHeight: 103,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
  },
  metricDetail: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4,
  },
  chartPanel: {
    flex: 1,
    minHeight: 190,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#17251f',
    paddingTop: 14,
  },
  chartGrid: {
    flex: 1,
    minHeight: 170,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1f2937',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  chartColumn: {
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
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartFooterText: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '900',
  },
  panelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  widgetLarge: {
    flexGrow: 1,
    flexBasis: 520,
    backgroundColor: '#0b1210',
    borderColor: '#17251f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  widget: {
    flexGrow: 1,
    flexBasis: 260,
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
  progressLabelRow: {
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
    alignItems: 'center',
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
    alignItems: 'center',
    gap: 9,
    paddingVertical: 8,
  },
  watchIndex: {
    fontSize: 12,
    fontWeight: '900',
    width: 18,
  },
  watchText: {
    flex: 1,
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  openDepartment: {
    flexGrow: 1,
    flexBasis: 260,
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#07100d',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 14,
  },
  openDepartmentText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '900',
  },
  switcherHeader: {
    marginTop: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 4,
  },
  switcherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  departmentTile: {
    minHeight: 108,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#0b1210',
    padding: 11,
  },
  tileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tileNumber: {
    fontSize: 12,
    fontWeight: '900',
  },
  tileAgents: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '800',
  },
  tileName: {
    color: '#f8fafc',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '900',
  },
  tileMeta: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },
});
