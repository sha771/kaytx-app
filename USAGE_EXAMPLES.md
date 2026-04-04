import{
  
# Real-World Usage Examples

This file contains practical examples of how to use the implemented services in your application.

## Platform Connection Examples

### Example 1: WhatsApp QR Code Connection

```typescript
// app/(tabs)/platforms.tsx
import { usePlatformConnection } from '@/hooks/usePlatformConnection';
import { ConnectionModal } from '@/components/platforms/ConnectionModal';

export default function PlatformsScreen() {
  const connection = usePlatformConnection();
  const [connectionModal, setConnectionModal] = useState({
    visible: false,
    platform: null,
    step: 'method',
    qrCode: undefined,
  });

  const handleQRConnect = async () => {
    const platform = connectionModal.platform;
    if (!platform) return;

    // This now uses the real WhatsApp service
    const result = await connection.handleQRCodeConnect(platform);
    if (result) {
      setConnectionModal(prev => ({
        ...prev,
        step: 'qr-code',
        qrCode: result.qrCode,
        linkingCode: result.linkingCode,
      }));

      // Show QR code to user
      // User scans with WhatsApp
      // Auto-verification will trigger via webhook
    }
  };

  return (
    <View>
      {/* Render platform list */}
      <ConnectionModal
        visible={connectionModal.visible}
        platform={connectionModal.platform}
        step={connectionModal.step}
        qrCode={connectionModal.qrCode}
        onQRConnect={handleQRConnect}
        // ... other props
      />
    </View>
  );
}
```

### Example 2: Instagram OAuth Connection

```typescript
// app/(tabs)/platforms.tsx
const handleOAuthConnect = async () => {
  const platform = connectionModal.platform;
  if (!platform) return;

  // This now uses real platform auth service
  const result = await connection.handleOAuthConnect(platform);
  
  if (result?.authUrl) {
    // Open browser for user authorization
    await Linking.openURL(result.authUrl);
    
    // User authorizes
    // OAuth callback returns token
    // Credentials stored securely
  }
};
```

### Example 3: Email/Password Credentials

```typescript
// app/(tabs)/platforms.tsx
const handleCredentialsConnect = async () => {
  const platform = connectionModal.platform;
  if (!platform) return;

  // Send email and password to backend
  const result = await connection.handleCredentialsConnect(platform);
  
  if (result?.requires2FA) {
    // Show 2FA input
    setConnectionModal(prev => ({ ...prev, step: '2fa' }));
  } else if (result?.success) {
    // Connection successful
    setPlatforms(prev =>
      prev.map(p =>
        p.id === platform.id
          ? { ...p, isConnected: true, status: 'active' }
          : p
      )
    );
  }
};
```

## Calling Examples

### Example 1: Basic Outbound Call

```typescript
// app/ai-receptionist/phone-numbers.tsx
import { useEnhancedCalling } from '@/utils/enhancedCallingService';
import { useEffect, useState } from 'react';

export default function PhoneNumbersScreen() {
  const { initiateCall, endCall, activeCalls, metrics } = useEnhancedCalling();
  const [selectedNumber, setSelectedNumber] = useState<string>();

  const handleMakeCall = async () => {
    if (!selectedNumber) return;

    try {
      const result = await initiateCall(selectedNumber, 'Customer', 'voice-assistant-1');
      
      if (result?.success) {
        console.log('Call initiated:', result.callId);
        // UI will update automatically via activeCalls
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate call');
    }
  };

  return (
    <View>
      <Text>Active Calls: {activeCalls.length}</Text>
      
      {activeCalls.map(call => (
        <View key={call.id}>
          <Text>Calling {call.customerName}</Text>
          <Text>Status: {call.status}</Text>
          <Text>Duration: {call.duration}s</Text>
          
          {call.status === 'connected' && (
            <TouchableOpacity onPress={() => endCall(call.id)}>
              <Text>End Call</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={handleMakeCall}>
        <Text>Make Call</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Example 2: Call Metrics Dashboard

```typescript
// app/analytics/calls.tsx
import { useEnhancedCalling } from '@/utils/enhancedCallingService';
import { useEffect, useState } from 'react';

export default function CallAnalytics() {
  const { metrics } = useEnhancedCalling();

  if (!metrics) return <Text>Loading...</Text>;

  return (
    <View>
      <Card>
        <Text>Total Calls: {metrics.totalCalls}</Text>
        <Text>Active: {metrics.activeCalls}</Text>
        <Text>Completed: {metrics.completedCalls}</Text>
        <Text>Failed: {metrics.failedCalls}</Text>
      </Card>

      <Card>
        <Text>Avg Duration: {metrics.avgDuration}s</Text>
        <Text>Success Rate: {metrics.successRate}%</Text>
        <Text>Total Minutes: {Math.round(metrics.totalMinutes)}</Text>
      </Card>

      <Chart data={metrics} />
    </View>
  );
}
```

### Example 3: Real-time Call Updates

```typescript
// components/CallMonitor.tsx
import { useEnhancedCalling } from '@/utils/enhancedCallingService';
import { useEffect } from 'react';

export function CallMonitor() {
  const { activeCalls } = useEnhancedCalling();

  useEffect(() => {
    activeCalls.forEach(call => {
      console.log(`Call ${call.id}: ${call.status} (${call.duration}s)`);
    });
  }, [activeCalls]);

  return (
    <ScrollView>
      {activeCalls.map(call => (
        <CallCard key={call.id} call={call} />
      ))}
    </ScrollView>
  );
}

function CallCard({ call }: { call: ActiveCall }) {
  return (
    <View>
      <Text>{call.customerName}</Text>
      <Text>{call.phoneNumber}</Text>
      <Text>
        {call.status} • {call.duration}s
      </Text>
      {call.recordingEnabled && <Badge>Recording</Badge>}
      {call.transcriptionEnabled && <Badge>Transcribing</Badge>}
    </View>
  );
}
```

## AI Agent Examples

### Example 1: Voice Assistant Conversation

```typescript
// app/ai-assistant/chat.tsx
import { useAIAgent } from '@/hooks/useAIAgent';
import { useEffect, useState } from 'react';

export default function AssistantChat() {
  const { startConversation, sendMessage, agents } = useAIAgent();
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  // Start conversation with voice assistant
  useEffect(() => {
    const initConversation = async () => {
      const result = await startConversation('voice-assistant-1', 'Hello');
      if (result?.sessionId) {
        setSessionId(result.sessionId);
        setMessages([
          {
            id: '1',
            role: 'user',
            content: 'Hello',
            timestamp: new Date(),
          },
        ]);
      }
    };
    
    initConversation();
  }, [startConversation]);

  const handleSend = async () => {
    if (!sessionId || !input) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Get AI response
    const response = await sendMessage(sessionId, input);
    
    if (response) {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    }

    setInput('');
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            message={item.content}
            isUser={item.role === 'user'}
          />
        )}
        keyExtractor={msg => msg.id}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSend}
        placeholder="Ask me anything..."
      />
    </View>
  );
}
```

### Example 2: List All Available Agents

```typescript
// app/ai-assistant/selector.tsx
import { useAIAgent } from '@/hooks/useAIAgent';

export default function AgentSelector() {
  const { agents, startConversation } = useAIAgent();

  const handleSelectAgent = async (agentId: string) => {
    const result = await startConversation(agentId);
    // Navigate to conversation screen
  };

  return (
    <FlatList
      data={agents}
      renderItem={({ item: agent }) => (
        <TouchableOpacity onPress={() => handleSelectAgent(agent.id)}>
          <Text>{agent.name}</Text>
          <Text>{agent.type}</Text>
          <Text>{agent.capabilities.join(', ')}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={agent => agent.id}
    />
  );
}
```

### Example 3: Execute AI Tool

```typescript
// In AI conversation
const handleScheduleAppointment = async () => {
  const result = await aiAgent.executeTool(agentId, 'schedule_appointment', {
    date: '2025-01-22',
    time: '10:00',
    duration: 60,
    title: 'Team Meeting',
  });

  if (result?.success) {
    Alert.alert('Success', 'Appointment scheduled');
  }
};
```

### Example 4: Single Agent Hook

```typescript
// app/ai-receptionist/receptionist.tsx
import { useAgentConversation } from '@/hooks/useAIAgent';

export default function ReceptionistScreen() {
  const {
    sessionId,
    agent,
    messages,
    send,
    end,
  } = useAgentConversation('receptionist-1');

  if (!agent) return <Text>Loading receptionist...</Text>;

  return (
    <View>
      <Text>{agent.name}</Text>
      
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={msg => msg.id}
      />

      <TextInput
        placeholder="Your message..."
        onSubmitEditing={(e) => send(e.nativeEvent.text)}
      />

      <TouchableOpacity onPress={end}>
        <Text>End Session</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Combined Examples

### Example 1: Call with AI Agent

```typescript
// Scenario: Initiate call and connect to AI agent
const handleCallWithAgent = async () => {
  // 1. Start AI agent conversation
  const agentSession = await aiAgent.startConversation(
    'voice-assistant-1',
    'Customer calling'
  );

  // 2. Initiate call
  const callResult = await calling.initiateCall(
    phoneNumber,
    customerName,
    'voice-assistant-1' // Pass agent ID
  );

  // 3. AI agent can now handle the call
  if (agentSession && callResult.success) {
    // Monitor call and conversation
    // Agent processes customer requests
    // Transfer or escalate if needed
  }
};
```

### Example 2: Multi-Platform Unified Dashboard

```typescript
// app/dashboard.tsx
import { useEnhancedCalling } from '@/utils/enhancedCallingService';
import { useAIAgent } from '@/hooks/useAIAgent';
import { usePlatformConnection } from '@/hooks/usePlatformConnection';

export default function Dashboard() {
  const calling = useEnhancedCalling();
  const aiAgent = useAIAgent();
  const platforms = usePlatformConnection();

  return (
    <View>
      <Section title="Connected Platforms">
        {/* Show platform connections */}
      </Section>

      <Section title="Active Calls">
        <Text>Active: {calling.metrics?.activeCalls}</Text>
        <Text>Success Rate: {calling.metrics?.successRate}%</Text>
      </Section>

      <Section title="AI Agents">
        <Text>Agents: {aiAgent.agents.length}</Text>
        <Text>Active Conversations: {aiAgent.conversations.length}</Text>
      </Section>
    </View>
  );
}
```

### Example 3: Error Handling

```typescript
// Common error handling pattern
const handlePlatformConnection = async (platform: string) => {
  try {
    const result = await connection.handleOAuthConnect(platform);
    if (!result) {
      Alert.alert('Connection Failed', 'Please try again');
      return;
    }
    
    // Success
    updateUI(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Error', 'Unknown error occurred');
    }
  }
};
```

## Best Practices

### 1. Always Clean Up Sessions
```typescript
useEffect(() => {
  return () => {
    if (sessionId) {
      aiAgent.endConversation(sessionId);
    }
  };
}, [sessionId, aiAgent]);
```

### 2. Handle Loading States
```typescript
const { loading, error } = useAIAgent();

if (loading) return <LoadingIndicator />;
if (error) return <ErrorMessage message={error} />;
```

### 3. Cache User Preferences
```typescript
// Remember selected agent
useEffect(() => {
  AsyncStorage.setItem('preferredAgent', agentId);
}, [agentId]);
```

### 4. Monitor Performance
```typescript
const startTime = Date.now();
const result = await sendMessage(sessionId, message);
const duration = Date.now() - startTime;
console.log(`Message processed in ${duration}ms`);
```

---

**Last Updated**: January 21, 2026
