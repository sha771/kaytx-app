import { ConsultationSession, ConsultationRequest, ConsultationResponse } from './agent-consulting-service';
import { randomUUID } from 'crypto';

export interface SessionSearchFilters {
  // Basic filters
  agentId?: string;
  participantIds?: string[];
  status?: ('pending' | 'in_progress' | 'completed' | 'escalated' | 'rejected' | 'timeout')[];
  
  // Counseling specific filters
  counselingMode?: ('main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional')[];
  counselingType?: ('performance_improvement' | 'skill_development' | 'crisis_intervention' | 'career_guidance' | 'coordination_alignment' | 'conflict_resolution')[];
  programType?: string[];
  
  // Priority and urgency
  priority?: ('low' | 'medium' | 'high' | 'critical' | 'emergency')[];
  severity?: ('low' | 'medium' | 'high' | 'critical')[];
  
  // Date filters
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
  completedAfter?: Date;
  completedBefore?: Date;
  
  // Content filters
  topicContains?: string;
  questionContains?: string;
  answerContains?: string;
  tags?: string[];
  
  // Performance filters
  minConfidence?: number;
  maxConfidence?: number;
  hasRecommendations?: boolean;
  hasActionItems?: boolean;
  isEscalated?: boolean;
  
  // Relationship filters
  initiatorId?: string;
  responderId?: string;
  category?: string[];
  
  // Pagination
  limit?: number;
  offset?: number;
  
  // Sorting
  sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'status' | 'topic';
  sortOrder?: 'asc' | 'desc';
}

export interface SessionSearchResult {
  sessions: ConsultationSession[];
  total: number;
  hasMore: boolean;
  facets: SearchFacets;
}

export interface SearchFacets {
  byStatus: Record<string, number>;
  byMode: Record<string, number>;
  byPriority: Record<string, number>;
  byType: Record<string, number>;
  byMonth: Record<string, number>;
  byAgent: { agentId: string; agentName: string; count: number }[];
}

export interface FullTextSearchOptions {
  query: string;
  fields?: ('topic' | 'question' | 'answer' | 'recommendations' | 'context')[];
  fuzzy?: boolean;
  caseSensitive?: boolean;
}

class SessionSearchService {
  private sessionIndex: Map<string, SearchableSessionData> = new Map();

  // ============================================
  // INDEXING
  // ============================================

  indexSession(session: ConsultationSession): void {
    const searchableData: SearchableSessionData = {
      id: session.id,
      status: session.status,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      initiatorId: session.initiator.agentId,
      initiatorName: session.initiator.agentName,
      participantIds: session.participants.map(p => p.agentId),
      participantNames: session.participants.map(p => p.agentName),
      topics: session.requests.map(r => r.topic),
      questions: session.requests.map(r => r.question),
      answers: session.responses.map(r => r.answer),
      recommendations: session.responses.flatMap(r => r.recommendations),
      priorities: session.requests.map(r => r.priority),
      types: session.requests.map(r => r.type),
      tags: session.requests.flatMap(r => r.tags || []),
      counselingContext: session.requests.map(r => r.counselingContext).filter(Boolean),
      confidence: session.responses.map(r => r.confidence),
    };

    this.sessionIndex.set(session.id, searchableData);
  }

  removeFromIndex(sessionId: string): void {
    this.sessionIndex.delete(sessionId);
  }

  // ============================================
  // SEARCH
  // ============================================

  searchSessions(
    sessions: ConsultationSession[],
    filters: SessionSearchFilters
  ): SessionSearchResult {
    let results = [...sessions];

    // Apply filters
    if (filters.agentId) {
      results = results.filter(s => 
        s.initiator.agentId === filters.agentId ||
        s.participants.some(p => p.agentId === filters.agentId)
      );
    }

    if (filters.participantIds && filters.participantIds.length > 0) {
      results = results.filter(s =>
        filters.participantIds!.some(id => 
          s.initiator.agentId === id || s.participants.some(p => p.agentId === id)
        )
      );
    }

    if (filters.status && filters.status.length > 0) {
      results = results.filter(s => filters.status!.includes(s.status));
    }

    if (filters.counselingMode && filters.counselingMode.length > 0) {
      results = results.filter(s => {
        const latestRequest = s.requests[s.requests.length - 1];
        const mode = latestRequest?.counselingContext?.relationship;
        return mode && filters.counselingMode!.includes(mode as any);
      });
    }

    if (filters.programType && filters.programType.length > 0) {
      results = results.filter(s => {
        const latestRequest = s.requests[s.requests.length - 1];
        const type = latestRequest?.counselingContext?.sessionType;
        return type && filters.programType!.includes(type as any);
      });
    }

    if (filters.priority && filters.priority.length > 0) {
      results = results.filter(s => {
        const latestRequest = s.requests[s.requests.length - 1];
        return latestRequest && filters.priority!.includes(latestRequest.priority);
      });
    }

    if (filters.counselingType && filters.counselingType.length > 0) {
      results = results.filter(s => {
        const latestRequest = s.requests[s.requests.length - 1];
        return latestRequest && filters.counselingType!.includes(latestRequest.type as any);
      });
    }

    // Date filters
    if (filters.createdAfter) {
      results = results.filter(s => new Date(s.createdAt) >= filters.createdAfter!);
    }
    if (filters.createdBefore) {
      results = results.filter(s => new Date(s.createdAt) <= filters.createdBefore!);
    }
    if (filters.updatedAfter) {
      results = results.filter(s => new Date(s.updatedAt) >= filters.updatedAfter!);
    }
    if (filters.updatedBefore) {
      results = results.filter(s => new Date(s.updatedAt) <= filters.updatedBefore!);
    }
    if (filters.completedAfter) {
      results = results.filter(s => 
        s.status === 'completed' && new Date(s.updatedAt) >= filters.completedAfter!
      );
    }
    if (filters.completedBefore) {
      results = results.filter(s => 
        s.status === 'completed' && new Date(s.updatedAt) <= filters.completedBefore!
      );
    }

    // Content filters
    if (filters.topicContains) {
      const term = filters.topicContains.toLowerCase();
      results = results.filter(s => 
        s.requests.some(r => r.topic.toLowerCase().includes(term))
      );
    }
    if (filters.questionContains) {
      const term = filters.questionContains.toLowerCase();
      results = results.filter(s => 
        s.requests.some(r => r.question.toLowerCase().includes(term))
      );
    }
    if (filters.answerContains) {
      const term = filters.answerContains.toLowerCase();
      results = results.filter(s => 
        s.responses.some(r => r.answer.toLowerCase().includes(term))
      );
    }
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(s => 
        s.requests.some(r => 
          filters.tags!.some(tag => r.tags?.includes(tag))
        )
      );
    }

    // Performance filters
    if (filters.minConfidence !== undefined) {
      results = results.filter(s => 
        s.responses.some(r => r.confidence >= filters.minConfidence!)
      );
    }
    if (filters.maxConfidence !== undefined) {
      results = results.filter(s => 
        s.responses.some(r => r.confidence <= filters.maxConfidence!)
      );
    }
    if (filters.hasRecommendations !== undefined) {
      results = results.filter(s => 
        s.responses.some(r => 
          filters.hasRecommendations ? r.recommendations.length > 0 : r.recommendations.length === 0
        )
      );
    }
    if (filters.isEscalated !== undefined) {
      results = results.filter(s => 
        filters.isEscalated ? s.status === 'escalated' : s.status !== 'escalated'
      );
    }

    // Relationship filters
    if (filters.initiatorId) {
      results = results.filter(s => s.initiator.agentId === filters.initiatorId);
    }
    if (filters.responderId) {
      results = results.filter(s => 
        s.responses.some(r => r.respondingAgentId === filters.responderId)
      );
    }
    if (filters.category && filters.category.length > 0) {
      results = results.filter(s => 
        filters.category!.includes(s.initiator.category) ||
        s.participants.some(p => filters.category!.includes(p.category))
      );
    }

    // Calculate facets before pagination
    const facets = this.calculateFacets(results);

    const total = results.length;

    // Sorting
    if (filters.sortBy) {
      results = this.sortResults(results, filters.sortBy, filters.sortOrder || 'desc');
    }

    // Pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 50;
    const paginatedResults = results.slice(offset, offset + limit);
    const hasMore = results.length > offset + limit;

    return {
      sessions: paginatedResults,
      total,
      hasMore,
      facets,
    };
  }

  private sortResults(
    sessions: ConsultationSession[],
    sortBy: SessionSearchFilters['sortBy'],
    order: 'asc' | 'desc'
  ): ConsultationSession[] {
    const multiplier = order === 'asc' ? 1 : -1;

    return sessions.sort((a, b) => {
      switch (sortBy) {
        case 'createdAt':
          return multiplier * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'updatedAt':
          return multiplier * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        case 'priority':
          const priorityOrder = { emergency: 0, critical: 1, high: 2, medium: 3, low: 4 };
          const aPriority = priorityOrder[a.requests[a.requests.length - 1]?.priority || 'medium'];
          const bPriority = priorityOrder[b.requests[b.requests.length - 1]?.priority || 'medium'];
          return multiplier * (aPriority - bPriority);
        case 'status':
          const statusOrder = { pending: 0, in_progress: 1, escalated: 2, completed: 3, rejected: 4, timeout: 5 };
          return multiplier * (statusOrder[a.status] - statusOrder[b.status]);
        case 'topic':
          return multiplier * (a.requests[0]?.topic || '').localeCompare(b.requests[0]?.topic || '');
        default:
          return 0;
      }
    });
  }

  private calculateFacets(sessions: ConsultationSession[]): SearchFacets {
    const byStatus: Record<string, number> = {};
    const byMode: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byMonth: Record<string, number> = {};
    const byAgentMap: Record<string, { agentId: string; agentName: string; count: number }> = {};

    for (const session of sessions) {
      // Status
      byStatus[session.status] = (byStatus[session.status] || 0) + 1;

      // Mode
      const latestRequest = session.requests[session.requests.length - 1];
      const mode = latestRequest?.counselingContext?.relationship || 'unknown';
      byMode[mode] = (byMode[mode] || 0) + 1;

      // Priority
      const priority = latestRequest?.priority || 'medium';
      byPriority[priority] = (byPriority[priority] || 0) + 1;

      // Type
      const type = latestRequest?.type || 'unknown';
      byType[type] = (byType[type] || 0) + 1;

      // Month
      const month = new Date(session.createdAt).toISOString().slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + 1;

      // Agents
      if (!byAgentMap[session.initiator.agentId]) {
        byAgentMap[session.initiator.agentId] = {
          agentId: session.initiator.agentId,
          agentName: session.initiator.agentName,
          count: 0,
        };
      }
      byAgentMap[session.initiator.agentId].count++;
    }

    return {
      byStatus,
      byMode,
      byPriority,
      byType,
      byMonth,
      byAgent: Object.values(byAgentMap).sort((a, b) => b.count - a.count).slice(0, 10),
    };
  }

  // ============================================
  // FULL-TEXT SEARCH
  // ============================================

  fullTextSearch(
    sessions: ConsultationSession[],
    options: FullTextSearchOptions
  ): ConsultationSession[] {
    const query = options.caseSensitive ? options.query : options.query.toLowerCase();
    const fields = options.fields || ['topic', 'question', 'answer'];

    return sessions.filter(session => {
      const searchableContent: string[] = [];

      if (fields.includes('topic')) {
        searchableContent.push(...session.requests.map(r => r.topic));
      }
      if (fields.includes('question')) {
        searchableContent.push(...session.requests.map(r => r.question));
      }
      if (fields.includes('answer')) {
        searchableContent.push(...session.responses.map(r => r.answer));
      }
      if (fields.includes('recommendations')) {
        searchableContent.push(...session.responses.flatMap(r => r.recommendations));
      }
      if (fields.includes('context')) {
        searchableContent.push(
          ...session.requests.map(r => JSON.stringify(r.context))
        );
      }

      const contentToSearch = searchableContent.join(' ');
      const searchContent = options.caseSensitive ? contentToSearch : contentToSearch.toLowerCase();

      if (options.fuzzy) {
        return this.fuzzyMatch(searchContent, query);
      }

      return searchContent.includes(query);
    });
  }

  private fuzzyMatch(text: string, query: string): boolean {
    // Simple fuzzy matching - check if all characters of query appear in order
    let queryIndex = 0;
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  }

  // ============================================
  // SAVED SEARCHES
  // ============================================

  private savedSearches: Map<string, SavedSearch> = new Map();

  saveSearch(userId: string, name: string, filters: SessionSearchFilters): SavedSearch {
    const saved: SavedSearch = {
      id: randomUUID(),
      userId,
      name,
      filters,
      createdAt: new Date(),
    };
    this.savedSearches.set(saved.id, saved);
    return saved;
  }

  getSavedSearches(userId: string): SavedSearch[] {
    return Array.from(this.savedSearches.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  deleteSavedSearch(searchId: string): boolean {
    return this.savedSearches.delete(searchId);
  }

  // ============================================
  // QUICK FILTERS
  // ============================================

  getQuickFilters(agentId: string): QuickFilter[] {
    return [
      {
        id: 'my_sessions',
        label: 'My Sessions',
        description: 'Sessions where I am involved',
        filter: { participantIds: [agentId] },
        icon: 'user',
      },
      {
        id: 'initiated_by_me',
        label: 'Initiated by Me',
        description: 'Sessions I started',
        filter: { initiatorId: agentId },
        icon: 'send',
      },
      {
        id: 'awaiting_response',
        label: 'Awaiting Response',
        description: 'Sessions waiting for my response',
        filter: { status: ['pending', 'in_progress'], responderId: agentId },
        icon: 'clock',
      },
      {
        id: 'high_priority',
        label: 'High Priority',
        description: 'Critical and high priority sessions',
        filter: { priority: ['critical', 'high', 'emergency'] },
        icon: 'alert',
      },
      {
        id: 'recently_completed',
        label: 'Recently Completed',
        description: 'Sessions completed in last 7 days',
        filter: { 
          status: ['completed'],
          completedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        icon: 'check',
      },
      {
        id: 'escalated',
        label: 'Escalated',
        description: 'Sessions that have been escalated',
        filter: { isEscalated: true },
        icon: 'trending-up',
      },
    ];
  }
}

interface SearchableSessionData {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  initiatorId: string;
  initiatorName: string;
  participantIds: string[];
  participantNames: string[];
  topics: string[];
  questions: string[];
  answers: string[];
  recommendations: string[];
  priorities: string[];
  types: string[];
  tags: string[];
  counselingContext: any[];
  confidence: number[];
}

interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: SessionSearchFilters;
  createdAt: Date;
}

interface QuickFilter {
  id: string;
  label: string;
  description: string;
  filter: Partial<SessionSearchFilters>;
  icon: string;
}

// Singleton instance
export const sessionSearchService = new SessionSearchService();

// Convenience functions
export function searchCounselingSessions(
  sessions: ConsultationSession[],
  filters: SessionSearchFilters
): SessionSearchResult {
  return sessionSearchService.searchSessions(sessions, filters);
}

export function fullTextSearchSessions(
  sessions: ConsultationSession[],
  options: FullTextSearchOptions
): ConsultationSession[] {
  return sessionSearchService.fullTextSearch(sessions, options);
}

export function saveSearchFilter(
  userId: string,
  name: string,
  filters: SessionSearchFilters
): SavedSearch {
  return sessionSearchService.saveSearch(userId, name, filters);
}

export function getQuickSessionFilters(agentId: string): QuickFilter[] {
  return sessionSearchService.getQuickFilters(agentId);
}

export default sessionSearchService;
