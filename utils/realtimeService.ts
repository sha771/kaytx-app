export interface RealtimeCallService {
  phoneNumber: string;
  initiateCall: (targetNumber: string, type: 'receptionist' | 'negotiation') => Promise<CallSession>;
  endCall: (sessionId: string) => Promise<void>;
  getCallStatus: (sessionId: string) => Promise<CallStatus>;
}

export interface CallSession {
  id: string;
  targetNumber: string;
  status: 'ringing' | 'connected' | 'ended' | 'failed';
  startTime: Date;
  duration: number;
  type: 'receptionist' | 'negotiation';
  transcript: CallTranscript[];
}

export interface CallStatus {
  sessionId: string;
  status: 'ringing' | 'connected' | 'ended' | 'failed';
  duration: number;
  transcript: CallTranscript[];
}

export interface CallTranscript {
  id: string;
  speaker: 'ai' | 'customer';
  text: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

class RealtimeCallServiceImpl implements RealtimeCallService {
  phoneNumber = '+1 (555) 100-2000';
  private activeCalls: Map<string, CallSession> = new Map();

  async initiateCall(targetNumber: string, type: 'receptionist' | 'negotiation'): Promise<CallSession> {
    console.log(`[Realtime Call] Initiating ${type} call to ${targetNumber}...`);
    
    const session: CallSession = {
      id: `call_${Date.now()}`,
      targetNumber,
      status: 'ringing',
      startTime: new Date(),
      duration: 0,
      type,
      transcript: [],
    };

    this.activeCalls.set(session.id, session);

    setTimeout(() => {
      const call = this.activeCalls.get(session.id);
      if (call) {
        call.status = 'connected';
        console.log(`[Realtime Call] Call ${session.id} connected`);
        this.simulateConversation(session.id, type);
      }
    }, 3000);

    return session;
  }

  private simulateConversation(sessionId: string, type: 'receptionist' | 'negotiation') {
    const receptionistGreetings = [
      'Hello! Thank you for calling. How may I assist you today?',
      'Good day! Welcome to our service. How can I help you?',
      'Hi there! Thanks for reaching out. What can I do for you?',
    ];

    const negotiationGreetings = [
      'Hello! I\'m calling regarding our exclusive offer. Do you have a moment?',
      'Hi! I wanted to discuss an exciting opportunity that might interest you.',
      'Good day! I\'m reaching out about a special proposal for you.',
    ];

    const greetings = type === 'receptionist' ? receptionistGreetings : negotiationGreetings;
    const greeting = greetings[Math.floor(Math.random() * greetings.length)] ?? greetings[0] ?? '';

    this.addTranscript(sessionId, {
      id: `transcript_${Date.now()}`,
      speaker: 'ai',
      text: greeting,
      timestamp: new Date(),
      sentiment: 'positive',
    });

    setTimeout(() => {
      this.addTranscript(sessionId, {
        id: `transcript_${Date.now() + 1}`,
        speaker: 'customer',
        text: 'Yes, I\'m interested. Can you tell me more?',
        timestamp: new Date(),
        sentiment: 'positive',
      });

      setTimeout(() => {
        const responses = type === 'receptionist' 
          ? [
              'Absolutely! Let me provide you with the details you need.',
              'I\'d be happy to help. What specific information are you looking for?',
            ]
          : [
              'Great! Let me explain the benefits and how this can work for you.',
              'Wonderful! This offer includes several exclusive features...',
            ];
        
        const response = responses[Math.floor(Math.random() * responses.length)] ?? responses[0] ?? '';
        
        this.addTranscript(sessionId, {
          id: `transcript_${Date.now() + 2}`,
          speaker: 'ai',
          text: response,
          timestamp: new Date(),
          sentiment: 'positive',
        });
      }, 3000);
    }, 5000);
  }

  private addTranscript(sessionId: string, transcript: CallTranscript) {
    const call = this.activeCalls.get(sessionId);
    if (call) {
      call.transcript.push(transcript);
      call.duration = Math.floor((new Date().getTime() - call.startTime.getTime()) / 1000);
    }
  }

  async endCall(sessionId: string): Promise<void> {
    const call = this.activeCalls.get(sessionId);
    if (call) {
      call.status = 'ended';
      call.duration = Math.floor((new Date().getTime() - call.startTime.getTime()) / 1000);
      console.log(`[Realtime Call] Call ${sessionId} ended. Duration: ${call.duration}s`);
    }
  }

  async getCallStatus(sessionId: string): Promise<CallStatus> {
    const call = this.activeCalls.get(sessionId);
    if (!call) {
      throw new Error('Call session not found');
    }

    return {
      sessionId: call.id,
      status: call.status,
      duration: call.duration,
      transcript: call.transcript,
    };
  }
}

export const realtimeCallService = new RealtimeCallServiceImpl();

export function getAvailablePhoneNumbers(): string[] {
  return [
    '+1 (555) 100-2000',
    '+1 (800) 555-9999',
    '+44 20 7946 0958',
    '+61 2 8005 4321',
    '+91 22 4567 8900',
  ];
}
