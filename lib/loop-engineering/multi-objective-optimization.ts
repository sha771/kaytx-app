/**
 * Multi-Objective Optimization for Loop Engineering
 * Optimizes loops with multiple conflicting objectives using Pareto fronts
 */

import { LoopConfig, LoopGoal } from './types';

export interface Objective {
  id: string;
  name: string;
  weight: number; // Importance weight (0-1)
  direction: 'minimize' | 'maximize';
  target?: number;
}

export interface ParetoSolution {
  parameters: Record<string, any>;
  objectives: Record<string, number>;
  dominated: boolean;
  rank: number;
  crowdingDistance: number;
}

export interface OptimizationResult {
  paretoFront: ParetoSolution[];
  bestSolution: ParetoSolution;
  iterations: number;
  converged: boolean;
}

export class MultiObjectiveOptimizer {
  private objectives: Objective[] = [];
  private paretoFront: ParetoSolution[] = [];
  private populationSize: number = 50;
  private maxGenerations: number = 100;

  /**
   * Add objective to optimize
   */
  addObjective(objective: Objective): void {
    this.objectives.push(objective);
  }

  /**
   * Run NSGA-II (Non-dominated Sorting Genetic Algorithm)
   */
  async optimize(
    objectiveFunction: (params: Record<string, any>) => Promise<Record<string, number>>,
    parameterSpace: Record<string, { min: number; max: number }>
  ): Promise<OptimizationResult> {
    // Initialize population
    let population = this.initializePopulation(parameterSpace);
    
    for (let generation = 0; generation < this.maxGenerations; generation++) {
      // Evaluate objectives
      const evaluatedPopulation = await this.evaluatePopulation(population, objectiveFunction);
      
      // Non-dominated sort
      const fronts = this.nonDominatedSort(evaluatedPopulation);
      
      // Calculate crowding distance
      this.calculateCrowdingDistance(fronts);
      
      // Select parents
      const parents = this.selectParents(fronts);
      
      // Create offspring
      const offspring = this.createOffspring(parents, parameterSpace);
      
      // Evaluate offspring
      const evaluatedOffspring = await this.evaluatePopulation(offspring, objectiveFunction);
      
      // Combine and select next generation
      const combined = [...evaluatedPopulation, ...evaluatedOffspring];
      const nextFronts = this.nonDominatedSort(combined);
      
      population = this.selectNextGeneration(nextFronts);
      
      // Update Pareto front
      this.paretoFront = nextFronts[0] || [];
      
      // Check convergence
      if (this.checkConvergence(generation)) {
        break;
      }
    }

    const bestSolution = this.selectBestSolution(this.paretoFront);

    return {
      paretoFront: this.paretoFront,
      bestSolution,
      iterations: this.maxGenerations,
      converged: true,
    };
  }

  /**
   * Initialize random population
   */
  private initializePopulation(parameterSpace: Record<string, { min: number; max: number }>): ParetoSolution[] {
    const population: ParetoSolution[] = [];

    for (let i = 0; i < this.populationSize; i++) {
      const parameters: Record<string, any> = {};
      
      for (const [name, space] of Object.entries(parameterSpace)) {
        parameters[name] = space.min + Math.random() * (space.max - space.min);
      }

      population.push({
        parameters,
        objectives: {},
        dominated: false,
        rank: 0,
        crowdingDistance: 0,
      });
    }

    return population;
  }

  /**
   * Evaluate population objectives
   */
  private async evaluatePopulation(
    population: ParetoSolution[],
    objectiveFunction: (params: Record<string, any>) => Promise<Record<string, number>>
  ): Promise<ParetoSolution[]> {
    const evaluated: ParetoSolution[] = [];

    for (const solution of population) {
      const objectives = await objectiveFunction(solution.parameters);
      evaluated.push({
        ...solution,
        objectives,
      });
    }

    return evaluated;
  }

  /**
   * Non-dominated sorting (NSGA-II)
   */
  private nonDominatedSort(population: ParetoSolution[]): ParetoSolution[][] {
    const fronts: ParetoSolution[][] = [];
    const dominationCount = new Map<number, number>();
    const dominatedSolutions = new Map<number, number[]>();

    // Calculate domination
    for (let i = 0; i < population.length; i++) {
      dominationCount.set(i, 0);
      dominatedSolutions.set(i, []);

      for (let j = 0; j < population.length; j++) {
        if (this.dominates(population[i], population[j])) {
          dominatedSolutions.get(i)!.push(j);
        } else if (this.dominates(population[j], population[i])) {
          dominationCount.set(i, (dominationCount.get(i) || 0) + 1);
        }
      }
    }

    // Build fronts
    const currentFront: ParetoSolution[] = [];
    for (let i = 0; i < population.length; i++) {
      if (dominationCount.get(i) === 0) {
        currentFront.push(population[i]);
        population[i].rank = 0;
      }
    }

    fronts.push(currentFront);

    let k = 0;
    while (fronts[k].length > 0) {
      const nextFront: ParetoSolution[] = [];

      for (const solution of fronts[k]) {
        const index = population.indexOf(solution);
        const dominated = dominatedSolutions.get(index) || [];

        for (const dominatedIndex of dominated) {
          dominationCount.set(dominatedIndex, (dominationCount.get(dominatedIndex) || 0) - 1);

          if (dominationCount.get(dominatedIndex) === 0) {
            population[dominatedIndex].rank = k + 1;
            nextFront.push(population[dominatedIndex]);
          }
        }
      }

      k++;
      fronts.push(nextFront);
    }

    return fronts.filter(front => front.length > 0);
  }

  /**
   * Check if solution1 dominates solution2
   */
  private dominates(solution1: ParetoSolution, solution2: ParetoSolution): boolean {
    let atLeastOneBetter = false;

    for (const objective of this.objectives) {
      const value1 = solution1.objectives[objective.id] || 0;
      const value2 = solution2.objectives[objective.id] || 0;

      if (objective.direction === 'maximize') {
        if (value1 < value2) return false;
        if (value1 > value2) atLeastOneBetter = true;
      } else {
        if (value1 > value2) return false;
        if (value1 < value2) atLeastOneBetter = true;
      }
    }

    return atLeastOneBetter;
  }

  /**
   * Calculate crowding distance for diversity
   */
  private calculateCrowdingDistance(fronts: ParetoSolution[][]): void {
    for (const front of fronts) {
      if (front.length === 0) continue;

      // Initialize crowding distance
      for (const solution of front) {
        solution.crowdingDistance = 0;
      }

      // For each objective
      for (const objective of this.objectives) {
        // Sort by objective value
        const sorted = [...front].sort((a, b) => {
          const valA = a.objectives[objective.id] || 0;
          const valB = b.objectives[objective.id] || 0;
          return objective.direction === 'maximize' ? valB - valA : valA - valB;
        });

        // Boundary solutions get infinite distance
        if (sorted.length > 0) {
          sorted[0].crowdingDistance = Infinity;
          sorted[sorted.length - 1].crowdingDistance = Infinity;
        }

        // Calculate distance for others
        const minVal = sorted[0].objectives[objective.id] || 0;
        const maxVal = sorted[sorted.length - 1].objectives[objective.id] || 0;
        const range = maxVal - minVal;

        if (range > 0) {
          for (let i = 1; i < sorted.length - 1; i++) {
            const distance = (sorted[i + 1].objectives[objective.id]! - sorted[i - 1].objectives[objective.id]!) / range;
            sorted[i].crowdingDistance += distance;
          }
        }
      }
    }
  }

  /**
   * Select parents using tournament selection
   */
  private selectParents(fronts: ParetoSolution[][]): ParetoSolution[] {
    const parents: ParetoSolution[] = [];
    const flatPopulation = fronts.flat();

    for (let i = 0; i < this.populationSize; i++) {
      // Tournament selection
      const candidate1 = flatPopulation[Math.floor(Math.random() * flatPopulation.length)];
      const candidate2 = flatPopulation[Math.floor(Math.random() * flatPopulation.length)];

      // Better rank wins, if tie, higher crowding distance wins
      if (candidate1.rank < candidate2.rank) {
        parents.push(candidate1);
      } else if (candidate1.rank > candidate2.rank) {
        parents.push(candidate2);
      } else {
        parents.push(candidate1.crowdingDistance > candidate2.crowdingDistance ? candidate1 : candidate2);
      }
    }

    return parents;
  }

  /**
   * Create offspring using crossover and mutation
   */
  private createOffspring(parents: ParetoSolution[], parameterSpace: Record<string, { min: number; max: number }>): ParetoSolution[] {
    const offspring: ParetoSolution[] = [];

    for (let i = 0; i < this.populationSize; i++) {
      const parent1 = parents[Math.floor(Math.random() * parents.length)];
      const parent2 = parents[Math.floor(Math.random() * parents.length)];

      // Crossover
      const childParams: Record<string, any> = {};
      for (const [name, space] of Object.entries(parameterSpace)) {
        if (Math.random() < 0.5) {
          childParams[name] = parent1.parameters[name];
        } else {
          childParams[name] = parent2.parameters[name];
        }
      }

      // Mutation
      for (const [name, space] of Object.entries(parameterSpace)) {
        if (Math.random() < 0.1) {
          childParams[name] = space.min + Math.random() * (space.max - space.min);
        }
      }

      offspring.push({
        parameters: childParams,
        objectives: {},
        dominated: false,
        rank: 0,
        crowdingDistance: 0,
      });
    }

    return offspring;
  }

  /**
   * Select next generation from fronts
   */
  private selectNextGeneration(fronts: ParetoSolution[][]): ParetoSolution[] {
    const nextGeneration: ParetoSolution[] = [];
    let count = 0;

    for (const front of fronts) {
      if (count + front.length <= this.populationSize) {
        nextGeneration.push(...front);
        count += front.length;
      } else {
        // Sort by crowding distance and take remaining
        const sorted = [...front].sort((a, b) => b.crowdingDistance - a.crowdingDistance);
        const remaining = this.populationSize - count;
        nextGeneration.push(...sorted.slice(0, remaining));
        break;
      }
    }

    return nextGeneration;
  }

  /**
   * Check convergence
   */
  private checkConvergence(generation: number): boolean {
    if (generation < 10) return false;

    const recentFronts = this.paretoFront.slice(-5);
    if (recentFronts.length < 2) return false;

    // Check if Pareto front is stable
    const variance = this.calculateParetoVariance(recentFronts);
    return variance < 0.01;
  }

  /**
   * Calculate variance in Pareto front
   */
  private calculateParetoVariance(fronts: ParetoSolution[]): number {
    if (fronts.length < 2) return 0;

    const avgSize = fronts.reduce((sum, front) => sum + front.length, 0) / fronts.length;
    return fronts.reduce((sum, front) => sum + Math.pow(front.length - avgSize, 2), 0) / fronts.length;
  }

  /**
   * Select best solution from Pareto front
   */
  private selectBestSolution(paretoFront: ParetoSolution[]): ParetoSolution {
    if (paretoFront.length === 0) {
      return {
        parameters: {},
        objectives: {},
        dominated: false,
        rank: 0,
        crowdingDistance: 0,
      };
    }

    // Weighted sum approach
    let bestSolution = paretoFront[0];
    let bestScore = -Infinity;

    for (const solution of paretoFront) {
      let score = 0;

      for (const objective of this.objectives) {
        const value = solution.objectives[objective.id] || 0;
        const normalizedValue = this.normalizeObjective(value, objective);
        score += objective.weight * normalizedValue;
      }

      if (score > bestScore) {
        bestScore = score;
        bestSolution = solution;
      }
    }

    return bestSolution;
  }

  /**
   * Normalize objective value
   */
  private normalizeObjective(value: number, objective: Objective): number {
    if (objective.target) {
      return 1 - Math.abs(value - objective.target) / objective.target;
    }
    return value;
  }

  /**
   * Get Pareto front
   */
  getParetoFront(): ParetoSolution[] {
    return [...this.paretoFront];
  }

  /**
   * Get objectives
   */
  getObjectives(): Objective[] {
    return [...this.objectives];
  }

  /**
   * Reset optimizer
   */
  reset(): void {
    this.paretoFront = [];
  }
}

/**
 * Weighted Sum Method for Multi-Objective Optimization
 */
export class WeightedSumOptimizer {
  private objectives: Objective[] = [];
  private weights: Map<string, number> = new Map();

  /**
   * Add objective with weight
   */
  addObjective(objective: Objective): void {
    this.objectives.push(objective);
    this.weights.set(objective.id, objective.weight);
  }

  /**
   * Optimize using weighted sum
   */
  async optimize(
    objectiveFunction: (params: Record<string, any>) => Promise<Record<string, number>>,
    parameterSpace: Record<string, { min: number; max: number }>,
    iterations: number = 100
  ): Promise<{ bestParameters: Record<string, any>; bestScore: number }> {
    let bestParameters: Record<string, any> = {};
    let bestScore = -Infinity;

    for (let i = 0; i < iterations; i++) {
      // Sample parameters
      const params: Record<string, any> = {};
      for (const [name, space] of Object.entries(parameterSpace)) {
        params[name] = space.min + Math.random() * (space.max - space.min);
      }

      // Evaluate objectives
      const objectives = await objectiveFunction(params);

      // Calculate weighted sum
      let score = 0;
      for (const objective of this.objectives) {
        const value = objectives[objective.id] || 0;
        const weight = this.weights.get(objective.id) || 0;
        
        if (objective.direction === 'maximize') {
          score += weight * value;
        } else {
          score -= weight * value;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestParameters = params;
      }
    }

    return { bestParameters, bestScore };
  }

  /**
   * Update weight for objective
   */
  updateWeight(objectiveId: string, weight: number): void {
    this.weights.set(objectiveId, weight);
  }
}

/**
 * ε-Constraint Method for Multi-Objective Optimization
 */
export class EpsilonConstraintOptimizer {
  private objectives: Objective[] = [];
  private primaryObjective: string | null = null;

  /**
   * Add objective
   */
  addObjective(objective: Objective): void {
    this.objectives.push(objective);
  }

  /**
   * Set primary objective to maximize
   */
  setPrimaryObjective(objectiveId: string): void {
    this.primaryObjective = objectiveId;
  }

  /**
   * Optimize using ε-constraint method
   */
  async optimize(
    objectiveFunction: (params: Record<string, any>) => Promise<Record<string, number>>,
    parameterSpace: Record<string, { min: number; max: number }>,
    epsilonValues: Record<string, number>,
    iterations: number = 100
  ): Promise<{ bestParameters: Record<string, any>; bestScore: number }> {
    if (!this.primaryObjective) {
      throw new Error('Primary objective not set');
    }

    let bestParameters: Record<string, any> = {};
    let bestScore = -Infinity;

    for (let i = 0; i < iterations; i++) {
      // Sample parameters
      const params: Record<string, any> = {};
      for (const [name, space] of Object.entries(parameterSpace)) {
        params[name] = space.min + Math.random() * (space.max - space.min);
      }

      // Evaluate objectives
      const objectives = await objectiveFunction(params);

      // Check constraints
      let constraintsSatisfied = true;
      for (const objective of this.objectives) {
        if (objective.id === this.primaryObjective) continue;
        
        const value = objectives[objective.id] || 0;
        const epsilon = epsilonValues[objective.id] || Infinity;

        if (objective.direction === 'maximize' && value < epsilon) {
          constraintsSatisfied = false;
          break;
        }
        if (objective.direction === 'minimize' && value > epsilon) {
          constraintsSatisfied = false;
          break;
        }
      }

      if (!constraintsSatisfied) continue;

      // Maximize primary objective
      const primaryValue = objectives[this.primaryObjective] || 0;
      if (primaryValue > bestScore) {
        bestScore = primaryValue;
        bestParameters = params;
      }
    }

    return { bestParameters, bestScore };
  }
}

/**
 * Factory function for common multi-objective setups
 */
export function createMultiObjectiveSetup(type: 'speed-quality' | 'cost-efficiency' | 'accuracy-speed'): {
  objectives: Objective[];
  optimizer: MultiObjectiveOptimizer;
} {
  const optimizer = new MultiObjectiveOptimizer();

  switch (type) {
    case 'speed-quality':
      optimizer.addObjective({
        id: 'speed',
        name: 'Execution Speed',
        weight: 0.5,
        direction: 'maximize',
      });
      optimizer.addObjective({
        id: 'quality',
        name: 'Output Quality',
        weight: 0.5,
        direction: 'maximize',
      });
      break;

    case 'cost-efficiency':
      optimizer.addObjective({
        id: 'cost',
        name: 'Cost',
        weight: 0.4,
        direction: 'minimize',
      });
      optimizer.addObjective({
        id: 'efficiency',
        name: 'Efficiency',
        weight: 0.6,
        direction: 'maximize',
      });
      break;

    case 'accuracy-speed':
      optimizer.addObjective({
        id: 'accuracy',
        name: 'Accuracy',
        weight: 0.7,
        direction: 'maximize',
      });
      optimizer.addObjective({
        id: 'speed',
        name: 'Speed',
        weight: 0.3,
        direction: 'maximize',
      });
      break;
  }

  return {
    objectives: optimizer.getObjectives(),
    optimizer,
  };
}
