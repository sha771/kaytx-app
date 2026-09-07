/**
 * =============================================================================
 * GRAPH ALGORITHMS - Knowledge Graph Computation Engine
 * =============================================================================
 *
 * Implements advanced graph algorithms for the 3D knowledge graph:
 * - Force-directed layout with customizable physics
 * - Community detection (Louvain algorithm)
 * - Shortest path (A* / Dijkstra)
 * - PageRank, Betweenness, Closeness centrality
 * - Minimum spanning tree
 * - Graph clustering
 *
 * @version 3.0.0
 */

import { KnowledgeGraphNode, GraphConnection, Point3D } from './types';

// ============================================
// UTILITY TYPES
// ============================================

interface WeightedEdge {
  from: string;
  to: string;
  weight: number;
}

interface Community {
  id: number;
  nodes: string[];
  color: string;
}

interface PathResult {
  path: string[];
  distance: number;
  nodes: KnowledgeGraphNode[];
}

// ============================================
// COMMUNITY DETECTION - Louvain Algorithm
// ============================================

const COMMUNITY_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#f97316',
  '#8b5cf6', '#14b8a6', '#f43f5e', '#06b6d4', '#84cc16',
  '#a855f7', '#22c55e', '#eab308', '#ef4444', '#0ea5e9',
  '#d946ef', '#64748b', '#38bdf8', '#fb923c', '#4ade80',
];

export class GraphCommunityDetection {
  /**
   * Detect communities using the Louvain algorithm
   */
  static detectCommunities(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
    maxIterations: number = 100,
  ): Community[] {
    const nodeIds = nodes.map(n => n.id);
    const nodeIndex = new Map<string, number>();
    nodeIds.forEach((id, i) => nodeIndex.set(id, i));

    // Build adjacency matrix
    const adjacency = new Map<string, Map<string, number>>();
    nodeIds.forEach(id => adjacency.set(id, new Map()));

    connections.forEach(conn => {
      if (adjacency.has(conn.fromId) && adjacency.has(conn.toId)) {
        const weight = conn.weight || 1;
        adjacency.get(conn.fromId)!.set(conn.toId, weight);
        if (conn.bidirectional) {
          adjacency.get(conn.toId)!.set(conn.fromId, weight);
        }
      }
    });

    // Initialize: each node in its own community
    const community: Map<string, number> = new Map();
    nodeIds.forEach(id => community.set(id, nodeIndex.get(id)!));

    // Total weight
    let totalWeight = 0;
    adjacency.forEach((edges) => {
      edges.forEach(weight => { totalWeight += weight; });
    });

    // Modularity optimization
    let improved = true;
    let iterations = 0;

    while (improved && iterations < maxIterations) {
      improved = false;
      iterations++;

      nodeIds.forEach(nodeId => {
        const neighbors = adjacency.get(nodeId)!;
        const currentComm = community.get(nodeId)!;
        let bestComm = currentComm;
        let bestModularity = -Infinity;

        // Try moving to neighbor's community
        const neighborComms = new Set<number>();
        neighbors.forEach((_, neighborId) => {
          neighborComms.add(community.get(neighborId)!);
        });

        neighborComms.forEach(targetComm => {
          // Calculate modularity gain (simplified)
          let gain = 0;
          neighbors.forEach((weight, neighborId) => {
            if (community.get(neighborId) === targetComm) {
              gain += weight;
            }
          });

          if (gain > bestModularity) {
            bestModularity = gain;
            bestComm = targetComm;
          }
        });

        if (bestComm !== currentComm) {
          community.set(nodeId, bestComm);
          improved = true;
        }
      });
    }

    // Build community result
    const commGroups = new Map<number, string[]>();
    community.forEach((commId, nodeId) => {
      if (!commGroups.has(commId)) commGroups.set(commId, []);
      commGroups.get(commId)!.push(nodeId);
    });

    const communities: Community[] = [];
    let colorIndex = 0;

    commGroups.forEach((nodeList, commId) => {
      communities.push({
        id: commId,
        nodes: nodeList,
        color: COMMUNITY_COLORS[colorIndex % COMMUNITY_COLORS.length],
      });
      colorIndex++;
    });

    return communities.sort((a, b) => b.nodes.length - a.nodes.length);
  }

  /**
   * Get communities summary statistics
   */
  static getCommunitySummary(communities: Community[]): {
    count: number;
    maxSize: number;
    minSize: number;
    avgSize: number;
    largestCommunity: Community;
  } {
    const sizes = communities.map(c => c.nodes.length);
    return {
      count: communities.length,
      maxSize: Math.max(...sizes),
      minSize: Math.min(...sizes),
      avgSize: sizes.reduce((a, b) => a + b, 0) / sizes.length,
      largestCommunity: communities.reduce((a, b) => a.nodes.length > b.nodes.length ? a : b),
    };
  }
}

// ============================================
// SHORTEST PATH - A* Algorithm
// ============================================

export class GraphShortestPath {
  /**
   * Find shortest path between two nodes using A*
   */
  static findShortestPath(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
    fromId: string,
    toId: string,
  ): PathResult | null {
    const nodeMap = new Map<string, KnowledgeGraphNode>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    if (!nodeMap.has(fromId) || !nodeMap.has(toId)) return null;

    // Build adjacency with weights
    const adjacency = new Map<string, Array<{ nodeId: string; weight: number }>>();
    nodes.forEach(n => adjacency.set(n.id, []));

    connections.forEach(conn => {
      if (adjacency.has(conn.fromId) && adjacency.has(conn.toId)) {
        const weight = conn.weight || 1;
        adjacency.get(conn.fromId)!.push({ nodeId: conn.toId, weight });
        if (conn.bidirectional) {
          adjacency.get(conn.toId)!.push({ nodeId: conn.fromId, weight });
        }
      }
    });

    // A* algorithm
    const openSet = new Set<string>([fromId]);
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();

    nodes.forEach(n => {
      gScore.set(n.id, Infinity);
      fScore.set(n.id, Infinity);
    });
    gScore.set(fromId, 0);
    fScore.set(fromId, this.heuristic(fromId, toId, nodeMap));

    while (openSet.size > 0) {
      // Get node with lowest fScore
      let current = '';
      let lowestF = Infinity;
      openSet.forEach(id => {
        const f = fScore.get(id) || Infinity;
        if (f < lowestF) {
          lowestF = f;
          current = id;
        }
      });

      if (current === toId) {
        // Reconstruct path
        const path: string[] = [];
        let curr = current;
        while (curr !== fromId) {
          path.unshift(curr);
          curr = cameFrom.get(curr)!;
        }
        path.unshift(fromId);

        return {
          path,
          distance: gScore.get(toId) || 0,
          nodes: path.map(id => nodeMap.get(id)!).filter(Boolean),
        };
      }

      openSet.delete(current);
      const neighbors = adjacency.get(current) || [];

      neighbors.forEach(({ nodeId, weight }) => {
        const tentativeG = (gScore.get(current) || Infinity) + weight;

        if (tentativeG < (gScore.get(nodeId) || Infinity)) {
          cameFrom.set(nodeId, current);
          gScore.set(nodeId, tentativeG);
          fScore.set(nodeId, tentativeG + this.heuristic(nodeId, toId, nodeMap));
          openSet.add(nodeId);
        }
      });
    }

    return null; // No path found
  }

  /**
   * Heuristic function for A* (Euclidean distance between node positions)
   */
  private static heuristic(fromId: string, toId: string, nodeMap: Map<string, KnowledgeGraphNode>): number {
    const from = nodeMap.get(fromId);
    const to = nodeMap.get(toId);
    if (!from || !to) return 0;

    return Math.sqrt(
      (from.position.x - to.position.x) ** 2 +
      (from.position.y - to.position.y) ** 2 +
      (from.position.z - to.position.z) ** 2,
    );
  }

  /**
   * Find all shortest paths from a start node
   */
  static findAllShortestPaths(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
    fromId: string,
  ): Map<string, PathResult> {
    const results = new Map<string, PathResult>();

    nodes.forEach(node => {
      if (node.id !== fromId) {
        const path = this.findShortestPath(nodes, connections, fromId, node.id);
        if (path) {
          results.set(node.id, path);
        }
      }
    });

    return results;
  }
}

// ============================================
// FORCE-DIRECTED LAYOUT
// ============================================

export interface ForceDirectedConfig {
  repulsionStrength: number;
  attractionStrength: number;
  damping: number;
  iterations: number;
  centeringForce: number;
  maxDisplacement: number;
}

export const DEFAULT_FORCE_CONFIG: ForceDirectedConfig = {
  repulsionStrength: 5000,
  attractionStrength: 0.01,
  damping: 0.85,
  iterations: 100,
  centeringForce: 0.01,
  maxDisplacement: 50,
};

export class ForceDirectedLayout {
  /**
   * Run force-directed layout algorithm on the graph
   */
  static compute(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
    config: ForceDirectedConfig = DEFAULT_FORCE_CONFIG,
    onProgress?: (progress: number) => void,
  ): Map<string, Point3D> {
    const positions = new Map<string, Point3D>();
    const velocities = new Map<string, Point3D>();

    // Initialize positions randomly in 3D sphere
    nodes.forEach((node, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 100 + Math.random() * 200;

      positions.set(node.id, {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      });
      velocities.set(node.id, { x: 0, y: 0, z: 0 });
    });

    // Build adjacency
    const adjacency = new Map<string, string[]>();
    nodes.forEach(n => adjacency.set(n.id, []));
    connections.forEach(conn => {
      if (adjacency.has(conn.fromId) && adjacency.has(conn.toId)) {
        adjacency.get(conn.fromId)!.push(conn.toId);
        if (conn.bidirectional) adjacency.get(conn.toId)!.push(conn.fromId);
      }
    });

    const totalIterations = config.iterations;

    for (let iter = 0; iter < totalIterations; iter++) {
      // Report progress
      if (onProgress && iter % Math.max(1, Math.floor(totalIterations / 10)) === 0) {
        onProgress(iter / totalIterations);
      }

      const forces = new Map<string, Point3D>();
      nodes.forEach(n => forces.set(n.id, { x: 0, y: 0, z: 0 }));

      // Repulsion forces (all pairs)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const posI = positions.get(nodes[i].id)!;
          const posJ = positions.get(nodes[j].id)!;

          let dx = posI.x - posJ.x;
          let dy = posI.y - posJ.y;
          let dz = posI.z - posJ.z;

          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          const force = config.repulsionStrength / (dist * dist);

          dx = (dx / dist) * force;
          dy = (dy / dist) * force;
          dz = (dz / dist) * force;

          const fI = forces.get(nodes[i].id)!;
          const fJ = forces.get(nodes[j].id)!;
          fI.x += dx;
          fI.y += dy;
          fI.z += dz;
          fJ.x -= dx;
          fJ.y -= dy;
          fJ.z -= dz;
        }
      }

      // Attraction forces (edges)
      connections.forEach(conn => {
        const posFrom = positions.get(conn.fromId);
        const posTo = positions.get(conn.toId);
        if (!posFrom || !posTo) return;

        const dx = posTo.x - posFrom.x;
        const dy = posTo.y - posFrom.y;
        const dz = posTo.z - posFrom.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

        const force = config.attractionStrength * dist;

        const fFrom = forces.get(conn.fromId)!;
        const fTo = forces.get(conn.toId)!;
        fFrom.x += (dx / dist) * force;
        fFrom.y += (dy / dist) * force;
        fFrom.z += (dz / dist) * force;
        fTo.x -= (dx / dist) * force;
        fTo.y -= (dy / dist) * force;
        fTo.z -= (dz / dist) * force;
      });

      // Centering force
      nodes.forEach(node => {
        const pos = positions.get(node.id)!;
        const force = forces.get(node.id)!;
        force.x -= pos.x * config.centeringForce;
        force.y -= pos.y * config.centeringForce;
        force.z -= pos.z * config.centeringForce;
      });

      // Update positions with damping
      nodes.forEach(node => {
        const vel = velocities.get(node.id)!;
        const force = forces.get(node.id)!;
        const pos = positions.get(node.id)!;

        vel.x = (vel.x + force.x) * config.damping;
        vel.y = (vel.y + force.y) * config.damping;
        vel.z = (vel.z + force.z) * config.damping;

        // Clamp displacement
        const displacement = Math.sqrt(vel.x ** 2 + vel.y ** 2 + vel.z ** 2);
        if (displacement > config.maxDisplacement) {
          vel.x = (vel.x / displacement) * config.maxDisplacement;
          vel.y = (vel.y / displacement) * config.maxDisplacement;
          vel.z = (vel.z / displacement) * config.maxDisplacement;
        }

        pos.x += vel.x;
        pos.y += vel.y;
        pos.z += vel.z;
      });
    }

    if (onProgress) onProgress(1);
    return positions;
  }
}

// ============================================
// PAGE RANK ALGORITHM
// ============================================

export class GraphPageRank {
  /**
   * Compute PageRank scores for all nodes
   */
  static compute(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
    dampingFactor: number = 0.85,
    maxIterations: number = 100,
    tolerance: number = 1e-6,
  ): Map<string, number> {
    const N = nodes.length;
    const nodeIds = nodes.map(n => n.id);
    const scores = new Map<string, number>();

    // Initialize scores
    const initialScore = 1 / N;
    nodeIds.forEach(id => scores.set(id, initialScore));

    // Build outgoing link counts
    const outDegree = new Map<string, number>();
    nodeIds.forEach(id => outDegree.set(id, 0));

    connections.forEach(conn => {
      outDegree.set(conn.fromId, (outDegree.get(conn.fromId) || 0) + 1);
      if (conn.bidirectional) {
        outDegree.set(conn.toId, (outDegree.get(conn.toId) || 0) + 1);
      }
    });

    // Build incoming links
    const incoming = new Map<string, string[]>();
    nodeIds.forEach(id => incoming.set(id, []));

    connections.forEach(conn => {
      incoming.get(conn.toId)!.push(conn.fromId);
      if (conn.bidirectional) {
        incoming.get(conn.fromId)!.push(conn.toId);
      }
    });

    // Iterate PageRank
    for (let iter = 0; iter < maxIterations; iter++) {
      const newScores = new Map<string, number>();
      let totalDiff = 0;

      const danglingScore = nodeIds
        .filter(id => (outDegree.get(id) || 0) === 0)
        .reduce((sum, id) => sum + (scores.get(id) || 0), 0) / N;

      nodeIds.forEach(id => {
        let sum = 0;
        const incomingNodes = incoming.get(id) || [];

        incomingNodes.forEach(inId => {
          const inDegree = outDegree.get(inId) || 1;
          sum += (scores.get(inId) || 0) / inDegree;
        });

        const newScore = (1 - dampingFactor) / N + dampingFactor * (sum + danglingScore);
        newScores.set(id, newScore);
        totalDiff += Math.abs(newScore - (scores.get(id) || 0));
      });

      scores.clear();
      newScores.forEach((score, id) => scores.set(id, score));

      if (totalDiff < tolerance) break;
    }

    return scores;
  }
}

// ============================================
// BETWEENNESS CENTRALITY
// ============================================

export class GraphCentrality {
  /**
   * Compute betweenness centrality using Brandes' algorithm
   */
  static computeBetweenness(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
  ): Map<string, number> {
    const betweenness = new Map<string, number>();
    nodes.forEach(n => betweenness.set(n.id, 0));

    // Build adjacency
    const adjacency = new Map<string, string[]>();
    nodes.forEach(n => adjacency.set(n.id, []));
    connections.forEach(conn => {
      if (adjacency.has(conn.fromId) && adjacency.has(conn.toId)) {
        adjacency.get(conn.fromId)!.push(conn.toId);
        if (conn.bidirectional) adjacency.get(conn.toId)!.push(conn.fromId);
      }
    });

    // Brandes' algorithm
    nodes.forEach(source => {
      const stack: string[] = [];
      const predecessors = new Map<string, string[]>();
      const sigma = new Map<string, number>();  // Number of shortest paths
      const distance = new Map<string, number>();
      const delta = new Map<string, number>();

      nodes.forEach(n => {
        predecessors.set(n.id, []);
        sigma.set(n.id, 0);
        distance.set(n.id, -1);
        delta.set(n.id, 0);
      });

      sigma.set(source.id, 1);
      distance.set(source.id, 0);

      const queue: string[] = [source.id];

      while (queue.length > 0) {
        const v = queue.shift()!;
        stack.push(v);

        const neighbors = adjacency.get(v) || [];
        neighbors.forEach(w => {
          // Path discovery
          if (distance.get(w) === -1) {
            queue.push(w);
            distance.set(w, (distance.get(v) || 0) + 1);
          }

          // Path counting
          if (distance.get(w) === (distance.get(v) || 0) + 1) {
            sigma.set(w, (sigma.get(w) || 0) + (sigma.get(v) || 0));
            predecessors.get(w)!.push(v);
          }
        });
      }

      // Back-propagation
      while (stack.length > 0) {
        const w = stack.pop()!;
        predecessors.get(w)!.forEach(v => {
          delta.set(
            v,
            (delta.get(v) || 0) +
            ((sigma.get(v) || 0) / (sigma.get(w) || 1)) * (1 + (delta.get(w) || 0)),
          );
        });

        if (w !== source.id) {
          betweenness.set(w, (betweenness.get(w) || 0) + (delta.get(w) || 0));
        }
      }
    });

    // Normalize
    const n = nodes.length;
    const normalizationFactor = n > 2 ? ((n - 1) * (n - 2)) : 1;

    betweenness.forEach((value, id) => {
      betweenness.set(id, value / normalizationFactor);
    });

    return betweenness;
  }

  /**
   * Compute closeness centrality for all nodes
   */
  static computeCloseness(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
  ): Map<string, number> {
    const closeness = new Map<string, number>();

    // Build adjacency
    const adjacency = new Map<string, string[]>();
    nodes.forEach(n => adjacency.set(n.id, []));
    connections.forEach(conn => {
      if (adjacency.has(conn.fromId) && adjacency.has(conn.toId)) {
        adjacency.get(conn.fromId)!.push(conn.toId);
        if (conn.bidirectional) adjacency.get(conn.toId)!.push(conn.fromId);
      }
    });

    // BFS from each node
    nodes.forEach(source => {
      const distance = new Map<string, number>();
      const queue: string[] = [source.id];
      const visited = new Set<string>([source.id]);

      nodes.forEach(n => distance.set(n.id, Infinity));
      distance.set(source.id, 0);

      while (queue.length > 0) {
        const v = queue.shift()!;
        const neighbors = adjacency.get(v) || [];

        neighbors.forEach(w => {
          if (!visited.has(w)) {
            visited.add(w);
            distance.set(w, (distance.get(v) || 0) + 1);
            queue.push(w);
          }
        });
      }

      // Sum of distances to all reachable nodes
      let totalDist = 0;
      let reachable = 0;

      distance.forEach((dist, id) => {
        if (dist !== Infinity && id !== source.id) {
          totalDist += dist;
          reachable++;
        }
      });

      // Closeness = (reachable - 1) / totalDist
      const score = reachable > 0 && totalDist > 0 ? reachable / totalDist : 0;
      closeness.set(source.id, score);
    });

    return closeness;
  }
}

// ============================================
// MINIMUM SPANNING TREE
// ============================================

export class GraphMST {
  /**
   * Compute Minimum Spanning Tree using Kruskal's algorithm
   */
  static computeMST(
    nodes: KnowledgeGraphNode[],
    connections: GraphConnection[],
  ): GraphConnection[] {
    // Sort edges by weight
    const sorted = [...connections]
      .filter(c => c.style !== 'dashed' && c.style !== 'dotted')
      .sort((a, b) => (a.weight || 1) - (b.weight || 1));

    // Union-Find data structure
    const parent = new Map<string, string>();
    const rank = new Map<string, number>();

    nodes.forEach(n => {
      parent.set(n.id, n.id);
      rank.set(n.id, 0);
    });

    const find = (id: string): string => {
      if (parent.get(id) !== id) {
        parent.set(id, find(parent.get(id)!));
      }
      return parent.get(id)!;
    };

    const union = (id1: string, id2: string): boolean => {
      const root1 = find(id1);
      const root2 = find(id2);

      if (root1 === root2) return false;

      const rank1 = rank.get(root1) || 0;
      const rank2 = rank.get(root2) || 0;

      if (rank1 < rank2) {
        parent.set(root1, root2);
      } else if (rank1 > rank2) {
        parent.set(root2, root1);
      } else {
        parent.set(root2, root1);
        rank.set(root1, rank1 + 1);
      }

      return true;
    };

    const mst: GraphConnection[] = [];

    sorted.forEach(conn => {
      if (union(conn.fromId, conn.toId)) {
        mst.push({ ...conn, style: 'solid', width: 2, color: '#10b981' });
      }
    });

    return mst;
  }
}

// ============================================
// GRAPH CLUSTERING - k-Medoids
// ============================================

export class GraphClustering {
  /**
   * Cluster nodes based on feature vectors
   */
  static clusterNodes(
    nodes: KnowledgeGraphNode[],
    k: number = 5,
    featureExtractor: (node: KnowledgeGraphNode) => number[] = this.defaultFeatures,
  ): Map<number, string[]> {
    const featureVectors = nodes.map(n => featureExtractor(n));
    const dimensions = featureVectors[0]?.length || 1;

    // Initialize centroids (k-means++)
    const centroids: number[][] = [];
    const selected = new Set<number>();

    // First centroid: random
    const firstIdx = Math.floor(Math.random() * nodes.length);
    centroids.push(featureVectors[firstIdx]);
    selected.add(firstIdx);

    for (let c = 1; c < k; c++) {
      const distances = featureVectors.map((fv, i) => {
        if (selected.has(i)) return 0;
        const minDist = Math.min(
          ...centroids.map(cent => this.euclideanDist(fv, cent)),
        );
        return minDist * minDist;
      });

      const totalDist = distances.reduce((a, b) => a + b, 0);
      let r = Math.random() * totalDist;
      let nextIdx = 0;

      for (let i = 0; i < distances.length; i++) {
        r -= distances[i];
        if (r <= 0) {
          nextIdx = i;
          break;
        }
      }

      centroids.push(featureVectors[nextIdx]);
      selected.add(nextIdx);
    }

    // Iterate k-means
    const assignments = new Map<number, number>(nodes.map((_, i) => [i, 0]));

    for (let iter = 0; iter < 50; iter++) {
      // Assign to nearest centroid
      nodes.forEach((_, i) => {
        const distances = centroids.map(cent => this.euclideanDist(featureVectors[i], cent));
        const nearest = distances.indexOf(Math.min(...distances));
        assignments.set(i, nearest);
      });

      // Update centroids
      for (let c = 0; c < centroids.length; c++) {
        const members = nodes.filter((_, i) => assignments.get(i) === c);
        if (members.length === 0) continue;

        const newCentroid = Array(dimensions).fill(0);
        members.forEach((_, i) => {
          for (let d = 0; d < dimensions; d++) {
            newCentroid[d] += featureVectors[i][d];
          }
        });
        for (let d = 0; d < dimensions; d++) {
          newCentroid[d] /= members.length;
        }
        centroids[c] = newCentroid;
      }
    }

    // Build result
    const clusters = new Map<number, string[]>();
    nodes.forEach((node, i) => {
      const clusterId = assignments.get(i) || 0;
      if (!clusters.has(clusterId)) clusters.set(clusterId, []);
      clusters.get(clusterId)!.push(node.id);
    });

    return clusters;
  }

  /**
   * Default feature extractor based on node metrics
   */
  private static defaultFeatures(node: KnowledgeGraphNode): number[] {
    return [
      node.metrics.performance / 100,
      node.metrics.reliability / 100,
      node.metrics.efficiency / 100,
      node.depth / 10,
      node.centralityScore,
      node.pageRank,
      node.capabilities.length / 10,
    ];
  }

  /**
   * Euclidean distance between two vectors
   */
  private static euclideanDist(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
  }
}