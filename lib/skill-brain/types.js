"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRelationshipType = exports.SkillCategory = exports.ContentType = exports.TransferReadiness = exports.CompetencyLevel = void 0;
var CompetencyLevel;
(function (CompetencyLevel) {
    CompetencyLevel["NOVICE"] = "novice";
    CompetencyLevel["ADVANCED_BEGINNER"] = "advanced_beginner";
    CompetencyLevel["COMPETENT"] = "competent";
    CompetencyLevel["PROFICIENT"] = "proficient";
    CompetencyLevel["EXPERT"] = "expert";
})(CompetencyLevel || (exports.CompetencyLevel = CompetencyLevel = {}));
var TransferReadiness;
(function (TransferReadiness) {
    TransferReadiness["NOT_READY"] = "not_ready";
    TransferReadiness["PARTIALLY_READY"] = "partially_ready";
    TransferReadiness["READY"] = "ready";
    TransferReadiness["FULLY_READY"] = "fully_ready";
    TransferReadiness["TRANSFERRED"] = "transferred";
})(TransferReadiness || (exports.TransferReadiness = TransferReadiness = {}));
var ContentType;
(function (ContentType) {
    ContentType["DOCUMENT"] = "document";
    ContentType["FILE"] = "file";
    ContentType["CONVERSATION"] = "conversation";
    ContentType["MEETING"] = "meeting";
    ContentType["EMAIL"] = "email";
    ContentType["CHAT"] = "chat";
    ContentType["CODE"] = "code";
    ContentType["DECISION"] = "decision";
    ContentType["PROJECT"] = "project";
    ContentType["TRIBAL"] = "tribal";
    ContentType["SOP"] = "sop";
    ContentType["WORKFLOW"] = "workflow";
    ContentType["PLAYBOOK"] = "playbook";
    ContentType["NOTE"] = "note";
})(ContentType || (exports.ContentType = ContentType = {}));
var SkillCategory;
(function (SkillCategory) {
    SkillCategory["TECHNICAL"] = "technical";
    SkillCategory["DOMAIN"] = "domain";
    SkillCategory["PROCESS"] = "process";
    SkillCategory["SOFT_SKILL"] = "soft_skill";
    SkillCategory["MANAGEMENT"] = "management";
    SkillCategory["COMMUNICATION"] = "communication";
    SkillCategory["TOOL"] = "tool";
    SkillCategory["FRAMEWORK"] = "framework";
    SkillCategory["LANGUAGE"] = "language";
    SkillCategory["PLATFORM"] = "platform";
    SkillCategory["BUSINESS"] = "business";
    SkillCategory["COMPLIANCE"] = "compliance";
    SkillCategory["TRIBAL"] = "tribal";
})(SkillCategory || (exports.SkillCategory = SkillCategory = {}));
var SkillRelationshipType;
(function (SkillRelationshipType) {
    SkillRelationshipType["PREREQUISITE"] = "prerequisite";
    SkillRelationshipType["EXTENDS"] = "extends";
    SkillRelationshipType["RELATED"] = "related";
    SkillRelationshipType["DEPENDS_ON"] = "depends_on";
    SkillRelationshipType["PART_OF"] = "part_of";
    SkillRelationshipType["TAUGHT_BY"] = "taught_by";
    SkillRelationshipType["APPLIED_IN"] = "applied_in";
    SkillRelationshipType["CERTIFIES"] = "certifies";
    SkillRelationshipType["REPLACES"] = "replaces";
    SkillRelationshipType["EVOLVED_FROM"] = "evolved_from";
})(SkillRelationshipType || (exports.SkillRelationshipType = SkillRelationshipType = {}));
//# sourceMappingURL=types.js.map