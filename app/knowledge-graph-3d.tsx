/**
 * =============================================================================
 * 3D KNOWLEDGE GRAPH PAGE - KAYTX Agent Hierarchy Visualization
 * =============================================================================
 *
 * Full-page 3D circular knowledge graph visualization with:
 * - 5-layer concentric layout (Executive, Command Center, Departments, Main Agents, Sub-Agents)
 * - 6,000+ nodes with WebGL-accelerated SVG rendering
 * - RAG Knowledge Graph overlay with semantic similarity visualization
 * - Interactive 3D rotation, zoom, and node selection
 * - Layer visibility controls, search, and performance metrics
 *
 * @version 3.0.0
 * @lastUpdated 2026-07-22
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Network,
  Layers,
  Bot,
  Zap,
  Info,
  Maximize2,
  Minimize2,
} from 'lucide-react-native';

import KnowledgeGraphView from '../components/knowledge-graph/KnowledgeGraphView';
import { KnowledgeGraphNode } from '../components/knowledge-graph/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function KnowledgeGraph3DPage() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleNodePress = useCallback((node: KnowledgeGraphNode) => {
    console.log('[KnowledgeGraph3D] Node pressed:', node.label, node.id);
  }, []);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      {/* Minimal Overlay Header */}
      <View style={styles.topOverlay}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <ArrowLeft size={22} color="#94a3b8" />
        </TouchableOpacity>

        <View style={styles.titleSection}>
          <Network size={18} color="#6366f1" />
          <Text style={styles.titleText}>3D Knowledge Graph</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setShowInfo(!showInfo)}
          >
            <Info size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Panel */}
      {showInfo && (
        <View style={styles.infoPanel}>
          <ScrollView>
            <Text style={styles.infoTitle}>3D Circular Knowledge Graph</Text>
            <Text style={styles.infoDesc}>
              Visualizes the KAYTX AI Agent Hierarchy as a 5-layer concentric
              knowledge graph with 6,000+ nodes.
            </Text>

            <View style={styles.infoDivider} />

            <Text style={styles.infoSectionTitle}>Layer Architecture</Text>
            {[
              { layer: 'Core', desc: '10 C-Suite Executives', color: '#f59e0b' },
              { layer: 'Ring 1', desc: '8 Command Center Nodes', color: '#94a3b8' },
              { layer: 'Ring 2', desc: '48 Departments (7.5° spacing)', color: '#10b981' },
              { layer: 'Ring 3', desc: '~200 Main Agents', color: '#6366f1' },
              { layer: 'Ring 4', desc: '5,000+ Sub-Agents', color: '#8b5cf6' },
            ].map((item, i) => (
              <View key={i} style={styles.infoRow}>
                <View style={[styles.infoDot, { backgroundColor: item.color }]} />
                <Text style={styles.infoLayer}>{item.layer}</Text>
                <Text style={styles.infoDesc}>{item.desc}</Text>
              </View>
            ))}

            <View style={styles.infoDivider} />

            <Text style={styles.infoSectionTitle}>Features</Text>
            <Text style={styles.infoBullet}>• 3D perspective projection with smooth rotation</Text>
            <Text style={styles.infoBullet}>• Glowing connection lines with animated data flow</Text>
            <Text style={styles.infoBullet}>• LOD (Level of Detail) rendering for performance</Text>
            <Text style={styles.infoBullet}>• RAG knowledge graph overlay</Text>
            <Text style={styles.infoBullet}>• Real-time node search and filtering</Text>
            <Text style={styles.infoBullet}>• Node detail panel with metrics and centrality</Text>
          </ScrollView>
        </View>
      )}

      {/* Main 3D Knowledge Graph */}
      <KnowledgeGraphView
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        onNodePress={handleNodePress}
        onBackPress={handleBackPress}
        showHeader={false}
        showToolbar={true}
        showLayerPanel={false}
        showStatsPanel={true}
        showSearch={true}
        autoGenerate={true}
      />

      {/* Floating indicator */}
      <View style={styles.floatingIndicator}>
        <View style={styles.indicatorDot} />
        <Text style={styles.indicatorText}>
          Drag to rotate · Tap nodes for details
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },

  // ========== TOP OVERLAY ==========
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(10,10,26,0.8)',
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  titleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 8,
    marginLeft: 4,
  },

  // ========== INFO PANEL ==========
  infoPanel: {
    position: 'absolute',
    top: 48,
    left: 12,
    right: 12,
    zIndex: 200,
    backgroundColor: 'rgba(15,23,42,0.98)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  infoDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
  infoDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 12,
  },
  infoSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  infoLayer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
    width: 50,
  },
  infoBullet: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 4,
    lineHeight: 18,
  },

  // ========== FLOATING INDICATOR ==========
  floatingIndicator: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
    marginRight: 8,
  },
  indicatorText: {
    fontSize: 12,
    color: '#94a3b8',
  },
});