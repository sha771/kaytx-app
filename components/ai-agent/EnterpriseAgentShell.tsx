import React from 'react';
import { AIEmployee } from '@/constants/aiEmployees';
import { AgentShell } from './AgentShell';

interface EnterpriseAgentShellProps {
  agent: AIEmployee;
  customTabs?: {
    id: string;
    label: string;
    icon: any;
    component: React.ReactNode;
  }[];
  customActions?: React.ReactNode;
  isActive?: boolean;
  onToggleActive?: (next: boolean) => void;
}

export const EnterpriseAgentShell: React.FC<EnterpriseAgentShellProps> = ({
  agent,
  customTabs = [],
  customActions,
  isActive,
  onToggleActive,
}) => {
  return (
    <AgentShell
      agent={agent}
      customTabs={customTabs}
      customActions={customActions}
      isActive={isActive}
      onToggleActive={onToggleActive}
    />
  );
};
