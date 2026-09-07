/**
 * =============================================================================
 * VECTOR SPACE VISUALIZATION - Embedding Scatter Plot & Similarity Clustering
 * =============================================================================
 *
 * Provides 3D scatter plot visualization for agent embeddings, semantic
 * similarity clustering, and interactive vector similarity queries.
 *
 * Features:
 * - 3D scatter plot of node embeddings projected to 3D
 * - Color clusters by semantic similarity
 * - Interactive vector similarity queries
 * - Real-time embedding updates
 * - Cluster boundary visualization
 * - Similarity threshold filtering
 *
 * @version 1.0.0
 * @lastUpdated 2026-07-22
 */

import { KnowledgeGraphNode, NodeEmbedding, Point3D, VectorCluster } from './types';
import { EmbeddingGenerator } from './KnowledgeGraphEngine';

// ============================================
// VECTOR CLUSTERING ENGINE
// ============================================

export interface VectorSpaceConfig {
  /** Number of dimensions for embeddings */
  dimensions: number;
  /** Number of clusters to find */
  clusterCount: number;
  /** Minimum cluster size */
  minClusterSize: number;
  /** Similarity threshold for connections */
  similarityThreshold: number;
  /** Whether to use PCA for dimensionality reduction */
  usePCA: boolean;
}

export const DEFAULT_VECTOR_CONFIG: VectorSpaceConfig = {
  dimensions: 128,
  clusterCount: 10,
  minClusterSize: 5,
  similarityThreshold: 0.7,
  usePCA: true,
};

// ============================================
// PCA (Principal Component Analysis)
// ============================================

/**
 * Simple PCA implementation for dimensionality reduction
 * Reduces high-dimensional embeddings to 3D for visualization
 */
export class PCAReducer {
  private mean: number[] = [];
  private components: number[][] = [];

  /**
   * Fit PCA model and reduce dimensions to 3
   */
  fitAndTransform(vectors: number[][], targetDims: number = 3): number[][] {
    if (vectors.length === 0) return [];

    const dims = vectors[0].length;
    if (dims <= targetDims) return vectors;

    // Calculate mean
    this.mean = new Array(dims).fill(0);
    for (const vec of vectors) {
      for (let i = 0; i < dims; i++) {
        this.mean[i] += vec[i];
      }
    }
    for (let i = 0; i < dims; i++) {
      this.mean[i] /= vectors.length;
    }

    // Center the data
    const centered = vectors.map(vec =>
      vec.map((v, i) => v - this.mean[i])
    );

    // Compute covariance matrix (simplified - only compute top 3 components)
    // For efficiency, we use a power iteration approach
    this.components = this.computeTopComponents(centered, targetDims);

    // Project to 3D
    return centered.map(vec =>
      this.components.map(component =>
        vec.reduce((sum, v, i) => sum + v * component[i], 0)
      )
    );
  }

  /**
   * Compute top N principal components using power iteration
   */
  private computeTopComponents(centered: number[][], n: number): number[][] {
    const dims = centered[0].length;
    const components: number[][] = [];

    // Compute covariance matrix (simplified)
    const covMatrix = this.computeCovariance(centered);

    // Power iteration for top n components
    for (let i = 0; i < n; i++) {
      let component = this.randomVector(dims);
      let prevComponent = component;

      for (let iter = 0; iter < 50; iter++) {
        // Multiply by covariance matrix
        component = this.multiplyMatrixVector(covMatrix, component);

        // Orthogonalize against previous components (Gram-Schmidt)
        for (const prev of components) {
          const dot = component.reduce((sum, v, j) => sum + v * prev[j], 0);
          component = component.map((v, j) => v - dot * prev[j]);
        }

        // Normalize
        const norm = Math.sqrt(component.reduce((sum, v) => sum + v * v, 0)) || 1;
        component = component.map(v => v / norm);

        // Check convergence
        const diff = component.reduce((sum, v, j) => sum + (v - prevComponent[j]) ** 2, 0);
        if (diff < 1e-10) break;

        prevComponent = [...component];
      }

      components.push(component);
    }

    return components;
  }

  private computeCovariance(data: number[][]): number[][] {
    const dims = data[0].length;
    const n = data.length;
    const cov: number[][] = Array(dims).fill(0).map(() => new Array(dims).fill(0));

    for (let i = 0; i < dims; i++) {
      for (let j = i; j < dims; j++) {
        let sum = 0;
        for (const vec of data) {
          sum += vec[i] * vec[j];
        }
        const val = sum / (n - 1);
        cov[i][j] = val;
        cov[j][i] = val;
      }
    }

    return cov;
  }

  private multiplyMatrixVector(matrix: number[][], vec: number[]): number[] {
    return matrix.map(row =>
      row.reduce((sum, v, i) => sum + v * vec[i], 0)
    );
  }

  private randomVector(dims: number): number[] {
    return Array.from({ length: dims }, () => Math.random() - 0.5);
  }
}

// ============================================
// VECTOR SPACE VISUALIZER
// ============================================

export class VectorSpaceVisualizer {
  private config: VectorSpaceConfig;
  private pca: PCAReducer;
  private clusters: VectorCluster[] = [];
  private projectedPoints: Map<string, Point3D> = new Map();
  private nodeEmbeddings: Map<string, number[]> = new Map();

  constructor(config: VectorSpaceConfig = DEFAULT_VECTOR_CONFIG) {
    this.config = config;
    this.pca = new PCAReducer();
  }

  /**
   * Process nodes and generate vector space visualization data
   */
  processNodes(nodes: KnowledgeGraphNode[]): {
    projectedPoints: Map<string, Point3D>;
    clusters: VectorCluster[];
    similarityMatrix: Map<string, Map<string, number>>;
  } {
    this.projectedPoints.clear();
    this.nodeEmbeddings.clear();
    this.clusters = [];

    // Generate embeddings for all nodes
    const embeddings: number[][] = [];
    const nodeIds: string[] = [];

    for (const node of nodes) {
      const embedding = node.embeddings?.vector ||
        EmbeddingGenerator.generateNodeEmbedding(node, this.config.dimensions);

      this.nodeEmbeddings.set(node.id, embedding);
      embeddings.push(embedding);
      nodeIds.push(node.id);
    }

    // Reduce to 3D using PCA
    const reduced = this.config.usePCA
      ? this.pca.fitAndTransform(embeddings, 3)
      : embeddings.map(e => [e[0], e[1], e[2]]);

    // Create projected points
    for (let i = 0; i < nodeIds.length; i++) {
      this.projectedPoints.set(nodeIds[i], {
        x: reduced[i][0] * 200, // Scale for visualization
        y: reduced[i][1] * 200,
        z: reduced[i][2] * 200,
      });
    }

    // Cluster nodes
    this.clusters = this.clusterNodes(nodes, embeddings);

    // Compute similarity matrix (sparse - only for nearby nodes)
    const similarityMatrix = this.computeSimilarityMatrix(nodes);

    return {
      projectedPoints: this.projectedPoints,
      clusters: this.clusters,
      similarityMatrix,
    };
  }

  /**
   * Cluster nodes based on embedding similarity
   */
  private clusterNodes(nodes: KnowledgeGraphNode[], embeddings: number[][]): VectorCluster[] {
    const clusters: VectorCluster[] = [];
    const assigned = new Set<string>();
    const clusterColors = [
      '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6',
      '#14b8a6', '#f97316', '#06b6d4', '#ef4444', '#84cc16',
    ];

    // Simple hierarchical clustering
    const nodeEmbeddings = Array.from(this.nodeEmbeddings.entries());

    for (let i = 0; i < this.config.clusterCount && nodeEmbeddings.length > 0; i++) {
      const unassigned = nodeEmbeddings.filter(([id]) => !assigned.has(id));
      if (unassigned.length === 0) break;

      // Start with a random unassigned node
      const seed = unassigned[Math.floor(Math.random() * unassigned.length)];
      const clusterNodes: string[] = [];
      const centroid = [...seed[1]];

      // Find all nodes similar to the seed
      for (const [nodeId, embedding] of unassigned) {
        const similarity = EmbeddingGenerator.cosineSimilarity(seed[1], embedding);
        if (similarity >= this.config.similarityThreshold) {
          clusterNodes.push(nodeId);
          assigned.add(nodeId);

          // Update centroid
          for (let d = 0; d < centroid.length; d++) {
            centroid[d] += embedding[d];
          }
        }
      }

      if (clusterNodes.length >= this.config.minClusterSize) {
        // Normalize centroid
        const norm = Math.sqrt(centroid.reduce((sum, v) => sum + v * v, 0)) || 1;
        const normalizedCentroid = centroid.map(v => v / norm);

        clusters.push({
          id: `cluster-${i}`,
          label: `Semantic Cluster ${i + 1}`,
          centroid: normalizedCentroid,
          nodes: clusterNodes,
          size: clusterNodes.length,
          density: this.calculateClusterDensity(clusterNodes),
          color: clusterColors[i % clusterColors.length],
        });
      }
    }

    return clusters;
  }

  /**
   * Calculate the density of a cluster
   */
  private calculateClusterDensity(nodeIds: string[]): number {
    if (nodeIds.length < 2) return 0;

    let totalSimilarity = 0;
    let count = 0;

    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        const emb1 = this.nodeEmbeddings.get(nodeIds[i]);
        const emb2 = this.nodeEmbeddings.get(nodeIds[j]);
        if (emb1 && emb2) {
          totalSimilarity += EmbeddingGenerator.cosineSimilarity(emb1, emb2);
          count++;
        }
      }
    }

    return count > 0 ? totalSimilarity / count : 0;
  }

  /**
   * Compute sparse similarity matrix
   */
  private computeSimilarityMatrix(nodes: KnowledgeGraphNode[]): Map<string, Map<string, number>> {
    const matrix = new Map<string, Map<string, number>>();

    // Only compute for nodes that are likely similar (same department or type)
    const byCategory = new Map<string, KnowledgeGraphNode[]>();
    for (const node of nodes) {
      const key = `${node.type}-${node.category}`;
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(node);
    }

    for (const [, group] of byCategory) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const emb1 = this.nodeEmbeddings.get(group[i].id);
          const emb2 = this.nodeEmbeddings.get(group[j].id);
          if (emb1 && emb2) {
            const similarity = EmbeddingGenerator.cosineSimilarity(emb1, emb2);
            if (similarity >= this.config.similarityThreshold) {
              if (!matrix.has(group[i].id)) matrix.set(group[i].id, new Map());
              if (!matrix.has(group[j].id)) matrix.set(group[j].id, new Map());
              matrix.get(group[i].id)!.set(group[j].id, similarity);
              matrix.get(group[j].id)!.set(group[i].id, similarity);
            }
          }
        }
      }
    }

    return matrix;
  }

  /**
   * Find semantically similar nodes to a query
   */
  findSimilar(
    queryEmbedding: number[],
    topK: number = 10,
    threshold: number = 0.5,
  ): Array<{ nodeId: string; similarity: number }> {
    const results: Array<{ nodeId: string; similarity: number }> = [];

    for (const [nodeId, embedding] of this.nodeEmbeddings) {
      const similarity = EmbeddingGenerator.cosineSimilarity(queryEmbedding, embedding);
      if (similarity >= threshold) {
        results.push({ nodeId, similarity });
      }
    }

    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  /**
   * Get the projected 3D position of a node
   */
  getProjectedPosition(nodeId: string): Point3D | null {
    return this.projectedPoints.get(nodeId) || null;
  }

  /**
   * Get all clusters
   */
  getClusters(): VectorCluster[] {
    return this.clusters;
  }

  /**
   * Get cluster for a specific node
   */
  getClusterForNode(nodeId: string): VectorCluster | null {
    return this.clusters.find(c => c.nodes.includes(nodeId)) || null;
  }

  /**
   * Get similarity connections between nodes
   */
  getSimilarityConnections(threshold: number = 0.7): Array<{
    fromId: string;
    toId: string;
    similarity: number;
  }> {
    const connections: Array<{ fromId: string; toId: string; similarity: number }> = [];

    for (const [fromId, similarities] of this.similarityMatrixCache || []) {
      for (const [toId, similarity] of similarities) {
        if (similarity >= threshold) {
          connections.push({ fromId, toId, similarity });
        }
      }
    }

    return connections;
  }

  private similarityMatrixCache: Map<string, Map<string, number>> | null = null;

  /**
   * Update the similarity matrix cache
   */
  updateSimilarityCache(matrix: Map<string, Map<string, number>>): void {
    this.similarityMatrixCache = matrix;
  }
}

// ============================================
// EMBEDDING CLUSTER MANAGER
// ============================================

/**
 * Manager for embedding-based clustering and visualization
 */
export class EmbeddingClusterManager {
  private visualizer: VectorSpaceVisualizer;
  private nodeClusters: Map<string, string> = new Map(); // nodeId -> clusterId
  private clusterCache: Map<string, VectorCluster> = new Map();

  constructor(config?: VectorSpaceConfig) {
    this.visualizer = new VectorSpaceVisualizer(config);
  }

  /**
   * Process nodes and build clusters
   */
  process(nodes: KnowledgeGraphNode[]): void {
    const result = this.visualizer.processNodes(nodes);
    this.visualizer.updateSimilarityCache(result.similarityMatrix);

    // Build node-to-cluster mapping
    this.nodeClusters.clear();
    this.clusterCache.clear();

    for (const cluster of result.clusters) {
      this.clusterCache.set(cluster.id, cluster);
      for (const nodeId of cluster.nodes) {
        this.nodeClusters.set(nodeId, cluster.id);
      }
    }
  }

  /**
   * Get cluster ID for a node
   */
  getClusterId(nodeId: string): string | null {
    return this.nodeClusters.get(nodeId) || null;
  }

  /**
   * Get cluster for a node
   */
  getCluster(nodeId: string): VectorCluster | null {
    const clusterId = this.nodeClusters.get(nodeId);
    return clusterId ? this.clusterCache.get(clusterId) || null : null;
  }

  /**
   * Get all clusters
   */
  getAllClusters(): VectorCluster[] {
    return Array.from(this.clusterCache.values());
  }

  /**
   * Get projected position for a node
   */
  getProjectedPosition(nodeId: string): Point3D | null {
    return this.visualizer.getProjectedPosition(nodeId);
  }

  /**
   * Find similar nodes
   */
  findSimilar(
    queryEmbedding: number[],
    topK?: number,
    threshold?: number,
  ): Array<{ nodeId: string; similarity: number }> {
    return this.visualizer.findSimilar(queryEmbedding, topK, threshold);
  }

  /**
   * Get similarity connections
   */
  getSimilarityConnections(threshold?: number): Array<{
    fromId: string;
    toId: string;
    similarity: number;
  }> {
    return this.visualizer.getSimilarityConnections(threshold);
  }

  /**
   * Get the underlying visualizer
   */
  getVisualizer(): VectorSpaceVisualizer {
    return this.visualizer;
  }
}
