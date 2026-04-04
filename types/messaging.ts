export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'audio';
  url: string;
  name?: string;
  size?: number;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isPinned: boolean;
  isMuted: boolean;
  service: ServiceType;
  messages: Message[];
}

export type ServiceType = 
  | 'whatsapp'
  | 'telegram'
  | 'instagram'
  | 'discord'
  | 'slack'
  | 'twitter'
  | 'linkedin'
  | 'sms'
  | 'imessage'
  | 'signal'
  | 'messenger'
  | 'teams'
  | 'email'
  | 'voice'
  | 'viber'
  | 'wechat'
  | 'skype'
  | 'other';

export interface Service {
  id: ServiceType;
  name: string;
  icon: any;
  color: string;
  description: string;
}