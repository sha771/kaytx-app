/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Onboarding Search Service
 * Conversational query capabilities for new hires
 * Enables natural language questions about company knowledge, workflows, and history
 */

export interface OnboardingSearchResult {
  id: string;
  title: string;
  content: string;
  type: 'sop' | 'expert' | 'project' | 'chat' | 'meeting' | 'email' | 'document' | 'decision';
  source: string;
  score: number;
  relevance: number;
  context: {
    department?: string;
    project?: string;
    author?: string;
    date?: Date;
    relatedPeople?: string[];
  };
  explanation: string;
  followUpQuestions: string[];
  metadata: Record<string, any>;
}

export interface OnboardingQuery {
  question: string;
  userId?: string;
  department?: string;
  role?: string;
  context?: {
    recentQuestions?: string[];
    currentProject?: string;
    learningGoals?: string[];
  };
}

export interface OnboardingSearchResponse {
  answer: string;
  results: OnboardingSearchResult[];
  sources: string[];
  confidence: number;
  followUpQuestions: string[];
  relatedTopics: string[];
  suggestedExperts?: Array<{
    name: string;
    expertise: string;
    availability: string;
  }>;
}

export class CompanyBrainOnboardingSearchService {
  private openai: OpenAI;
  private conversationHistory: Map<string, Array<{ role: string; content: string }>> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Process conversational onboarding query
   */
  async search(query: OnboardingQuery): Promise<OnboardingSearchResponse> {
    // Get conversation history for user
    const history = this.conversationHistory.get(query.userId || 'default') || [];

    // Add current question to history
    history.push({ role: 'user', content: query.question });

    // Generate search query from conversational input
    const searchQuery = await this.generateSearchQuery(query, history);

    // Perform search across all knowledge sources
    const searchResults = await this.performUnifiedSearch(query, searchQuery);

    // Generate conversational answer
    const answer = await this.generateAnswer(query, searchResults, history);

    // Extract sources
    const sources = searchResults.slice(0, 5).map(r => r.source);

    // Generate follow-up questions
    const followUpQuestions = await this.generateFollowUpQuestions(query, searchResults);

    // Identify related topics
    const relatedTopics = await this.extractRelatedTopics(searchResults);

    // Suggest experts if relevant
    const suggestedExperts = await this.suggestExperts(query, searchResults);

    // Calculate confidence
    const confidence = this.calculateConfidence(searchResults);

    // Add assistant response to history
    history.push({ role: 'assistant', content: answer });
    this.conversationHistory.set(query.userId || 'default', history);

    return {
      answer,
      results: searchResults,
      sources,
      confidence,
      followUpQuestions,
      relatedTopics,
      suggestedExperts,
    };
  }

  /**
   * Generate optimized search query from conversational input
   */
  private async generateSearchQuery(
    query: OnboardingQuery,
    history: Array<{ role: string; content: string }>
  ): Promise<string> {
    try {
      const context = {
        department: query.department,
        role: query.role,
        recentQuestions: query.context?.recentQuestions || [],
        currentProject: query.context?.currentProject,
        learningGoals: query.context?.learningGoals || [],
      };

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Convert the user's conversational question into an optimized search query for company knowledge.
            
            Context:
            - Department: ${context.department || 'Not specified'}
            - Role: ${context.role || 'Not specified'}
            - Current Project: ${context.currentProject || 'Not specified'}
            - Learning Goals: ${context.learningGoals.join(', ') || 'Not specified'}
            
            Return only the search query (2-5 keywords/phrases).`,
          },
          {
            role: 'user',
            content: query.question,
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      });

      return completion.choices[0].message.content || query.question;
    } catch (error) {
      console.error('Error generating search query:', error);
      return query.question;
    }
  }

  /**
   * Perform unified search across all knowledge sources
   */
  private async performUnifiedSearch(
    query: OnboardingSearch,
    searchQuery: string
  ): Promise<OnboardingSearchResult[]> {
    const results: OnboardingSearchResult[] = [];

    // Search SOPs
    const sopResults = await this.searchSOPs(query.organizationId, searchQuery);
    results.push(...sopResults);

    // Search expertise profiles
    const expertResults = await this.searchExperts(query.organizationId, searchQuery);
    results.push(...expertResults);

    // Search project timelines
    const projectResults = await this.searchProjects(query.organizationId, searchQuery);
    results.push(...projectResults);

    // Search chat logs
    const chatResults = await this.searchChatLogs(query.organizationId, searchQuery);
    results.push(...chatResults);

    // Search meeting transcriptions
    const meetingResults = await this.searchMeetings(query.organizationId, searchQuery);
    results.push(...meetingResults);

    // Search email threads
    const emailResults = await this.searchEmails(query.organizationId, searchQuery);
    results.push(...emailResults);

    // Rank and filter results
    const rankedResults = await this.rankResults(query, results);

    return rankedResults.slice(0, 10);
  }

  /**
   * Search SOPs
   */
  private async searchSOPs(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Search expertise profiles
   */
  private async searchExperts(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Search project timelines
   */
  private async searchProjects(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Search chat logs
   */
  private async searchChatLogs(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Search meeting transcriptions
   */
  private async searchMeetings(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Search email threads
   */
  private async searchEmails(organizationId: string, query: string): Promise<OnboardingSearchResult[]> {
    // In production, query database with vector search
    return [];
  }

  /**
   * Rank results based on query relevance
   */
  private async rankResults(
    query: OnboardingQuery,
    results: OnboardingSearchResult[]
  ): Promise<OnboardingSearchResult[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Rank these search results based on their relevance to the user's question.
            
            User Question: ${query.question}
            User Role: ${query.role || 'Not specified'}
            User Department: ${query.department || 'Not specified'}
            
            Return a JSON object with a "rankedIds" array containing the result IDs in order of relevance (most relevant first).`,
          },
          {
            role: 'user',
            content: JSON.stringify(
              results.map(r => ({
                id: r.id,
                title: r.title,
                type: r.type,
                content: r.content.substring(0, 300),
              }))
            ),
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      const rankedIds = result.rankedIds || [];

      // Reorder results
      const resultMap = new Map<string, OnboardingSearchResult>();
      for (const r of results) {
        resultMap.set(r.id, r);
      }

      const ranked: OnboardingSearchResult[] = [];
      for (const id of rankedIds) {
        const result = resultMap.get(id);
        if (result) {
          ranked.push(result);
        }
      }

      // Add unranked results
      for (const result of results) {
        if (!rankedIds.includes(result.id)) {
          ranked.push(result);
        }
      }

      return ranked;
    } catch (error) {
      console.error('Error ranking results:', error);
      return results;
    }
  }

  /**
   * Generate conversational answer from search results
   */
  private async generateAnswer(
    query: OnboardingQuery,
    results: OnboardingSearchResult[],
    history: Array<{ role: string; content: string }>
  ): Promise<string> {
    if (results.length === 0) {
      return "I couldn't find specific information about that in our company knowledge base. Would you like me to help you find an expert who might know, or would you like to rephrase your question?";
    }

    try {
      const context = {
        department: query.department,
        role: query.role,
        currentProject: query.context?.currentProject,
      };

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a helpful onboarding assistant for a company. Answer the user's question based on the search results provided.
            
            Context:
            - User is a ${context.role || 'new employee'}
            - Department: ${context.department || 'Not specified'}
            - Current Project: ${context.currentProject || 'Not specified'}
            
            Guidelines:
            - Provide clear, actionable answers
            - Reference specific sources when possible
            - Explain concepts in onboarding-friendly terms
            - If information is conflicting, mention it
            - Keep answers concise but comprehensive
            - Use a friendly, helpful tone`,
          },
          ...history.slice(-5), // Include recent conversation context
          {
            role: 'user',
            content: `Question: ${query.question}\n\nSearch Results:\n${JSON.stringify(results.slice(0, 5).map(r => ({
              title: r.title,
              type: r.type,
              content: r.content.substring(0, 500),
              source: r.source,
            })))}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating answer:', error);
      return 'I found some relevant information, but had trouble generating a summary. Here are the top results from your search.';
    }
  }

  /**
   * Generate follow-up questions
   */
  private async generateFollowUpQuestions(
    query: OnboardingQuery,
    results: OnboardingSearchResult[]
  ): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Generate 3-5 relevant follow-up questions based on the user's question and the search results.
            These should help the user learn more about the topic or related areas.
            
            Return as JSON array of strings.`,
          },
          {
            role: 'user',
            content: `Original Question: ${query.question}\n\nResults: ${JSON.stringify(results.slice(0, 3).map(r => r.title))}`,
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.questions || [];
    } catch (error) {
      console.error('Error generating follow-up questions:', error);
      return [];
    }
  }

  /**
   * Extract related topics from results
   */
  private async extractRelatedTopics(results: OnboardingSearchResult[]): Promise<string[]> {
    const topics = new Set<string>();

    for (const result of results) {
      if (result.context.department) topics.add(result.context.department);
      if (result.context.project) topics.add(result.context.project);
    }

    return Array.from(topics).slice(0, 5);
  }

  /**
   * Suggest experts based on query context
   */
  private async suggestExperts(
    query: OnboardingQuery,
    results: OnboardingSearchResult[]
  ): Promise<Array<{ name: string; expertise: string; availability: string }>> {
    // In production, query expertise profiles
    return [];
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(results: OnboardingSearchResult[]): number {
    if (results.length === 0) return 0;

    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const avgRelevance = results.reduce((sum, r) => sum + r.relevance, 0) / results.length;

    return (avgScore + avgRelevance) / 2;
  }

  /**
   * Clear conversation history for a user
   */
  clearConversationHistory(userId: string): void {
    this.conversationHistory.delete(userId);
  }

  /**
   * Get onboarding statistics
   */
  async getOnboardingStatistics(organizationId: string): Promise<{
    totalQueries: number;
    uniqueUsers: number;
    avgResponseTime: number;
    topQuestions: Array<{ question: string; count: number }>;
    satisfactionScore: number;
  }> {
    // In production, query database
    return {
      totalQueries: 0,
      uniqueUsers: 0,
      avgResponseTime: 0,
      topQuestions: [],
      satisfactionScore: 0,
    };
  }

  /**
   * Get learning path suggestions for a role
   */
  async getLearningPath(role: string, department: string): Promise<{
    recommendedTopics: string[];
    suggestedSOPs: string[];
    mentorshipSuggestions: string[];
    estimatedTime: string;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Generate a learning path for a new employee in the role of "${role}" in the "${department}" department.
            
            Return as JSON with:
            - recommendedTopics: array of topic names
            - suggestedSOPs: array of SOP categories to review
            - mentorshipSuggestions: array of areas where mentorship would be helpful
            - estimatedTime: string like "2-3 weeks"`,
          },
          {
            role: 'user',
            content: 'Generate learning path',
          },
        ],
        temperature: 0.5,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return {
        recommendedTopics: result.recommendedTopics || [],
        suggestedSOPs: result.suggestedSOPs || [],
        mentorshipSuggestions: result.mentorshipSuggestions || [],
        estimatedTime: result.estimatedTime || '2-4 weeks',
      };
    } catch (error) {
      console.error('Error generating learning path:', error);
      return {
        recommendedTopics: [],
        suggestedSOPs: [],
        mentorshipSuggestions: [],
        estimatedTime: '2-4 weeks',
      };
    }
  }
}

// Export singleton instance
export const companyBrainOnboardingSearchService = new CompanyBrainOnboardingSearchService();
