import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Svg, { Path, Rect, Text as SvgText, G } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  ArrowLeft, ZoomIn, ZoomOut, Search, X, GitBranch, Users,
  RotateCcw, Eye, EyeOff, ListFilter, ChevronRight, SlidersHorizontal,
  Crown, ChartBar, Activity, Shield, Zap, Briefcase, TrendingUp, House,
  Landmark, Factory, Truck, HeartPulse, Brain, Database, Megaphone,
  ShoppingCart, Headphones, Scale, Wrench, Lock, GraduationCap,
  Settings, Server,
} from 'lucide-react-native';
import { cSuiteExecutives, vpDirectors, managers, teamLeads, specialists, AIEmployeeProfile } from '@/constants/aiAgentHierarchyIndex';
import Animated, { FadeIn, FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width: SW, height: SH } = Dimensions.get('window');
const NW = 120, NH = 52, LH = 140, SG = 16, TP = 48, LP = 40;

interface TNode {
  id: string; data: AIEmployeeProfile; children: TNode[];
  expanded: boolean; x: number; y: number; width: number;
}

const ALL = [...cSuiteExecutives, ...vpDirectors, ...managers, ...teamLeads, ...specialists];
const MAP = new Map<string, AIEmployeeProfile>();
ALL.forEach(a => MAP.set(a.id, a));

const DC: Record<string, string> = {
  executive:'#FFD700', finance:'#2E7D32', technology:'#1565C0', marketing:'#E91E63',
  sales:'#FFA000', customer_experience:'#00BCD4', operations:'#607D8B',
  human_resources:'#9C27B0', legal_compliance:'#3F51B5', data_intelligence:'#AF52DE',
  product:'#FF5722', security:'#F44336', research:'#009688', administrative:'#795548',
  trading_investments:'#10B981', real_estate_property:'#8D6E63', insurance_risk:'#FF7043',
  healthcare_medical:'#EC407A', manufacturing_production:'#5C6BC0',
  transportation_logistics:'#26A69A', government_public:'#78909C',
  customer_insights_analytics:'#42A5F5',
};

function buildTree(rootId: string, ex: Set<string>): TNode | null {
  const build = (id: string): TNode | null => {
    const d = MAP.get(id); if (!d) return null;
    const ch: TNode[] = [];
    if (ex.has(id) && d.orgChart?.directReports) {
      d.orgChart.directReports.forEach(cid => { const c = build(cid); if (c) ch.push(c); });
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

interface ExtraConn { from: TNode; to: TNode; }
function getExtraConns(nodes: TNode[]): { esc: ExtraConn[]; peer: ExtraConn[] } {
  const map = new Map<string, TNode>();
  nodes.forEach(n => map.set(n.id, n));
  const esc: ExtraConn[] = [];
  const peer: ExtraConn[] = [];
  nodes.forEach(n => {
    if (n.data.canEscalateTo) {
      n.data.canEscalateTo.forEach(tid => {
        const t = map.get(tid);
        if (t && t.id !== n.id) esc.push({ from: n, to: t });
      });
    }
    if (n.data.orgChart?.peerPositions && n.data.level === 'c_level') {
      n.data.orgChart.peerPositions.forEach(pid => {
        const p = map.get(pid);
        if (p && p.id > n.id) peer.push({ from: n, to: p });
      });
    }
  });
  return { esc, peer };
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

  const { cw, ch, nodes, esc, peer } = useMemo(() => {
    if (!tree) return { cw: SW, ch: SH, nodes: [] as TNode[], esc: [] as ExtraConn[], peer: [] as ExtraConn[] };
    comp(tree); pos(tree, LP);
    const nds = flat(tree);
    const { esc, peer } = getExtraConns(nds);
    let mx = 0, my = 0;
    nds.forEach(n => { mx = Math.max(mx, n.x + NW); my = Math.max(my, n.y + NH); });
    return {
      cw: Math.max(mx + LP, SW * 1.2) * zoom,
      ch: Math.max(my + TP + 100, SH * 1.2) * zoom,
      nodes: nds,
      esc,
      peer,
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

  return (
    <View style={[st.container, { backgroundColor: bg, paddingTop: ins.top }]}>
      <View style={[st.header, { borderBottomColor: line }]}>
        <TouchableOpacity onPress={() => router.back()} style={st.hBtn}><ArrowLeft size={22} color={colors.primary} /></TouchableOpacity>
        <View style={st.hCenter}><GitBranch size={18} color={colors.primary} /><Text style={[st.hTitle, { color: fg }]}>AI Mind Map</Text></View>
        <TouchableOpacity onPress={() => setShowS(!showS)} style={st.hBtn}><Search size={20} color={fg} /></TouchableOpacity>
      </View>

      {showS && (
        <View style={[st.sBox, { backgroundColor: card, borderColor: line }]}>
          <Search size={16} color={colors.secondaryText} />
          <TextInput value={q} onChangeText={setQ} placeholder="Search agents..." placeholderTextColor={colors.secondaryText} style={[st.sInp, { color: fg }]} />
          {q ? <TouchableOpacity onPress={() => setQ('')}><X size={16} color={fg} /></TouchableOpacity> : null}
        </View>
      )}

      {/* Department Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {Object.entries(DC).map(([dept, color]) => {
            const count = ALL.filter(a => a.department === dept).length;
            return (
              <TouchableOpacity key={dept} style={[st.deptChip, { backgroundColor: color + '22', borderColor: color + '44' }]}>
                <View style={[st.deptDot, { backgroundColor: color }]} />
                <Text style={[st.deptChipT, { color }]}>{dept.replace(/_/g,' ')} ({count})</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={st.statsRow}>
        <View style={[st.pill, { backgroundColor: card }]}><Users size={14} color={colors.primary} /><Text style={[st.pillT, { color: fg }]}>{ALL.length} Agents</Text></View>
        <View style={[st.pill, { backgroundColor: card }]}><GitBranch size={14} color={colors.success} /><Text style={[st.pillT, { color: fg }]}>{nodes.length} Visible</Text></View>
        <TouchableOpacity onPress={() => setZoom(Math.max(0.35, zoom - 0.15))} style={[st.zBtn, { backgroundColor: card }]}><ZoomOut size={16} color={fg} /></TouchableOpacity>
        <TouchableOpacity onPress={() => setZoom(Math.min(2.2, zoom + 0.15))} style={[st.zBtn, { backgroundColor: card }]}><ZoomIn size={16} color={fg} /></TouchableOpacity>
      </View>

      <View style={[st.legend, { borderBottomColor: line }]}>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#88888888' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Reports</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#FF9500' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Escalation</Text></View>
        <View style={st.li}><View style={[st.ld, { backgroundColor: '#0A84FF' }]} /><Text style={[st.lt, { color: colors.secondaryText }]}>Peer</Text></View>
      </View>

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
                    stroke="#FF9500" strokeWidth={1} fill="none" strokeDasharray="4,4" opacity={0.6}
                  />
                ))}

                {/* Peer Links */}
                {peer.map((c, i) => (
                  <Path key={`peer-${i}`}
                    d={`M${c.from.x+NW/2},${c.from.y+NH/2} L${c.to.x-NW/2},${c.to.y+NH/2}`}
                    stroke="#0A84FF" strokeWidth={1} fill="none" strokeDasharray="2,4" opacity={0.4}
                  />
                ))}

                {/* Nodes */}
                {nodes.map(n => {
                  const isS = n.id === selId;
                  const isH = mids.has(n.id);
                  const col = DC[n.data.department] || colors.primary;
                  const hasCh = n.data.orgChart?.directReports?.some(cid => MAP.has(cid)) ?? false;
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

      {/* Detail Panel */}
      {selNode && (
        <View style={[st.panel, { backgroundColor: card, borderTopColor: line }]}>
          <View style={st.pHead}>
            <View style={[st.pDot, { backgroundColor: DC[selNode.department] || colors.primary }]} />
            <Text style={[st.pName, { color: fg }]}>{selNode.name}</Text>
            <TouchableOpacity onPress={() => setSelId(null)} style={st.pClose}><X size={18} color={fg} /></TouchableOpacity>
          </View>
          <Text style={[st.pTitle, { color: colors.secondaryText }]}>{selNode.title}</Text>
          <Text style={[st.pDesc, { color: colors.secondaryText }]} numberOfLines={2}>{selNode.description}</Text>
          <View style={st.pRow}>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}><Text style={[st.pPillT, { color: fg }]}>{selNode.level.replace('_',' ')}</Text></View>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}><Text style={[st.pPillT, { color: fg }]}>{selNode.department.replace(/_/g,' ')}</Text></View>
            <View style={[st.pPill, { backgroundColor: isD ? '#2C2C2E' : '#E5E5EA' }]}><Text style={[st.pPillT, { color: colors.success }]}>{selNode.aiCost}</Text></View>
          </View>
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
  legend: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 12, paddingBottom: 6, borderBottomWidth: 1 },
  li: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ld: { width: 10, height: 3, borderRadius: 2 },
  lt: { fontSize: 11 },
  panel: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24, borderTopWidth: 1 },
  pHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pDot: { width: 10, height: 10, borderRadius: 5 },
  pName: { flex: 1, fontSize: 16, fontWeight: '700' },
  pClose: { padding: 4 },
  pTitle: { fontSize: 13, marginBottom: 4 },
  pDesc: { fontSize: 12, lineHeight: 18, marginBottom: 8 },
  pRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  pPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  pPillT: { fontSize: 11, fontWeight: '600' },
  deptChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1 },
  deptDot: { width: 6, height: 6, borderRadius: 3 },
  deptChipT: { fontSize: 11, fontWeight: '600' },
});
