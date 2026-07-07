/**
 * Loop Execution Engine
 * 
 * Core engine for running automated closed-cycle AI agent workflows.
 * Handles execution, evaluation, retry logic, and agent coordination.
 */

import {
  LoopConfig,
  LoopExecution,
  LoopStatus,
  LoopCondition,
  LoopNode,
  LoopAction
} from './types';

export class LoopExecutionEngine {
  private activeExecutions: Map<string, LoopExecution> = new Map();
  private executionCallbacks: Map<string, (execution: LoopExecution) => void> = new Map();

  /**
   * Start a new loop execution
   */
  async startLoop(config: LoopConfig, inputData: Record<string, any>): Promise<LoopExecution> {
    const execution: LoopExecution = {
      id: this.generateExecutionId(),
      loopId: config.id,
      status: 'running',
      startTime: new Date(),
      currentIteration: 0,
      inputData,
      intermediateResults: new Map(),
      metrics: {
        totalExecutionTime: 0,
        agentExecutionTimes: new Map(),
        successfulSteps: 0,
        failedSteps: 0,
        resourceUsage: {
          cpu: 0,
          memory: 0,
          apiCalls: 0
        }
      },
      errors: [],
      decisions: []
    };

    this.activeExecutions.set(execution.id, execution);
    
    try {
      await this.executeLoop(config, execution);
      return execution;
    } catch (error) {
      execution.status = 'failed';
      execution.errors.push({
        nodeId: execution.currentNodeId || 'unknown',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date(),
        retryCount: 0
      });
      return execution;
    }
  }

  /**
   * Execute the loop workflow
   */
  private async executeLoop(config: LoopConfig, execution: LoopExecution): Promise<void> {
    const startTime = Date.now();
    let currentNode = config.nodes.find(n => n.id === config.startNodeId);
    
    if (!currentNode) {
      throw new Error(`Start node ${config.startNodeId} not found`);
    }

    execution.currentNodeId = currentNode.id;

    while (currentNode && execution.status === 'running') {
      // Check iteration limit
      if (config.goal.maxIterations && execution.currentIteration >= config.goal.maxIterations) {
        execution.status = 'completed';
        break;
      }

      // Check timeout
      if (config.goal.timeout && (Date.now() - startTime) > config.goal.timeout * 1000) {
        execution.status = 'failed';
        execution.errors.push({
          nodeId: currentNode.id,
          error: 'Loop timeout exceeded',
          timestamp: new Date(),
          retryCount: 0
        });
        break;
      }

      // Execute current node
      const nodeResult = await this.executeNode(currentNode, execution, config);
      
      if (nodeResult.success) {
        execution.successfulSteps++;
        execution.intermediateResults.set(currentNode.id, nodeResult.data);
        
        // Check if we've reached the end node
        if (currentNode.id === config.endNodeId || !currentNode.nextNodes || currentNode.nextNodes.length === 0) {
          // Evaluate final success criteria
          const success = await this.evaluateSuccessCriteria(config, execution);
          execution.status = success ? 'completed' : 'failed';
          break;
        }
        
        // Determine next node(s)
        currentNode = this.determineNextNode(currentNode, nodeResult.data, config);
        if (currentNode) {
          execution.currentNodeId = currentNode.id;
        }
      } else {
        execution.failedSteps++;
        
        // Handle retry logic
        const shouldRetry = await this.handleRetry(currentNode, nodeResult.error, config, execution);
        if (!shouldRetry) {
          execution.status = 'failed';
          break;
        }
      }

      execution.currentIteration++;
    }

    execution.endTime = new Date();
    execution.metrics.totalExecutionTime = Date.now() - startTime;
    execution.outputData = this.collectOutputData(execution, config);
  }

  /**
   * Execute a single node in the loop
   */
  private async executeNode(
    node: LoopNode,
    execution: LoopExecution,
    config: LoopConfig
  ): Promise<{ success: boolean; data: any; error?: string }> {
    const nodeStartTime = Date.now();

    try {
      // Check conditions before execution
      if (node.conditions) {
        const conditionsMet = await this.evaluateConditions(node.conditions, execution);
        if (!conditionsMet) {
          return { success: false, data: null, error: 'Conditions not met' };
        }
      }

      let result: any = null;

      // Execute based on node type
      switch (node.type) {
        case 'agent':
          result = await this.executeAgentNode(node, execution, config);
          break;
        case 'condition':
          result = await this.executeConditionNode(node, execution);
          break;
        case 'action':
          result = await this.executeActionNode(node, execution);
          break;
        case 'merge':
          result = await this.executeMergeNode(node, execution);
          break;
        case 'split':
          result = await this.executeSplitNode(node, execution);
          break;
        default:
          result = { success: true, data: null };
      }

      // Execute node actions if any
      if (node.actions) {
        for (const action of node.actions) {
          await this.executeAction(action, result, execution);
        }
      }

      const executionTime = Date.now() - nodeStartTime;
      execution.metrics.agentExecutionTimes.set(node.id, executionTime);

      return { success: true, data: result };

    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Execute an agent node
   */
  private async executeAgentNode(
    node: LoopNode,
    execution: LoopExecution,
    config: LoopConfig
  ): Promise<any> {
    if (!node.agentId) {
      throw new Error('Agent node requires agentId');
    }

    // In a real implementation, this would call your agent execution system
    // For now, we'll simulate the execution
    console.log(`Executing agent ${node.agentId} with data:`, execution.inputData);
    
    // Simulate agent processing
    await this.simulateAgentExecution(node.agentId, node.agentType || 'main');
    
    // Return mock result based on agent type
    return {
      agentId: node.agentId,
      result: `Executed ${node.agentId} successfully`,
      timestamp: new Date(),
      data: execution.inputData
    };
  }

  /**
   * Execute a condition node
   */
  private async executeConditionNode(
    node: LoopNode,
    execution: LoopExecution
  ): Promise<any> {
    if (!node.conditions || node.conditions.length === 0) {
      return true;
    }

    const results = await Promise.all(
      node.conditions.map(condition => this.evaluateCondition(condition, execution))
    );

    return results.every(r => r);
  }

  /**
   * Execute an action node
   */
  private async executeActionNode(
    node: LoopNode,
    execution: LoopExecution
  ): Promise<any> {
    if (!node.actions || node.actions.length === 0) {
      return null;
    }

    const results = await Promise.all(
      node.actions.map(action => this.executeAction(action, execution.inputData, execution))
    );

    return results;
  }

  /**
   * Execute a merge node (combine multiple paths)
   */
  private async executeMergeNode(
    node: LoopNode,
    execution: LoopExecution
  ): Promise<any> {
    // Collect results from previous nodes
    const mergedData: Record<string, any> = {};
    
    for (const [nodeId, result] of execution.intermediateResults) {
      mergedData[nodeId] = result;
    }

    return mergedData;
  }

  /**
   * Execute a split node (parallel execution)
   */
  private async executeSplitNode(
    node: LoopNode,
    execution: LoopExecution
  ): Promise<any> {
    // In a real implementation, this would spawn parallel executions
    // For now, return the current data to be processed by next nodes
    return execution.inputData;
  }

  /**
   * Execute a single action
   */
  private async executeAction(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    switch (action.type) {
      case 'api_call':
        return this.executeApiCall(action, context, execution);
      case 'data_transform':
        return this.executeDataTransform(action, context, execution);
      case 'notification':
        return this.executeNotification(action, context, execution);
      case 'agent_prompt':
        return this.executeAgentPrompt(action, context, execution);
      case 'custom':
        return this.executeCustomAction(action, context, execution);
      default:
        console.warn(`Unknown action type: ${action.type}`);
        return null;
    }
  }

  /**
   * Execute API call action
   */
  private async executeApiCall(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    execution.metrics.resourceUsage.apiCalls++;
    // In real implementation, make actual API call
    console.log(`API Call: ${action.name}`, action.config);
    return { success: true, data: context };
  }

  /**
   * Execute data transform action
   */
  private async executeDataTransform(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    // Apply transformation based on config
    const transformFn = new Function('data', `return ${action.config.transform || 'data'}`);
    return transformFn(context);
  }

  /**
   * Execute notification action
   */
  private async executeNotification(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    console.log(`Notification: ${action.name}`, action.config);
    return { success: true };
  }

  /**
   * Execute agent prompt action
   */
  private async executeAgentPrompt(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    console.log(`Agent Prompt: ${action.name}`, action.config);
    return { success: true, response: 'Agent response' };
  }

  /**
   * Execute custom action
   */
  private async executeCustomAction(
    action: LoopAction,
    context: any,
    execution: LoopExecution
  ): Promise<any> {
    if (action.config.code) {
      const customFn = new Function('data', 'context', action.config.code);
      return customFn(context, execution);
    }
    return null;
  }

  /**
   * Evaluate conditions
   */
  private async evaluateConditions(
    conditions: LoopCondition[],
    execution: LoopExecution
  ): Promise<boolean> {
    const results = await Promise.all(
      conditions.map(condition => this.evaluateCondition(condition, execution))
    );
    return results.every(r => r);
  }

  /**
   * Evaluate a single condition
   */
  private async evaluateCondition(
    condition: LoopCondition,
    execution: LoopExecution
  ): Promise<boolean> {
    const value = this.getValueAtPath(condition.targetPath, execution);
    
    execution.decisions.push({
      nodeId: execution.currentNodeId || 'unknown',
      conditionId: condition.id,
      result: false, // Will be set below
      timestamp: new Date()
    });

    let result: boolean;

    switch (condition.operator) {
      case 'equals':
        result = value === condition.targetValue;
        break;
      case 'not_equals':
        result = value !== condition.targetValue;
        break;
      case 'greater_than':
        result = Number(value) > Number(condition.targetValue);
        break;
      case 'less_than':
        result = Number(value) < Number(condition.targetValue);
        break;
      case 'contains':
        result = Array.isArray(value) ? value.includes(condition.targetValue) : 
                 String(value).includes(String(condition.targetValue));
        break;
      case 'matches':
        result = new RegExp(condition.targetValue).test(String(value));
        break;
      case 'custom':
        if (condition.customEvaluation) {
          const customFn = new Function('value', 'context', `return ${condition.customEvaluation}`);
          result = customFn(value, execution);
        } else {
          result = false;
        }
        break;
      default:
        result = false;
    }

    // Update the decision result
    const lastDecision = execution.decisions[execution.decisions.length - 1];
    if (lastDecision) {
      lastDecision.result = result;
    }

    return result;
  }

  /**
   * Get value at JSON path
   */
  private getValueAtPath(path: string, context: any): any {
    const parts = path.split('.');
    let value = context;
    
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  /**
   * Determine the next node based on current node and results
   */
  private determineNextNode(
    currentNode: LoopNode,
    result: any,
    config: LoopConfig
  ): LoopNode | null {
    if (!currentNode.nextNodes || currentNode.nextNodes.length === 0) {
      return null;
    }

    // If multiple next nodes, use conditions to determine which one
    if (currentNode.nextNodes.length > 1) {
      // Simple implementation: take the first one that matches conditions
      for (const nextNodeId of currentNode.nextNodes) {
        const nextNode = config.nodes.find(n => n.id === nextNodeId);
        if (nextNode && nextNode.conditions) {
          // In a real implementation, evaluate conditions here
          return nextNode;
        }
      }
    }

    // Default to first next node
    const nextNodeId = currentNode.nextNodes[0];
    return config.nodes.find(n => n.id === nextNodeId) || null;
  }

  /**
   * Handle retry logic
   */
  private async handleRetry(
    node: LoopNode,
    error: string,
    config: LoopConfig,
    execution: LoopExecution
  ): Promise<boolean> {
    const nodeErrors = execution.errors.filter(e => e.nodeId === node.id);
    const retryCount = nodeErrors.length;

    if (retryCount >= config.settings.retryPolicy.maxRetries) {
      return false;
    }

    // Calculate delay based on backoff strategy
    let delay = config.settings.retryPolicy.initialDelay;
    switch (config.settings.retryPolicy.backoffStrategy) {
      case 'linear':
        delay = delay * (retryCount + 1);
        break;
      case 'exponential':
        delay = delay * Math.pow(2, retryCount);
        break;
      case 'fixed':
        // Keep initial delay
        break;
    }

    await this.sleep(delay);
    return true;
  }

  /**
   * Evaluate final success criteria
   */
  private async evaluateSuccessCriteria(
    config: LoopConfig,
    execution: LoopExecution
  ): Promise<boolean> {
    return await this.evaluateConditions(config.goal.successCriteria, execution);
  }

  /**
   * Collect output data from execution
   */
  private collectOutputData(execution: LoopExecution, config: LoopConfig): any {
    const output: Record<string, any> = {
      executionId: execution.id,
      loopId: execution.loopId,
      status: execution.status,
      iterations: execution.currentIteration,
      duration: execution.metrics.totalExecutionTime,
      results: {}
    };

    for (const [nodeId, result] of execution.intermediateResults) {
      output.results[nodeId] = result;
    }

    return output;
  }

  /**
   * Pause a running execution
   */
  pauseExecution(executionId: string): boolean {
    const execution = this.activeExecutions.get(executionId);
    if (execution && execution.status === 'running') {
      execution.status = 'paused';
      return true;
    }
    return false;
  }

  /**
   * Resume a paused execution
   */
  async resumeExecution(executionId: string): Promise<boolean> {
    const execution = this.activeExecutions.get(executionId);
    if (execution && execution.status === 'paused') {
      execution.status = 'running';
      // In a real implementation, resume from current state
      return true;
    }
    return false;
  }

  /**
   * Stop an execution
   */
  stopExecution(executionId: string): boolean {
    const execution = this.activeExecutions.get(executionId);
    if (execution) {
      execution.status = 'failed';
      execution.endTime = new Date();
      return true;
    }
    return false;
  }

  /**
   * Get execution status
   */
  getExecution(executionId: string): LoopExecution | undefined {
    return this.activeExecutions.get(executionId);
  }

  /**
   * Get all active executions
   */
  getActiveExecutions(): LoopExecution[] {
    return Array.from(this.activeExecutions.values());
  }

  // Utility methods
  private generateExecutionId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async simulateAgentExecution(agentId: string, agentType: string): Promise<void> {
    // Simulate processing time
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    await this.sleep(delay);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const loopExecutionEngine = new LoopExecutionEngine();