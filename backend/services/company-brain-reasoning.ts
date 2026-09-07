import { db } from '../db/connection';
import { aiReasoningLogs, knowledgeNodes } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import OpenAI from 'openai';
import crypto from 'crypto';

export interface CompareInput {
  documents: Array<{ id: string; title: string; content: string }>;
  aspects?: string[];
}

export interface CompareResult {
  similarities: string[];
  differences: string[];
  contradictions: Array<{ text: string; foundIn: string[]; severity: 'high' | 'medium' | 'low' }>;
  summary: string;
  recommendations: string[];
}

export interface SummarizeInput {
  content: string;
  maxLength?: number;
  format?: 'bullet' | 'paragraph' | 'executive';
}

export interface ContradictionResult {
  contradictions: Array<{
    statement1: string;
    statement2: string;
    source1: string;
    source2: string;
    severity: 'high' | 'medium' | 'low';
    resolution?: string;
  }>;
}

export interface RecommendationInput {
  context: string;
  type: 'action' | 'improvement' | 'decision' | 'risk';
  constraints?: string[];
}

export interface ReportInput {
  title: string;
  data: any;
  format: 'executive' | 'detailed' | 'analytical';
}

export class CompanyBrainReasoningService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async compare(input: CompareInput): Promise<CompareResult> {
    const systemPrompt = `You are an AI reasoning engine. Compare the given documents and identify:
1. Key similarities
2. Key differences
3. Contradictions (statements that conflict)
4. Overall summary
5. Recommendations

Return a JSON object with: similarities (string[]), differences (string[]), contradictions (array of {text, foundIn, severity}), summary (string), recommendations (string[])`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(input.documents.map(d => ({ title: d.title, content: d.content.substring(0, 4000) }))) },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');

      await this.logReasoning('compare', input, result);
      return result;
    } catch {
      return {
        similarities: [],
        differences: ['Analysis temporarily unavailable'],
        contradictions: [],
        summary: 'Comparison could not be completed',
        recommendations: ['Try again later'],
      };
    }
  }

  async summarize(input: SummarizeInput): Promise<string> {
    const formatGuide = {
      bullet: 'Return bullet points covering the key information',
      paragraph: 'Return a coherent paragraph summary',
      executive: 'Return an executive summary with key findings, implications, and recommendations',
    };

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: `${formatGuide[input.format || 'paragraph']}\nMax length: ${input.maxLength || 500} characters. Return only the summary text.` },
          { role: 'user', content: input.content.substring(0, 8000) },
        ],
        temperature: 0.3,
      });

      const result = completion.choices[0].message.content || '';
      await this.logReasoning('summarize', input, { summary: result });
      return result;
    } catch {
      return input.content.substring(0, input.maxLength || 500);
    }
  }

  async detectContradictions(input: CompareInput): Promise<ContradictionResult> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Analyze these documents for contradictions. A contradiction is when two statements cannot both be true.
Return JSON: { contradictions: [{ statement1, statement2, source1, source2, severity: "high"|"medium"|"low", resolution? }] }`,
          },
          { role: 'user', content: JSON.stringify(input.documents.map(d => ({ id: d.id, title: d.title, content: d.content.substring(0, 4000) }))) },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      await this.logReasoning('contradiction', input, result);
      return result;
    } catch {
      return { contradictions: [] };
    }
  }

  async recommend(input: RecommendationInput): Promise<{
    recommendations: Array<{ title: string; description: string; impact: 'high' | 'medium' | 'low'; effort: 'high' | 'medium' | 'low'; reasoning: string }>;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a business AI advisor. Based on the context and type "${input.type}", generate actionable recommendations.
Return JSON: { recommendations: [{ title, description, impact: "high"|"medium"|"low", effort: "high"|"medium"|"low", reasoning }] }`,
          },
          { role: 'user', content: JSON.stringify({ context: input.context, type: input.type, constraints: input.constraints }) },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      await this.logReasoning('recommend', input, result);
      return result;
    } catch {
      return { recommendations: [] };
    }
  }

  async generateReport(input: ReportInput): Promise<string> {
    const formatGuide = {
      executive: 'Write a concise executive summary (1 paragraph) highlighting key points, conclusions, and recommended actions.',
      detailed: 'Write a detailed report with sections: Executive Summary, Analysis, Findings, Recommendations, Conclusion.',
      analytical: 'Write an analytical report with: Data Overview, Analysis Methodology, Key Insights, Statistical Findings, Strategic Implications.',
    };

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: `Generate a ${input.format} report titled "${input.title}".\n${formatGuide[input.format]}` },
          { role: 'user', content: JSON.stringify(input.data).substring(0, 8000) },
        ],
        temperature: 0.3,
      });

      const result = completion.choices[0].message.content || '';
      await this.logReasoning('report', input, { report: result.substring(0, 500) });
      return result;
    } catch {
      return `# ${input.title}\n\nReport generation temporarily unavailable.`;
    }
  }

  async answerQuestion(question: string, context: Array<{ id: string; title: string; content: string; score: number }>): Promise<{
    answer: string;
    sources: Array<{ id: string; title: string; relevance: number }>;
    confidence: number;
    followUpQuestions: string[];
  }> {
    const contextStr = context.map(c => `[Source: ${c.title} (relevance: ${(c.score * 100).toFixed(0)}%)]\n${c.content.substring(0, 2000)}`).join('\n\n');

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are the Company Brain AI. Answer questions based ONLY on the provided context.
If the context doesn't contain enough information, say so.
Include citations like [Source: Document Title].
Return JSON: { answer: string, confidence: number (0-1), followUpQuestions: string[] }`,
          },
          { role: 'user', content: `Context:\n${contextStr}\n\nQuestion: ${question}` },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content || '{}');
      await this.logReasoning('question', { question, contextCount: context.length }, result);
      return {
        answer: result.answer || 'Unable to answer based on available knowledge.',
        sources: context.map(c => ({ id: c.id, title: c.title, relevance: c.score })),
        confidence: result.confidence || 0.5,
        followUpQuestions: result.followUpQuestions || [],
      };
    } catch {
      return {
        answer: 'Analysis temporarily unavailable.',
        sources: [],
        confidence: 0,
        followUpQuestions: [],
      };
    }
  }

  private async logReasoning(type: string, input: any, output: any): Promise<void> {
    try {
      await db.insert(aiReasoningLogs).values({
        id: crypto.randomUUID(),
        organizationId: input.organizationId || '00000000-0000-0000-0000-000000000000',
        reasoningType: type,
        inputData: JSON.stringify(input),
        outputData: JSON.stringify(output),
        modelUsed: 'gpt-4-turbo-preview',
        processingTime: 0,
        confidence: output.confidence || null,
        metadata: JSON.stringify({}),
        createdAt: new Date(),
      });
    } catch {}
  }

  async getReasoningHistory(organizationId: string, limit = 50): Promise<any[]> {
    try {
      return await db.select()
        .from(aiReasoningLogs)
        .where(eq(aiReasoningLogs.organizationId, organizationId))
        .orderBy(desc(aiReasoningLogs.createdAt))
        .limit(limit);
    } catch { return []; }
  }
}

export const companyBrainReasoningService = new CompanyBrainReasoningService();
