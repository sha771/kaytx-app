import React from 'react';
import {
  User,
  Mail,
  Briefcase,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Calendar,
  TrendingUp,
  ExternalLink,
} from 'lucide-react-native';
import type {
  SkillPerson,
  SkillEntry,
  CompetencyLevel,
  SkillCategory,
} from '../../lib/skill-brain/types';

interface EmployeeSkillProfileProps {
  person: SkillPerson;
  skills: SkillEntry[];
  onSkillClick?: (skillId: string) => void;
}

const competencyColors: Record<CompetencyLevel, string> = {
  novice: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  advanced_beginner: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  competent: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  proficient: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  expert: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
};

export function EmployeeSkillProfile({ person, skills, onSkillClick }: EmployeeSkillProfileProps) {
  const expertSkills = skills.filter(s => s.competencyLevel === CompetencyLevel.EXPERT);
  const atRiskSkills = skills.filter(
    s => s.competencyLevel === CompetencyLevel.EXPERT &&
    (s.sources.length === 0 || s.verifiedBy.length === 0)
  );
  const verifiedSkills = skills.filter(s => s.verifiedBy.length > 0);

  const skillsByCategory = skills.reduce<Record<string, SkillEntry[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              {person.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {person.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{person.role}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{person.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Building2 className="w-4 h-4" />
                <span>{person.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(person.joinedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Transfer: {person.transferReadiness.replace(/_/g, ' ')}</span>
              </div>
            </div>

            {person.departingAt && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-300">
                  Departing on {new Date(person.departingAt).toLocaleDateString()} — Skill transfer required
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skill Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Skills</p>
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{skills.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Expert Level</p>
            <TrendingUp className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{expertSkills.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Verified Skills</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{verifiedSkills.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">At Risk</p>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">{atRiskSkills.length}</p>
        </div>
      </div>

      {/* Skills by Category */}
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
            {category.replace(/_/g, ' ')} ({categorySkills.length})
          </h3>
          <div className="space-y-3">
            {categorySkills.map(skill => (
              <div
                key={skill.id}
                onClick={() => onSkillClick?.(skill.id)}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${competencyColors[skill.competencyLevel] || ''}`}>
                      {skill.competencyLevel.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{skill.yearsOfExperience}y experience</span>
                    <span>·</span>
                    <span>{skill.projectsApplied.length} projects</span>
                    <span>·</span>
                    <span>{skill.evidence.length} evidence items</span>
                    {skill.verifiedBy.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Verified by {skill.verifiedBy.length}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* At-Risk Skills Warning */}
      {atRiskSkills.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
              At-Risk Skills ({atRiskSkills.length})
            </h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            These expert-level skills lack documentation or verification. They will be lost if {person.name} departs.
          </p>
          <div className="space-y-2">
            {atRiskSkills.map(skill => (
              <div
                key={skill.id}
                onClick={() => onSkillClick?.(skill.id)}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                <span className="text-xs text-red-500">
                  {skill.sources.length === 0 ? 'No documentation' : `${skill.sources.length} sources`}
                  {skill.verifiedBy.length === 0 ? ' · Unverified' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
