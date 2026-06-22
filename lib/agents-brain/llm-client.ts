/**
 * LLM Client for Agents Brain System
 * Provides real LLM integration for document analysis
 * Supports OpenAI, Anthropic, and other providers
 */

export interface LLMAnalysisResult {
  summary: string;
  concepts: string[];
  categories: string[];
  tags: string[];
  related: string[];
  claims: string[];
  confidence: number;
}

export interface LLMClientConfig {
  provider: 'openai' | 'anthropic' | 'gemini' | 'groq';
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

export class BrainLLMClient {
  private config: LLMClientConfig;

  constructor(config: LLMClientConfig) {
    this.config = config;
  }

  /**
   * Analyze document content using LLM
   * Extracts structured information for the brain
   */
  async analyzeDocument(sourcePath: string, content: string): Promise<LLMAnalysisResult> {
    const prompt = this.buildAnalysisPrompt(sourcePath, content);
    
    try {
      const response = await this.callLLM(prompt);
      return this.parseAnalysisResponse(response);
    } catch (error) {
      console.error('LLM analysis failed:', error);
      // Return fallback analysis if LLM fails
      return this.getFallbackAnalysis(content);
    }
  }

  /**
   * Build the analysis prompt for the LLM
   */
  private buildAnalysisPrompt(sourcePath: string, content: string): string {
    const truncatedContent = content.length > 15000 
      ? content.substring(0, 15000) + '... (content truncated)' 
      : content;

    return `You are a knowledge extraction specialist. Analyze the following document and extract structured information for a knowledge base.

Source: ${sourcePath}

Content:
${truncatedContent}

Please extract and provide the following in JSON format:
{
  "summary": "A 1-2 sentence summary of the document",
  "concepts": ["key concept 1", "key concept 2", ...],
  "categories": ["primary category", "secondary category", ...],
  "tags": ["descriptive tag 1", "descriptive tag 2", ...],
  "related": ["related topic 1", "related topic 2", ...],
  "claims": ["important claim or fact 1", "important claim or fact 2", ...],
  "confidence": 0.95
}

Guidelines:
- Extract 5-10 key concepts/entities
- Assign 1-3 relevant categories
- Add 5-10 descriptive tags
- Suggest 3-5 related topics
- Extract 3-5 important claims or facts
- Confidence should reflect how well-structured and complete the information is (0-1)
- Be specific and precise in your extractions`;
  }

  /**
   * Call the LLM API
   */
  private async callLLM(prompt: string): Promise<string> {
    switch (this.config.provider) {
      case 'openai':
        return this.callOpenAI(prompt);
      case 'anthropic':
        return this.callAnthropic(prompt);
      case 'gemini':
        return this.callGemini(prompt);
      case 'groq':
        return this.callGroq(prompt);
      default:
        throw new Error(`Unsupported LLM provider: ${this.config.provider}`);
    }
  }

  /**
   * Call OpenAI API
   */
  private async callOpenAI(prompt: string): Promise<string> {
    const baseUrl = this.config.baseUrl || 'https://api.openai.com/v1';
    const model = this.config.model || 'gpt-4o-mini';

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a knowledge extraction specialist. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Call Anthropic API
   */
  private async callAnthropic(prompt: string): Promise<string> {
    const model = this.config.model || 'claude-3-haiku-20240307';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        system: 'You are a knowledge extraction specialist. Always respond with valid JSON.',
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Call Google Gemini API
   */
  private async callGemini(prompt: string): Promise<string> {
    const model = this.config.model || 'gemini-pro';
    const baseUrl = this.config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';

    const response = await fetch(`${baseUrl}/${model}:generateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a knowledge extraction specialist. Always respond with valid JSON.\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  /**
   * Call Groq API
   */
  private async callGroq(prompt: string): Promise<string> {
    const model = this.config.model || 'mixtral-8x7b-32768';
    const baseUrl = this.config.baseUrl || 'https://api.groq.com/openai/v1';

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a knowledge extraction specialist. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Parse LLM response into structured format
   */
  private parseAnalysisResponse(response: string): LLMAnalysisResult {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          summary: parsed.summary || '',
          concepts: Array.isArray(parsed.concepts) ? parsed.concepts : [],
          categories: Array.isArray(parsed.categories) ? parsed.categories : [],
          tags: Array.isArray(parsed.tags) ? parsed.tags : [],
          related: Array.isArray(parsed.related) ? parsed.related : [],
          claims: Array.isArray(parsed.claims) ? parsed.claims : [],
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.8,
        };
      }
      
      // Fallback: parse entire response as JSON
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      throw new Error('Invalid JSON response from LLM');
    }
  }

  /**
   * Fallback analysis when LLM fails
   */
  private getFallbackAnalysis(content: string): LLMAnalysisResult {
    // Simple keyword extraction as fallback
    const words = content.toLowerCase().split(/\s+/);
    const wordFreq = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });

    const topWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    return {
      summary: content.substring(0, 200) + '...',
      concepts: topWords.slice(0, 5),
      categories: ['general'],
      tags: topWords,
      related: [],
      claims: [],
      confidence: 0.5,
    };
  }

  /**
   * Create LLM client from environment variables
   */
  static fromEnvironment(): BrainLLMClient {
    const provider = (process.env.BRAIN_LLM_PROVIDER || 'openai') as LLMClientConfig['provider'];
    
    let apiKey: string;
    let model: string | undefined;
    let baseUrl: string | undefined;

    switch (provider) {
      case 'openai':
        apiKey = process.env.OPENAI_API_KEY || '';
        model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
        baseUrl = process.env.AI_API_BASE_URL;
        break;
      case 'anthropic':
        apiKey = process.env.ANTHROPIC_API_KEY || '';
        model = process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307';
        break;
      case 'gemini':
        apiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
        model = process.env.GEMINI_MODEL || 'gemini-pro';
        break;
      case 'groq':
        apiKey = process.env.GROQ_API_KEY || '';
        model = process.env.GROQ_MODEL || 'mixtral-8x7b-32768';
        break;
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }

    if (!apiKey) {
      throw new Error(`API key not found for provider: ${provider}`);
    }

    return new BrainLLMClient({ provider, apiKey, model, baseUrl });
  }
}
