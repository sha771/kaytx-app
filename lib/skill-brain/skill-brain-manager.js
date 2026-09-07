"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillBrainManager = exports.SkillBrainManager = void 0;
const types_1 = require("./types");
const extractor_1 = require("./extractor");
const skill_md_generator_1 = require("./skill-md-generator");
const config_1 = require("./config");
class SkillBrainManager {
    static instance;
    config;
    extractor;
    generator;
    fs;
    manifests = new Map();
    skillMds = new Map();
    constructor(config, fs) {
        this.config = { ...config_1.DEFAULT_SKILL_BRAIN_CONFIG, ...config };
        this.extractor = new extractor_1.SkillExtractor();
        this.generator = new skill_md_generator_1.SkillMdGenerator();
        this.fs = fs || this.createNodeFs();
    }
    static getInstance(config, fs) {
        if (!SkillBrainManager.instance) {
            SkillBrainManager.instance = new SkillBrainManager(config, fs);
        }
        return SkillBrainManager.instance;
    }
    /**
     * Initialize the skill brain system
     */
    async initialize() {
        this.ensureDir(this.config.basePath);
        this.ensureDir(this.config.skillMdDir);
        this.ensureDir(this.config.skillIndexPath.replace(/\/[^/]+$/, ''));
        this.ensureDir(this.config.skillManifestPath.replace(/\/[^/]+$/, ''));
        this.ensureDir(this.config.skillLogPath.replace(/\/[^/]+$/, ''));
        const manifest = await this.loadManifest();
        if (!manifest) {
            await this.saveManifest(this.createEmptyManifest());
        }
        this.log('Skill Brain initialized');
    }
    /**
     * Extract skills from text content and create/update a skill.md
     */
    async extractAndSave(text, contentType, options = {}) {
        const startTime = Date.now();
        const errors = [];
        try {
            const extracted = this.extractor.extractFromText(text, contentType, options);
            let skillMd;
            if (options.skillMdId && this.skillMds.has(options.skillMdId)) {
                const existing = this.skillMds.get(options.skillMdId);
                const merged = this.generator.update(existing, extracted);
                skillMd = this.generator.fromExtraction(merged);
                skillMd.id = existing.id;
            }
            else {
                skillMd = this.generator.fromExtraction(extracted);
            }
            this.skillMds.set(skillMd.id, skillMd);
            await this.persistSkillMd(skillMd);
            await this.updateManifest(skillMd);
            return {
                success: true,
                skillMdId: skillMd.id,
                skillsExtracted: skillMd.skills.length,
                peopleIdentified: skillMd.people.length,
                relationshipsFound: skillMd.relationships.length,
                confidence: extracted.metadata?.coverageScore
                    ? extracted.metadata.coverageScore / 100
                    : 0.5,
                errors,
                duration: Date.now() - startTime,
            };
        }
        catch (error) {
            errors.push(error.message || 'Unknown error');
            return {
                success: false,
                skillMdId: '',
                skillsExtracted: 0,
                peopleIdentified: 0,
                relationshipsFound: 0,
                confidence: 0,
                errors,
                duration: Date.now() - startTime,
            };
        }
    }
    /**
     * Extract skills from a code file
     */
    async extractFromCode(code, language, options = {}) {
        const metadata = {
            ...options,
            language,
        };
        return this.extractAndSave(code, types_1.ContentType.CODE, {
            ...metadata,
            sourceTitle: options.sourceTitle || `Code: ${language}`,
        });
    }
    /**
     * Get a skill.md by ID
     */
    getSkillMd(id) {
        return this.skillMds.get(id);
    }
    /**
     * Get all skill.md files
     */
    getAllSkillMds() {
        return Array.from(this.skillMds.values());
    }
    /**
     * Get all skills across all skill.md files
     */
    getAllSkills() {
        const all = [];
        for (const skillMd of this.skillMds.values()) {
            all.push(...skillMd.skills);
        }
        return all;
    }
    /**
     * Search skills by name, tag, or category
     */
    searchSkills(query) {
        const q = query.toLowerCase();
        return this.getAllSkills().filter(s => s.name.toLowerCase().includes(q) ||
            s.tags.some(t => t.toLowerCase().includes(q)) ||
            s.category.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q));
    }
    /**
     * Get skills by category
     */
    getSkillsByCategory(category) {
        return this.getAllSkills().filter(s => s.category === category);
    }
    /**
     * Get skills by competency level
     */
    getSkillsByCompetency(level) {
        return this.getAllSkills().filter(s => s.competencyLevel === level);
    }
    /**
     * Get at-risk skills (expert-level skills with low documentation coverage)
     */
    getAtRiskSkills() {
        return this.getAllSkills().filter(s => s.competencyLevel === types_1.CompetencyLevel.EXPERT &&
            (s.sources.length === 0 || s.verifiedBy.length === 0));
    }
    /**
     * Get transfer-ready skills
     */
    getTransferReadySkills() {
        return this.getAllSkills().filter(s => s.sources.length > 0 &&
            s.evidence.length > 0 &&
            s.verifiedBy.length > 0);
    }
    /**
     * Create a transfer plan for a departing person
     */
    createTransferPlan(personId, personName, targetPersonId, targetPersonName) {
        const personSkills = this.getAllSkills().filter(s => s.sources.some(src => src.type === types_1.ContentType.CONVERSATION ||
            src.type === types_1.ContentType.MEETING ||
            src.type === types_1.ContentType.EMAIL) ||
            s.verifiedBy.includes(personId));
        return {
            id: `transfer_${Date.now()}`,
            personId,
            personName,
            targetPersonId,
            targetPersonName,
            skills: personSkills.map(s => ({
                skillId: s.id,
                skillName: s.name,
                category: s.category,
                competencyLevel: s.competencyLevel,
                transferReadiness: this.classifyTransferReadiness(s),
                estimatedHandoffHours: this.estimateHandoffHours(s),
                documentationStatus: s.sources.length > 0
                    ? s.evidence.length > 0 ? 'complete' : 'partial'
                    : 'none',
            })),
            status: 'draft',
            priority: this.calculateTransferPriority(personSkills),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            notes: '',
        };
    }
    /**
     * Get skill brain statistics
     */
    getStatistics() {
        const allSkills = this.getAllSkills();
        const allMds = this.getAllSkillMds();
        const allPeople = this.collectAllPeople();
        const byCategory = {};
        const byCompetency = {};
        const byContentType = {};
        const byDepartment = {};
        for (const skill of allSkills) {
            byCategory[skill.category] = (byCategory[skill.category] || 0) + 1;
            byCompetency[skill.competencyLevel] = (byCompetency[skill.competencyLevel] || 0) + 1;
        }
        for (const md of allMds) {
            byContentType[md.contentType] = (byContentType[md.contentType] || 0) + 1;
        }
        for (const person of allPeople) {
            if (person.department) {
                byDepartment[person.department] = (byDepartment[person.department] || 0) + 1;
            }
        }
        const atRisk = this.getAtRiskSkills();
        const transferReady = this.getTransferReadySkills();
        const coverageScores = allMds.map(m => m.metadata.coverageScore);
        const avgCoverage = coverageScores.length > 0
            ? Math.round(coverageScores.reduce((a, b) => a + b, 0) / coverageScores.length)
            : 0;
        const riskScores = allMds.map(m => m.metadata.riskScore);
        const avgRisk = riskScores.length > 0
            ? Math.round(riskScores.reduce((a, b) => a + b, 0) / riskScores.length)
            : 100;
        return {
            totalSkillMds: allMds.length,
            totalSkills: allSkills.length,
            totalPeople: allPeople.length,
            totalRelationships: allMds.reduce((sum, m) => sum + m.relationships.length, 0),
            atRiskSkills: atRisk.length,
            transferReadyCount: transferReady.length,
            averageCoverageScore: avgCoverage,
            overallRiskScore: avgRisk,
            skillsByCategory: byCategory,
            skillsByCompetency: byCompetency,
            skillsByContentType: byContentType,
            peopleByDepartment: byDepartment,
            topAtRiskSkills: atRisk.slice(0, 10),
        };
    }
    /**
     * Export all skill brain data
     */
    async export() {
        const manifest = await this.loadManifest() || this.createEmptyManifest();
        return {
            manifest,
            skillMds: this.getAllSkillMds(),
            statistics: this.getStatistics(),
        };
    }
    /**
     * Import skill brain data
     */
    async import(data) {
        if (data.manifest) {
            await this.saveManifest(data.manifest);
            this.manifests.set('default', data.manifest);
        }
        if (data.skillMds) {
            for (const md of data.skillMds) {
                this.skillMds.set(md.id, md);
                await this.persistSkillMd(md);
            }
        }
        this.log(`Imported ${data.skillMds?.length || 0} skill.md files`);
    }
    /**
     * Reset skill brain (clear all data)
     */
    async reset() {
        this.skillMds.clear();
        this.manifests.clear();
        if (this.fs.exists(this.config.basePath)) {
            this.removeDir(this.config.basePath);
        }
        await this.initialize();
        this.log('Skill Brain reset complete');
    }
    /**
     * Get the total number of skill entries
     */
    async getTotalSkillsCount() {
        return this.getAllSkills().length;
    }
    /**
     * Generate skill index markdown
     */
    async generateIndex() {
        const stats = this.getStatistics();
        const lines = [];
        lines.push('# Skill Brain Index');
        lines.push('');
        lines.push('## Summary');
        lines.push('');
        lines.push(`- **Total Skill MD files:** ${stats.totalSkillMds}`);
        lines.push(`- **Total Skills:** ${stats.totalSkills}`);
        lines.push(`- **Total People:** ${stats.totalPeople}`);
        lines.push(`- **At-Risk Skills:** ${stats.atRiskSkills}`);
        lines.push(`- **Transfer Ready:** ${stats.transferReadyCount}`);
        lines.push(`- **Average Coverage:** ${stats.averageCoverageScore}%`);
        lines.push(`- **Overall Risk:** ${stats.overallRiskScore}%`);
        lines.push('');
        lines.push('## By Category');
        lines.push('');
        for (const [category, count] of Object.entries(stats.skillsByCategory)) {
            lines.push(`- **${category}:** ${count}`);
        }
        lines.push('');
        lines.push('## By Competency Level');
        lines.push('');
        for (const [level, count] of Object.entries(stats.skillsByCompetency)) {
            lines.push(`- **${level}:** ${count}`);
        }
        lines.push('');
        lines.push('## At-Risk Skills');
        lines.push('');
        for (const skill of stats.topAtRiskSkills) {
            lines.push(`- **${skill.name}** (${skill.category}) — ${skill.competencyLevel} — ${skill.sources.length} sources, ${skill.verifiedBy.length} verifiers`);
        }
        lines.push('');
        lines.push('---');
        lines.push(`*Last updated: ${new Date().toISOString()}*`);
        const content = lines.join('\n');
        this.fs.writeFile(this.config.skillIndexPath, content, 'utf-8');
        return content;
    }
    classifyTransferReadiness(skill) {
        if (skill.sources.length > 0 && skill.evidence.length > 0 && skill.verifiedBy.length > 0) {
            return types_1.TransferReadiness.FULLY_READY;
        }
        if (skill.sources.length > 0 && skill.evidence.length > 0) {
            return types_1.TransferReadiness.READY;
        }
        if (skill.sources.length > 0) {
            return types_1.TransferReadiness.PARTIALLY_READY;
        }
        return types_1.TransferReadiness.NOT_READY;
    }
    estimateHandoffHours(skill) {
        let hours = 2;
        if (skill.competencyLevel === types_1.CompetencyLevel.EXPERT)
            hours += 8;
        else if (skill.competencyLevel === types_1.CompetencyLevel.PROFICIENT)
            hours += 4;
        else if (skill.competencyLevel === types_1.CompetencyLevel.COMPETENT)
            hours += 2;
        if (skill.sources.length === 0)
            hours += 4;
        if (skill.evidence.length === 0)
            hours += 2;
        if (skill.verifiedBy.length === 0)
            hours += 1;
        return hours;
    }
    calculateTransferPriority(skills) {
        const expertCount = skills.filter(s => s.competencyLevel === types_1.CompetencyLevel.EXPERT).length;
        const undocumentedCount = skills.filter(s => s.sources.length === 0).length;
        if (expertCount > 3 && undocumentedCount > 3)
            return 'critical';
        if (expertCount > 1 || undocumentedCount > 3)
            return 'high';
        if (undocumentedCount > 0)
            return 'medium';
        return 'low';
    }
    async persistSkillMd(skillMd) {
        const content = this.generator.generate(skillMd);
        const filePath = `${this.config.skillMdDir}/${skillMd.id}.md`;
        this.fs.writeFile(filePath, content, 'utf-8');
    }
    async loadSkillMd(id) {
        const filePath = `${this.config.skillMdDir}/${id}.md`;
        if (!this.fs.exists(filePath))
            return null;
        const raw = this.fs.readFile(filePath, 'utf-8');
        const parsed = this.generator.parse(raw);
        return this.generator.fromExtraction({ ...parsed, id });
    }
    async loadAllSkillMds() {
        const dir = this.config.skillMdDir;
        if (!this.fs.exists(dir))
            return [];
        const files = this.fs.readdir(dir).filter(f => f.endsWith('.md'));
        const results = [];
        for (const file of files) {
            const id = file.replace(/\.md$/, '');
            const md = await this.loadSkillMd(id);
            if (md)
                results.push(md);
        }
        return results;
    }
    async loadManifest() {
        if (!this.fs.exists(this.config.skillManifestPath))
            return null;
        try {
            const raw = this.fs.readFile(this.config.skillManifestPath, 'utf-8');
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    async saveManifest(manifest) {
        this.fs.writeFile(this.config.skillManifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    }
    async updateManifest(skillMd) {
        const manifest = await this.loadManifest() || this.createEmptyManifest();
        manifest.lastUpdated = new Date().toISOString();
        manifest.totalSkillMds = this.skillMds.size;
        manifest.totalSkills += skillMd.skills.length;
        manifest.totalPeople += skillMd.people.length;
        manifest.totalRelationships += skillMd.relationships.length;
        const atRisk = this.getAtRiskSkills();
        manifest.atRiskSkills = atRisk.length;
        const transferReady = this.getTransferReadySkills();
        manifest.transferReadyCount = transferReady.length;
        const stats = this.getStatistics();
        manifest.averageCoverageScore = stats.averageCoverageScore;
        manifest.overallRiskScore = stats.overallRiskScore;
        await this.saveManifest(manifest);
        this.manifests.set('default', manifest);
    }
    createEmptyManifest() {
        return {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            totalSkillMds: 0,
            totalSkills: 0,
            totalPeople: 0,
            totalRelationships: 0,
            atRiskSkills: 0,
            transferReadyCount: 0,
            averageCoverageScore: 0,
            overallRiskScore: 100,
        };
    }
    collectAllPeople() {
        const seen = new Set();
        const people = [];
        for (const skillMd of this.skillMds.values()) {
            for (const person of skillMd.people) {
                if (!seen.has(person.email)) {
                    seen.add(person.email);
                    people.push(person);
                }
            }
        }
        return people;
    }
    ensureDir(dir) {
        if (!this.fs.exists(dir)) {
            this.fs.mkdir(dir, { recursive: true });
        }
    }
    removeDir(dir) {
        if (this.fs.exists(dir)) {
            const entries = this.fs.readdir(dir);
            for (const entry of entries) {
                const fullPath = `${dir}/${entry}`;
                if (this.fs.exists(fullPath)) {
                    try {
                        this.fs.unlink(fullPath);
                    }
                    catch {
                        this.removeDir(fullPath);
                    }
                }
            }
            try {
                this.fs.unlink(dir);
            }
            catch { }
        }
    }
    log(message) {
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${message}\n`;
        try {
            const existing = this.fs.exists(this.config.skillLogPath)
                ? this.fs.readFile(this.config.skillLogPath, 'utf-8')
                : '';
            this.fs.writeFile(this.config.skillLogPath, existing + logLine, 'utf-8');
        }
        catch {
            // Silently fail on log write
        }
        console.log(`[SkillBrain] ${message}`);
    }
    createNodeFs() {
        const fs = require('fs');
        const path = require('path');
        return {
            exists: (p) => fs.existsSync(p),
            mkdir: (p, opts) => fs.mkdirSync(p, opts),
            readFile: (p, encoding) => fs.readFileSync(p, encoding),
            writeFile: (p, content, encoding) => fs.writeFileSync(p, content, encoding),
            readdir: (p) => {
                try {
                    return fs.readdirSync(p);
                }
                catch {
                    return [];
                }
            },
            unlink: (p) => {
                try {
                    fs.unlinkSync(p);
                }
                catch { }
            },
        };
    }
}
exports.SkillBrainManager = SkillBrainManager;
exports.skillBrainManager = SkillBrainManager.getInstance;
//# sourceMappingURL=skill-brain-manager.js.map