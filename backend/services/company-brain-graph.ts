/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

/**
 * Company Brain Knowledge Graph Service
 * Manages knowledge graph with visualization and querying capabilities
 * Provides graph traversal, path finding, and relationship analysis
 */

export interface GraphNode {
  id: string;
  type: string;
  label: string;
  properties: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight: number;
  properties: Record<string, any>;
  createdAt: Date;
}

export interface GraphPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
  length: number;
  weight: number;
}

export interface GraphQuery {
  nodeTypes?: string[];
  edgeTypes?: string[];
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export interface GraphStatistics {
  totalNodes: number;
  totalEdges: number;
  nodeTypeDistribution: Record<string, number>;
  edgeTypeDistribution: Record<string, number>;
  averageDegree: number;
  connectedComponents: number;
  largestComponentSize: number;
}

export class KnowledgeGraphService {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: Map<string, GraphEdge> = new Map();
  private adjacencyList: Map<string, Set<string>> = new Map();

  /**
   * Add a node to the graph
   */
  addNode(node: Omit<GraphNode, 'createdAt' | 'updatedAt'>): GraphNode {
    const newNode: GraphNode = {
      ...node,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.nodes.set(node.id, newNode);
    this.adjacencyList.set(node.id, new Set());

    return newNode;
  }

  /**
   * Add an edge to the graph
   */
  addEdge(edge: Omit<GraphEdge, 'createdAt'>): GraphEdge {
    const newEdge: GraphEdge = {
      ...edge,
      createdAt: new Date(),
    };

    this.edges.set(edge.id, newEdge);

    // Update adjacency list
    if (!this.adjacencyList.has(edge.source)) {
      this.adjacencyList.set(edge.source, new Set());
    }
    if (!this.adjacencyList.has(edge.target)) {
      this.adjacencyList.set(edge.target, new Set());
    }

    this.adjacencyList.get(edge.source)?.add(edge.target);
    this.adjacencyList.get(edge.target)?.add(edge.source);

    return newEdge;
  }

  /**
   * Get a node by ID
   */
  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * Update a node
   */
  updateNode(id: string, updates: Partial<GraphNode>): GraphNode | undefined {
    const existing = this.nodes.get(id);
    if (!existing) return undefined;

    const updated: GraphNode = {
      ...existing,
      ...updates,
      id: existing.id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };

    this.nodes.set(id, updated);
    return updated;
  }

  /**
   * Delete a node and its edges
   */
  deleteNode(id: string): boolean {
    const deleted = this.nodes.delete(id);
    if (deleted) {
      // Remove connected edges
      for (const [edgeId, edge] of this.edges.entries()) {
        if (edge.source === id || edge.target === id) {
          this.edges.delete(edgeId);
        }
      }
      this.adjacencyList.delete(id);
    }
    return deleted;
  }

  /**
   * Get an edge by ID
   */
  getEdge(id: string): GraphEdge | undefined {
    return this.edges.get(id);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get all edges
   */
  getAllEdges(): GraphEdge[] {
    return Array.from(this.edges.values());
  }

  /**
   * Query nodes with filters
   */
  queryNodes(query: GraphQuery): GraphNode[] {
    let results = Array.from(this.nodes.values());

    if (query.nodeTypes && query.nodeTypes.length > 0) {
      results = results.filter(node => query.nodeTypes!.includes(node.type));
    }

    if (query.filters) {
      for (const [key, value] of Object.entries(query.filters)) {
        results = results.filter(node => {
          const nodeValue = node.properties[key];
          if (Array.isArray(value)) {
            return value.includes(nodeValue);
          }
          return nodeValue === value;
        });
      }
    }

    if (query.offset) {
      results = results.slice(query.offset);
    }

    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  /**
   * Query edges with filters
   */
  queryEdges(query: GraphQuery): GraphEdge[] {
    let results = Array.from(this.edges.values());

    if (query.edgeTypes && query.edgeTypes.length > 0) {
      results = results.filter(edge => query.edgeTypes!.includes(edge.type));
    }

    if (query.filters) {
      for (const [key, value] of Object.entries(query.filters)) {
        results = results.filter(edge => {
          const edgeValue = edge.properties[key];
          if (Array.isArray(value)) {
            return value.includes(edgeValue);
          }
          return edgeValue === value;
        });
      }
    }

    if (query.offset) {
      results = results.slice(query.offset);
    }

    if (query.limit) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  /**
   * Get neighbors of a node
   */
  getNeighbors(nodeId: string, edgeTypes?: string[]): GraphNode[] {
    const neighborIds = this.adjacencyList.get(nodeId);
    if (!neighborIds) return [];

    let neighbors: GraphNode[] = [];
    for (const neighborId of neighborIds) {
      const node = this.nodes.get(neighborId);
      if (node) {
        // Check edge type filter
        if (edgeTypes && edgeTypes.length > 0) {
          const edge = this.findEdge(nodeId, neighborId, edgeTypes);
          if (edge) {
            neighbors.push(node);
          }
        } else {
          neighbors.push(node);
        }
      }
    }

    return neighbors;
  }

  /**
   * Find edge between two nodes
   */
  private findEdge(source: string, target: string, edgeTypes?: string[]): GraphEdge | undefined {
    for (const edge of this.edges.values()) {
      if (
        (edge.source === source && edge.target === target) ||
        (edge.source === target && edge.target === source)
      ) {
        if (!edgeTypes || edgeTypes.includes(edge.type)) {
          return edge;
        }
      }
    }
    return undefined;
  }

  /**
   * Find shortest path between two nodes (BFS)
   */
  findShortestPath(sourceId: string, targetId: string, edgeTypes?: string[]): GraphPath | null {
    if (!this.nodes.has(sourceId) || !this.nodes.has(targetId)) {
      return null;
    }

    if (sourceId === targetId) {
      return {
        nodes: [this.nodes.get(sourceId)!],
        edges: [],
        length: 0,
        weight: 0,
      };
    }

    const visited = new Set<string>();
    const queue: Array<{ nodeId: string; path: GraphNode[]; edges: GraphEdge[]; weight: number }> = [
      { nodeId: sourceId, path: [this.nodes.get(sourceId)!], edges: [], weight: 0 },
    ];
    visited.add(sourceId);

    while (queue.length > 0) {
      const current = queue.shift()!;

      const neighbors = this.getNeighbors(current.nodeId, edgeTypes);
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.id)) continue;

        visited.add(neighbor.id);

        const edge = this.findEdge(current.nodeId, neighbor.id, edgeTypes);
        const newWeight = current.weight + (edge?.weight || 1);

        if (neighbor.id === targetId) {
          return {
            nodes: [...current.path, neighbor],
            edges: [...current.edges, edge!],
            length: current.path.length,
            weight: newWeight,
          };
        }

        queue.push({
          nodeId: neighbor.id,
          path: [...current.path, neighbor],
          edges: [...current.edges, edge!],
          weight: newWeight,
        });
      }
    }

    return null;
  }

  /**
   * Find all paths between two nodes (DFS)
   */
  findAllPaths(sourceId: string, targetId: string, maxLength?: number, edgeTypes?: string[]): GraphPath[] {
    const paths: GraphPath[] = [];
    const visited = new Set<string>();

    const dfs = (
      currentNodeId: string,
      currentPath: GraphNode[],
      currentEdges: GraphEdge[],
      currentWeight: number
    ) => {
      if (currentNodeId === targetId) {
        paths.push({
          nodes: [...currentPath],
          edges: [...currentEdges],
          length: currentPath.length - 1,
          weight: currentWeight,
        });
        return;
      }

      if (maxLength && currentPath.length > maxLength) return;

      const neighbors = this.getNeighbors(currentNodeId, edgeTypes);
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.id)) continue;

        visited.add(neighbor.id);

        const edge = this.findEdge(currentNodeId, neighbor.id, edgeTypes);
        dfs(
          neighbor.id,
          [...currentPath, neighbor],
          [...currentEdges, edge!],
          currentWeight + (edge?.weight || 1)
        );

        visited.delete(neighbor.id);
      }
    };

    dfs(sourceId, [this.nodes.get(sourceId)!], [], 0);
    return paths;
  }

  /**
   * Get subgraph around a node
   */
  getSubgraph(centerNodeId: string, depth: number = 2, edgeTypes?: string[]): {
    nodes: GraphNode[];
    edges: GraphEdge[];
  } {
    const visitedNodes = new Set<string>();
    const visitedEdges = new Set<string>();
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const bfs = (nodeId: string, currentDepth: number) => {
      if (currentDepth > depth) return;
      if (visitedNodes.has(nodeId)) return;

      visitedNodes.add(nodeId);
      const node = this.nodes.get(nodeId);
      if (node) nodes.push(node);

      const neighbors = this.getNeighbors(nodeId, edgeTypes);
      for (const neighbor of neighbors) {
        const edge = this.findEdge(nodeId, neighbor.id, edgeTypes);
        if (edge && !visitedEdges.has(edge.id)) {
          visitedEdges.add(edge.id);
          edges.push(edge);
        }

        bfs(neighbor.id, currentDepth + 1);
      }
    };

    bfs(centerNodeId, 0);

    return { nodes, edges };
  }

  /**
   * Get graph statistics
   */
  getStatistics(): GraphStatistics {
    const totalNodes = this.nodes.size;
    const totalEdges = this.edges.size;

    const nodeTypeDistribution: Record<string, number> = {};
    const edgeTypeDistribution: Record<string, number> = {};

    for (const node of this.nodes.values()) {
      nodeTypeDistribution[node.type] = (nodeTypeDistribution[node.type] || 0) + 1;
    }

    for (const edge of this.edges.values()) {
      edgeTypeDistribution[edge.type] = (edgeTypeDistribution[edge.type] || 0) + 1;
    }

    // Calculate average degree
    let totalDegree = 0;
    for (const neighbors of this.adjacencyList.values()) {
      totalDegree += neighbors.size;
    }
    const averageDegree = totalNodes > 0 ? totalDegree / totalNodes : 0;

    // Find connected components
    const visited = new Set<string>();
    let connectedComponents = 0;
    let largestComponentSize = 0;

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        connectedComponents++;
        const componentSize = this.getComponentSize(nodeId, visited);
        largestComponentSize = Math.max(largestComponentSize, componentSize);
      }
    }

    return {
      totalNodes,
      totalEdges,
      nodeTypeDistribution,
      edgeTypeDistribution,
      averageDegree,
      connectedComponents,
      largestComponentSize,
    };
  }

  /**
   * Get component size using BFS
   */
  private getComponentSize(startNodeId: string, visited: Set<string>): number {
    const queue = [startNodeId];
    visited.add(startNodeId);
    let size = 0;

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      size++;

      const neighbors = this.adjacencyList.get(nodeId);
      if (neighbors) {
        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            queue.push(neighborId);
          }
        }
      }
    }

    return size;
  }

  /**
   * Get graph data for visualization
   */
  getVisualizationData(limit?: number, nodeTypes?: string[]): {
    nodes: Array<{ id: string; label: string; type: string; data: Record<string, any> }>;
    edges: Array<{ id: string; source: string; target: string; type: string; weight: number }>;
  } {
    let nodes = Array.from(this.nodes.values());

    if (nodeTypes && nodeTypes.length > 0) {
      nodes = nodes.filter(node => nodeTypes.includes(node.type));
    }

    if (limit) {
      nodes = nodes.slice(0, limit);
    }

    const nodeIds = new Set(nodes.map(n => n.id));
    const edges = Array.from(this.edges.values()).filter(
      edge => nodeIds.has(edge.source) && nodeIds.has(edge.target)
    );

    return {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.label,
        type: node.type,
        data: node.properties,
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        weight: edge.weight,
      })),
    };
  }

  /**
   * Update a node
   */
  updateNode(id: string, updates: Partial<Omit<GraphNode, 'id' | 'createdAt'>>): GraphNode | null {
    const node = this.nodes.get(id);
    if (!node) return null;

    const updatedNode: GraphNode = {
      ...node,
      ...updates,
      updatedAt: new Date(),
    };

    this.nodes.set(id, updatedNode);
    return updatedNode;
  }

  /**
   * Update an edge
   */
  updateEdge(id: string, updates: Partial<Omit<GraphEdge, 'id' | 'createdAt'>>): GraphEdge | null {
    const edge = this.edges.get(id);
    if (!edge) return null;

    const updatedEdge: GraphEdge = {
      ...edge,
      ...updates,
    };

    this.edges.set(id, updatedEdge);
    return updatedEdge;
  }

  /**
   * Delete a node
   */
  deleteNode(id: string): boolean {
    // Remove all edges connected to this node
    const edgesToRemove: string[] = [];
    for (const edge of this.edges.values()) {
      if (edge.source === id || edge.target === id) {
        edgesToRemove.push(edge.id);
      }
    }

    for (const edgeId of edgesToRemove) {
      this.edges.delete(edgeId);
    }

    // Remove from adjacency list
    this.adjacencyList.delete(id);

    // Remove node
    return this.nodes.delete(id);
  }

  /**
   * Delete an edge
   */
  deleteEdge(id: string): boolean {
    const edge = this.edges.get(id);
    if (!edge) return false;

    // Update adjacency list
    this.adjacencyList.get(edge.source)?.delete(edge.target);
    this.adjacencyList.get(edge.target)?.delete(edge.source);

    return this.edges.delete(id);
  }

  /**
   * Clear the entire graph
   */
  clear(): void {
    this.nodes.clear();
    this.edges.clear();
    this.adjacencyList.clear();
  }

  /**
   * Export graph to JSON
   */
  exportToJson(): string {
    const data = {
      nodes: Array.from(this.nodes.values()),
      edges: Array.from(this.edges.values()),
      exportedAt: new Date(),
    };

    return JSON.stringify(data, null, 2);
  }

  /**
   * Import graph from JSON
   */
  importFromJson(json: string): void {
    const data = JSON.parse(json);

    this.clear();

    for (const node of data.nodes) {
      this.addNode(node);
    }

    for (const edge of data.edges) {
      this.addEdge(edge);
    }
  }
}

// Export singleton instance
export const knowledgeGraphService = new KnowledgeGraphService();
