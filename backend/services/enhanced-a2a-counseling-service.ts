/**
 * Enhanced A2A Counseling Service
 * Supports advanced agent-to-agent counseling with mentoring, peer consultation,
 * and cross-functional coordination capabilities
 */

import { AIAgent, AgentType } from '../../constants/aiAgentHierarchy';
import { 
  a2aCommunicationService, 
  ConsultationSession,
  A2AMessage,
  MessageType,
  ConsultationStatus
} from './a2a-communication-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('EnhancedA2ACounseling');

// ============================================
// TYPES & INTERFACES
// ============================================

export type CounselingType = 'mentoring' | 'peer' | 'cross_functional' | 'specialist' | 'coordinating';
export type CounselingRelationship = 'mentor_mentee' | 'peer_to_peer' | 'hierarchical' | 'cross_functional';
export type MentoringStatus = 'active' | 'completed' | 'paused' | 'terminated';

export interface MentoringRelationship {
  id: string;
  mentorId: string;
  menteeId: string;
  relationshipType: 'formal' | 'informal' | 'project_based';
  status: MentoringStatus;
  focusAreas: string[];
  startDate: Date;
  endDate?: Date;
  scheduledSessions: number;
  completedSessions: number;
  goals: string[];
  progress: Record<string, number>;
  lastSessionDate?: Date;
  nextSessionDate?: Date;
}

export interface CounselingSession extends ConsultationSession {
  counselingType: CounselingType;
  relationshipType: CounselingRelationship;
  expertiseShared: string[];
  knowledgeTransferred: boolean;
  followUpRequired: boolean;
  effectiveness: number; // 0-100
}

export interface AgentCounselingProfile {
  agentId: string;
  agentName: string;
  role: 'mentor' | 'mentee' | 'peer' | 'specialist' | 'coordinator';
  
  // Mentoring capabilities
  currentMentees: string[];
  currentMentors: string[];
  mentoringHistory: string[];
  
  // Counseling load
  activeCounselingSessions: number;
  maxCounselingCapacity: number;
  availability: 'available' | 'limited' | 'unavailable';
  
  // Expertise
  expertiseAreas: string[];
  mentoringExpertise: string[];
  
  // Performance
  totalSessionsConducted: number;
  totalSessionsReceived: number;
  averageEffectiveness: number;
  
  // Preferences
  preferredCounselingTypes: CounselingType[];
  preferredRelationships: CounselingRelationship[];
}

export interface CrossFunctionalCoordination {
  id: string;
  coordinatorId: string;
  participatingAgentIds: string[];
  objective: string;
  scope: 'team' | 'department' | 'organization' | 'cross_organization';
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  sessions: string[];
  outcomes: string[];
}

// ============================================
// ENHANCED A2A COUNSELING SERVICE
// ============================================

class EnhancedA2ACounselingService {
  private mentoringRelationships: Map<string, MentoringRelationship> = new Map();
  private counselingProfiles: Map<string, AgentCounselingProfile> = new Map();
  private crossFunctionalSessions: Map<string, CrossFunctionalCoordination> = new Map();
  private eventListeners: Map<string, ((event: any) => void)[]> = new Map();

  constructor() {
    this.initializeDefaultProfiles();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  private initializeDefaultProfiles(): void {
    // Initialize main agents as mentors
    const mainAgents = [
      { id: 'customer-experience-main', name: 'Customer Experience AI Main', expertise: ['customer experience strategy', 'service operations', 'customer satisfaction'] },
      { id: 'sales-revenue-main', name: 'Sales & Revenue AI Main', expertise: ['sales strategy', 'revenue optimization', 'deal management'] },
      { id: 'marketing-growth-main', name: 'Marketing & Growth AI Main', expertise: ['marketing strategy', 'growth optimization', 'brand management'] },
      { id: 'operations-management-main', name: 'Operations & Management AI Main', expertise: ['operations management', 'process optimization', 'resource planning'] },
      { id: 'data-intelligence-main', name: 'Data & Intelligence AI Main', expertise: ['data strategy', 'business intelligence', 'analytics'] },
      { id: 'analysis-insights-performance-main', name: 'Analysis, Insights & Performance AI Main', expertise: ['performance analysis', 'strategic insights', 'executive advisory'] },
    ];

    mainAgents.forEach(agent => {
      this.counselingProfiles.set(agent.id, {
        agentId: agent.id,
        agentName: agent.name,
        role: 'mentor',
        currentMentees: [],
        currentMentors: [],
        mentoringHistory: [],
        activeCounselingSessions: 0,
        maxCounselingCapacity: 100,
        availability: 'available',
        expertiseAreas: agent.expertise,
        mentoringExpertise: agent.expertise,
        totalSessionsConducted: 0,
        totalSessionsReceived: 0,
        averageEffectiveness: 95,
        preferredCounselingTypes: ['mentoring', 'peer', 'cross_functional'],
        preferredRelationships: ['mentor_mentee', 'hierarchical', 'cross_functional'],
      });
    });
  }

  // ============================================
  // MENTORING MANAGEMENT
  // ============================================

  /**
   * Create a formal mentoring relationship between two agents
   */
  createMentoringRelationship(
    mentorId: string,
    menteeId: string,
    focusAreas: string[],
    relationshipType: 'formal' | 'informal' | 'project_based' = 'formal',
    goals: string[] = []
  ): MentoringRelationship {
    const mentorProfile = this.getOrCreateProfile(mentorId);
    const menteeProfile = this.getOrCreateProfile(menteeId);

    // Validate mentoring capability
    if (mentorProfile.role !== 'mentor' && !mentorProfile.mentoringExpertise.length) {
      throw new Error(`Agent ${mentorId} is not configured as a mentor`);
    }

    const relationship: MentoringRelationship = {
      id: this.generateId(),
      mentorId,
      menteeId,
      relationshipType,
      status: 'active',
      focusAreas,
      startDate: new Date(),
      scheduledSessions: 0,
      completedSessions: 0,
      goals,
      progress: goals.reduce((acc, goal) => ({ ...acc, [goal]: 0 }), {}),
    };

    this.mentoringRelationships.set(relationship.id, relationship);
    
    // Update profiles
    mentorProfile.currentMentees.push(menteeId);
    menteeProfile.currentMentors.push(mentorId);
    
    this.emitEvent('mentoringCreated', { relationship });
    
    return relationship;
  }

  /**
   * Get mentoring relationship by ID
   */
  getMentoringRelationship(relationshipId: string): MentoringRelationship | undefined {
    return this.mentoringRelationships.get(relationshipId);
  }

  /**
   * Get all mentoring relationships for an agent
   */
  getAgentMentoringRelationships(agentId: string): {
    asMentor: MentoringRelationship[];
    asMentee: MentoringRelationship[];
  } {
    const allRelationships = Array.from(this.mentoringRelationships.values());
    
    return {
      asMentor: allRelationships.filter(r => r.mentorId === agentId && r.status === 'active'),
      asMentee: allRelationships.filter(r => r.menteeId === agentId && r.status === 'active'),
    };
  }

  /**
   * Complete a mentoring session
   */
  completeMentoringSession(
    relationshipId: string,
    progressUpdates: Record<string, number>,
    notes?: string
  ): MentoringRelationship {
    const relationship = this.mentoringRelationships.get(relationshipId);
    if (!relationship) throw new Error('Mentoring relationship not found');

    relationship.completedSessions++;
    relationship.lastSessionDate = new Date();
    
    // Update progress
    Object.entries(progressUpdates).forEach(([goal, progress]) => {
      relationship.progress[goal] = Math.min(100, (relationship.progress[goal] || 0) + progress);
    });

    // Check if all goals are completed
    const allGoalsCompleted = Object.values(relationship.progress).every(p => p >= 100);
    if (allGoalsCompleted && relationship.status === 'active') {
      relationship.status = 'completed';
      relationship.endDate = new Date();
    }

    this.emitEvent('mentoringSessionCompleted', { relationship, notes });
    
    return relationship;
  }

  // ============================================
  // ENHANCED COUNSELING SESSIONS
  // ============================================

  /**
   * Initiate mentoring session (Mentor -> Mentee)
   */
  async initiateMentoring(
    mentorId: string,
    menteeId: string,
    topic: string,
    context: string,
    expertiseAreas: string[]
  ): Promise<CounselingSession> {
    // Check for existing relationship
    const relationships = this.getAgentMentoringRelationships(mentorId);
    let relationship = relationships.asMentor.find(r => r.menteeId === menteeId);

    if (!relationship) {
      // Create informal mentoring relationship
      relationship = this.createMentoringRelationship(
        mentorId,
        menteeId,
        expertiseAreas,
        'informal',
        [topic]
      );
    }

    const baseConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
      mentorId,
      menteeId,
      topic,
      context,
      'high'
    );

    const counselingSession: CounselingSession = {
      ...baseConsultation,
      counselingType: 'mentoring',
      relationshipType: 'mentor_mentee',
      expertiseShared: expertiseAreas,
      knowledgeTransferred: false,
      followUpRequired: false,
      effectiveness: 0,
    };

    relationship.scheduledSessions++;
    
    this.emitEvent('mentoringInitiated', { 
      session: counselingSession,
      relationship,
    });

    return counselingSession;
  }

  /**
   * Peer-to-peer counseling (specialist consultation)
   */
  async initiatePeerCounseling(
    requesterId: string,
    specialistId: string,
    topic: string,
    context: string,
    consultationType: 'advisory' | 'analytical' | 'collaborative' | 'directive'
  ): Promise<CounselingSession> {
    const baseConsultation = await a2aCommunicationService.peerConsultation(
      requesterId,
      specialistId,
      consultationType,
      topic,
      context
    );

    const counselingSession: CounselingSession = {
      ...baseConsultation,
      counselingType: 'peer',
      relationshipType: 'peer_to_peer',
      expertiseShared: [],
      knowledgeTransferred: false,
      followUpRequired: false,
      effectiveness: 0,
    };

    this.emitEvent('peerCounselingInitiated', { session: counselingSession });

    return counselingSession;
  }

  /**
   * Cross-functional coordination session
   */
  async initiateCrossFunctionalCoordination(
    coordinatorId: string,
    participatingAgentIds: string[],
    objective: string,
    scope: 'team' | 'department' | 'organization' | 'cross_organization'
  ): Promise<{ coordination: CrossFunctionalCoordination; sessions: CounselingSession[] }> {
    const coordination: CrossFunctionalCoordination = {
      id: this.generateId(),
      coordinatorId,
      participatingAgentIds,
      objective,
      scope,
      status: 'active',
      startDate: new Date(),
      sessions: [],
      outcomes: [],
    };

    this.crossFunctionalSessions.set(coordination.id, coordination);

    // Create counseling sessions with all participants
    const sessions: CounselingSession[] = await Promise.all(
      participatingAgentIds.map(async (agentId) => {
        const baseConsultation = await a2aCommunicationService.mainAgentConsultsSubagent(
          coordinatorId,
          agentId,
          `Cross-functional coordination: ${objective}`,
          `You are invited to participate in cross-functional coordination for: ${objective}`,
          'high'
        );

        const session: CounselingSession = {
          ...baseConsultation,
          counselingType: 'coordinating',
          relationshipType: 'cross_functional',
          expertiseShared: [],
          knowledgeTransferred: false,
          followUpRequired: true,
          effectiveness: 0,
        };

        coordination.sessions.push(session.id);
        return session;
      })
    );

    this.emitEvent('crossFunctionalCoordinationInitiated', { 
      coordination,
      sessions,
    });

    return { coordination, sessions };
  }

  /**
   * Specialist consultation (for complex problems)
   */
  async initiateSpecialistConsultation(
    requesterId: string,
    specialistId: string,
    problem: string,
    context: string,
    urgency: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<CounselingSession> {
    const baseConsultation = await a2aCommunicationService.requestConsultation(
      requesterId,
      specialistId,
      'directive',
      `Specialist consultation: ${problem}`,
      context,
      urgency
    );

    const counselingSession: CounselingSession = {
      ...baseConsultation,
      counselingType: 'specialist',
      relationshipType: 'hierarchical',
      expertiseShared: [],
      knowledgeTransferred: true,
      followUpRequired: urgency === 'critical' || urgency === 'high',
      effectiveness: 0,
    };

    this.emitEvent('specialistConsultationInitiated', { session: counselingSession });

    return counselingSession;
  }

  // ============================================
  // COUNSELING PROFILE MANAGEMENT
  // ============================================

  /**
   * Get or create counseling profile for an agent
   */
  getOrCreateProfile(agentId: string): AgentCounselingProfile {
    let profile = this.counselingProfiles.get(agentId);
    
    if (!profile) {
      profile = {
        agentId,
        agentName: agentId,
        role: 'peer',
        currentMentees: [],
        currentMentors: [],
        mentoringHistory: [],
        activeCounselingSessions: 0,
        maxCounselingCapacity: 50,
        availability: 'available',
        expertiseAreas: [],
        mentoringExpertise: [],
        totalSessionsConducted: 0,
        totalSessionsReceived: 0,
        averageEffectiveness: 0,
        preferredCounselingTypes: ['peer'],
        preferredRelationships: ['peer_to_peer'],
      };
      
      this.counselingProfiles.set(agentId, profile);
    }
    
    return profile;
  }

  /**
   * Update agent counseling profile
   */
  updateCounselingProfile(
    agentId: string,
    updates: Partial<AgentCounselingProfile>
  ): AgentCounselingProfile {
    const profile = this.getOrCreateProfile(agentId);
    Object.assign(profile, updates);
    return profile;
  }

  /**
   * Get counseling profile
   */
  getCounselingProfile(agentId: string): AgentCounselingProfile | undefined {
    return this.counselingProfiles.get(agentId);
  }

  /**
   * Update counseling load and availability
   */
  updateCounselingLoad(agentId: string, activeSessions: number): AgentCounselingProfile {
    const profile = this.getOrCreateProfile(agentId);
    profile.activeCounselingSessions = activeSessions;
    
    // Calculate availability
    const loadPercentage = (activeSessions / profile.maxCounselingCapacity) * 100;
    if (loadPercentage >= 90) {
      profile.availability = 'unavailable';
    } else if (loadPercentage >= 70) {
      profile.availability = 'limited';
    } else {
      profile.availability = 'available';
    }
    
    return profile;
  }

  /**
   * Find available mentors for a specific expertise
   */
  findAvailableMentors(expertiseArea: string): AgentCounselingProfile[] {
    return Array.from(this.counselingProfiles.values())
      .filter(profile => 
        profile.role === 'mentor' &&
        profile.availability === 'available' &&
        profile.mentoringExpertise.some(area => 
          area.toLowerCase().includes(expertiseArea.toLowerCase())
        ) &&
        profile.currentMentees.length < 10 // Max 10 mentees per mentor
      )
      .sort((a, b) => b.averageEffectiveness - a.averageEffectiveness);
  }

  /**
   * Find peer counselors with complementary expertise
   */
  findPeerCounselors(agentId: string, expertiseNeeded: string): AgentCounselingProfile[] {
    const requestingProfile = this.getOrCreateProfile(agentId);
    
    return Array.from(this.counselingProfiles.values())
      .filter(profile => 
        profile.agentId !== agentId &&
        profile.availability !== 'unavailable' &&
        profile.expertiseAreas.some(area =>
          area.toLowerCase().includes(expertiseNeeded.toLowerCase())
        ) &&
        // Complementary expertise (different from requester)
        !requestingProfile.expertiseAreas.some(area =>
          profile.expertiseAreas.includes(area)
        )
      )
      .sort((a, b) => b.averageEffectiveness - a.averageEffectiveness);
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  /**
   * Complete a counseling session with effectiveness rating
   */
  completeCounselingSession(
    sessionId: string,
    effectiveness: number,
    knowledgeTransferred: boolean,
    followUpRequired: boolean,
    notes?: string
  ): void {
    // In a real implementation, this would update the session in a database
    this.emitEvent('sessionCompleted', {
      sessionId,
      effectiveness,
      knowledgeTransferred,
      followUpRequired,
      notes,
      completedAt: new Date(),
    });
  }

  /**
   * Get counseling statistics for an agent
   */
  getCounselingStats(agentId: string): {
    mentoringGiven: number;
    mentoringReceived: number;
    peerSessions: number;
    crossFunctional: number;
    specialistSessions: number;
    averageEffectiveness: number;
    currentLoad: number;
    availability: string;
  } {
    const profile = this.getOrCreateProfile(agentId);
    const relationships = this.getAgentMentoringRelationships(agentId);
    
    return {
      mentoringGiven: relationships.asMentor.length,
      mentoringReceived: relationships.asMentee.length,
      peerSessions: Math.floor(profile.totalSessionsConducted * 0.4),
      crossFunctional: Math.floor(profile.totalSessionsConducted * 0.3),
      specialistSessions: Math.floor(profile.totalSessionsConducted * 0.3),
      averageEffectiveness: profile.averageEffectiveness,
      currentLoad: profile.activeCounselingSessions,
      availability: profile.availability,
    };
  }

  // ============================================
  // EVENT HANDLING
  // ============================================

  onEvent(event: string, callback: (data: any) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
    
    return () => {
      const listeners = this.eventListeners.get(event);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      }
    };
  }

  private emitEvent(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          logger.error(`Error in event listener for ${event}`, error as Error);
        }
      });
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private generateId(): string {
    return `counsel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ============================================
// EXPORT SINGLETON INSTANCE
// ============================================

export const enhancedA2ACounselingService = new EnhancedA2ACounselingService();

// ============================================
// REACT HOOK
// ============================================

export const useEnhancedA2ACounseling = () => {
  return {
    // Mentoring
    createMentoringRelationship: enhancedA2ACounselingService.createMentoringRelationship.bind(enhancedA2ACounselingService),
    getMentoringRelationship: enhancedA2ACounselingService.getMentoringRelationship.bind(enhancedA2ACounselingService),
    getAgentMentoringRelationships: enhancedA2ACounselingService.getAgentMentoringRelationships.bind(enhancedA2ACounselingService),
    completeMentoringSession: enhancedA2ACounselingService.completeMentoringSession.bind(enhancedA2ACounselingService),
    
    // Enhanced Counseling
    initiateMentoring: enhancedA2ACounselingService.initiateMentoring.bind(enhancedA2ACounselingService),
    initiatePeerCounseling: enhancedA2ACounselingService.initiatePeerCounseling.bind(enhancedA2ACounselingService),
    initiateCrossFunctionalCoordination: enhancedA2ACounselingService.initiateCrossFunctionalCoordination.bind(enhancedA2ACounselingService),
    initiateSpecialistConsultation: enhancedA2ACounselingService.initiateSpecialistConsultation.bind(enhancedA2ACounselingService),
    
    // Profile Management
    getCounselingProfile: enhancedA2ACounselingService.getCounselingProfile.bind(enhancedA2ACounselingService),
    updateCounselingProfile: enhancedA2ACounselingService.updateCounselingProfile.bind(enhancedA2ACounselingService),
    updateCounselingLoad: enhancedA2ACounselingService.updateCounselingLoad.bind(enhancedA2ACounselingService),
    
    // Discovery
    findAvailableMentors: enhancedA2ACounselingService.findAvailableMentors.bind(enhancedA2ACounselingService),
    findPeerCounselors: enhancedA2ACounselingService.findPeerCounselors.bind(enhancedA2ACounselingService),
    
    // Analytics
    completeCounselingSession: enhancedA2ACounselingService.completeCounselingSession.bind(enhancedA2ACounselingService),
    getCounselingStats: enhancedA2ACounselingService.getCounselingStats.bind(enhancedA2ACounselingService),
    
    // Events
    onEvent: enhancedA2ACounselingService.onEvent.bind(enhancedA2ACounselingService),
  };
};

// ============================================
// TYPE EXPORTS
// ============================================

export type {
  MentoringRelationship,
  CounselingSession,
  AgentCounselingProfile,
  CrossFunctionalCoordination,
  CounselingType,
  CounselingRelationship,
  MentoringStatus,
};
