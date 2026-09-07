/**
 * =============================================================================
 * KNOWLEDGE GRAPH ENGINE - RAG, Embeddings, Timeline & Query System
 * =============================================================================
 *
 * Advanced engine powering:
 * - RAG (Retrieval-Augmented Generation) knowledge retrieval
 * - Vector embedding search and similarity
 * - Timeline history with playback controls
 * - Semantic/natural language query parsing
 * - Graph evolution tracking
 * - Performance analytics & bottleneck detection
 * - Agent capability gap analysis
 *
 * @version 3.0.0
 */

import { KnowledgeGraphNode, GraphConnection } from './types';

// ============================================
// SIMPLE EMBEDDING GENERATOR
// ============================================

export class EmbeddingGenerator {
  /**
   * Generate a simple embedding vector from text features
   */
  static generateEmbedding(text: string, dimensions: number = 64): number[] {
    const embedding: number[] = new Array(dimensions).fill(0);

    // Simple hash-based feature extraction
    const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const wordSet = new Set(words);

    wordSet.forEach(word => {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = ((hash << 5) - hash) + word.charCodeAt(i);
        hash |= 0;
      }

      const pos = Math.abs(hash) % dimensions;
      embedding[pos] += 1;
    });

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0)) || 1;
    return embedding.map(v => v / magnitude);
  }

  /**
   * Compute cosine similarity between two vectors
   */
  static cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }

    const magnitude = Math.sqrt(magA * magB) || 1;
    return dotProduct / magnitude;
  }

  /**
   * Generate node embedding from its properties
   */
  static generateNodeEmbedding(node: KnowledgeGraphNode, dimensions: number = 64): number[] {
    // Combine multiple features into embedding
    const featureText = [
      node.label,
      node.type,
      node.metadata.department,
      node.capabilities.join(' '),
      node.skills.join(' '),
      node.metadata.tags.join(' '),
      node.status,
      node.metadata.description || '',
    ].join(' ');

    return this.generateEmbedding(featureText, dimensions);
  }
}

// ============================================
// RAG KNOWLEDGE RETRIEVAL
// ============================================

export interface RAGResult {
  nodeId: string;
  nodeLabel: string;
  relevanceScore: number;
  similarityScore: number;
  context: string;
}

export class RAGRetrievalEngine {
  private nodeEmbeddings: Map<string, number[]> = new Map();

  /**
   * Index all nodes for RAG retrieval
   */
  indexNodes(nodes: KnowledgeGraphNode[], dimensions: number = 64): void {
    this.nodeEmbeddings.clear();
    nodes.forEach(node => {
      this.nodeEmbeddings.set(
        node.id,
        EmbeddingGenerator.generateNodeEmbedding(node, dimensions),
      );
    });
  }

  /**
   * Search for nodes by query text
   */
  search(
    query: string,
    nodes: KnowledgeGraphNode[],
    topK: number = 10,
    threshold: number = 0.3,
  ): RAGResult[] {
    const queryEmbedding = EmbeddingGenerator.generateEmbedding(query);
    const results: RAGResult[] = [];

    nodes.forEach(node => {
      const nodeEmbedding = this.nodeEmbeddings.get(node.id);
      if (!nodeEmbedding) return;

      const similarity = EmbeddingGenerator.cosineSimilarity(queryEmbedding, nodeEmbedding);

      if (similarity >= threshold) {
        results.push({
          nodeId: node.id,
          nodeLabel: node.label,
          relevanceScore: similarity,
          similarityScore: similarity,
          context: `[${node.type}] ${node.label} | Department: ${node.metadata.department} | Skills: ${node.skills.slice(0, 3).join(', ')} | Performance: ${node.metrics.performance}%`,
        });
      }
    });

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, topK);
  }

  /**
   * Find semantically similar nodes to a given node
   */
  findSimilarNodes(
    nodeId: string,
    nodes: KnowledgeGraphNode[],
    topK: number = 5,
  ): RAGResult[] {
    const sourceEmbedding = this.nodeEmbeddings.get(nodeId);
    if (!sourceEmbedding) return [];

    const results: RAGResult[] = [];

    nodes.forEach(node => {
      if (node.id === nodeId) return;
      const nodeEmbedding = this.nodeEmbeddings.get(node.id);
      if (!nodeEmbedding) return;

      const similarity = EmbeddingGenerator.cosineSimilarity(sourceEmbedding, nodeEmbedding);

      results.push({
        nodeId: node.id,
        nodeLabel: node.label,
        relevanceScore: similarity,
        similarityScore: similarity,
        context: `Similarity: ${(similarity * 100).toFixed(1)}% | ${node.label}`,
      });
    });

    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, topK);
  }
}

// ============================================
// TIMELINE HISTORY ENGINE
// ============================================

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'node_added' | 'node_removed' | 'node_updated' | 'connection_added' | 'connection_removed'
      | 'performance_change' | 'status_change' | 'capability_added' | 'layout_change';
  nodeId?: string;
  nodeLabel?: string;
  description: string;
  delta?: any;
}

export class TimelineEngine {
  private events: TimelineEvent[] = [];
  private currentIndex: number = -1;
  private snapshots: Array<{ nodes: KnowledgeGraphNode[]; connections: GraphConnection[]; timestamp: string }> = [];

  /**
   * Record an event
   */
  recordEvent(event: Omit<TimelineEvent, 'id' | 'timestamp'>): TimelineEvent {
    const newEvent: TimelineEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
    };

    this.events.push(newEvent);
    this.currentIndex = this.events.length - 1;
    return newEvent;
  }

  /**
   * Take a snapshot of the current graph state
   */
  takeSnapshot(nodes: KnowledgeGraphNode[], connections: GraphConnection[]): void {
    this.snapshots.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      connections: JSON.parse(JSON.stringify(connections)),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get all events
   */
  getEvents(): TimelineEvent[] {
    return [...this.events];
  }

  /**
   * Get events within a time range
   */
  getEventsInRange(startDate: Date, endDate: Date): TimelineEvent[] {
    return this.events.filter(e => {
      const eventDate = new Date(e.timestamp);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  /**
   * Get event count by type
   */
  getEventStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.events.forEach(e => {
      stats[e.type] = (stats[e.type] || 0) + 1;
    });
    return stats;
  }

  /**
   * Get snapshot at index
   */
  getSnapshot(index: number): { nodes: KnowledgeGraphNode[]; connections: GraphConnection[]; timestamp: string } | null {
    if (index < 0 || index >= this.snapshots.length) return null;
    return this.snapshots[index];
  }

  /**
   * Get total timeline duration
   */
  getTimelineDuration(): number {
    if (this.events.length < 2) return 0;
    const first = new Date(this.events[0].timestamp).getTime();
    const last = new Date(this.events[this.events.length - 1].timestamp).getTime();
    return last - first;
  }

  /**
   * Clear all events and snapshots
   */
  clear(): void {
    this.events = [];
    this.snapshots = [];
    this.currentIndex = -1;
  }
}

// ============================================
// NATURAL LANGUAGE QUERY ENGINE
// ============================================

export interface ParsedQuery {
  intent: 'search' | 'filter' | 'compare' | 'analyze' | 'pathfind' | 'stats';
  entities: string[];
  filters: {
    type?: string[];
    department?: string[];
    status?: string[];
    minPerformance?: number;
    capabilities?: string[];
  };
  target?: string;
  parameters: Record<string, any>;
}

export class NLQueryEngine {
  /**
   * Parse a natural language query into structured intent
   */
  static parseQuery(query: string): ParsedQuery {
    const lowerQuery = query.toLowerCase();
    const result: ParsedQuery = {
      intent: 'search',
      entities: [],
      filters: {},
      parameters: {},
    };

    // Detect intent
    if (lowerQuery.startsWith('find') || lowerQuery.startsWith('show') || lowerQuery.startsWith('search')) {
      result.intent = 'search';
    } else if (lowerQuery.startsWith('compare') || lowerQuery.includes(' vs ')) {
      result.intent = 'compare';
    } else if (lowerQuery.startsWith('analyze') || lowerQuery.includes('analyze') || lowerQuery.includes('performance of')) {
      result.intent = 'analyze';
    } else if (lowerQuery.includes('path') || lowerQuery.includes('route') || lowerQuery.includes('connect')) {
      result.intent = 'pathfind';
    } else if (lowerQuery.includes('stats') || lowerQuery.includes('count') || lowerQuery.includes('how many')) {
      result.intent = 'stats';
    } else if (lowerQuery.includes('filter') || lowerQuery.includes('only')) {
      result.intent = 'filter';
    }

    // Extract entities (capitalized words)
    const words = query.split(/\s+/);
    words.forEach(w => {
      if (/^[A-Z][a-z]+/.test(w) && w.length > 2) {
        result.entities.push(w);
      }
    });

    // Detect filters
    const typeKeywords = ['agent', 'department', 'executive', 'employee', 'sub-agent'];
    typeKeywords.forEach(t => {
      if (lowerQuery.includes(t)) {
        if (!result.filters.type) result.filters.type = [];
        result.filters.type.push(t.replace('-', '_'));
      }
    });

    const deptKeywords = ['technology', 'finance', 'marketing', 'operations', 'hr', 'sales', 'legal', 'security'];
    deptKeywords.forEach(d => {
      if (lowerQuery.includes(d)) {
        if (!result.filters.department) result.filters.department = [];
        result.filters.department.push(d);
      }
    });

    const statusKeywords = ['active', 'draft', 'paused', 'archived'];
    statusKeywords.forEach(s => {
      if (lowerQuery.includes(s)) {
        if (!result.filters.status) result.filters.status = [];
        result.filters.status.push(s);
      }
    });

    // Extract performance threshold
    const perfMatch = lowerQuery.match(/(\d+)%/);
    if (perfMatch) {
      result.filters.minPerformance = parseInt(perfMatch[1]);
    }

    // Extract capabilities
    const allCapabilities = ['nlp', 'vision', 'audio', 'automation', 'analytics', 'communication', 'security', 'prediction', 'planning', 'reasoning'];
    allCapabilities.forEach(cap => {
      if (lowerQuery.includes(cap)) {
        if (!result.filters.capabilities) result.filters.capabilities = [];
        result.filters.capabilities.push(cap);
      }
    });

    result.target = result.entities[0] || query.split(' ').slice(-1)[0];

    return result;
  }

  /**
   * Execute a parsed query against the graph data
   */
  static executeQuery(
    parsed: ParsedQuery,
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
  ): any {
    let results = [...nodes];

    // Apply filters
    if (parsed.filters.type) {
      results = results.filter(n => parsed.filters.type!.includes(n.type));
    }
    if (parsed.filters.department) {
      results = results.filter(n => parsed.filters.department!.includes(n.metadata.department));
    }
    if (parsed.filters.status) {
      results = results.filter(n => parsed.filters.status!.includes(n.status));
    }
    if (parsed.filters.minPerformance) {
      results = results.filter(n => n.metrics.performance >= parsed.filters.minPerformance!);
    }
    if (parsed.filters.capabilities) {
      results = results.filter(n =>
        n.capabilities.some(c => parsed.filters.capabilities!.includes(c)),
      );
    }

    // Entity search
    if (parsed.entities.length > 0) {
      const entityResults = results.filter(n =>
        parsed.entities.some(e =>
          n.label.toLowerCase().includes(e.toLowerCase()) ||
          n.metadata.department.toLowerCase().includes(e.toLowerCase()),
        ),
      );
      if (entityResults.length > 0) results = entityResults;
    }

    switch (parsed.intent) {
      case 'stats': {
        return {
          count: results.length,
          byType: this.groupBy(results, 'type'),
          byStatus: this.groupBy(results, 'status'),
          avgPerformance: results.reduce((s, n) => s + n.metrics.performance, 0) / (results.length || 1),
          byDepartment: this.groupBy(results, n => n.metadata.department),
        };
      }

      case 'analyze': {
        const target = parsed.target
          ? results.find(n => n.label.toLowerCase().includes(parsed.target!.toLowerCase()))
          : null;

        if (target) {
          return {
            node: target,
            metrics: target.metrics,
            capabilities: target.capabilities,
            skills: target.skills,
            centrality: {
              pageRank: target.pageRank,
              betweenness: target.betweennessCentrality,
              closeness: target.closenessCentrality,
            },
            connections: connections.filter(c => c.fromId === target.id || c.toId === target.id),
          };
        }
        return results;
      }

      case 'compare': {
        const targets = parsed.entities
          .map(e => nodes.find(n => n.label.toLowerCase().includes(e.toLowerCase())))
          .filter(Boolean);
        return targets.map(t => ({
          node: t!.label,
          performance: t!.metrics.performance,
          reliability: t!.metrics.reliability,
          efficiency: t!.metrics.efficiency,
          capabilities: t!.capabilities,
          centrality: t!.centralityScore,
        }));
      }

      case 'pathfind': {
        if (parsed.entities.length >= 2) {
          const fromNode = nodes.find(n => n.label.toLowerCase().includes(parsed.entities[0].toLowerCase()));
          const toNode = nodes.find(n => n.label.toLowerCase().includes(parsed.entities[1].toLowerCase()));
          if (fromNode && toNode) {
            return { from: fromNode.label, to: toNode.label };
          }
        }
        return { error: 'Could not find path endpoints' };
      }

      default:
        return results.slice(0, 20);
    }
  }

  /**
   * Group nodes by a key extractor
   */
  private static groupBy(nodes: KnowledgeGraphNode[], key: string | ((n: KnowledgeGraphNode) => string)): Record<string, number> {
    const groups: Record<string, number> = {};
    nodes.forEach(n => {
      const k = typeof key === 'function' ? key(n) : (n as any)[key] || 'unknown';
      groups[k] = (groups[k] || 0) + 1;
    });
    return groups;
  }
}

// ============================================
// PERFORMANCE ANALYTICS ENGINE
// ============================================

export interface PerformanceInsight {
  type: 'bottleneck' | 'optimization' | 'risk' | 'gap' | 'recommendation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedNodes: string[];
  potentialImprovement?: number;
  priority: number;
}

export class PerformanceAnalytics {
  /**
   * Analyze graph for performance insights
   */
  static analyze(nodes: KnowledgeGraphNode[], connections: GraphConnection[]): PerformanceInsight[] {
    const insights: PerformanceInsight[] = [];

    // 1. Detect bottlenecks (high betweenness centrality)
    const highCentrality = nodes
      .filter(n => n.betweennessCentrality > 0.7)
      .sort((a, b) => b.betweennessCentrality - a.betweennessCentrality);

    if (highCentrality.length > 0) {
      insights.push({
        type: 'bottleneck',
        severity: highCentrality.length > 3 ? 'critical' : 'high',
        title: 'Network Bottlenecks Detected',
        description: `${highCentrality.length} nodes have high betweenness centrality, indicating potential communication bottlenecks`,
        affectedNodes: highCentrality.slice(0, 5).map(n => n.id),
        potentialImprovement: 15 + highCentrality.length * 5,
        priority: 1,
      });
    }

    // 2. Low performance nodes
    const lowPerf = nodes
      .filter(n => n.metrics.performance < 70 && n.status === 'active')
      .sort((a, b) => a.metrics.performance - b.metrics.performance);

    if (lowPerf.length > 0) {
      insights.push({
        type: 'optimization',
        severity: lowPerf.length > 5 ? 'high' : 'medium',
        title: 'Underperforming Agents',
        description: `${lowPerf.length} active agents have performance below 70%. Consider retraining or reconfiguration`,
        affectedNodes: lowPerf.slice(0, 5).map(n => n.id),
        potentialImprovement: 20,
        priority: 2,
      });
    }

    // 3. Capability gaps
    const capabilityCoverage = new Map<string, number>();
    nodes.forEach(n => {
      n.capabilities.forEach(cap => {
        capabilityCoverage.set(cap, (capabilityCoverage.get(cap) || 0) + 1);
      });
    });

    const rareCapabilities = Array.from(capabilityCoverage.entries())
      .filter(([, count]) => count < 3)
      .map(([cap]) => cap);

    if (rareCapabilities.length > 0) {
      insights.push({
        type: 'gap',
        severity: rareCapabilities.length > 3 ? 'high' : 'medium',
        title: 'Capability Gaps Identified',
        description: `Rare capabilities: ${rareCapabilities.join(', ')}. Consider adding agents with these skills`,
        affectedNodes: [],
        potentialImprovement: 10,
        priority: 3,
      });
    }

    // 4. Department imbalance
    const deptCounts = new Map<string, number>();
    nodes.forEach(n => {
      const dept = n.metadata.department;
      deptCounts.set(dept, (deptCounts.get(dept) || 0) + 1);
    });

    const maxDept = Math.max(...deptCounts.values());
    const minDept = Math.min(...deptCounts.values());

    if (maxDept > minDept * 3) {
      insights.push({
        type: 'optimization',
        severity: 'medium',
        title: 'Department Imbalance',
        description: `Uneven agent distribution across departments. Largest has ${maxDept}, smallest has ${minDept} agents`,
        affectedNodes: [],
        potentialImprovement: 8,
        priority: 4,
      });
    }

    // 5. Redundancy detection
    const labelCounts = new Map<string, number>();
    nodes.forEach(n => {
      const baseLabel = n.label.replace(/\s+\d+$/, '');
      labelCounts.set(baseLabel, (labelCounts.get(baseLabel) || 0) + 1);
    });

    const redundant = Array.from(labelCounts.entries()).filter(([, count]) => count > 3);
    if (redundant.length > 0) {
      insights.push({
        type: 'optimization',
        severity: 'low',
        title: 'Potential Redundancy',
        description: `${redundant.length} agent types have more than 3 instances. Consider consolidation`,
        affectedNodes: [],
        potentialImprovement: 5,
        priority: 5,
      });
    }

    // 6. Connectivity analysis
    const isolatedNodes = nodes.filter(n => {
      const connected = connections.filter(c => c.fromId === n.id || c.toId === n.id);
      return connected.length === 0 && n.type !== 'executive';
    });

    if (isolatedNodes.length > 0) {
      insights.push({
        type: 'risk',
        severity: isolatedNodes.length > 5 ? 'high' : 'medium',
        title: 'Isolated Nodes Detected',
        description: `${isolatedNodes.length} nodes have no connections. These agents are disconnected from the graph`,
        affectedNodes: isolatedNodes.slice(0, 5).map(n => n.id),
        potentialImprovement: 3,
        priority: 6,
      });
    }

    // 7. Cost efficiency
    const costData = nodes
      .filter(n => n.metadata.budget)
      .map(n => ({
        node: n.label,
        budget: n.metadata.budget || 0,
        performance: n.metrics.performance,
        efficiency: n.metrics.costEfficiency,
      }))
      .sort((a, b) => a.efficiency - b.efficiency)
      .slice(0, 5);

    if (costData.length > 0) {
      insights.push({
        type: 'recommendation',
        severity: 'medium',
        title: 'Cost Efficiency Opportunities',
        description: `${costData.length} agents have low cost efficiency. Review resource allocation`,
        affectedNodes: [],
        potentialImprovement: 12,
        priority: 7,
      });
    }

    return insights.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Generate agent combination suggestions
   */
  static suggestAgentCombinations(nodes: KnowledgeGraphNode[]): Array<{
    agents: string[];
    synergy: number;
    description: string;
    useCase: string;
  }> {
    const suggestions: Array<{ agents: string[]; synergy: number; description: string; useCase: string }> = [];

    // Find agents with complementary capabilities
    const capabilityMap = new Map<string, KnowledgeGraphNode[]>();
    nodes.forEach(n => {
      n.capabilities.forEach(cap => {
        if (!capabilityMap.has(cap)) capabilityMap.set(cap, []);
        capabilityMap.get(cap)!.push(n);
      });
    });

    // Suggest combinations for common tasks
    const taskPatterns = [
      {
        useCase: 'Customer Support Automation',
        required: ['nlp', 'communication', 'automation'],
      },
      {
        useCase: 'Data Pipeline & Analytics',
        required: ['analytics', 'integration', 'automation'],
      },
      {
        useCase: 'Security Monitoring',
        required: ['security', 'monitoring', 'analytics'],
      },
      {
        useCase: 'Code Generation & Review',
        required: ['generation', 'reasoning', 'optimization'],
      },
      {
        useCase: 'Multi-Agent Coordination',
        required: ['collaboration', 'planning', 'communication'],
      },
    ];

    taskPatterns.forEach(pattern => {
      const availableAgents = pattern.required
        .map(cap => capabilityMap.get(cap) || [])
        .filter(arr => arr.length > 0);

      if (availableAgents.length >= pattern.required.length) {
        // Pick best agents for each capability
        const selected = new Set<string>();
        pattern.required.forEach(cap => {
          const candidates = capabilityMap.get(cap) || [];
          const best = candidates.find(c => !selected.has(c.id));
          if (best) selected.add(best.id);
        });

        if (selected.size >= pattern.required.length) {
          const synergyScore = Math.min(
            100,
            pattern.required.length * 25 +
            selected.size * 5 -
            (pattern.required.length - selected.size) * 10,
          );

          suggestions.push({
            agents: Array.from(selected),
            synergy: synergyScore,
            description: `Agent combination for ${pattern.useCase}. Synergy score: ${synergyScore}%`,
            useCase: pattern.useCase,
          });
        }
      }
    });

    return suggestions.sort((a, b) => b.synergy - a.synergy);
  }
}