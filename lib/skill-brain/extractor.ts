import {
  ContentType,
  SkillCategory,
  CompetencyLevel,
  SkillEntry,
  SkillSource,
  SkillPerson,
  SkillRelation,
  SkillRelationshipType,
  SkillExtractResult,
  SkillMd,
} from './types';

export interface ExtractionOptions {
  sourceTitle?: string;
  sourcePath?: string;
  sourceUrl?: string;
  confidence?: number;
  personName?: string;
  personEmail?: string;
}

export class SkillExtractor {
  /**
   * Extract skills from text content using heuristic pattern matching
   * This provides a baseline extraction without requiring an LLM call.
   */
  extractFromText(
    text: string,
    contentType: ContentType,
    options: ExtractionOptions = {}
  ): Partial<SkillMd> {
    const source: SkillSource = {
      id: this.generateId(),
      type: contentType,
      title: options.sourceTitle || 'Untitled',
      path: options.sourcePath || '',
      url: options.sourceUrl,
      createdAt: new Date().toISOString(),
      extractedAt: new Date().toISOString(),
      confidence: options.confidence || 0.7,
    };

    const skills: SkillEntry[] = [];
    const people: SkillPerson[] = [];
    const relationships: SkillRelation[] = [];

    this.extractTechnicalSkills(text, source, skills);
    this.extractPeople(text, source, people, options);
    this.extractRelationships(skills, people, relationships);

    const summary = this.generateSummary(text);

    return {
      title: options.sourceTitle || summary.slice(0, 80),
      summary,
      contentType,
      skills,
      people,
      relationships,
      metadata: {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sourceCount: 1,
        skillCount: skills.length,
        personCount: people.length,
        transferReadiness: 'not_ready',
        coverageScore: this.calculateCoverage(skills),
        riskScore: this.calculateRisk(skills),
      },
      frontmatter: {
        title: options.sourceTitle || summary.slice(0, 80),
        contentType,
        generatedAt: new Date().toISOString(),
        source: options.sourcePath || '',
      },
      raw: text,
    };
  }

  /**
   * Analyze skill entry for transfer readiness
   */
  analyzeTransferReadiness(skill: SkillEntry): {
    readiness: 'not_ready' | 'partially_ready' | 'ready' | 'fully_ready';
    gaps: string[];
  } {
    const gaps: string[] = [];

    if (skill.sources.length === 0) gaps.push('No source documentation');
    if (skill.evidence.length === 0) gaps.push('No evidence of application');
    if (!skill.lastPracticed) gaps.push('Last practiced date unknown');
    if (skill.verifiedBy.length === 0) gaps.push('Not verified by peer/expert');
    if (skill.yearsOfExperience < 1) gaps.push('Less than 1 year experience');

    if (gaps.length === 0) return { readiness: 'fully_ready', gaps };
    if (gaps.length <= 1) return { readiness: 'ready', gaps };
    if (gaps.length <= 2) return { readiness: 'partially_ready', gaps };
    return { readiness: 'not_ready', gaps };
  }

  /**
   * Extract skill relationships from a set of skills
   */
  extractSkillRelationships(skills: SkillEntry[]): SkillRelation[] {
    const relations: SkillRelation[] = [];
    const skillMap = new Map(skills.map(s => [s.name.toLowerCase(), s]));

    for (const skill of skills) {
      for (const relatedName of skill.relatedSkills) {
        const target = skillMap.get(relatedName.toLowerCase());
        if (target && target.id !== skill.id) {
          relations.push({
            id: this.generateId(),
            sourceSkillId: skill.id,
            targetSkillId: target.id,
            type: SkillRelationshipType.RELATED,
            strength: 0.5,
          });
        }
      }
    }

    return relations;
  }

  /**
   * Merge two partial skill MDs into one
   */
  mergeSkillMds(existing: Partial<SkillMd>, incoming: Partial<SkillMd>): Partial<SkillMd> {
    const existingSkills = existing.skills || [];
    const incomingSkills = incoming.skills || [];
    const skillMap = new Map<string, SkillEntry>();

    for (const s of existingSkills) skillMap.set(s.name.toLowerCase(), s);
    for (const s of incomingSkills) {
      const key = s.name.toLowerCase();
      const existing = skillMap.get(key);
      if (existing) {
        existing.sources = [...new Set([...existing.sources, ...s.sources])];
        existing.evidence = [...new Set([...existing.evidence, ...s.evidence])];
        existing.tags = [...new Set([...existing.tags, ...s.tags])];
        existing.confidence = Math.max(existing.confidence, s.confidence);
        if (s.competencyLevel > existing.competencyLevel) {
          existing.competencyLevel = s.competencyLevel;
        }
        existing.lastPracticed = s.lastPracticed > existing.lastPracticed
          ? s.lastPracticed
          : existing.lastPracticed;
        existing.projectsApplied = [...new Set([...existing.projectsApplied, ...s.projectsApplied])];
        existing.verifiedBy = [...new Set([...existing.verifiedBy, ...s.verifiedBy])];
      } else {
        skillMap.set(key, s);
      }
    }

    const mergedSkills = Array.from(skillMap.values());

    const existingPeople = existing.people || [];
    const incomingPeople = incoming.people || [];
    const personMap = new Map<string, SkillPerson>();
    for (const p of existingPeople) personMap.set(p.email.toLowerCase(), p);
    for (const p of incomingPeople) personMap.set(p.email.toLowerCase(), p);
    const mergedPeople = Array.from(personMap.values());

    return {
      skills: mergedSkills,
      people: mergedPeople,
      metadata: {
        version: '1.0.0',
        generatedAt: existing.metadata?.generatedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sourceCount: (existing.metadata?.sourceCount || 0) + (incoming.metadata?.sourceCount || 0),
        skillCount: mergedSkills.length,
        personCount: mergedPeople.length,
        transferReadiness: 'not_ready',
        coverageScore: this.calculateCoverage(mergedSkills),
        riskScore: this.calculateRisk(mergedSkills),
      },
    };
  }

  private extractTechnicalSkills(
    text: string,
    source: SkillSource,
    skills: SkillEntry[]
  ): void {
    const patterns: Array<{ regex: RegExp; category: SkillCategory }> = [
      { regex: /\b(JavaScript|TypeScript|Python|Java|Go|Rust|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Scala|Elixir)\b/gi, category: SkillCategory.LANGUAGE },
      { regex: /\b(React|Vue|Angular|Svelte|Next\.?js|Nuxt|Remix|Express|Django|Flask|FastAPI|Spring|Laravel|Rails)\b/gi, category: SkillCategory.FRAMEWORK },
      { regex: /\b(AWS|Azure|GCP|Heroku|DigitalOcean|Netlify|Vercel|Cloudflare)\b/gi, category: SkillCategory.PLATFORM },
      { regex: /\b(Docker|Kubernetes|Terraform|Ansible|Jenkins|GitHub Actions|CircleCI|ArgoCD)\b/gi, category: SkillCategory.TOOL },
      { regex: /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|Cassandra|DynamoDB|BigQuery|Snowflake)\b/gi, category: SkillCategory.TECHNICAL },
      { regex: /\b(agile|scrum|kanban|leadership|management|mentoring|coaching)\b/gi, category: SkillCategory.MANAGEMENT },
      { regex: /\b(graphql|rest|grpc|websocket|oauth|jwt|http)\b/gi, category: SkillCategory.TECHNICAL },
      { regex: /\b(machine learning|deep learning|nlp|computer vision|data science|analytics|statistics)\b/gi, category: SkillCategory.DOMAIN },
    ];

    const seen = new Set<string>();

    for (const { regex, category } of patterns) {
      let match: RegExpExecArray | null;
      const regexObj = new RegExp(regex.source, 'gi');
      while ((match = regexObj.exec(text)) !== null) {
        const name = match[1] || match[0];
        const key = name.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          skills.push({
            id: this.generateId(),
            name: this.normalizeName(name),
            category,
            competencyLevel: CompetencyLevel.COMPETENT,
            description: `Extracted from source: ${source.title}`,
            evidence: [text.slice(Math.max(0, match.index - 80), match.index + match[0].length + 80).trim()],
            sources: [source],
            relatedSkills: [],
            tags: [category, contentTypeToTag(source.type)],
            confidence: 0.6,
            lastPracticed: new Date().toISOString(),
            yearsOfExperience: 0,
            projectsApplied: [],
            verifiedBy: [],
          });
        }
      }
    }
  }

  private extractPeople(
    text: string,
    source: SkillSource,
    people: SkillPerson[],
    options: ExtractionOptions
  ): void {
    if (options.personName || options.personEmail) {
      people.push({
        id: this.generateId(),
        name: options.personName || 'Unknown',
        email: options.personEmail || 'unknown@unknown',
        role: '',
        department: '',
        skills: [],
        joinedAt: new Date().toISOString(),
        transferReadiness: 'not_ready',
      });
    }

    const emailPattern = /\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
    let match: RegExpExecArray | null;
    while ((match = emailPattern.exec(text)) !== null) {
      const email = match[1].toLowerCase();
      if (!people.find(p => p.email === email)) {
        const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
        people.push({
          id: this.generateId(),
          name: namePart.replace(/\b\w/g, c => c.toUpperCase()),
          email,
          role: '',
          department: '',
          skills: [],
          joinedAt: new Date().toISOString(),
          transferReadiness: 'not_ready',
        });
      }
    }
  }

  private extractRelationships(
    skills: SkillEntry[],
    people: SkillPerson[],
    relationships: SkillRelation[]
  ): void {
    if (skills.length < 2) return;

    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        if (skills[i].category === skills[j].category) {
          relationships.push({
            id: this.generateId(),
            sourceSkillId: skills[i].id,
            targetSkillId: skills[j].id,
            type: SkillRelationshipType.RELATED,
            strength: 0.3,
            metadata: { sharedCategory: skills[i].category },
          });
        }
      }
    }
  }

  private generateSummary(text: string): string {
    const firstLine = text.split('\n')[0] || '';
    return firstLine.length > 200
      ? firstLine.slice(0, 197) + '...'
      : firstLine || 'No summary available';
  }

  private calculateCoverage(skills: SkillEntry[]): number {
    if (skills.length === 0) return 0;

    let totalScore = 0;
    for (const skill of skills) {
      let score = 0.5;
      if (skill.sources.length > 0) score += 0.1;
      if (skill.evidence.length > 0) score += 0.1;
      if (skill.verifiedBy.length > 0) score += 0.1;
      if (skill.yearsOfExperience > 0) score += 0.1;
      if (skill.lastPracticed) score += 0.1;
      totalScore += Math.min(score, 1);
    }

    return Math.round((totalScore / skills.length) * 100);
  }

  private calculateRisk(skills: SkillEntry[]): number {
    if (skills.length === 0) return 100;

    let totalRisk = 0;
    for (const skill of skills) {
      let risk = 0.5;
      if (skill.sources.length === 0) risk += 0.2;
      if (skill.evidence.length === 0) risk += 0.1;
      if (skill.verifiedBy.length === 0) risk += 0.1;
      if (skill.yearsOfExperience < 1) risk += 0.1;
      if (skill.competencyLevel === CompetencyLevel.EXPERT) risk += 0.2;
      totalRisk += Math.min(risk, 1);
    }

    return Math.round((totalRisk / skills.length) * 100);
  }

  private normalizeName(name: string): string {
    return name
      .replace(/\./g, '.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private generateId(): string {
    return `sk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }
}

function contentTypeToTag(type: ContentType): string {
  const map: Record<string, string> = {
    document: 'from-document',
    file: 'from-file',
    conversation: 'from-conversation',
    meeting: 'from-meeting',
    email: 'from-email',
    chat: 'from-chat',
    code: 'from-code',
    decision: 'from-decision',
    project: 'from-project',
  };
  return map[type] || 'from-source';
}

export const skillExtractor = new SkillExtractor();
