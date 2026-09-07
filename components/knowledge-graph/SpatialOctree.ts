/**
 * =============================================================================
 * SPATIAL OCTREE - Spatial Partitioning for 6,000+ Nodes
 * =============================================================================
 *
 * Octree-based spatial indexing for efficient node queries in the 3D knowledge
 * graph. Supports frustum culling, nearest-neighbor search, and range queries
 * to optimize rendering performance with large node counts.
 *
 * Features:
 * - Dynamic octree construction with configurable depth and capacity
 * - Frustum culling for off-screen nodes
 * - Nearest-neighbor search for hover/click detection
 * - Range queries for cluster selection
 * - Memory-efficient node storage with lazy subdivision
 *
 * @version 1.0.0
 * @lastUpdated 2026-07-22
 */

import { KnowledgeGraphNode, Point3D, BoundingBox, CameraState } from './types';

// ============================================
// OCTREE NODE
// ============================================

class OctreeNode {
  /** Bounding box of this node */
  readonly bounds: BoundingBox;
  /** Depth level in the tree */
  readonly depth: number;
  /** Nodes stored directly in this node (leaf only) */
  nodes: KnowledgeGraphNode[] = [];
  /** Child nodes (null if leaf) */
  children: OctreeNode[] | null = null;
  /** Whether this node has been subdivided */
  isLeaf: boolean = true;

  constructor(bounds: BoundingBox, depth: number) {
    this.bounds = bounds;
    this.depth = depth;
  }

  /** Check if a point is within this node's bounds */
  contains(point: Point3D): boolean {
    return (
      point.x >= this.bounds.min.x && point.x <= this.bounds.max.x &&
      point.y >= this.bounds.min.y && point.y <= this.bounds.max.y &&
      point.z >= this.bounds.min.z && point.z <= this.bounds.max.z
    );
  }

  /** Check if this node's bounds intersect a frustum (simplified as AABB) */
  intersectsFrustum(frustumBounds: BoundingBox): boolean {
    return !(
      this.bounds.max.x < frustumBounds.min.x ||
      this.bounds.min.x > frustumBounds.max.x ||
      this.bounds.max.y < frustumBounds.min.y ||
      this.bounds.min.y > frustumBounds.max.y ||
      this.bounds.max.z < frustumBounds.min.z ||
      this.bounds.min.z > frustumBounds.max.z
    );
  }
}

// ============================================
// SPATIAL OCTREE
// ============================================

export interface OctreeConfig {
  /** Maximum depth of the tree */
  maxDepth: number;
  /** Maximum nodes per leaf before subdivision */
  maxCapacity: number;
  /** Whether to use lazy subdivision */
  lazy: boolean;
}

export const DEFAULT_OCTREE_CONFIG: OctreeConfig = {
  maxDepth: 8,
  maxCapacity: 50,
  lazy: true,
};

export class SpatialOctree {
  private root: OctreeNode | null = null;
  private config: OctreeConfig;
  private nodeMap: Map<string, OctreeNode> = new Map();
  private allNodes: KnowledgeGraphNode[] = [];
  private boundsDirty: boolean = true;

  constructor(config: OctreeConfig = DEFAULT_OCTREE_CONFIG) {
    this.config = config;
  }

  /**
   * Build the octree from a set of nodes
   */
  build(nodes: KnowledgeGraphNode[]): void {
    this.allNodes = [...nodes];
    this.nodeMap.clear();
    this.boundsDirty = true;

    if (nodes.length === 0) {
      this.root = null;
      return;
    }

    // Calculate bounding box from all nodes
    const bounds = this.calculateBounds(nodes);
    this.root = new OctreeNode(bounds, 0);

    // Insert all nodes
    for (const node of nodes) {
      this.insert(node, this.root);
    }

    this.boundsDirty = false;
  }

  /**
   * Calculate bounding box from nodes
   */
  private calculateBounds(nodes: KnowledgeGraphNode[]): BoundingBox {
    if (nodes.length === 0) {
      return { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };
    }

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (const node of nodes) {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      minZ = Math.min(minZ, node.position.z);
      maxX = Math.max(maxX, node.position.x);
      maxY = Math.max(maxY, node.position.y);
      maxZ = Math.max(maxZ, node.position.z);
    }

    // Add padding to avoid edge cases
    const padding = 10;
    return {
      min: { x: minX - padding, y: minY - padding, z: minZ - padding },
      max: { x: maxX + padding, y: maxY + padding, z: maxZ + padding },
    };
  }

  /**
   * Insert a node into the octree
   */
  private insert(node: KnowledgeGraphNode, octant: OctreeNode): boolean {
    if (!octant.contains(node.position)) {
      return false;
    }

    // If this is a leaf and has capacity, add the node
    if (octant.isLeaf && octant.nodes.length < this.config.maxCapacity) {
      octant.nodes.push(node);
      this.nodeMap.set(node.id, octant);
      return true;
    }

    // If at max depth, just add to this node
    if (octant.depth >= this.config.maxDepth) {
      octant.nodes.push(node);
      this.nodeMap.set(node.id, octant);
      return true;
    }

    // Subdivide if needed
    if (octant.isLeaf) {
      this.subdivide(octant);
    }

    // Try to insert into children
    if (octant.children) {
      for (const child of octant.children) {
        if (this.insert(node, child)) {
          return true;
        }
      }
    }

    // Fallback: add to this node
    octant.nodes.push(node);
    this.nodeMap.set(node.id, octant);
    return true;
  }

  /**
   * Subdivide an octree node into 8 children
   */
  private subdivide(node: OctreeNode): void {
    const { min, max } = node.bounds;
    const midX = (min.x + max.x) / 2;
    const midY = (min.y + max.y) / 2;
    const midZ = (min.z + max.z) / 2;

    node.children = [
      // Front-bottom-left
      new OctreeNode({
        min: { x: min.x, y: min.y, z: min.z },
        max: { x: midX, y: midY, z: midZ },
      }, node.depth + 1),
      // Front-bottom-right
      new OctreeNode({
        min: { x: midX, y: min.y, z: min.z },
        max: { x: max.x, y: midY, z: midZ },
      }, node.depth + 1),
      // Front-top-left
      new OctreeNode({
        min: { x: min.x, y: midY, z: min.z },
        max: { x: midX, y: max.y, z: midZ },
      }, node.depth + 1),
      // Front-top-right
      new OctreeNode({
        min: { x: midX, y: midY, z: min.z },
        max: { x: max.x, y: max.y, z: midZ },
      }, node.depth + 1),
      // Back-bottom-left
      new OctreeNode({
        min: { x: min.x, y: min.y, z: midZ },
        max: { x: midX, y: midY, z: max.z },
      }, node.depth + 1),
      // Back-bottom-right
      new OctreeNode({
        min: { x: midX, y: min.y, z: midZ },
        max: { x: max.x, y: midY, z: max.z },
      }, node.depth + 1),
      // Back-top-left
      new OctreeNode({
        min: { x: min.x, y: midY, z: midZ },
        max: { x: midX, y: max.y, z: max.z },
      }, node.depth + 1),
      // Back-top-right
      new OctreeNode({
        min: { x: midX, y: midY, z: midZ },
        max: { x: max.x, y: max.y, z: max.z },
      }, node.depth + 1),
    ];

    // Redistribute existing nodes to children
    const existingNodes = [...node.nodes];
    node.nodes = [];
    node.isLeaf = false;

    for (const n of existingNodes) {
      let inserted = false;
      if (node.children) {
        for (const child of node.children) {
          if (this.insert(n, child)) {
            inserted = true;
            break;
          }
        }
      }
      if (!inserted) {
        node.nodes.push(n);
        this.nodeMap.set(n.id, node);
      }
    }
  }

  /**
   * Query nodes within a bounding box (range query)
   */
  queryRange(bounds: BoundingBox): KnowledgeGraphNode[] {
    if (!this.root) return [];
    const results: KnowledgeGraphNode[] = [];
    this._queryRange(this.root, bounds, results);
    return results;
  }

  private _queryRange(node: OctreeNode, bounds: BoundingBox, results: KnowledgeGraphNode[]): void {
    if (!node.intersectsFrustum(bounds)) return;

    // Check nodes in this octant
    for (const n of node.nodes) {
      if (this.pointInBounds(n.position, bounds)) {
        results.push(n);
      }
    }

    // Recurse into children
    if (node.children) {
      for (const child of node.children) {
        this._queryRange(child, bounds, results);
      }
    }
  }

  /**
   * Find the nearest node to a point within a search radius
   */
  findNearest(point: Point3D, maxDistance: number = Infinity): KnowledgeGraphNode | null {
    if (!this.root) return null;

    let nearest: KnowledgeGraphNode | null = null;
    let nearestDist = maxDistance;

    const searchBounds: BoundingBox = {
      min: { x: point.x - maxDistance, y: point.y - maxDistance, z: point.z - maxDistance },
      max: { x: point.x + maxDistance, y: point.y + maxDistance, z: point.z + maxDistance },
    };

    const candidates = this.queryRange(searchBounds);

    for (const node of candidates) {
      const dist = this.distance3D(point, node.position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = node;
      }
    }

    return nearest;
  }

  /**
   * Find all nodes within a radius of a point
   */
  findWithinRadius(point: Point3D, radius: number): KnowledgeGraphNode[] {
    const bounds: BoundingBox = {
      min: { x: point.x - radius, y: point.y - radius, z: point.z - radius },
      max: { x: point.x + radius, y: point.y + radius, z: point.z + radius },
    };

    return this.queryRange(bounds).filter(n =>
      this.distance3D(point, n.position) <= radius
    );
  }

  /**
   * Frustum culling: return only nodes visible within the camera frustum
   */
  frustumCull(camera: CameraState, canvasWidth: number, canvasHeight: number): KnowledgeGraphNode[] {
    if (!this.root) return [];

    // Calculate frustum bounds in world space (simplified as a large AABB)
    // The camera looks from position towards target
    const camDir = {
      x: camera.target.x - camera.position.x,
      y: camera.target.y - camera.position.y,
      z: camera.target.z - camera.position.z,
    };

    // Normalize
    const camLen = Math.sqrt(camDir.x ** 2 + camDir.y ** 2 + camDir.z ** 2) || 1;
    camDir.x /= camLen;
    camDir.y /= camLen;
    camDir.z /= camLen;

    // Frustum is a pyramid; approximate as a box for simplicity
    const frustumSize = 1500 / camera.zoom;
    const frustumBounds: BoundingBox = {
      min: {
        x: camera.target.x - frustumSize,
        y: camera.target.y - frustumSize,
        z: camera.target.z - frustumSize,
      },
      max: {
        x: camera.target.x + frustumSize,
        y: camera.target.y + frustumSize,
        z: camera.target.z + frustumSize,
      },
    };

    return this.queryRange(frustumBounds);
  }

  /**
   * Get all nodes in the octree
   */
  getAllNodes(): KnowledgeGraphNode[] {
    return [...this.allNodes];
  }

  /**
   * Get the node count
   */
  getNodeCount(): number {
    return this.allNodes.length;
  }

  /**
   * Get tree statistics
   */
  getStats(): {
    depth: number;
    leafCount: number;
    nodeCount: number;
    maxDepth: number;
  } {
    if (!this.root) {
      return { depth: 0, leafCount: 0, nodeCount: 0, maxDepth: 0 };
    }

    let leafCount = 0;
    let maxDepth = 0;
    let nodeCount = 0;

    const traverse = (node: OctreeNode) => {
      nodeCount++;
      if (node.isLeaf) {
        leafCount++;
      } else {
        maxDepth = Math.max(maxDepth, node.depth);
        if (node.children) {
          for (const child of node.children) {
            traverse(child);
          }
        }
      }
    };

    traverse(this.root);

    return {
      depth: this.root.depth,
      leafCount,
      nodeCount,
      maxDepth,
    };
  }

  /**
   * Clear the octree
   */
  clear(): void {
    this.root = null;
    this.nodeMap.clear();
    this.allNodes = [];
  }

  /**
   * Rebuild the octree (useful when nodes have moved)
   */
  rebuild(): void {
    if (this.allNodes.length > 0) {
      this.build(this.allNodes);
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private pointInBounds(point: Point3D, bounds: BoundingBox): boolean {
    return (
      point.x >= bounds.min.x && point.x <= bounds.max.x &&
      point.y >= bounds.min.y && point.y <= bounds.max.y &&
      point.z >= bounds.min.z && point.z <= bounds.max.z
    );
  }

  private distance3D(a: Point3D, b: Point3D): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
  }
}

// ============================================
// SPATIAL INDEX MANAGER
// ============================================

/**
 * Manager for spatial indexing with caching and lazy updates
 */
export class SpatialIndexManager {
  private octree: SpatialOctree;
  private lastBuildTime: number = 0;
  private buildThreshold: number = 1000; // ms before rebuild
  private pendingUpdates: Set<string> = new Set();
  private isDirty: boolean = false;

  constructor(config?: OctreeConfig) {
    this.octree = new SpatialOctree(config);
  }

  /**
   * Index nodes for spatial queries
   */
  index(nodes: KnowledgeGraphNode[]): void {
    this.octree.build(nodes);
    this.lastBuildTime = Date.now();
    this.isDirty = false;
    this.pendingUpdates.clear();
  }

  /**
   * Query nodes within a bounding box
   */
  queryRange(bounds: BoundingBox): KnowledgeGraphNode[] {
    return this.octree.queryRange(bounds);
  }

  /**
   * Find nearest node to a point
   */
  findNearest(point: Point3D, maxDistance?: number): KnowledgeGraphNode | null {
    return this.octree.findNearest(point, maxDistance);
  }

  /**
   * Find nodes within a radius
   */
  findWithinRadius(point: Point3D, radius: number): KnowledgeGraphNode[] {
    return this.octree.findWithinRadius(point, radius);
  }

  /**
   * Frustum culling
   */
  frustumCull(camera: CameraState, canvasWidth: number, canvasHeight: number): KnowledgeGraphNode[] {
    return this.octree.frustumCull(camera, canvasWidth, canvasHeight);
  }

  /**
   * Get all indexed nodes
   */
  getAllNodes(): KnowledgeGraphNode[] {
    return this.octree.getAllNodes();
  }

  /**
   * Get spatial index statistics
   */
  getStats() {
    return this.octree.getStats();
  }

  /**
   * Check if the index needs rebuilding
   */
  needsRebuild(): boolean {
    return this.isDirty || (Date.now() - this.lastBuildTime > this.buildThreshold);
  }

  /**
   * Mark the index as dirty (needs rebuild)
   */
  markDirty(): void {
    this.isDirty = true;
  }

  /**
   * Clear the index
   */
  clear(): void {
    this.octree.clear();
  }
}
