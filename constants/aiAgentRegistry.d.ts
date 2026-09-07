/**
 * =============================================================================
 * KAYTX AI AGENT REGISTRY - MASTER CROSS-REFERENCE (1135 AGENTS)
 * =============================================================================
 * Maps every agent across sidebar, hierarchy, workforce, and page routes.
 * @version 11.0.0
 */
export interface AgentRegistryEntry {
    uid: string;
    seq: number;
    sidebarId: string;
    hierarchyId: string | null;
    route: string;
    title: string;
    department: string;
    departmentId: number;
    level: string;
    type: 'main' | 'sub';
    parentId: string | null;
    /**
     * Phone number assigned to voice/phone/call-oriented agents.
     * Undefined for agents whose role does not require a phone line.
     * Values are deterministic mock/placeholder numbers (no real PII).
     */
    phoneNumber?: string;
}
export declare const agentRegistry: AgentRegistryEntry[];
/**
 * Keyword patterns that identify an agent whose role requires a phone line
 * (receptionist, customer support, negotiator, call router, call center,
 * hotline, switchboard, telemarketer, dispatcher, appointment/outreach/follow-up
 * callers, voice agents, etc.). Centralized here for easy tuning.
 */
export declare const PHONE_ROLE_PATTERNS: RegExp[];
/** Returns true when the given agent title indicates a phone/voice/call role. */
export declare function requiresPhone(title: string): boolean;
/**
 * Deterministic mock/placeholder phone number derived from an agent's sequence.
 * Format: +1 (AREA) PREFIX-LINE  (no real PII).
 */
export declare function generateAgentPhoneNumber(seq: number): string;
/** Returns the assigned phone number for an agent uid, or null if none. */
export declare function getAgentPhoneNumber(uid: string): string | null;
export declare function getByUid(uid: string): AgentRegistryEntry | undefined;
export declare function getBySidebarId(id: string): AgentRegistryEntry | undefined;
export declare function getByHierarchyId(id: string): AgentRegistryEntry | undefined;
export declare function getByRoute(route: string): AgentRegistryEntry | undefined;
export declare function getByDepartment(deptId: number): AgentRegistryEntry[];
export declare function validateRegistry(): {
    valid: boolean;
    total: number;
    uniqueUids: number;
    issues: string[];
};
//# sourceMappingURL=aiAgentRegistry.d.ts.map