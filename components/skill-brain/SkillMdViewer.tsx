import React from 'react';
import { FileText, Users, GitBranch, Shield, AlertTriangle, CheckCircle, Clock, Tag } from 'lucide-react-native';
import type { SkillMd, SkillEntry, CompetencyLevel, TransferReadiness } from '../../lib/skill-brain/types';

interface SkillMdViewerProps {
  skillMd: SkillMd;
  onSkillClick?: (skillId: string) => void;
  onPersonClick?: (personEmail: string) => void;
}

const competencyColors: Record<CompetencyLevel, string> = {
  novice: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  advanced_beginner: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  competent: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  proficient: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  expert: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
};

const readinessColors: Record<TransferReadiness, { bg: string; text: string; icon: any }> = {
  not_ready: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', icon: AlertTriangle },
  partially_ready: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-700 dark:text-yellow-300', icon: Clock },
  ready: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', icon: Shield },
  fully_ready: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', icon: CheckCircle },
  transferred: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-500 dark:text-gray-400', icon: CheckCircle },
};

function ReadinessBadge({ readiness }: { readiness: TransferReadiness }) {
  const config = readinessColors[readiness];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {readiness.replace(/_/g, ' ')}
    </span>
  );
}

function CompetencyBadge({ level }: { level: CompetencyLevel }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${competencyColors[level] || ''}`}>
      {level.replace(/_/g, ' ')}
    </span>
  );
}

export function SkillMdViewer({ skillMd, onSkillClick, onPersonClick }: SkillMdViewerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {skillMd.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {skillMd.summary}
            </p>
          </div>
          <ReadinessBadge readiness={skillMd.metadata.transferReadiness} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>{skillMd.metadata.skillCount} skills</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{skillMd.metadata.personCount} people</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <GitBranch className="w-4 h-4" />
            <span>{skillMd.metadata.sourceCount} sources</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Coverage: {skillMd.metadata.coverageScore}%</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Skills ({skillMd.skills.length})
        </h3>
        {skillMd.skills.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No skills extracted yet.</p>
        ) : (
          <div className="space-y-3">
            {skillMd.skills.map((skill) => (
              <SkillEntryCard
                key={skill.id}
                skill={skill}
                onClick={() => onSkillClick?.(skill.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* People */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          People ({skillMd.people.length})
        </h3>
        {skillMd.people.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No people identified yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillMd.people.map((person) => (
              <div
                key={person.id}
                onClick={() => onPersonClick?.(person.email)}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {person.role} · {person.department}
                  </p>
                </div>
                <div className="ml-auto">
                  <ReadinessBadge readiness={person.transferReadiness} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relationships */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Skill Relationships ({skillMd.relationships.length})
        </h3>
        {skillMd.relationships.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No relationships mapped yet.</p>
        ) : (
          <div className="space-y-2">
            {skillMd.relationships.map((rel) => {
              const source = skillMd.skills.find(s => s.id === rel.sourceSkillId);
              const target = skillMd.skills.find(s => s.id === rel.targetSkillId);
              return (
                <div key={rel.id} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {source?.name || rel.sourceSkillId}
                  </span>
                  <span className="text-gray-400">—{rel.type}→</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {target?.name || rel.targetSkillId}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({Math.round(rel.strength * 100)}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SkillEntryCard({ skill, onClick }: { skill: SkillEntry; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">
            {skill.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {skill.description.slice(0, 120)}{skill.description.length > 120 ? '...' : ''}
          </p>
        </div>
        <CompetencyBadge level={skill.competencyLevel} />
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>{skill.category}</span>
        <span>·</span>
        <span>{skill.yearsOfExperience}y exp</span>
        {skill.verifiedBy.length > 0 && (
          <>
            <span>·</span>
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          </>
        )}
      </div>

      {skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.tags.slice(0, 4).map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {skill.tags.length > 4 && (
            <span className="text-xs text-gray-500">+{skill.tags.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}
