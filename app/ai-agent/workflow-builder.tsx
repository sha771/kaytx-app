 
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Plus,
  Play,
  Save,
  Trash2,
  Settings,
  ChevronLeft,
  GitBranch,
  Zap,
  MessageSquare,
  Clock,
  LayoutDashboard,
  Maximize2,
  Minimize2,
  ChartBarBig,
  TrendingUp,
  Activity,
  X,
  ChevronRight,
  Webhook,
  Bell,
  Database,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

Dimensions.get('window');

// Node Types for Workflow Builder
type NodeType =
  | 'trigger'
  | 'agent-task'
  | 'condition'
  | 'delay'
  | 'parallel'
  | 'merge'
  | 'webhook'
  | 'api-call'
  | 'notification'
  | 'data-transform'
  | 'loop'
  | 'error-handler'
  | 'sub-workflow'
  | 'human-approval';

interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number ,
    comprehensiveFeatures: {
  "communicationChannels": {
    "call": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "PBX Integration",
        "IVR Menu",
        "Call Routing",
        "Call Recording",
        "Transcriptions"
      ],
      "recordingRetention": "90 days",
      "consentLogging": true
    },
    "chatSystem": {
      "enabled": true,
      "platforms": [
        "Web Widget",
        "Slack",
        "Intercom",
        "Microsoft Teams"
      ],
      "persistentThreads": true,
      "transcriptExport": true
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "Templated Messages",
        "Two-Way Support",
        "Opt-Out Handling"
      ],
      "number": "TBD"
    },
    "voice": {
      "enabled": true,
      "primaryDID": "TBD",
      "ttsVoice": "default",
      "failoverNumbers": [],
      "geoRouting": true
    },
    "recording": {
      "enabled": true,
      "autoRecording": true,
      "consentLogging": true,
      "transcriptGeneration": true,
      "scriptTemplates": []
    },
    "location": {
      "allowedRegions": [
        "Global"
      ],
      "timezoneAware": true,
      "localeFormats": [
        "en-US",
        "en-GB",
        "es-ES",
        "fr-FR",
        "de-DE"
      ]
    }
  },
  "companySetup": {
    "profile": {
      "enabled": true,
      "fields": [
        "Company Name",
        "Industry",
        "Size",
        "Location"
      ]
    },
    "products": {
      "enabled": true,
      "catalog": true,
      "pricingTiers": true
    },
    "negotiationRules": {
      "enabled": true,
      "templates": true,
      "maxConcession": "10%"
    }
  },
  "generalInfo": {
    "name": "",
    "role": "",
    "availability": "24/7",
    "personality": "professional",
    "tone": "conversational",
    "voice": "neutral"
  },
  "modelConfig": {
    "modelName": "LLM-X v2",
    "modelFamily": "GPT-4",
    "version": "latest",
    "primaryLanguage": "en-US",
    "fallbackLanguages": [
      "es",
      "fr",
      "de"
    ],
    "multilingualSupport": true
  },
  "timing": {
    "businessHours": {
      "enabled": true,
      "schedule": "Mon-Fri 09:00-18:00 local",
      "timezone": "UTC",
      "holidays": []
    },
    "waitingDuration": {
      "call": 120,
      "chat": 30,
      "sms": 0
    },
    "appointmentScheduling": {
      "enabled": true,
      "calendars": [
        "Google",
        "Outlook"
      ],
      "timezoneHandling": "automatic"
    }
  },
  "pricing": {
    "pricingModel": "fixed monthly",
    "priceLimit": "TBD",
    "negotiationRules": {
      "enabled": true,
      "maxConcession": "10%",
      "autoNegotiation": false
    }
  },
  "integrations": {
    "crm": [
      "Salesforce",
      "HubSpot",
      "Zendesk"
    ],
    "ticketing": [
      "Zendesk",
      "Freshdesk",
      "Jira"
    ],
    "calendar": [
      "Google Calendar",
      "Outlook Calendar"
    ],
    "telephony": [
      "Twilio",
      "Vonage",
      "RingCentral"
    ],
    "analytics": [
      "Google Analytics",
      "Mixpanel",
      "Amplitude"
    ],
    "mcpConnectors": []
  },
  "responsibilities": {
    "taskRouting": {
      "method": "intent-based",
      "escalationPath": "human after 3 failed handoffs",
      "slaEnforcement": true
    },
    "appointmentScheduling": {
      "enabled": true,
      "rules": []
    }
  },
  "taskManagement": {
    "assignedTasks": {
      "queue": true,
      "slaTimers": true,
      "dependencies": true
    },
    "progressTracking": {
      "enabled": true,
      "metrics": [
        "completion percentage",
        "time remaining"
      ]
    }
  },
  "behaviour": {
    "safetyFilters": {
      "enabled": true,
      "restrictedDomains": [
        "legal",
        "medical",
        "financial advice"
      ]
    },
    "refusalTemplates": {
      "enabled": true
    },
    "rateLimits": {
      "enabled": true,
      "requestsPerMinute": 60
    }
  },
  "performance": {
    "metrics": {
      "latency": true,
      "accuracy": true,
      "successRate": true,
      "userSatisfaction": true
    },
    "reporting": {
      "dashboards": true,
      "scheduledReports": true,
      "cadence": [
        "daily",
        "weekly",
        "monthly"
      ]
    }
  },
  "summary": {
    "enabled": true,
    "adminNotes": "",
    "handoverContext": true
  },
  "predictive": {
    "forecasting": {
      "enabled": true,
      "models": []
    },
    "anomalyDetection": {
      "enabled": true,
      "triggers": []
    }
  },
  "regulations": {
    "compliance": {
      "gdpr": true,
      "hipaa": false,
      "soc2": false,
      "regional": true
    },
    "dataResidency": {
      "enabled": true,
      "regions": []
    },
    "consentPolicies": {
      "enabled": true
    }
  },
  "memory": {
    "session": {
      "duration": "30 minutes",
      "retention": true
    },
    "longTerm": {
      "duration": "365 days",
      "retention": true
    },
    "piiRedaction": {
      "enabled": true
    },
    "purgeSchedule": "quarterly"
  },
  "detailedSetup": {
    "onboardingFlow": true,
    "productPricingSetup": true,
    "negotiationRulesSetup": true,
    "trainingPlan": true,
    "knowledgeBaseImport": true,
    "voicePersonalityTuning": true,
    "businessHoursSetup": true,
    "additionalConfigs": []
  },
  "twoStepVerification": {
    "enabled": true,
    "criticalActions": [
      "billing",
      "admin modifications",
      "data export"
    ],
    "deviceCheck": true
  },
  "importExport": {
    "endpoints": [
      "CSV",
      "JSON"
    ],
    "scheduledExports": true,
    "retentionPolicy": true,
    "complianceControls": true
  },
  "reports": {
    "types": [
      "performance",
      "usage",
      "errors",
      "compliance"
    ],
    "cadence": [
      "daily",
      "weekly",
      "monthly"
    ],
    "deliveryChannels": [
      "email",
      "dashboard",
      "webhook"
    ]
  },
  "mcpIntegrations": {
    "connectors": [],
    "apiSpecs": [],
    "mapping": []
  }
}};
  config: any;
  connections: string[];
}

interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

const NODE_TYPES: { type: NodeType; label: string; icon: any; color: string; description: string }[] = [
  { type: 'trigger', label: 'Trigger', icon: Zap, color: '#F59E0B', description: 'Start the workflow' },
  { type: 'agent-task', label: 'Agent Task', icon: MessageSquare, color: '#3B82F6', description: 'Assign task to AI agent' },
  { type: 'condition', label: 'Condition', icon: GitBranch, color: '#8B5CF6', description: 'Branch based on conditions' },
  { type: 'delay', label: 'Delay', icon: Clock, color: '#6B7280', description: 'Wait for a duration' },
  { type: 'webhook', label: 'Webhook', icon: Webhook, color: '#10B981', description: 'Call external API' },
  { type: 'notification', label: 'Notification', icon: Bell, color: '#EC4899', description: 'Send notification' },
  { type: 'data-transform', label: 'Transform', icon: Database, color: '#6366F1', description: 'Transform data' },
  { type: 'error-handler', label: 'Error Handler', icon: X, color: '#EF4444', description: 'Handle errors' },
];

const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'lead-qualification',
    name: 'Lead Qualification',
    description: 'Automatically qualify and route leads to sales agents',
    category: 'Sales',
    icon: 'target',
    nodes: [],
    connections: [],
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Route support tickets to appropriate agents based on category',
    category: 'Support',
    icon: 'headphones',
    nodes: [],
    connections: [],
  },
  {
    id: 'onboarding',
    name: 'Customer Onboarding',
    description: 'Multi-step onboarding workflow with agent handoffs',
    category: 'Operations',
    icon: 'user-plus',
    nodes: [],
    connections: [],
  },
  {
    id: 'approval',
    name: 'Approval Workflow',
    description: 'Route approvals through managers and departments',
    category: 'HR',
    icon: 'check-circle',
    nodes: [],
    connections: [],
  },
];

export default function WorkflowBuilderScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'trigger-1',
      type: 'trigger',
      label: 'Trigger',
      position: { x: 100, y: 100 },
      config: {},
      connections: [],
    },
  ]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [, setSelectedConnection] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [showNodePanel, setShowNodePanel] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [canvasOffset, _setCanvasOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<View>(null);

  // Add new node
  const addNode = (type: NodeType, position?: { x: number; y: number }) => {
    const nodeType = NODE_TYPES.find(n => n.type === type);
    if (!nodeType) return;

    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type,
      label: nodeType.label,
      position: position || { x: 200 + nodes.length * 50, y: 200 },
      config: {},
      connections: [],
    };

    setNodes([...nodes, newNode]);
    setShowNodePanel(false);
  };

  // Delete node
  const deleteNode = (nodeId: string) => {
    Alert.alert(
      'Delete Node',
      'Are you sure you want to delete this node?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNodes(nodes.filter(n => n.id !== nodeId));
            setConnections(connections.filter(c => c.source !== nodeId && c.target !== nodeId));
            setSelectedNode(null);
          },
        },
      ]
    );
  };

  // Start connection
  const startConnection = (nodeId: string) => {
    if (isConnecting && connectionStart) {
      // Complete connection
      if (connectionStart !== nodeId) {
        const newConnection: WorkflowConnection = {
          id: `conn-${Date.now()}`,
          source: connectionStart,
          target: nodeId,
        };
        setConnections([...connections, newConnection]);

        // Update source node connections
        setNodes(nodes.map(n =>
          n.id === connectionStart
            ? { ...n, connections: [...n.connections, nodeId] }
            : n
        ));
      }
      setIsConnecting(false);
      setConnectionStart(null);
    } else {
      setIsConnecting(true);
      setConnectionStart(nodeId);
    }
  };

  // Save workflow
  const saveWorkflow = async () => {
    try {
      // Save to backend
      Alert.alert('Success', 'Workflow saved successfully');
    } catch {
      Alert.alert('Error', 'Failed to save workflow');
    }
  };

  // Execute workflow
  const executeWorkflow = async () => {
    Alert.alert(
      'Execute Workflow',
      'Are you sure you want to execute this workflow?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Execute',
          onPress: async () => {
            try {
              // Execute workflow
              Alert.alert('Success', 'Workflow execution started');
            } catch {
              Alert.alert('Error', 'Failed to execute workflow');
            }
          },
        },
      ]
    );
  };

  // Render node
  const renderNode = (node: WorkflowNode) => {
    const nodeType = NODE_TYPES.find(n => n.type === node.type);
    const Icon = nodeType?.icon || MessageSquare;
    const isSelected = selectedNode === node.id;
    const isConnectionStart = connectionStart === node.id;

    return (
      <TouchableOpacity
        key={node.id}
        style={[
          styles.node,
          {
            left: node.position.x * zoom + canvasOffset.x,
            top: node.position.y * zoom + canvasOffset.y,
            backgroundColor: nodeType?.color || '#3B82F6',
            transform: [{ scale: zoom }],
          },
          isSelected && styles.nodeSelected,
          isConnectionStart && styles.nodeConnecting,
        ]}
        onPress={() => {
          if (isConnecting) {
            startConnection(node.id);
          } else {
            setSelectedNode(isSelected ? null : node.id);
          }
        }}
        onLongPress={() => setSelectedNode(node.id)}
      >
        <View style={styles.nodeContent}>
          <Icon size={20} color="white" />
          <Text style={styles.nodeLabel}>{node.label}</Text>
        </View>

        {/* Connection points */}
        <TouchableOpacity
          style={[styles.connectionPoint, styles.connectionPointInput]}
          onPress={() => startConnection(node.id)}
        />
        <TouchableOpacity
          style={[styles.connectionPoint, styles.connectionPointOutput]}
          onPress={() => startConnection(node.id)}
        />

        {/* Delete button when selected */}
        {isSelected && (
          <TouchableOpacity
            style={styles.nodeDelete}
            onPress={() => deleteNode(node.id)}
          >
            <Trash2 size={16} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Render connection line
  const renderConnection = (connection: WorkflowConnection) => {
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);

    if (!sourceNode || !targetNode) return null;

    const startX = sourceNode.position.x * zoom + canvasOffset.x + 120;
    const startY = sourceNode.position.y * zoom + canvasOffset.y + 30;
    const endX = targetNode.position.x * zoom + canvasOffset.x;
    const endY = targetNode.position.y * zoom + canvasOffset.y + 30;

    return (
      <View
        key={connection.id}
        style={[
          styles.connection,
          {
            left: startX,
            top: startY,
            width: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)),
            transform: [
              { rotate: `${Math.atan2(endY - startY, endX - startX)}rad` },
            ],
          },
        ]}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <TextInput
              style={[styles.workflowName, { color: colors.text }]}
              value={workflowName}
              onChangeText={setWorkflowName}
              placeholder="Workflow Name"
            />
            <Text style={[styles.workflowStatus, { color: colors.icon }]}>
              {nodes.length} nodes • {connections.length} connections
            </Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => setZoom(zoom * 0.9)}>
            <Minimize2 size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setZoom(zoom * 1.1)}>
            <Maximize2 size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={saveWorkflow}>
            <Save size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowTemplates(true)}>
            <LayoutDashboard size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowSettings(true)}>
            <Settings size={20} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, styles.executeButton]} onPress={executeWorkflow}>
            <Play size={20} color="white" fill="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: colors.card }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NODE_TYPES.map((nodeType) => (
            <TouchableOpacity
              key={nodeType.type}
              style={[styles.toolbarItem, { backgroundColor: nodeType.color + '20' }]}
              onPress={() => addNode(nodeType.type)}
            >
              <nodeType.icon size={16} color={nodeType.color} />
              <Text style={[styles.toolbarText, { color: colors.text }]}>{nodeType.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Canvas */}
      <View style={styles.canvas} ref={canvasRef}>
        {/* Grid background */}
        <View style={[styles.grid, { backgroundColor: colors.background }]} />

        {/* Connections */}
        <View style={styles.connections}>
          {connections.map(renderConnection)}
        </View>

        {/* Nodes */}
        <View style={styles.nodes}>
          {nodes.map(renderNode)}
        </View>

        {/* Add Node FAB */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.tint }]}
          onPress={() => setShowNodePanel(true)}
        >
          <Plus size={28} color="white" />
        </TouchableOpacity>

        {/* Zoom controls */}
        <View style={[styles.zoomControls, { backgroundColor: colors.card }] }>
          <Text style={[styles.zoomText, { color: colors.text }]}>{Math.round(zoom * 100)}%</Text>
        </View>
      </View>

      {/* Templates Modal */}
      <Modal
        visible={showTemplates}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTemplates(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Workflow Templates</Text>
              <TouchableOpacity onPress={() => setShowTemplates(false)}>
                <X size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {WORKFLOW_TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[styles.templateCard, { backgroundColor: colors.background }]}
                >
                  <View style={styles.templateIcon}>
                    <LayoutDashboard size={32} color={colors.tint} />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: colors.text }]}>{template.name}</Text>
                    <Text style={[styles.templateDescription, { color: colors.icon }]}>
                      {template.description}
                    </Text>
                    <View style={styles.templateMeta}>
                      <Text style={[styles.templateCategory, { color: colors.tint }]}>
                        {template.category}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color={colors.icon} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Node Panel Modal */}
      <Modal
        visible={showNodePanel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNodePanel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add Node</Text>
              <TouchableOpacity onPress={() => setShowNodePanel(false)}>
                <X size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {NODE_TYPES.map((nodeType) => (
                <TouchableOpacity
                  key={nodeType.type}
                  style={[styles.nodeTypeCard, { backgroundColor: colors.background }]}
                  onPress={() => addNode(nodeType.type)}
                >
                  <View style={[styles.nodeTypeIcon, { backgroundColor: nodeType.color + '20' }]}>
                    <nodeType.icon size={24} color={nodeType.color} />
                  </View>
                  <View style={styles.nodeTypeInfo}>
                    <Text style={[styles.nodeTypeName, { color: colors.text }]}>{nodeType.label}</Text>
                    <Text style={[styles.nodeTypeDescription, { color: colors.icon }]}>
                      {nodeType.description}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={colors.icon} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Workflow Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <X size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.templateDescription, { color: colors.icon }]}>
                Settings panel coming soon.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    marginLeft: 12,
    flex: 1,
  },
  workflowName: {
    fontSize: 18,
    fontWeight: '600',
  },
  workflowStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 8,
  },
  executeButton: {
    backgroundColor: '#10B981',
    marginLeft: 8,
  },
  toolbar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  toolbarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  toolbarText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
  canvas: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  connections: {
    ...StyleSheet.absoluteFillObject,
  },
  connection: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#6B7280',
    transformOrigin: 'left center',
  },
  nodes: {
    ...StyleSheet.absoluteFillObject,
  },
  node: {
    position: 'absolute',
    width: 120,
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nodeSelected: {
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  nodeConnecting: {
    borderWidth: 2,
    borderColor: '#F59E0B',
    borderStyle: 'dashed',
  },
  nodeContent: {
    alignItems: 'center',
  },
  nodeLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  connectionPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#6B7280',
  },
  connectionPointInput: {
    left: -6,
  },
  connectionPointOutput: {
    right: -6,
  },
  nodeDelete: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  zoomControls: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  zoomText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalBody: {
    padding: 16,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  templateMeta: {
    flexDirection: 'row',
  },
  templateCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  nodeTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  nodeTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nodeTypeInfo: {
    flex: 1,
  },
  nodeTypeName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeTypeDescription: {
    fontSize: 12,
  },
});
