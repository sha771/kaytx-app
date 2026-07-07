import React from 'react';
import {
  Users,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  Shield,
  FileText,
  Calendar,
  BarChart3,
} from 'lucide-react-native';
import type {
  TransferPlan,
  TransferReadiness,
  CompetencyLevel,
} from '../../lib/skill-brain/types';

interface SkillTransferViewProps {
  plans: TransferPlan[];
  onPlanClick?: (planId: string) => void;
  onExecutePlan?: (planId: string) => void;
}

const priorityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800',
};

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const readinessBadgeColors: Record<TransferReadiness, string> = {
  not_ready: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  partially_ready: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  ready: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  fully_ready: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  transferred: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
};

export function SkillTransferView({ plans, onPlanClick, onExecutePlan }: SkillTransferViewProps) {
  const activePlans = plans.filter(p => p.status !== 'completed' && p.status !== 'cancelled');
  const completedPlans = plans.filter(p => p.status === 'completed');

  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Transfer Plans
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Transfer plans are created automatically when employees depart or when a succession workflow is initiated.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Plans</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{plans.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activePlans.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedPlans.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Skills</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {plans.reduce((sum, p) => sum + p.skills.length, 0)}
          </p>
        </div>
      </div>

      {/* Active Plans */}
      {activePlans.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Transfer Plans
          </h2>
          <div className="space-y-4">
            {activePlans.map(plan => (
              <TransferPlanCard
                key={plan.id}
                plan={plan}
                onClick={() => onPlanClick?.(plan.id)}
                onExecute={() => onExecutePlan?.(plan.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Plans */}
      {completedPlans.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Completed Transfers
          </h2>
          <div className="space-y-3">
            {completedPlans.slice(0, 5).map(plan => (
              <div
                key={plan.id}
                onClick={() => onPlanClick?.(plan.id)}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {plan.personName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {plan.skills.length} skills transferred
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${statusColors[plan.status]}`}>
                    {plan.status.replace(/_/g, ' ')}
                  </span>
                  {plan.completedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(plan.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TransferPlanCard({
  plan,
  onClick,
  onExecute,
}: {
  plan: TransferPlan;
  onClick?: () => void;
  onExecute?: () => void;
}) {
  const readySkills = plan.skills.filter(
    s => s.transferReadiness === 'ready' || s.transferReadiness === 'fully_ready'
  );
  const totalSkills = plan.skills.length;
  const progressPct = totalSkills > 0 ? Math.round((readySkills.length / totalSkills) * 100) : 0;

  const criticalSkills = plan.skills.filter(s => s.competencyLevel === 'expert').length;
  const undocumentedSkills = plan.skills.filter(s => s.documentationStatus === 'none').length;

  const createdAt = new Date(plan.createdAt);
  const daysSinceCreation = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {plan.personName}
            </h3>
            {plan.targetPersonName && (
              <>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {plan.targetPersonName}
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created {daysSinceCreation}d ago · {plan.skills.length} skills to transfer
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[plan.priority] || ''}`}>
            {plan.priority}
          </span>
          <span className={`inline-flex px-3 py-1 rounded text-xs font-medium ${statusColors[plan.status]}`}>
            {plan.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Transfer Readiness</span>
          <span className="font-medium text-gray-900 dark:text-white">{progressPct}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              progressPct >= 80 ? 'bg-green-500' :
              progressPct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {readySkills.length}/{totalSkills} ready
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {criticalSkills} expert-level
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {undocumentedSkills} undocumented
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            ~{plan.skills.reduce((sum, s) => sum + s.estimatedHandoffHours, 0)}h total
          </span>
        </div>
      </div>

      {/* Skills Preview */}
      {plan.skills.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {plan.skills.slice(0, 8).map(skill => (
              <span
                key={skill.skillId}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${readinessBadgeColors[skill.transferReadiness] || ''}`}
                title={`${skill.skillName} - ${skill.competencyLevel}`}
              >
                {skill.skillName}
              </span>
            ))}
            {plan.skills.length > 8 && (
              <span className="text-xs text-gray-500 self-center">
                +{plan.skills.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {plan.status === 'draft' && onExecute && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={(e) => { e.stopPropagation(); onExecute(); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Execute Transfer Plan
          </button>
        </div>
      )}
    </div>
  );
}
