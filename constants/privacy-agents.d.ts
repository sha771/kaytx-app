import type { AIEmployee } from './aiEmployeesEnhanced';
export declare const privacyDataClassifier: AIEmployee;
export declare const privacyPurposeValidator: AIEmployee;
export declare const privacyAccessController: AIEmployee;
export declare const privacyDataMasker: AIEmployee;
export declare const privacyContextFilter: AIEmployee;
export declare const privacyPermissionEnforcer: AIEmployee;
export declare const privacyOutputSanitizer: AIEmployee;
export declare const privacyComplianceChecker: AIEmployee;
export declare const privacyAuditLogger: AIEmployee;
export declare const allPrivacyAgents: AIEmployee[];
export declare function getPrivacyAgentById(id: string): AIEmployee | undefined;
export declare function getPrivacyAgentsByGate(gate: 'input' | 'agent' | 'output'): AIEmployee[];
//# sourceMappingURL=privacy-agents.d.ts.map