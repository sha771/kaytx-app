import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, useSafeAreaInsets, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield, UserPlus, UserMinus, Target, AlertTriangle, CheckCircle, Clock, Calendar, Bot, ArrowRight, BookOpen, Users, X, MessageSquare, Send, Check } from 'lucide-react-native';

export default function KnowledgeContinuityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'onboarding' | 'departure' | 'succession'>('onboarding');

  // Interactive Onboarding checklist state
  const [onboardings, setOnboardings] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Senior Engineer', startDate: 'May 20', progress: 65, mentor: 'Sarah Chen', tasks: [
      { id: 't1', text: 'Initialize local Docker setup & pull microservices', done: true },
      { id: 't2', text: 'Configure secure AWS Sandbox environment IAM keys', done: true },
      { id: 't3', text: 'Pass SOC-2 Company Compliance examination', done: false },
      { id: 't4', text: 'Complete first sprint pair-programming task', done: false }
    ]},
    { id: 2, name: 'Jordan Kim', role: 'Product Manager', startDate: 'May 22', progress: 50, mentor: 'Mike Johnson', tasks: [
      { id: 't5', text: 'Review product vision guidelines & roadmap', done: true },
      { id: 't6', text: 'Audit Jira tickets & active blockers backlog', done: true },
      { id: 't7', text: 'Conduct introductory client onboarding syncs', done: false },
      { id: 't8', text: 'Draft PRD specs for upcoming search updates', done: false }
    ]},
    { id: 3, name: 'Taylor Smith', role: 'Sales Rep', startDate: 'May 24', progress: 25, mentor: 'Emily Davis', tasks: [
      { id: 't9', text: 'Setup Salesforce CRM access credentials', done: true },
      { id: 't10', text: 'Shadow senior negotiation calls', done: false },
      { id: 't11', text: 'Review refund policies & pricing tiers doc', done: false },
      { id: 't12', text: 'Conduct initial outbound campaign triggers', done: false }
    ]}
  ]);

  // Departure Risks State
  const [atRiskHolders, setAtRiskHolders] = useState([
    { id: 1, name: 'James Wilson', role: 'Legal Counsel', tenure: '5 years', risk: 'high', coverage: 75, knowledge_areas: ['Contracts', 'Compliance', 'IP'] },
    { id: 2, name: 'Sarah Chen', role: 'VP Engineering', tenure: '4 years', risk: 'medium', coverage: 90, knowledge_areas: ['Architecture', 'AWS', 'Microservices'] },
    { id: 3, name: 'Mike Johnson', role: 'Sales Director', tenure: '6 years', risk: 'medium', coverage: 85, knowledge_areas: ['Enterprise Deals', 'Negotiations', 'Key Accounts'] }
  ]);

  const [successionPlans, setSuccessionPlans] = useState([
    { role: 'VP Engineering', incumbent: 'Sarah Chen', backup: 'David Lee', status: 'Ready', coverage: '90%' },
    { role: 'Legal Counsel', incumbent: 'James Wilson', backup: 'Maria Garcia', status: 'In Progress', coverage: '75%' },
    { role: 'Sales Director', incumbent: 'Mike Johnson', backup: 'Anna Brown', status: 'Ready', coverage: '85%' }
  ]);

  // Mentoring meetup schedules
  const [activeOnboardingsCount, setActiveOnboardingsCount] = useState(8);
  const [avgCompletionText, setAvgCompletionText] = useState('12 days');
  const [questionsCount, setQuestionsCount] = useState(1247);
  const [knowledgeGapsCount, setKnowledgeGapsCount] = useState(3);

  // Modals & Forms State
  const [showAddHireModal, setShowAddHireModal] = useState(false);
  const [newHireName, setNewHireName] = useState('');
  const [newHireRole, setNewHireRole] = useState('');
  const [newHireMentor, setNewHireMentor] = useState('');

  const [selectedOnboarding, setSelectedOnboarding] = useState<any>(null);

  // Departure Plan Generator State
  const [selectedDepartureRisk, setSelectedDepartureRisk] = useState<any>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  // Persona Chatbot State
  const [chatbotPersona, setChatbotPersona] = useState('sarah');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: "Hi! I'm Sarah Chen, VP of Engineering. Ask me anything about our system architecture, AWS migration patterns, or DB replication rules." }
  ]);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  // Onboarding Form handler
  const handleAddNewHire = () => {
    if (!newHireName || !newHireRole) return;
    const newHire = {
      id: Date.now(),
      name: newHireName,
      role: newHireRole,
      startDate: 'Just now',
      progress: 0,
      mentor: newHireMentor || 'Unassigned',
      tasks: [
        { id: 'nt1', text: 'Complete administrative HR details setup', done: false },
        { id: 'nt2', text: 'Obtain company email & Slack keys', done: false },
        { id: 'nt3', text: 'Review department onboarding documentation folder', done: false },
        { id: 'nt4', text: 'First one-on-one sync meetup with assigned mentor', done: false }
      ]
    };
    setOnboardings([newHire, ...onboardings]);
    setActiveOnboardingsCount(prev => prev + 1);
    setShowAddHireModal(false);
    setNewHireName('');
    setNewHireRole('');
    setNewHireMentor('');
  };

  // Toggle Onboarding checklist items & recalculate progress percentage
  const toggleOnboardingTask = (onboardingId: number, taskId: string) => {
    const updatedOnboardings = onboardings.map(o => {
      if (o.id === onboardingId) {
        const updatedTasks = o.tasks.map(t => {
          if (t.id === taskId) {
            return { ...t, done: !t.done };
          }
          return t;
        });
        const completedCount = updatedTasks.filter(t => t.done).length;
        const progressPct = Math.round((completedCount / updatedTasks.length) * 100);
        return {
          ...o,
          tasks: updatedTasks,
          progress: progressPct
        };
      }
      return o;
    });

    setOnboardings(updatedOnboardings);

    // Update active inspector modal in real-time
    const currentActive = updatedOnboardings.find(o => o.id === onboardingId);
    if (selectedOnboarding && selectedOnboarding.id === onboardingId) {
      setSelectedOnboarding(currentActive);
    }
  };

  // Departure Plan execution
  const runDepartureSuccessionPlan = (holder: any) => {
    setSelectedDepartureRisk(holder);
    setIsGeneratingPlan(true);
    setGeneratedPlan(null);
    setGenerationStep('Analyzing unwritten Slack blueprints & SOP context...');

    const steps = [
      'Extracting repository code comments and wiki files...',
      'Mapping critical project connections & stakeholder links...',
      'Structuring handover delegation checklists...',
      'Succession plan finalized!'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setGenerationStep(step);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsGeneratingPlan(false);
            setGeneratedPlan({
              incumbent: holder.name,
              role: holder.role,
              successor: holder.name === 'James Wilson' ? 'Maria Garcia' : holder.name === 'Sarah Chen' ? 'David Lee' : 'Anna Brown',
              readiness: holder.name === 'Sarah Chen' ? '92% Readiness' : '88% Readiness',
              tasks: [
                `Review and log unmapped ${holder.knowledge_areas[0]} credentials`,
                `Schedule transition one-on-ones regarding ${holder.knowledge_areas[1]}`,
                `Publish final handover SOP repository tags`
              ]
            });
          }, 600);
        }
      }, (index + 1) * 700);
    });
  };

  // Approve generated plan
  const approveHandoffPlan = () => {
    if (!selectedDepartureRisk) return;

    // Update risk list
    setAtRiskHolders(prev => prev.map(h => {
      if (h.id === selectedDepartureRisk.id) {
        return { ...h, risk: 'low', coverage: 95 };
      }
      return h;
    }));

    // Update succession list
    setSuccessionPlans(prev => prev.map(s => {
      if (s.incumbent === selectedDepartureRisk.name) {
        return { ...s, status: 'Ready', coverage: '95%' };
      }
      return s;
    }));

    // Lower dashboard gap metrics
    setKnowledgeGapsCount(g => Math.max(g - 1, 0));
    setQuestionsCount(q => q + 35);
    
    // Close modal
    setSelectedDepartureRisk(null);
    setGeneratedPlan(null);
  };

  // Ask Persona Chatbot
  const handleChatSubmit = () => {
    if (!chatMessage.trim()) return;
    const userMsg = { sender: 'user' as const, text: chatMessage };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsChatbotTyping(true);

    setTimeout(() => {
      setIsChatbotTyping(false);
      let botResponse = '';
      const query = chatMessage.toLowerCase();

      if (chatbotPersona === 'sarah') {
        if (query.includes('aws') || query.includes('migration') || query.includes('server')) {
          botResponse = "Sarah: For the AWS migration, we are running multi-region database replicates using RDS PostgreSQL with VPC Peering. We have mapped System Architecture nodes to keep backups of the API keys.";
        } else if (query.includes('db') || query.includes('scaling')) {
          botResponse = "Sarah: Database scaling is optimized via serverless endpoints and Redis caching. Always document your scaling configurations inside the Technical spaces.";
        } else {
          botResponse = "Sarah: Got it. I recommend documenting this technical blueprint directly in the Engineering space so our Autonomous curator logs it.";
        }
      } else { // james
        if (query.includes('contract') || query.includes('saas') || query.includes('refund')) {
          botResponse = "James: Under SaaS contracts v2, refunds exceeding $500 require direct VP authorization. Everything is standard under SEC compliance checks.";
        } else if (query.includes('ip') || query.includes('legal')) {
          botResponse = "James: Intellectual property rights must be verified via our standardized legal checklist. Connect with Maria Garcia for contract overrides.";
        } else {
          botResponse = "James: Under standard company protocols, you must review our IT and Compliance files before deploying new enterprise policies.";
        }
      }

      setChatHistory(prev => [...prev, { sender: 'bot' as const, text: botResponse }]);
    }, 900);
  };

  // Toggle chatbot persona
  const changePersona = (persona: string) => {
    setChatbotPersona(persona);
    if (persona === 'sarah') {
      setChatHistory([
        { sender: 'bot', text: "Hi! I'm Sarah Chen, VP of Engineering. Ask me anything about our system architecture, AWS migration patterns, or DB replication rules." }
      ]);
    } else {
      setChatHistory([
        { sender: 'bot', text: "Hello, I am James Wilson, Legal Counsel. I can clarify contract protocols, compliance, IP guidelines, or refund rules." }
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Continuity</Text>
          <Text style={styles.headerSubtitle}>Preserving institutional memory & onboarding new hires</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Onboarding Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <UserPlus size={18} color="#3B82F6" />
            <Text style={styles.statValue}>{activeOnboardingsCount}</Text>
            <Text style={styles.statLabel}>Active Onboarding</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Calendar size={18} color="#10B981" />
            <Text style={styles.statValue}>{avgCompletionText}</Text>
            <Text style={styles.statLabel}>Avg Completion</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <BookOpen size={18} color="#7C3AED" />
            <Text style={styles.statValue}>{questionsCount}</Text>
            <Text style={styles.statLabel}>Queries Solved</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <AlertTriangle size={18} color="#F59E0B" />
            <Text style={styles.statValue}>{knowledgeGapsCount}</Text>
            <Text style={styles.statLabel}>Coverage Gaps</Text>
          </View>
        </View>

        {/* Functional Tabs */}
        <View style={styles.tabsContainer}>
          {['onboarding', 'departure', 'succession'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tab, { backgroundColor: activeTab === tab ? '#3B82F6' : '#1E293B' }]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? '#FFFFFF' : '#9CA3AF' }]}>
                {tab === 'onboarding' ? 'Onboarding Paths' : tab === 'departure' ? 'Departure Risks' : 'Succession Plans'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ONBOARDING TAB CONTENT */}
        {activeTab === 'onboarding' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>New Hire Checklists (Click to Update)</Text>
              <TouchableOpacity style={styles.runAuditBtn} onPress={() => setShowAddHireModal(true)}>
                <UserPlus size={14} color="#3B82F6" style={{ marginRight: 4 }} />
                <Text style={styles.runAuditText}>Onboard Hire</Text>
              </TouchableOpacity>
            </View>

            {onboardings.map((person) => (
              <TouchableOpacity 
                key={person.id} 
                style={[styles.onboardingCard, { backgroundColor: '#1E293B' }]}
                onPress={() => setSelectedOnboarding(person)}
              >
                <View style={styles.onboardingHeader}>
                  <View style={[styles.avatar, { backgroundColor: '#7C3AED' }]}>
                    <Text style={styles.avatarText}>{person.name[0]}</Text>
                  </View>
                  <View style={styles.onboardingInfo}>
                    <Text style={styles.onboardingName}>{person.name}</Text>
                    <Text style={styles.onboardingRole}>{person.role}</Text>
                  </View>
                  <View style={styles.onboardingDate}>
                    <Clock size={11} color="#6B7280" />
                    <Text style={styles.onboardingDateText}>{person.startDate}</Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${person.progress}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{person.progress}%</Text>
                </View>
                <Text style={styles.mentorText}>Onboarding Advisor: {person.mentor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* DEPARTURE RISKS TAB */}
        {activeTab === 'departure' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>At-Risk Knowledge Holders</Text>
            {atRiskHolders.map((employee) => (
              <View key={employee.id} style={[styles.riskCard, { backgroundColor: '#1E293B' }]}>
                <View style={styles.riskHeader}>
                  <View style={[styles.avatar, { backgroundColor: employee.risk === 'high' ? '#EF4444' : '#F59E0B' }]}>
                    <Text style={styles.avatarText}>{employee.name[0]}</Text>
                  </View>
                  <View style={styles.riskInfo}>
                    <Text style={styles.riskName}>{employee.name}</Text>
                    <Text style={styles.riskRole}>{employee.role}</Text>
                  </View>
                  <View style={[styles.riskBadge, { backgroundColor: employee.risk === 'high' ? '#EF444415' : '#F59E0B15' }]}>
                    <AlertTriangle size={12} color={employee.risk === 'high' ? '#EF4444' : '#F59E0B'} />
                    <Text style={[styles.riskBadgeText, { color: employee.risk === 'high' ? '#EF4444' : '#F59E0B' }]}>
                      {employee.risk} risk
                    </Text>
                  </View>
                </View>
                <View style={styles.riskDetails}>
                  <Text style={styles.riskTenure}>{employee.tenure} tenure • Mapped coverage: {employee.coverage}%</Text>
                  <View style={styles.knowledgeTags}>
                    {employee.knowledge_areas.map((area, i) => (
                      <View key={i} style={styles.knowledgeTag}>
                        <Text style={styles.knowledgeTagText}>{area}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                {employee.risk !== 'low' ? (
                  <TouchableOpacity 
                    style={[styles.btnPlanTrigger, { backgroundColor: '#7C3AED' }]}
                    onPress={() => runDepartureSuccessionPlan(employee)}
                  >
                    <Shield size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.btnPlanTriggerText}>Generate AI Handoff Plan</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.resolvedRiskAlert}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={styles.resolvedRiskText}>Departure Risk Secured</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SUCCESSION PLANS TAB */}
        {activeTab === 'succession' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Institutional Succession Blueprint</Text>
            {successionPlans.map((plan, index) => (
              <View key={index} style={[styles.successionCard, { backgroundColor: '#1E293B' }]}>
                <View style={styles.successionHeader}>
                  <Text style={styles.successionRole}>{plan.role}</Text>
                  <View style={[styles.successionStatus, { backgroundColor: plan.status === 'Ready' ? '#10B98115' : '#F59E0B15' }]}>
                    <CheckCircle size={12} color={plan.status === 'Ready' ? '#10B981' : '#F59E0B'} />
                    <Text style={[styles.successionStatusText, { color: plan.status === 'Ready' ? '#10B981' : '#F59E0B' }]}>
                      {plan.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.successionDetails}>
                  <View style={styles.successionPerson}>
                    <Text style={styles.successionLabel}>Active Incumbent</Text>
                    <Text style={styles.successionName}>{plan.incumbent}</Text>
                  </View>
                  <ArrowRight size={14} color="#6B7280" />
                  <View style={styles.successionPerson}>
                    <Text style={styles.successionLabel}>Designated Successor</Text>
                    <Text style={styles.successionName}>{plan.backup}</Text>
                  </View>
                  <View style={styles.coverageBadge}>
                    <Text style={styles.coverageLabel}>Coverage</Text>
                    <Text style={styles.coverageValue}>{plan.coverage}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* "WHAT WOULD X DO?" PERSONA CHATBOT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>"What Would X Do?" (Autonomous Advisor)</Text>
          <View style={[styles.chatbotCard, { backgroundColor: '#1E293B' }]}>
            <View style={styles.chatbotHeader}>
              <Text style={styles.chatbotHeaderTitle}>Consult Expert Brain Replica:</Text>
              <View style={styles.personaButtons}>
                <TouchableOpacity 
                  style={[styles.personaBtn, { backgroundColor: chatbotPersona === 'sarah' ? '#7C3AED' : '#37415140' }]}
                  onPress={() => changePersona('sarah')}
                >
                  <Text style={styles.personaText}>Sarah Chen (Eng)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.personaBtn, { backgroundColor: chatbotPersona === 'james' ? '#EA4335' : '#37415140' }]}
                  onPress={() => changePersona('james')}
                >
                  <Text style={styles.personaText}>James Wilson (Legal)</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chat History */}
            <ScrollView style={styles.chatScroll} contentContainerStyle={{ padding: 12 }}>
              {chatHistory.map((msg, idx) => (
                <View key={idx} style={[styles.chatMsg, msg.sender === 'user' ? styles.userMsg : styles.botMsg]}>
                  <Text style={styles.chatMsgText}>{msg.text}</Text>
                </View>
              ))}
              {isChatbotTyping && (
                <View style={[styles.chatMsg, styles.botMsg]}>
                  <ActivityIndicator size="small" color="#7C3AED" />
                </View>
              )}
            </ScrollView>

            {/* Input Row */}
            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask about server endpoints or contract regulations..."
                placeholderTextColor="#6B7280"
                value={chatMessage}
                onChangeText={setChatMessage}
                onSubmitEditing={handleChatSubmit}
              />
              <TouchableOpacity style={styles.btnSendMsg} onPress={handleChatSubmit}>
                <Send size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* NEW HIRE ONBOARDING MODAL */}
      {showAddHireModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Onboard Corporate Hire</Text>
              <TouchableOpacity onPress={() => setShowAddHireModal(false)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Employee Full Name</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. Richard Hendricks"
              placeholderTextColor="#4B5563"
              value={newHireName}
              onChangeText={setNewHireName}
            />

            <Text style={styles.inputLabel}>Corporate Role</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. Staff DevOps Architect"
              placeholderTextColor="#4B5563"
              value={newHireRole}
              onChangeText={setNewHireRole}
            />

            <Text style={styles.inputLabel}>Assigned Mentor</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. Sarah Chen"
              placeholderTextColor="#4B5563"
              value={newHireMentor}
              onChangeText={setNewHireMentor}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#374151' }]} 
                onPress={() => setShowAddHireModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnSave, { backgroundColor: '#3B82F6' }]} 
                onPress={handleAddNewHire}
              >
                <Text style={styles.btnText}>Confirm Hire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* DETAILED CHECKLIST DRAWER overlay */}
      {selectedOnboarding && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>{selectedOnboarding.name}</Text>
                <Text style={styles.modalSubtitle}>{selectedOnboarding.role} checklist</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedOnboarding(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 10 }}>
              {selectedOnboarding.tasks.map((task: any) => (
                <TouchableOpacity 
                  key={task.id} 
                  style={styles.taskCheckcard}
                  onPress={() => toggleOnboardingTask(selectedOnboarding.id, task.id)}
                >
                  <View style={[styles.taskCheckbox, { backgroundColor: task.done ? '#10B981' : '#374151' }]}>
                    {task.done && <Check size={10} color="#FFFFFF" />}
                  </View>
                  <Text style={[styles.taskTextInline, { textDecorationLine: task.done ? 'line-through' : 'none', color: task.done ? '#6B7280' : '#FFFFFF' }]}>
                    {task.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.btnCloseModal, { backgroundColor: '#374151' }]} 
              onPress={() => setSelectedOnboarding(null)}
            >
              <Text style={styles.btnCloseText}>Close Checklist</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* SUCCESSION PLAN GENERATOR OVERLAY */}
      {selectedDepartureRisk && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>AI Departure Audit: {selectedDepartureRisk.name}</Text>
              <TouchableOpacity onPress={() => setSelectedDepartureRisk(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {isGeneratingPlan ? (
              <View style={{ padding: 24, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#7C3AED" />
                <Text style={styles.genStepText}>{generationStep}</Text>
              </View>
            ) : generatedPlan ? (
              <View>
                <View style={styles.planReportHeader}>
                  <Text style={styles.planIncumbent}>Incumbent: {generatedPlan.incumbent}</Text>
                  <Text style={styles.planSuccessor}>Designated Successor: {generatedPlan.successor}</Text>
                  <Text style={styles.planScore}>{generatedPlan.readiness} ready</Text>
                </View>
                
                <Text style={styles.planSectionTitle}>Handoff Activity Items:</Text>
                {generatedPlan.tasks.map((task: string, i: number) => (
                  <View key={i} style={styles.planTaskCard}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={styles.planTaskText}>{task}</Text>
                  </View>
                ))}

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.btnCancel, { backgroundColor: '#374151' }]} 
                    onPress={() => setSelectedDepartureRisk(null)}
                  >
                    <Text style={styles.btnText}>Dismiss</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.btnSave, { backgroundColor: '#10B981' }]} 
                    onPress={approveHandoffPlan}
                  >
                    <Text style={styles.btnText}>Approve Handoff Plan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = {
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#0F172A', gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  statCard: { width: '23.5%', padding: 10, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
  statLabel: { fontSize: 9, color: '#9CA3AF', marginTop: 2, textAlign: 'center' },
  tabsContainer: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontSize: 12, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  runAuditBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F620', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  runAuditText: { fontSize: 11, fontWeight: '600', color: '#3B82F6' },
  seeAll: { fontSize: 12, color: '#3B82F6' },
  onboardingCard: { padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  onboardingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  onboardingInfo: { flex: 1, marginLeft: 12 },
  onboardingName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  onboardingRole: { fontSize: 11, color: '#9CA3AF' },
  onboardingDate: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onboardingDateText: { fontSize: 11, color: '#6B7280' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  progressBar: { flex: 1, height: 6, backgroundColor: '#374151', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 3 },
  progressText: { fontSize: 11, fontWeight: '600', color: '#10B981' },
  mentorText: { fontSize: 11, color: '#6B7280' },
  riskCard: { padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#37415130' },
  riskHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  riskInfo: { flex: 1, marginLeft: 12 },
  riskName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  riskRole: { fontSize: 11, color: '#9CA3AF' },
  riskBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, gap: 4 },
  riskBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  riskDetails: { gap: 6, marginBottom: 12 },
  riskTenure: { fontSize: 11, color: '#6B7280' },
  knowledgeTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  knowledgeTag: { backgroundColor: '#37415140', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  knowledgeTagText: { fontSize: 10, color: '#D1D5DB' },
  btnPlanTrigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 8 },
  btnPlanTriggerText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  resolvedRiskAlert: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#10B98115', paddingVertical: 8, borderRadius: 8 },
  resolvedRiskText: { color: '#10B981', fontSize: 11, fontWeight: '600' },
  successionCard: { padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  successionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  successionRole: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  successionStatus: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, gap: 4 },
  successionStatusText: { fontSize: 10, fontWeight: '600' },
  successionDetails: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  successionPerson: { flex: 1 },
  successionLabel: { fontSize: 9, color: '#6B7280', fontWeight: '600' },
  successionName: { fontSize: 12, color: '#FFFFFF', marginTop: 2, fontWeight: '500' },
  coverageBadge: { alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  coverageLabel: { fontSize: 8, color: '#6B7280', fontWeight: '600' },
  coverageValue: { fontSize: 13, fontWeight: 'bold', color: '#10B981' },
  chatbotCard: { padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#37415140' },
  chatbotHeader: { borderBottomWidth: 1, borderBottomColor: '#37415140', paddingBottom: 10, marginBottom: 10 },
  chatbotHeaderTitle: { fontSize: 12, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 },
  personaButtons: { flexDirection: 'row', gap: 6 },
  personaBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  personaText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },
  chatScroll: { height: 160, backgroundColor: '#0F172A', borderRadius: 8, marginBottom: 10 },
  chatMsg: { padding: 8, borderRadius: 8, maxWidth: '85%', marginBottom: 6 },
  userMsg: { backgroundColor: '#3B82F6', alignSelf: 'flex-end' },
  botMsg: { backgroundColor: '#374151', alignSelf: 'flex-start' },
  chatMsgText: { color: '#FFFFFF', fontSize: 12 },
  chatInputRow: { flexDirection: 'row', gap: 6 },
  chatInput: { flex: 1, backgroundColor: '#0F172A', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, fontSize: 12, borderWidth: 1, borderColor: '#374151' },
  btnSendMsg: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  inputLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginTop: 12, marginBottom: 6 },
  configInput: { backgroundColor: '#0F172A', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 12, borderWidth: 1, borderColor: '#374151' },
  modalActions: { flexDirection: 'row', gap: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415150', paddingTop: 14 },
  btnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnSave: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  taskCheckcard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#0F172A', padding: 12, borderRadius: 8, marginBottom: 6, borderWidth: 1, borderColor: '#37415140' },
  taskCheckbox: { width: 18, height: 18, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  taskTextInline: { fontSize: 12, flex: 1 },
  btnCloseModal: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnCloseText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  genStepText: { color: '#7C3AED', fontSize: 12, fontWeight: '600', marginTop: 12, textAlign: 'center' },
  planReportHeader: { backgroundColor: '#0F172A', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#374151' },
  planIncumbent: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  planSuccessor: { color: '#9CA3AF', fontSize: 11, marginTop: 2 },
  planScore: { color: '#10B981', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  planSectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  planTaskCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0F172A', padding: 10, borderRadius: 6, marginBottom: 6 },
  planTaskText: { color: '#D1D5DB', fontSize: 11, flex: 1 }
};