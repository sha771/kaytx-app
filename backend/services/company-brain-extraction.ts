/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Knowledge Extraction Service
 * AI-powered extraction of knowledge from various sources
 */

export interface ExtractedKnowledge {
  title: string;
  content: string;
  type: KnowledgeType;
  entities: Entity[];
  relationships: Relationship[];
  tags: string[];
  confidence: number;
  source: string;
}

export enum KnowledgeType {
  PROCESS = 'process',
  DECISION = 'decision',
  CLIENT = 'client',
  PROJECT = 'project',
  TECHNICAL = 'technical',
  TRIBAL = 'tribal',
  SOP = 'sop',
  WORKFLOW = 'workflow',
  PLAYBOOK = 'playbook',
}

export interface Entity {
  type: EntityType;
  name: string;
  confidence: number;
  metadata?: Record<string, any>;
}

export enum EntityType {
  PERSON = 'person',
  PROJECT = 'project',
  CLIENT = 'client',
  PRODUCT = 'product',
  TECHNOLOGY = 'technology',
  TOOL = 'tool',
  DATE = 'date',
  METRIC = 'metric',
  LOCATION = 'location',
  DEPARTMENT = 'department',
  TEAM = 'team',
  ROLE = 'role',
  SKILL = 'skill',
  PROCESS = 'process',
  DECISION = 'decision',
  REQUIREMENT = 'requirement',
  RISK = 'risk',
  OPPORTUNITY = 'opportunity',
  BUDGET = 'budget',
  TIMELINE = 'timeline',
  MILESTONE = 'milestone',
}

export interface Relationship {
  source: string;
  target: string;
  type: RelationshipType;
  strength: number;
}

export enum RelationshipType {
  WORKED_ON = 'worked_on',
  REPORTS_TO = 'reports_to',
  COLLABORATES_WITH = 'collaborates_with',
  DEPENDS_ON = 'depends_on',
  RELATED_TO = 'related_to',
  PART_OF = 'part_of',
  INFLUENCES = 'influences',
  APPROVED_BY = 'approved_by',
  OWNS = 'owns',
  MANAGES = 'manages',
  MEMBER_OF = 'member_of',
  LOCATED_IN = 'located_in',
  USES = 'uses',
  IMPLEMENTS = 'implements',
  REQUIRES = 'requires',
  BLOCKS = 'blocks',
  ENABLES = 'enables',
  PRECEDES = 'precedes',
  FOLLOWS = 'follows',
  ASSIGNED_TO = 'assigned_to',
  MENTORS = 'mentors',
  TRAINED_BY = 'trained_by',
  KNOWS = 'knows',
  SPECIALIZES_IN = 'specializes_in',
  BUDGETED_FOR = 'budgeted_for',
  DEADLINE_FOR = 'deadline_for',
  RISK_TO = 'risk_to',
  OPPORTUNITY_FOR = 'opportunity_for',
}

export class KnowledgeExtractionService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Extract knowledge from text content
   */
  async extractFromText(
    text: string,
    source: string,
    context?: Record<string, any>
  ): Promise<ExtractedKnowledge> {
    try {
      // Use GPT-4 to extract structured knowledge
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert knowledge extraction system. Extract structured knowledge from the given text.
            
            Return a JSON object with the following structure:
            {
              "title": "Brief descriptive title",
              "content": "Main knowledge content",
              "type": "process|decision|client|project|technical|tribal|sop|workflow|playbook",
              "entities": [
                {
                  "type": "person|project|client|product|technology|tool|date|metric|location",
                  "name": "Entity name",
                  "confidence": 0.0-1.0,
                  "metadata": {}
                }
              ],
              "relationships": [
                {
                  "source": "Entity name",
                  "target": "Entity name",
                  "type": "worked_on|reports_to|collaborates_with|depends_on|related_to|part_of|influences|approved_by",
                  "strength": 0.0-1.0
                }
              ],
              "tags": ["tag1", "tag2"],
              "confidence": 0.0-1.0
            }`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      return {
        ...result,
        source,
      };
    } catch (error) {
      console.error('Error extracting knowledge from text:', error);
      throw new Error('Failed to extract knowledge from text');
    }
  }

  /**
   * Extract knowledge from a document
   */
  async extractFromDocument(
    documentContent: string,
    filename: string,
    mimeType: string
  ): Promise<ExtractedKnowledge> {
    const context = {
      filename,
      mimeType,
      extractedAt: new Date().toISOString(),
    };

    return this.extractFromText(documentContent, filename, context);
  }

  /**
   * Extract knowledge from Slack messages
   */
  async extractFromSlackMessages(
    messages: Array<{
      text: string;
      user: string;
      timestamp: string;
      channel: string;
    }>
  ): Promise<ExtractedKnowledge[]> {
    const extractedKnowledge: ExtractedKnowledge[] = [];

    // Group messages by conversation thread
    const threads = this.groupMessagesByThread(messages);

    for (const thread of threads) {
      const combinedText = thread
        .map((m) => `${m.user}: ${m.text}`)
        .join('\n');

      try {
        const knowledge = await this.extractFromText(
          combinedText,
          `slack:${thread[0].channel}`,
          {
            sourceType: 'slack',
            channel: thread[0].channel,
            participants: [...new Set(thread.map((m) => m.user))],
            messageCount: thread.length,
          }
        );

        extractedKnowledge.push(knowledge);
      } catch (error) {
        console.error('Error extracting from Slack thread:', error);
      }
    }

    return extractedKnowledge;
  }

  /**
   * Extract knowledge from email
   */
  async extractFromEmail(
    email: {
      subject: string;
      body: string;
      from: string;
      to: string[];
      date: string;
    }
  ): Promise<ExtractedKnowledge> {
    const emailText = `Subject: ${email.subject}\n\nFrom: ${email.from}\nTo: ${email.to.join(', ')}\n\n${email.body}`;

    return this.extractFromText(emailText, `email:${email.from}`, {
      sourceType: 'email',
      subject: email.subject,
      from: email.from,
      to: email.to,
      date: email.date,
    });
  }

  /**
   * Extract knowledge from meeting transcript
   */
  async extractFromMeetingTranscript(
    transcript: string,
    metadata: {
      meetingTitle: string;
      participants: string[];
      date: string;
    }
  ): Promise<ExtractedKnowledge> {
    const transcriptText = `Meeting: ${metadata.meetingTitle}\nDate: ${metadata.date}\nParticipants: ${metadata.participants.join(', ')}\n\n${transcript}`;

    return this.extractFromText(transcriptText, `meeting:${metadata.meetingTitle}`, {
      sourceType: 'meeting',
      ...metadata,
    });
  }

  /**
   * Generate embedding for knowledge content
   */
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        dimensions: 1536,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  /**
   * Classify knowledge type
   */
  async classifyKnowledgeType(text: string): Promise<KnowledgeType> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Classify the given text into one of these knowledge types:
            - process: Describes a process or workflow
            - decision: Records a decision made
            - client: Information about a client
            - project: Information about a project
            - technical: Technical knowledge or documentation
            - tribal: Unwritten rules or institutional knowledge
            - sop: Standard operating procedure
            - workflow: Workflow description
            - playbook: Playbook or guide
            
            Return only the type name as a single word.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.1,
      });

      const type = completion.choices[0].message.content?.trim().toLowerCase();
      return this.validateKnowledgeType(type);
    } catch (error) {
      console.error('Error classifying knowledge type:', error);
      return KnowledgeType.PROCESS; // Default fallback
    }
  }

  /**
   * Extract entities from text (enhanced with more entity types)
   */
  async extractEntities(text: string): Promise<Entity[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract entities from the given text. Return a JSON object with an entities array.
            
            Entity types: person, project, client, product, technology, tool, date, metric, location, department, team, role, skill, process, decision, requirement, risk, opportunity, budget, timeline, milestone.
            
            Each entity should have:
            - type: entity type
            - name: Entity name (normalized, e.g., "John Smith" not "john")
            - confidence: 0.0-1.0
            - metadata: optional additional information (email, phone, url, etc.)
            
            Focus on extracting ALL entities, not just the obvious ones. Look for:
            - People (names, roles, titles)
            - Projects and initiatives
            - Clients and partners
            - Products and services
            - Technologies and tools
            - Departments and teams
            - Skills and competencies
            - Processes and workflows
            - Decisions made
            - Requirements and constraints
            - Risks and opportunities
            - Budgets and financial data
            - Timelines and milestones`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.entities || [];
    } catch (error) {
      console.error('Error extracting entities:', error);
      return [];
    }
  }

  /**
   * Extract relationships between entities (enhanced with more relationship types)
   */
  async extractRelationships(
    text: string,
    entities: Entity[]
  ): Promise<Relationship[]> {
    try {
      const entityNames = entities.map((e) => e.name).join(', ');

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract relationships between these entities: ${entityNames}
            
            Relationship types: worked_on, reports_to, collaborates_with, depends_on, related_to, part_of, influences, approved_by, owns, manages, member_of, located_in, uses, implements, requires, blocks, enables, precedes, follows, assigned_to, mentors, trained_by, knows, specializes_in, budgeted_for, deadline_for, risk_to, opportunity_for.
            
            Return a JSON object with a relationships array. Each relationship should have:
            - source: Entity name (must match one of the entities)
            - target: Entity name (must match one of the entities)
            - type: relationship type
            - strength: 0.0-1.0 (how strong/confident is this relationship)
            
            Focus on extracting ALL meaningful relationships, including:
            - Organizational relationships (reports_to, manages, member_of)
            - Work relationships (worked_on, collaborates_with, assigned_to)
            - Technical relationships (uses, implements, depends_on)
            - Temporal relationships (precedes, follows, deadline_for)
            - Knowledge relationships (knows, specializes_in, mentors)
            - Business relationships (owns, budgeted_for, risk_to)`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.relationships || [];
    } catch (error) {
      console.error('Error extracting relationships:', error);
      return [];
    }
  }

  /**
   * Generate summary of knowledge
   */
  async generateSummary(text: string, maxLength: number = 200): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Summarize the given text in ${maxLength} characters or less. Focus on the key knowledge points.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: maxLength,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating summary:', error);
      return text.substring(0, maxLength);
    }
  }

  /**
   * Generate tags for knowledge
   */
  async generateTags(text: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Generate 5-10 relevant tags for the given text. Tags should be lowercase, single words or short phrases. Return as a JSON array.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result.tags || [];
    } catch (error) {
      console.error('Error generating tags:', error);
      return [];
    }
  }

  /**
   * Detect if content contains sensitive information
   */
  async detectSensitiveContent(text: string): Promise<{
    hasSensitive: boolean;
    types: string[];
    confidence: number;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Detect if the text contains sensitive information such as:
            - Personal identifiable information (PII)
            - Financial data
            - Confidential business information
            - Trade secrets
            - Legal information
            
            Return a JSON object with:
            - hasSensitive: boolean
            - types: array of sensitive types found
            - confidence: 0.0-1.0`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('Error detecting sensitive content:', error);
      return { hasSensitive: false, types: [], confidence: 0 };
    }
  }

  /**
   * Redact sensitive information from text
   */
  async redactSensitiveContent(text: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Redact sensitive information from the text. Replace with [REDACTED]. Keep the rest of the text unchanged.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.1,
      });

      return completion.choices[0].message.content || text;
    } catch (error) {
      console.error('Error redacting sensitive content:', error);
      return text;
    }
  }

  /**
   * Group messages by conversation thread
   */
  private groupMessagesByThread(
    messages: Array<{ text: string; user: string; timestamp: string; channel: string }>
  ): Array<Array<{ text: string; user: string; timestamp: string; channel: string }>> {
    const threads: Array<Array<any>> = [];
    const currentThread: any[] = [];
    const threadTimeout = 5 * 60 * 1000; // 5 minutes

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const prevMessage = messages[i - 1];

      if (prevMessage) {
        const timeDiff = new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime();

        if (timeDiff > threadTimeout) {
          if (currentThread.length > 0) {
            threads.push([...currentThread]);
            currentThread.length = 0;
          }
        }
      }

      currentThread.push(message);
    }

    if (currentThread.length > 0) {
      threads.push(currentThread);
    }

    return threads;
  }

  /**
   * Validate knowledge type
   */
  private validateKnowledgeType(type: string): KnowledgeType {
    const validTypes = Object.values(KnowledgeType);
    if (validTypes.includes(type as KnowledgeType)) {
      return type as KnowledgeType;
    }
    return KnowledgeType.PROCESS;
  }

  /**
   * Batch extract knowledge from multiple sources
   */
  async batchExtract(
    sources: Array<{
      type: 'text' | 'document' | 'slack' | 'email' | 'meeting';
      content: any;
      metadata?: Record<string, any>;
    }>
  ): Promise<ExtractedKnowledge[]> {
    const results: ExtractedKnowledge[] = [];

    for (const source of sources) {
      try {
        let knowledge: ExtractedKnowledge;

        switch (source.type) {
          case 'text':
            knowledge = await this.extractFromText(source.content, source.metadata?.source || 'text', source.metadata);
            break;
          case 'document':
            knowledge = await this.extractFromDocument(
              source.content,
              source.metadata?.filename,
              source.metadata?.mimeType
            );
            break;
          case 'slack':
            knowledge = (await this.extractFromSlackMessages(source.content))[0];
            break;
          case 'email':
            knowledge = await this.extractFromEmail(source.content);
            break;
          case 'meeting':
            knowledge = await this.extractFromMeetingTranscript(source.content, source.metadata);
            break;
          default:
            continue;
        }

        results.push(knowledge);
      } catch (error) {
        console.error(`Error extracting from ${source.type}:`, error);
      }
    }

    return results;
  }

  /**
   * Extract knowledge with context-aware entity resolution
   * Enhanced method that resolves entity references across the knowledge base
   */
  async extractWithContextResolution(
    text: string,
    source: string,
    context?: Record<string, any>,
    existingEntities?: Entity[]
  ): Promise<ExtractedKnowledge> {
    try {
      const baseKnowledge = await this.extractFromText(text, source, context);

      // If we have existing entities, perform entity resolution
      if (existingEntities && existingEntities.length > 0) {
        const resolvedEntities = await this.resolveEntities(
          baseKnowledge.entities,
          existingEntities
        );
        baseKnowledge.entities = resolvedEntities;
      }

      return baseKnowledge;
    } catch (error) {
      console.error('Error extracting with context resolution:', error);
      throw error;
    }
  }

  /**
   * Resolve entities against existing knowledge base
   * Matches new entities to existing ones to avoid duplicates
   */
  private async resolveEntities(
    newEntities: Entity[],
    existingEntities: Entity[]
  ): Promise<Entity[]> {
    const resolved: Entity[] = [];

    for (const newEntity of newEntities) {
      // Try to find matching existing entity
      const match = existingEntities.find(
        existing =>
          existing.type === newEntity.type &&
          existing.name.toLowerCase() === newEntity.name.toLowerCase()
      );

      if (match) {
        // Use existing entity with updated confidence
        resolved.push({
          ...match,
          confidence: Math.max(match.confidence, newEntity.confidence),
          metadata: { ...match.metadata, ...newEntity.metadata },
        });
      } else {
        // New entity
        resolved.push(newEntity);
      }
    }

    return resolved;
  }

  /**
   * Extract action items and tasks from text
   */
  async extractActionItems(text: string): Promise<{
    actionItems: Array<{
      description: string;
      assignee?: string;
      dueDate?: string;
      priority: 'high' | 'medium' | 'low';
      status: 'pending' | 'in_progress' | 'completed';
    }>;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract action items and tasks from the given text. Return a JSON object with an actionItems array.
            
            Each action item should have:
            - description: What needs to be done
            - assignee: Who is responsible (if mentioned)
            - dueDate: When it's due (if mentioned)
            - priority: high, medium, or low
            - status: pending, in_progress, or completed (based on context)`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('Error extracting action items:', error);
      return { actionItems: [] };
    }
  }

  /**
   * Extract decisions and their rationale
   */
  async extractDecisions(text: string): Promise<{
    decisions: Array<{
      description: string;
      rationale: string;
      decisionMaker?: string;
      date?: string;
      impact: string;
    }>;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract decisions and their rationale from the given text. Return a JSON object with a decisions array.
            
            Each decision should have:
            - description: What was decided
            - rationale: Why it was decided
            - decisionMaker: Who made the decision (if mentioned)
            - date: When the decision was made (if mentioned)
            - impact: What impact this decision will have`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('Error extracting decisions:', error);
      return { decisions: [] };
    }
  }

  /**
   * Extract risks and mitigation strategies
   */
  async extractRisks(text: string): Promise<{
    risks: Array<{
      description: string;
      likelihood: 'high' | 'medium' | 'low';
      impact: 'high' | 'medium' | 'low';
      mitigation: string;
      owner?: string;
    }>;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract risks and mitigation strategies from the given text. Return a JSON object with a risks array.
            
            Each risk should have:
            - description: What the risk is
            - likelihood: high, medium, or low
            - impact: high, medium, or low
            - mitigation: How to mitigate or address the risk
            - owner: Who is responsible for managing this risk (if mentioned)`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('Error extracting risks:', error);
      return { risks: [] };
    }
  }
}

// Export singleton instance
export const knowledgeExtractionService = new KnowledgeExtractionService();
