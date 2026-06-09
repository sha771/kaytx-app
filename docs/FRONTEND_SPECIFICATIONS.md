# Kaytx Enterprise AI Platform - Frontend Specifications Document

**Version**: 2.0  
**Last Updated**: June 2026  
**Status**: Production Ready  
**Document Owner**: Frontend Team  

---

## Executive Summary

Kaytx frontend consists of 95+ connected screens across web and mobile platforms. Built with React, Next.js, and React Native, the frontend provides a unified, responsive user experience with real-time updates, offline capabilities, and comprehensive accessibility support.

### Frontend Highlights

- **95+ Connected Screens**: Comprehensive feature coverage
- **Cross-Platform**: Web (React/Next.js) + Mobile (React Native)
- **Real-Time Updates**: WebSocket-powered live updates
- **Offline Support**: Progressive Web App with offline capabilities
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: < 2 second page load, 60 FPS animations

---

## Table of Contents

1. [Frontend Overview](#frontend-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Component Library](#component-library)
5. [Design System](#design-system)
6. [Screen Specifications](#screen-specifications)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Real-Time Features](#real-time-features)
10. [Offline Support](#offline-support)
11. [Performance Optimization](#performance-optimization)
12. [Accessibility](#accessibility)
13. [Testing](#testing)
14. [Deployment](#deployment)

---

## Frontend Overview

### Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WEB PLATFORM                                          │
│  React 18 + Next.js  │  Tailwind CSS  │  Zustand  │  Custom Components    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MOBILE PLATFORM                                      │
│  React Native 0.81  │  Expo  │  Zustand  │  Custom Components            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SHARED LAYER                                         │
│  State Management  │  API Client  │  Utilities  │  Types                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Features

- **95+ Screens**: Comprehensive feature coverage
- **Real-Time Updates**: WebSocket-powered live data
- **Offline Support**: PWA with offline capabilities
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Internationalization**: Multi-language support

---

## Technology Stack

### Web Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | React | 18 | UI library |
| Framework | Next.js | Latest | SSR framework |
| Language | TypeScript | 5.9 | Type-safe development |
| Styling | Tailwind CSS | Latest | Utility-first CSS |
| State | Zustand | Latest | State management |
| Forms | React Hook Form | Latest | Form handling |
| Validation | Zod | Latest | Schema validation |
| Icons | Lucide React | Latest | Icon library |
| HTTP | Fetch | Native | API calls |
| Real-Time | WebSocket | Native | Live updates |
| Testing | Jest + React Testing Library | Latest | Unit testing |
| E2E Testing | Playwright | Latest | End-to-end testing |

### Mobile Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Framework | React Native | 0.81 | Mobile framework |
| Tooling | Expo | Latest | Development tooling |
| Language | TypeScript | 5.9 | Type-safe development |
| Navigation | React Navigation | Latest | Navigation |
| State | Zustand | Latest | State management |
| Styling | NativeWind | Latest | Tailwind for React Native |
| Icons | Lucide React Native | Latest | Icon library |
| HTTP | Axios | Latest | API calls |
| Real-Time | Socket.IO Client | Latest | Live updates |
| Testing | Jest + Detox | Latest | Unit + E2E testing |

---

## Architecture

### Application Structure

#### Web Structure

```
app/
├── (tabs)/                          # Tab navigation
│   ├── _layout.tsx                  # Tab layout
│   ├── ai-assistant.tsx             # AI assistant tab
│   ├── automations.tsx              # Automations tab
│   ├── analytics.tsx                # Analytics tab
│   └── settings.tsx                 # Settings tab
├── ai-agent/                        # AI agent management
│   ├── _layout.tsx                  # Agent layout
│   ├── [id].tsx                     # Agent detail
│   ├── accounting/                  # Accounting agents
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── sub-agents/              # Sub-agents
│   ├── executive/                   # Executive agents
│   ├── government/                  # Government agents
│   ├── healthcare/                  # Healthcare agents
│   ├── hr/                          # HR agents
│   ├── insurance/                   # Insurance agents
│   ├── it/                          # IT agents
│   ├── legal/                       # Legal agents
│   ├── manufacturing/               # Manufacturing agents
│   ├── marketing/                   # Marketing agents
│   ├── operations/                  # Operations agents
│   ├── performance/                 # Performance agents
│   ├── product/                     # Product agents
│   ├── realestate/                  # Real estate agents
│   ├── research/                    # Research agents
│   ├── sales/                       # Sales agents
│   ├── security/                    # Security agents
│   ├── social-media/                # Social media agents
│   ├── supply-chain/                # Supply chain agents
│   ├── trading/                     # Trading agents
│   └── transportation/              # Transportation agents
├── ai-assistant/                    # AI assistant features
│   ├── calendar.tsx                 # Calendar integration
│   ├── emails.tsx                   # Email management
│   ├── messages.tsx                 # Message management
│   └── tasks.tsx                    # Task management
├── ai-negotiation/                  # Negotiation tools
│   ├── index.tsx
│   └── [id].tsx
├── enterprise-admin.tsx             # Enterprise dashboard
├── add-service.tsx                  # Add service modal
├── _layout.tsx                      # Root layout
└── page.tsx                         # Home page
```

#### Mobile Structure

```
src/
├── screens/                         # Screen components
│   ├── HomeScreen.tsx
│   ├── AIAssistantScreen.tsx
│   ├── AutomationsScreen.tsx
│   ├── AnalyticsScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/                      # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── TabNavigator.tsx
│   └── LinkingConfiguration.tsx
├── components/                      # Shared components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── store/                           # State management
│   ├── userStore.ts
│   ├── aiStore.ts
│   └── uiStore.ts
├── services/                        # API services
│   ├── api.ts
│   ├── auth.ts
│   └── websocket.ts
└── utils/                           # Utilities
    ├── helpers.ts
    └── constants.ts
```

### Component Architecture

#### Component Hierarchy

```
App
├── Providers
│   ├── AuthProvider
│   ├── AIProvider
│   ├── ThemeProvider
│   └── QueryProvider
├── Layout
│   ├── Sidebar
│   ├── Header
│   └── Content
│       ├── Dashboard
│       ├── AIChat
│       ├── Workflows
│       └── Settings
├── Modals
│   ├── CreateAgentModal
│   ├── CreateWorkflowModal
│   └── SettingsModal
└── Toasts
    ├── SuccessToast
    ├── ErrorToast
    └── InfoToast
```

---

## Component Library

### Core Components

#### Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  disabled,
  loading,
  icon,
  onClick,
  children
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors flex items-center gap-2';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader className="animate-spin" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
};
```

#### Input Component

```typescript
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
  icon
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full rounded-lg border px-4 py-2 outline-none transition-colors ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
        />
      </div>
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};
```

#### Card Component

```typescript
interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className
}) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
```

#### Modal Component

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;
  
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative w-full ${sizeStyles[size]} rounded-lg bg-white p-6 shadow-xl`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
```

---

## Design System

### Design Tokens

#### Colors

```typescript
const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
};
```

#### Typography

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

#### Spacing

```typescript
const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
};
```

#### Shadows

```typescript
const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
};
```

#### Border Radius

```typescript
const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};
```

---

## Screen Specifications

### Dashboard Screens

#### Enterprise Dashboard

**Route**: `/enterprise-admin`

**Components**:
- Header with user menu
- Sidebar navigation
- Main dashboard content
- KPI cards
- Charts and graphs
- Recent activity feed
- Quick actions

**Features**:
- Real-time KPI updates
- Interactive charts
- Drill-down capabilities
- Customizable widgets
- Export functionality

**Data Requirements**:
- User statistics
- Agent performance
- Workflow status
- System health
- Recent activities

#### AI Assistant Dashboard

**Route**: `/ai-assistant`

**Components**:
- Chat interface
- Conversation history
- Agent selector
- Message input
- Attachment support
- Voice input (mobile)

**Features**:
- Real-time messaging
- Multi-turn conversations
- Context retention
- File attachments
- Voice messages
- Conversation export

**Data Requirements**:
- Conversation history
- Agent configurations
- User context
- Message queue

### Agent Management Screens

#### Agent List

**Route**: `/ai-agent`

**Components**:
- Search and filter
- Agent cards
- Category tabs
- Create agent button
- Agent status indicators

**Features**:
- Filter by category
- Search by name
- Sort by performance
- Quick actions
- Bulk operations

**Data Requirements**:
- Agent list
- Categories
- Performance metrics
- Status indicators

#### Agent Detail

**Route**: `/ai-agent/[id]`

**Components**:
- Agent header
- Configuration panel
- Performance metrics
- Conversation history
- Settings
- Activity log

**Features**:
- View agent details
- Edit configuration
- Monitor performance
- View conversations
- Adjust settings

**Data Requirements**:
- Agent details
- Configuration
- Performance data
- Conversation history
- Activity logs

### Automation Screens

#### Workflow Builder

**Route**: `/automations/workflows/new`

**Components**:
- Visual workflow editor
- Node palette
- Canvas area
- Properties panel
- Save/Run buttons

**Features**:
- Drag-and-drop nodes
- Connect nodes with edges
- Configure node properties
- Test workflow
- Save workflow

**Data Requirements**:
- Workflow templates
- Node definitions
- Connection rules
- Validation rules

#### Workflow List

**Route**: `/automations/workflows`

**Components**:
- Workflow cards
- Status indicators
- Run history
- Quick actions
- Filter options

**Features**:
- View all workflows
- Check status
- Run workflows
- View history
- Edit workflows

**Data Requirements**:
- Workflow list
- Execution history
- Status data
- Statistics

### Analytics Screens

#### Dashboard Analytics

**Route**: `/analytics/dashboard`

**Components**:
- Date range selector
- KPI cards
- Charts
- Tables
- Export options

**Features**:
- Custom date ranges
- Interactive charts
- Data tables
- Export to CSV/PDF
- Schedule reports

**Data Requirements**:
- Analytics data
- KPI metrics
- Chart data
- Report configurations

---

## State Management

### Zustand Store Architecture

#### User Store

```typescript
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  permissions: string[];
  setUser: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  permissions: [],
  
  setUser: (user) => set({
    user,
    isAuthenticated: true,
    permissions: user.role.permissions
  }),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
    permissions: []
  }),
  
  hasPermission: (permission) => {
    return get().permissions.includes(permission);
  }
}));
```

#### AI Store

```typescript
interface AIStore {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  agents: Agent[];
  selectedAgent: Agent | null;
  isLoading: boolean;
  
  setConversations: (conversations: Conversation[]) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessage: (message: Message) => void;
  setAgents: (agents: Agent[]) => void;
  setSelectedAgent: (agent: Agent | null) => void;
  setLoading: (loading: boolean) => void;
}

const useAIStore = create<AIStore>((set) => ({
  conversations: [],
  currentConversation: null,
  agents: [],
  selectedAgent: null,
  isLoading: false,
  
  setConversations: (conversations) => set({ conversations }),
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  addMessage: (message) => set((state) => ({
    currentConversation: state.currentConversation
      ? {
          ...state.currentConversation,
          messages: [...state.currentConversation.messages, message]
        }
      : null
  })),
  setAgents: (agents) => set({ agents }),
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setLoading: (loading) => set({ isLoading: loading })
}));
```

#### UI Store

```typescript
interface UIStore {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: ModalState[];
  
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  openModal: (modal: ModalState) => void;
  closeModal: (id: string) => void;
}

const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  theme: 'light',
  notifications: [],
  modals: [],
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  openModal: (modal) => set((state) => ({
    modals: [...state.modals, modal]
  })),
  closeModal: (id) => set((state) => ({
    modals: state.modals.filter(m => m.id !== id)
  }))
}));
```

---

## API Integration

### API Client

#### tRPC Client Setup

```typescript
import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/trpc',
          headers: () => {
            const token = localStorage.getItem('token');
            return token ? { authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

#### API Hooks

```typescript
// User hooks
export function useUser() {
  const { data, isLoading, error } = trpc.user.getProfile.useQuery();
  return { user: data, isLoading, error };
}

export function useUpdateUser() {
  const utils = trpc.useContext();
  return trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.getProfile.invalidate();
    },
  });
}

// AI hooks
export function useAgents() {
  const { data, isLoading } = trpc.ai.agents.list.useQuery();
  return { agents: data || [], isLoading };
}

export function useSendMessage() {
  const utils = trpc.useContext();
  return trpc.ai.chat.useMutation({
    onSuccess: () => {
      utils.ai.conversations.invalidate();
    },
  });
}
```

---

## Real-Time Features

### WebSocket Integration

#### WebSocket Manager

```typescript
class WebSocketManager {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<Function>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.notify(message.type, message.data);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect(url);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private attemptReconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      setTimeout(() => this.connect(url), delay);
    }
  }

  subscribe(type: string, callback: Function) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)!.add(callback);
    
    return () => {
      this.subscribers.get(type)?.delete(callback);
    };
  }

  private notify(type: string, data: any) {
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  send(type: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }
}

const wsManager = new WebSocketManager();
```

#### Real-Time Updates Hook

```typescript
export function useRealTimeUpdates() {
  const { addNotification } = useUIStore();
  const { setConversations } = useAIStore();

  useEffect(() => {
    const unsubscribe = wsManager.subscribe('conversation_update', (data) => {
      setConversations(data.conversations);
      addNotification({
        id: uuid(),
        type: 'info',
        message: 'Conversation updated',
      });
    });

    wsManager.subscribe('agent_status', (data) => {
      // Handle agent status updates
    });

    return () => unsubscribe();
  }, []);
}
```

---

## Offline Support

### Service Worker Setup

#### Service Worker Registration

```typescript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered:', registration);
      },
      (error) => {
        console.error('Service Worker registration failed:', error);
      }
    );
  });
}
```

#### Offline Queue

```typescript
class OfflineQueue {
  private queue: Array<{ request: Request; timestamp: number }> = [];
  private isOnline = navigator.onLine;

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async add(request: Request) {
    if (this.isOnline) {
      return fetch(request);
    }

    this.queue.push({ request, timestamp: Date.now() });
    await this.persistQueue();
  }

  private async processQueue() {
    while (this.queue.length > 0 && this.isOnline) {
      const item = this.queue.shift();
      if (item) {
        try {
          await fetch(item.request);
        } catch (error) {
          console.error('Failed to process queued request:', error);
          this.queue.unshift(item);
          break;
        }
      }
    }
    await this.persistQueue();
  }

  private async persistQueue() {
    localStorage.setItem('offlineQueue', JSON.stringify(this.queue));
  }

  private async loadQueue() {
    const stored = localStorage.getItem('offlineQueue');
    if (stored) {
      this.queue = JSON.parse(stored);
    }
  }
}

const offlineQueue = new OfflineQueue();
```

---

## Performance Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./screens/Dashboard'));
const AIAssistant = lazy(() => import('./screens/AIAssistant'));
const Automations = lazy(() => import('./screens/Automations'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/automations" element={<Automations />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization

```typescript
import Image from 'next/image';

function OptimizedImage({ src, alt, width, height }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
    />
  );
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data }: { data: any[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item));
  }, [data]);

  return <div>{/* Render processed data */}</div>;
});

function ParentComponent() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return <ExpensiveComponent data={data} onClick={handleClick} />;
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Semantic HTML

```typescript
function AccessibleButton({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      aria-label={props['aria-label'] || children?.toString()}
      role="button"
    >
      {children}
    </button>
  );
}
```

#### Keyboard Navigation

```typescript
function KeyboardAccessibleComponent() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Handle activation
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      aria-label="Interactive element"
    >
      {/* Content */}
    </div>
  );
}
```

#### Screen Reader Support

```typescript
function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}
```

---

## Testing

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
});

test('user can create agent', async ({ page }) => {
  await page.goto('/ai-agent');
  await page.click('button:has-text("Create Agent")');
  
  await page.fill('input[name="name"]', 'Test Agent');
  await page.selectOption('select[name="type"]', 'assistant');
  await page.click('button:has-text("Create")');
  
  await expect(page.locator('text=Test Agent')).toBeVisible();
});
```

---

## Deployment

### Web Deployment

#### Next.js Build

```bash
# Production build
npm run build

# Start production server
npm start

# Static export (optional)
npm run export
```

#### Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://api.kaytx.ai
NEXT_PUBLIC_WS_URL=wss://api.kaytx.ai
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Mobile Deployment

#### Expo Build

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

#### App Store Configuration

```json
{
  "expo": {
    "name": "Kaytx",
    "slug": "kaytx",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.kaytx.app",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.kaytx.app",
      "versionCode": 1
    }
  }
}
```

---

## Appendix

### A. Component Library Index

| Component | File | Description |
|-----------|------|-------------|
| Button | components/Button.tsx | Primary button component |
| Input | components/Input.tsx | Text input component |
| Card | components/Card.tsx | Card container component |
| Modal | components/Modal.tsx | Modal dialog component |
| Table | components/Table.tsx | Data table component |
| Dropdown | components/Dropdown.tsx | Dropdown menu component |
| Toast | components/Toast.tsx | Toast notification component |
| Loader | components/Loader.tsx | Loading spinner component |
| Avatar | components/Avatar.tsx | User avatar component |
| Badge | components/Badge.tsx | Status badge component |

### B. Screen Index

| Screen | Route | Description |
|--------|-------|-------------|
| Enterprise Dashboard | /enterprise-admin | Main dashboard |
| AI Assistant | /ai-assistant | AI chat interface |
| Agent List | /ai-agent | Agent management |
| Agent Detail | /ai-agent/[id] | Agent configuration |
| Workflow Builder | /automations/workflows/new | Create workflow |
| Workflow List | /automations/workflows | Workflow management |
| Analytics Dashboard | /analytics/dashboard | Analytics and reports |
| Settings | /settings | User settings |

### C. Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0 | June 2026 | Comprehensive frontend specifications | Frontend Team |
| 1.0 | March 2026 | Initial frontend documentation | Frontend Team |

---

**Document Status**: Approved for Production  
**Next Review**: September 2026  
**Approvals**: Frontend Team, Design Team, Engineering Team
