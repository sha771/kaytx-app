import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Radio,
  AlertTriangle,
  Activity,
  Zap,
  Users,
  Shield,
  Layers,
  Terminal,
  ChevronRight,
} from 'lucide-react-native';
import { getDepartmentDashboard } from '@/constants/departmentDashboards';

// Interface for agent item
interface AgentItem {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  icon?: any;
  color?: string;
  level?: string;
  efficiency?: string;
  route?: string;
}

interface DepartmentDashboardViewProps {
  departmentId: string;
  agents: AgentItem[];
}

export default function DepartmentDashboardView({ departmentId, agents }: DepartmentDashboardViewProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [time, setTime] = useState('');

  // Find department config
  const dept = getDepartmentDashboard(departmentId);
  const color = dept.color || '#10b981';
  const accent = dept.accent || '#ef4444';

  // Live timer simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format signed numbers
  const formatSigned = (val: number) => `${val > 0 ? '+' : ''}${val.toFixed(2)}%`;

  // Mini Chart data mapping (for SVG line)
  const chartPoints = dept.chart || [30, 45, 35, 60, 50, 75, 65, 90, 85, 95];
  const maxVal = Math.max(...chartPoints);
  const minVal = Math.min(...chartPoints);
  const spread = maxVal - minVal || 1;

  // Render SVG Sparkline
  const chartWidth = width > 800 ? 550 : width - 64;
  const chartHeight = 130;
  const points = chartPoints.map((val, index) => {
    const x = (index / (chartPoints.length - 1)) * chartWidth;
    const y = chartHeight - 10 - ((val - minVal) / spread) * (chartHeight - 20);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : '';

  // Grid columns count
  const agentColumns = width >= 1024 ? 3 : width >= 768 ? 2 : 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. Header Command Ribbon */}
      <View style={styles.ribbon}>
        <View style={styles.ribbonLeft}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={16} color="#d1fae5" />
          </Pressable>
          <View>
            <View style={styles.breadRow}>
              <Text style={styles.breadText}>KAYTX NETWORK</Text>
              <ChevronRight size={10} color="#34d399" />
              <Text style={[styles.breadText, { color }]}>{dept.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>
              DEPT-{String(dept.number).padStart(2, '0')} // {dept.shortName.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.ribbonRight}>
          <View style={styles.timeBox}>
            <Terminal size={12} color="#64748b" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={[styles.statusPill, { borderColor: color }]}>
            <Radio size={12} color={color} />
            <Text style={[styles.statusText, { color }]}>SYS_ACTIVE</Text>
          </View>
        </View>
      </View>

      {/* 2. Top Analytics Panel Grid */}
      <View style={styles.topStatsGrid}>
        {/* Realized Metric Dial Card */}
        <View style={styles.pnlCard}>
          <Text style={styles.cardLabel}>{dept.headlineLabel.toUpperCase()}</Text>
          <Text style={[styles.largeDigitalText, { color }]}>{dept.headlineMetric}</Text>
          <View style={styles.trendRow}>
            {dept.movement >= 0 ? (
              <ArrowUpRight size={14} color="#34d399" />
            ) : (
              <ArrowDownRight size={14} color="#fb7185" />
            )}
            <Text style={[styles.trendText, { color: dept.movement >= 0 ? '#34d399' : '#fb7185' }]}>
              {formatSigned(dept.movement)} (24H)
            </Text>
          </View>
        </View>

        {/* Circular Progress (Automation Coverage) */}
        <View style={styles.progressCard}>
          <View style={styles.progressTextWrap}>
            <Text style={styles.cardLabel}>AUTO COVERAGE</Text>
            <Text style={styles.dialValueText}>{dept.automation}%</Text>
          </View>
          <Svg width={76} height={76} style={styles.dialSvg}>
            <Circle cx="38" cy="38" r="30" stroke="#1f2937" strokeWidth="6" fill="transparent" />
            <Circle
              cx="38"
              cy="38"
              r="30"
              stroke={color}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 30}`}
              strokeDashoffset={`${2 * Math.PI * 30 * (1 - dept.automation / 100)}`}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Risk Telemetry Card */}
        <View style={styles.riskCard}>
          <Text style={styles.cardLabel}>SECURITY RISK BAND</Text>
          <Text style={[styles.riskValueText, { color: dept.risk > 35 ? '#fb7185' : '#34d399' }]}>
            {dept.risk}
          </Text>
          <View style={styles.riskStatusRow}>
            <AlertTriangle size={12} color={dept.risk > 35 ? '#fb7185' : '#34d399'} />
            <Text style={[styles.riskStatusText, { color: dept.risk > 35 ? '#fb7185' : '#34d399' }]}>
              {dept.risk > 35 ? 'CRITICAL_WATCH' : 'NOMINAL_BAND'}
            </Text>
          </View>
        </View>

        {/* Secondary KPI Card */}
        <View style={styles.statMiniCard}>
          <Text style={styles.cardLabel}>{dept.secondaryLabel.toUpperCase()}</Text>
          <Text style={[styles.miniDigitalText, { color: accent }]}>{dept.secondaryMetric}</Text>
          <Text style={styles.miniDetailText}>
            {dept.agents} AI / {dept.employees} HU
          </Text>
        </View>
      </View>

      {/* 3. Middle Visualization Row */}
      <View style={styles.visRow}>
        {/* Live Sparkline Graph */}
        <View style={styles.chartPanel}>
          <View style={styles.panelHeader}>
            <Activity size={14} color={color} />
            <Text style={styles.panelTitle}>LIVE ACTIVITY TELEMETRY FEED (12H)</Text>
          </View>
          <View style={styles.svgWrapper}>
            <Svg width={chartWidth} height={chartHeight}>
              <Defs>
                <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={color} stopOpacity="0.25" />
                  <Stop offset="100%" stopColor={color} stopOpacity="0.0" />
                </LinearGradient>
              </Defs>
              {/* Grid Lines */}
              <Line x1="0" y1="30" x2={chartWidth} y2="30" stroke="#111c18" strokeWidth="1" />
              <Line x1="0" y1="65" x2={chartWidth} y2="65" stroke="#111c18" strokeWidth="1" />
              <Line x1="0" y1="100" x2={chartWidth} y2="100" stroke="#111c18" strokeWidth="1" />
              {/* Path Area */}
              <Path d={areaPath} fill="url(#areaGrad)" />
              {/* Line Path */}
              <Path d={linePath} fill="none" stroke={color} strokeWidth="2" />
            </Svg>
          </View>
        </View>

        {/* Win Stack (Horizontal ledgers) */}
        <View style={styles.winStackPanel}>
          <View style={styles.panelHeader}>
            <Layers size={14} color={color} />
            <Text style={styles.panelTitle}>THROUGHPUT PIPELINE CAPACITY</Text>
          </View>
          <View style={styles.stackContent}>
            {[10, 8, 7, 9, 6].map((blocks, rIdx) => (
              <View key={rIdx} style={styles.stackRow}>
                <Text style={styles.stackRowLabel}>CH_0{rIdx + 1}</Text>
                <View style={styles.blocksContainer}>
                  {Array.from({ length: 12 }).map((_, bIdx) => (
                    <View
                      key={bIdx}
                      style={[
                        styles.block,
                        {
                          backgroundColor: bIdx < blocks ? color : '#111827',
                          borderColor: bIdx < blocks ? color : '#1f2937',
                          opacity: bIdx < blocks ? 1 - bIdx * 0.05 : 0.4,
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 4. 6-Cycle Execution Pipeline */}
      <View style={styles.pipelineSection}>
        <View style={styles.panelHeader}>
          <Zap size={14} color={color} />
          <Text style={styles.panelTitle}>6-CYCLE EXECUTION PIPELINE STEPS</Text>
        </View>
        <View style={styles.pipelineRow}>
          {dept.pipeline.map((stage, index) => (
            <View key={stage} style={[styles.pipelineBlock, { borderColor: color }]}>
              <View style={styles.pipelineHeader}>
                <Text style={styles.pipelineIdx}>STG_0{index + 1}</Text>
                <View style={[styles.pipelineDot, { backgroundColor: color }]} />
              </View>
              <Text style={styles.pipelineName}>{stage.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 5. Widgets Grid (Signals, Watchlist, Allocations) */}
      <View style={styles.widgetsGrid}>
        {/* Live Signals */}
        <View style={styles.widgetCard}>
          <View style={styles.panelHeader}>
            <Activity size={14} color={color} />
            <Text style={styles.panelTitle}>ACTIVE SIGNALS</Text>
          </View>
          <View style={styles.widgetList}>
            {dept.signals.map((sig) => (
              <View key={sig.label} style={styles.tableRow}>
                <Text style={styles.tableLabel}>{sig.label}</Text>
                <Text
                  style={[
                    styles.tableValue,
                    { color: sig.tone === 'up' ? '#34d399' : sig.tone === 'down' ? '#fb7185' : '#94a3b8' },
                  ]}
                >
                  {sig.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Watchlist */}
        <View style={styles.widgetCard}>
          <View style={styles.panelHeader}>
            <AlertTriangle size={14} color={accent} />
            <Text style={[styles.panelTitle, { color: accent }]}>CRITICAL WATCHLIST</Text>
          </View>
          <View style={styles.widgetList}>
            {dept.watchlist.map((item, index) => (
              <View key={item} style={styles.watchRow}>
                <Text style={[styles.watchIdxText, { color: accent }]}>[0{index + 1}]</Text>
                <Text style={styles.watchText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Agent Allocations */}
        <View style={styles.widgetCard}>
          <View style={styles.panelHeader}>
            <Users size={14} color={color} />
            <Text style={styles.panelTitle}>RESOURCE ALLOCATIONS</Text>
          </View>
          <View style={styles.widgetList}>
            {dept.allocation.map((item) => (
              <View key={item.label} style={styles.allocationRow}>
                <View style={styles.allocHeader}>
                  <Text style={styles.allocLabel}>{item.label}</Text>
                  <Text style={styles.allocVal}>{item.value}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${item.value}%`, backgroundColor: color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 6. AI Agent Workforce Listing */}
      <View style={styles.agentsSection}>
        <View style={styles.agentsHeaderRow}>
          <View style={styles.agentsHeaderLeft}>
            <Users size={20} color={color} />
            <View style={styles.agentsHeaderTextCol}>
              <Text style={styles.agentsSectionTitle}>AI Agent Workforce Directory</Text>
              <Text style={styles.agentsSectionSub}>
                Deploy, monitor, and configure autonomous agents and employees assigned to this desk.
              </Text>
            </View>
          </View>
          <Text style={[styles.agentsCountBadge, { borderColor: color, color }]}>
            {agents.length} AGENTS ACTIVE
          </Text>
        </View>

        <View style={styles.agentsGrid}>
          {agents.map((agent) => {
            const agentRoute = agent.route || `/ai-agent/${departmentId}/${agent.id}`;
            const displayTitle = agent.title || agent.name || 'AI Agent';
            const levelText = (agent.level || 'AGENT').replace('_', ' ').toUpperCase();
            
            return (
              <Pressable
                key={agent.id}
                style={({ pressed }) => [
                  styles.agentCard,
                  {
                    width: agentColumns === 3 ? '32.3%' : agentColumns === 2 ? '49%' : '100%',
                    borderColor: pressed ? color : '#111c18',
                    backgroundColor: pressed ? '#0b1613' : '#080d0c',
                  },
                ]}
                onPress={() => router.push(agentRoute as any)}
              >
                <View style={styles.agentCardHeader}>
                  <View style={[styles.agentIconBox, { backgroundColor: '#11221c' }]}>
                    <Terminal size={18} color={color} />
                  </View>
                  <View style={[styles.levelBadge, { backgroundColor: '#111e1a', borderColor: '#1f3d33' }]}>
                    <Text style={[styles.levelBadgeText, { color }]}>{levelText}</Text>
                  </View>
                </View>

                <Text style={styles.agentCardTitle} numberOfLines={1}>
                  {displayTitle}
                </Text>
                <Text style={styles.agentCardDesc} numberOfLines={2}>
                  {agent.description || `Autonomous workforce agent supporting ${dept.name} operations.`}
                </Text>

                <View style={styles.agentCardFooter}>
                  <Text style={styles.efficiencyLabel}>ACCURACY_RATING</Text>
                  <Text style={[styles.efficiencyValue, { color }]}>
                    {agent.efficiency || '98.4%'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050807',
  },
  content: {
    padding: 16,
    paddingBottom: 64,
    gap: 16,
  },
  // Header Command Ribbon
  ribbon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#111c18',
    paddingBottom: 14,
  },
  ribbonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#112c20',
    backgroundColor: '#091511',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  breadText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#f8fafc',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  ribbonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0b0f0e',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  timeText: {
    color: '#94a3b8',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#07120e',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // Top stats grid
  topStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pnlCard: {
    flexGrow: 1,
    flexBasis: 220,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  cardLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  largeDigitalText: {
    fontSize: 34,
    fontWeight: '900',
    fontFamily: 'monospace',
    lineHeight: 40,
    marginTop: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressCard: {
    flexGrow: 1,
    flexBasis: 160,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTextWrap: {
    flex: 1,
  },
  dialValueText: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 6,
  },
  dialSvg: {
    marginLeft: 8,
  },
  riskCard: {
    flexGrow: 1,
    flexBasis: 180,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  riskValueText: {
    fontSize: 32,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 6,
  },
  riskStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  riskStatusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  statMiniCard: {
    flexGrow: 1,
    flexBasis: 160,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  miniDigitalText: {
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 8,
  },
  miniDetailText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  // Middle Visual Row
  visRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chartPanel: {
    flexGrow: 2,
    flexBasis: 480,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderColor: '#111c18',
    paddingBottom: 8,
    marginBottom: 10,
  },
  panelTitle: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  svgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winStackPanel: {
    flexGrow: 1,
    flexBasis: 280,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  stackContent: {
    gap: 10,
  },
  stackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stackRowLabel: {
    width: 48,
    color: '#64748b',
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '800',
  },
  blocksContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  block: {
    flex: 1,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
  },
  // Pipeline
  pipelineSection: {
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  pipelineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pipelineBlock: {
    flexGrow: 1,
    flexBasis: 100,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#050a08',
  },
  pipelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pipelineIdx: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  pipelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pipelineName: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 4,
  },
  // Widgets Grid
  widgetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  widgetCard: {
    flexGrow: 1,
    flexBasis: 240,
    backgroundColor: '#080d0c',
    borderColor: '#111c18',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  widgetList: {
    gap: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#111c18',
    paddingBottom: 6,
  },
  tableLabel: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '700',
  },
  tableValue: {
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  watchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderColor: '#111c18',
    paddingBottom: 6,
  },
  watchIdxText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  watchText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  allocationRow: {
    marginBottom: 2,
  },
  allocHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  allocLabel: {
    color: '#d1d5db',
    fontSize: 11,
    fontWeight: '700',
  },
  allocVal: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#111827',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  // Agents Section
  agentsSection: {
    marginTop: 8,
    gap: 16,
  },
  agentsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  agentsHeaderTextCol: {
    flex: 1,
  },
  agentsSectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '900',
  },
  agentsSectionSub: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  agentsCountBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontWeight: '900',
    backgroundColor: '#07120e',
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    minHeight: 126,
    justifyContent: 'space-between',
  },
  agentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  agentIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  levelBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  agentCardTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  agentCardDesc: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    flex: 1,
  },
  agentCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#111c18',
    paddingTop: 8,
    marginTop: 10,
  },
  efficiencyLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '800',
  },
  efficiencyValue: {
    fontSize: 11,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
});
