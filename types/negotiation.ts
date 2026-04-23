export interface NegotiationCall {
  id: string;
  customerName: string;
  customerCompany: string;
  customerPhone: string;
  status: 'active' | 'completed' | 'pending' | 'scheduled';
  startTime: string;
  duration?: string;
  dealValue: number;
  discountOffered?: number;
  outcome?: 'won' | 'lost' | 'ongoing';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  notes?: string;
  tags?: string[];
}

export interface CallLog {
  id: string;
  callId: string;
  customerName: string;
  customerPhone: string;
  callType: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
  status: 'answered' | 'missed' | 'declined' | 'voicemail';
  recording?: string;
  transcript?: string;
  summary?: string;
  dealValue?: number;
  outcome?: 'won' | 'lost' | 'ongoing';
}

export interface PhoneNumber {
  id: string;
  number: string;
  label: string;
  type: 'toll-free' | 'local' | 'international';
  isActive: boolean;
  callsHandled: number;
  successRate: number;
  assignedAgents: string[];
}

export interface CallTranscript {
  id: string;
  callId: string;
  customerName: string;
  timestamp: string;
  duration: string;
  transcript: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keyPoints: string[];
  actionItems: string[];
}

export interface CallerInsight {
  id: string;
  customerName: string;
  customerCompany: string;
  totalCalls: number;
  totalDeals: number;
  avgDealValue: number;
  avgDiscount: number;
  winRate: number;
  lastContact: string;
  preferredTime?: string;
  behaviorPattern?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  demographics: {
    industry: string;
    companySize: string;
    location: string;
  };
}

export interface NegotiationAppointment {
  id: string;
  title: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: string;
  type: 'phone' | 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  dealValue?: number;
  notes?: string;
  reminders: boolean;
}

export interface CallScript {
  id: string;
  title: string;
  category: 'opening' | 'objection-handling' | 'closing' | 'pricing' | 'follow-up';
  script: string;
  tags: string[];
  successRate: number;
  timesUsed: number;
  lastUsed?: string;
}

export interface NegotiationContact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  status: 'lead' | 'prospect' | 'customer' | 'lost';
  dealValue: number;
  dealStage: 'discovery' | 'negotiation' | 'proposal' | 'closing' | 'won' | 'lost';
  lastContact: string;
  nextFollowUp?: string;
  tags: string[];
  notes?: string;
  avatar?: string;
}

export interface Deal {
  id: string;
  title: string;
  customerName: string;
  customerCompany: string;
  value: number;
  stage: 'discovery' | 'qualification' | 'proposal' | 'negotiation' | 'closing' | 'won' | 'lost';
  probability: number;
  expectedCloseDate: string;
  owner: string;
  product: string;
  discountOffered?: number;
  notes?: string;
  lastActivity: string;
}

export interface NegotiationTemplate {
  id: string;
  title: string;
  type: 'email' | 'sms' | 'call-script' | 'proposal';
  content: string;
  category: string;
  variables: string[];
  successRate: number;
  timesUsed: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  isConnected: boolean;
  lastSync?: string;
  category: 'crm' | 'calendar' | 'communication' | 'analytics' | 'productivity';
}

export interface NegotiationNotification {
  id: string;
  title: string;
  message: string;
  type: 'call' | 'appointment' | 'deal' | 'system';
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface NegotiationSetup {
  profile: {
    companyName: string;
    industry: string;
    teamSize: string;
    website: string;
  };
  pricing: {
    defaultDiscount: number;
    maxDiscount: number;
    minimumDealSize: number;
    preferredPaymentTerms: string;
  };
  goals: {
    monthlyRevenue: number;
    monthlyDeals: number;
    avgDealSize: number;
    winRate: number;
  };
  aiConfig: {
    aggressiveness: number;
    autoRespond: boolean;
    emotionalIntelligence: boolean;
    learningMode: boolean;
  };
  voiceSettings: {
    voiceType: string;
    accent: string;
    speed: number;
    tone: string;
  };
  businessHours: {
    timezone: string;
    schedule: {
      [key: string]: { start: string; end: string; enabled: boolean };
    };
  };
}
