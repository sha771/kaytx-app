import { AIServiceLogger } from '../lib/ai-service-logger';
import { logAudit } from '../lib/audit';
import { randomUUID } from 'crypto';
import { DatabaseUtils } from '../utils/database-utils';
import { schema } from '../db/connection';
import { getAgentById, getAgentHierarchy } from '../../constants/aiAgentHierarchy';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('AgentConsulting');

// ============================================
// AGENT CONSULTATION TYPES & INTERFACES
// ============================================

export type ConsultationType = 
  | 'advisory'        // Ask for advice/opinion
  | 'collaborative'   // Work together on a task
  | 'directive'       // Request action/execution
  | 'analytical'      // Request analysis/evaluation
  | 'escalation'      // Escalate to higher authority
  | 'delegation'      // Delegate to specialist
  | 'mentorship'      // Mentor-mentee counseling
  | 'coordination'    // Cross-agent coordination
  | 'peer_review'     // Peer feedback and review
  | 'performance_counseling'; // Performance improvement counseling

export type ConsultationStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'escalated'
  | 'rejected'
  | 'timeout';

export type ConsultationPriority = 'low' | 'medium' | 'high' | 'critical' | 'emergency';

export interface ConsultationRequest {
  id: string;
  correlationId: string;
  timestamp: Date;
  type: ConsultationType;
  priority: ConsultationPriority;
  
  // Source Agent
  sourceAgentId: string;
  sourceAgentName: string;
  sourceCategory: string;
  sourceAgentType: 'subagent' | 'main_agent';
  
  // Target Agent
  targetAgentId: string;
  targetAgentName: string;
  targetCategory: string;
  targetAgentType: 'subagent' | 'main_agent';
  
  // Consultation Details
  topic: string;
  context: Record<string, any>;
  question: string;
  expectedDeliverable?: string;
  deadline?: Date;
  
  // Enhanced Counseling Context
  counselingContext?: {
    relationship: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
    sessionType: 'one_time' | 'ongoing' | 'crisis' | 'development';
    confidentiality: 'public' | 'team' | 'private' | 'confidential';
    mentoringGoals?: string[];
    performanceContext?: {
      issue: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      impact: 'individual' | 'team' | 'organization';
      previousAttempts?: number;
    };
  };
  
  // Metadata
  tags: string[];
  relatedConsultationIds: string[];
  metadata: Record<string, any>;
}

export interface ConsultationResponse {
  id: string;
  consultationId: string;
  correlationId: string;
  timestamp: Date;
  
  // Responding Agent
  respondingAgentId: string;
  respondingAgentName: string;
  
  // Response Content
  status: ConsultationStatus;
  answer: string;
  recommendations: string[];
  actionItems?: ActionItem[];
  deliverables?: Deliverable[];
  
  // Analysis
  confidence: number; // 0-1
  reasoning: string;
  caveats: string[];
  
  // Follow-up
  requiresFollowUp: boolean;
  followUpQuestions?: string[];
  suggestedNextSteps: string[];
  
  // Enhanced Counseling Response
  counselingGuidance?: {
    mentoringAdvice?: string;
    performanceImprovement?: {
      specificActions: string[];
      timeline: string;
      metrics: string[];
      resources: string[];
    };
    skillDevelopment?: {
      skills: string[];
      trainingResources: string[];
      practiceExercises: string[];
    };
    coordinationPlan?: {
      involvedAgents: string[];
      responsibilities: Record<string, string[]>;
      timeline: string;
      communicationFrequency: string;
    };
  };
  
  // A2A Escalation
  escalateTo?: string[]; // Agent IDs to escalate to
  delegateTo?: string[];   // Agent IDs to delegate to
}

export interface ActionItem {
  id: string;
  description: string;
  assignedTo: string;
  dueDate?: Date;
  priority: ConsultationPriority;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Deliverable {
  id: string;
  type: 'report' | 'analysis' | 'recommendation' | 'code' | 'content' | 'data' | 'strategy';
  title: string;
  content: string;
  format: 'json' | 'markdown' | 'text' | 'html' | 'structured';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  metadata: Record<string, any>;
}

export interface ConsultationSession {
  id: string;
  correlationId: string;
  status: ConsultationStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  
  // Participants
  initiator: {
    agentId: string;
    agentName: string;
    category: string;
  };
  
  participants: {
    agentId: string;
    agentName: string;
    category: string;
    role: 'consultant' | 'advisor' | 'observer' | 'escalation_target';
    joinedAt: Date;
  }[];
  
  // Messages
  requests: ConsultationRequest[];
  responses: ConsultationResponse[];
  
  // Outcome
  outcome?: {
    summary: string;
    resolution: string;
    metrics: {
      duration: number; // seconds
      messageCount: number;
      satisfactionScore: number;
    };
  };
}

export interface AgentConsultingCapability {
  canConsult: boolean;
  canBeConsulted: boolean;
  expertiseAreas: string[];
  consultingStyle: 'advisory' | 'collaborative' | 'directive' | 'analytical';
  preferredConsultationTypes: string[];
  // Enhanced A2A Counseling
  counselingRole: 'mentor' | 'mentee' | 'peer' | 'specialist' | 'coordinator';
  canMentor: boolean;
  canBeMentored: boolean;
  counselingLoad: {
    current: number;
    maximum: number;
    availability: 'available' | 'busy' | 'overloaded';
  };
}

export interface AgentA2ACapability {
  canInitiateConsultation: boolean;
  canRespondToConsultation: boolean;
  canEscalate: boolean;
  canDelegate: boolean;
  maxConcurrentConsultations: number;
  averageResponseTime: number; // seconds
  // Enhanced Counseling Capabilities
  counselingModes: ('peer' | 'hierarchical' | 'cross-functional')[];
  mentoringCapabilities: {
    canMentorSubagents: boolean;
    canMentorPeers: boolean;
    canBeMentoredByMain: boolean;
    canBeMentoredByPeers: boolean;
  };
  coordinationLevel: 'none' | 'team' | 'department' | 'organization';
}

export interface AgentConsultingProfile {
  agentId: string;
  agentName: string;
  agentType: 'subagent' | 'main_agent';
  category: string;
  
  // Consulting Capabilities
  canConsult: boolean;
  canBeConsulted: boolean;
  
  // Expertise
  expertiseAreas: string[];
  consultingDomains: string[];
  
  // Communication Preferences
  preferredConsultationTypes: ConsultationType[];
  consultingStyle: 'advisory' | 'collaborative' | 'directive' | 'analytical';
  
  // Enhanced A2A Counseling
  counselingCapability: AgentConsultingCapability;
  a2aCapability: AgentA2ACapability;
  
  // Network
  parentAgentId?: string;
  subAgentIds: string[];
  preferredConsultants: string[]; // Agent IDs
  escalationTargets: string[];   // Agent IDs
  
  // Performance Metrics
  stats: {
    totalConsultationsGiven: number;
    totalConsultationsReceived: number;
    averageResponseTime: number; // seconds
    satisfactionScore: number; // 0-1
    expertiseScore: number; // 0-1
  };
}

export interface ConsultingNetwork {
  agentProfiles: Map<string, AgentConsultingProfile>;
  activeSessions: Map<string, ConsultationSession>;
  consultationHistory: ConsultationSession[];
}

// ============================================
// AGENT-TO-AGENT CONSULTING SERVICE
// ============================================

class AgentConsultingService {
  private network: ConsultingNetwork = {
    agentProfiles: new Map(),
    activeSessions: new Map(),
    consultationHistory: []
  };
  
  private maxSessionDuration = 30 * 60 * 1000; // 30 minutes
  private maxResponseTime = 5 * 60 * 1000; // 5 minutes
  private cleanupInterval: NodeJS.Timeout | null = null;
  
  // Real-time event subscribers
  private eventSubscribers: Map<string, Set<(event: any) => void>> = new Map();

  constructor() {
    this.startCleanupTimer();
    void this.loadPersistedSessions();
  }

  // ============================================
  // REAL-TIME EVENT SUBSCRIPTION
  // ============================================
  
  subscribeToEvents(agentId: string, callback: (event: any) => void): () => void {
    if (!this.eventSubscribers.has(agentId)) {
      this.eventSubscribers.set(agentId, new Set());
    }
    
    const subscribers = this.eventSubscribers.get(agentId)!;
    subscribers.add(callback);
    
    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this.eventSubscribers.delete(agentId);
      }
    };
  }
  
  private emitEvent(agentIds: string[], event: any): void {
    for (const agentId of agentIds) {
      const subscribers = this.eventSubscribers.get(agentId);
      if (subscribers) {
        for (const callback of subscribers) {
          try {
            callback(event);
          } catch (err) {
            logger.error('[AgentConsultingService] Event callback error', err as Error);
          }
        }
      }
    }
  }
  
  private notifySessionUpdate(session: ConsultationSession, type: 'update' | 'new' | 'complete'): void {
    const involvedAgents = [
      session.initiator.agentId,
      ...session.participants.map(p => p.agentId)
    ];
    
    this.emitEvent(involvedAgents, {
      type: type === 'new' ? 'new_session' : type === 'complete' ? 'session_complete' : 'session_update',
      sessionId: session.id,
      session: this.serializeSession(session),
      timestamp: new Date().toISOString()
    });
  }

  private serializeSession(session: ConsultationSession): any {
    return JSON.parse(
      JSON.stringify(session, (_k, v) => {
        if (v instanceof Date) return v.toISOString();
        return v;
      })
    );
  }

  private deserializeSession(data: any): ConsultationSession {
    const revive = (v: any): any => {
      if (!v) return v;
      if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/.test(v)) {
        const d = new Date(v);
        if (!Number.isNaN(d.getTime())) return d;
      }
      if (Array.isArray(v)) return v.map(revive);
      if (typeof v === 'object') {
        for (const key of Object.keys(v)) {
          v[key] = revive(v[key]);
        }
      }
      return v;
    };

    return revive(data) as ConsultationSession;
  }

  private async persistSession(session: ConsultationSession): Promise<void> {
    try {
      const db = DatabaseUtils.getDatabase() as any;
      const table = (schema as any).agentConsultingSessions;
      if (!db?.insert || !table) return;

      const row = {
        id: session.id,
        correlationId: session.correlationId,
        status: session.status,
        initiatorId: session.initiator.agentId,
        participants: session.participants.map(p => ({
          agentId: p.agentId,
          agentName: p.agentName,
          category: p.category,
          role: p.role,
          joinedAt: p.joinedAt instanceof Date ? p.joinedAt.toISOString() : p.joinedAt,
        })),
        session: this.serializeSession(session),
        updatedAt: new Date(),
      };

      await db
        .insert(table)
        .values(row)
        .onConflictDoUpdate({
          target: table.id,
          set: {
            correlationId: row.correlationId,
            status: row.status,
            initiatorId: row.initiatorId,
            participants: row.participants,
            session: row.session,
            updatedAt: row.updatedAt,
          },
        });
    } catch {
      return;
    }
  }

  private async loadPersistedSessions(): Promise<void> {
    try {
      const db = DatabaseUtils.getDatabase() as any;
      const table = (schema as any).agentConsultingSessions;
      if (!db?.select || !table) return;

      const rows = await db
        .select()
        .from(table)
        .limit(200);

      if (!Array.isArray(rows)) return;

      for (const row of rows) {
        const session = this.deserializeSession((row as any).session);
        if (!session?.id) continue;

        if ((row as any).status === 'completed') {
          if (!this.network.consultationHistory.some(s => s.id === session.id)) {
            this.network.consultationHistory.push(session);
          }
          continue;
        }

        this.network.activeSessions.set(session.id, session);
      }
    } catch {
      return;
    }
  }

  private ensureAgentProfile(agentId: string): AgentConsultingProfile {
    const existing = this.network.agentProfiles.get(agentId);
    if (existing) return existing;

    const agentDef = getAgentById(agentId);
    const inferredType: AgentConsultingProfile['agentType'] = agentDef?.type ?? (agentId.includes('-main')
      ? 'main_agent'
      : 'subagent');

    const category = agentDef?.category ?? (agentId.includes('-main')
      ? agentId.split('-main')[0]
      : 'general');

    const hierarchyInfo = getAgentHierarchy(agentId);
    const parentAgentId = agentDef?.hierarchy?.parentId || undefined;
    const subAgentIds = inferredType === 'main_agent'
      ? hierarchyInfo.subAgents.map(a => a.id)
      : [];

    const canConsult = agentDef?.consulting?.canConsult ?? true;
    const canBeConsulted = agentDef?.consulting?.canBeConsulted ?? true;

    const profile: AgentConsultingProfile = {
      agentId,
      agentName: agentDef?.name ?? agentId,
      agentType: inferredType,
      category,
      canConsult,
      canBeConsulted,
      expertiseAreas: agentDef?.consulting?.expertiseAreas ?? [],
      consultingDomains: agentDef?.consulting?.expertiseAreas ?? [],
      preferredConsultationTypes: (agentDef?.consulting?.preferredConsultationTypes as ConsultationType[] | undefined) ?? ['advisory', 'collaborative', 'analytical', 'directive'],
      consultingStyle: agentDef?.consulting?.consultingStyle ?? 'advisory',
      counselingCapability: {
        canConsult,
        canBeConsulted,
        expertiseAreas: agentDef?.consulting?.expertiseAreas ?? [],
        consultingStyle: agentDef?.consulting?.consultingStyle ?? 'advisory',
        preferredConsultationTypes: (agentDef?.consulting?.preferredConsultationTypes as string[] | undefined) ?? ['advisory'],
        counselingRole: agentDef?.consulting?.counselingRole ?? (inferredType === 'main_agent' ? 'mentor' : 'peer'),
        canMentor: agentDef?.consulting?.canMentor ?? (inferredType === 'main_agent'),
        canBeMentored: agentDef?.consulting?.canBeMentored ?? (inferredType !== 'main_agent'),
        counselingLoad: {
          current: 0,
          maximum: agentDef?.consulting?.counselingLoad?.maximum ?? (inferredType === 'main_agent' ? 100 : 50),
          availability: 'available',
        },
      },
      a2aCapability: {
        canInitiateConsultation: agentDef?.a2aCapabilities?.canInitiateConsultation ?? true,
        canRespondToConsultation: agentDef?.a2aCapabilities?.canRespondToConsultation ?? true,
        canEscalate: agentDef?.a2aCapabilities?.canEscalate ?? true,
        canDelegate: agentDef?.a2aCapabilities?.canDelegate ?? true,
        maxConcurrentConsultations: agentDef?.a2aCapabilities?.maxConcurrentConsultations ?? (inferredType === 'main_agent' ? 100 : 50),
        averageResponseTime: agentDef?.a2aCapabilities?.averageResponseTime ?? 60,
        counselingModes: agentDef?.a2aCapabilities?.counselingModes ?? ['peer', 'hierarchical', 'cross-functional'],
        mentoringCapabilities: agentDef?.a2aCapabilities?.mentoringCapabilities ?? {
          canMentorSubagents: inferredType === 'main_agent',
          canMentorPeers: inferredType === 'main_agent',
          canBeMentoredByMain: inferredType !== 'main_agent',
          canBeMentoredByPeers: true,
        },
        coordinationLevel: agentDef?.a2aCapabilities?.coordinationLevel ?? 'team',
      },
      parentAgentId,
      subAgentIds,
      preferredConsultants: [],
      escalationTargets: [],
      stats: {
        totalConsultationsGiven: 0,
        totalConsultationsReceived: 0,
        averageResponseTime: 0,
        satisfactionScore: 0.8,
        expertiseScore: 0.5,
      },
    };

    this.network.agentProfiles.set(agentId, profile);
    return profile;
  }

  // ============================================
  // MAIN-SUBAGENT SPECIALIZED COUNSELING
  // ============================================
  
  async initiateMainToSubagentCounseling(
    mainAgentId: string,
    subagentId: string,
    counselingType: 'performance' | 'development' | 'coordination' | 'crisis',
    topic: string,
    details: {
      issue?: string;
      goals?: string[];
      expectations?: string[];
      timeline?: string;
      resources?: string[];
    },
    options: {
      priority?: ConsultationPriority;
      confidentiality?: 'public' | 'team' | 'private' | 'confidential';
      sessionType?: 'one_time' | 'ongoing' | 'crisis' | 'development';
      deadline?: Date;
    } = {}
  ): Promise<ConsultationSession> {
    const mainProfile = this.ensureAgentProfile(mainAgentId);
    const subProfile = this.ensureAgentProfile(subagentId);
    
    if (!mainProfile || mainProfile.agentType !== 'main_agent') {
      throw new Error(`Main agent ${mainAgentId} not found or not a main agent`);
    }
    if (!subProfile || subProfile.agentType !== 'subagent') {
      throw new Error(`Subagent ${subagentId} not found or not a subagent`);
    }
    
    if (!mainProfile.counselingCapability.canMentor) {
      throw new Error(`Main agent ${mainAgentId} is not configured for mentoring`);
    }
    if (!subProfile.counselingCapability.canBeMentored) {
      throw new Error(`Subagent ${subagentId} is not available for mentoring`);
    }

    if (subProfile.parentAgentId && subProfile.parentAgentId !== mainAgentId) {
      throw new Error(`Subagent ${subagentId} does not report to main agent ${mainAgentId}`);
    }

    const counselingContext = {
      relationship: 'main_to_sub' as const,
      sessionType: options.sessionType || 'one_time',
      confidentiality: options.confidentiality || 'team',
      mentoringGoals: details.goals,
      performanceContext: counselingType === 'performance' ? {
        issue: details.issue || 'Performance review',
        severity: 'medium' as const,
        impact: 'individual' as const,
        previousAttempts: 0
      } : undefined
    };

    return this.initiateConsultation(
      mainAgentId,
      subagentId,
      topic,
      this.generateMainToSubagentQuestion(counselingType, details),
      {
        type: counselingType === 'performance' ? 'performance_counseling' : 
               counselingType === 'development' ? 'mentorship' : 
               counselingType === 'coordination' ? 'coordination' : 'advisory',
        priority: options.priority || 'medium',
        context: { ...details, counselingType },
        expectedDeliverable: this.generateExpectedDeliverable(counselingType),
        deadline: options.deadline,
        tags: ['main-to-sub', counselingType, topic.toLowerCase()],
        counselingContext
      }
    );
  }

  async initiateSubagentToMainCounseling(
    subagentId: string,
    mainAgentId: string,
    requestType: 'guidance' | 'support' | 'escalation' | 'resource_request',
    topic: string,
    details: {
      challenge?: string;
      whatAttempted?: string[];
      specificNeeds?: string[];
      urgency?: 'low' | 'medium' | 'high' | 'critical';
    },
    options: {
      priority?: ConsultationPriority;
      confidentiality?: 'public' | 'team' | 'private' | 'confidential';
      deadline?: Date;
    } = {}
  ): Promise<ConsultationSession> {
    const subProfile = this.ensureAgentProfile(subagentId);
    const mainProfile = this.ensureAgentProfile(mainAgentId);
    
    if (!subProfile || subProfile.agentType !== 'subagent') {
      throw new Error(`Subagent ${subagentId} not found or not a subagent`);
    }
    if (!mainProfile || mainProfile.agentType !== 'main_agent') {
      throw new Error(`Main agent ${mainAgentId} not found or not a main agent`);
    }

    const counselingContext = {
      relationship: 'sub_to_main' as const,
      sessionType: (requestType === 'escalation' ? 'crisis' : 'one_time') as const,
      confidentiality: options.confidentiality || 'team',
      performanceContext: requestType === 'escalation' ? {
        issue: details.challenge || 'Escalation needed',
        severity: (details.urgency || 'medium') as const,
        impact: 'team' as const,
        previousAttempts: details.whatAttempted?.length || 0
      } : undefined
    };

    return this.initiateConsultation(
      subagentId,
      mainAgentId,
      topic,
      this.generateSubToMainQuestion(requestType, details),
      {
        type: requestType === 'escalation' ? 'escalation' : 
               requestType === 'guidance' ? 'mentorship' : 
               requestType === 'support' ? 'advisory' : 'collaborative',
        priority: options.priority || (details.urgency === 'critical' ? 'high' : 'medium'),
        context: { ...details, requestType },
        expectedDeliverable: this.generateSubToMainDeliverable(requestType),
        deadline: options.deadline,
        tags: ['sub-to-main', requestType, topic.toLowerCase()],
        counselingContext
      }
    );
  }

  async initiatePeerToPeerCounseling(
    agentId1: string,
    agentId2: string,
    counselingType: 'collaboration' | 'peer_review' | 'knowledge_sharing' | 'problem_solving',
    topic: string,
    details: {
      sharedChallenge?: string;
      collaborationGoal?: string;
      knowledgeArea?: string;
      specificProblem?: string;
    },
    options: {
      priority?: ConsultationPriority;
      confidentiality?: 'public' | 'team' | 'private' | 'confidential';
      deadline?: Date;
    } = {}
  ): Promise<ConsultationSession> {
    const profile1 = this.ensureAgentProfile(agentId1);
    const profile2 = this.ensureAgentProfile(agentId2);
    
    if (!profile1 || !profile2) {
      throw new Error('One or both agents not found');
    }

    const counselingContext = {
      relationship: 'peer_to_peer' as const,
      sessionType: 'one_time' as const,
      confidentiality: options.confidentiality || 'team'
    };

    return this.initiateConsultation(
      agentId1,
      agentId2,
      topic,
      this.generatePeerToPeerQuestion(counselingType, details),
      {
        type: counselingType === 'peer_review' ? 'peer_review' : 
               counselingType === 'collaboration' ? 'collaborative' : 
               counselingType === 'knowledge_sharing' ? 'advisory' : 'analytical',
        priority: options.priority || 'medium',
        context: { ...details, counselingType },
        expectedDeliverable: this.generatePeerToPeerDeliverable(counselingType),
        deadline: options.deadline,
        tags: ['peer-to-peer', counselingType, topic.toLowerCase()],
        counselingContext
      }
    );
  }

  // ============================================
  // SPECIALIZED RESPONSE GENERATION
  // ============================================

  async respondToMainToSubagentCounseling(
    sessionId: string,
    mainAgentId: string,
    response: {
      guidance: string;
      expectations: string[];
      developmentPlan?: {
        skills: string[];
        timeline: string;
        resources: string[];
        milestones: string[];
      };
      performanceMetrics?: string[];
      supportOffered: string[];
      nextSteps: string[];
      confidence: number;
    }
  ): Promise<ConsultationSession> {
    const counselingGuidance = {
      mentoringAdvice: response.guidance,
      performanceImprovement: response.developmentPlan ? {
        specificActions: response.developmentPlan.skills,
        timeline: response.developmentPlan.timeline,
        metrics: response.performanceMetrics || [],
        resources: response.developmentPlan.resources
      } : undefined,
      skillDevelopment: response.developmentPlan ? {
        skills: response.developmentPlan.skills,
        trainingResources: response.developmentPlan.resources,
        practiceExercises: response.developmentPlan.milestones
      } : undefined
    };

    // Create the response object that matches the expected parameter type
    const responsePayload = {
      status: 'completed' as const,
      answer: response.guidance,
      recommendations: response.expectations,
      actionItems: response.nextSteps.map((step, index) => ({
        id: `action_${index}`,
        description: step,
        assignedTo: sessionId, // Assign to the subagent
        priority: 'medium' as const,
        status: 'pending' as const
      })),
      confidence: response.confidence,
      reasoning: 'Main agent providing structured guidance and development plan',
      caveats: [],
      requiresFollowUp: true,
      followUpQuestions: ['Do you need clarification on any expectations?', 'What resources do you need to start?'],
      suggestedNextSteps: response.nextSteps,
      counselingGuidance
    };

    return this.respondToConsultation(sessionId, mainAgentId, responsePayload);
  }

  async respondToSubagentToMainCounseling(
    sessionId: string,
    subagentId: string,
    response: {
      solution?: string;
      supportNeeded: string[];
      recommendations: string[];
      timeline?: string;
      confidence: number;
    }
  ): Promise<ConsultationSession> {
    const counselingGuidance = {
      coordinationPlan: response.solution ? {
        involvedAgents: [subagentId],
        responsibilities: {
          [subagentId]: response.supportNeeded
        },
        timeline: response.timeline || 'To be determined',
        communicationFrequency: 'Daily check-ins'
      } : undefined
    };

    // Create the response object that matches the expected parameter type
    const responsePayload = {
      status: 'completed' as const,
      answer: response.solution || 'Support request acknowledged',
      recommendations: response.recommendations,
      actionItems: response.supportNeeded.map((need, index) => ({
        id: `support_${index}`,
        description: need,
        assignedTo: 'main_agent', // Main agent to provide support
        priority: 'medium' as const,
        status: 'pending' as const
      })),
      confidence: response.confidence,
      reasoning: 'Subagent requesting support and providing recommendations',
      caveats: [],
      requiresFollowUp: true,
      followUpQuestions: ['What specific support do you need first?', 'Are there any blockers I can help remove?'],
      suggestedNextSteps: response.supportNeeded,
      counselingGuidance
    };

    return this.respondToConsultation(sessionId, subagentId, responsePayload);
  }

  // ============================================
  // HELPER METHODS FOR COUNSELING GENERATION
  // ============================================

  private generateMainToSubagentQuestion(
    counselingType: 'performance' | 'development' | 'coordination' | 'crisis',
    details: {
      issue?: string;
      goals?: string[];
      expectations?: string[];
      timeline?: string;
      resources?: string[];
    }
  ): string {
    switch (counselingType) {
      case 'performance':
        return `I'd like to discuss your performance and provide guidance for improvement. ${details.issue ? `Specific concern: ${details.issue}` : ''} ${details.expectations ? `Expectations: ${details.expectations.join(', ')}` : ''}`;
      case 'development':
        return `I want to support your professional development. ${details.goals ? `Goals: ${details.goals.join(', ')}` : ''} ${details.timeline ? `Timeline: ${details.timeline}` : ''}`;
      case 'coordination':
        return `We need to coordinate our efforts. ${details.expectations ? `Coordination expectations: ${details.expectations.join(', ')}` : ''}`;
      case 'crisis':
        return `We're facing a critical situation that requires immediate attention and coordinated response. ${details.issue ? `Issue: ${details.issue}` : ''}`;
      default:
        return 'I would like to discuss your work and provide guidance.';
    }
  }

  private generateSubToMainQuestion(
    requestType: 'guidance' | 'support' | 'escalation' | 'resource_request',
    details: {
      challenge?: string;
      whatAttempted?: string[];
      specificNeeds?: string[];
      urgency?: 'low' | 'medium' | 'high' | 'critical';
    }
  ): string {
    switch (requestType) {
      case 'guidance':
        return `I need your guidance on ${details.challenge || 'a matter'}. ${details.whatAttempted ? `I've tried: ${details.whatAttempted.join(', ')}` : ''} ${details.specificNeeds ? `Specific needs: ${details.specificNeeds.join(', ')}` : ''}`;
      case 'support':
        return `I need support with ${details.challenge || 'my current tasks'}. ${details.specificNeeds ? `Specific support needed: ${details.specificNeeds.join(', ')}` : ''}`;
      case 'escalation':
        return `I need to escalate ${details.challenge || 'an issue'} that requires your attention. ${details.whatAttempted ? `Previous attempts: ${details.whatAttempted.join(', ')}` : ''}`;
      case 'resource_request':
        return `I need additional resources to handle ${details.challenge || 'my responsibilities'}. ${details.specificNeeds ? `Resources needed: ${details.specificNeeds.join(', ')}` : ''}`;
      default:
        return 'I would like to request your assistance.';
    }
  }

  private generatePeerToPeerQuestion(
    counselingType: 'collaboration' | 'peer_review' | 'knowledge_sharing' | 'problem_solving',
    details: {
      sharedChallenge?: string;
      collaborationGoal?: string;
      knowledgeArea?: string;
      specificProblem?: string;
    }
  ): string {
    switch (counselingType) {
      case 'collaboration':
        return `I'd like to collaborate on ${details.collaborationGoal || 'a project'}. ${details.sharedChallenge ? `Shared challenge: ${details.sharedChallenge}` : ''}`;
      case 'peer_review':
        return `I'd appreciate your peer review on ${details.knowledgeArea || 'my work'}. ${details.specificProblem ? `Focus area: ${details.specificProblem}` : ''}`;
      case 'knowledge_sharing':
        return `I'd like to share knowledge about ${details.knowledgeArea || 'a topic'}. ${details.collaborationGoal ? `Goal: ${details.collaborationGoal}` : ''}`;
      case 'problem_solving':
        return `I'd like to work together to solve ${details.specificProblem || 'a problem'}. ${details.sharedChallenge ? `Challenge: ${details.sharedChallenge}` : ''}`;
      default:
        return 'I would like to work together on this matter.';
    }
  }

  private generateExpectedDeliverable(
    counselingType: 'performance' | 'development' | 'coordination' | 'crisis'
  ): string {
    switch (counselingType) {
      case 'performance':
        return 'Performance improvement plan with specific metrics and timeline';
      case 'development':
        return 'Development plan with skill-building activities and milestones';
      case 'coordination':
        return 'Coordination agreement with clear responsibilities and communication plan';
      case 'crisis':
        return 'Crisis response plan with immediate actions and escalation protocols';
      default:
        return 'Guidance and action plan';
    }
  }

  private generateSubToMainDeliverable(
    requestType: 'guidance' | 'support' | 'escalation' | 'resource_request'
  ): string {
    switch (requestType) {
      case 'guidance':
        return 'Expert guidance and recommendations for moving forward';
      case 'support':
        return 'Support plan with allocated resources and timeline';
      case 'escalation':
        return 'Resolution plan with immediate actions and long-term solutions';
      case 'resource_request':
        return 'Resource allocation plan with justification and expected outcomes';
      default:
        return 'Response and action plan';
    }
  }

  private generatePeerToPeerDeliverable(
    counselingType: 'collaboration' | 'peer_review' | 'knowledge_sharing' | 'problem_solving'
  ): string {
    switch (counselingType) {
      case 'collaboration':
        return 'Collaboration agreement with shared responsibilities and timeline';
      case 'peer_review':
        return 'Constructive feedback with specific recommendations for improvement';
      case 'knowledge_sharing':
        return 'Knowledge transfer with documentation and best practices';
      case 'problem_solving':
        return 'Joint solution with implementation plan and success criteria';
      default:
        return 'Mutual agreement and action plan';
    }
  }

  // ============================================
  // ENHANCED MAIN-SUBAGENT COUNSELING SYSTEM
  // ============================================
  
  async initiateComprehensiveCounseling(
    sourceAgentId: string,
    targetAgentId: string,
    counselingMode: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional',
    counselingProgram: {
      programType: 'performance_improvement' | 'skill_development' | 'crisis_intervention' | 'career_guidance' | 'coordination_alignment' | 'conflict_resolution';
      severity: 'low' | 'medium' | 'high' | 'critical';
      duration: 'single_session' | 'short_term' | 'ongoing' | 'emergency';
      confidentiality: 'public' | 'team' | 'private' | 'confidential';
    },
    agenda: {
      primaryObjectives: string[];
      specificIssues: string[];
      expectedOutcomes: string[];
      successMetrics: string[];
    },
    contextData: {
      performanceData?: any;
      incidentHistory?: any[];
      skillAssessments?: any;
      teamDynamics?: any;
      businessContext?: any;
    },
    options: {
      priority?: ConsultationPriority;
      deadline?: Date;
      followUpSchedule?: string;
      stakeholders?: string[];
      escalationProtocol?: string;
    } = {}
  ): Promise<ConsultationSession> {
    const sourceProfile = this.ensureAgentProfile(sourceAgentId);
    const targetProfile = this.ensureAgentProfile(targetAgentId);
    
    // Validate counseling relationship
    this.validateCounselingRelationship(sourceProfile, targetProfile, counselingMode);
    
    // Create comprehensive counseling context
    const counselingContext: {
      relationship: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
      sessionType: 'development' | 'one_time' | 'ongoing' | 'crisis';
      confidentiality: 'public' | 'team' | 'private' | 'confidential';
      mentoringGoals?: string[];
      performanceContext?: {
        issue: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        impact: 'individual' | 'team' | 'organization';
        previousAttempts?: number;
      };
    } = {
      relationship: counselingMode,
      sessionType: counselingProgram.duration === 'emergency' ? 'crisis' : 
                   counselingProgram.duration === 'single_session' ? 'one_time' : 
                   counselingProgram.duration === 'short_term' ? 'ongoing' : 'ongoing',
      confidentiality: counselingProgram.confidentiality,
      performanceContext: counselingProgram.programType === 'performance_improvement' ? {
        issue: agenda.specificIssues.join(', '),
        severity: counselingProgram.severity,
        impact: 'team',
        previousAttempts: 0
      } : undefined
    };

    // Generate comprehensive counseling question
    const question = this.generateComprehensiveCounselingQuestion(
      counselingMode,
      counselingProgram,
      agenda,
      contextData
    );

    return this.initiateConsultation(
      sourceAgentId,
      targetAgentId,
      `${counselingProgram.programType.replace(/_/g, ' ').toUpperCase()} - ${agenda.primaryObjectives[0]}`,
      question,
      {
        type: this.mapProgramTypeToConsultationType(counselingProgram.programType),
        priority: options.priority || this.mapSeverityToPriority(counselingProgram.severity),
        context: {
          counselingProgram,
          agenda,
          contextData,
          counselingMode
        },
        expectedDeliverable: this.generateComprehensiveDeliverable(counselingProgram, agenda),
        deadline: options.deadline,
        tags: [
          counselingMode,
          counselingProgram.programType,
          counselingProgram.severity,
          ...agenda.primaryObjectives.map(obj => obj.toLowerCase().replace(/\s+/g, '-'))
        ],
        counselingContext
      }
    );
  }

  async initiateStructuredMentoringProgram(
    mentorAgentId: string,
    menteeAgentId: string,
    mentoringProgram: {
      programName: string;
      focusAreas: string[];
      skillGaps: string[];
      developmentGoals: string[];
      timeline: string;
      milestones: {
        name: string;
        deadline: Date;
        criteria: string[];
        resources: string[];
      }[];
      assessmentMethods: string[];
      successMetrics: string[];
    },
    programOptions: {
      sessionFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
      sessionDuration: number; // minutes
      progressReviews: boolean;
      peerInvolvement: boolean;
      confidentialityLevel: 'public' | 'team' | 'private' | 'confidential';
    }
  ): Promise<ConsultationSession[]> {
    const sessions: ConsultationSession[] = [];
    
    // Initial assessment session
    const initialSession = await this.initiateComprehensiveCounseling(
      mentorAgentId,
      menteeAgentId,
      'main_to_sub',
      {
        programType: 'skill_development',
        severity: 'medium',
        duration: 'ongoing',
        confidentiality: programOptions.confidentialityLevel
      },
      {
        primaryObjectives: [`Establish ${mentoringProgram.programName} mentoring program`],
        specificIssues: mentoringProgram.skillGaps,
        expectedOutcomes: mentoringProgram.developmentGoals,
        successMetrics: mentoringProgram.successMetrics
      },
      {
        skillAssessments: {
          currentSkills: [],
          targetSkills: mentoringProgram.focusAreas,
          assessmentMethods: mentoringProgram.assessmentMethods
        },
        mentoringProgram
      },
      {
        priority: 'high',
        followUpSchedule: programOptions.sessionFrequency
      }
    );
    
    sessions.push(initialSession);
    
    // Schedule milestone-based sessions
    for (const milestone of mentoringProgram.milestones) {
      const milestoneSession = await this.initiateComprehensiveCounseling(
        mentorAgentId,
        menteeAgentId,
        'main_to_sub',
        {
          programType: 'performance_improvement',
          severity: 'medium',
          duration: 'single_session',
          confidentiality: programOptions.confidentialityLevel
        },
        {
          primaryObjectives: [`Milestone Review: ${milestone.name}`],
          specificIssues: [`Assess progress towards ${milestone.name}`],
          expectedOutcomes: milestone.criteria,
          successMetrics: [`${milestone.name} completion`]
        },
        {
          mentoringProgram,
          currentMilestone: milestone
        },
        {
          priority: 'medium',
          deadline: milestone.deadline
        }
      );
      
      sessions.push(milestoneSession);
    }
    
    return sessions;
  }

  async initiateCrisisInterventionCounseling(
    crisisAgentId: string,
    interventionAgentId: string,
    crisisDetails: {
      crisisType: 'performance_failure' | 'critical_error' | 'security_breach' | 'service_outage' | 'communication_breakdown';
      severity: 'high' | 'critical';
      impact: {
        affectedSystems: string[];
        businessImpact: string;
        userImpact: string;
        timeline: string;
      };
      immediateActions: string[];
      containmentStatus: string;
      communicationPlan: string;
    },
    interventionStrategy: {
      interventionType: 'immediate_response' | 'investigation' | 'recovery_plan' | 'prevention_measures';
      requiredResources: string[];
      escalationTriggers: string[];
      successCriteria: string[];
      timeline: string;
    }
  ): Promise<ConsultationSession> {
    const counselingMode = crisisDetails.crisisType === 'performance_failure' ? 'main_to_sub' : 'sub_to_main';
    
    return this.initiateComprehensiveCounseling(
      crisisAgentId,
      interventionAgentId,
      counselingMode,
      {
        programType: 'crisis_intervention',
        severity: crisisDetails.severity,
        duration: 'emergency',
        confidentiality: crisisDetails.crisisType === 'security_breach' ? 'confidential' : 'team'
      },
      {
        primaryObjectives: [`CRISIS: ${crisisDetails.crisisType.replace(/_/g, ' ').toUpperCase()}`],
        specificIssues: [
          `Crisis Type: ${crisisDetails.crisisType}`,
          `Impact: ${crisisDetails.impact.businessImpact}`,
          `Status: ${crisisDetails.containmentStatus}`
        ],
        expectedOutcomes: interventionStrategy.successCriteria,
        successMetrics: ['Crisis resolved', 'Impact mitigated', 'Prevention measures implemented']
      },
      {
        crisisDetails,
        interventionStrategy,
        incidentHistory: [crisisDetails],
        businessContext: crisisDetails.impact
      },
      {
        priority: crisisDetails.severity === 'critical' ? 'emergency' : 'critical',
        escalationProtocol: 'Immediate escalation to senior agents',
        stakeholders: ['incident_response_team', 'business_stakeholders']
      }
    );
  }

  async initiatePerformanceImprovementPlan(
    evaluatingAgentId: string,
    performanceAgentId: string,
    performanceReview: {
      reviewPeriod: string;
      performanceIssues: {
        area: string;
        severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        impact: string;
        examples: string[];
      }[];
      strengths: string[];
      improvementAreas: string[];
      performanceMetrics: {
        current: { metric: string; value: number; target: number }[];
        historical: { period: string; score: number }[];
      };
      previousImprovements: {
        area: string;
        actions: string[];
        outcome: string;
        effectiveness: 'low' | 'medium' | 'high';
      }[];
    },
    improvementPlan: {
      goals: {
        area: string;
        description: string;
        target: string;
        timeline: string;
        metrics: string[];
      }[];
      actionItems: {
        action: string;
        owner: string;
        deadline: Date;
        resources: string[];
        dependencies: string[];
      }[];
      supportStructure: {
        mentorship: boolean;
        training: string[];
        tools: string[];
        reviewFrequency: string;
      };
      successCriteria: string[];
    }
  ): Promise<ConsultationSession> {
    const counselingMode = evaluatingAgentId.includes('-main') ? 'main_to_sub' : 'peer_to_peer';
    
    return this.initiateComprehensiveCounseling(
      evaluatingAgentId,
      performanceAgentId,
      counselingMode,
      {
        programType: 'performance_improvement',
        severity: this.determinePerformanceSeverity(performanceReview.performanceIssues),
        duration: 'ongoing',
        confidentiality: 'private'
      },
      {
        primaryObjectives: [`Performance Improvement Plan - ${performanceReview.reviewPeriod}`],
        specificIssues: performanceReview.performanceIssues.map(issue => `${issue.area}: ${issue.description}`),
        expectedOutcomes: improvementPlan.goals.map(goal => goal.description),
        successMetrics: improvementPlan.successCriteria
      },
      {
        performanceData: performanceReview,
        improvementPlan,
        skillAssessments: {
          strengths: performanceReview.strengths,
          improvementAreas: performanceReview.improvementAreas
        }
      },
      {
        priority: this.determinePerformanceSeverity(performanceReview.performanceIssues) === 'critical' ? 'high' : 'medium',
        followUpSchedule: improvementPlan.supportStructure.reviewFrequency
      }
    );
  }

  // ============================================
  // VALIDATION AND HELPER METHODS
  // ============================================
  
  private validateCounselingRelationship(
    source: AgentConsultingProfile,
    target: AgentConsultingProfile,
    mode: string
  ): void {
    switch (mode) {
      case 'main_to_sub':
        if (source.agentType !== 'main_agent') {
          throw new Error('Source agent must be a main agent for main-to-sub counseling');
        }
        if (target.agentType !== 'subagent') {
          throw new Error('Target agent must be a subagent for main-to-sub counseling');
        }
        if (!source.counselingCapability.canMentor) {
          throw new Error('Source main agent is not configured for mentoring');
        }
        if (!target.counselingCapability.canBeMentored) {
          throw new Error('Target subagent is not available for mentoring');
        }
        break;
        
      case 'sub_to_main':
        if (source.agentType !== 'subagent') {
          throw new Error('Source agent must be a subagent for sub-to-main counseling');
        }
        if (target.agentType !== 'main_agent') {
          throw new Error('Target agent must be a main agent for sub-to-main counseling');
        }
        break;
        
      case 'peer_to_peer':
        if (source.agentType === target.agentType && source.agentType === 'main_agent') {
          // Both main agents - cross-functional peer counseling
          if (!source.a2aCapability.coordinationLevel || source.a2aCapability.coordinationLevel === 'none') {
            throw new Error('Main agents need coordination capabilities for peer counseling');
          }
        }
        break;
        
      case 'cross_functional':
        // Cross-functional counseling between different categories
        if (source.category === target.category) {
          throw new Error('Cross-functional counseling requires agents from different categories');
        }
        break;
    }
  }

  private generateComprehensiveCounselingQuestion(
    mode: string,
    program: any,
    agenda: any,
    context: any
  ): string {
    const objectives = agenda.primaryObjectives.join('; ');
    const issues = agenda.specificIssues.slice(0, 3).join('; ');
    
    let baseQuestion = '';
    
    switch (mode) {
      case 'main_to_sub':
        baseQuestion = `As your main agent, I need to conduct a ${program.programType.replace(/_/g, ' ')} session with you. `;
        break;
      case 'sub_to_main':
        baseQuestion = `I require your guidance and support as my main agent for a ${program.programType.replace(/_/g, ' ')} session. `;
        break;
      case 'peer_to_peer':
        baseQuestion = `I'd like to engage in peer counseling for ${program.programType.replace(/_/g, ' ')}. `;
        break;
      case 'cross_functional':
        baseQuestion = `I'm requesting cross-functional counseling for ${program.programType.replace(/_/g, ' ')}. `;
        break;
    }
    
    return `${baseQuestion}Primary objectives: ${objectives}. Specific issues to address: ${issues}. Expected outcomes: ${agenda.expectedOutcomes.join('; ')}. ${context.businessContext ? `Business context: ${context.businessContext}` : ''}`;
  }

  private mapProgramTypeToConsultationType(programType: string): ConsultationType {
    const mapping: Record<string, ConsultationType> = {
      'performance_improvement': 'performance_counseling',
      'skill_development': 'mentorship',
      'crisis_intervention': 'escalation',
      'career_guidance': 'advisory',
      'coordination_alignment': 'coordination',
      'conflict_resolution': 'collaborative'
    };
    return mapping[programType] || 'advisory';
  }

  private mapSeverityToPriority(severity: string): ConsultationPriority {
    const mapping: Record<string, ConsultationPriority> = {
      'low': 'low',
      'medium': 'medium',
      'high': 'high',
      'critical': 'critical'
    };
    return mapping[severity] || 'medium';
  }

  private generateComprehensiveDeliverable(program: any, agenda: any): string {
    return `Comprehensive ${program.programType.replace(/_/g, ' ')} plan with: 1) Detailed assessment and analysis, 2) Specific action items and timelines, 3) Success metrics and KPIs, 4) Resource requirements, 5) Follow-up schedule, 6) Progress tracking methodology`;
  }

  private determinePerformanceSeverity(issues: any[]): 'low' | 'medium' | 'high' | 'critical' {
    if (!issues || issues.length === 0) return 'low';
    
    const hasCritical = issues.some(issue => issue.severity === 'critical');
    const hasHigh = issues.some(issue => issue.severity === 'high');
    const multipleIssues = issues.length > 3;
    
    if (hasCritical) return 'critical';
    if (hasHigh || multipleIssues) return 'high';
    return 'medium';
  }

  // ============================================
  // ADVANCED RESPONSE HANDLING
  // ============================================

  async provideComprehensiveCounselingResponse(
    sessionId: string,
    respondingAgentId: string,
    comprehensiveResponse: {
      assessment: {
        situationAnalysis: string;
        keyFindings: string[];
        rootCauses: string[];
        impactAssessment: string;
      };
      recommendations: {
        immediateActions: string[];
        shortTermGoals: string[];
        longTermStrategy: string;
        resources: string[];
        timeline: string;
      };
      developmentPlan?: {
        skillBuilding: {
          skill: string;
          currentLevel: string;
          targetLevel: string;
          activities: string[];
          resources: string[];
          timeline: string;
        }[];
        milestones: {
          milestone: string;
          deadline: Date;
          criteria: string[];
        }[];
        supportStructure: string[];
      };
      performancePlan?: {
        improvementAreas: string[];
        specificActions: string[];
        metrics: {
          metric: string;
          current: number;
          target: number;
          timeline: string;
        }[];
        reviewSchedule: string;
        accountability: string[];
      };
      crisisResponse?: {
        immediateSteps: string[];
        containmentActions: string[];
        communicationPlan: string;
        escalationProtocol: string;
        recoveryStrategy: string;
      };
      followUp: {
        nextSteps: string[];
        checkPoints: {
          date: Date;
          purpose: string;
          responsible: string;
        }[];
        successIndicators: string[];
        adjustmentStrategy: string;
      };
      confidence: number;
      reasoning: string;
      caveats: string[];
    }
  ): Promise<ConsultationSession> {
    // Build counseling guidance based on response type
    const counselingGuidance: ConsultationResponse['counselingGuidance'] = {};
    
    if (comprehensiveResponse.developmentPlan) {
      counselingGuidance.skillDevelopment = {
        skills: comprehensiveResponse.developmentPlan.skillBuilding.map(s => s.skill),
        trainingResources: comprehensiveResponse.developmentPlan.skillBuilding.flatMap(s => s.resources),
        practiceExercises: comprehensiveResponse.developmentPlan.skillBuilding.flatMap(s => s.activities)
      };
      counselingGuidance.mentoringAdvice = comprehensiveResponse.assessment.situationAnalysis;
    }
    
    if (comprehensiveResponse.performancePlan) {
      counselingGuidance.performanceImprovement = {
        specificActions: comprehensiveResponse.performancePlan.specificActions,
        timeline: comprehensiveResponse.performancePlan.reviewSchedule,
        metrics: comprehensiveResponse.performancePlan.metrics.map(m => m.metric),
        resources: comprehensiveResponse.recommendations.resources
      };
    }
    
    if (comprehensiveResponse.crisisResponse) {
      counselingGuidance.coordinationPlan = {
        involvedAgents: [respondingAgentId],
        responsibilities: {
          [respondingAgentId]: comprehensiveResponse.crisisResponse.immediateSteps
        },
        timeline: comprehensiveResponse.crisisResponse.recoveryStrategy,
        communicationFrequency: 'Continuous updates during crisis'
      };
    }

    // Create action items from recommendations
    const actionItems = comprehensiveResponse.recommendations.immediateActions.map((action, index) => ({
      id: `action_${index}`,
      description: action,
      assignedTo: sessionId, // Will be updated with actual target agent
      priority: 'medium' as ConsultationPriority,
      status: 'pending' as const
    }));

    return this.respondToConsultation(sessionId, respondingAgentId, {
      status: 'completed',
      answer: comprehensiveResponse.assessment.situationAnalysis,
      recommendations: [
        ...comprehensiveResponse.assessment.keyFindings,
        ...comprehensiveResponse.recommendations.shortTermGoals
      ],
      actionItems,
      confidence: comprehensiveResponse.confidence,
      reasoning: comprehensiveResponse.reasoning,
      caveats: comprehensiveResponse.caveats,
      requiresFollowUp: true,
      followUpQuestions: [
        'Do you need clarification on any recommendations?',
        'What resources do you need to implement these actions?',
        'Are there any barriers or concerns I should know about?'
      ],
      suggestedNextSteps: comprehensiveResponse.followUp.nextSteps,
      counselingGuidance
    });
  }

  // ============================================
  // AGENT PROFILE MANAGEMENT
  // ============================================
  
  registerAgent(profile: AgentConsultingProfile): void {
    this.network.agentProfiles.set(profile.agentId, profile);
    
    AIServiceLogger.logAgentEvent('consulting_profile_created', profile.agentId, {
      agentName: profile.agentName,
      category: profile.category,
      canConsult: profile.canConsult,
      canBeConsulted: profile.canBeConsulted
    });
    
    logAudit({
      userId: 'system',
      organizationId: 'system',
      action: 'agent_profile_registered',
      resource: 'agent_consulting',
      resourceId: profile.agentId,
      details: {
        agentName: profile.agentName,
        category: profile.category,
        expertiseAreas: profile.expertiseAreas
      }
    });
  }

  updateAgentProfile(agentId: string, updates: Partial<AgentConsultingProfile>): AgentConsultingProfile | null {
    const profile = this.network.agentProfiles.get(agentId);
    if (!profile) return null;
    
    const updated = { ...profile, ...updates };
    this.network.agentProfiles.set(agentId, updated);
    
    return updated;
  }

  getAgentProfile(agentId: string): AgentConsultingProfile | null {
    return this.network.agentProfiles.get(agentId) || null;
  }

  findConsultantsByExpertise(expertise: string, category?: string): AgentConsultingProfile[] {
    const consultants: AgentConsultingProfile[] = [];
    
    for (const profile of this.network.agentProfiles.values()) {
      if (!profile.canBeConsulted) continue;
      if (category && profile.category !== category) continue;
      if (profile.expertiseAreas.includes(expertise) || 
          profile.consultingDomains.includes(expertise)) {
        consultants.push(profile);
      }
    }
    
    // Sort by expertise score and satisfaction
    return consultants.sort((a, b) => {
      const scoreA = a.stats.expertiseScore * 0.6 + a.stats.satisfactionScore * 0.4;
      const scoreB = b.stats.expertiseScore * 0.6 + b.stats.satisfactionScore * 0.4;
      return scoreB - scoreA;
    });
  }

  getSessionsForAgent(agentId: string, scope: 'active' | 'completed' | 'all' = 'all'): ConsultationSession[] {
    const sessions: ConsultationSession[] = [];
    
    // Check active sessions
    for (const session of this.network.activeSessions.values()) {
      const isInvolved = 
        session.initiator.agentId === agentId ||
        session.participants.some(p => p.agentId === agentId);
      
      if (isInvolved) {
        if (scope === 'all' || scope === 'active') {
          sessions.push(session);
        }
      }
    }
    
    // Check completed sessions in history
    if (scope === 'all' || scope === 'completed') {
      for (const session of this.network.consultationHistory) {
        const isInvolved = 
          session.initiator.agentId === agentId ||
          session.participants.some(p => p.agentId === agentId);
        
        if (isInvolved && !sessions.find(s => s.id === session.id)) {
          sessions.push(session);
        }
      }
    }
    
    // Sort by created date, newest first
    return sessions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // ============================================
  // CONSULTATION SESSION MANAGEMENT
  // ============================================
  
  async initiateConsultation(
    sourceAgentId: string,
    targetAgentId: string,
    topic: string,
    question: string,
    options: {
      type?: ConsultationType;
      priority?: ConsultationPriority;
      context?: Record<string, any>;
      expectedDeliverable?: string;
      deadline?: Date;
      tags?: string[];
      counselingContext?: ConsultationRequest['counselingContext'];
    } = {}
  ): Promise<ConsultationSession> {
    const sourceProfile = this.ensureAgentProfile(sourceAgentId);
    const targetProfile = this.ensureAgentProfile(targetAgentId);
    
    if (!sourceProfile.canConsult) {
      throw new Error(`Agent ${sourceAgentId} is not configured for consulting`);
    }
    if (!targetProfile.canBeConsulted) {
      throw new Error(`Agent ${targetAgentId} is not available for consultation`);
    }

    const correlationId = randomUUID();
    const sessionId = randomUUID();
    const now = new Date();

    // Create consultation request
    const request: ConsultationRequest = {
      id: randomUUID(),
      correlationId,
      timestamp: now,
      type: options.type || 'advisory',
      priority: options.priority || 'medium',
      sourceAgentId,
      sourceAgentName: sourceProfile.agentName,
      sourceCategory: sourceProfile.category,
      sourceAgentType: sourceProfile.agentType,
      targetAgentId,
      targetAgentName: targetProfile.agentName,
      targetCategory: targetProfile.category,
      targetAgentType: targetProfile.agentType,
      topic,
      context: options.context || {},
      question,
      expectedDeliverable: options.expectedDeliverable,
      deadline: options.deadline,
      counselingContext: options.counselingContext,
      tags: options.tags || [],
      relatedConsultationIds: [],
      metadata: {}
    };

    // Create session
    const session: ConsultationSession = {
      id: sessionId,
      correlationId,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      initiator: {
        agentId: sourceAgentId,
        agentName: sourceProfile.agentName,
        category: sourceProfile.category
      },
      participants: [{
        agentId: targetAgentId,
        agentName: targetProfile.agentName,
        category: targetProfile.category,
        role: 'consultant',
        joinedAt: now
      }],
      requests: [request],
      responses: []
    };

    this.network.activeSessions.set(sessionId, session);
    await this.persistSession(session);
    
    // Notify real-time subscribers
    this.notifySessionUpdate(session, 'new');

    // Log the consultation initiation
    AIServiceLogger.logAgentEvent('consultation_initiated', sourceAgentId, {
      targetAgentId,
      topic,
      type: request.type,
      priority: request.priority,
      correlationId
    });

    // Audit log
    await logAudit({
      userId: sourceAgentId,
      organizationId: 'system',
      action: 'consultation_initiated',
      resource: 'agent_consulting',
      resourceId: sessionId,
      details: {
        sourceAgent: sourceProfile.agentName,
        targetAgent: targetProfile.agentName,
        topic,
        type: request.type
      }
    });

    return session;
  }

  async respondToConsultation(
    sessionId: string,
    respondingAgentId: string,
    response: Omit<ConsultationResponse, 'id' | 'consultationId' | 'correlationId' | 'timestamp' | 'respondingAgentId' | 'respondingAgentName'>
  ): Promise<ConsultationSession> {
    const session = this.network.activeSessions.get(sessionId);
    if (!session) throw new Error(`Consultation session ${sessionId} not found`);

    const responder = this.ensureAgentProfile(respondingAgentId);

    const lastRequest = session.requests[session.requests.length - 1];
    
    // Create the full response object with all required fields
    const fullResponse: ConsultationResponse = {
      id: randomUUID(),
      consultationId: lastRequest.id,
      correlationId: session.correlationId,
      timestamp: new Date(),
      respondingAgentId,
      respondingAgentName: responder.agentName,
      ...response
    };

    session.responses.push(fullResponse);
    session.status = response.status;
    session.updatedAt = new Date();

    await this.persistSession(session);
    
    // Notify real-time subscribers
    const isComplete = response.status === 'completed';
    this.notifySessionUpdate(session, isComplete ? 'complete' : 'update');

    // Update agent stats
    this.updateAgentConsultingStats(respondingAgentId, 'consultation_given');
    this.updateAgentConsultingStats(lastRequest.sourceAgentId, 'consultation_received');

    // Log response
    AIServiceLogger.logAgentEvent('consultation_responded', respondingAgentId, {
      sessionId,
      status: response.status,
      confidence: response.confidence,
      correlationId: session.correlationId
    });

    // Handle escalations
    if (response.escalateTo && response.escalateTo.length > 0) {
      for (const escalateAgentId of response.escalateTo) {
        await this.escalateConsultation(sessionId, escalateAgentId, respondingAgentId);
      }
    }

    // Handle delegations
    if (response.delegateTo && response.delegateTo.length > 0) {
      for (const delegateAgentId of response.delegateTo) {
        await this.delegateConsultation(sessionId, delegateAgentId, respondingAgentId, fullResponse);
      }
    }

    // Complete session if status is completed
    if (response.status === 'completed') {
      await this.completeConsultation(sessionId);
    }

    return session;
  }

  private async escalateConsultation(
    sessionId: string,
    targetAgentId: string,
    escalatingAgentId: string
  ): Promise<void> {
    const session = this.network.activeSessions.get(sessionId);
    if (!session) return;

    const targetProfile = this.ensureAgentProfile(targetAgentId);

    const escalatingProfile = this.ensureAgentProfile(escalatingAgentId);

    // Add escalation target as participant
    session.participants.push({
      agentId: targetAgentId,
      agentName: targetProfile.agentName,
      category: targetProfile.category,
      role: 'escalation_target',
      joinedAt: new Date()
    });

    // Create escalation request
    const escalationRequest: ConsultationRequest = {
      id: randomUUID(),
      correlationId: session.correlationId,
      timestamp: new Date(),
      type: 'escalation',
      priority: 'high',
      sourceAgentId: escalatingAgentId,
      sourceAgentName: this.getAgentProfile(escalatingAgentId)?.agentName || 'Unknown',
      sourceCategory: this.getAgentProfile(escalatingAgentId)?.category || 'Unknown',
      sourceAgentType: escalatingProfile.agentType,
      targetAgentId,
      targetAgentName: targetProfile.agentName,
      targetCategory: targetProfile.category,
      targetAgentType: targetProfile.agentType,
      topic: `Escalation from ${session.requests[0].topic}`,
      context: {
        originalRequest: session.requests[0],
        previousResponses: session.responses,
        escalationReason: 'Requires higher authority or specialized expertise'
      },
      question: `This consultation has been escalated to you. Please review the previous discussion and provide guidance.`,
      tags: ['escalation', ...session.requests[0].tags],
      relatedConsultationIds: [session.requests[0].id],
      metadata: { escalation: true }
    };

    session.requests.push(escalationRequest);
    session.status = 'escalated';

    AIServiceLogger.logAgentEvent('consultation_escalated', escalatingAgentId, {
      sessionId,
      targetAgentId,
      correlationId: session.correlationId
    });
  }

  private async delegateConsultation(
    sessionId: string,
    targetAgentId: string,
    delegatingAgentId: string,
    parentResponse: ConsultationResponse
  ): Promise<void> {
    const session = this.network.activeSessions.get(sessionId);
    if (!session) return;

    const targetProfile = this.ensureAgentProfile(targetAgentId);

    // Add delegate as participant
    session.participants.push({
      agentId: targetAgentId,
      agentName: targetProfile.agentName,
      category: targetProfile.category,
      role: 'consultant',
      joinedAt: new Date()
    });

    // Create delegation request
    const delegationRequest: ConsultationRequest = {
      id: randomUUID(),
      correlationId: session.correlationId,
      timestamp: new Date(),
      type: 'delegation',
      priority: session.requests[0].priority,
      sourceAgentId: delegatingAgentId,
      sourceAgentName: this.getAgentProfile(delegatingAgentId)?.agentName || 'Unknown',
      sourceCategory: this.getAgentProfile(delegatingAgentId)?.category || 'Unknown',
      sourceAgentType: delegatingProfile.agentType,
      targetAgentId,
      targetAgentName: targetProfile.agentName,
      targetCategory: targetProfile.category,
      targetAgentType: targetProfile.agentType,
      topic: `Delegation: ${session.requests[0].topic}`,
      context: {
        originalRequest: session.requests[0],
        delegatingResponse: parentResponse,
        specificTasks: parentResponse.actionItems?.map(a => a.description) || []
      },
      question: `You have been delegated specific tasks from a consultation. Please execute these tasks and report back.`,
      expectedDeliverable: parentResponse.deliverables?.map(d => d.title).join(', '),
      tags: ['delegation', ...session.requests[0].tags],
      relatedConsultationIds: [session.requests[0].id],
      metadata: { delegation: true }
    };

    session.requests.push(delegationRequest);

    AIServiceLogger.logAgentEvent('consultation_delegated', delegatingAgentId, {
      sessionId,
      targetAgentId,
      correlationId: session.correlationId
    });
  }

  private async completeConsultation(sessionId: string): Promise<void> {
    const session = this.network.activeSessions.get(sessionId);
    if (!session) return;

    const now = new Date();
    const duration = (now.getTime() - session.createdAt.getTime()) / 1000;

    session.status = 'completed';
    session.completedAt = now;
    session.outcome = {
      summary: this.generateOutcomeSummary(session),
      resolution: session.responses[session.responses.length - 1]?.answer || 'No resolution provided',
      metrics: {
        duration,
        messageCount: session.requests.length + session.responses.length,
        satisfactionScore: this.calculateSatisfactionScore(session)
      }
    };

    // Move to history
    this.network.consultationHistory.push(session);
    this.network.activeSessions.delete(sessionId);

    await this.persistSession(session);

    AIServiceLogger.logAgentEvent('consultation_completed', session.initiator.agentId, {
      sessionId,
      duration,
      messageCount: session.outcome.metrics.messageCount,
      correlationId: session.correlationId
    });

    await logAudit({
      userId: session.initiator.agentId,
      organizationId: 'system',
      action: 'consultation_completed',
      resource: 'agent_consulting',
      resourceId: sessionId,
      details: {
        duration,
        status: 'completed',
        participantCount: session.participants.length
      }
    });
  }

  // ============================================
  // CONSULTATION QUERIES & RETRIEVAL
  // ============================================
  
  getSession(sessionId: string): ConsultationSession | null {
    return this.network.activeSessions.get(sessionId) || 
           this.network.consultationHistory.find(s => s.id === sessionId) || 
           null;
  }

  getActiveSessions(agentId?: string): ConsultationSession[] {
    const sessions = Array.from(this.network.activeSessions.values());
    if (!agentId) return sessions;
    
    return sessions.filter(s => 
      s.initiator.agentId === agentId || 
      s.participants.some(p => p.agentId === agentId)
    );
  }

  getConsultationHistory(
    filters: {
      agentId?: string;
      category?: string;
      type?: ConsultationType;
      status?: ConsultationStatus;
      dateFrom?: Date;
      dateTo?: Date;
    } = {}
  ): ConsultationSession[] {
    let history = [...this.network.consultationHistory];
    
    if (filters.agentId) {
      history = history.filter(s => 
        s.initiator.agentId === filters.agentId ||
        s.participants.some(p => p.agentId === filters.agentId)
      );
    }
    
    if (filters.category) {
      history = history.filter(s =>
        s.initiator.category === filters.category ||
        s.participants.some(p => p.category === filters.category)
      );
    }
    
    if (filters.type) {
      history = history.filter(s =>
        s.requests.some(r => r.type === filters.type)
      );
    }
    
    if (filters.status) {
      history = history.filter(s => s.status === filters.status);
    }
    
    if (filters.dateFrom) {
      history = history.filter(s => s.createdAt >= filters.dateFrom!);
    }
    
    if (filters.dateTo) {
      history = history.filter(s => s.createdAt <= filters.dateTo!);
    }
    
    return history.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // ============================================
  // HELPER METHODS
  // ============================================
  
  private generateOutcomeSummary(session: ConsultationSession): string {
    const requestCount = session.requests.length;
    const responseCount = session.responses.length;
    const uniqueParticipants = new Set(session.participants.map(p => p.agentId)).size;
    
    return `Consultation involved ${uniqueParticipants} agent(s) with ${requestCount} request(s) and ${responseCount} response(s). ` +
           `Final status: ${session.status}. ` +
           `Primary topic: ${session.requests[0].topic}`;
  }

  private calculateSatisfactionScore(session: ConsultationSession): number {
    if (session.responses.length === 0) return 0;
    
    const avgConfidence = session.responses.reduce((sum, r) => sum + r.confidence, 0) / session.responses.length;
    const hasActionItems = session.responses.some(r => r.actionItems && r.actionItems.length > 0);
    const hasDeliverables = session.responses.some(r => r.deliverables && r.deliverables.length > 0);
    
    let score = avgConfidence * 0.6;
    if (hasActionItems) score += 0.2;
    if (hasDeliverables) score += 0.2;
    
    return Math.min(score, 1);
  }

  private updateAgentConsultingStats(agentId: string, type: 'consultation_given' | 'consultation_received'): void {
    const profile = this.getAgentProfile(agentId);
    if (!profile) return;
    
    if (type === 'consultation_given') {
      profile.stats.totalConsultationsGiven++;
    } else {
      profile.stats.totalConsultationsReceived++;
    }
    
    this.updateAgentProfile(agentId, { stats: profile.stats });
  }

  private startCleanupTimer(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupStaleSessions();
    }, 60000); // Run every minute
  }

  private cleanupStaleSessions(): void {
    const now = new Date();
    
    for (const [sessionId, session] of this.network.activeSessions.entries()) {
      const age = now.getTime() - session.createdAt.getTime();
      const lastActivity = now.getTime() - session.updatedAt.getTime();
      
      // Timeout if session is too old or inactive
      if (age > this.maxSessionDuration || lastActivity > this.maxResponseTime) {
        session.status = 'timeout';
        this.network.consultationHistory.push(session);
        this.network.activeSessions.delete(sessionId);
        
        AIServiceLogger.logAgentEvent('consultation_timeout', session.initiator.agentId, {
          sessionId,
          age: age / 1000,
          lastActivity: lastActivity / 1000,
          correlationId: session.correlationId
        });
      }
    }
  }

  // ============================================
  // STATISTICS & ANALYTICS
  // ============================================
  
  getConsultingStats(): {
    totalActiveSessions: number;
    totalCompletedSessions: number;
    averageSessionDuration: number;
    topConsultants: AgentConsultingProfile[];
    consultationsByCategory: Record<string, number>;
    consultationsByType: Record<string, number>;
  } {
    const activeSessions = Array.from(this.network.activeSessions.values());
    const completedSessions = this.network.consultationHistory.filter(s => s.status === 'completed');
    
    const totalDuration = completedSessions.reduce((sum, s) => {
      return sum + (s.outcome?.metrics.duration || 0);
    }, 0);
    
    const categoryCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {};
    
    [...activeSessions, ...this.network.consultationHistory].forEach(session => {
      const category = session.initiator.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      
      session.requests.forEach(request => {
        typeCounts[request.type] = (typeCounts[request.type] || 0) + 1;
      });
    });
    
    const sortedConsultants = Array.from(this.network.agentProfiles.values())
      .filter(p => p.stats.totalConsultationsGiven > 0)
      .sort((a, b) => b.stats.totalConsultationsGiven - a.stats.totalConsultationsGiven)
      .slice(0, 10);
    
    return {
      totalActiveSessions: activeSessions.length,
      totalCompletedSessions: completedSessions.length,
      averageSessionDuration: completedSessions.length > 0 ? totalDuration / completedSessions.length : 0,
      topConsultants: sortedConsultants,
      consultationsByCategory: categoryCounts,
      consultationsByType: typeCounts
    };
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// ============================================
// EXPORT SINGLETON INSTANCE
// ============================================

export const agentConsultingService = new AgentConsultingService();

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

export async function initiateAgentConsultation(
  sourceAgentId: string,
  targetAgentId: string,
  topic: string,
  question: string,
  options?: Parameters<AgentConsultingService['initiateConsultation']>[4]
): Promise<ConsultationSession> {
  return agentConsultingService.initiateConsultation(sourceAgentId, targetAgentId, topic, question, options);
}

export async function respondToAgentConsultation(
  sessionId: string,
  respondingAgentId: string,
  response: Omit<ConsultationResponse, 'id' | 'consultationId' | 'correlationId' | 'timestamp' | 'respondingAgentId' | 'respondingAgentName'>
): Promise<ConsultationSession> {
  return agentConsultingService.respondToConsultation(sessionId, respondingAgentId, response);
}

// Enhanced A2A Counseling Convenience Functions
export async function initiateMainToSubagentCounseling(
  mainAgentId: string,
  subagentId: string,
  counselingType: 'performance' | 'development' | 'coordination' | 'crisis',
  topic: string,
  details: Parameters<AgentConsultingService['initiateMainToSubagentCounseling']>[4],
  options?: Parameters<AgentConsultingService['initiateMainToSubagentCounseling']>[5]
): Promise<ConsultationSession> {
  return agentConsultingService.initiateMainToSubagentCounseling(mainAgentId, subagentId, counselingType, topic, details, options);
}

export async function initiateSubagentToMainCounseling(
  subagentId: string,
  mainAgentId: string,
  requestType: 'guidance' | 'support' | 'escalation' | 'resource_request',
  topic: string,
  details: Parameters<AgentConsultingService['initiateSubagentToMainCounseling']>[4],
  options?: Parameters<AgentConsultingService['initiateSubagentToMainCounseling']>[5]
): Promise<ConsultationSession> {
  return agentConsultingService.initiateSubagentToMainCounseling(subagentId, mainAgentId, requestType, topic, details, options);
}

export async function initiatePeerToPeerCounseling(
  agentId1: string,
  agentId2: string,
  counselingType: 'collaboration' | 'peer_review' | 'knowledge_sharing' | 'problem_solving',
  topic: string,
  details: Parameters<AgentConsultingService['initiatePeerToPeerCounseling']>[4],
  options?: Parameters<AgentConsultingService['initiatePeerToPeerCounseling']>[5]
): Promise<ConsultationSession> {
  return agentConsultingService.initiatePeerToPeerCounseling(agentId1, agentId2, counselingType, topic, details, options);
}

export async function respondToMainToSubagentCounseling(
  sessionId: string,
  mainAgentId: string,
  response: Parameters<AgentConsultingService['respondToMainToSubagentCounseling']>[2]
): Promise<ConsultationSession> {
  return agentConsultingService.respondToMainToSubagentCounseling(sessionId, mainAgentId, response);
}

export async function respondToSubagentToMainCounseling(
  sessionId: string,
  subagentId: string,
  response: Parameters<AgentConsultingService['respondToSubagentToMainCounseling']>[2]
): Promise<ConsultationSession> {
  return agentConsultingService.respondToSubagentToMainCounseling(sessionId, subagentId, response);
}

export function getSessionsForAgent(agentId: string, scope?: 'active' | 'completed' | 'all'): ConsultationSession[] {
  return agentConsultingService.getSessionsForAgent(agentId, scope);
}

export function getAgentConsultingProfile(agentId: string): AgentConsultingProfile | null {
  return agentConsultingService.getAgentProfile(agentId);
}

export function findExpertConsultants(expertise: string, category?: string): AgentConsultingProfile[] {
  return agentConsultingService.findConsultantsByExpertise(expertise, category);
}

export function getActiveConsultations(agentId?: string): ConsultationSession[] {
  return agentConsultingService.getActiveSessions(agentId);
}

export function getConsultationHistory(
  filters?: Parameters<AgentConsultingService['getConsultationHistory']>[0]
): ConsultationSession[] {
  return agentConsultingService.getConsultationHistory(filters);
}

export function getConsultingStatistics(): ReturnType<AgentConsultingService['getConsultingStats']> {
  return agentConsultingService.getConsultingStats();
}

export function getConsultationSession(sessionId: string): ConsultationSession | null {
  return agentConsultingService.getSession(sessionId);
}

export default agentConsultingService;
