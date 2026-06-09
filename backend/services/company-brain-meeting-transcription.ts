/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import OpenAI from 'openai';

/**
 * Company Brain Meeting Transcription Service
 * Automated recording, transcription, and indexing of video calls
 * Preserves verbal agreements and meeting insights
 */

export interface MeetingTranscription {
  id: string;
  organizationId: string;
  platform: 'zoom' | 'google-meet' | 'teams' | 'webex';
  meetingId: string;
  meetingTitle: string;
  meetingUrl?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  hostId: string;
  hostName: string;
  participants: Array<{
    id: string;
    name: string;
    email?: string;
    joinTime: Date;
    leaveTime?: Date;
    speakingTime?: number;
  }>;
  transcription?: string;
  summary?: string;
  actionItems: Array<{
    task: string;
    assignedTo?: string;
    dueDate?: Date;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
  decisions: Array<{
    decision: string;
    madeBy?: string;
    timestamp: Date;
    rationale?: string;
  }>;
  keyTopics: string[];
  embeddingVector?: number[];
  recordingUrl?: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingTranscriptionConfig {
  organizationId: string;
  platforms: {
    zoom?: {
      enabled: boolean;
      apiKey: string;
      apiSecret: string;
      autoRecord: boolean;
    };
    googleMeet?: {
      enabled: boolean;
      serviceAccountKey: string;
      autoRecord: boolean;
    };
    teams?: {
      enabled: boolean;
      tenantId: string;
      clientId: string;
      clientSecret: string;
      autoRecord: boolean;
    };
    webex?: {
      enabled: boolean;
      accessToken: string;
      autoRecord: boolean;
    };
  };
  autoTranscribe: boolean;
  autoSummarize: boolean;
  extractActionItems: boolean;
  extractDecisions: boolean;
  retentionDays: number;
}

export class CompanyBrainMeetingTranscriptionService {
  private openai: OpenAI;
  private configs: Map<string, MeetingTranscriptionConfig> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Configure meeting transcription for an organization
   */
  configureTranscription(config: MeetingTranscriptionConfig): void {
    this.configs.set(config.organizationId, config);
  }

  /**
   * Get configuration for an organization
   */
  getConfig(organizationId: string): MeetingTranscriptionConfig | undefined {
    return this.configs.get(organizationId);
  }

  /**
   * Start recording a meeting
   */
  async startRecording(
    organizationId: string,
    platform: 'zoom' | 'google-meet' | 'teams' | 'webex',
    meetingId: string
  ): Promise<{ recordingId: string; status: string }> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found for organization');
    }

    // In production, call platform-specific API to start recording
    console.log(`Starting recording for ${platform} meeting ${meetingId}`);
    
    return {
      recordingId: crypto.randomUUID(),
      status: 'recording',
    };
  }

  /**
   * Stop recording a meeting
   */
  async stopRecording(
    organizationId: string,
    platform: 'zoom' | 'google-meet' | 'teams' | 'webex',
    recordingId: string
  ): Promise<{ status: string }> {
    console.log(`Stopping recording ${recordingId}`);
    
    return { status: 'stopped' };
  }

  /**
   * Process a meeting recording
   */
  async processMeeting(
    organizationId: string,
    platform: 'zoom' | 'google-meet' | 'teams' | 'webex',
    meetingData: any
  ): Promise<MeetingTranscription> {
    const config = this.configs.get(organizationId);
    
    const transcription: MeetingTranscription = {
      id: crypto.randomUUID(),
      organizationId,
      platform,
      meetingId: meetingData.meetingId,
      meetingTitle: meetingData.meetingTitle,
      meetingUrl: meetingData.meetingUrl,
      startTime: new Date(meetingData.startTime),
      endTime: meetingData.endTime ? new Date(meetingData.endTime) : undefined,
      duration: meetingData.duration,
      hostId: meetingData.hostId,
      hostName: meetingData.hostName,
      participants: meetingData.participants || [],
      actionItems: [],
      decisions: [],
      keyTopics: [],
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save initial record
    await this.saveTranscription(transcription);

    // Transcribe if enabled
    if (config?.autoTranscribe && meetingData.recordingUrl) {
      transcription.transcription = await this.transcribeAudio(meetingData.recordingUrl);
      transcription.recordingUrl = meetingData.recordingUrl;
    }

    // Summarize if enabled
    if (config?.autoSummarize && transcription.transcription) {
      transcription.summary = await this.generateSummary(transcription.transcription);
    }

    // Extract action items if enabled
    if (config?.extractActionItems && transcription.transcription) {
      transcription.actionItems = await this.extractActionItems(transcription.transcription);
    }

    // Extract decisions if enabled
    if (config?.extractDecisions && transcription.transcription) {
      transcription.decisions = await this.extractDecisions(transcription.transcription);
    }

    // Extract key topics
    if (transcription.transcription) {
      transcription.keyTopics = await this.extractKeyTopics(transcription.transcription);
    }

    // Generate embedding
    if (transcription.summary || transcription.transcription) {
      const text = transcription.summary || transcription.transcription || '';
      transcription.embeddingVector = await this.generateEmbedding(text);
    }

    transcription.status = 'completed';
    transcription.updatedAt = new Date();

    // Update record
    await this.updateTranscription(transcription);

    return transcription;
  }

  /**
   * Transcribe audio using OpenAI Whisper
   */
  private async transcribeAudio(audioUrl: string): Promise<string> {
    try {
      // In production, download audio file and transcribe
      const response = await this.openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: await this.fetchAudioFile(audioUrl),
      });

      return response.text;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      return '';
    }
  }

  /**
   * Fetch audio file from URL
   */
  private async fetchAudioFile(url: string): Promise<File> {
    // In production, fetch the audio file
    throw new Error('Audio file fetch not implemented');
  }

  /**
   * Generate meeting summary
   */
  private async generateSummary(transcription: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Generate a concise summary of the meeting. Include key points discussed, main topics, and overall outcomes.',
          },
          {
            role: 'user',
            content: transcription,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating summary:', error);
      return '';
    }
  }

  /**
   * Extract action items from transcription
   */
  private async extractActionItems(transcription: string): Promise<MeetingTranscription['actionItems']> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract action items from the meeting transcription. For each action item, identify:
            - The task description
            - Who it's assigned to (if mentioned)
            - Due date (if mentioned)
            
            Return as JSON array.`,
          },
          {
            role: 'user',
            content: transcription,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.actionItems || []).map((item: any) => ({
        task: item.task,
        assignedTo: item.assignedTo,
        dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
        status: 'pending',
      }));
    } catch (error) {
      console.error('Error extracting action items:', error);
      return [];
    }
  }

  /**
   * Extract decisions from transcription
   */
  private async extractDecisions(transcription: string): Promise<MeetingTranscription['decisions']> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Extract decisions made during the meeting. For each decision, identify:
            - The decision itself
            - Who made it (if mentioned)
            - The rationale (if provided)
            
            Return as JSON array.`,
          },
          {
            role: 'user',
            content: transcription,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return (result.decisions || []).map((item: any) => ({
        decision: item.decision,
        madeBy: item.madeBy,
        timestamp: new Date(), // Would need to extract from transcription
        rationale: item.rationale,
      }));
    } catch (error) {
      console.error('Error extracting decisions:', error);
      return [];
    }
  }

  /**
   * Extract key topics from transcription
   */
  private async extractKeyTopics(transcription: string): Promise<string[]> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Extract 5-10 key topics discussed in the meeting. Return as JSON array of strings.',
          },
          {
            role: 'user',
            content: transcription,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      
      return result.topics || [];
    } catch (error) {
      console.error('Error extracting topics:', error);
      return [];
    }
  }

  /**
   * Generate embedding for search
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      return [];
    }
  }

  /**
   * Save transcription to database
   */
  private async saveTranscription(transcription: MeetingTranscription): Promise<void> {
    // In production, save to database using drizzle
    console.log('Saving transcription:', transcription.id);
  }

  /**
   * Update transcription in database
   */
  private async updateTranscription(transcription: MeetingTranscription): Promise<void> {
    // In production, update in database
    console.log('Updating transcription:', transcription.id);
  }

  /**
   * Get transcription by ID
   */
  async getTranscription(transcriptionId: string): Promise<MeetingTranscription | null> {
    // In production, query database
    return null;
  }

  /**
   * Search transcriptions
   */
  async searchTranscriptions(
    organizationId: string,
    query: string,
    filters?: {
      platform?: 'zoom' | 'google-meet' | 'teams' | 'webex';
      hostId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<MeetingTranscription[]> {
    // In production, perform vector search with filters
    console.log(`Searching transcriptions for ${organizationId}: ${query}`);
    
    return [];
  }

  /**
   * Get transcriptions for a user
   */
  async getUserTranscriptions(
    organizationId: string,
    userId: string,
    limit: number = 50
  ): Promise<MeetingTranscription[]> {
    // In production, query database
    console.log(`Getting transcriptions for user ${userId}`);
    
    return [];
  }

  /**
   * Get meeting statistics
   */
  async getMeetingStatistics(organizationId: string): Promise<{
    totalMeetings: number;
    meetingsByPlatform: Record<string, number>;
    totalDuration: number;
    totalParticipants: number;
    actionItemsCreated: number;
    decisionsCaptured: number;
    avgMeetingDuration: number;
  }> {
    // In production, query database
    return {
      totalMeetings: 0,
      meetingsByPlatform: {},
      totalDuration: 0,
      totalParticipants: 0,
      actionItemsCreated: 0,
      decisionsCaptured: 0,
      avgMeetingDuration: 0,
    };
  }

  /**
   * Delete old transcriptions based on retention policy
   */
  async applyRetentionPolicy(organizationId: string): Promise<number> {
    const config = this.configs.get(organizationId);
    if (!config) {
      throw new Error('No configuration found');
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.retentionDays);

    // In production, delete from database
    console.log(`Deleting transcriptions older than ${cutoffDate}`);
    
    return 0;
  }
}

// Export singleton instance
export const companyBrainMeetingTranscriptionService = new CompanyBrainMeetingTranscriptionService();
