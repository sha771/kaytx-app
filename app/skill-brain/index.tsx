import React, { useState } from 'react';
import { Brain, Users, AlertTriangle, ArrowRight, FileText } from 'lucide-react-native';
import { SkillDashboard } from '../../components/skill-brain/SkillDashboard';
import { SkillMdViewer } from '../../components/skill-brain/SkillMdViewer';
import { SkillGraphView } from '../../components/skill-brain/SkillGraphView';
import { SkillTransferView } from '../../components/skill-brain/SkillTransferView';
import type { SkillMd, SkillBrainStats, SkillCategory } from '../../lib/skill-brain/types';

type Tab = 'dashboard' | 'skills' | 'graph' | 'transfers';

const MOCK_STATS: SkillBrainStats = {
  totalSkillMds: 12,
  totalSkills: 147,
  totalPeople: 23,
  totalRelationships: 89,
  atRiskSkills: 14,
  transferReadyCount: 52,
  averageCoverageScore: 62,
  overallRiskScore: 45,
  skillsByCategory: {
    technical: 45,
    domain: 22,
    process: 18,
    soft_skill: 15,
    management: 10,
    communication: 8,
    tool: 12,
    framework: 7,
    language: 5,
    platform: 3,
    business: 2,
    compliance: 0,
    tribal: 0,
  },
  skillsByCompetency: {
    novice: 20,
    advanced_beginner: 35,
    competent: 42,
    proficient: 30,
    expert: 20,
  },
  skillsByContentType: {
    document: 45,
    file: 20,
    conversation: 30,
    meeting: 15,
    email: 12,
    chat: 8,
    code: 12,
    decision: 5,
    project: 0,
    tribal: 0,
    sop: 0,
    workflow: 0,
    playbook: 0,
    note: 0,
  },
  peopleByDepartment: {
    engineering: 8,
    design: 4,
    marketing: 3,
    sales: 3,
    hr: 2,
    finance: 2,
    operations: 1,
  },
  topAtRiskSkills: [
    {
      id: 'sk_1',
      name: 'Kubernetes Cluster Management',
      category: 'technical' as SkillCategory,
      competencyLevel: 'expert' as any,
      description: 'Managing large-scale K8s clusters across multiple regions',
      evidence: [],
      sources: [],
      relatedSkills: [],
      tags: ['k8s', 'devops'],
      confidence: 0.9,
      lastPracticed: '2026-03-15',
      yearsOfExperience: 5,
      projectsApplied: [],
      verifiedBy: [],
    },
    {
      id: 'sk_2',
      name: 'Legacy Mainframe Integration',
      category: 'technical' as SkillCategory,
      competencyLevel: 'expert' as any,
      description: 'COBOL-based mainframe to cloud integration patterns',
      evidence: [],
      sources: [],
      relatedSkills: [],
      tags: ['mainframe', 'legacy'],
      confidence: 0.95,
      lastPracticed: '2026-01-20',
      yearsOfExperience: 8,
      projectsApplied: [],
      verifiedBy: [],
    },
  ],
};

export default function SkillBrainPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedSkillMdId, setSelectedSkillMdId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  const tabs: Array<{ id: Tab; label: string; icon: any }> = [
    { id: 'dashboard', label: 'Dashboard', icon: Brain },
    { id: 'skills', label: 'Skill Files', icon: FileText },
    { id: 'graph', label: 'Skill Graph', icon: AlertTriangle },
    { id: 'transfers', label: 'Transfers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mb-8 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedSkillMdId(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
          <div className="ml-auto pr-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Skill Brain v1.0
            </span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <SkillDashboard
            stats={MOCK_STATS}
            onCategoryClick={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('skills');
            }}
            onSkillClick={(skillId) => {
              console.log('Skill clicked:', skillId);
            }}
          />
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            {selectedCategory && (
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear filter
                </button>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {selectedCategory.replace(/_/g, ' ')}
                </span>
              </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Skill Files
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Individual skill.md files will be listed here. Each file represents a skill capture from a document, conversation, codebase, or other content source.
              </p>
              {selectedCategory && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Filtered by: {selectedCategory.replace(/_/g, ' ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'graph' && (
          <SkillGraphView
            skills={MOCK_STATS.topAtRiskSkills}
            relationships={[]}
            onSkillClick={(skillId) => console.log('Graph skill clicked:', skillId)}
          />
        )}

        {activeTab === 'transfers' && (
          <SkillTransferView
            plans={[]}
            onPlanClick={(planId) => console.log('Plan clicked:', planId)}
            onExecutePlan={(planId) => console.log('Execute plan:', planId)}
          />
        )}
      </div>
    </div>
  );
}
