/**
 * Voice Conversation Service
 * Real-time voice chat interface for AI agents
 */

import { eq, and, desc, asc, sql } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  voiceConversations,
  voiceSessions,
  voiceTranscripts,
  voiceSettings,
  type VoiceConversation,
  type VoiceSession,
  type VoiceTranscript,
  type VoiceSetting,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { notificationService } from './notification-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('VoiceConversation');

// Voice Provider Types
export type VoiceProvider = 'elevenlabs' | 'azure' | 'google' | 'amazon' | 'openai' | 'deepgram';
export type ConversationStatus = 'active' | 'paused' | 'ended' | 'error';
export type MessageRole = 'user' | 'agent' | 'system';

// Voice Configuration
export interface VoiceConfig {
  provider: VoiceProvider;
  voiceId: string;
  language: string;
  accent?: string;
  gender?: 'male' | 'female' | 'neutral';
  ageRange?: 'young' | 'middle' | 'senior';
  speakingRate: number; // 0.5 - 2.0
  pitch: number; // 0.5 - 2.0
  volume: number; // 0 - 1
  emotion?: 'neutral' | 'cheerful' | 'empathetic' | 'excited' | 'friendly' | 'professional' | 'serious';
  stability: number; // 0 - 1
  clarity: number; // 0 - 1
  style?: number; // 0 - 1 (ElevenLabs style)
  speakerBoost?: boolean;
}

// Conversation Settings
export interface ConversationSettings {
  autoStart: boolean;
  continuousListening: boolean;
  silenceTimeout: number; // seconds
  maxDuration: number; // minutes
  enableTranscription: boolean;
  saveAudio: boolean;
  languageDetection: boolean;
  interruptionHandling: 'polite' | 'immediate' | 'none';
  bargeInEnabled: boolean;
  vadSensitivity: 'low' | 'medium' | 'high';
  noiseSuppression: boolean;
  echoCancellation: boolean;
  autoGainControl: boolean;
}

// Conversation Message
export interface VoiceMessage {
  id: string;
  role: MessageRole;
  content: string;
  audioUrl?: string;
  duration?: number; // seconds
  timestamp: Date;
  metadata?: {
    confidence?: number;
    language?: string;
    emotion?: string;
    intent?: string;
    entities?: string[];
  };
}

// Conversation Session
export interface ConversationSession {
  id: string;
  agentId: string;
  userId: string;
  organizationId?: string;
  status: ConversationStatus;
  settings: ConversationSettings;
  voiceConfig: VoiceConfig;
  startedAt: Date;
  endedAt?: Date;
  duration?: number;
  messages: VoiceMessage[];
  metrics: {
    totalMessages: number;
    userMessages: number;
    agentMessages: number;
    totalAudioDuration: number;
    averageResponseTime: number;
    interruptions: number;
    errors: number;
  };
}

// Transcript Segment
export interface TranscriptSegment {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  startTime: number; // milliseconds from start
  endTime: number;
  confidence: number;
  words: {
    word: string;
    startTime: number;
    endTime: number;
    confidence: number;
  }[];
}

// Real-time Audio Stream
export interface AudioStream {
  sessionId: string;
  sampleRate: number;
  channels: number;
  format: 'pcm' | 'wav' | 'mp3' | 'ogg';
  bufferSize: number;
}

// Voice Command
export interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  parameters?: Record<string, any>;
  isActive: boolean;
  confidenceThreshold: number;
}

class VoiceConversationService {
  private activeSessions: Map<string, ConversationSession> = new Map();
  private audioBuffers: Map<string, Buffer[]> = new Map();

  // Initialize service
  async initialize(): Promise<void> {
    logger.info('Voice Conversation Service initialized');
  }

  // Start conversation session
  async startConversation(
    agentId: string,
    userId: string,
    voiceConfig: VoiceConfig,
    settings?: Partial<ConversationSettings>,
    organizationId?: string
  ): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      const sessionId = crypto.randomUUID();

      const defaultSettings: ConversationSettings = {
        autoStart: true,
        continuousListening: true,
        silenceTimeout: 5,
        maxDuration: 60,
        enableTranscription: true,
        saveAudio: true,
        languageDetection: false,
        interruptionHandling: 'polite',
        bargeInEnabled: true,
        vadSensitivity: 'medium',
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: true,
        ...settings,
      };

      // Create session record
      await db.insert(voiceSessions).values({
        id: sessionId,
        agentId,
        userId,
        organizationId,
        status: 'active',
        voiceConfig: JSON.stringify(voiceConfig),
        settings: JSON.stringify(defaultSettings),
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Initialize session
      const session: ConversationSession = {
        id: sessionId,
        agentId,
        userId,
        organizationId,
        status: 'active',
        settings: defaultSettings,
        voiceConfig,
        startedAt: new Date(),
        messages: [],
        metrics: {
          totalMessages: 0,
          userMessages: 0,
          agentMessages: 0,
          totalAudioDuration: 0,
          averageResponseTime: 0,
          interruptions: 0,
          errors: 0,
        },
      };

      this.activeSessions.set(sessionId, session);

      await logAudit({
        userId,
        organizationId: organizationId || 'system',
        action: 'voice_conversation_started',
        resource: 'voice_session',
        resourceId: sessionId,
        details: { agentId, provider: voiceConfig.provider },
      });

      // Send welcome message
      const welcomeMessage = await this.generateAgentResponse(
        sessionId,
        'Hello! I\'m ready to help you. How can I assist you today?',
        voiceConfig
      );

      return {
        success: true,
        sessionId,
      };
    } catch (error) {
      logger.error('Error starting conversation', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start conversation',
      };
    }
  }

  // Process user voice input
  async processVoiceInput(
    sessionId: string,
    audioData: Buffer,
    metadata?: {
      language?: string;
      timestamp?: Date;
    }
  ): Promise<{
    success: boolean;
    transcript?: string;
    response?: VoiceMessage;
    error?: string;
  }> {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        return { success: false, error: 'Session not found' };
      }

      if (session.status !== 'active') {
        return { success: false, error: 'Session is not active' };
      }

      // 1. Speech-to-Text
      const sttResult = await this.speechToText(audioData, {
        language: metadata?.language || session.voiceConfig.language,
        model: 'whisper-1',
      });

      if (!sttResult.success) {
        return { success: false, error: sttResult.error };
      }

      // 2. Add user message
      const userMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: sttResult.text!,
        timestamp: metadata?.timestamp || new Date(),
        metadata: {
          confidence: sttResult.confidence,
          language: sttResult.language,
        },
      };

      session.messages.push(userMessage);
      session.metrics.totalMessages++;
      session.metrics.userMessages++;

      // Save transcript
      await this.saveTranscript(sessionId, 'user', sttResult.text!, sttResult.confidence || 0);

      // 3. Generate AI response
      const agentStartTime = Date.now();
      const agentResponse = await this.generateAgentResponse(
        sessionId,
        sttResult.text!,
        session.voiceConfig,
        session.messages
      );

      const responseTime = Date.now() - agentStartTime;

      // 4. Add agent message
      const agentMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: agentResponse.text,
        audioUrl: agentResponse.audioUrl,
        duration: agentResponse.duration,
        timestamp: new Date(),
        metadata: {
          emotion: agentResponse.emotion,
          intent: agentResponse.intent,
        },
      };

      session.messages.push(agentMessage);
      session.metrics.totalMessages++;
      session.metrics.agentMessages++;
      session.metrics.totalAudioDuration += agentResponse.duration || 0;

      // Update average response time
      const totalResponses = session.metrics.agentMessages;
      session.metrics.averageResponseTime =
        (session.metrics.averageResponseTime * (totalResponses - 1) + responseTime) /
        totalResponses;

      // Save transcript
      await this.saveTranscript(sessionId, 'agent', agentResponse.text, 1.0);

      return {
        success: true,
        transcript: sttResult.text,
        response: agentMessage,
      };
    } catch (error) {
      logger.error('Error processing voice input', error as Error);
      const session = this.activeSessions.get(sessionId);
      if (session) {
        session.metrics.errors++;
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process voice input',
      };
    }
  }

  // Process text input (for hybrid chat)
  async processTextInput(
    sessionId: string,
    text: string,
    metadata?: {
      language?: string;
      timestamp?: Date;
    }
  ): Promise<{
    success: boolean;
    response?: VoiceMessage;
    error?: string;
  }> {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        return { success: false, error: 'Session not found' };
      }

      // Add user message
      const userMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: metadata?.timestamp || new Date(),
      };

      session.messages.push(userMessage);
      session.metrics.totalMessages++;
      session.metrics.userMessages++;

      // Save transcript
      await this.saveTranscript(sessionId, 'user', text, 1.0);

      // Generate AI response
      const agentStartTime = Date.now();
      const agentResponse = await this.generateAgentResponse(
        sessionId,
        text,
        session.voiceConfig,
        session.messages
      );

      const responseTime = Date.now() - agentStartTime;

      // Add agent message
      const agentMessage: VoiceMessage = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: agentResponse.text,
        audioUrl: agentResponse.audioUrl,
        duration: agentResponse.duration,
        timestamp: new Date(),
      };

      session.messages.push(agentMessage);
      session.metrics.totalMessages++;
      session.metrics.agentMessages++;
      session.metrics.totalAudioDuration += agentResponse.duration || 0;

      // Update average response time
      const totalResponses = session.metrics.agentMessages;
      session.metrics.averageResponseTime =
        (session.metrics.averageResponseTime * (totalResponses - 1) + responseTime) /
        totalResponses;

      // Save transcript
      await this.saveTranscript(sessionId, 'agent', agentResponse.text, 1.0);

      return {
        success: true,
        response: agentMessage,
      };
    } catch (error) {
      logger.error('Error processing text input', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process text input',
      };
    }
  }

  // End conversation
  async endConversation(
    sessionId: string,
    userId?: string,
    reason?: string
  ): Promise<{ success: boolean; summary?: any; error?: string }> {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        return { success: false, error: 'Session not found' };
      }

      const endedAt = new Date();
      const duration = endedAt.getTime() - session.startedAt.getTime();

      // Update session record
      await db.update(voiceSessions)
        .set({
          status: 'ended',
          endedAt,
          duration: Math.round(duration / 1000),
          metrics: JSON.stringify(session.metrics),
          updatedAt: new Date(),
        })
        .where(eq(voiceSessions.id, sessionId));

      // Create conversation summary
      await db.insert(voiceConversations).values({
        id: crypto.randomUUID(),
        sessionId,
        agentId: session.agentId,
        userId: session.userId,
        organizationId: session.organizationId,
        summary: this.generateConversationSummary(session),
        transcript: JSON.stringify(session.messages),
        metrics: JSON.stringify(session.metrics),
        tags: this.extractTags(session.messages),
        createdAt: new Date(),
      });

      // Cleanup
      this.activeSessions.delete(sessionId);
      this.audioBuffers.delete(sessionId);

      await logAudit({
        userId: userId || 'system',
        organizationId: session.organizationId || 'system',
        action: 'voice_conversation_ended',
        resource: 'voice_session',
        resourceId: sessionId,
        details: { duration, reason, messages: session.metrics.totalMessages },
      });

      return {
        success: true,
        summary: {
          sessionId,
          duration: Math.round(duration / 1000),
          totalMessages: session.metrics.totalMessages,
          userMessages: session.metrics.userMessages,
          agentMessages: session.metrics.agentMessages,
          averageResponseTime: Math.round(session.metrics.averageResponseTime),
        },
      };
    } catch (error) {
      logger.error('Error ending conversation', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to end conversation',
      };
    }
  }

  // Get conversation history
  async getConversationHistory(
    sessionId: string,
    options?: {
      limit?: number;
      before?: Date;
      after?: Date;
    }
  ): Promise<VoiceMessage[]> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      // Return from active session
      return session.messages.slice(-(options?.limit || 50));
    }

    // Get from database
    const transcripts = await db.select().from(voiceTranscripts)
      .where(eq(voiceTranscripts.sessionId, sessionId))
      .orderBy(desc(voiceTranscripts.timestamp))
      .limit(options?.limit || 50);

    return transcripts.map(t => ({
      id: t.id,
      role: t.speaker as MessageRole,
      content: t.text,
      timestamp: t.timestamp,
      metadata: {
        confidence: t.confidence,
      },
    }));
  }

  // Get user conversation history
  async getUserConversations(
    userId: string,
    options?: {
      limit?: number;
      agentId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<{
    sessionId: string;
    agentId: string;
    startedAt: Date;
    endedAt?: Date;
    duration?: number;
    summary?: string;
    messageCount: number;
  }[]> {
    let query = db.select().from(voiceSessions)
      .where(eq(voiceSessions.userId, userId))
      .orderBy(desc(voiceSessions.startedAt))
      .limit(options?.limit || 20);

    if (options?.agentId) {
      query = query.where(eq(voiceSessions.agentId, options.agentId));
    }
    if (options?.startDate && options?.endDate) {
      query = query.where(
        and(
          sql`${voiceSessions.startedAt} >= ${options.startDate}`,
          sql`${voiceSessions.startedAt} <= ${options.endDate}`
        )
      );
    }

    const sessions = await query;

    return sessions.map(s => ({
      sessionId: s.id,
      agentId: s.agentId,
      startedAt: s.startedAt,
      endedAt: s.endedAt || undefined,
      duration: s.duration || undefined,
      summary: s.summary || undefined,
      messageCount: s.metrics ? JSON.parse(s.metrics as string).totalMessages : 0,
    }));
  }

  // Update voice settings
  async updateVoiceSettings(
    agentId: string,
    voiceConfig: Partial<VoiceConfig>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const existing = await db.select().from(voiceSettings)
        .where(eq(voiceSettings.agentId, agentId));

      const settingsData = {
        agentId,
        provider: voiceConfig.provider,
        voiceId: voiceConfig.voiceId,
        language: voiceConfig.language,
        accent: voiceConfig.accent,
        gender: voiceConfig.gender,
        ageRange: voiceConfig.ageRange,
        speakingRate: voiceConfig.speakingRate,
        pitch: voiceConfig.pitch,
        volume: voiceConfig.volume,
        emotion: voiceConfig.emotion,
        stability: voiceConfig.stability,
        clarity: voiceConfig.clarity,
        style: voiceConfig.style,
        speakerBoost: voiceConfig.speakerBoost,
        updatedAt: new Date(),
      };

      if (existing.length > 0) {
        await db.update(voiceSettings)
          .set(settingsData)
          .where(eq(voiceSettings.agentId, agentId));
      } else {
        await db.insert(voiceSettings).values({
          ...settingsData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        });
      }

      await logAudit({
        userId: userId || 'system',
        action: 'voice_settings_updated',
        resource: 'voice_settings',
        resourceId: agentId,
        details: { updates: Object.keys(voiceConfig) },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating voice settings', error as Error);
      return { success: false, error: 'Failed to update voice settings' };
    }
  }

  // Get voice settings
  async getVoiceSettings(agentId: string): Promise<VoiceConfig | null> {
    const [settings] = await db.select().from(voiceSettings)
      .where(eq(voiceSettings.agentId, agentId));

    if (!settings) return null;

    return {
      provider: settings.provider as VoiceProvider,
      voiceId: settings.voiceId,
      language: settings.language,
      accent: settings.accent || undefined,
      gender: settings.gender as any,
      ageRange: settings.ageRange as any,
      speakingRate: settings.speakingRate || 1.0,
      pitch: settings.pitch || 1.0,
      volume: settings.volume || 1.0,
      emotion: settings.emotion as any,
      stability: settings.stability || 0.5,
      clarity: settings.clarity || 0.5,
      style: settings.style || undefined,
      speakerBoost: settings.speakerBoost || undefined,
    };
  }

  // Pause/Resume conversation
  async pauseConversation(sessionId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return { success: false, error: 'Session not found' };
    }

    session.status = 'paused';

    await db.update(voiceSessions)
      .set({ status: 'paused', updatedAt: new Date() })
      .where(eq(voiceSessions.id, sessionId));

    return { success: true };
  }

  async resumeConversation(sessionId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return { success: false, error: 'Session not found' };
    }

    session.status = 'active';

    await db.update(voiceSessions)
      .set({ status: 'active', updatedAt: new Date() })
      .where(eq(voiceSessions.id, sessionId));

    return { success: true };
  }

  // Private helper methods

  private async speechToText(
    audioData: Buffer,
    options: {
      language?: string;
      model?: string;
    }
  ): Promise<{ success: boolean; text?: string; confidence?: number; language?: string; error?: string }> {
    try {
      // This would integrate with STT provider (Whisper, Google Speech, etc.)
      // For now, return simulated response
      logger.info(`STT processing: ${audioData.length} bytes`);

      return {
        success: true,
        text: 'Simulated transcription from voice input',
        confidence: 0.95,
        language: options.language || 'en',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'STT failed',
      };
    }
  }

  private async generateAgentResponse(
    sessionId: string,
    input: string,
    voiceConfig: VoiceConfig,
    context?: VoiceMessage[]
  ): Promise<{
    text: string;
    audioUrl?: string;
    duration?: number;
    emotion?: string;
    intent?: string;
  }> {
    try {
      // This would integrate with AI service to generate response
      // Then use TTS to generate audio

      // Generate text response
      const textResponse = await this.generateTextResponse(input, context);

      // Generate audio
      const audioResult = await this.textToSpeech(textResponse, voiceConfig);

      return {
        text: textResponse,
        audioUrl: audioResult.audioUrl,
        duration: audioResult.duration,
        emotion: voiceConfig.emotion,
      };
    } catch (error) {
      logger.error('Error generating agent response', error as Error);
      return {
        text: 'I apologize, but I\'m having trouble processing your request right now.',
        duration: 3,
      };
    }
  }

  private async generateTextResponse(
    input: string,
    context?: VoiceMessage[]
  ): Promise<string> {
    // This would integrate with AI agent service
    // For now, return a simulated response
    const responses = [
      'I understand. Let me help you with that.',
      'That\'s a great question. Here\'s what I found...',
      'I can definitely assist you with this.',
      'Thanks for sharing that information.',
      'Let me look into this for you.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private async textToSpeech(
    text: string,
    voiceConfig: VoiceConfig
  ): Promise<{ audioUrl?: string; duration?: number }> {
    try {
      // This would integrate with TTS provider (ElevenLabs, Azure, etc.)
      logger.info(`TTS generating for: ${text.substring(0, 50)}...`);

      // Simulate audio generation
      const duration = Math.ceil(text.length / 15); // Rough estimate

      return {
        audioUrl: `https://api.kaydex.ai/voice/audio/${crypto.randomUUID()}.mp3`,
        duration,
      };
    } catch (error) {
      logger.error('TTS error', error as Error);
      return {};
    }
  }

  private async saveTranscript(
    sessionId: string,
    speaker: 'user' | 'agent',
    text: string,
    confidence: number
  ): Promise<void> {
    try {
      await db.insert(voiceTranscripts).values({
        id: crypto.randomUUID(),
        sessionId,
        speaker,
        text,
        confidence,
        timestamp: new Date(),
        createdAt: new Date(),
      });
    } catch (error) {
      logger.error('Error saving transcript', error as Error);
    }
  }

  private generateConversationSummary(session: ConversationSession): string {
    const topics = this.extractTopics(session.messages);
    const sentiment = this.analyzeSentiment(session.messages);

    return `Conversation with ${session.metrics.totalMessages} messages. ` +
      `Topics: ${topics.join(', ')}. ` +
      `Sentiment: ${sentiment}. ` +
      `Duration: ${Math.round((Date.now() - session.startedAt.getTime()) / 1000 / 60)} minutes.`;
  }

  private extractTopics(messages: VoiceMessage[]): string[] {
    // Simplified topic extraction
    const allText = messages.map(m => m.content).join(' ');
    const keywords = ['help', 'question', 'support', 'issue', 'product', 'service', 'price'];
    return keywords.filter(k => allText.toLowerCase().includes(k));
  }

  private analyzeSentiment(messages: VoiceMessage[]): string {
    // Simplified sentiment analysis
    const positive = ['great', 'good', 'excellent', 'thanks', 'love'];
    const negative = ['bad', 'terrible', 'awful', 'hate', 'problem', 'issue'];

    const allText = messages.map(m => m.content).join(' ').toLowerCase();
    const posCount = positive.filter(w => allText.includes(w)).length;
    const negCount = negative.filter(w => allText.includes(w)).length;

    if (posCount > negCount) return 'positive';
    if (negCount > posCount) return 'negative';
    return 'neutral';
  }

  private extractTags(messages: VoiceMessage[]): string[] {
    const tags = new Set<string>();

    // Extract intent tags
    const intents = {
      'support': ['help', 'issue', 'problem', 'support'],
      'sales': ['buy', 'price', 'purchase', 'order'],
      'information': ['what', 'how', 'when', 'where', 'why'],
    };

    const allText = messages.map(m => m.content).join(' ').toLowerCase();

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(k => allText.includes(k))) {
        tags.add(intent);
      }
    }

    return Array.from(tags);
  }

  // Get available voices
  async getAvailableVoices(provider: VoiceProvider): Promise<{
    id: string;
    name: string;
    gender: string;
    language: string;
    previewUrl?: string;
    description?: string;
  }[]> {
    // This would fetch from voice provider API
    const voices: Record<VoiceProvider, any[]> = {
      elevenlabs: [
        { id: 'adam', name: 'Adam', gender: 'male', language: 'en', description: 'Professional, authoritative' },
        { id: 'antoni', name: 'Antoni', gender: 'male', language: 'en', description: 'Young, enthusiastic' },
        { id: 'bella', name: 'Bella', gender: 'female', language: 'en', description: 'Warm, friendly' },
        { id: 'elli', name: 'Elli', gender: 'female', language: 'en', description: 'Professional, clear' },
      ],
      azure: [
        { id: 'en-US-AriaNeural', name: 'Aria', gender: 'female', language: 'en-US' },
        { id: 'en-US-GuyNeural', name: 'Guy', gender: 'male', language: 'en-US' },
        { id: 'en-GB-SoniaNeural', name: 'Sonia', gender: 'female', language: 'en-GB' },
      ],
      google: [
        { id: 'en-US-Standard-A', name: 'US English A', gender: 'male', language: 'en-US' },
        { id: 'en-US-Standard-C', name: 'US English C', gender: 'female', language: 'en-US' },
      ],
      amazon: [
        { id: 'Joanna', name: 'Joanna', gender: 'female', language: 'en-US' },
        { id: 'Matthew', name: 'Matthew', gender: 'male', language: 'en-US' },
      ],
      openai: [
        { id: 'alloy', name: 'Alloy', gender: 'neutral', language: 'en' },
        { id: 'echo', name: 'Echo', gender: 'male', language: 'en' },
        { id: 'fable', name: 'Fable', gender: 'neutral', language: 'en' },
        { id: 'onyx', name: 'Onyx', gender: 'male', language: 'en' },
        { id: 'nova', name: 'Nova', gender: 'female', language: 'en' },
        { id: 'shimmer', name: 'Shimmer', gender: 'female', language: 'en' },
      ],
      deepgram: [
        { id: 'aura', name: 'Aura', gender: 'female', language: 'en' },
      ],
    };

    return voices[provider] || [];
  }
}

// Export singleton instance
export const voiceConversationService = new VoiceConversationService();
