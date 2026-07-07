import React, { useState } from 'react';
import { Users, ArrowLeft, Bell, Filter, Search, Calendar, Download } from 'lucide-react-native';
import { SkillTransferView } from '../../components/skill-brain/SkillTransferView';
import type { TransferPlan } from '../../lib/skill-brain/types';

const MOCK_PLANS: TransferPlan[] = [
  {
    id: 'transfer_1',
    personId: 'person_1',
    personName: 'Alex Chen',
    targetPersonId: 'person_5',
    targetPersonName: 'Maria Garcia',
    skills: [
      {
        skillId: 'sk_1',
        skillName: 'Kubernetes Cluster Management',
        category: 'technical',
        competencyLevel: 'expert',
        transferReadiness: 'partially_ready',
        estimatedHandoffHours: 12,
        documentationStatus: 'partial',
      },
      {
        skillId: 'sk_2',
        skillName: 'Terraform & IaC',
        category: 'tool',
        competencyLevel: 'expert',
        transferReadiness: 'ready',
        estimatedHandoffHours: 8,
        documentationStatus: 'complete',
      },
      {
        skillId: 'sk_3',
        skillName: 'CI/CD Pipeline Design',
        category: 'technical',
        competencyLevel: 'proficient',
        transferReadiness: 'fully_ready',
        estimatedHandoffHours: 4,
        documentationStatus: 'complete',
      },
      {
        skillId: 'sk_5',
        skillName: 'Legacy Mainframe Integration',
        category: 'technical',
        competencyLevel: 'expert',
        transferReadiness: 'not_ready',
        estimatedHandoffHours: 16,
        documentationStatus: 'none',
      },
    ],
    status: 'draft',
    priority: 'critical',
    createdAt: '2026-06-28T10:00:00.000Z',
    updatedAt: '2026-06-28T10:00:00.000Z',
    notes: 'Critical departure — Alex is the only person with mainframe expertise.',
  },
  {
    id: 'transfer_2',
    personId: 'person_2',
    personName: 'Sarah Lee',
    targetPersonId: 'person_6',
    targetPersonName: 'James Wilson',
    skills: [
      {
        skillId: 'sk_10',
        skillName: 'React Architecture',
        category: 'framework',
        competencyLevel: 'expert',
        transferReadiness: 'ready',
        estimatedHandoffHours: 6,
        documentationStatus: 'complete',
      },
      {
        skillId: 'sk_11',
        skillName: 'Design System Management',
        category: 'technical',
        competencyLevel: 'proficient',
        transferReadiness: 'partially_ready',
        estimatedHandoffHours: 4,
        documentationStatus: 'partial',
      },
    ],
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-06-20T14:30:00.000Z',
    updatedAt: '2026-06-28T09:15:00.000Z',
    notes: 'Transfer sessions scheduled for next week.',
  },
  {
    id: 'transfer_3',
    personId: 'person_3',
    personName: 'Mike Johnson',
    skills: [
      {
        skillId: 'sk_20',
        skillName: 'PostgreSQL Optimization',
        category: 'technical',
        competencyLevel: 'expert',
        transferReadiness: 'fully_ready',
        estimatedHandoffHours: 3,
        documentationStatus: 'complete',
      },
    ],
    status: 'completed',
    priority: 'medium',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-15T17:00:00.000Z',
    completedAt: '2026-06-15T17:00:00.000Z',
    notes: 'All skills documented and transferred.',
  },
];

export default function SkillTransferPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPlans = MOCK_PLANS.filter(plan => {
    const matchesSearch = !searchQuery ||
      plan.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plan.targetPersonName?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExecutePlan = async (planId: string) => {
    console.log('Executing transfer plan:', planId);
    // In production, this would call the skill brain service
    alert(`Transfer plan ${planId} execution started. Skills will be marked as transferred.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Skill Transfer Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage skill handoff between departing employees and successors
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Bell className="w-4 h-4" />
              Alert Stakeholders
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by person name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Transfer Plans */}
        <SkillTransferView
          plans={filteredPlans}
          onPlanClick={(planId) => console.log('Plan clicked:', planId)}
          onExecutePlan={handleExecutePlan}
        />
      </div>
    </div>
  );
}
