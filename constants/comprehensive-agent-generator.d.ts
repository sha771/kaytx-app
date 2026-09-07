/**
 * Comprehensive Agent Generator
 *
 * Generates all agents with complete features, options, and capabilities across 36 departments.
 *
 * ALL 36 DEPARTMENTS: Exactly 60 agents each (20 main + 40 sub)
 * Total: 36 departments × 60 agents = 2,160 total agents
 *
 * @version 4.0.0
 * @lastUpdated 2026-06-20
 */
import type { AIAgent } from './aiAgentHierarchy';
interface DepartmentConfig {
    id: string;
    name: string;
    color: string;
    icon: any;
    mainAgentCount: number;
    subAgentCount: number;
    mainAgentRoles: string[];
    subAgentRoles: string[];
    capabilities: string[];
    integrations: string[];
    kpis: string[];
}
/**
 * Generate all main agents for a department
 */
export declare function generateDepartmentMainAgents(departmentId: string): AIAgent[];
/**
 * Generate all sub-agents for a department
 */
export declare function generateDepartmentSubAgents(departmentId: string): AIAgent[];
/**
 * Generate all agents for all departments
 */
export declare function generateAllAgents(): {
    mainAgents: Record<string, AIAgent[]>;
    subAgents: Record<string, AIAgent[]>;
    allMainAgents: AIAgent[];
    allSubAgents: AIAgent[];
    allAgents: AIAgent[];
};
/**
 * Get department configuration
 */
export declare function getDepartmentConfig(departmentId: string): DepartmentConfig | undefined;
/**
 * Get all department configurations
 */
export declare function getAllDepartmentConfigs(): Record<string, DepartmentConfig>;
export declare const AGENT_GENERATION_STATS: {
    totalDepartments: number;
    totalMainAgents: number;
    totalSubAgents: number;
    totalAgents: number;
};
export {};
//# sourceMappingURL=comprehensive-agent-generator.d.ts.map