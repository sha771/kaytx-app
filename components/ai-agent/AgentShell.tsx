import React from 'react';
import { AIEmployee } from '@/constants/aiEmployees';
import { EnhancedAgentShell } from './EnhancedAgentShell';

type AgentInput = Partial<AIEmployee> & Pick<AIEmployee, 'id' | 'name' | 'title' | 'description' | 'capabilities'>;

interface AgentShellProps {
    agent: AgentInput;
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

export const AgentShell: React.FC<AgentShellProps> = ({ agent, customTabs = [], customActions, isActive: controlledIsActive, onToggleActive }) => {
    return (
        <EnhancedAgentShell
            agent={agent}
            customTabs={customTabs}
            customActions={customActions}
            isActive={controlledIsActive}
            onToggleActive={onToggleActive}
        />
    );
};
