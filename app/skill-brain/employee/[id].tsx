import React from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft, User } from 'lucide-react-native';
import { EmployeeSkillProfile } from '../../../components/skill-brain/EmployeeSkillProfile';
import type { SkillPerson, SkillEntry } from '../../../lib/skill-brain/types';

const MOCK_PERSON: SkillPerson = {
  id: 'person_1',
  name: 'Alex Chen',
  email: 'alex.chen@company.com',
  role: 'Senior DevOps Engineer',
  department: 'engineering',
  skills: ['kubernetes', 'terraform', 'ci-cd', 'monitoring', 'cloud-architecture'],
  joinedAt: '2022-03-15T00:00:00.000Z',
  transferReadiness: 'not_ready',
};

const MOCK_SKILLS: SkillEntry[] = [
  {
    id: 'sk_1',
    name: 'Kubernetes Cluster Management',
    category: 'technical',
    competencyLevel: 'expert',
    description: 'Managing large-scale Kubernetes clusters across multiple regions with automated scaling, service mesh, and observability.',
    evidence: [
      'Designed and implemented multi-cluster architecture serving 500k+ req/s',
      'Led migration from self-managed to EKS with zero downtime',
    ],
    sources: [
      {
        id: 'src_1',
        type: 'document',
        title: 'K8s Architecture Design Doc',
        path: '/docs/architecture/k8s-design-v2.pdf',
        createdAt: '2025-06-01',
        extractedAt: '2026-03-10',
        confidence: 0.95,
      },
    ],
    relatedSkills: ['docker', 'istio', 'helm'],
    tags: ['kubernetes', 'devops', 'cloud-native', 'container-orchestration'],
    confidence: 0.95,
    lastPracticed: '2026-03-15',
    yearsOfExperience: 5,
    projectsApplied: ['Platform Migration 2025', 'Multi-Region Rollout'],
    verifiedBy: ['sarah.lee@company.com', 'jim.wu@company.com'],
  },
  {
    id: 'sk_2',
    name: 'Terraform & IaC',
    category: 'tool',
    competencyLevel: 'expert',
    description: 'Infrastructure as Code using Terraform with custom modules, state management, and policy-as-code.',
    evidence: [
      'Built 200+ Terraform modules used across the organization',
      'Implemented Terragrunt-based multi-environment IaC pipeline',
    ],
    sources: [
      {
        id: 'src_2',
        type: 'code',
        title: 'terraform-modules',
        path: '/repos/infrastructure/terraform-modules',
        createdAt: '2024-01-10',
        extractedAt: '2026-03-10',
        confidence: 0.9,
      },
    ],
    relatedSkills: ['aws', 'pulumi', 'ansible'],
    tags: ['terraform', 'iac', 'devops', 'infrastructure'],
    confidence: 0.9,
    lastPracticed: '2026-03-01',
    yearsOfExperience: 4,
    projectsApplied: ['Cloud Migration', 'Greenfield Platform'],
    verifiedBy: ['sarah.lee@company.com'],
  },
  {
    id: 'sk_3',
    name: 'CI/CD Pipeline Design',
    category: 'technical',
    competencyLevel: 'proficient',
    description: 'Designing and implementing CI/CD pipelines with GitHub Actions, ArgoCD, and custom tooling.',
    evidence: [
      'Designed GitOps workflow reducing deploy time by 80%',
      'Implemented canary deployments and automated rollback strategies',
    ],
    sources: [
      {
        id: 'src_3',
        type: 'document',
        title: 'CI/CD Best Practices',
        path: '/docs/devops/cicd-practices.md',
        createdAt: '2025-09-20',
        extractedAt: '2026-03-10',
        confidence: 0.85,
      },
    ],
    relatedSkills: ['github-actions', 'argocd', 'jenkins'],
    tags: ['ci-cd', 'devops', 'automation', 'gitops'],
    confidence: 0.85,
    lastPracticed: '2026-02-28',
    yearsOfExperience: 3,
    projectsApplied: ['Pipeline Modernization'],
    verifiedBy: [],
  },
  {
    id: 'sk_4',
    name: 'Cloud Cost Optimization',
    category: 'domain',
    competencyLevel: 'proficient',
    description: 'AWS cloud cost analysis, right-sizing, reserved instances, and savings plans optimization.',
    evidence: [
      'Reduced monthly cloud spend by 35% ($120k/month savings)',
      'Implemented automated cost anomaly detection',
    ],
    sources: [],
    relatedSkills: ['aws', 'finops'],
    tags: ['cloud', 'cost', 'aws', 'finops'],
    confidence: 0.8,
    lastPracticed: '2026-02-15',
    yearsOfExperience: 2,
    projectsApplied: ['Cost Optimization Initiative'],
    verifiedBy: [],
  },
  {
    id: 'sk_5',
    name: 'Legacy Mainframe Integration',
    category: 'technical',
    competencyLevel: 'expert',
    description: 'COBOL-based mainframe to cloud integration patterns, batch job migration, and API modernization.',
    evidence: [
      'Led migration of 15 critical batch jobs from mainframe to AWS Batch',
    ],
    sources: [],
    relatedSkills: ['cobol', 'batch-processing'],
    tags: ['mainframe', 'legacy', 'migration', 'cobol'],
    confidence: 0.95,
    lastPracticed: '2026-01-20',
    yearsOfExperience: 8,
    projectsApplied: ['Mainframe Modernization'],
    verifiedBy: [],
  },
];

export default function EmployeeSkillPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Skill Brain
        </button>

        <EmployeeSkillProfile
          person={MOCK_PERSON}
          skills={MOCK_SKILLS}
          onSkillClick={(skillId) => console.log('Skill clicked:', skillId)}
        />
      </div>
    </div>
  );
}
