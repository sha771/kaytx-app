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
} from 'react-native';
import Svg, { Circle, Line, G } from 'react-native-svg';
import * as Icons from 'lucide-react-native';
import { useTheme } from '../../providers/ThemeProvider';

const { width: SCREEN_W } = Dimensions.get('window');

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  type: 'center' | 'cluster' | 'satellite' | 'particle';
  label: string;
  pulseOffset: number;
  connections: string[];
}

interface NetworkConnection {
  id: string;
  from: string;
  to: string;
  color: string;
  width: number;
  animated: boolean;
}

interface SimulationAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
  route?: string;
}

interface AgentNetworkSimulationProps {
  simulationRunning: boolean;
  onNodeSelect?: (node: NetworkNode | null) => void;
  compact?: boolean;
  agents?: SimulationAgent[];
}

const CENTER_X = SCREEN_W / 2;
const CENTER_Y = SCREEN_W / 2;
const RING_RADIUS = (SCREEN_W - 60) / 2;

const CLUSTER_COLORS = [
  '#8B5CF6', '#6366F1', '#06B6D4', '#10B981',
  '#F59E0B', '#EF4444', '#EC4899', '#14B8A6',
];

function generateNetwork(agents?: SimulationAgent[]): { nodes: NetworkNode[]; connections: NetworkConnection[] } {
  const nodes: NetworkNode[] = [];
  const connections: NetworkConnection[] = [];

  // Central hub
  nodes.push({
    id: 'center',
    x: CENTER_X,
    y: CENTER_Y,
    radius: 12,
    color: '#FFFFFF',
    type: 'center',
    label: 'Simulation Core',
    pulseOffset: 0,
    connections: [],
  });

  const clusterCount = 8;
  const satellitesPerCluster = 12;
  const particlesCount = 60;

  // Map real agent names to clusters if provided
  const clusterAgents = agents ? agents.slice(0, clusterCount) : [];
  const remainingAgents = agents ? agents.slice(clusterCount) : [];

  // Cluster hubs arranged in a circle
  for (let i = 0; i < clusterCount; i++) {
    const angle = (i / clusterCount) * Math.PI * 2 - Math.PI / 2;
    const cx = CENTER_X + Math.cos(angle) * RING_RADIUS * 0.55;
    const cy = CENTER_Y + Math.sin(angle) * RING_RADIUS * 0.55;
    const color = CLUSTER_COLORS[i % CLUSTER_COLORS.length];
    const agent = clusterAgents[i];

    nodes.push({
      id: `cluster-${i}`,
      x: cx,
      y: cy,
      radius: 7,
      color,
      type: 'cluster',
      label: agent ? agent.name : `Cluster ${i + 1}`,
      pulseOffset: i * 0.3,
      connections: [],
    });

    // Connection from center to cluster
    connections.push({
      id: `c-center-cluster-${i}`,
      from: 'center',
      to: `cluster-${i}`,
      color: color + '60',
      width: 1.5,
      animated: true,
    });

    // Satellites around each cluster
    for (let j = 0; j < satellitesPerCluster; j++) {
      const satAngle = (j / satellitesPerCluster) * Math.PI * 2 + angle * 0.4;
      const dist = 28 + Math.random() * 25;
      const sx = cx + Math.cos(satAngle) * dist;
      const sy = cy + Math.sin(satAngle) * dist;
      const satId = `sat-${i}-${j}`;

      // Map remaining agents to first few satellites for realism
      const remainingAgent = remainingAgents[i * 2 + j];
      const satLabel = remainingAgent ? remainingAgent.name : `Agent ${i * satellitesPerCluster + j + 1}`;

      nodes.push({
        id: satId,
        x: sx,
        y: sy,
        radius: 2.5 + Math.random() * 2.5,
        color,
        type: 'satellite',
        label: satLabel,
        pulseOffset: Math.random() * 2,
        connections: [],
      });

      // Connection cluster -> satellite
      connections.push({
        id: `c-cluster-${i}-${satId}`,
        from: `cluster-${i}`,
        to: satId,
        color: color + '35',
        width: 0.8,
        animated: false,
      });

      // Occasional satellite-to-satellite connections within cluster
      if (j > 0 && Math.random() > 0.7) {
        const prevSatId = `sat-${i}-${j - 1}`;
        connections.push({
          id: `c-sat-${i}-${j}-${j - 1}`,
          from: prevSatId,
          to: satId,
          color: color + '20',
          width: 0.5,
          animated: false,
        });
      }
    }

    // Occasional cluster-to-cluster connections
    if (i > 0 && Math.random() > 0.5) {
      const prevClusterId = `cluster-${i - 1}`;
      connections.push({
        id: `c-cluster-${i}-${i - 1}`,
        from: prevClusterId,
        to: `cluster-${i}`,
        color: '#FFFFFF18',
        width: 0.6,
        animated: false,
      });
    }
  }

  // Outer ring particles (dense circular pattern from images 2/3)
  for (let i = 0; i < particlesCount; i++) {
    const angle = (i / particlesCount) * Math.PI * 2 + Math.random() * 0.3;
    const dist = RING_RADIUS * 0.82 + Math.random() * RING_RADIUS * 0.15;
    const px = CENTER_X + Math.cos(angle) * dist;
    const py = CENTER_Y + Math.sin(angle) * dist;

    nodes.push({
      id: `particle-${i}`,
      x: px,
      y: py,
      radius: 1.5 + Math.random(),
      color: '#FFFFFF',
      type: 'particle',
      label: '',
      pulseOffset: Math.random() * 3,
      connections: [],
    });
  }

  // Inner ring particles for density
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * RING_RADIUS * 0.35;
    const px = CENTER_X + Math.cos(angle) * dist;
    const py = CENTER_Y + Math.sin(angle) * dist;

    nodes.push({
      id: `inner-particle-${i}`,
      x: px,
      y: py,
      radius: 1 + Math.random() * 1.5,
      color: '#8B5CF6',
      type: 'particle',
      label: '',
      pulseOffset: Math.random() * 3,
      connections: [],
    });
  }

  return { nodes, connections };
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export default function AgentNetworkSimulation({
  simulationRunning,
  onNodeSelect,
  compact = false,
  agents,
}: AgentNetworkSimulationProps) {
  const { colors } = useTheme();
  const { nodes, connections } = useMemo(() => generateNetwork(agents), [agents]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Animation values
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

    // Start pulse animations for all non-particle nodes
    const pulseAnimations = nodes
      .filter((n) => n.type !== 'particle')
      .map((node) => {
        const anim = pulseAnims.current[node.id];
        if (!anim) return null;
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1500 + node.pulseOffset * 300,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 1500 + node.pulseOffset * 300,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        );
      })
      .filter(Boolean) as Animated.CompositeAnimation[];

    // Start flow animations for connections
    const flowAnimations = connections
      .filter((c) => c.animated)
      .map((conn) => {
        const anim = flowAnims.current[conn.id];
        if (!anim) return null;
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 2000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 500,
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

  const handleNodePress = useCallback(
    (node: NetworkNode) => {
      if (node.type === 'particle') return;
      setSelectedNode(node);
      setShowInfo(true);
      onNodeSelect?.(node);
    },
    [onNodeSelect]
  );

  const containerWidth = SCREEN_W - 32;
  const containerHeight = compact ? 180 : containerWidth;
  const scale = containerWidth / SCREEN_W;

  const renderNode = (node: NetworkNode) => {
    const anim = pulseAnims.current[node.id];
    const animatedRadius = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [node.radius, node.radius * (node.type === 'center' ? 1.6 : 1.4)],
        })
      : node.radius;

    const animatedOpacity = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        })
      : 0.7;

    // For particle nodes, just render static
    if (node.type === 'particle') {
      return (
        <Circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill={node.color}
          opacity={0.4 + Math.sin(node.pulseOffset) * 0.2}
        />
      );
    }

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
            opacity={Animated.multiply(animatedOpacity, 0.3)}
          />
        )}
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
          <Circle cx={node.x} cy={node.y} r={4} fill="#FFFFFF" opacity={0.9} onPress={() => handleNodePress(node)} />
        )}
        {node.type === 'cluster' && (
          <Circle cx={node.x} cy={node.y} r={2.5} fill="#FFFFFF" opacity={0.7} onPress={() => handleNodePress(node)} />
        )}
      </G>
    );
  };

  const renderConnection = (conn: NetworkConnection) => {
    const fromNode = nodes.find((n) => n.id === conn.from);
    const toNode = nodes.find((n) => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    const anim = flowAnims.current[conn.id];
    const strokeOpacity = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.15, 0.6],
        })
      : 0.15;

    const strokeWidth = anim
      ? anim.interpolate({
          inputRange: [0, 1],
          outputRange: [conn.width, conn.width * 2],
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

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
      <View
        style={[
          styles.svgContainer,
          {
            width: containerWidth,
            height: containerHeight,
            backgroundColor: '#0F0F1A',
            borderRadius: compact ? 16 : containerWidth / 2,
          },
        ]}
      >
        <Svg width={containerWidth} height={containerHeight} viewBox={`0 0 ${SCREEN_W} ${SCREEN_W}`}>
          {/* Background subtle radial gradient effect via concentric circles */}
          <Circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RING_RADIUS}
            fill="none"
            stroke="#8B5CF610"
            strokeWidth={1}
          />
          <Circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RING_RADIUS * 0.6}
            fill="none"
            stroke="#8B5CF608"
            strokeWidth={1}
          />

          {/* Connections first (behind nodes) */}
          {connections.map(renderConnection)}

          {/* Nodes */}
          {nodes.map(renderNode)}
        </Svg>

        {!compact && (
          <View style={styles.statusOverlay}>
            <View style={[styles.statusBadge, simulationRunning && styles.statusBadgeActive]}>
              <View style={[styles.statusDot, simulationRunning && styles.statusDotActive]} />
              <Text style={styles.statusText}>
                {simulationRunning ? 'Live Simulation' : 'Simulation Ready'}
              </Text>
            </View>
          </View>
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
              {selectedNode?.label || 'Node'}
            </Text>
            <Text style={[styles.modalType, { color: colors.textSecondary }]}>
              Type: {selectedNode?.type.toUpperCase()}
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
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(139,92,246,0.2)',
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
