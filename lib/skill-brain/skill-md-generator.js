"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillMdGenerator = exports.SkillMdGenerator = void 0;
const types_1 = require("./types");
class SkillMdGenerator {
    /**
     * Generate a skill.md markdown string from a SkillMd object
     */
    generate(skillMd) {
        const frontmatter = this.generateFrontmatter(skillMd);
        const body = this.generateBody(skillMd);
        return `${frontmatter}\n\n${body}`;
    }
    /**
     * Parse a skill.md markdown string back into a SkillMd object
     */
    parse(raw) {
        const frontmatter = this.parseFrontmatter(raw);
        const body = this.parseBody(raw);
        return {
            ...body,
            frontmatter,
            raw,
        };
    }
    /**
     * Generate a skill.md from extracted data
     */
    fromExtraction(data) {
        const id = data.id || `skillmd_${Date.now()}`;
        return {
            id,
            title: data.title || 'Untitled Skills',
            summary: data.summary || '',
            contentType: data.contentType || types_1.ContentType.DOCUMENT,
            skills: data.skills || [],
            people: data.people || [],
            relationships: data.relationships || [],
            metadata: {
                version: data.metadata?.version || '1.0.0',
                generatedAt: data.metadata?.generatedAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sourceCount: data.metadata?.sourceCount || 0,
                skillCount: (data.skills || []).length,
                personCount: (data.people || []).length,
                transferReadiness: this.calculateOverallReadiness(data.skills || []),
                coverageScore: data.metadata?.coverageScore || 0,
                riskScore: data.metadata?.riskScore || 100,
            },
            frontmatter: data.frontmatter || {},
            raw: '',
        };
    }
    /**
     * Update an existing skill.md with new data
     */
    update(existing, updates) {
        const mergedSkills = this.mergeSkills(existing.skills, updates.skills || []);
        const mergedPeople = this.mergePeople(existing.people, updates.people || []);
        const mergedRelationships = this.mergeRelationships(existing.relationships, updates.relationships || []);
        return {
            ...existing,
            ...updates,
            skills: mergedSkills,
            people: mergedPeople,
            relationships: mergedRelationships,
            metadata: {
                ...existing.metadata,
                ...updates.metadata,
                updatedAt: new Date().toISOString(),
                skillCount: mergedSkills.length,
                personCount: mergedPeople.length,
            },
        };
    }
    /**
     * Render a skill entry as markdown
     */
    renderSkillEntry(skill, index) {
        const lines = [];
        lines.push(`### ${index + 1}. ${skill.name}`);
        lines.push('');
        lines.push(`- **Category:** ${skill.category}`);
        lines.push(`- **Competency:** ${skill.competencyLevel}`);
        lines.push(`- **Confidence:** ${Math.round(skill.confidence * 100)}%`);
        lines.push(`- **Years Experience:** ${skill.yearsOfExperience}`);
        lines.push(`- **Last Practiced:** ${skill.lastPracticed}`);
        lines.push(`- **Verified By:** ${skill.verifiedBy.length > 0 ? skill.verifiedBy.join(', ') : 'Not verified'}`);
        lines.push('');
        lines.push(`  ${skill.description}`);
        lines.push('');
        if (skill.evidence.length > 0) {
            lines.push('  **Evidence:**');
            for (const ev of skill.evidence) {
                lines.push(`  - ${ev.slice(0, 200)}${ev.length > 200 ? '...' : ''}`);
            }
            lines.push('');
        }
        if (skill.projectsApplied.length > 0) {
            lines.push(`  **Applied in:** ${skill.projectsApplied.join(', ')}`);
            lines.push('');
        }
        if (skill.tags.length > 0) {
            lines.push(`  **Tags:** ${skill.tags.map(t => `\`${t}\``).join(', ')}`);
            lines.push('');
        }
        if (skill.sources.length > 0) {
            lines.push('  **Sources:**');
            for (const src of skill.sources) {
                lines.push(`  - [${src.title}](${src.path || '#'}) (${src.type}, confidence: ${Math.round(src.confidence * 100)}%)`);
            }
            lines.push('');
        }
        return lines.join('\n');
    }
    /**
     * Render a person entry as markdown
     */
    renderPerson(person) {
        const lines = [];
        lines.push(`### ${person.name}`);
        lines.push('');
        lines.push(`- **Email:** ${person.email}`);
        lines.push(`- **Role:** ${person.role}`);
        lines.push(`- **Department:** ${person.department}`);
        lines.push(`- **Skills:** ${person.skills.join(', ')}`);
        lines.push(`- **Transfer Readiness:** ${person.transferReadiness}`);
        if (person.departingAt) {
            lines.push(`- **Departing:** ${person.departingAt}`);
            lines.push(`> ⚠️ **DEPARTING — Skill transfer required**`);
        }
        lines.push('');
        return lines.join('\n');
    }
    generateFrontmatter(skillMd) {
        const fm = {
            title: skillMd.title,
            contentType: skillMd.contentType,
            generatedAt: skillMd.metadata.generatedAt,
            updatedAt: skillMd.metadata.updatedAt,
            version: skillMd.metadata.version,
            sourceCount: skillMd.metadata.sourceCount,
            skillCount: skillMd.metadata.skillCount,
            personCount: skillMd.metadata.personCount,
            transferReadiness: skillMd.metadata.transferReadiness,
            coverageScore: skillMd.metadata.coverageScore,
            riskScore: skillMd.metadata.riskScore,
            ...skillMd.frontmatter,
        };
        const lines = ['---'];
        for (const [key, value] of Object.entries(fm)) {
            if (typeof value === 'object') {
                lines.push(`${key}: ${JSON.stringify(value)}`);
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                lines.push(`${key}: ${value}`);
            }
            else {
                lines.push(`${key}: "${String(value).replace(/"/g, '\\"')}"`);
            }
        }
        lines.push('---');
        return lines.join('\n');
    }
    generateBody(skillMd) {
        const parts = [];
        parts.push(`# Skill: ${skillMd.title}`);
        parts.push('');
        parts.push(`> ${skillMd.summary}`);
        parts.push('');
        this.addMetadataSection(skillMd, parts);
        this.addSkillsSection(skillMd.skills, parts);
        this.addPeopleSection(skillMd.people, parts);
        this.addRelationshipsSection(skillMd.relationships, skillMd.skills, parts);
        this.addTransferReadinessSection(skillMd, parts);
        return parts.join('\n');
    }
    addMetadataSection(skillMd, parts) {
        parts.push('## Metadata');
        parts.push('');
        parts.push(`| Field | Value |`);
        parts.push(`|-------|-------|`);
        parts.push(`| Content Type | ${skillMd.contentType} |`);
        parts.push(`| Sources | ${skillMd.metadata.sourceCount} |`);
        parts.push(`| Skills Extracted | ${skillMd.metadata.skillCount} |`);
        parts.push(`| People Identified | ${skillMd.metadata.personCount} |`);
        parts.push(`| Coverage Score | ${skillMd.metadata.coverageScore}% |`);
        parts.push(`| Risk Score | ${skillMd.metadata.riskScore}% |`);
        parts.push(`| Generated | ${skillMd.metadata.generatedAt} |`);
        parts.push(`| Updated | ${skillMd.metadata.updatedAt} |`);
        parts.push('');
    }
    addSkillsSection(skills, parts) {
        parts.push('## Skills');
        parts.push('');
        if (skills.length === 0) {
            parts.push('_No skills extracted yet._');
            parts.push('');
            return;
        }
        for (let i = 0; i < skills.length; i++) {
            parts.push(this.renderSkillEntry(skills[i], i));
        }
    }
    addPeopleSection(people, parts) {
        parts.push('## People');
        parts.push('');
        if (people.length === 0) {
            parts.push('_No people identified yet._');
            parts.push('');
            return;
        }
        for (const person of people) {
            parts.push(this.renderPerson(person));
        }
    }
    addRelationshipsSection(relationships, skills, parts) {
        parts.push('## Skill Relationships');
        parts.push('');
        if (relationships.length === 0 && skills.length < 2) {
            parts.push('_No relationships identified yet._');
            parts.push('');
            return;
        }
        const skillMap = new Map(skills.map(s => [s.id, s.name]));
        if (relationships.length === 0) {
            parts.push('_Skills exist but no explicit relationships mapped._');
            parts.push('');
            return;
        }
        const grouped = new Map();
        for (const rel of relationships) {
            const sourceName = skillMap.get(rel.sourceSkillId) || rel.sourceSkillId;
            const targetName = skillMap.get(rel.targetSkillId) || rel.targetSkillId;
            if (!grouped.has(sourceName))
                grouped.set(sourceName, []);
            grouped.get(sourceName).push({ target: targetName, type: rel.type, strength: rel.strength });
        }
        for (const [source, targets] of grouped) {
            parts.push(`- **${source}** →`);
            for (const t of targets) {
                parts.push(`  - ${t.type} (strength: ${Math.round(t.strength * 100)}%) → **${t.target}**`);
            }
        }
        parts.push('');
    }
    addTransferReadinessSection(skillMd, parts) {
        parts.push('## Transfer Readiness');
        parts.push('');
        parts.push(`| Metric | Value |`);
        parts.push(`|--------|-------|`);
        parts.push(`| Overall Readiness | ${skillMd.metadata.transferReadiness} |`);
        parts.push(`| Coverage Score | ${skillMd.metadata.coverageScore}% |`);
        parts.push(`| Risk Score | ${skillMd.metadata.riskScore}% |`);
        parts.push(`| Documentation Count | ${skillMd.metadata.sourceCount} |`);
        parts.push('');
    }
    parseFrontmatter(raw) {
        const match = raw.match(/^---\n([\s\S]*?)\n---/);
        if (!match)
            return {};
        const frontmatter = {};
        const lines = match[1].split('\n');
        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1)
                continue;
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1).replace(/\\"/g, '"');
            }
            else if (!isNaN(Number(value))) {
                value = Number(value);
            }
            else if (value === 'true' || value === 'false') {
                value = value === 'true';
            }
            frontmatter[key] = value;
        }
        return frontmatter;
    }
    parseBody(raw) {
        const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
        const lines = body.split('\n');
        const title = (lines[0] || '').replace(/^# Skill:\s*/, '').trim();
        const summary = (lines[2] || '').replace(/^>\s*/, '').trim();
        return {
            title: title || undefined,
            summary: summary || undefined,
        };
    }
    calculateOverallReadiness(skills) {
        if (skills.length === 0)
            return types_1.TransferReadiness.NOT_READY;
        const readyCount = skills.filter(s => s.sources.length > 0 &&
            s.evidence.length > 0 &&
            s.verifiedBy.length > 0).length;
        const ratio = readyCount / skills.length;
        if (ratio >= 0.9)
            return types_1.TransferReadiness.FULLY_READY;
        if (ratio >= 0.7)
            return types_1.TransferReadiness.READY;
        if (ratio >= 0.4)
            return types_1.TransferReadiness.PARTIALLY_READY;
        return types_1.TransferReadiness.NOT_READY;
    }
    mergeSkills(existing, incoming) {
        const map = new Map();
        for (const s of existing)
            map.set(s.name.toLowerCase(), s);
        for (const s of incoming) {
            const key = s.name.toLowerCase();
            const e = map.get(key);
            if (e) {
                map.set(key, {
                    ...e,
                    sources: [...e.sources, ...s.sources].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i),
                    evidence: [...new Set([...e.evidence, ...s.evidence])],
                    tags: [...new Set([...e.tags, ...s.tags])],
                    projectsApplied: [...new Set([...e.projectsApplied, ...s.projectsApplied])],
                    verifiedBy: [...new Set([...e.verifiedBy, ...s.verifiedBy])],
                    confidence: Math.max(e.confidence, s.confidence),
                    competencyLevel: s.competencyLevel > e.competencyLevel ? s.competencyLevel : e.competencyLevel,
                    lastPracticed: s.lastPracticed > e.lastPracticed ? s.lastPracticed : e.lastPracticed,
                    yearsOfExperience: Math.max(e.yearsOfExperience, s.yearsOfExperience),
                });
            }
            else {
                map.set(key, s);
            }
        }
        return Array.from(map.values());
    }
    mergePeople(existing, incoming) {
        const map = new Map();
        for (const p of existing)
            map.set(p.email.toLowerCase(), p);
        for (const p of incoming) {
            const key = p.email.toLowerCase();
            const e = map.get(key);
            if (e) {
                map.set(key, {
                    ...e,
                    skills: [...new Set([...e.skills, ...p.skills])],
                    transferReadiness: p.transferReadiness !== 'not_ready'
                        ? p.transferReadiness
                        : e.transferReadiness,
                });
            }
            else {
                map.set(key, p);
            }
        }
        return Array.from(map.values());
    }
    mergeRelationships(existing, incoming) {
        const map = new Map();
        for (const r of existing)
            map.set(`${r.sourceSkillId}-${r.targetSkillId}-${r.type}`, r);
        for (const r of incoming) {
            const key = `${r.sourceSkillId}-${r.targetSkillId}-${r.type}`;
            if (!map.has(key))
                map.set(key, r);
        }
        return Array.from(map.values());
    }
}
exports.SkillMdGenerator = SkillMdGenerator;
exports.skillMdGenerator = new SkillMdGenerator();
//# sourceMappingURL=skill-md-generator.js.map