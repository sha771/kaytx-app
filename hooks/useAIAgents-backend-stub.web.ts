// Web-safe stub for backend service exports
// Prevents Node-only prom-client from being bundled

// A2A Communication Service Stub
export const a2aCommunicationService = {
  sendMessage: async () => ({ success: false, error: 'Not available on web' }),
  getConsultation: async () => null,
  listActiveConsultations: async () => [],
  endConsultation: async () => ({ success: false }),
};

export const useA2ACommunication = () => ({
  sendMessage: async () => ({ success: false }),
  activeConsultations: [],
  loading: false,
});

export interface A2AMessage { id: string; content: string; timestamp: Date; }
export interface ConsultationSession { id: string; status: string; }
export interface AgentCommunicationProfile { id: string; name: string; }
export interface A2ACommunicationStats { totalMessages: number; }
export type MessageType = 'text' | 'voice' | 'file';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type ConsultationStatus = 'active' | 'ended' | 'pending';

// Inbox Agent Service Stub
export const inboxAgentService = {
  getTasks: async () => [],
  completeTask: async () => ({ success: false }),
  generateDraft: async () => null,
};

export const useInboxAgents = () => ({
  tasks: [],
  loading: false,
  generateDraft: async () => null,
});

export interface InboxMessage { id: string; subject: string; }
export interface InboxAgentTask { id: string; title: string; }
export interface DraftResponse { content: string; confidence: number; }
export interface InboxAgentStats { pendingCount: number; }

// Social Media Agent Service Stub
export const socialMediaAgentService = {
  generateContent: async () => null,
  schedulePost: async () => ({ success: false }),
  getAnalytics: async () => null,
};

export const useSocialMediaAgents = () => ({
  generateContent: async () => null,
  scheduledPosts: [],
  loading: false,
});

export interface SocialMediaPost { id: string; content: string; platform: string; }
export interface ContentCalendar { posts: SocialMediaPost[]; }
export interface SocialMediaTask { id: string; type: string; }
export interface GeneratedContent { text: string; hashtags: string[]; }

// Team Collaboration Agent Service Stub
export const teamCollaborationAgentService = {
  createTask: async () => ({ success: false }),
  allocateResources: async () => null,
  getProjectStatus: async () => null,
};

export const useTeamCollaborationAgents = () => ({
  createTask: async () => ({ success: false }),
  projects: [],
  loading: false,
});

export interface TeamTask { id: string; title: string; assignee: string; }
export interface TeamProject { id: string; name: string; tasks: TeamTask[]; }
export interface CollaborationTask { id: string; type: string; }
export interface ResourceAllocation { resources: string[]; capacity: number; }

// Social CRM Agent Service Stub
export const socialCRMAgentService = {
  scoreLead: async () => ({ score: 0 }),
  createDeal: async () => ({ success: false }),
  getContact: async () => null,
};

export const useSocialCRMAgents = () => ({
  scoreLead: async () => ({ score: 0 }),
  contacts: [],
  loading: false,
});

export interface CRMContact { id: string; name: string; email: string; }
export interface CRMDeal { id: string; value: number; stage: string; }
export interface CRMActivity { id: string; type: string; timestamp: Date; }
export interface CRMTask { id: string; title: string; }
export interface LeadScoreResult { score: number; factors: string[]; }

// Analytics Insights Agent Service Stub
export const analyticsInsightsAgentService = {
  generateReport: async () => null,
  createDashboard: async () => ({ success: false }),
  getForecast: async () => null,
};

export const useAnalyticsInsightsAgents = () => ({
  generateReport: async () => null,
  dashboards: [],
  loading: false,
});

export interface AnalyticsReport { id: string; title: string; data: any; }
export interface Dashboard { id: string; name: string; widgets: DashboardWidget[]; }
export interface DashboardWidget { id: string; type: string; config: any; }
export interface AnalyticsTask { id: string; type: string; }
export interface ForecastResult { value: number; confidence: number; }
export interface AlertConfig { threshold: number; enabled: boolean; }

// Enhanced A2A Counseling Service Stub
export const enhancedA2ACounselingService = {
  createMentoringRelationship: async () => ({ success: false }),
  startCounselingSession: async () => ({ success: false }),
  getCounselingProfile: async () => null,
};

export const useEnhancedA2ACounseling = () => ({
  createRelationship: async () => ({ success: false }),
  activeSessions: [],
  loading: false,
});

export interface MentoringRelationship { id: string; mentorId: string; menteeId: string; }
export interface CounselingSession { id: string; type: string; status: string; }
export interface AgentCounselingProfile { id: string; expertise: string[]; }
export interface CrossFunctionalCoordination { id: string; teams: string[]; }
export type CounselingType = 'mentoring' | 'coaching' | 'peer';
export type CounselingRelationship = 'mentor' | 'mentee' | 'peer';
export type MentoringStatus = 'active' | 'completed' | 'pending';
