import type { ContextMemory, Email, Meeting, Task, Workflow } from '@/providers/AIAssistantProvider';

const now = new Date();

export const mockTasks: Task[] = [
  {
    id: 'task_1',
    title: 'Review Q2 roadmap',
    description: 'Review and confirm priorities for the next sprint.',
    priority: 'high',
    status: 'pending',
    aiGenerated: true,
    createdAt: now,
    tags: ['planning'],
  },
  {
    id: 'task_2',
    title: 'Draft client follow-up email',
    priority: 'medium',
    status: 'in-progress',
    aiGenerated: true,
    createdAt: now,
    tags: ['communications'],
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: 'meeting_1',
    title: 'Team Standup',
    startTime: new Date(now.getTime() + 30 * 60 * 1000).toISOString(),
    endTime: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
    attendees: ['you@company.com', 'team@company.com'],
    type: 'video',
    aiScheduled: true,
    preparationNeeded: false,
    status: 'scheduled',
  },
];

export const mockEmails: Email[] = [
  {
    id: 'email_1',
    from: 'alex@company.com',
    to: ['you@company.com'],
    subject: 'Quick update',
    body: 'Sharing a quick update on the project status. Let me know if you need anything.',
    timestamp: now,
    read: false,
    aiDrafted: false,
    priority: 'medium',
    category: 'work',
  },
];

export const mockMemories: ContextMemory[] = [
  {
    id: 'memory_1',
    type: 'preference',
    content: 'Prefers short status updates and clear action items.',
    metadata: {},
    timestamp: now,
    importance: 0.6,
    tags: ['preference'],
  },
];

export const mockWorkflows: Workflow[] = [
  {
    id: 'workflow_1',
    name: 'Daily Briefing',
    description: 'Generate a daily summary of tasks, meetings, and emails.',
    trigger: {
      type: 'time',
      config: { cron: '0 9 * * *' },
    },
    actions: [{ type: 'generate_summary', config: {} }],
    enabled: true,
    runCount: 0,
  },
];
