import { AgentTool } from '../../services/ai-agent-service';
import { AIMessage, AIResponse } from '../../services/ai/ai-model-abstraction';

export type LoopType = 'react' | 'reflection' | 'self_critique' | 'planning' | 'tool_use';

export type LoopStatus = 'running' | 'completed' | 'failed' | 'cancelled' | 'max_iterations_reached';

export interface LoopConfig {
  maxIterations: number;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
  stopConditions?: StopCondition[];
  model?: string;
  provider?: string;
}

export interface StopCondition {
  type: 'max_iterations' | 'quality_threshold' | 'no_improvement' | 'tool_complete' | 'custom';
  value?: number;
  evaluate?: (state: LoopState) => boolean;
}

export interface LoopState {
  id: string;
  type: LoopType;
  status: LoopStatus;
  iteration: number;
  messages: AIMessage[];
  toolResults: ToolResult[];
  accumulatedOutput: string;
  startTime: number;
  endTime?: number;
  error?: string;
  metadata: Record<string, any>;
}

export interface ToolResult {
  toolName: string;
  input: any;
  output: any;
  success: boolean;
  error?: string;
  duration: number;
}

export interface LoopIterationResult {
  iteration: number;
  thought?: string;
  action?: string;
  actionInput?: any;
  observation?: string;
  output?: string;
  error?: string;
  toolResults?: ToolResult[];
  score?: number;
  critique?: string;
  tokensUsed: number;
  latency: number;
}

export interface LoopResult {
  success: boolean;
  finalOutput: string;
  iterations: LoopIterationResult[];
  totalTokensUsed: number;
  totalLatency: number;
  status: LoopStatus;
  error?: string;
  loopType: LoopType;
  iterationsCount: number;
}

export interface LoopContext {
  agentId: string;
  sessionId: string;
  organizationId: string;
  userId?: string;
  metadata: Record<string, any>;
}

export interface ReActConfig extends LoopConfig {
  toolCallFormat?: 'json' | 'markdown' | 'structured';
  requireThought?: boolean;
}

export interface ReflectionConfig extends LoopConfig {
  critiquePrompt?: string;
  improvementPrompt?: string;
  qualityThreshold?: number;
}

export interface SelfCritiqueConfig extends LoopConfig {
  criteria: string[];
  scoreThreshold: number;
  maxRounds: number;
}

export interface PlanningConfig extends LoopConfig {
  maxSubTasks?: number;
  verificationRequired?: boolean;
  replanOnFailure?: boolean;
}

export const DEFAULT_REACT_CONFIG: ReActConfig = {
  maxIterations: 10,
  temperature: 0.7,
  toolCallFormat: 'json',
  requireThought: true,
};

export const DEFAULT_REFLECTION_CONFIG: ReflectionConfig = {
  maxIterations: 3,
  temperature: 0.5,
  qualityThreshold: 8,
};

export const DEFAULT_SELF_CRITIQUE_CONFIG: SelfCritiqueConfig = {
  maxIterations: 3,
  temperature: 0.4,
  criteria: ['accuracy', 'completeness', 'clarity', 'relevance'],
  scoreThreshold: 7,
  maxRounds: 3,
};

export const DEFAULT_PLANNING_CONFIG: PlanningConfig = {
  maxIterations: 5,
  temperature: 0.6,
  maxSubTasks: 8,
  verificationRequired: true,
  replanOnFailure: true,
};
