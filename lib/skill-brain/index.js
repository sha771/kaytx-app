"use strict";
/**
 * Skill Brain System
 * Enterprise skill capture, documentation, and transfer system
 *
 * Three-layer architecture:
 * 1. Raw Content → Extractor extracts skills, people, and relationships
 * 2. Skill.md Generator → Creates structured skill.md markdown files
 * 3. Skill Brain Manager → Orchestrates storage, query, and transfer
 *
 * Key capabilities:
 * - Extract skills from any content type (documents, code, conversations, etc.)
 * - Generate skill.md files with frontmatter and structured body
 * - Track skill transfer readiness for departure/succession planning
 * - Search and query skills across the entire skill brain
 * - Create transfer plans for employee departure handoff
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillMdGenerator = exports.SkillExtractor = exports.SkillBrainManager = exports.SkillBrain = void 0;
const skill_brain_manager_1 = require("./skill-brain-manager");
class SkillBrain {
    manager;
    constructor(config) {
        this.manager = skill_brain_manager_1.SkillBrainManager.getInstance(config);
    }
    async initialize() {
        await this.manager.initialize();
    }
    async extractFromText(text, contentType, options) {
        return await this.manager.extractAndSave(text, contentType, options || {});
    }
    async extractFromCode(code, language, options) {
        return await this.manager.extractFromCode(code, language, options || {});
    }
    getSkillMd(id) {
        return this.manager.getSkillMd(id);
    }
    getAllSkillMds() {
        return this.manager.getAllSkillMds();
    }
    getAllSkills() {
        return this.manager.getAllSkills();
    }
    searchSkills(query) {
        return this.manager.searchSkills(query);
    }
    getSkillsByCategory(category) {
        return this.manager.getSkillsByCategory(category);
    }
    getSkillsByCompetency(level) {
        return this.manager.getSkillsByCompetency(level);
    }
    getAtRiskSkills() {
        return this.manager.getAtRiskSkills();
    }
    getTransferReadySkills() {
        return this.manager.getTransferReadySkills();
    }
    createTransferPlan(personId, personName, targetPersonId, targetPersonName) {
        return this.manager.createTransferPlan(personId, personName, targetPersonId, targetPersonName);
    }
    getStatistics() {
        return this.manager.getStatistics();
    }
    async generateIndex() {
        return await this.manager.generateIndex();
    }
    async export() {
        return await this.manager.export();
    }
    async import(data) {
        return await this.manager.import(data);
    }
    async reset() {
        return await this.manager.reset();
    }
}
exports.SkillBrain = SkillBrain;
__exportStar(require("./types"), exports);
__exportStar(require("./config"), exports);
var skill_brain_manager_2 = require("./skill-brain-manager");
Object.defineProperty(exports, "SkillBrainManager", { enumerable: true, get: function () { return skill_brain_manager_2.SkillBrainManager; } });
var extractor_1 = require("./extractor");
Object.defineProperty(exports, "SkillExtractor", { enumerable: true, get: function () { return extractor_1.SkillExtractor; } });
var skill_md_generator_1 = require("./skill-md-generator");
Object.defineProperty(exports, "SkillMdGenerator", { enumerable: true, get: function () { return skill_md_generator_1.SkillMdGenerator; } });
exports.default = SkillBrain;
//# sourceMappingURL=index.js.map