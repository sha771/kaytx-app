import { db } from '../db/connection';
import { knowledgeNodes, knowledgeRelationships, knowledgePersons, knowledgeProjects, knowledgeClients } from '../db/drizzle-schema';
import { eq, and, or, desc, count, inArray, like } from 'drizzle-orm';
import crypto from 'crypto';

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
  async addNode(node: {
    organizationId: string;
    type: string;
    label: string;
    content?: string;
    summary?: string;
    sourceType?: string;
    sourceId?: string;
    tags?: string[];
    properties?: Record<string, any>;
    createdBy?: string;
    departmentId?: string;
    projectIds?: string[];
  }): Promise<GraphNode> {
    const id = crypto.randomUUID();
    const now = new Date();
    const record = {
      id,
      organizationId: node.organizationId,
      type: node.type,
      label: node.label,
      content: node.content || null,
      summary: node.summary || null,
      sourceType: node.sourceType || null,
      sourceId: node.sourceId || null,
      status: 'draft',
      confidenceScore: '0.85',
      tags: JSON.stringify(node.tags || []),
      properties: JSON.stringify(node.properties || {}),
      metadata: JSON.stringify({}),
      createdBy: node.createdBy || null,
      departmentId: node.departmentId || null,
      projectIds: JSON.stringify(node.projectIds || []),
      accessCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db.insert(knowledgeNodes).values(record);
    } catch {}

    return {
      id,
      type: node.type,
      label: node.label,
      properties: node.properties || {},
      createdAt: now,
      updatedAt: now,
    };
  }

  async addEdge(edge: {
    organizationId: string;
    sourceNodeId: string;
    targetNodeId: string;
    type: string;
    weight?: number;
    properties?: Record<string, any>;
  }): Promise<GraphEdge> {
    const id = crypto.randomUUID();
    const now = new Date();
    const record = {
      id,
      organizationId: edge.organizationId,
      sourceNodeId: edge.sourceNodeId,
      targetNodeId: edge.targetNodeId,
      type: edge.type,
      weight: String(edge.weight || 1.0),
      properties: JSON.stringify(edge.properties || {}),
      metadata: JSON.stringify({}),
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db.insert(knowledgeRelationships).values(record);
    } catch {}

    return {
      id,
      source: edge.sourceNodeId,
      target: edge.targetNodeId,
      type: edge.type,
      weight: edge.weight || 1.0,
      properties: edge.properties || {},
      createdAt: now,
    };
  }

  async getNode(id: string): Promise<GraphNode | null> {
    try {
      const results = await db.select().from(knowledgeNodes).where(eq(knowledgeNodes.id, id)).limit(1);
      if (results.length === 0) return null;
      const r = results[0];
      return {
        id: r.id,
        type: r.type,
        label: r.label,
        properties: typeof r.properties === 'string' ? JSON.parse(r.properties) : (r.properties || {}),
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      };
    } catch { return null; }
  }

  async getAllNodes(organizationId?: string): Promise<GraphNode[]> {
    try {
      const conditions = organizationId ? [eq(knowledgeNodes.organizationId, organizationId)] : [];
      const results = await db.select()
        .from(knowledgeNodes)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(knowledgeNodes.createdAt))
        .limit(1000);
      return results.map(r => ({
        id: r.id,
        type: r.type,
        label: r.label,
        properties: typeof r.properties === 'string' ? JSON.parse(r.properties) : (r.properties || {}),
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }));
    } catch { return []; }
  }

  async getAllEdges(organizationId?: string): Promise<GraphEdge[]> {
    try {
      const conditions = organizationId ? [eq(knowledgeRelationships.organizationId, organizationId)] : [];
      const results = await db.select()
        .from(knowledgeRelationships)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .limit(2000);
      return results.map(r => ({
        id: r.id,
        source: r.sourceNodeId,
        target: r.targetNodeId,
        type: r.type,
        weight: parseFloat(r.weight || '1.0'),
        properties: typeof r.properties === 'string' ? JSON.parse(r.properties) : (r.properties || {}),
        createdAt: r.createdAt,
      }));
    } catch { return []; }
  }

  async getNeighbors(nodeId: string, organizationId: string): Promise<GraphNode[]> {
    try {
      const edges = await db.select()
        .from(knowledgeRelationships)
        .where(and(
          eq(knowledgeRelationships.organizationId, organizationId),
          or(eq(knowledgeRelationships.sourceNodeId, nodeId), eq(knowledgeRelationships.targetNodeId, nodeId)),
        ))
        .limit(100);

      const neighborIds = new Set<string>();
      for (const edge of edges) {
        if (edge.sourceNodeId !== nodeId) neighborIds.add(edge.sourceNodeId);
        if (edge.targetNodeId !== nodeId) neighborIds.add(edge.targetNodeId);
      }

      if (neighborIds.size === 0) return [];
      const nodes = await db.select()
        .from(knowledgeNodes)
        .where(and(eq(knowledgeNodes.organizationId, organizationId), inArray(knowledgeNodes.id, Array.from(neighborIds))))
        .limit(100);

      return nodes.map(r => ({
        id: r.id,
        type: r.type,
        label: r.label,
        properties: typeof r.properties === 'string' ? JSON.parse(r.properties) : (r.properties || {}),
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }));
    } catch { return []; }
  }

  async findShortestPath(sourceId: string, targetId: string, organizationId: string): Promise<GraphPath | null> {
    const visited = new Set<string>();
    const queue: Array<{ nodeId: string; path: GraphNode[]; edges: GraphEdge[] }> = [
      { nodeId: sourceId, path: [], edges: [] },
    ];
    visited.add(sourceId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = await this.getNeighbors(current.nodeId, organizationId);

      for (const neighbor of neighbors) {
        if (visited.has(neighbor.id)) continue;
        visited.add(neighbor.id);

        const allEdges = await db.select().from(knowledgeRelationships).where(
          and(
            eq(knowledgeRelationships.organizationId, organizationId),
            or(
              and(eq(knowledgeRelationships.sourceNodeId, current.nodeId), eq(knowledgeRelationships.targetNodeId, neighbor.id)),
              and(eq(knowledgeRelationships.sourceNodeId, neighbor.id), eq(knowledgeRelationships.targetNodeId, current.nodeId)),
            ),
          ),
        ).limit(1);

        const edge: GraphEdge = allEdges.length > 0 ? {
          id: allEdges[0].id,
          source: allEdges[0].sourceNodeId,
          target: allEdges[0].targetNodeId,
          type: allEdges[0].type,
          weight: parseFloat(allEdges[0].weight || '1.0'),
          properties: {},
          createdAt: allEdges[0].createdAt,
        } : { id: '', source: current.nodeId, target: neighbor.id, type: 'connected', weight: 1, properties: {}, createdAt: new Date() };

        if (neighbor.id === targetId) {
          const sourceNode = await this.getNode(sourceId);
          const targetNode = await this.getNode(targetId);
          return {
            nodes: [sourceNode!, neighbor],
            edges: [edge],
            length: 1,
            weight: edge.weight,
          };
        }

        queue.push({
          nodeId: neighbor.id,
          path: [...current.path, neighbor],
          edges: [...current.edges, edge],
        });
      }
    }
    return null;
  }

  async getSubgraph(centerNodeId: string, organizationId: string, depth = 2): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
    const visitedNodes = new Set<string>();
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const bfs = async (nodeId: string, currentDepth: number) => {
      if (currentDepth > depth || visitedNodes.has(nodeId)) return;
      visitedNodes.add(nodeId);

      const node = await this.getNode(nodeId);
      if (node) nodes.push(node);

      const neighbors = await this.getNeighbors(nodeId, organizationId);
      const allEdges = await db.select().from(knowledgeRelationships)
        .where(and(
          eq(knowledgeRelationships.organizationId, organizationId),
          or(eq(knowledgeRelationships.sourceNodeId, nodeId), eq(knowledgeRelationships.targetNodeId, nodeId)),
        )).limit(100);

      for (const e of allEdges) {
        edges.push({
          id: e.id,
          source: e.sourceNodeId,
          target: e.targetNodeId,
          type: e.type,
          weight: parseFloat(e.weight || '1.0'),
          properties: {},
          createdAt: e.createdAt,
        });
      }

      for (const neighbor of neighbors) {
        await bfs(neighbor.id, currentDepth + 1);
      }
    };

    await bfs(centerNodeId, 0);
    return { nodes, edges };
  }

  async getStatistics(organizationId: string): Promise<GraphStatistics> {
    let totalNodes = 0;
    let totalEdges = 0;
    const nodeTypeDist: Record<string, number> = {};
    const edgeTypeDist: Record<string, number> = {};

    try {
      const nodes = await db.select().from(knowledgeNodes).where(eq(knowledgeNodes.organizationId, organizationId));
      totalNodes = nodes.length;
      for (const n of nodes) {
        nodeTypeDist[n.type] = (nodeTypeDist[n.type] || 0) + 1;
      }
    } catch {}

    try {
      const edges = await db.select().from(knowledgeRelationships).where(eq(knowledgeRelationships.organizationId, organizationId));
      totalEdges = edges.length;
      for (const e of edges) {
        edgeTypeDist[e.type] = (edgeTypeDist[e.type] || 0) + 1;
      }
    } catch {}

    return {
      totalNodes,
      totalEdges,
      nodeTypeDistribution: nodeTypeDist,
      edgeTypeDistribution: edgeTypeDist,
      averageDegree: totalNodes > 0 ? (totalEdges * 2) / totalNodes : 0,
      connectedComponents: Math.max(1, totalNodes - totalEdges),
      largestComponentSize: totalNodes,
    };
  }

  async getVisualizationData(organizationId: string, limit = 100, nodeTypes?: string[]): Promise<{
    nodes: Array<{ id: string; label: string; type: string; data: Record<string, any> }>;
    edges: Array<{ id: string; source: string; target: string; type: string; weight: number }>;
  }> {
    let nodes: any[] = [];
    try {
      const conditions: any[] = [eq(knowledgeNodes.organizationId, organizationId)];
      if (nodeTypes && nodeTypes.length > 0) conditions.push(inArray(knowledgeNodes.type, nodeTypes));
      nodes = await db.select().from(knowledgeNodes).where(and(...conditions)).limit(limit);
    } catch {}

    const nodeIds = nodes.map(n => n.id);
    let edges: any[] = [];
    try {
      edges = await db.select().from(knowledgeRelationships)
        .where(and(eq(knowledgeRelationships.organizationId, organizationId), inArray(knowledgeRelationships.sourceNodeId, nodeIds)))
        .limit(limit * 2);
    } catch {}

    return {
      nodes: nodes.map(n => ({
        id: n.id,
        label: n.label,
        type: n.type,
        data: typeof n.properties === 'string' ? JSON.parse(n.properties) : (n.properties || {}),
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.sourceNodeId,
        target: e.targetNodeId,
        type: e.type,
        weight: parseFloat(e.weight || '1.0'),
      })),
    };
  }

  async updateNode(id: string, updates: Partial<{ label: string; content: string; status: string; tags: string[]; properties: Record<string, any> }>): Promise<GraphNode | null> {
    try {
      const updateData: any = { updatedAt: new Date() };
      if (updates.label) updateData.label = updates.label;
      if (updates.content) updateData.content = updates.content;
      if (updates.status) updateData.status = updates.status;
      if (updates.tags) updateData.tags = JSON.stringify(updates.tags);
      if (updates.properties) updateData.properties = JSON.stringify(updates.properties);

      await db.update(knowledgeNodes).set(updateData).where(eq(knowledgeNodes.id, id));
      return this.getNode(id);
    } catch { return null; }
  }

  async deleteNode(id: string): Promise<boolean> {
    try {
      await db.delete(knowledgeRelationships).where(
        or(eq(knowledgeRelationships.sourceNodeId, id), eq(knowledgeRelationships.targetNodeId, id))
      );
      await db.delete(knowledgeNodes).where(eq(knowledgeNodes.id, id));
      return true;
    } catch { return false; }
  }

  async searchNodes(organizationId: string, query: string, type?: string, limit = 20): Promise<GraphNode[]> {
    try {
      const conditions: any[] = [
        eq(knowledgeNodes.organizationId, organizationId),
        or(
          like(knowledgeNodes.label, `%${query}%`),
          like(knowledgeNodes.content || knowledgeNodes.label, `%${query}%`),
        ),
      ];
      if (type) conditions.push(eq(knowledgeNodes.type, type));

      const results = await db.select().from(knowledgeNodes).where(and(...conditions)).limit(limit);
      return results.map(r => ({
        id: r.id,
        type: r.type,
        label: r.label,
        properties: typeof r.properties === 'string' ? JSON.parse(r.properties) : (r.properties || {}),
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }));
    } catch { return []; }
  }

  async autoLinkNodes(organizationId: string): Promise<number> {
    let linksCreated = 0;
    try {
      const nodes = await db.select().from(knowledgeNodes).where(eq(knowledgeNodes.organizationId, organizationId)).limit(500);
      for (const node of nodes) {
        const props = typeof node.properties === 'string' ? JSON.parse(node.properties) : (node.properties || {});
        const tags = typeof node.tags === 'string' ? JSON.parse(node.tags) : (node.tags || []);
        const related = await db.select().from(knowledgeNodes).where(
          and(
            eq(knowledgeNodes.organizationId, organizationId),
            ne(knowledgeNodes.id, node.id),
          ),
        ).limit(50);

        for (const candidate of related) {
          const candidateTags = typeof candidate.tags === 'string' ? JSON.parse(candidate.tags) : (candidate.tags || []);
          const sharedTags = tags.filter((t: string) => candidateTags.includes(t));
          if (sharedTags.length > 0) {
            const existingEdge = await db.select().from(knowledgeRelationships).where(
              and(
                eq(knowledgeRelationships.organizationId, organizationId),
                eq(knowledgeRelationships.sourceNodeId, node.id),
                eq(knowledgeRelationships.targetNodeId, candidate.id),
              ),
            ).limit(1);

            if (existingEdge.length === 0) {
              await this.addEdge({
                organizationId,
                sourceNodeId: node.id,
                targetNodeId: candidate.id,
                type: 'related_to',
                weight: sharedTags.length / Math.max(tags.length, candidateTags.length),
                properties: { sharedTags, autoLinked: true },
              });
              linksCreated++;
            }
          }
        }
      }
    } catch {}
    return linksCreated;
  }
}

export const knowledgeGraphService = new KnowledgeGraphService();

function ne(a: any, b: any) { return sql`${a} <> ${b}`; }
