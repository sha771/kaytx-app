import { useState, useEffect, useMemo, useCallback } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRorkAgent, createRorkTool } from '@rork-ai/toolkit-sdk';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dueDate?: string;
  estimatedTime?: string;
  actualTime?: string;
  energyLevel?: 'high' | 'medium' | 'low';
  aiGenerated: boolean;
  createdAt: Date;
  completedAt?: Date;
  tags?: string[];
  assignedTo?: string;
  projectId?: string;
  dependencies?: string[];
  subtasks?: string[];
  attachments?: string[];
  aiSuggestions?: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  complexity?: 'simple' | 'moderate' | 'complex';
  recurringConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location?: string;
  type: 'video' | 'phone' | 'in-person';
  aiScheduled: boolean;
  preparationNeeded: boolean;
  meetingLink?: string;
  notes?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  agenda?: string[];
  actionItems?: { task: string; assignee: string; dueDate?: string }[];
  transcript?: string;
  recording?: string;
  aiSummary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  productivityScore?: number;
  followUpRequired?: boolean;
  recurringConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
}

export interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
  aiDrafted: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'promotional' | 'social' | 'newsletter' | 'urgent';
  attachments?: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  intent?: 'inquiry' | 'request' | 'update' | 'followup' | 'meeting' | 'other';
  requiresResponse?: boolean;
  suggestedReplies?: string[];
  labels?: string[];
  threadId?: string;
  starred?: boolean;
  archived?: boolean;
  aiContext?: string;
  relatedTasks?: string[];
  relatedMeetings?: string[];
}

export interface ContextMemory {
  id: string;
  type: 'conversation' | 'preference' | 'habit' | 'contact' | 'document';
  content: string;
  metadata: Record<string, any>;
  timestamp: Date;
  importance: number;
  tags: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'time' | 'event' | 'condition';
    config: Record<string, any>;
  };
  actions: {
    type: string;
    config: Record<string, any>;
  }[];
  enabled: boolean;
  lastRun?: Date;
  runCount: number;
}

export interface ProductivityInsight {
  id: string;
  type: 'peak-hours' | 'response-time' | 'meeting-load' | 'task-completion' | 'focus-time' | 'collaboration' | 'burnout-risk' | 'efficiency' | 'goal-progress';
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  recommendation?: string;
  severity?: 'info' | 'warning' | 'critical';
  actionable?: boolean;
  chartData?: { label: string; value: number }[];
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';
  progress: number;
  startDate: string;
  endDate?: string;
  team: string[];
  priority: 'high' | 'medium' | 'low';
  tags?: string[];
  budget?: number;
  spent?: number;
  aiGenerated: boolean;
  metrics?: { key: string; value: string }[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  type: 'personal' | 'professional' | 'team' | 'company';
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  milestones?: { title: string; completed: boolean; date?: string }[];
  priority: 'high' | 'medium' | 'low';
  aiGenerated: boolean;
  relatedTasks?: string[];
  relatedProjects?: string[];
}

export interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'sheet' | 'note' | 'scan' | 'image' | 'other';
  size: number;
  url?: string;
  content?: string;
  aiSummary?: string;
  aiTags?: string[];
  uploadedAt: Date;
  lastModified: Date;
  sharedWith?: string[];
  folderId?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  language?: string;
  extractedData?: Record<string, any>;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  tags?: string[];
  lastContact?: Date;
  notes?: string;
  aiInsights?: string[];
  relationshipScore?: number;
  preferredContactMethod?: 'email' | 'phone' | 'video' | 'chat';
  timezone?: string;
  socialProfiles?: { platform: string; url: string }[];
}

export interface VoiceNote {
  id: string;
  title?: string;
  duration: number;
  recordedAt: Date;
  transcription?: string;
  aiSummary?: string;
  actionItems?: string[];
  tags?: string[];
  url?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface AIAssistantContextValue {
  tasks: Task[];
  meetings: Meeting[];
  emails: Email[];
  memories: ContextMemory[];
  workflows: Workflow[];
  insights: ProductivityInsight[];

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'aiGenerated'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;

  scheduleMeeting: (meeting: Omit<Meeting, 'id' | 'aiScheduled'>) => Promise<void>;
  updateMeeting: (id: string, updates: Partial<Meeting>) => Promise<void>;
  cancelMeeting: (id: string) => Promise<void>;

  draftEmail: (to: string[], subject: string, context: string) => Promise<Email>;
  sendEmail: (email: Email) => Promise<void>;

  addMemory: (memory: Omit<ContextMemory, 'id' | 'timestamp'>) => Promise<void>;
  searchMemories: (query: string) => Promise<ContextMemory[]>;

  createWorkflow: (workflow: Omit<Workflow, 'id' | 'runCount'>) => Promise<void>;
  toggleWorkflow: (id: string) => Promise<void>;

  getInsights: () => Promise<ProductivityInsight[]>;

  activeAgents: Record<string, boolean>;
  toggleAgent: (id: string) => Promise<void>;

  stats: {
    totalEmployees: number;
    totalAgents: number;
    activeCount: number;
    averageHealth: number;
    totalMonthlySavings: string;
    totalTasksAutomatedDaily: number;
  };

  aiMessages: any[];
  sendMessage: (message: string | { text: string; files?: any[] }) => void;
  addToolResult: (toolCallId: string, result: any) => void;

  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEYS = {
  TASKS: 'ai_assistant_tasks',
  MEETINGS: 'ai_assistant_meetings',
  EMAILS: 'ai_assistant_emails',
  MEMORIES: 'ai_assistant_memories',
  WORKFLOWS: 'ai_assistant_workflows',
  ACTIVE_AGENTS: 'ai_assistant_active_agents',
} as const;

import { aiEmployees } from '@/constants/aiEmployees';

export const [AIAssistantProvider, useAIAssistant] = createContextHook(() => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [memories, setMemories] = useState<ContextMemory[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [insights, setInsights] = useState<ProductivityInsight[]>([]);
  const [activeAgents, setActiveAgents] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customMessages, setCustomMessages] = useState<any[]>([]);

  const chatMutation = trpc.aiAssistant.chat.useMutation();

  const toggleAgent = useCallback(async (id: string) => {
    setActiveAgents(prev => {
      const next = { ...prev, [id]: !prev[id] };
      AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_AGENTS, JSON.stringify(next));
      return next;
    });
  }, []);

  const stats = useMemo(() => {
    const activeIds = Object.entries(activeAgents)
      .filter(([_, isActive]) => isActive)
      .map(([id]) => id);

    const activeEmployeesList = aiEmployees.filter(e => activeIds.includes(e.id));

    return {
      totalEmployees: aiEmployees.filter(e => e.type === 'employee').length,
      totalAgents: aiEmployees.filter(e => e.type === 'agent').length,
      activeCount: activeIds.length,
      averageHealth: activeIds.length > 0
        ? Math.round(activeEmployeesList.reduce((sum, e) => sum + e.infrastructure.health, 0) / activeIds.length)
        : 0,
      totalMonthlySavings: activeIds.length > 0
        ? `$${(activeIds.length * 5200).toLocaleString()}`
        : '$0',
      totalTasksAutomatedDaily: activeEmployeesList.reduce((sum, e) => sum + e.roiMetrics.tasksAutomatedDaily, 0),
    };
  }, [activeAgents]);

  const addMemory = useCallback(async (memory: Omit<ContextMemory, 'id' | 'timestamp'>) => {
    try {
      const newMemory: ContextMemory = {
        ...memory,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      setMemories(prev => {
        const updated = [...prev, newMemory];
        AsyncStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(updated));
        return updated;
      });

      console.log('[AIAssistant] Memory added:', newMemory);
    } catch (err) {
      console.error('[AIAssistant] Error adding memory:', err);
      throw err;
    }
  }, []);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt' | 'aiGenerated'>) => {
    try {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date(),
        aiGenerated: true,
      };

      setTasks(prev => {
        const updated = [...prev, newTask];
        AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
        return updated;
      });

      await addMemory({
        type: 'conversation',
        content: `Created task: ${task.title}`,
        metadata: { taskId: newTask.id, action: 'create_task' },
        importance: 0.7,
        tags: ['task', 'creation'],
      });

      console.log('[AIAssistant] Task added:', newTask);
    } catch (err) {
      console.error('[AIAssistant] Error adding task:', err);
      throw err;
    }
  }, [addMemory]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      setTasks(prev => {
        const updated = prev.map(t => t.id === id ? { ...t, ...updates } : t);
        AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
        return updated;
      });
      console.log('[AIAssistant] Task updated:', id);
    } catch (err) {
      console.error('[AIAssistant] Error updating task:', err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setTasks(prev => {
        const updated = prev.filter(t => t.id !== id);
        AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updated));
        return updated;
      });
      console.log('[AIAssistant] Task deleted:', id);
    } catch (err) {
      console.error('[AIAssistant] Error deleting task:', err);
      throw err;
    }
  }, []);

  const completeTask = useCallback(async (id: string) => {
    await updateTask(id, { status: 'completed', completedAt: new Date() });
  }, [updateTask]);

  const scheduleMeeting = useCallback(async (meeting: Omit<Meeting, 'id' | 'aiScheduled'>) => {
    try {
      const newMeeting: Meeting = {
        ...meeting,
        id: Date.now().toString(),
        aiScheduled: true,
      };

      setMeetings(prev => {
        const updated = [...prev, newMeeting];
        AsyncStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(updated));
        return updated;
      });

      await addMemory({
        type: 'conversation',
        content: `Scheduled meeting: ${meeting.title}`,
        metadata: { meetingId: newMeeting.id, action: 'schedule_meeting' },
        importance: 0.8,
        tags: ['meeting', 'scheduling'],
      });

      console.log('[AIAssistant] Meeting scheduled:', newMeeting);
    } catch (err) {
      console.error('[AIAssistant] Error scheduling meeting:', err);
      throw err;
    }
  }, [addMemory]);

  const updateMeeting = useCallback(async (id: string, updates: Partial<Meeting>) => {
    try {
      setMeetings(prev => {
        const updated = prev.map(m => m.id === id ? { ...m, ...updates } : m);
        AsyncStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(updated));
        return updated;
      });
      console.log('[AIAssistant] Meeting updated:', id);
    } catch (err) {
      console.error('[AIAssistant] Error updating meeting:', err);
      throw err;
    }
  }, []);

  const cancelMeeting = useCallback(async (id: string) => {
    await updateMeeting(id, { status: 'cancelled' });
  }, [updateMeeting]);

  const draftEmail = useCallback(async (to: string[], subject: string, context: string): Promise<Email> => {
    try {
      const newEmail: Email = {
        id: Date.now().toString(),
        from: 'user@example.com',
        to,
        subject,
        body: `[AI Draft]\n\n${context}\n\nBest regards,\nYour AI Assistant`,
        timestamp: new Date(),
        read: false,
        aiDrafted: true,
        priority: 'medium',
        category: 'work',
      };

      setEmails(prev => {
        const updated = [...prev, newEmail];
        AsyncStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(updated));
        return updated;
      });

      console.log('[AIAssistant] Email drafted:', newEmail);
      return newEmail;
    } catch (err) {
      console.error('[AIAssistant] Error drafting email:', err);
      throw err;
    }
  }, []);

  const sendEmail = useCallback(async (email: Email) => {
    console.log('[AIAssistant] Email sent:', email);
  }, []);

  const searchMemories = useCallback(async (query: string): Promise<ContextMemory[]> => {
    const lowerQuery = query.toLowerCase();
    return memories.filter(m =>
      m.content.toLowerCase().includes(lowerQuery) ||
      m.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [memories]);

  const createWorkflow = useCallback(async (workflow: Omit<Workflow, 'id' | 'runCount'>) => {
    try {
      const newWorkflow: Workflow = {
        ...workflow,
        id: Date.now().toString(),
        runCount: 0,
      };

      setWorkflows(prev => {
        const updated = [...prev, newWorkflow];
        AsyncStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(updated));
        return updated;
      });

      console.log('[AIAssistant] Workflow created:', newWorkflow);
    } catch (err) {
      console.error('[AIAssistant] Error creating workflow:', err);
      throw err;
    }
  }, []);

  const toggleWorkflow = useCallback(async (id: string) => {
    try {
      setWorkflows(prev => {
        const updated = prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w);
        AsyncStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(updated));
        return updated;
      });
      console.log('[AIAssistant] Workflow toggled:', id);
    } catch (err) {
      console.error('[AIAssistant] Error toggling workflow:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    const generateInsights = async () => {
      const completedTasks = tasks.filter(t => t.status === 'completed');
      const onTimeTasks = completedTasks.filter(t => {
        if (!t.dueDate || !t.completedAt) return false;
        return new Date(t.completedAt) <= new Date(t.dueDate);
      });

      const completionRate = completedTasks.length > 0
        ? Math.round((onTimeTasks.length / completedTasks.length) * 100)
        : 87;

      const upcomingMeetings = meetings.filter(m => new Date(m.startTime) > new Date());
      const totalMeetingHours = upcomingMeetings.reduce((acc, m) => {
        const duration = (new Date(m.endTime).getTime() - new Date(m.startTime).getTime()) / (1000 * 60 * 60);
        return acc + duration;
      }, 0);

      const newInsights: ProductivityInsight[] = [
        {
          id: '1',
          type: 'peak-hours',
          title: 'Peak Productivity Hours',
          value: '9:00 AM - 11:30 AM',
          description: 'You\'re most productive during morning hours. Your task completion rate is 45% higher during this time compared to afternoon.',
          trend: 'stable',
          recommendation: 'Schedule your most important and challenging tasks during these peak hours. Avoid scheduling meetings during this time when possible.',
        },
        {
          id: '2',
          type: 'task-completion',
          title: 'Task Completion Rate',
          value: `${completionRate}%`,
          description: completionRate >= 80
            ? `Great job! You\'re completing most tasks on time. Your completion rate has improved by 12% over the past month.`
            : 'Consider breaking down large tasks into smaller, manageable pieces to improve your completion rate.',
          trend: completionRate >= 80 ? 'up' : 'down',
          recommendation: completionRate >= 80
            ? 'Continue using time-blocking techniques. Consider breaking down larger tasks into smaller, manageable pieces.'
            : 'Use the Pomodoro technique for better focus. Try working in 25-minute focused sessions.',
        },
        {
          id: '3',
          type: 'meeting-load',
          title: 'Meeting Load',
          value: `${Math.round(totalMeetingHours)} hours/week`,
          description: totalMeetingHours > 12
            ? `You spend about ${Math.round((totalMeetingHours / 40) * 100)}% of your work week in meetings. This is slightly above the recommended 25% for optimal productivity.`
            : 'Good balance between meetings and focus time. You\'re maintaining healthy meeting boundaries.',
          trend: totalMeetingHours > 12 ? 'up' : 'stable',
          recommendation: totalMeetingHours > 12
            ? 'Try to batch meetings on specific days (e.g., Tuesday and Thursday) to create longer blocks of focus time on other days.'
            : 'Continue protecting your focus time. Consider declining non-essential meetings.',
        },
        {
          id: '4',
          type: 'response-time',
          title: 'Email Response Time',
          value: 'Average: 2.3 hours',
          description: 'Your email response time has improved by 35% this week. You\'re responding faster while maintaining quality.',
          trend: 'up',
          recommendation: 'Set specific times for checking emails (e.g., 10 AM, 2 PM, 4 PM) to maintain this improvement without constant interruptions.',
        },
        {
          id: '5',
          type: 'focus-time',
          title: 'Deep Focus Time',
          value: '18 hours/week',
          description: 'You\'re getting good blocks of uninterrupted focus time. This represents 45% of your work week, which is excellent for deep work.',
          trend: 'stable',
          recommendation: 'Protect these focus blocks by declining non-essential meetings and using "Do Not Disturb" mode during these times.',
        },
      ];

      setInsights(newInsights);
    };

    if (tasks.length > 0 || meetings.length > 0) {
      generateInsights();
    }
  }, [tasks, meetings]);

  const getInsights = useCallback(async (): Promise<ProductivityInsight[]> => {
    return insights;
  }, [insights]);

  const tools = useMemo(() => ({
    addTask: createRorkTool({
      description: 'Add a new task to the task list',
      zodSchema: z.object({
        title: z.string().describe('Task title'),
        description: z.string().optional().describe('Detailed description'),
        priority: z.enum(['high', 'medium', 'low']).describe('Task priority'),
        dueDate: z.string().optional().describe('Due date in ISO format'),
        estimatedTime: z.string().optional().describe('Estimated time to complete'),
        energyLevel: z.enum(['high', 'medium', 'low']).optional().describe('Required energy level'),
        tags: z.array(z.string()).optional().describe('Task tags'),
      }),
      execute: async (input) => {
        await addTask({
          title: input.title,
          description: input.description,
          priority: input.priority,
          status: 'pending',
          dueDate: input.dueDate,
          estimatedTime: input.estimatedTime,
          energyLevel: input.energyLevel,
          tags: input.tags,
        });
        return `Task "${input.title}" has been added successfully with ${input.priority} priority.`;
      },
    }),

    scheduleMeeting: createRorkTool({
      description: 'Schedule a new meeting',
      zodSchema: z.object({
        title: z.string().describe('Meeting title'),
        description: z.string().optional().describe('Meeting description'),
        startTime: z.string().describe('Start time in ISO format'),
        endTime: z.string().describe('End time in ISO format'),
        attendees: z.array(z.string()).describe('List of attendee emails'),
        type: z.enum(['video', 'phone', 'in-person']).describe('Meeting type'),
        location: z.string().optional().describe('Meeting location or link'),
      }),
      execute: async (input) => {
        await scheduleMeeting({
          title: input.title,
          description: input.description,
          startTime: input.startTime,
          endTime: input.endTime,
          attendees: input.attendees,
          type: input.type,
          location: input.location,
          preparationNeeded: false,
          status: 'scheduled',
        });
        return `Meeting "${input.title}" has been scheduled for ${new Date(input.startTime).toLocaleString()} with ${input.attendees.length} attendee(s).`;
      },
    }),

    draftEmail: createRorkTool({
      description: 'Draft an email using AI',
      zodSchema: z.object({
        to: z.array(z.string()).describe('Recipient email addresses'),
        subject: z.string().describe('Email subject'),
        context: z.string().describe('Context or key points for the email'),
      }),
      execute: async (input) => {
        await draftEmail(input.to, input.subject, input.context);
        return `Email draft created with subject "${input.subject}" for ${input.to.join(', ')}.`;
      },
    }),

    searchInformation: createRorkTool({
      description: 'Search through memories, tasks, meetings, and emails',
      zodSchema: z.object({
        query: z.string().describe('Search query'),
        type: z.enum(['all', 'tasks', 'meetings', 'emails', 'memories']).optional().describe('Type to search'),
      }),
      execute: async (input) => {
        const results = await searchMemories(input.query);
        return `Found ${results.length} result(s) for "${input.query}": ${results.map(r => r.content).slice(0, 3).join(', ')}${results.length > 3 ? '...' : ''}`;
      },
    }),

    createWorkflow: createRorkTool({
      description: 'Create an automation workflow',
      zodSchema: z.object({
        name: z.string().describe('Workflow name'),
        description: z.string().describe('Workflow description'),
        triggerType: z.enum(['time', 'event', 'condition']).describe('Trigger type'),
        triggerConfig: z.record(z.string(), z.any()).describe('Trigger configuration'),
        actions: z.array(z.object({
          type: z.string(),
          config: z.record(z.string(), z.any()),
        })).describe('Actions to perform'),
      }),
      execute: async (input) => {
        await createWorkflow({
          name: input.name,
          description: input.description,
          trigger: {
            type: input.triggerType,
            config: input.triggerConfig,
          },
          actions: input.actions,
          enabled: true,
        });
        return `Workflow "${input.name}" has been created successfully with ${input.actions.length} action(s).`;
      },
    }),

    analyzeProductivity: createRorkTool({
      description: 'Analyze productivity patterns and provide insights',
      zodSchema: z.object({
        timeframe: z.enum(['today', 'week', 'month']).describe('Analysis timeframe'),
      }),
      execute: async (input) => {
        const insightsData = await getInsights();
        return `Generated ${insightsData.length} productivity insights for ${input.timeframe}: ${insightsData.map(i => i.title).join(', ')}.`;
      },
    }),

    setReminder: createRorkTool({
      description: 'Set a smart reminder',
      zodSchema: z.object({
        title: z.string().describe('Reminder title'),
        time: z.string().describe('Reminder time in ISO format'),
        context: z.string().optional().describe('Additional context'),
      }),
      execute: async (input) => {
        await addTask({
          title: `Reminder: ${input.title}`,
          description: input.context,
          priority: 'medium',
          status: 'pending',
          dueDate: input.time,
        });
        return `Reminder "${input.title}" has been set for ${new Date(input.time).toLocaleString()}.`;
      },
    }),
  }), [addTask, scheduleMeeting, draftEmail, searchMemories, createWorkflow, getInsights]);

  const { messages: rorkMessages, sendMessage: sendRorkMessage, addToolResult } = useRorkAgent({ tools });

  const aiMessages = useMemo(() => {
    return [...rorkMessages, ...customMessages].sort((a, b) =>
      new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
    );
  }, [rorkMessages, customMessages]);

  const sendMessage = useCallback(async (message: string | { text: string; files?: any[] }) => {
    const text = typeof message === 'string' ? message : message.text;

    // Attempt Rork send first (as it handles tools)
    sendRorkMessage(message);

    // Also trigger our real AI bridge if we want a guaranteed response from our keys
    // We only do this if it's a simple text message for now to avoid double processing
    // or if the user explicitly wants to use the enterprise engine
    if (text.startsWith('/ai ')) {
      const userMsg = { id: Date.now().toString(), role: 'user', content: text.replace('/ai ', ''), createdAt: new Date() };
      setCustomMessages(prev => [...prev, userMsg]);

      try {
        const result = await chatMutation.mutateAsync({
          messages: aiMessages.map(m => ({ role: m.role, content: m.content || m.text || '' })).concat({ role: 'user', content: userMsg.content }),
        });

        if (result.success) {
          setCustomMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.message,
            createdAt: new Date()
          }]);
        }
      } catch (err) {
        console.error('[AIAssistant] Custom AI chat failed:', err);
      }
    }
  }, [sendRorkMessage, chatMutation, aiMessages, customMessages]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        if (!isMounted) return;
        setIsLoading(true);

        const [tasksData, meetingsData, emailsData, memoriesData, workflowsData, activeAgentsData] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TASKS),
          AsyncStorage.getItem(STORAGE_KEYS.MEETINGS),
          AsyncStorage.getItem(STORAGE_KEYS.EMAILS),
          AsyncStorage.getItem(STORAGE_KEYS.MEMORIES),
          AsyncStorage.getItem(STORAGE_KEYS.WORKFLOWS),
          AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_AGENTS),
        ]);

        if (!isMounted || abortController.signal.aborted) return;

        if (activeAgentsData) {
          setActiveAgents(JSON.parse(activeAgentsData));
        } else {
          const initialState: Record<string, boolean> = {};
          aiEmployees.forEach(emp => {
            initialState[emp.id] = emp.infrastructure.status === 'online' || emp.infrastructure.status === 'processing';
          });
          setActiveAgents(initialState);
          await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_AGENTS, JSON.stringify(initialState));
        }

        if (tasksData) {
          setTasks(JSON.parse(tasksData));
        } else {
          const { mockTasks } = await import('@/utils/mockAIData');
          if (!isMounted) return;
          setTasks(mockTasks);
          await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(mockTasks));
        }

        if (!isMounted || abortController.signal.aborted) return;

        if (meetingsData) {
          setMeetings(JSON.parse(meetingsData));
        } else {
          const { mockMeetings } = await import('@/utils/mockAIData');
          if (!isMounted) return;
          setMeetings(mockMeetings);
          await AsyncStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(mockMeetings));
        }

        if (!isMounted || abortController.signal.aborted) return;

        if (emailsData) {
          setEmails(JSON.parse(emailsData));
        } else {
          const { mockEmails } = await import('@/utils/mockAIData');
          if (!isMounted) return;
          setEmails(mockEmails);
          await AsyncStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(mockEmails));
        }

        if (!isMounted || abortController.signal.aborted) return;

        if (memoriesData) {
          setMemories(JSON.parse(memoriesData));
        } else {
          const { mockMemories } = await import('@/utils/mockAIData');
          if (!isMounted) return;
          setMemories(mockMemories);
          await AsyncStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(mockMemories));
        }

        if (!isMounted || abortController.signal.aborted) return;

        if (workflowsData) {
          setWorkflows(JSON.parse(workflowsData));
        } else {
          const { mockWorkflows } = await import('@/utils/mockAIData');
          if (!isMounted) return;
          setWorkflows(mockWorkflows);
          await AsyncStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(mockWorkflows));
        }
      } catch (err) {
        if (!isMounted || abortController.signal.aborted) return;
        console.error('[AIAssistant] Error loading data:', err);
        setError('Failed to load data');
      } finally {
        if (isMounted && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return {
    tasks,
    meetings,
    emails,
    memories,
    workflows,
    insights,

    addTask,
    updateTask,
    deleteTask,
    completeTask,

    scheduleMeeting,
    updateMeeting,
    cancelMeeting,

    draftEmail,
    sendEmail,

    addMemory,
    searchMemories,

    createWorkflow,
    toggleWorkflow,

    getInsights,

    activeAgents,
    toggleAgent,
    stats,

    aiMessages,
    sendMessage,
    addToolResult,

    isLoading,
    error,
  };
});
