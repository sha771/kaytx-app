import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, { Circle, Line, G, Defs, RadialGradient, Stop } from 'react-native-svg';
import * as Icons from 'lucide-react-native';
import { useTheme } from '../../providers/ThemeProvider';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type VizMode = 'central-hub' | 'hierarchical' | 'dense-field' | 'particle-swarm';

interface AgentNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  type: 'center' | 'cluster' | 'agent' | 'sub-agent' | 'particle';
  label: string;
  pulseOffset: number;
  connections: string[];
  group?: number;
  velocity?: { x: number; y: number };
  opacity?: number;
  firingRate?: number;
  lastFired?: number;
}

interface AgentConnection {
  id: string;
  from: string;
  to: string;
  color: string;
  width: number;
  animated: boolean;
}

interface AgentGroup {
  id: string;
  name: string;
  color: string;
  count: number;
  firingRate: number;
}

interface MassiveSimulationVizProps {
  simulationRunning: boolean;
  onNodeSelect?: (node: AgentNode | null) => void;
  compact?: boolean;
  mode?: VizMode;
  agentCount?: number; // 10K - 1M
  groups?: AgentGroup[];
}

const CENTER_X = SCREEN_W / 2;
const CENTER_Y = SCREEN_W / 2;
const RING_RADIUS = (SCREEN_W - 60) / 2;

const GROUP_COLORS = {
  motor: '#FF6B6B',      // Red
  concept: '#4ECDC4',    // Teal
  presidential: '#9B59B6', // Purple
  sensory: '#3498DB',    // Blue
  memory: '#F39C12',     // Orange
  emotion: '#E74C3C',    // Dark Red
  default: '#8B5CF6',
};

// ============================================
// VISUALIZATION GENERATORS
// ============================================

// Image 1: Central Hub Network - radiating connections from center
function generateCentralHubNetwork(agentCount: number = 1000, groups: AgentGroup[] = []): { nodes: AgentNode[]; connections: AgentConnection[] } {
  const nodes: AgentNode[] = [];
  const connections: AgentConnection[] = [];
  
  // Central hub (purple core)
  nodes.push({
    id: 'center',
    x: CENTER_X,
    y: CENTER_Y,
    radius: 16,
    color: '#A78BFA',
    type: 'center',
    label: 'AI Cortex',
    pulseOffset: 0,
    connections: [],
  });

  const displayCount = Math.min(agentCount, 500); // Visual cap for performance
  const layers = 5;
  
  for (let i = 0; i < displayCount; i++) {
    const layer = Math.floor((i / displayCount) * layers) + 1;
    const layerRadius = (RING_RADIUS * 0.2) + (layer / layers) * RING_RADIUS * 0.7;
    const angle = (i / displayCount) * Math.PI * 2 * 3 + layer * 0.5; // Spiral pattern
    
    const groupIdx = i % Math.max(groups.length, 1);
    const group = groups[groupIdx] || { color: GROUP_COLORS.default, name: 'General' };
    
    const x = CENTER_X + Math.cos(angle) * layerRadius * (0.8 + Math.random() * 0.4);
    const y = CENTER_Y + Math.sin(angle) * layerRadius * (0.8 + Math.random() * 0.4);
    
    nodes.push({
      id: `agent-${i}`,
      x,
      y,
      radius: 2 + Math.random() * 3,
      color: group.color,
      type: 'agent',
      label: group.name,
      pulseOffset: Math.random() * 3,
      connections: [],
      group: groupIdx,
      opacity: 0.4 + Math.random() * 0.6,
    });

    // Connection to center (for inner layers) or nearby nodes
    if (layer <= 2) {
      connections.push({
        id: `c-center-${i}`,
        from: 'center',
        to: `agent-${i}`,
        color: group.color + '30',
        width: 0.5,
        animated: Math.random() > 0.7,
      });
    } else {
      // Connect to nearby nodes
      const nearbyIdx = Math.max(0, i - Math.floor(Math.random() * 10 + 5));
      if (nearbyIdx !== i) {
        connections.push({
          id: `c-${nearbyIdx}-${i}`,
          from: `agent-${nearbyIdx}`,
          to: `agent-${i}`,
          color: group.color + '15',
          width: 0.3,
          animated: false,
        });
      }
    }
  }

  return { nodes, connections };
}

// Image 2: Hierarchical Clusters - multiple cluster hubs with sub-networks
function generateHierarchicalNetwork(agentCount: number = 10000, groups: AgentGroup[] = []): { nodes: AgentNode[]; connections: AgentConnection[] } {
  const nodes: AgentNode[] = [];
  const connections: AgentConnection[] = [];

  const clusterCount = 12;
  const subClustersPerCluster = 4;
  const agentsPerSubCluster = Math.floor(agentCount / (clusterCount * subClustersPerCluster));
  
  // Central hub
  nodes.push({
    id: 'center',
    x: CENTER_X,
    y: CENTER_Y,
    radius: 14,
    color: '#FFFFFF',
    type: 'center',
    label: 'Root Cortex',
    pulseOffset: 0,
    connections: [],
  });

  // Primary clusters arranged in circle
  for (let i = 0; i < clusterCount; i++) {
    const angle = (i / clusterCount) * Math.PI * 2 - Math.PI / 2;
    const cx = CENTER_X + Math.cos(angle) * RING_RADIUS * 0.5;
    const cy = CENTER_Y + Math.sin(angle) * RING_RADIUS * 0.5;
    const groupIdx = i % groups.length || 0;
    const group = groups[groupIdx] || { color: GROUP_COLORS.default, name: `Cluster ${i}` };
    
    nodes.push({
      id: `cluster-${i}`,
      x: cx,
      y: cy,
      radius: 8,
      color: group.color,
      type: 'cluster',
      label: group.name,
      pulseOffset: i * 0.2,
      connections: [],
      group: groupIdx,
    });

    connections.push({
      id: `c-center-cluster-${i}`,
      from: 'center',
      to: `cluster-${i}`,
      color: group.color + '50',
      width: 1.5,
      animated: true,
    });

    // Sub-clusters around each primary cluster
    for (let j = 0; j < subClustersPerCluster; j++) {
      const subAngle = (j / subClustersPerCluster) * Math.PI * 2 + angle;
      const subDist = 35 + Math.random() * 15;
      const sx = cx + Math.cos(subAngle) * subDist;
      const sy = cy + Math.sin(subAngle) * subDist;
      const subId = `sub-${i}-${j}`;
      
      nodes.push({
        id: subId,
        x: sx,
        y: sy,
        radius: 5,
        color: group.color,
        type: 'sub-agent',
        label: `${group.name} Sub-${j}`,
        pulseOffset: j * 0.15,
        connections: [],
        group: groupIdx,
      });

      connections.push({
        id: `c-cluster-${i}-${subId}`,
        from: `cluster-${i}`,
        to: subId,
        color: group.color + '35',
        width: 0.8,
        animated: Math.random() > 0.5,
      });

      // Agents around each sub-cluster
      const visualAgents = Math.min(agentsPerSubCluster, 20);
      for (let k = 0; k < visualAgents; k++) {
        const agentAngle = (k / visualAgents) * Math.PI * 2;
        const agentDist = 12 + Math.random() * 8;
        const ax = sx + Math.cos(agentAngle) * agentDist;
        const ay = sy + Math.sin(agentAngle) * agentDist;
        const agentId = `agent-${i}-${j}-${k}`;
        
        nodes.push({
          id: agentId,
          x: ax,
          y: ay,
          radius: 1.5 + Math.random(),
          color: group.color,
          type: 'agent',
          label: '',
          pulseOffset: Math.random() * 2,
          connections: [],
          group: groupIdx,
          opacity: 0.5 + Math.random() * 0.5,
        });

        connections.push({
          id: `c-sub-${i}-${j}-${k}`,
          from: subId,
          to: agentId,
          color: group.color + '20',
          width: 0.4,
          animated: false,
        });
      }
    }
  }

  return { nodes, connections };
}

// Image 3: Dense Field - circular dense dot pattern
function generateDenseField(agentCount: number = 100000, groups: AgentGroup[] = []): { nodes: AgentNode[]; connections: AgentConnection[] } {
  const nodes: AgentNode[] = [];
  const connections: AgentConnection[] = [];

  const displayCount = Math.min(agentCount, 800); // Visual cap
  
  // Create dense circular pattern with Fibonacci spiral for even distribution
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  
  for (let i = 0; i < displayCount; i++) {
    const r = Math.sqrt(i / displayCount) * RING_RADIUS * 0.95;
    const theta = i * goldenAngle;
    
    const x = CENTER_X + r * Math.cos(theta);
    const y = CENTER_Y + r * Math.sin(theta);
    
    const groupIdx = i % Math.max(groups.length, 1);
    const group = groups[groupIdx] || { color: '#FFFFFF' };
    
    nodes.push({
      id: `dot-${i}`,
      x,
      y,
      radius: 1.2 + Math.random() * 1.5,
      color: group.color,
      type: 'particle',
      label: '',
      pulseOffset: Math.random() * 3,
      connections: [],
      group: groupIdx,
      opacity: 0.3 + Math.random() * 0.7,
    });

    // Occasional connections for density visualization
    if (i > 0 && Math.random() > 0.95) {
      const prevIdx = Math.max(0, i - Math.floor(Math.random() * 20 + 1));
      connections.push({
        id: `c-${prevIdx}-${i}`,
        from: `dot-${prevIdx}`,
        to: `dot-${i}`,
        color: group.color + '08',
        width: 0.2,
        animated: false,
      });
    }
  }

  return { nodes, connections };
}

// Image 4: Particle Swarm - colored groups with labels and activity
function generateParticleSwarm(agentCount: number = 1000000, groups: AgentGroup[] = []): { nodes: AgentNode[]; connections: AgentConnection[] } {
  const nodes: AgentNode[] = [];
  const connections: AgentConnection[] = [];

  const displayCount = Math.min(agentCount, 600);
  const swarmGroups = groups.length > 0 ? groups : [
    { id: 'motor', name: 'MOTOR CORTEX', color: GROUP_COLORS.motor, count: 250, firingRate: 0.45 },
    { id: 'concept', name: 'CONCEPT LAYER', color: GROUP_COLORS.concept, count: 180, firingRate: 0.32 },
    { id: 'presidential', name: 'PRESIDENTIAL', color: GROUP_COLORS.presidential, count: 200, firingRate: 1.85 },
    { id: 'sensory', name: 'SENSORY', color: GROUP_COLORS.sensory, count: 320, firingRate: 0.58 },
  ];

  // Calculate positions for each swarm group
  const groupPositions = [
    { x: CENTER_X - RING_RADIUS * 0.5, y: CENTER_Y - RING_RADIUS * 0.4 },
    { x: CENTER_X + RING_RADIUS * 0.5, y: CENTER_Y - RING_RADIUS * 0.4 },
    { x: CENTER_X - RING_RADIUS * 0.6, y: CENTER_Y + RING_RADIUS * 0.3 },
    { x: CENTER_X + RING_RADIUS * 0.6, y: CENTER_Y + RING_RADIUS * 0.3 },
  ];

  let agentIdx = 0;
  swarmGroups.forEach((group, groupIdx) => {
    const pos = groupPositions[groupIdx % groupPositions.length];
    const groupAgentCount = Math.floor((group.count / swarmGroups.reduce((a, g) => a + g.count, 0)) * displayCount);
    
    // Group label node
    nodes.push({
      id: `group-label-${groupIdx}`,
      x: pos.x,
      y: pos.y - 40,
      radius: 0,
      color: group.color,
      type: 'cluster',
      label: group.name,
      pulseOffset: 0,
      connections: [],
      group: groupIdx,
    });

    for (let i = 0; i < groupAgentCount && agentIdx < displayCount; i++, agentIdx++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * RING_RADIUS * 0.35;
      
      const x = pos.x + Math.cos(angle) * dist;
      const y = pos.y + Math.sin(angle) * dist;
      
      nodes.push({
        id: `swarm-${groupIdx}-${i}`,
        x,
        y,
        radius: 2 + Math.random() * 2,
        color: group.color,
        type: 'particle',
        label: '',
        pulseOffset: Math.random() * 2,
        connections: [],
        group: groupIdx,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
        opacity: 0.5 + Math.random() * 0.5,
        firingRate: group.firingRate * (0.5 + Math.random()),
        lastFired: Math.random() * 1000,
      });

      // Internal connections within swarm
      if (i > 0 && Math.random() > 0.85) {
        const prevIdx = Math.max(0, i - Math.floor(Math.random() * 10 + 1));
        connections.push({
          id: `c-swarm-${groupIdx}-${prevIdx}-${i}`,
          from: `swarm-${groupIdx}-${prevIdx}`,
          to: `swarm-${groupIdx}-${i}`,
          color: group.color + '25',
          width: 0.5,
          animated: Math.random() > 0.7,
        });
      }
    }
  });

  return { nodes, connections };
}

// ============================================
// COMPONENT
// ============================================

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function MassiveSimulationViz({
  simulationRunning,
  onNodeSelect,
  compact = false,
  mode = 'central-hub',
  agentCount = 10000,
  groups = [],
}: MassiveSimulationVizProps) {
  const { colors } = useTheme();
  
  const defaultGroups: AgentGroup[] = groups.length > 0 ? groups : [
    { id: 'motor', name: 'MOTOR CORTEX', color: GROUP_COLORS.motor, count: 250000, firingRate: 0.45 },
    { id: 'concept', name: 'CONCEPT LAYER', color: GROUP_COLORS.concept, count: 180000, firingRate: 0.32 },
    { id: 'presidential', name: 'PRESIDENTIAL', color: GROUP_COLORS.presidential, count: 200000, firingRate: 1.85 },
    { id: 'sensory', name: 'SENSORY', color: GROUP_COLORS.sensory, count: 320000, firingRate: 0.58 },
  ];

  const { nodes, connections } = useMemo(() => {
    switch (mode) {
      case 'hierarchical':
        return generateHierarchicalNetwork(agentCount, defaultGroups);
      case 'dense-field':
        return generateDenseField(agentCount, defaultGroups);
      case 'particle-swarm':
        return generateParticleSwarm(agentCount, defaultGroups);
      case 'central-hub':
      default:
        return generateCentralHubNetwork(agentCount, defaultGroups);
    }
  }, [mode, agentCount, defaultGroups]);

  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const pulseAnims = useRef<Record<string, Animated.Value>>({});
  const flowAnims = useRef<Record<string, Animated.Value>>({});

  useEffect(() => {
    nodes.forEach((node) => {
      if (!pulseAnims.current[node.id]) {
        pulseAnims.current[node.id] = new Animated.Value(0);
      }
    });
    connections.forEach((conn) => {
      if (!flowAnims.current[conn.id]) {
        flowAnims.current[conn.id] = new Animated.Value(0);
      }
    });
  }, [nodes, connections]);

  useEffect(() => {
    if (!simulationRunning) {
      nodes.forEach((n) => pulseAnims.current[n.id]?.setValue(0));
      connections.forEach((c) => flowAnims.current[c.id]?.setValue(0));
      return;
    }

    const pulseAnimations = nodes
      .filter((n) => n.type !== 'particle')
      .map((node) => {
        const anim = pulseAnims.current[node.id];
        if (!anim) return null;
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1200 + node.pulseOffset * 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1200 + node.pulseOffset * 400,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        );
      })
      .filter(Boolean) as Animated.CompositeAnimation[];

    const flowAnimations = connections
      .filter((c) => c.animated)
      .map((conn) => {
        const anim = flowAnims.current[conn.id];
        if (!anim) return null;
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1500,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 400,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        );
      })
      .filter(Boolean) as Animated.CompositeAnimation[];

    pulseAnimations.forEach((a) => a.start());
    flowAnimations.forEach((a) => a.start());

    return () => {
      pulseAnimations.forEach((a) => a.stop());
      flowAnimations.forEach((a) => a.stop());
    };
  }, [simulationRunning, nodes, connections]);

  const handleNodePress = useCallback((node: AgentNode) => {
    if (node.type === 'particle' && !node.label) return;
    setSelectedNode(node);
    setShowInfo(true);
    onNodeSelect?.(node);
  }, [onNodeSelect]);

  const containerWidth = SCREEN_W - 32;
  const containerHeight = compact ? 180 : containerWidth;

  // Firing animation state for particles
  const [firingNodes, setFiringNodes] = useState<Set<string>>(new Set());
  
  // Simulate firing for particle swarm mode
  useEffect(() => {
    if (!simulationRunning || mode !== 'particle-swarm') {
      setFiringNodes(new Set());
      return;
    }
    
    const interval = setInterval(() => {
      const now = Date.now();
      const firing = new Set<string>();
      nodes.forEach((node) => {
        if (node.type === 'particle' && node.firingRate) {
          // Check if node should fire based on its firing rate
          const fireProbability = node.firingRate * 0.1; // Scale down for visual effect
          if (Math.random() < fireProbability) {
            firing.add(node.id);
          }
        }
      });
      setFiringNodes(firing);
    }, 100); // Update every 100ms
    
    return () => clearInterval(interval);
  }, [simulationRunning, mode, nodes]);

  const renderNode = (node: AgentNode, index: number) => {
    const anim = pulseAnims.current[node.id];
    const isFiring = firingNodes.has(node.id);
    
    // Particle/dense field nodes - with firing effects
    if (node.type === 'particle') {
      const baseOpacity = node.opacity || 0.5;
      const firingOpacity = isFiring ? 1 : baseOpacity;
      const firingRadius = isFiring ? node.radius * 1.5 : node.radius;
      
      return (
        <G key={node.id}>
          {/* Glow effect when firing */}
          {isFiring && (
            <Circle
              cx={node.x}
              cy={node.y}
              r={node.radius * 3}
              fill={node.color}
              opacity={0.15}
            />
          )}
          <Circle
            cx={node.x}
            cy={node.y}
            r={firingRadius}
            fill={node.color}
            opacity={firingOpacity}
          />
          {/* White core when firing */}
          {isFiring && (
            <Circle
              cx={node.x}
              cy={node.y}
              r={node.radius * 0.5}
              fill="#FFFFFF"
              opacity={0.8}
            />
          )}
        </G>
      );
    }

    const animatedRadius = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [node.radius, node.radius * (node.type === 'center' ? 1.5 : 1.3)],
        })
      : node.radius;

    const animatedOpacity = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        })
      : 0.8;

    return (
      <G key={node.id}>
        {/* Glow ring for center and clusters */}
        {(node.type === 'center' || node.type === 'cluster') && (
          <AnimatedCircle
            cx={node.x}
            cy={node.y}
            r={animatedRadius}
            fill="none"
            stroke={node.color}
            strokeWidth={node.type === 'center' ? 3 : 1.5}
            opacity={Animated.multiply(animatedOpacity, 0.35)}
          />
        )}
        
        {/* Main node */}
        <AnimatedCircle
          cx={node.x}
          cy={node.y}
          r={animatedRadius}
          fill={node.color}
          opacity={animatedOpacity}
          onPress={() => handleNodePress(node)}
        />
        
        {/* White inner dot for larger nodes */}
        {node.type === 'center' && (
          <Circle cx={node.x} cy={node.y} r={5} fill="#FFFFFF" opacity={0.9} />
        )}
        {node.type === 'cluster' && (
          <Circle cx={node.x} cy={node.y} r={3} fill="#FFFFFF" opacity={0.8} />
        )}
      </G>
    );
  };

  const renderConnection = (conn: AgentConnection) => {
    const fromNode = nodes.find((n) => n.id === conn.from);
    const toNode = nodes.find((n) => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    const anim = flowAnims.current[conn.id];
    const strokeOpacity = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.1, 0.5],
        })
      : 0.1;

    const strokeWidth = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [conn.width, conn.width * 1.8],
        })
      : conn.width;

    return (
      <AnimatedLine
        key={conn.id}
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke={conn.color}
        strokeWidth={strokeWidth}
        opacity={strokeOpacity}
      />
    );
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'central-hub': return 'Central Hub Network';
      case 'hierarchical': return 'Hierarchical Clusters';
      case 'dense-field': return 'Dense Agent Field';
      case 'particle-swarm': return 'Particle Swarm';
      default: return 'Agent Network';
    }
  };

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
      <View
        style={[
          styles.svgContainer,
          {
            width: containerWidth,
            height: containerHeight,
            backgroundColor: '#0A0A12',
            borderRadius: compact ? 16 : containerWidth / 2,
          },
        ]}
      >
        <Svg width={containerWidth} height={containerHeight} viewBox={`0 0 ${SCREEN_W} ${SCREEN_W}`}>
          <Defs>
            <RadialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Background subtle radial rings */}
          <Circle cx={CENTER_X} cy={CENTER_Y} r={RING_RADIUS} fill="none" stroke="#8B5CF608" strokeWidth={1} />
          <Circle cx={CENTER_X} cy={CENTER_Y} r={RING_RADIUS * 0.75} fill="none" stroke="#8B5CF605" strokeWidth={1} />
          <Circle cx={CENTER_X} cy={CENTER_Y} r={RING_RADIUS * 0.5} fill="none" stroke="#8B5CF604" strokeWidth={1} />

          {/* Center glow */}
          <Circle cx={CENTER_X} cy={CENTER_Y} r={RING_RADIUS * 0.3} fill="url(#centerGlow)" />

          {/* Connections first (behind nodes) */}
          {connections.map(renderConnection)}

          {/* Data flow particles along connections */}
          {simulationRunning && connections.slice(0, 20).map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            // Calculate particle position along the connection
            const progress = (Date.now() / 2000 + idx * 0.1) % 1;
            const px = fromNode.x + (toNode.x - fromNode.x) * progress;
            const py = fromNode.y + (toNode.y - fromNode.y) * progress;
            
            return (
              <Circle
                key={`flow-${conn.id}`}
                cx={px}
                cy={py}
                r={1.5}
                fill={fromNode.color}
                opacity={0.8}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => renderNode(node, index))}
        </Svg>

        {!compact && (
          <>
            <View style={styles.statusOverlay}>
              <View style={[styles.statusBadge, simulationRunning && styles.statusBadgeActive]}>
                <View style={[styles.statusDot, simulationRunning && styles.statusDotActive]} />
                <Text style={styles.statusText}>
                  {simulationRunning ? 'Live' : 'Ready'}
                </Text>
              </View>
            </View>

            <View style={styles.scaleBadge}>
              <Text style={styles.scaleText}>
                {agentCount >= 1000000 ? `${(agentCount / 1000000).toFixed(1)}M` : 
                 agentCount >= 1000 ? `${(agentCount / 1000).toFixed(0)}K` : agentCount} Agents
              </Text>
            </View>

            {mode === 'particle-swarm' && defaultGroups.length > 0 && (
              <View style={styles.legendContainer}>
                {defaultGroups.slice(0, 4).map((group, idx) => (
                  <View key={idx} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: group.color }]} />
                    <View style={styles.legendInfo}>
                      <Text style={styles.legendText}>{group.name}</Text>
                      <Text style={[styles.legendFiringRate, { color: group.color }]}>
                        {group.count >= 1000 ? `${(group.count / 1000).toFixed(0)}K` : group.count} neurons • firing {group.firingRate.toFixed(2)}Hz
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>

      {/* Node Info Modal */}
      {!compact && (
        <Modal visible={showInfo} transparent animationType="fade" onRequestClose={() => setShowInfo(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <View style={[styles.modalIconContainer, { backgroundColor: selectedNode?.color + '30' }]}>
                  <Icons.Network size={24} color={selectedNode?.color || '#8B5CF6'} />
                </View>
                <TouchableOpacity onPress={() => setShowInfo(false)} style={styles.modalCloseButton}>
                  <Icons.X size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {selectedNode?.label || selectedNode?.type.toUpperCase() || 'Node'}
              </Text>
              <Text style={[styles.modalType, { color: colors.textSecondary }]}>
                Type: {selectedNode?.type.toUpperCase()} • Group: {defaultGroups[selectedNode?.group || 0]?.name || 'General'}
              </Text>
              <View style={styles.modalStats}>
                <View style={[styles.modalStat, { backgroundColor: colors.card }]}>
                  <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Connections</Text>
                  <Text style={[styles.modalStatValue, { color: colors.text }]}>
                    {connections.filter((c) => c.from === selectedNode?.id || c.to === selectedNode?.id).length}
                  </Text>
                </View>
                <View style={[styles.modalStat, { backgroundColor: colors.card }]}>
                  <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Load</Text>
                  <Text style={[styles.modalStatValue, { color: colors.text }]}>
                    {Math.floor(Math.random() * 80 + 10)}%
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.modalActionButton, { backgroundColor: selectedNode?.color || '#8B5CF6' }]}
                onPress={() => setShowInfo(false)}
              >
                <Text style={styles.modalActionText}>Inspect Agent</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  svgContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 6,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(16,185,129,0.25)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  scaleBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(139,92,246,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scaleText: {
    fontSize: 12,
    color: '#A78BFA',
    fontWeight: '700',
  },
  legendContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 2,
  },
  legendText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  legendInfo: {
    flexDirection: 'column',
  },
  legendFiringRate: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalType: {
    fontSize: 13,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  modalStats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  modalStat: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  modalStatValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalActionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

// Mode selector helper component
export function VizModeSelector({
  currentMode,
  onChange,
}: {
  currentMode: VizMode;
  onChange: (mode: VizMode) => void;
}) {
  const modes: { key: VizMode; label: string; icon: any }[] = [
    { key: 'central-hub', label: 'Central', icon: Icons.CircleDot },
    { key: 'hierarchical', label: 'Hierarchy', icon: Icons.Network },
    { key: 'dense-field', label: 'Dense', icon: Icons.Grid3X3 },
    { key: 'particle-swarm', label: 'Swarm', icon: Icons.Sparkles },
  ];

  return (
    <View style={modeStyles.container}>
      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.key}
          style={[modeStyles.button, currentMode === mode.key && modeStyles.buttonActive]}
          onPress={() => onChange(mode.key)}
        >
          <mode.icon size={16} color={currentMode === mode.key ? '#FFFFFF' : '#9CA3AF'} />
          <Text style={[modeStyles.label, currentMode === mode.key && modeStyles.labelActive]}>
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const modeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  buttonActive: {
    backgroundColor: '#8B5CF6',
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

// Scale selector helper
export function AgentScaleSelector({
  currentScale,
  onChange,
}: {
  currentScale: number;
  onChange: (scale: number) => void;
}) {
  const scales = [
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 1000, label: '1K' },
    { value: 10000, label: '10K' },
    { value: 100000, label: '100K' },
    { value: 1000000, label: '1M' },
  ];

  return (
    <View style={scaleStyles.container}>
      {scales.map((scale) => (
        <TouchableOpacity
          key={scale.value}
          style={[scaleStyles.button, currentScale === scale.value && scaleStyles.buttonActive]}
          onPress={() => onChange(scale.value)}
        >
          <Text style={[scaleStyles.label, currentScale === scale.value && scaleStyles.labelActive]}>
            {scale.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const scaleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    minWidth: 55,
  },
  buttonActive: {
    backgroundColor: '#10B981',
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  labelActive: {
    color: '#FFFFFF',
  },
});
