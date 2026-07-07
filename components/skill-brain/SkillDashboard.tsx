import React from 'react';
import {
  Brain,
  Users,
  AlertTriangle,
  CheckCircle,
  Shield,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
} from 'lucide-react-native';
import type { SkillBrainStats, CompetencyLevel, SkillCategory } from '../../lib/skill-brain/types';

interface SkillDashboardProps {
  stats: SkillBrainStats;
  onSkillClick?: (skillId: string) => void;
  onCategoryClick?: (category: SkillCategory) => void;
}

const categoryLabels: Record<string, string> = {
  technical: 'Technical',
  domain: 'Domain Knowledge',
  process: 'Process',
  soft_skill: 'Soft Skills',
  management: 'Management',
  communication: 'Communication',
  tool: 'Tools',
  framework: 'Frameworks',
  language: 'Languages',
  platform: 'Platforms',
  business: 'Business',
  compliance: 'Compliance',
  tribal: 'Tribal Knowledge',
};

const categoryColors: Record<string, string> = {
  technical: 'bg-blue-500',
  domain: 'bg-green-500',
  process: 'bg-purple-500',
  soft_skill: 'bg-pink-500',
  management: 'bg-orange-500',
  communication: 'bg-teal-500',
  tool: 'bg-indigo-500',
  framework: 'bg-cyan-500',
  language: 'bg-yellow-500',
  platform: 'bg-red-500',
  business: 'bg-emerald-500',
  compliance: 'bg-gray-500',
  tribal: 'bg-violet-500',
};

export function SkillDashboard({ stats, onCategoryClick, onSkillClick }: SkillDashboardProps) {
  const riskLevel = stats.overallRiskScore >= 70 ? 'high' : stats.overallRiskScore >= 40 ? 'medium' : 'low';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skill Brain Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enterprise skill coverage, risk assessment, and transfer readiness
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Brain}
          label="Total Skills"
          value={stats.totalSkills}
          color="blue"
          subtext={`Across ${stats.totalSkillMds} skill.md files`}
        />
        <StatCard
          icon={Users}
          label="People Tracked"
          value={stats.totalPeople}
          color="green"
          subtext={`${Object.keys(stats.peopleByDepartment).length} departments`}
        />
        <StatCard
          icon={AlertTriangle}
          label="At-Risk Skills"
          value={stats.atRiskSkills}
          color="red"
          trend="up"
          trendLabel="needs attention"
        />
        <StatCard
          icon={CheckCircle}
          label="Transfer Ready"
          value={stats.transferReadyCount}
          color="purple"
          trend={stats.transferReadyCount > 0 ? 'up' : 'down'}
          trendLabel={stats.transferReadyCount > 0 ? 'good' : 'needs work'}
        />
      </div>

      {/* Coverage & Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Coverage Score</h3>
            <Shield className={`w-5 h-5 ${
              stats.averageCoverageScore >= 70 ? 'text-green-500' :
              stats.averageCoverageScore >= 40 ? 'text-yellow-500' : 'text-red-500'
            }`} />
          </div>
          <div className="flex items-end gap-4">
            <span className={`text-4xl font-bold ${
              stats.averageCoverageScore >= 70 ? 'text-green-600 dark:text-green-400' :
              stats.averageCoverageScore >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.averageCoverageScore}%
            </span>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    stats.averageCoverageScore >= 70 ? 'bg-green-500' :
                    stats.averageCoverageScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stats.averageCoverageScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Higher is better. Target: 70%+
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
            <Target className={`w-5 h-5 ${
              riskLevel === 'low' ? 'text-green-500' :
              riskLevel === 'medium' ? 'text-yellow-500' : 'text-red-500'
            }`} />
          </div>
          <div className="flex items-end gap-4">
            <span className={`text-4xl font-bold ${
              riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
              riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.overallRiskScore}%
            </span>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    riskLevel === 'low' ? 'bg-green-500' :
                    riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stats.overallRiskScore}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {riskLevel === 'high' ? '⚠️ Immediate action required' :
             riskLevel === 'medium' ? '⚠️ Monitor and improve' :
             '✅ Low risk — well documented'}
          </p>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Skills by Category</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(stats.skillsByCategory).map(([category, count]) => (
            <button
              key={category}
              onClick={() => onCategoryClick?.(category as SkillCategory)}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
            >
              <div className={`w-3 h-3 rounded-full ${categoryColors[category] || 'bg-gray-500'}`} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {categoryLabels[category] || category}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {count} skills
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Skills by Competency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Competency Distribution</h3>
          </div>
          {Object.entries(stats.skillsByCompetency).map(([level, count]) => {
            const maxCount = Math.max(...Object.values(stats.skillsByCompetency), 1);
            const pct = (count / maxCount) * 100;
            return (
              <div key={level} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {level.replace(/_/g, ' ')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{count}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* At-Risk Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              At-Risk Skills ({stats.topAtRiskSkills.length})
            </h3>
          </div>
          {stats.topAtRiskSkills.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No at-risk skills found.</p>
          ) : (
            <div className="space-y-2">
              {stats.topAtRiskSkills.slice(0, 5).map((skill, i) => (
                <div
                  key={skill.id}
                  onClick={() => onSkillClick?.(skill.id)}
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {skill.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.category} · Expert · {skill.sources.length} sources
                    </p>
                  </div>
                  <span className="text-xs font-medium text-red-600 dark:text-red-400">
                    {skill.verifiedBy.length === 0 ? 'Unverified' : `${skill.verifiedBy.length} verifiers`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* People by Department */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">People by Department</h3>
        </div>
        {Object.keys(stats.peopleByDepartment).length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No departments tracked yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stats.peopleByDepartment).map(([dept, count]) => (
              <div key={dept} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{count}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{dept}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  subtext,
  trend,
  trendLabel,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
  subtext?: string;
  trend?: 'up' | 'down';
  trendLabel?: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <div className={`p-2 rounded-lg ${colorClasses[color] || ''}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      {subtext && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtext}</p>
      )}
      {trend && trendLabel && (
        <div className="flex items-center gap-1 mt-1">
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span className={`text-xs ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trendLabel}
          </span>
        </div>
      )}
    </div>
  );
}
