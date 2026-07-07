# Loop Engineering for AI Agents

## Overview

Loop engineering is the practice of designing automated, closed-cycle systems that prompt, evaluate, and re-run AI agents autonomously until a specific goal is met. This module implements four core loop patterns that enable agents to reason iteratively, use tools, reflect on their outputs, and decompose complex tasks.

## Architecture

```
backend/lib/loop-engineering/
├── types.ts              # Core types and configurations
├── react-loop.ts         # ReAct (Reasoning + Acting) loop
├── reflection-loop.ts    # Reflection & Self-Critique loops
├── planning-loop.ts      # Planning + Decomposition loop
├── loop-engine.ts        # Unified loop engine orchestrator
├── index.ts              # Public exports
└── LOOP_ENGINEERING.md   # This documentation

backend/services/
└── loop-engineering-service.ts  # Service wrapper for the loop engine
```

## Loop Patterns

### 1. ReAct Loop (Think -> Act -> Observe)

The foundational agent loop. The agent repeatedly:
1. **Thinks** - Reasons about what to do next
2. **Acts** - Calls a tool or produces a final answer
3. **Observes** - Receives tool results and incorporates them

```typescript
const result = await loopEngine.execute({
  type: 'react',
  systemPrompt: 'You are a research agent...',
  userInput: 'Find the latest sales data for Q2',
  tools: [/* agent tools */],
  context: { agentId, sessionId, organizationId },
  config: { maxIterations: 10 }
});
```

### 2. Reflection Loop (Generate -> Critique -> Improve)

The agent generates an initial response, critiques it, then produces an improved version. This repeats until quality threshold is met.

```typescript
const result = await loopEngine.execute({
  type: 'reflection',
  systemPrompt: 'You are a report writer...',
  userInput: 'Write a quarterly business summary',
  context,
  config: { maxIterations: 3, qualityThreshold: 8 }
});
```

### 3. Self-Critique Loop (Generate -> Evaluate -> Refine)

Similar to reflection but with explicit scoring against criteria. The agent evaluates its own output on accuracy, completeness, clarity, etc., and iterates until scores pass the threshold.

```typescript
const result = await loopEngine.execute({
  type: 'self_critique',
  systemPrompt: 'You are a code generator...',
  userInput: 'Write a Python function for binary search',
  context,
  config: {
    maxIterations: 3,
    criteria: ['correctness', 'efficiency', 'readability'],
    scoreThreshold: 7
  }
});
```

### 4. Planning Loop (Plan -> Execute -> Verify -> Replan)

The agent decomposes a complex task into sub-tasks with dependencies, executes each sub-task (optionally with tools), verifies results, and replans on failure.

```typescript
const result = await loopEngine.execute({
  type: 'planning',
  systemPrompt: 'You are a project manager agent...',
  userInput: 'Plan and execute the Q3 marketing campaign',
  tools: [/* campaign tools */],
  context,
  config: { maxIterations: 5, maxSubTasks: 8, replanOnFailure: true }
});
```

### 5. Tool-Use Loop

A variant of the ReAct loop focused purely on iterative tool usage. Useful for agents that need to call multiple tools sequentially, feeding results from one tool into the next.

## Integration with Existing System

### Via AgentExecutionEngine (recommended for backward compatibility)

Set `loopConfig.enabled = true` on the execution context:

```typescript
const result = await agentExecutionEngine.executeAgent(agent, {
  ...context,
  loopConfig: {
    enabled: true,
    loopType: 'react',
    config: { maxIterations: 10 }
  }
}, input, tools);
```

### Via AIAgentService

Use the dedicated `executeWithLoop` method:

```typescript
const result = await aiAgentService.executeWithLoop(agentId, orgId, input, {
  loopType: 'react',
  config: { maxIterations: 10 },
  tools: [/* custom tools */]
});
```

### Via LoopEngineeringService (direct access)

For full control:

```typescript
const loopService = new LoopEngineeringService(aiService, toolExecutor, conversationManager);
const result = await loopService.execute({
  agentId,
  organizationId,
  input: 'Analyze customer feedback trends',
  loopType: 'planning',
  config: { maxIterations: 5 }
});
```

## Events

The loop engine emits events for monitoring and UI updates:

| Event | Description |
|-------|-------------|
| `loop:started` | A loop execution has started |
| `loop:iteration` | A new iteration has begun |
| `loop:progress` | Progress update within an iteration |
| `loop:tool_executed` | A tool was called during the loop |
| `loop:completed` | Loop finished successfully |
| `loop:cancelled` | Loop was cancelled |
| `loop:generating_initial` | Reflection loop: generating first response |
| `loop:reflection_iteration` | Reflection loop: critique round |
| `loop:self_critique_round` | Self-critique loop: evaluation round |
| `loop:planning_started` | Planning loop: task decomposition began |
| `loop:task_started` | Planning loop: a sub-task started |
| `loop:task_completed` | Planning loop: a sub-task completed |
| `loop:synthesizing` | Planning loop: synthesizing results |
| `execution:started` | Service-level execution started |
| `execution:completed` | Service-level execution completed |
| `execution:failed` | Service-level execution failed |

## Configuration Reference

### ReActConfig

| Option | Default | Description |
|--------|---------|-------------|
| maxIterations | 10 | Maximum think-act-observe cycles |
| temperature | 0.7 | LLM temperature |
| toolCallFormat | 'json' | Format for tool calls (json/markdown/structured) |
| requireThought | true | Whether the model must include reasoning |
| model | - | Specific model override |
| stopConditions | - | Array of stop conditions |

### ReflectionConfig

| Option | Default | Description |
|--------|---------|-------------|
| maxIterations | 3 | Number of critique-improve cycles |
| temperature | 0.5 | LLM temperature (lower for critique) |
| qualityThreshold | 8 | Score at which to stop iterating |
| critiquePrompt | - | Custom critique instruction |
| improvementPrompt | - | Custom improvement instruction |

### SelfCritiqueConfig

| Option | Default | Description |
|--------|---------|-------------|
| maxIterations | 3 | Max evaluation rounds |
| temperature | 0.4 | LLM temperature |
| criteria | [accuracy, completeness, clarity, relevance] | Evaluation dimensions |
| scoreThreshold | 7 | Minimum average score to pass |
| maxRounds | 3 | Max refinement rounds |

### PlanningConfig

| Option | Default | Description |
|--------|---------|-------------|
| maxIterations | 5 | Max execution phases |
| temperature | 0.6 | LLM temperature |
| maxSubTasks | 8 | Max sub-tasks in decomposition |
| verificationRequired | true | Whether to verify each sub-task |
| replanOnFailure | true | Whether to replan failed sub-tasks |

## Best Practices

1. **Start with ReAct** - It's the most general-purpose loop pattern
2. **Set appropriate maxIterations** - Too low: agent can't complete. Too high: wasted tokens
3. **Use Reflection for quality-sensitive tasks** - Writing, code generation, analysis
4. **Use Planning for complex multi-step tasks** - Campaigns, research, project execution
5. **Monitor events** - Wire up event listeners to track loop progress
6. **Combine loops** - Use ReAct for tool use inside a Planning loop's sub-tasks
7. **Error recovery** - The loop engine handles tool failures gracefully; failed tool calls become observations that the model can act on
