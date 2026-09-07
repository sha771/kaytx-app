/**
 * Agent Configurations - System prompts, tools, capabilities for ALL departments
 * This file defines the intelligence behind every agent in the system.
 * Each department gets a template, each level (C-level, VP, Manager, Team Lead, Specialist) gets variations.
 */
export interface AgentToolConfig {
    name: string;
    description: string;
    parameters: Record<string, {
        type: string;
        description: string;
        required?: boolean;
    }>;
    category: string;
}
export interface DepartmentAgentConfig {
    departmentId: number;
    department: string;
    departmentSlug: string;
    color: string;
    icon: string;
    baseSystemPrompt: string;
    capabilities: string[];
    tools: AgentToolConfig[];
    levelPrompts: Record<string, string>;
    levelCapabilities: Record<string, string[]>;
    levelTools: Record<string, string[]>;
}
export declare function getAllDepartmentConfigs(): DepartmentAgentConfig[];
export declare function getDepartmentConfig(departmentId: number): DepartmentAgentConfig | undefined;
export declare function getDepartmentConfigBySlug(slug: string): DepartmentAgentConfig | undefined;
export declare function getAgentSystemPrompt(departmentId: number, level: string, agentTitle: string): string;
export declare function getAgentTools(departmentId: number, level: string): AgentToolConfig[];
export declare function getAgentCapabilities(departmentId: number, level: string): string[];
export declare function getAllAgentTools(): AgentToolConfig[];
//# sourceMappingURL=agent-configurations.d.ts.map