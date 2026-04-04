import { Conversation, Message } from '@/types/messaging';

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    timestamp: '10:30 AM',
    isOwn: false,
    isRead: true,
  },
  {
    id: '2',
    text: "I'm doing great! Just working on some new features. How about you?",
    timestamp: '10:32 AM',
    isOwn: true,
    isRead: true,
  },
  {
    id: '3',
    text: 'Same here! Working on the unified messaging platform.',
    timestamp: '10:33 AM',
    isOwn: false,
    isRead: true,
  },
  {
    id: '4',
    text: "That sounds interesting! I'd love to hear more about it.",
    timestamp: '10:35 AM',
    isOwn: true,
    isRead: true,
  },
  {
    id: '5',
    text: "Sure! It's like Beeper - brings all your messages into one place.",
    timestamp: '10:36 AM',
    isOwn: false,
    isRead: true,
  },
];

export const generateMockConversations = (): Conversation[] => {
  const names = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince',
    'Ethan Hunt', 'Fiona Apple', 'George Lucas', 'Hannah Montana',
    'Ian McKellen', 'Julia Roberts', 'Kevin Hart', 'Lisa Simpson',
  ];

  const services: Conversation['service'][] = [
    'whatsapp', 'telegram', 'instagram', 'discord', 'slack',
    'twitter', 'linkedin', 'messenger', 'signal', 'imessage',
  ];

  const lastMessages = [
    'Hey! How are you?',
    'Can we meet tomorrow?',
    'Thanks for your help!',
    'See you later!',
    'Great work on the project',
    'Let me know when you\'re free',
    'Just sent you the files',
    'Happy birthday! 🎉',
    'Are you coming to the meeting?',
    'Check out this link',
  ];

  return names.map((name, index) => ({
    id: `conv-${index}`,
    name,
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    lastMessage: lastMessages[index % lastMessages.length],
    timestamp: index === 0 ? 'now' : index < 3 ? `${index}m` : index < 6 ? `${index}h` : `${index - 5}d`,
    unreadCount: index < 3 ? Math.floor(Math.random() * 5) : 0,
    isOnline: index < 4,
    isPinned: index < 2,
    isMuted: false,
    service: services[index % services.length],
    messages: [...mockMessages],
  }));
};