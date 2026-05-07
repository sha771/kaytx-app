import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Svg, { Path, Rect, Text as SvgText, G } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, ZoomIn, ZoomOut, Search, X, GitBranch, Users,
  RotateCcw, Eye, EyeOff, ListFilter, ChevronRight, SlidersHorizontal,
  Crown, ChartBarBig, Activity, Shield, Zap, Briefcase, TrendingUp, House,
  Landmark, Factory, Truck, HeartPulse, Brain, Database, Megaphone,
  ShoppingCart, Headphones, Scale, Wrench, Lock, GraduationCap,
  Settings, Server, Link2, Layers, Share2, Target, Globe, Anchor,
  Plane, TrainFront, MapPin, Video, Stethoscope, Gavel, Flag, ScrollText,
  Building, CreditCard, Wallet, DollarSign, TrendingDown, Coins, Banknote,
  FileCheck, TriangleAlert, Siren, ShieldAlert, FingerprintPattern, ScanEye,
  Bot, Sparkles, Lightbulb, FileText, BookOpen, PenTool, Palette, Award,
  Medal, Star, Trophy, Pin, Bell, Info, LifeBuoy, Clock, Calendar,
  Gauge, Microscope, Telescope, SearchCheck, BadgeCheck, FileBadge,
  FileChartColumn, Boxes, Package, FolderCog, Workflow, Terminal,
  Clipboard, ClipboardList, ClipboardCheck, SquareCheck, CircleCheck,
  Receipt, Calculator, ChartLine, ChartPie, PiggyBank, Handshake,
  UserCheck, UserPlus, UserCog, UsersRound, Mail, MessageSquare,
  Ticket, Gift, Heart, Share, Inbox, Send, Hash, Radio, Phone,
  Cpu, HardDrive, Code, Rocket, Sun, Moon, Menu, Plus, Minus,
  ListFilter as FilterIcon,
} from 'lucide-react-native';
import {
  completeAIWorkforce,
  cSuiteExecutives,
  vpDirectors,
  managers,
  teamLeads,
  specialists,
  allNewDepartmentStaff,
  type AIEmployeeProfile
} from '@/constants/aiAgentHierarchyIndex_UPGRADED';
import {
  HIERARCHY_TIERS,
  INTELLIGENCE_LAYER,
  COMMAND_CENTER,
  LAYER_BRIDGE
} from '@/constants/aiAgentHierarchyIndex_UPGRADED';
import {
  departments,
  allCustomerExperienceAgents,
  workforceSummary,
  type MainAgent,
  type SubAgent
} from '@/constants/completeAIWorkforce_1108';
import Animated, { FadeIn, FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width: SW, height: SH } = Dimensions.get('window');
const NW = 120, NH = 52, LH = 140, SG = 16, TP = 48, LP = 40;

interface TNode {
  id: string; data: AIEmployeeProfile; children: TNode[];
  expanded: boolean; x: number; y: number; width: number;
}

// Complete AI Workforce - 600+ Agents
const ALL = completeAIWorkforce;
const MAP = new Map<string, AIEmployeeProfile>();
ALL.forEach(a => MAP.set(a.id, a));

// Enhanced Department Colors (22 Departments with 1108 Agents)
const DC: Record<string, string> = {
  executive:'#FFD700',                    // Gold
  finance:'#2E7D32',                    // Green
  technology:'#1565C0',                 // Blue
  marketing:'#E91E63',                  // Pink
  sales:'#FFA000',                      // Amber
  customer_experience:'#00BCD4',         // Cyan
  operations:'#607D8B',                 // Blue Grey
  human_resources:'#9C27B0',             // Purple
  legal_compliance:'#3F51B5',            // Indigo
  data_intelligence:'#AF52DE',           // Purple
  product:'#FF5722',                     // Deep Orange
  security:'#F44336',                    // Red
  research:'#009688',                   // Teal
  administrative:'#795548',             // Brown
  trading_investments:'#10B981',          // Emerald
  real_estate_property:'#8D6E63',        // Brown
  insurance_risk:'#FF7043',               // Deep Orange
  healthcare_medical:'#EC407A',           // Pink
  manufacturing_production:'#5C6BC0',     // Indigo
  transportation_logistics:'#26A69A',    // Teal
  government_public:'#78909C',            // Blue Grey
  customer_insights_analytics:'#42A5F5', // Light Blue
  supply_chain:'#42A5F5',                // Light Blue
  ai_governance:'#7C4DFF',               // Deep Purple
};

// Department ID mapping for 22 departments
const DEPT_MAP: Record<number, string> = {
  1: 'customer_experience',
  2: 'sales_revenue',
  3: 'marketing_growth',
  4: 'operations_management',
  5: 'finance_accounting',
  6: 'technology_engineering',
  7: 'human_resources',
  8: 'legal_compliance',
  9: 'data_intelligence',
  10: 'product_management',
  11: 'security_risk',
  12: 'research_development',
  13: 'administrative',
  14: 'trading_investments',
  15: 'real_estate_property',
  16: 'insurance_risk',
  17: 'healthcare_medical',
  18: 'manufacturing_production',
  19: 'transportation_logistics',
  20: 'government_public',
  21: 'supply_chain',
  22: 'ai_governance',
};

// Hierarchy Level Colors
const LEVEL_COLORS: Record<string, string> = {
  c_level: '#FF6B6B',      // Red
  vp_director: '#4ECDC4',  // Teal
  manager: '#45B7D1',      // Blue
  team_lead: '#96CEB4',    // Green
  specialist: '#FFEAA7',  // Yellow
};

// Agent Type Indicators
const TYPE_ICONS: Record<string, any> = {
  executive: Crown,
  vp_director: Star,
  manager: Users,
  team_lead: Target,
  specialist: Bot,
};

function buildTree(rootId: string, ex: Set<string>): TNode | null {
  const build = (id: string): TNode | null => {
    const d = MAP.get(id); if (!d) return null;
    const ch: TNode[] = [];
    if (ex.has(id) && d.directReports && d.directReports.length > 0) {
      d.directReports.forEach(cid => { const c = build(cid); if (c) ch.push(c); });
    }
    return { id, data: d, children: ch, expanded: ex.has(id), x:0, y:0, width:0 };
  };
  return build(rootId);
}

function comp(n: TNode | null, lv = 0): {w:number;h:number} {
  if (!n) return {w:0,h:0};
  let cw = 0, mh = 0;
  n.children.forEach((c, i) => { const r = comp(c, lv+1); cw += c.width; if (i < n.children.length-1) cw += SG; mh = Math.max(mh, r.h); });
  n.width = Math.max(NW + SG, cw);
  return { w: n.width, h: Math.max((lv+1)*LH + TP + NH, mh) };
}

function pos(n: TNode | null, sx: number, lv = 0): void {
  if (!n) return;
  n.y = lv * LH + TP;
  if (!n.children.length) { n.x = sx + n.width/2; return; }
  let cx = sx;
  n.children.forEach((c, i) => { pos(c, cx, lv+1); cx += c.width; if (i < n.children.length-1) cx += SG; });
  n.x = (n.children[0].x + n.children[n.children.length-1].x) / 2;
}

function flat(n: TNode | null): TNode[] { return n ? [n, ...n.children.flatMap(flat)] : []; }
function abbrev(t: string): string { return t.length <= 14 ? t : t.substring(0,13)+'…'; }

// Enhanced Connection Types
interface ExtraConn { from: TNode; to: TNode; type: 'escalation' | 'peer' | 'cross_dept' | 'a2a' | 'consult'; }

function getExtraConns(nodes: TNode[]): {
  esc: ExtraConn[];
  peer: ExtraConn[];
  crossDept: ExtraConn[];
  a2a: ExtraConn[];
  consult: ExtraConn[];
} {
  const map = new Map<string, TNode>();
  nodes.forEach(n => map.set(n.id, n));
  const esc: ExtraConn[] = [];
  const peer: ExtraConn[] = [];
  const crossDept: ExtraConn[] = [];
  const a2a: ExtraConn[] = [];
  const consult: ExtraConn[] = [];

  nodes.forEach(n => {
    // Escalation links (based on reportsTo relationship)
    if (n.data.reportsTo) {
      const t = map.get(n.data.reportsTo);
      if (t && t.id !== n.id) esc.push({ from: n, to: t, type: 'escalation' });
    }

    // Peer links (C-Level only)
    if (n.data.peerPositions && n.data.peerPositions.length > 0 && n.data.level === 'c_level') {
      n.data.peerPositions.forEach(pid => {
        const p = map.get(pid);
        if (p && p.id > n.id) peer.push({ from: n, to: p, type: 'peer' });
      });
    }

    // Cross-department links (same level, different department)
    if (n.data.level === 'vp_director' || n.data.level === 'manager') {
      nodes.forEach(other => {
        if (other.id !== n.id &&
            other.data.level === n.data.level &&
            other.data.department !== n.data.department &&
            other.id > n.id) {
          crossDept.push({ from: n, to: other, type: 'cross_dept' });
        }
      });
    }

    // A2A endpoint links
    if (n.data.a2aEndpoints && n.data.a2aEndpoints.length > 0) {
      // Connect to CEO for main agents
      const ceo = map.get('ceo');
      if (ceo && n.id !== 'ceo' && n.data.level === 'c_level') {
        a2a.push({ from: n, to: ceo, type: 'a2a' });
      }
    }

    // Consultation links (based on A2A endpoints)
    if (n.data.a2aEndpoints && n.data.a2aEndpoints.length > 0) {
      nodes.forEach(other => {
        if (other.id !== n.id && other.data.reportsTo === n.data.id) {
          consult.push({ from: n, to: other, type: 'consult' });
        }
      });
    }
  });

  return { esc, peer, crossDept, a2a, consult };
}

export default function MindMapScreen() {
  const ins = useSafeAreaInsets();
  const { theme } = useTheme();
  const { colors } = theme;
  const isD = colors.background === '#000000';

  const [zoom, setZoom] = useState(0.75);
  const [exIds, setExIds] = useState<Set<string>>(() => {
    const s = new Set<string>(['ceo']);
    cSuiteExecutives.forEach(a => s.add(a.id));
    vpDirectors.forEach(a => s.add(a.id));
    return s;
  });
  const [selId, setSelId] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [showS, setShowS] = useState(false);

  const tree = useMemo(() => buildTree('ceo', exIds), [exIds]);

  const { cw, ch, nodes, esc, peer, crossDept, a2a, consult } = useMemo(() => {
    if (!tree) return {
      cw: SW, ch: SH, nodes: [] as TNode[],
      esc: [] as ExtraConn[], peer: [] as ExtraConn[],
      crossDept: [] as ExtraConn[], a2a: [] as ExtraConn[],
      consult: [] as ExtraConn[]
    };
    comp(tree); pos(tree, LP);
    const nds = flat(tree);
    const { esc, peer, crossDept, a2a, consult } = getExtraConns(nds);
    let mx = 0, my = 0;
    nds.forEach(n => { mx = Math.max(mx, n.x + NW); my = Math.max(my, n.y + NH); });
    return {
      cw: Math.max(mx + LP, SW * 1.2) * zoom,
      ch: Math.max(my + TP + 100, SH * 1.2) * zoom,
      nodes: nds,
      esc, peer, crossDept, a2a, consult,
    };
  }, [tree, zoom]);

  const toggle = useCallback((id: string) => {
    setExIds(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const selNode = useMemo(() => nodes.find(n => n.id === selId)?.data ?? null, [nodes, selId]);
  const ql = q.toLowerCase();
  const mids = useMemo(() => {
    if (!ql) return new Set<string>();
    return new Set(ALL.filter(a => a.name.toLowerCase().includes(ql) || a.title.toLowerCase().includes(ql)).map(a => a.id));
  }, [ql]);

  const bg = isD ? '#000000' : '#FFFFFF';
  const fg = isD ? '#FFFFFF' : '#000000';
  const card = isD ? '#1C1C1E' : '#F2F2F7';
  const line = isD ? '#333333' : '#E5E5EA';

  // Stats for 1108 agents
  const stats1108 = useMemo(() => ({
    totalAgents: workforceSummary.totalAgents,
    mainAgents: workforceSummary.totalMainAgents,
    subAgents: workforceSummary.totalSubAgents,
    departments: departments.length,
  }), []);

  return (
    <View style={[st.container, { backgroundColor: bg, paddingTop: ins.top }]}>
      <View style={[st.header, { borderBottomColor: line }]}>
        <TouchableOpacity onPress={() => router.back()} style={st.hBtn}><ArrowLeft size={22} color={colors.primary} /></TouchableOpacity>
        <View style={st.hCenter}><GitBranch size={18} color={colors.primary} /><Text style={[st.hTitle, { color: fg }]}>AI Workforce Map</Text></View>
        <TouchableOpacity onPress={() => setShowS(!showS)} style={st.hBtn}><Search size={20} color={fg} /></TouchableOpacity>
      </View>

      {showS && (
        <View style={[st.sBox, { backgroundColor: card, borderColor: line }]}>
          <Search size={16} color={colors.secondaryText} />
          <TextInput value={q} onChangeText={setQ} placeholder="Search agents..." placeholderTextColor={colors.secondaryText} style={[st.sInp, { color: fg }]} />
          {q ? <TouchableOpacity onPress={() => setQ('')}><X size={16} color={fg} /></TouchableOpacity> : null}
        </View>
      )}

      {/* Department Filter Chips - 22 Departments */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {departments.map((dept) => (
            <TouchableOpacity 
              key={dept.id} 
              style={[st.deptChip, { backgroundColor: dept.color + '22', borderColor: dept.color + '44' }]}
              onPress={() => router.push(`/ai-agent/${DEPT_MAP[dept.id]}`)}
            >
              <View style={[st.deptDot, { backgroundColor: dept.color }]} />
              <Text style={[st.deptChipT, { color: dept.color }]}>
                {dept.shortName} ({dept.total})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={st.statsRow}>
        <View style={[st.pill, { backgroundColor: card }]}><Users size={14} color={colors.primary} /><Text style={[st.pillT, { color: fg }]}>{stats1108.totalAgents} Agents</Text></View>
        <View style={[st.pill, { backgroundColor: card }]}><Crown size={14} color={colors.success} /><Text style={[st.pillT, { color: fg }]}>{stats1108.mainAgents} Main</Text></View>
        <View style={[st.pill, { backgroundColor: card }]}><Bot size={14} color={colors.warning} /><Text style={[st.pillT, { color: fg }]}>{stats1108.subAgents} Sub</Text></View>
        <View style={[st.pill, { backgroundColor: card }]}><Layers size={14} color={colors.info || '#0A84FF'} /><Text style={[st.pillT, { color: fg }]}>{stats1108.departments} Depts</Text></View>
        <View style={[st.pill, { backgroundColor: card }]}><GitBranch size={14} color={colors.success} /><Text style={[st.pillT, { color: fg }]}>{nodes.length} Visible</Text></View>
        <TouchableOpacity onPress={() => setZoom(Math.max(0.35, zoom - 0.15))} style={[st.zBtn, { backgroundColor: card }]}><ZoomOut size={16} color={fg} /></TouchableOpacity>
        <TouchableOpacity onPress={() => setZoom(Math.min(2.2, zoom + 0.15))} style={[st.zBtn, { backgroundColor: card }]}><ZoomIn size={16} color={fg} /></TouchableOpacity>
      </View>

      {/* Enhanced Legend with All Connection Types */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[st.legend, { borderBottomColor: line }]}>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#88888888' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Reports</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#FF9500' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Escalation</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#0A84FF' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Peer</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#10B981' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Cross-Dept</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#8B5CF6' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>A2A</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#EC4899' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Consult</Text></View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={{ width: cw }}>
          <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ height: ch }}>
            <Svg width={cw} height={ch}>
              <G scale={zoom}>
                {/* Connections */}
                {nodes.flatMap(n => n.children.map((c, i) => (
                  <Path key={`${n.id}-${c.id}-${i}`}
                    d={`M${n.x},${n.y+NH} C${n.x},${n.y+NH+LH/2} ${c.x},${c.y-LH/2} ${c.x},${c.y}`}
                    stroke="#88888888" strokeWidth={1.5} fill="none"
                  />
                )))}

                {/* Escalation Links */}
                {esc.map((c, i) => (
                  <Path key={`esc-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#FF9500" strokeWidth={1.5} fill="none" strokeDasharray="4,4" opacity={0.7}
                  />
                ))}

                {/* Peer Links (C-Suite) */}
                {peer.map((c, i) => (
                  <Path key={`peer-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#0A84FF" strokeWidth={1.5} fill="none" strokeDasharray="2,4" opacity={0.5}
                  />
                ))}

                {/* Cross-Department Links */}
                {crossDept.map((c, i) => (
                  <Path key={`cross-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#10B981" strokeWidth={1} fill="none" strokeDasharray="3,6" opacity={0.4}
                  />
                ))}

                {/* A2A Endpoint Links */}
                {a2a.map((c, i) => (
                  <Path key={`a2a-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#8B5CF6" strokeWidth={1.5} fill="none" strokeDasharray="5,3" opacity={0.5}
                  />
                ))}

                {/* Consultation Links */}
                {consult.map((c, i) => (
                  <Path key={`consult-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#EC4899" strokeWidth={1} fill="none" strokeDasharray="2,2" opacity={0.5}
                  />
                ))}

                {/* Nodes */}
                {nodes.map(n => {
                  const isS = n.id === selId;
                  const isH = mids.has(n.id);
                  const col = DC[n.data.department] || colors.primary;
                  const hasCh = n.data.directReports && n.data.directReports.length > 0 && n.data.directReports.some(cid => MAP.has(cid));
                  const nx = n.x - NW/2, ny = n.y;
                  return (
                    <G key={n.id}>
                      {(isS || isH) && <Rect x={nx-4} y={ny-4} width={NW+8} height={NH+8} rx={12} fill={col} opacity={0.25} />}
                      <Rect x={nx} y={ny} width={NW} height={NH} rx={8} fill={isD ? '#1C1C1E' : '#FFFFFF'} stroke={isS ? col : line} strokeWidth={isS ? 2 : 1} />
                      <Rect x={nx} y={ny} width={4} height={NH} rx={2} fill={col} />
                      <SvgText x={nx + 12} y={ny + 18} fontSize={11} fontWeight="600" fill={fg}>{abbrev(n.data.name.replace('AI ',''))}</SvgText>
                      <SvgText x={nx + 12} y={ny + 34} fontSize={9} fill={colors.secondaryText}>{abbrev(n.data.title)}</SvgText>
                      {hasCh && (
                        <G onPress={() => toggle(n.id)}>
                          <Rect x={nx + NW - 20} y={ny + NH - 18} width={16} height={16} rx={4} fill={col} opacity={0.2} />
                          <SvgText x={nx + NW - 12} y={ny + NH - 6} fontSize={10} fill={col} textAnchor="middle">{n.expanded ? '-' : '+'}</SvgText>
                        </G>
                      )}
                      <G onPress={() => setSelId(n.id === selId ? null : n.id)}>
                        <Rect x={nx} y={ny} width={NW} height={NH} rx={8} fill="transparent" />
                      </G>
                    </G>
                  );
                })}
              </G>
            </Svg>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Enhanced Detail Panel */}
      {selNode && (
        <View style={[st.panel, { backgroundColor: card, borderTopColor: line }]}>
          <View style={st.pHead}>
            <View style={[st.pDot, { backgroundColor: DC[selNode.department] || colors.primary }]} />
            <Text style={[st.pName, { color: fg }]}>{selNode.name}</Text>
            <TouchableOpacity onPress={() => setSelId(null)} style={st.pClose}><X size={18} color={fg} /></TouchableOpacity>
          </View>
          <Text style={[st.pTitle, { color: colors.secondaryText }]}>{selNode.title}</Text>
          <Text style={[st.pDesc, { color: colors.secondaryText }]} numberOfLines={2}>{selNode.description}</Text>

          {/* Hierarchy & Level Info */}
          <View style={st.pRow}>
            <View style={[st.pPill, { backgroundColor: LEVEL_COLORS[selNode.level] || colors.primary + '44' }]}>
              <Text style={[st.pPillT, { color: fg }]}>{selNode.level.replace(/_/g,' ').toUpperCase()}</Text>
            </View>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}>
              <Text style={[st.pPillT, { color: fg }]}>{selNode.department.replace(/_/g,' ')}</Text>
            </View>
          </View>

          {/* Cost Info */}
          <View style={st.pRow}>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}>
              <DollarSign size={10} color={colors.success} />
              <Text style={[st.pPillT, { color: colors.success }]}>{selNode.aiCost}</Text>
            </View>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}>
              <TrendingUp size={10} color={colors.success} />
              <Text style={[st.pPillT, { color: colors.success }]}>{selNode.efficiency}</Text>
            </View>
            {selNode.dangerLevel && (
              <View style={[st.pPill, { backgroundColor: selNode.dangerLevel === 'critical' ? '#FF444433' : selNode.dangerLevel === 'high' ? '#FF880033' : '#88888833' }]}>
                <ShieldAlert size={10} color={selNode.dangerLevel === 'critical' ? '#FF4444' : selNode.dangerLevel === 'high' ? '#FF8800' : '#888888'} />
                <Text style={[st.pPillT, { color: selNode.dangerLevel === 'critical' ? '#FF4444' : selNode.dangerLevel === 'high' ? '#FF8800' : '#888888' }]}>{selNode.dangerLevel}</Text>
              </View>
            )}
          </View>

          {/* Links & Connections */}
          <View style={st.pRow}>
            {selNode.reportsTo && (
              <View style={[st.pPill, { backgroundColor: '#FF950022' }]}>
                <Link2 size={10} color="#FF9500" />
                <Text style={[st.pPillT, { color: '#FF9500' }]}>Reports to: {selNode.reportsTo}</Text>
              </View>
            )}
            {selNode.directReports && selNode.directReports.length > 0 && (
              <View style={[st.pPill, { backgroundColor: '#0A84FF22' }]}>
                <Users size={10} color="#0A84FF" />
                <Text style={[st.pPillT, { color: '#0A84FF' }]}>{selNode.directReports.length} Reports</Text>
              </View>
            )}
          </View>

          {/* A2A Endpoints & Agent Types */}
          {selNode.a2aEndpoints && selNode.a2aEndpoints.length > 0 && (
            <View style={st.pRow}>
              <View style={[st.pPill, { backgroundColor: '#8B5CF622' }]}>
                <Share2 size={10} color="#8B5CF6" />
                <Text style={[st.pPillT, { color: '#8B5CF6' }]}>{selNode.a2aEndpoints.length} A2A</Text>
              </View>
              {selNode.agentTypes && selNode.agentTypes.length > 0 && (
                <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}>
                  <Bot size={10} color={colors.primary} />
                  <Text style={[st.pPillT, { color: fg }]}>{selNode.agentTypes.join(', ')}</Text>
                </View>
              )}
            </View>
          )}

          {/* Route */}
          {selNode.route && (
            <TouchableOpacity
              style={[st.routeBtn, { backgroundColor: colors.primary + '22' }]}
              onPress={() => router.push(selNode.route as any)}
            >
              <Globe size={12} color={colors.primary} />
              <Text style={[st.routeBtnText, { color: colors.primary }]}>Open Agent Page</Text>
              <ChevronRight size={12} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1 },
  hBtn: { padding: 8 },
  hCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hTitle: { fontSize: 17, fontWeight: '700' },
  sBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12, marginVertical: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, gap: 8 },
  sInp: { flex: 1, fontSize: 14, padding: 0 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16 },
  pillT: { fontSize: 12, fontWeight: '600' },
  zBtn: { padding: 6, borderRadius: 8 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 6, borderBottomWidth: 1 },
  li: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ld: { width: 12, height: 3, borderRadius: 2 },
  lt: { fontSize: 10 },
  panel: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24, borderTopWidth: 1 },
  pHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pDot: { width: 10, height: 10, borderRadius: 5 },
  pName: { flex: 1, fontSize: 16, fontWeight: '700' },
  pClose: { padding: 4 },
  pTitle: { fontSize: 13, marginBottom: 4 },
  pDesc: { fontSize: 12, lineHeight: 18, marginBottom: 8 },
  pRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 6 },
  pPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  pPillT: { fontSize: 10, fontWeight: '600' },
  deptChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1 },
  deptDot: { width: 6, height: 6, borderRadius: 3 },
  deptChipT: { fontSize: 11, fontWeight: '600' },
  routeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 8 },
  routeBtnText: { fontSize: 12, fontWeight: '600' },
});
