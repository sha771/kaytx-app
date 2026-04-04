import {
  MessageCircle,
  Send,
  Camera,
  Hash,
  Briefcase,
  Twitter,
  Linkedin,
  MessageSquare,
  Shield,
  Facebook,
  Users,
  Phone,
} from 'lucide-react-native';
import { ServiceType } from '@/types/messaging';

export const getServiceIcon = (service: ServiceType) => {
  switch (service) {
    case 'whatsapp':
      return MessageCircle;
    case 'telegram':
      return Send;
    case 'instagram':
      return Camera;
    case 'discord':
      return Hash;
    case 'slack':
      return Briefcase;
    case 'twitter':
      return Twitter;
    case 'linkedin':
      return Linkedin;
    case 'sms':
      return MessageSquare;
    case 'imessage':
      return MessageSquare;
    case 'signal':
      return Shield;
    case 'messenger':
      return Facebook;
    case 'teams':
      return Users;
    default:
      return MessageCircle;
  }
};

export const getServiceColor = (service: ServiceType): string => {
  switch (service) {
    case 'whatsapp':
      return '#25D366';
    case 'telegram':
      return '#0088CC';
    case 'instagram':
      return '#E4405F';
    case 'discord':
      return '#5865F2';
    case 'slack':
      return '#4A154B';
    case 'twitter':
      return '#1DA1F2';
    case 'linkedin':
      return '#0077B5';
    case 'sms':
      return '#34C759';
    case 'imessage':
      return '#007AFF';
    case 'signal':
      return '#3A76F0';
    case 'messenger':
      return '#0084FF';
    case 'teams':
      return '#6264A7';
    default:
      return '#007AFF';
  }
};