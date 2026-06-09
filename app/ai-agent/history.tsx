import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { ArrowLeft, Clock, Activity, CircleCheck, TriangleAlert, ListFilter, Search, Calendar, Power, User } from 'lucide-react-native';

export default function HistoryScreen() {
    const { theme } = useTheme();
    useAIAssistant();
    const [filterType, setFilterType] = useState<'all' | 'active' | 'draft' | 'paused' | 'archived'>('all');
    const [refreshing, setRefreshing] = useState(false);

    // Fetch all agents from database
    const { data: agentsData, isLoading, refetch } = trpc.aiAgents.getAllAgents.useQuery();
    const updateStatus = trpc.aiAgents.updateAgentStatus.useMutation({
        onSuccess: () => {
            refetch();
        },
    });

    const agents = agentsData?.agents || [];

    const filteredAgents = filterType === 'all'
        ? agents
        : agents.filter((a: any) => a.status === filterType);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
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

    const handleToggleStatus = async (agentId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        try {
            await updateStatus.mutateAsync({
                agentId,
                status: newStatus as 'draft' | 'active' | 'paused' | 'archived',
            });
        } catch {
            console.error('Failed to update agent status:');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return '#34C759';
            case 'paused': return '#FF9500';
            case 'draft': return '#8E8E93';
            case 'archived': return '#FF3B30';
            default: return '#8E8E93';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CircleCheck size={16} color="#34C759" />;
            case 'paused': return <TriangleAlert size={16} color="#FF9500" />;
            case 'draft': return <Activity size={16} color="#8E8E93" />;
            case 'archived': return <TriangleAlert size={16} color="#FF3B30" />;
            default: return <Activity size={16} color="#8E8E93" />;
        }
    };

    const getAgentColor = (type: string) => {
        const agent = aiEmployees.find((a) => a.id.includes((type || '').toLowerCase()));
        return agent?.color ?? theme.colors.primary;
    };

    const formatDate = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const renderItem = ({ item }: { item: any }) => {
        const statusColor = getStatusColor(item.status);
        const agentColor = getAgentColor(item.type);

        return (
            <View style={[styles.historyItem, { backgroundColor: theme.colors.cardBackground, borderLeftColor: agentColor }]}>
                <View style={styles.itemHeader}>
                    <View style={styles.agentBadge}>
                        <View style={[styles.iconBox, { backgroundColor: agentColor + '15' }]}>
                            <User size={20} color={agentColor} />
                        </View>
                        <View style={styles.agentInfo}>
                            <Text style={[styles.agentName, { color: theme.colors.text }]}>{item.name}</Text>
                            <Text style={[styles.agentType, { color: theme.colors.secondaryText }]}>{item.type}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleToggleStatus(item.id, item.status)}
                        style={[styles.statusButton, { backgroundColor: statusColor + '15' }]}
                    >
                        <Power size={14} color={statusColor} />
                    </TouchableOpacity>
                </View>
                {item.description && (
                    <Text style={[styles.description, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}
                <View style={styles.itemFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                        {getStatusIcon(item.status)}
                        <Text style={[styles.statusText, { color: statusColor, textTransform: 'capitalize' }]}>
                            {item.status}
                        </Text>
                    </View>
                    <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>
                        {formatDate(item.createdAt)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Agent History</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>All automated activities timeline</Text>
                </View>
            </View>

            <View style={styles.filterBar}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {['all', 'active', 'draft', 'paused', 'archived'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.filterChip,
                                filterType === type && { backgroundColor: theme.colors.primary },
                                filterType !== type && { backgroundColor: theme.colors.cardBackground }
                            ]}
                            onPress={() => setFilterType(type as any)}
                        >
                            <Text style={[
                                styles.filterText,
                                { color: filterType === type ? '#fff' : theme.colors.secondaryText, textTransform: 'capitalize' }
                            ]}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredAgents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        {isLoading ? (
                            <>
                                <Activity size={48} color={theme.colors.primary} />
                                <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>Loading agents...</Text>
                            </>
                        ) : (
                            <>
                                <User size={48} color={theme.colors.secondaryText} />
                                <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No AI agents created yet</Text>
                                <Text style={[styles.emptySubtext, { color: theme.colors.secondaryText }]}>Create your first agent to get started</Text>
                            </>
                        )}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 15 },
    backButton: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(150,150,150,0.1)' },
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 13, fontWeight: '500' },
    filterBar: { marginBottom: 10 },
    filterScroll: { paddingHorizontal: 20, gap: 10, paddingBottom: 10 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    filterText: { fontSize: 13, fontWeight: '600' },
    listContent: { padding: 20, gap: 12 },
    historyItem: { padding: 16, borderRadius: 16, borderLeftWidth: 4, gap: 12 },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    agentBadge: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    agentInfo: { flex: 1 },
    agentName: { fontSize: 16, fontWeight: '700' },
    agentType: { fontSize: 12, fontWeight: '500', marginTop: 2, textTransform: 'capitalize' },
    statusButton: { padding: 8, borderRadius: 8 },
    description: { fontSize: 13, lineHeight: 18 },
    itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: '700' },
    timestamp: { fontSize: 11, fontWeight: '500' },
    emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 100, gap: 15 },
    emptyText: { fontSize: 16, fontWeight: '600' },
    emptySubtext: { fontSize: 13, fontWeight: '400', marginTop: 5 }
});
