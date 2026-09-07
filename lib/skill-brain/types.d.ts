export declare enum CompetencyLevel {
    NOVICE = "novice",
    ADVANCED_BEGINNER = "advanced_beginner",
    COMPETENT = "competent",
    PROFICIENT = "proficient",
    EXPERT = "expert"
}
export declare enum TransferReadiness {
    NOT_READY = "not_ready",
    PARTIALLY_READY = "partially_ready",
    READY = "ready",
    FULLY_READY = "fully_ready",
    TRANSFERRED = "transferred"
}
export declare enum ContentType {
    DOCUMENT = "document",
    FILE = "file",
    CONVERSATION = "conversation",
    MEETING = "meeting",
    EMAIL = "email",
    CHAT = "chat",
    CODE = "code",
    DECISION = "decision",
    PROJECT = "project",
    TRIBAL = "tribal",
    SOP = "sop",
    WORKFLOW = "workflow",
    PLAYBOOK = "playbook",
    NOTE = "note"
}
export declare enum SkillCategory {
    TECHNICAL = "technical",
    DOMAIN = "domain",
    PROCESS = "process",
    SOFT_SKILL = "soft_skill",
    MANAGEMENT = "management",
    COMMUNICATION = "communication",
    TOOL = "tool",
    FRAMEWORK = "framework",
    LANGUAGE = "language",
    PLATFORM = "platform",
    BUSINESS = "business",
    COMPLIANCE = "compliance",
    TRIBAL = "tribal"
}
export declare enum SkillRelationshipType {
    PREREQUISITE = "prerequisite",
    EXTENDS = "extends",
    RELATED = "related",
    DEPENDS_ON = "depends_on",
    PART_OF = "part_of",
    TAUGHT_BY = "taught_by",
    APPLIED_IN = "applied_in",
    CERTIFIES = "certifies",
    REPLACES = "replaces",
    EVOLVED_FROM = "evolved_from"
}
export interface SkillSource {
    id: string;
    type: ContentType;
    title: string;
    path: string;
    url?: string;
    createdAt: string;
    extractedAt: string;
    confidence: number;
}
export interface SkillEntry {
    id: string;
    name: string;
    category: SkillCategory;
    competencyLevel: CompetencyLevel;
    description: string;
    evidence: string[];
    sources: SkillSource[];
    relatedSkills: string[];
    tags: string[];
    confidence: number;
    lastPracticed: string;
    yearsOfExperience: number;
    projectsApplied: string[];
    verifiedBy: string[];
}
export interface SkillPerson {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    skills: string[];
    joinedAt: string;
    departingAt?: string;
    transferReadiness: TransferReadiness;
}
export interface SkillRelation {
    id: string;
    sourceSkillId: string;
    targetSkillId: string;
    type: SkillRelationshipType;
    strength: number;
    metadata?: Record<string, any>;
}
export interface SkillMd {
    id: string;
    title: string;
    summary: string;
    contentType: ContentType;
    skills: SkillEntry[];
    people: SkillPerson[];
    relationships: SkillRelation[];
    metadata: {
        version: string;
        generatedAt: string;
        updatedAt: string;
        sourceCount: number;
        skillCount: number;
        personCount: number;
        transferReadiness: TransferReadiness;
        coverageScore: number;
        riskScore: number;
    };
    frontmatter: Record<string, any>;
    raw: string;
}
export interface SkillBrainConfig {
    basePath: string;
    skillMdDir: string;
    skillIndexPath: string;
    skillManifestPath: string;
    skillLogPath: string;
    maxContextWindow: number;
    enableAutoExtract: boolean;
    enableTransferTracking: boolean;
}
export interface SkillManifest {
    version: string;
    lastUpdated: string;
    totalSkillMds: number;
    totalSkills: number;
    totalPeople: number;
    totalRelationships: number;
    atRiskSkills: number;
    transferReadyCount: number;
    averageCoverageScore: number;
    overallRiskScore: number;
}
export interface SkillExtractResult {
    success: boolean;
    skillMdId: string;
    skillsExtracted: number;
    peopleIdentified: number;
    relationshipsFound: number;
    confidence: number;
    errors: string[];
    duration: number;
}
export interface SkillQueryResult {
    skills: SkillEntry[];
    people: SkillPerson[];
    skillMds: SkillMd[];
    relevanceScores: number[];
    totalResults: number;
}
export interface TransferPlan {
    id: string;
    personId: string;
    personName: string;
    targetPersonId?: string;
    targetPersonName?: string;
    skills: Array<{
        skillId: string;
        skillName: string;
        category: SkillCategory;
        competencyLevel: CompetencyLevel;
        transferReadiness: TransferReadiness;
        estimatedHandoffHours: number;
        documentationStatus: 'none' | 'partial' | 'complete';
    }>;
    status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    notes: string;
}
export interface SkillBrainStats {
    totalSkillMds: number;
    totalSkills: number;
    totalPeople: number;
    totalRelationships: number;
    atRiskSkills: number;
    transferReadyCount: number;
    averageCoverageScore: number;
    overallRiskScore: number;
    skillsByCategory: Record<SkillCategory, number>;
    skillsByCompetency: Record<CompetencyLevel, number>;
    skillsByContentType: Record<ContentType, number>;
    peopleByDepartment: Record<string, number>;
    topAtRiskSkills: SkillEntry[];
}
//# sourceMappingURL=types.d.ts.map