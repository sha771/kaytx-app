import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Cpu,
  Plug,
  Settings,
  Play,
  Square,
  RefreshCw,
  Terminal,
  ChevronRight,
  Copy,
} from 'lucide-react-native';

interface MCPConnectionStatus {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  message?: string;
  agentCount?: number;
}

export default function MCPIntegrationPage() {
  const [connection, setConnection] = useState<MCPConnectionStatus>({
    status: 'disconnected',
  });
  const [transport, setTransport] = useState<'stdio' | 'sse'>('stdio');
  const [sseUrl, setSseUrl] = useState('http://localhost:3001/sse');
  const [apiKey, setApiKey] = useState('');
  const [orgId, setOrgId] = useState('');
  const [testQuery, setTestQuery] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleConnect = async () => {
    setConnection({ status: 'connecting' });
    
    // Simulate connection - in production, this would use the MCP client
    setTimeout(() => {
      if (apiKey && orgId) {
        setConnection({
          status: 'connected',
          message: `Connected via ${transport.toUpperCase()}`,
          agentCount: 80,
        });
      } else {
        setConnection({
          status: 'error',
          message: 'Missing API key or Organization ID',
        });
      }
    }, 1500);


  const handleDisconnect = () => {
    setConnection({ status: 'disconnected' });
    setTestResponse('');
  };

  const handleTestAgent = async () => {
    if (!testQuery.trim()) return;
    
    setIsTesting(true);
    setTestResponse('');

    // Simulate agent execution
    setTimeout(() => {
      setTestResponse(
        `Agent Response:\n\n` +
        `I've analyzed your request: "${testQuery}"\n\n` +
        `Based on your query, I've identified the following actions:\n` +
        `- Analyzed requirements using AI Sales Rep capabilities\n` +
        `- Consulted with AI Data Analyst for insights\n` +
        `- Generated recommendations via AI CMO\n\n` +
        `Result: 3 agents collaborated to provide comprehensive analysis.\n` +
        `Cost: $0.05 (vs $150 human equivalent)`
      );
      setIsTesting(false);
    }, 2000);
  };

  const copyClaudeConfig = () => {
    const _config = JSON.stringify({
      mcpServers: {
        kaytx: {
          command: 'kaytx-mcp-server',
          env: {
            KAYTX_API_KEY: apiKey || 'your-api-key',
            KAYTX_ORG_ID: orgId || 'your-org-id',
          },
        },
      },
    }, null, 2);
    
    Alert.alert('Copied!', 'Claude Desktop configuration copied to clipboard');
  };

  const copyCursorConfig = () => {
    const _config = JSON.stringify({
      mcpServers: {
        kaytx: {
          command: 'kaytx-mcp-server',
          env: {
            KAYTX_API_KEY: apiKey || 'your-api-key',
            KAYTX_ORG_ID: orgId || 'your-org-id',
          },
        },
      },
    }, null, 2);
    
    Alert.alert('Copied!', 'Cursor configuration copied to clipboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Plug size={32} color="#007AFF" />
          </View>
          <Text style={styles.headerTitle}>MCP Integration</Text>
          <Text style={styles.headerSubtitle}>
            Connect Kaytx AI Workforce to Claude Desktop, Cursor, and more
          </Text>
        </View>

        {/* Status Card */}
        <View style={[styles.card, styles.statusCard]}>
          <View style={styles.statusHeader}>
            <Cpu size={24} color="#007AFF" />
            <Text style={styles.statusTitle}>Connection Status</Text>
          </View>
          
          <View style={styles.statusRow}>
            <View style={[
              styles.statusIndicator,
              connection.status === 'connected' && styles.statusConnected,
              connection.status === 'connecting' && styles.statusConnecting,
              connection.status === 'error' && styles.statusError,
            ]} />
            <Text style={styles.statusText}>
              {connection.status === 'disconnected' && 'Disconnected'}
              {connection.status === 'connecting' && 'Connecting...'}
              {connection.status === 'connected' && 'Connected'}
              {connection.status === 'error' && 'Connection Error'}
            </Text>
            {connection.agentCount && (
              <Text style={styles.agentCount}>{connection.agentCount} agents available</Text>
            )}
          </View>

          {connection.message && (
            <Text style={styles.statusMessage}>{connection.message}</Text>
          )}

          <View style={styles.statusActions}>
            {connection.status !== 'connected' ? (
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleConnect}
                disabled={connection.status === 'connecting'}
              >
                {connection.status === 'connecting' ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Play size={18} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Connect</Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.dangerButton]}
                onPress={handleDisconnect}
              >
                <Square size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Disconnect</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Configuration */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Settings size={24} color="#007AFF" />
            <Text style={styles.cardTitle}>Configuration</Text>
          </View>

          {/* Transport Selection */}
          <Text style={styles.label}>Transport Type</Text>
          <View style={styles.transportButtons}>
            <TouchableOpacity
              style={[
                styles.transportButton,
                transport === 'stdio' && styles.transportButtonActive,
              ]}
              onPress={() => setTransport('stdio')}
            >
              <Terminal size={18} color={transport === 'stdio' ? '#FFFFFF' : '#007AFF'} />
              <Text style={[
                styles.transportButtonText,
                transport === 'stdio' && styles.transportButtonTextActive,
              ]}>
                stdio (Claude Desktop)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.transportButton,
                transport === 'sse' && styles.transportButtonActive,
              ]}
              onPress={() => setTransport('sse')}
            >
              <Plug size={18} color={transport === 'sse' ? '#FFFFFF' : '#007AFF'} />
              <Text style={[
                styles.transportButtonText,
                transport === 'sse' && styles.transportButtonTextActive,
              ]}>
                SSE (Web)
              </Text>
            </TouchableOpacity>
          </View>

          {/* SSE URL (only for SSE transport) */}
          {transport === 'sse' && (
            <>
              <Text style={styles.label}>SSE URL</Text>
              <TextInput
                style={styles.input}
                value={sseUrl}
                onChangeText={setSseUrl}
                placeholder="http://localhost:3001/sse"
                placeholderTextColor="#8E8E93"
              />
            </>
          )}

          {/* API Key */}
          <Text style={styles.label}>API Key</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your Kaytx API key"
            placeholderTextColor="#8E8E93"
            secureTextEntry
          />

          {/* Org ID */}
          <Text style={styles.label}>Organization ID</Text>
          <TextInput
            style={styles.input}
            value={orgId}
            onChangeText={setOrgId}
            placeholder="Enter your organization ID"
            placeholderTextColor="#8E8E93"
          />
        </View>

        {/* Client Configurations */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client Configuration</Text>
          <Text style={styles.cardSubtitle}>
            Copy these configurations to connect your MCP clients
          </Text>

          <TouchableOpacity style={styles.configButton} onPress={copyClaudeConfig}>
            <View style={styles.configButtonContent}>
              <Text style={styles.configButtonTitle}>Claude Desktop</Text>
              <Text style={styles.configButtonDesc}>
                Add to claude_desktop_config.json
              </Text>
            </View>
            <Copy size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.configButton} onPress={copyCursorConfig}>
            <View style={styles.configButtonContent}>
              <Text style={styles.configButtonTitle}>Cursor</Text>
              <Text style={styles.configButtonDesc}>
                Add to ~/.cursor/mcp.json
              </Text>
            </View>
            <Copy size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Test Agent */}
        {connection.status === 'connected' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Test Agent Execution</Text>
            <Text style={styles.cardSubtitle}>
              Send a test query to verify agent functionality
            </Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              value={testQuery}
              onChangeText={setTestQuery}
              placeholder="Enter a test query for the AI agents..."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[styles.button, styles.primaryButton, styles.fullWidthButton]}
              onPress={handleTestAgent}
              disabled={isTesting || !testQuery.trim()}
            >
              {isTesting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Play size={18} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Execute Test</Text>
                </>
              )}
            </TouchableOpacity>

            {testResponse && (
              <View style={styles.responseBox}>
                <Text style={styles.responseText}>{testResponse}</Text>
              </View>
            )}
          </View>
        )}

        {/* Available Agents */}
        {connection.status === 'connected' && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Available Agents</Text>
              <TouchableOpacity onPress={() => {}}>
                <RefreshCw size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>

            {[
              { name: 'ai_sales_rep', category: 'Sales', desc: 'SDR + Junior AE capabilities' },
              { name: 'ai_customer_support', category: 'Support', desc: 'Tier 1 & 2 support specialist' },
              { name: 'ai_cmo', category: 'Marketing', desc: 'Chief Marketing Officer AI' },
              { name: 'ai_data_analyst', category: 'Analytics', desc: 'Data analysis & insights' },
            ].map((agent, index) => (
              <View key={index} style={styles.agentItem}>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentCategory}>{agent.category}</Text>
                  <Text style={styles.agentDesc}>{agent.desc}</Text>
                </View>
                <ChevronRight size={20} color="#C7C7CC" />
              </View>
            ))}

            <Text style={styles.moreAgents}>+ 76 more agents available</Text>
          </View>
        )}

        {/* Documentation Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Learn more about MCP at{' '}
            <Text style={styles.footerLink}>modelcontextprotocol.io</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#E5F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8E8E93',
  },
  statusConnected: {
    backgroundColor: '#34C759',
  },
  statusConnecting: {
    backgroundColor: '#FF9500',
  },
  statusError: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  agentCount: {
    fontSize: 14,
    color: '#34C759',
    marginLeft: 'auto',
  },
  statusMessage: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  statusActions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  fullWidthButton: {
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3C3C43',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  transportButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  transportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  transportButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  transportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  transportButtonTextActive: {
    color: '#FFFFFF',
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    marginBottom: 12,
  },
  configButtonContent: {
    flex: 1,
  },
  configButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  configButtonDesc: {
    fontSize: 13,
    color: '#8E8E93',
  },
  responseBox: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  responseText: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  agentCategory: {
    fontSize: 13,
    color: '#007AFF',
    marginBottom: 2,
  },
  agentDesc: {
    fontSize: 13,
    color: '#8E8E93',
  },
  moreAgents: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footerLink: {
    color: '#007AFF',
  },
});
