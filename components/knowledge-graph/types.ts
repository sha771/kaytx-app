/**
 * =============================================================================
 * KNOWLEDGE GRAPH 3D - Type Definitions
 * =============================================================================
 *
 * Comprehensive type system for the 3D circular knowledge graph visualization
 * with support for 6,000+ nodes, RAG integration, and knowledge graph features.
 *
 * @version 3.0.0
 * @lastUpdated 2026-07-22
 */

import { ViewStyle } from 'react-native';

// ============================================
// COORDINATE & SPATIAL TYPES
// ============================================

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface PolarCoord {
  r: number;      // Radius from center
  theta: number;  // Angle in radians (horizontal)
  phi: number;    // Angle in radians (vertical / elevation)
}

export interface SphereCoord {
  r: number;      // Radius
  theta: number;  // Azimuthal angle (0-2π)
  phi: number;    // Polar angle (0-π)
}

export interface BoundingBox {
  min: Point3D;
  max: Point3D;
}

export interface CameraState {
  position: Point3D;
  target: Point3D;
  zoom: number;
  rotation: { x: number; y: number; z: number };
  fov: number;
}

// ============================================
// NODE TYPES
// ============================================

export type NodeType = 
  | 'executive'      // C-Suite (Center layer)
  | 'command_center' // Command center (2nd layer)
  | 'department'     // 48 departments (3rd layer)
  | 'main_agent'     // Main agents (4th layer)
  | 'sub_agent'      // Sub-agents (5th/outer layer)
  | 'custom';        // Custom node type

export type NodeStatus = 'active' | 'draft' | 'paused' | 'archived' | 'maintenance';

export type AgentCapability = 
  | 'nlp' | 'vision' | 'audio' | 'decision' | 'automation'
  | 'analytics' | 'communication' | 'integration' | 'monitoring'
  | 'security' | 'optimization' | 'prediction' | 'classification'
  | 'extraction' | 'generation' | 'reasoning' | 'planning'
  | 'memory' | 'learning' | 'collaboration';

export type RelationshipType = 
  | 'hierarchy'       // Parent-child relationship
  | 'collaboration'   // Collaborative relationship
  | 'dependency'      // Dependency relationship
  | 'data_flow'       // Data flow path
  | 'communication'   // Communication channel
  | 'supervision'     // Supervisory relationship
  | 'reporting';      // Reporting relationship

export type DepartmentCategory =
  | 'executive' | 'technology' | 'finance' | 'operations' | 'marketing'
  | 'sales' | 'hr' | 'legal' | 'compliance' | 'customer_success'
  | 'product' | 'design' | 'data' | 'security' | 'infrastructure'
  | 'research' | 'innovation' | 'strategy' | 'communications'
  | 'partnerships' | 'supply_chain' | 'manufacturing' | 'quality'
  | 'training' | 'support' | 'analytics' | 'intelligence';

export interface NodeMetrics {
  performance: number;      // 0-100 performance score
  reliability: number;      // 0-100 reliability score
  efficiency: number;       // 0-100 efficiency score
  tokenUsage: number;       // Token consumption
  responseTime: number;     // Average response time (ms)
  uptime: number;           // Uptime percentage
  taskCompletion: number;   // Task completion rate
  costEfficiency: number;   // Cost efficiency score
  collaboration: number;    // Collaboration effectiveness
  learningRate: number;     // Learning rate
}

export interface NodeEmbedding {
  vector: number[];         // Embedding vector
  dimension: number;        // Embedding dimension
  model: string;            // Embedding model used
  updatedAt: string;        // Last update timestamp
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  type: 'document' | 'code' | 'knowledge' | 'insight' | 'metric';
  content: string;
  embedding?: number[];
  source: string;
  relevance: number;
  timestamp: string;
  tags: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: NodeType;
  category: DepartmentCategory;
  
  // 3D Position
  position: Point3D;
  polarPosition: PolarCoord;
  targetPosition?: Point3D;     // For animations
  
  // Visual Properties
  radius: number;               // Node visual radius
  color: string;                // Primary color
  secondaryColor?: string;      // Secondary/gradient color
  opacity: number;
  scale: number;                // Scale factor
  glowIntensity: number;        // Glow effect intensity
  icon?: string;                // Icon identifier
  pulseFrequency?: number;      // Pulse animation frequency
  
  // Hierarchy
  parentId?: string;
  childrenIds: string[];
  depth: number;                // Tree depth
  layerIndex: number;           // Layer index (0-4)
  angularPosition: number;      // Position in circle (0-359)
  
  // Agent Data
  agentType?: string;
  capabilities: AgentCapability[];
  skills: string[];
  status: NodeStatus;
  department?: DepartmentCategory;
  
  // Metrics & Performance
  metrics: NodeMetrics;
  performanceHistory: { timestamp: string; value: number }[];
  
  // Knowledge Graph
  embeddings?: NodeEmbedding;
  knowledgeBase: KnowledgeEntry[];
  semanticClusters: string[];   // Cluster IDs
  centralityScore: number;      // Graph centrality
  pageRank: number;             // PageRank score
  betweennessCentrality: number;
  closenessCentrality: number;
  
  // RAG Features
  retrievalScore: number;       // RAG retrieval relevance
  contextWindow: number;        // Context window size
  knowledgeSources: string[];   // Connected knowledge sources
  
  // Metadata
  metadata: {
    description?: string;
    version: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    tags: string[];
    priority: number;
    department: DepartmentCategory;
    costCenter?: string;
    budget?: number;
  };
  
  // UI State
  isExpanded: boolean;
  isVisible: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  isLocked: boolean;
  
  // Sub-agents (for department/main_agent nodes)
  subAgentCount: number;
  subAgents?: KnowledgeGraphNode[];
}

// ============================================
// CONNECTION / EDGE TYPES
// ============================================

export interface GraphConnection {
  id: string;
  fromId: string;
  toId: string;
  type: RelationshipType;
  
  // Visual Properties
  color: string;
  width: number;
  opacity: number;
  style: 'solid' | 'dashed' | 'dotted' | 'animated';
  
  // Strength & Weight
  strength: number;             // 0-1 relationship strength
  weight: number;               // Edge weight for algorithms
  bidirectional: boolean;
  
  // Metadata
  label?: string;
  description?: string;
  frequency: number;            // Interaction frequency
  latency: number;              // Communication latency
  
  // Data Flow
  dataFlowRate: number;         // Data transfer rate
  dataType?: string;            // Type of data flowing
  protocol?: string;            // Communication protocol
  
  // Knowledge Graph
  semanticSimilarity: number;   // Semantic similarity score
  relationshipConfidence: number; // Confidence in relationship
  temporalRecency: number;      // How recent the relationship is
  
  // Animation
  animated: boolean;
  particleCount: number;
  animationSpeed: number;
  
  // State
  isActive: boolean;
  isHighlighted: boolean;
}

// ============================================
// LAYER CONFIGURATION
// ============================================

export interface LayerConfig {
  name: string;
  index: number;
  nodeType: NodeType[];
  radius: number;               // Radial distance from center
  thickness: number;            // Z-axis spread
  nodeCount: number;
  nodeMinRadius: number;
  nodeMaxRadius: number;
  color: string;
  opacity: number;
  glowColor: string;
  animationSpeed: number;
  showLabels: boolean;
  labelSize: number;
  collapsed: boolean;
}

export const DEFAULT_LAYER_CONFIGS: LayerConfig[] = [
  {
    name: 'Executive Core',
    index: 0,
    nodeType: ['executive'],
    radius: 0,
    thickness: 20,
    nodeCount: 10,
    nodeMinRadius: 18,
    nodeMaxRadius: 25,
    color: '#f59e0b',
    opacity: 1,
    glowColor: '#fbbf24',
    animationSpeed: 2,
    showLabels: true,
    labelSize: 14,
    collapsed: false,
  },
  {
    name: 'Command Center',
    index: 1,
    nodeType: ['command_center'],
    radius: 120,
    thickness: 30,
    nodeCount: 8,
    nodeMinRadius: 14,
    nodeMaxRadius: 20,
    color: '#94a3b8',
    opacity: 0.95,
    glowColor: '#cbd5e1',
    animationSpeed: 1.5,
    showLabels: true,
    labelSize: 12,
    collapsed: false,
  },
  {
    name: 'Departments',
    index: 2,
    nodeType: ['department'],
    radius: 250,
    thickness: 40,
    nodeCount: 48,
    nodeMinRadius: 12,
    nodeMaxRadius: 18,
    color: '#10b981',
    opacity: 0.9,
    glowColor: '#34d399',
    animationSpeed: 1,
    showLabels: true,
    labelSize: 11,
    collapsed: false,
  },
  {
    name: 'Main Agents',
    index: 3,
    nodeType: ['main_agent'],
    radius: 400,
    thickness: 50,
    nodeCount: 200,
    nodeMinRadius: 8,
    nodeMaxRadius: 14,
    color: '#6366f1',
    opacity: 0.85,
    glowColor: '#818cf8',
    animationSpeed: 0.8,
    showLabels: false,
    labelSize: 10,
    collapsed: false,
  },
  {
    name: 'Sub-Agents',
    index: 4,
    nodeType: ['sub_agent'],
    radius: 550,
    thickness: 60,
    nodeCount: 6000,
    nodeMinRadius: 3,
    nodeMaxRadius: 8,
    color: '#8b5cf6',
    opacity: 0.7,
    glowColor: '#a78bfa',
    animationSpeed: 0.5,
    showLabels: false,
    labelSize: 8,
    collapsed: false,
  },
];

// ============================================
// LAYOUT & ALGORITHM TYPES
// ============================================

export type LayoutAlgorithm = 'circular' | 'concentric' | 'spiral' | 'force' | 'hierarchical';

export interface LayoutConfig {
  algorithm: LayoutAlgorithm;
  layers: LayerConfig[];
  spacing: number;
  rotation: number;             // Initial rotation offset
  tiltAngle: number;            // 3D tilt angle
  enable3D: boolean;
  enablePhysics: boolean;
  physicsIterations: number;
  clusterBy: 'department' | 'capability' | 'status' | 'none';
  sortBy: 'name' | 'priority' | 'performance' | 'centrality';
}

// ============================================
// RENDERING TYPES
// ============================================

export interface RenderConfig {
  nodeStyle: 'sphere' | 'cube' | 'hexagon' | 'ring' | 'custom';
  connectionStyle: 'line' | 'curve' | 'tube' | 'ribbon';
  showGlow: boolean;
  showParticles: boolean;
  particleCount: number;
  showLabels: boolean;
  labelStyle: 'floating' | 'attached' | 'none';
  showGrid: boolean;
  showAxes: boolean;
  backgroundColor: string;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
  shadowEnabled: boolean;
  antiAliasing: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

export const DEFAULT_RENDER_CONFIG: RenderConfig = {
  nodeStyle: 'sphere',
  connectionStyle: 'curve',
  showGlow: true,
  showParticles: true,
  particleCount: 2000,
  showLabels: true,
  labelStyle: 'floating',
  showGrid: false,
  showAxes: false,
  backgroundColor: '#0a0a1a',
  ambientLightIntensity: 0.4,
  directionalLightIntensity: 0.8,
  shadowEnabled: true,
  antiAliasing: true,
  quality: 'high',
};

// ============================================
// KNOWLEDGE GRAPH & RAG TYPES
// ============================================

export interface KnowledgeQuery {
  text: string;
  embedding?: number[];
  filters?: {
    nodeTypes?: NodeType[];
    departments?: DepartmentCategory[];
    status?: NodeStatus[];
    capabilities?: AgentCapability[];
    minPerformance?: number;
    maxCost?: number;
  };
  topK: number;
  threshold: number;
}

export interface KnowledgeResult {
  node: KnowledgeGraphNode;
  relevanceScore: number;
  similarityScore: number;
  context: string;
  path: string[];               // Path from query to result
  hops: number;                 // Number of hops in graph
}

export interface RAGConfig {
  embeddingModel: string;
  chunkSize: number;
  overlapSize: number;
  topK: number;
  threshold: number;
  maxContextLength: number;
  useHybridSearch: boolean;
  useReRank: boolean;
  enableGraphAugmentation: boolean;
}

export interface VectorCluster {
  id: string;
  label: string;
  centroid: number[];
  nodes: string[];              // Node IDs in cluster
  size: number;
  density: number;
  color: string;
}

// ============================================
// DATA GENERATION TYPES
// ============================================

export const DEPARTMENT_NAMES: string[] = [
  // Technology & Engineering (8)
  'Software Engineering', 'Cloud Infrastructure', 'DevOps & Reliability',
  'Data Engineering', 'AI/ML Research', 'Cybersecurity',
  'QA & Testing', 'Technical Documentation',

  // Product & Design (5)
  'Product Management', 'UX/UI Design', 'Product Analytics',
  'Design Systems', 'User Research',

  // Business & Operations (8)
  'Business Operations', 'Supply Chain', 'Procurement',
  'Facilities Management', 'Logistics', 'Risk Management',
  'Process Optimization', 'Vendor Management',

  // Finance & Legal (6)
  'Financial Planning', 'Accounting', 'Legal & Compliance',
  'Internal Audit', 'Treasury', 'Tax',

  // Marketing & Sales (7)
  'Digital Marketing', 'Content Marketing', 'Brand Management',
  'Sales Operations', 'Account Management', 'Lead Generation',
  'Market Intelligence',

  // Customer Success (5)
  'Customer Support', 'Customer Success', 'Technical Support',
  'Community Management', 'Training & Education',

  // HR & People (5)
  'Talent Acquisition', 'People Operations', 'Learning & Development',
  'Compensation & Benefits', 'Employee Experience',

  // Strategy & Innovation (4)
  'Corporate Strategy', 'Business Intelligence', 'Innovation Lab',
  'Mergers & Acquisitions',
];

export const EXECUTIVE_ROLES: string[] = [
  'CEO', 'CTO', 'CFO', 'COO', 'CMO', 'CIO', 'CDO', 'CHRO', 'CRO', 'CPO',
];

export const COMMAND_CENTER_ROLES: string[] = [
  'AI Orchestrator', 'Agent Registry', 'Task Scheduler',
  'Resource Allocator', 'Performance Monitor', 'Security Gateway',
  'Knowledge Hub', 'Analytics Engine',
];

export const AGENT_SKILLS: Record<string, string[]> = {
  nlp: ['Text Classification', 'Sentiment Analysis', 'NER', 'Translation', 'Summarization'],
  vision: ['Object Detection', 'Image Segmentation', 'OCR', 'Facial Recognition'],
  audio: ['Speech Recognition', 'Text-to-Speech', 'Speaker Diarization', 'Audio Classification'],
  decision: ['Reinforcement Learning', 'Planning', 'Game Theory', 'Multi-Agent Systems'],
  automation: ['Workflow Automation', 'RPA', 'Scheduling', 'Orchestration'],
  analytics: ['Data Visualization', 'Statistical Analysis', 'Trend Detection', 'Forecasting'],
  communication: ['Messaging', 'Email', 'Voice', 'API Gateway', 'Webhook'],
  integration: ['REST API', 'GraphQL', 'gRPC', 'WebSocket', 'File Transfer'],
  monitoring: ['Health Check', 'Alerting', 'Logging', 'Tracing', 'Metrics Collection'],
  security: ['Authentication', 'Authorization', 'Encryption', 'Audit', 'Threat Detection'],
  optimization: ['Resource Optimization', 'Cost Optimization', 'Performance Tuning'],
  prediction: ['Time Series', 'Regression', 'Classification', 'Anomaly Detection'],
  generation: ['Text Generation', 'Code Generation', 'Image Generation', 'Data Synthesis'],
  reasoning: ['Logical Reasoning', 'Common Sense', 'Symbolic Reasoning', 'Causal Reasoning'],
  memory: ['Short-term Memory', 'Long-term Memory', 'Episodic Memory', 'Semantic Memory'],
  learning: ['Supervised', 'Unsupervised', 'Reinforcement', 'Transfer Learning'],
  collaboration: ['Task Coordination', 'Information Sharing', 'Role-based Access'],
};

// ============================================
// VIEW MODEL TYPES
// ============================================

export interface GraphViewState {
  camera: CameraState;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  highlightedNodeIds: string[];
  visibleLayers: number[];
  collapsedNodes: string[];
  searchQuery: string;
  filterCriteria: {
    nodeTypes: NodeType[];
    departments: DepartmentCategory[];
    status: NodeStatus[];
    minPerformance: number;
    maxCost: number | null;
  };
  isAnimating: boolean;
  animationQueue: GraphAnimation[];
  showMetrics: boolean;
  showKnowledgePanel: boolean;
  showRAGPanel: boolean;
  showSearchPanel: boolean;
  showFilterPanel: boolean;
  showLayerPanel: boolean;
}

export interface GraphAnimation {
  id: string;
  type: 'camera_move' | 'node_highlight' | 'path_trace' | 'cluster_expand' | 'data_flow';
  duration: number;
  progress: number;
  target: any;
  easing: 'linear' | 'ease_in' | 'ease_out' | 'ease_in_out' | 'spring';
  onComplete?: () => void;
}

// ============================================
// PERFORMANCE TYPES
// ============================================

export interface FrameMetrics {
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangleCount: number;
  nodeCount: number;
  connectionCount: number;
  memoryUsage: number;
  gpuMemoryUsage: number;
}

export interface PerformanceProfile {
  maxNodes: number;
  maxConnections: number;
  targetFPS: number;
  lodLevels: number;
  enableInstancing: boolean;
  enableFrustumCulling: boolean;
  enableOcclusionCulling: boolean;
  enableLOD: boolean;
  particleLimit: number;
  geometrySimplification: number;
}

// ============================================
// EVENT TYPES
// ============================================

export interface GraphEvent {
  type: 'node_press' | 'node_long_press' | 'connection_press' | 'background_press'
      | 'camera_move' | 'camera_zoom' | 'layer_toggle' | 'search' | 'filter'
      | 'node_add' | 'node_delete' | 'node_update' | 'connection_add' | 'connection_delete'
      | 'layout_change' | 'export' | 'import' | 'animation_start' | 'animation_end';
  timestamp: string;
  data: any;
}