import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AuthorityRole = 'CDOO' | 'DDO' | 'WOL' | 'AOD' | null;

export interface RoleConfig {
  code: AuthorityRole;
  title: string;
  fullTitle: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  level: number;
  canOverride: boolean;
  canEscalate: boolean;
}

export const ROLE_CONFIGS: Record<Exclude<AuthorityRole, null>, RoleConfig> = {
  CDOO: {
    code: 'CDOO',
    title: 'CDOO',
    fullTitle: 'Chief Decision & Orchestration Officer',
    description: 'Final authority — overrides everything',
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.15)',
    icon: 'crown',
    level: 1,
    canOverride: true,
    canEscalate: false,
  },
  DDO: {
    code: 'DDO',
    title: 'DDO',
    fullTitle: 'Duty Decision Officer',
    description: 'Daily decision maker — active approvals',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    icon: 'zap',
    level: 2,
    canOverride: false,
    canEscalate: true,
  },
  WOL: {
    code: 'WOL',
    title: 'WOL',
    fullTitle: 'Workforce Operations Lead',
    description: 'Manages all human employees + task assignment',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    icon: 'users',
    level: 3,
    canOverride: false,
    canEscalate: true,
  },
  AOD: {
    code: 'AOD',
    title: 'AOD',
    fullTitle: 'AgentOps Director',
    description: 'Manages all AI agents + monitors performance',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    icon: 'bot',
    level: 3,
    canOverride: false,
    canEscalate: true,
  },
};

export interface PendingDecision {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  requestedAt: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiredRole: AuthorityRole;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  type: 'task' | 'assignment' | 'activation' | 'configuration' | 'approval';
  entityId?: string;
  entityType?: 'agent' | 'employee' | 'task' | 'workflow';
}

interface CommandCenterContextType {
  activeRole: AuthorityRole;
  setActiveRole: (role: AuthorityRole) => void;
  pendingDecisions: PendingDecision[];
  addDecision: (decision: Omit<PendingDecision, 'id' | 'requestedAt' | 'status'>) => void;
  approveDecision: (id: string, role: AuthorityRole) => void;
  rejectDecision: (id: string, role: AuthorityRole) => void;
  escalateDecision: (id: string) => void;
  getDecisionsForRole: (role: AuthorityRole) => PendingDecision[];
  canActOnDecision: (decision: PendingDecision, role: AuthorityRole) => boolean;
  isActive: boolean;
  activate: () => void;
  deactivate: () => void;
}

const CommandCenterContext = createContext<CommandCenterContextType | undefined>(undefined);

export function CommandCenterProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<AuthorityRole>(null);
  const [pendingDecisions, setPendingDecisions] = useState<PendingDecision[]>([
    {
      id: '1',
      title: 'Activate AI Sales Agent Team',
      description: 'Approve activation of 3 new AI sales agents for Q2 campaign',
      requestedBy: 'AOD',
      requestedAt: new Date(Date.now() - 3600000),
      priority: 'high',
      requiredRole: 'CDOO',
      status: 'pending',
      type: 'activation',
      entityId: 'sales-team-q2',
      entityType: 'agent',
    },
    {
      id: '2',
      title: 'Employee Workload Reassignment',
      description: 'Reassign 5 customer support tickets from Sarah to AI Support Agent',
      requestedBy: 'WOL',
      requestedAt: new Date(Date.now() - 7200000),
      priority: 'medium',
      requiredRole: 'DDO',
      status: 'pending',
      type: 'assignment',
      entityId: 'tickets-5',
      entityType: 'task',
    },
    {
      id: '3',
      title: 'Marketing Campaign Budget Approval',
      description: 'Approve $5,000 budget for new AI-driven marketing campaign',
      requestedBy: 'DDO',
      requestedAt: new Date(Date.now() - 1800000),
      priority: 'critical',
      requiredRole: 'CDOO',
      status: 'pending',
      type: 'approval',
    },
    {
      id: '4',
      title: 'Pause Underperforming Agent',
      description: 'AI Data Analyst showing 73% success rate, recommend temporary pause',
      requestedBy: 'AOD',
      requestedAt: new Date(Date.now() - 10800000),
      priority: 'medium',
      requiredRole: 'DDO',
      status: 'pending',
      type: 'configuration',
      entityId: 'ai-data-analyst-1',
      entityType: 'agent',
    },
    {
      id: '5',
      title: 'New Employee Onboarding Workflow',
      description: 'Create automated workflow for new customer success manager',
      requestedBy: 'WOL',
      requestedAt: new Date(Date.now() - 14400000),
      priority: 'low',
      requiredRole: 'WOL',
      status: 'pending',
      type: 'task',
      entityId: 'emp-new-csm',
      entityType: 'employee',
    },
  ]);
  const [isActive, setIsActive] = useState(false);

  const setActiveRole = useCallback((role: AuthorityRole) => {
    setActiveRoleState(role);
    if (role) {
      setIsActive(true);
    }
  }, []);

  const activate = useCallback(() => {
    setIsActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setIsActive(false);
    setActiveRoleState(null);
  }, []);

  const addDecision = useCallback((decision: Omit<PendingDecision, 'id' | 'requestedAt' | 'status'>) => {
    const newDecision: PendingDecision = {
      ...decision,
      id: Math.random().toString(36).substring(7),
      requestedAt: new Date(),
      status: 'pending',
    };
    setPendingDecisions(prev => [newDecision, ...prev]);
  }, []);

  const approveDecision = useCallback((id: string, role: AuthorityRole) => {
    setPendingDecisions(prev =>
      prev.map(d =>
        d.id === id && (d.requiredRole === role || role === 'CDOO')
          ? { ...d, status: 'approved' as const }
          : d
      )
    );
  }, []);

  const rejectDecision = useCallback((id: string, role: AuthorityRole) => {
    setPendingDecisions(prev =>
      prev.map(d =>
        d.id === id && (d.requiredRole === role || role === 'CDOO')
          ? { ...d, status: 'rejected' as const }
          : d
      )
    );
  }, []);

  const escalateDecision = useCallback((id: string) => {
    setPendingDecisions(prev =>
      prev.map(d => {
        if (d.id !== id) return d;
        const hierarchy: AuthorityRole[] = ['WOL', 'AOD', 'DDO', 'CDOO'];
        const currentIndex = hierarchy.indexOf(d.requiredRole);
        const nextRole = currentIndex < hierarchy.length - 1 ? hierarchy[currentIndex + 1] : d.requiredRole;
        return {
          ...d,
          requiredRole: nextRole,
          status: 'escalated' as const,
        };
      })
    );
  }, []);

  const getDecisionsForRole = useCallback((role: AuthorityRole) => {
    if (!role) return [];
    if (role === 'CDOO') {
      return pendingDecisions.filter(d => d.status === 'pending');
    }
    return pendingDecisions.filter(d => d.requiredRole === role && d.status === 'pending');
  }, [pendingDecisions]);

  const canActOnDecision = useCallback((decision: PendingDecision, role: AuthorityRole): boolean => {
    if (!role || decision.status !== 'pending') return false;
    if (role === 'CDOO') return true;
    return decision.requiredRole === role;
  }, []);

  return (
    <CommandCenterContext.Provider
      value={{
        activeRole,
        setActiveRole,
        pendingDecisions,
        addDecision,
        approveDecision,
        rejectDecision,
        escalateDecision,
        getDecisionsForRole,
        canActOnDecision,
        isActive,
        activate,
        deactivate,
      }}
    >
      {children}
    </CommandCenterContext.Provider>
  );
}

export function useCommandCenter() {
  const context = useContext(CommandCenterContext);
  if (context === undefined) {
    throw new Error('useCommandCenter must be used within a CommandCenterProvider');
  }
  return context;
}
