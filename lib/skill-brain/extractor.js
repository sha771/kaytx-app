"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillExtractor = exports.SkillExtractor = void 0;
const types_1 = require("./types");
class SkillExtractor {
    /**
     * Extract skills from text content using heuristic pattern matching
     * This provides a baseline extraction without requiring an LLM call.
     */
    extractFromText(text, contentType, options = {}) {
        const source = {
            id: this.generateId(),
            type: contentType,
            title: options.sourceTitle || 'Untitled',
            path: options.sourcePath || '',
            url: options.sourceUrl,
            createdAt: new Date().toISOString(),
            extractedAt: new Date().toISOString(),
            confidence: options.confidence || 0.7,
        };
        const skills = [];
        const people = [];
        const relationships = [];
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
    analyzeTransferReadiness(skill) {
        const gaps = [];
        if (skill.sources.length === 0)
            gaps.push('No source documentation');
        if (skill.evidence.length === 0)
            gaps.push('No evidence of application');
        if (!skill.lastPracticed)
            gaps.push('Last practiced date unknown');
        if (skill.verifiedBy.length === 0)
            gaps.push('Not verified by peer/expert');
        if (skill.yearsOfExperience < 1)
            gaps.push('Less than 1 year experience');
        if (gaps.length === 0)
            return { readiness: 'fully_ready', gaps };
        if (gaps.length <= 1)
            return { readiness: 'ready', gaps };
        if (gaps.length <= 2)
            return { readiness: 'partially_ready', gaps };
        return { readiness: 'not_ready', gaps };
    }
    /**
     * Extract skill relationships from a set of skills
     */
    extractSkillRelationships(skills) {
        const relations = [];
        const skillMap = new Map(skills.map(s => [s.name.toLowerCase(), s]));
        for (const skill of skills) {
            for (const relatedName of skill.relatedSkills) {
                const target = skillMap.get(relatedName.toLowerCase());
                if (target && target.id !== skill.id) {
                    relations.push({
                        id: this.generateId(),
                        sourceSkillId: skill.id,
                        targetSkillId: target.id,
                        type: types_1.SkillRelationshipType.RELATED,
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
    mergeSkillMds(existing, incoming) {
        const existingSkills = existing.skills || [];
        const incomingSkills = incoming.skills || [];
        const skillMap = new Map();
        for (const s of existingSkills)
            skillMap.set(s.name.toLowerCase(), s);
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
            }
            else {
                skillMap.set(key, s);
            }
        }
        const mergedSkills = Array.from(skillMap.values());
        const existingPeople = existing.people || [];
        const incomingPeople = incoming.people || [];
        const personMap = new Map();
        for (const p of existingPeople)
            personMap.set(p.email.toLowerCase(), p);
        for (const p of incomingPeople)
            personMap.set(p.email.toLowerCase(), p);
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
    extractTechnicalSkills(text, source, skills) {
        const patterns = [
            { regex: /\b(JavaScript|TypeScript|Python|Java|Go|Rust|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Scala|Elixir)\b/gi, category: types_1.SkillCategory.LANGUAGE },
            { regex: /\b(React|Vue|Angular|Svelte|Next\.?js|Nuxt|Remix|Express|Django|Flask|FastAPI|Spring|Laravel|Rails)\b/gi, category: types_1.SkillCategory.FRAMEWORK },
            { regex: /\b(AWS|Azure|GCP|Heroku|DigitalOcean|Netlify|Vercel|Cloudflare)\b/gi, category: types_1.SkillCategory.PLATFORM },
            { regex: /\b(Docker|Kubernetes|Terraform|Ansible|Jenkins|GitHub Actions|CircleCI|ArgoCD)\b/gi, category: types_1.SkillCategory.TOOL },
            { regex: /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|Cassandra|DynamoDB|BigQuery|Snowflake)\b/gi, category: types_1.SkillCategory.TECHNICAL },
            { regex: /\b(agile|scrum|kanban|leadership|management|mentoring|coaching)\b/gi, category: types_1.SkillCategory.MANAGEMENT },
            { regex: /\b(graphql|rest|grpc|websocket|oauth|jwt|http)\b/gi, category: types_1.SkillCategory.TECHNICAL },
            { regex: /\b(machine learning|deep learning|nlp|computer vision|data science|analytics|statistics)\b/gi, category: types_1.SkillCategory.DOMAIN },
        ];
        const seen = new Set();
        for (const { regex, category } of patterns) {
            let match;
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
                        competencyLevel: types_1.CompetencyLevel.COMPETENT,
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
    extractPeople(text, source, people, options) {
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
        let match;
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
    extractRelationships(skills, people, relationships) {
        if (skills.length < 2)
            return;
        for (let i = 0; i < skills.length; i++) {
            for (let j = i + 1; j < skills.length; j++) {
                if (skills[i].category === skills[j].category) {
                    relationships.push({
                        id: this.generateId(),
                        sourceSkillId: skills[i].id,
                        targetSkillId: skills[j].id,
                        type: types_1.SkillRelationshipType.RELATED,
                        strength: 0.3,
                        metadata: { sharedCategory: skills[i].category },
                    });
                }
            }
        }
    }
    generateSummary(text) {
        const firstLine = text.split('\n')[0] || '';
        return firstLine.length > 200
            ? firstLine.slice(0, 197) + '...'
            : firstLine || 'No summary available';
    }
    calculateCoverage(skills) {
        if (skills.length === 0)
            return 0;
        let totalScore = 0;
        for (const skill of skills) {
            let score = 0.5;
            if (skill.sources.length > 0)
                score += 0.1;
            if (skill.evidence.length > 0)
                score += 0.1;
            if (skill.verifiedBy.length > 0)
                score += 0.1;
            if (skill.yearsOfExperience > 0)
                score += 0.1;
            if (skill.lastPracticed)
                score += 0.1;
            totalScore += Math.min(score, 1);
        }
        return Math.round((totalScore / skills.length) * 100);
    }
    calculateRisk(skills) {
        if (skills.length === 0)
            return 100;
        let totalRisk = 0;
        for (const skill of skills) {
            let risk = 0.5;
            if (skill.sources.length === 0)
                risk += 0.2;
            if (skill.evidence.length === 0)
                risk += 0.1;
            if (skill.verifiedBy.length === 0)
                risk += 0.1;
            if (skill.yearsOfExperience < 1)
                risk += 0.1;
            if (skill.competencyLevel === types_1.CompetencyLevel.EXPERT)
                risk += 0.2;
            totalRisk += Math.min(risk, 1);
        }
        return Math.round((totalRisk / skills.length) * 100);
    }
    normalizeName(name) {
        return name
            .replace(/\./g, '.')
            .replace(/\s+/g, ' ')
            .trim();
    }
    generateId() {
        return `sk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
}
exports.SkillExtractor = SkillExtractor;
function contentTypeToTag(type) {
    const map = {
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
exports.skillExtractor = new SkillExtractor();
//# sourceMappingURL=extractor.js.map