import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, useSafeAreaInsets, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users, Briefcase, Target, Shield, Plus, Search, MoreHorizontal, FileText, MessageSquare, Clock, UserPlus, Settings, ChevronRight, Folder, Lock, Globe, Bot, X, CheckCircle } from 'lucide-react-native';

export default function TeamSpacesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Core Space States
  const [departments, setDepartments] = useState([
    { id: 'engineering', name: 'Engineering', color: '#3B82F6', members: 45, nodes: 456, privacy: 'private', desc: 'Central core infrastructure blueprints, server scaling specs, and repos.' },
    { id: 'sales', name: 'Sales', color: '#10B981', members: 28, nodes: 234, privacy: 'private', desc: 'Enterprise negotiations playbook, pricing sheets, and CRM pipelines.' },
    { id: 'product', name: 'Product', color: '#7C3AED', members: 15, nodes: 189, privacy: 'private', desc: 'PRD specifications, launch timeline roadmaps, and stakeholder context.' },
    { id: 'marketing', name: 'Marketing', color: '#F59E0B', members: 18, nodes: 145, privacy: 'public', desc: 'Social campaign briefs, performance insights, and brand assets.' },
    { id: 'hr', name: 'Human Resources', color: '#EC4899', members: 8, nodes: 98, privacy: 'private', desc: 'Onboarding guides, mentor logs, and compliance check frameworks.' },
    { id: 'operations', name: 'Operations', color: '#06B6D4', members: 12, nodes: 123, privacy: 'private', desc: 'Refund rules, customer success blueprints, and sync parameters.' }
  ]);

  const [projects, setProjects] = useState([
    { id: 'proj1', name: 'AWS Migration', dept: 'Engineering', members: 12, nodes: 89, updated: '2h ago' },
    { id: 'proj2', name: 'Q4 Product Launch', dept: 'Product', members: 8, nodes: 67, updated: '5h ago' },
    { id: 'proj3', name: 'Enterprise Sales Playbook', dept: 'Sales', members: 15, nodes: 45, updated: '1d ago' },
    { id: 'proj4', name: 'Security Audit 2026', dept: 'Operations', members: 6, nodes: 34, updated: '3h ago' }
  ]);

  const [clients, setClients] = useState([
    { id: 'cli1', name: 'Acme Corp', industry: 'Technology', contacts: 8, nodes: 56, lastContact: '2h ago' },
    { id: 'cli2', name: 'Global Bank', industry: 'Finance', contacts: 12, nodes: 89, lastContact: '1d ago' },
    { id: 'cli3', name: 'HealthPlus', industry: 'Healthcare', contacts: 5, nodes: 34, lastContact: '3d ago' }
  ]);

  const [companyWide, setCompanyWide] = useState([
    { name: 'Company Policies', type: 'Company-wide', nodes: 234, contributors: 15 },
    { name: 'Onboarding Guide', type: 'Company-wide', nodes: 156, contributors: 8 },
    { name: 'Brand Guidelines', type: 'Company-wide', nodes: 78, contributors: 4 },
    { name: 'IT & Security', type: 'Cross-functional', nodes: 123, contributors: 6 }
  ]);

  // Modal States
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const [spaceType, setSpaceType] = useState<'dept' | 'project' | 'client'>('project');
  const [spacePrivacy, setSpacePrivacy] = useState(true); // true = private, false = public
  const [spaceDeptName, setSpaceDeptName] = useState('Engineering');
  const [spaceMembersCount, setSpaceMembersCount] = useState('6');

  // Space Inspector drawer
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [spaceEnableSync, setSpaceEnableSync] = useState(true);
  const [spaceEnablePublic, setSpaceEnablePublic] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Confirm space creation
  const handleCreateSpace = () => {
    if (!spaceName.trim()) return;

    if (spaceType === 'dept') {
      const newDept = {
        id: Date.now().toString(),
        name: spaceName,
        color: '#7C3AED',
        members: parseInt(spaceMembersCount) || 1,
        nodes: 12,
        privacy: spacePrivacy ? 'private' : 'public',
        desc: `Custom space mapping regarding ${spaceName} processes.`
      };
      setDepartments([...departments, newDept]);
    } else if (spaceType === 'project') {
      const newProj = {
        id: Date.now().toString(),
        name: spaceName,
        dept: spaceDeptName,
        members: parseInt(spaceMembersCount) || 1,
        nodes: 0,
        updated: 'Just now'
      };
      setProjects([newProj, ...projects]);
    } else {
      const newCli = {
        id: Date.now().toString(),
        name: spaceName,
        industry: spaceDeptName || 'Enterprise',
        contacts: parseInt(spaceMembersCount) || 1,
        nodes: 0,
        lastContact: 'Just now'
      };
      setClients([newCli, ...clients]);
    }

    // Reset Form
    setShowAddSpaceModal(false);
    setSpaceName('');
    setSpaceMembersCount('6');
  };

  // Trigger inspector deep-dive
  const openInspector = (space: any, typeLabel: string) => {
    setSelectedSpace({ ...space, typeLabel });
    setSpaceEnableSync(true);
    setSpaceEnablePublic(space.privacy === 'public');
  };

  const filteredDepts = departments.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredProjs = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredClis = clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Team Spaces</Text>
          <Text style={styles.headerSubtitle}>Department, project, and client-specific folders</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddSpaceModal(true)}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Users size={18} color="#3B82F6" />
            <Text style={styles.statValue}>{departments.length}</Text>
            <Text style={styles.statLabel}>Departments</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Briefcase size={18} color="#7C3AED" />
            <Text style={styles.statValue}>{projects.length}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Target size={18} color="#10B981" />
            <Text style={styles.statValue}>{clients.length}</Text>
            <Text style={styles.statLabel}>Client Hubs</Text>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: '#1E293B' }]}>
          <Search size={18} color="#6B7280" />
          <TextInput
            style={styles.searchField}
            placeholder="Search spaces (e.g. Engineering, Acme)..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Department Spaces */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Department Spaces ({filteredDepts.length})</Text>
            <TouchableOpacity onPress={() => setShowAddSpaceModal(true)}>
              <Text style={styles.seeAll}>Add Dept</Text>
            </TouchableOpacity>
          </View>
          {filteredDepts.map((dept) => (
            <TouchableOpacity 
              key={dept.id} 
              style={[styles.spaceCard, { backgroundColor: '#1E293B' }]}
              onPress={() => openInspector(dept, 'Department')}
            >
              <View style={[styles.spaceIcon, { backgroundColor: dept.color + '20' }]}>
                <Users size={22} color={dept.color} />
              </View>
              <View style={styles.spaceInfo}>
                <View style={styles.spaceNameRow}>
                  <Text style={styles.spaceName}>{dept.name}</Text>
                  {dept.privacy === 'private' ? (
                    <Lock size={11} color="#6B7280" />
                  ) : (
                    <Globe size={11} color="#10B981" />
                  )}
                </View>
                <View style={styles.spaceMeta}>
                  <View style={styles.spaceMetaItem}>
                    <Users size={11} color="#6B7280" />
                    <Text style={styles.spaceMetaText}>{dept.members} members</Text>
                  </View>
                  <View style={styles.spaceMetaItem}>
                    <FileText size={11} color="#6B7280" />
                    <Text style={styles.spaceMetaText}>{dept.nodes} nodes</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={16} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Project Spaces */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Project Spaces ({filteredProjs.length})</Text>
            <TouchableOpacity onPress={() => setShowAddSpaceModal(true)}>
              <Text style={styles.seeAll}>Add Project</Text>
            </TouchableOpacity>
          </View>
          {filteredProjs.map((project) => (
            <TouchableOpacity 
              key={project.id} 
              style={[styles.projectCard, { backgroundColor: '#1E293B' }]}
              onPress={() => openInspector(project, 'Project')}
            >
              <View style={[styles.projectIcon, { backgroundColor: '#7C3AED20' }]}>
                <Briefcase size={18} color="#7C3AED" />
              </View>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDept}>{project.dept}</Text>
              </View>
              <View style={styles.projectStats}>
                <Text style={styles.projectNodes}>{project.nodes} nodes</Text>
                <Text style={styles.projectTime}>{project.updated}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Client Knowledge Hubs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Client Hubs ({filteredClis.length})</Text>
            <TouchableOpacity onPress={() => setShowAddSpaceModal(true)}>
              <Text style={styles.seeAll}>Add Client</Text>
            </TouchableOpacity>
          </View>
          {filteredClis.map((client) => (
            <TouchableOpacity 
              key={client.id} 
              style={[styles.clientCard, { backgroundColor: '#1E293B' }]}
              onPress={() => openInspector(client, 'Client')}
            >
              <View style={[styles.clientIcon, { backgroundColor: '#10B98120' }]}>
                <Target size={18} color="#10B981" />
              </View>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientIndustry}>{client.industry}</Text>
              </View>
              <View style={styles.clientStats}>
                <Text style={styles.clientContacts}>{client.contacts} contacts</Text>
                <Text style={styles.clientTime}>{client.lastContact}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Shared Company Spaces */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company-Wide Shared Spaces</Text>
          {companyWide.map((space, index) => (
            <TouchableOpacity key={index} style={[styles.sharedCard, { backgroundColor: '#1E293B' }]} onPress={() => openInspector(space, 'Shared')}>
              <View style={[styles.sharedIcon, { backgroundColor: '#3B82F620' }]}>
                <Globe size={18} color="#3B82F6" />
              </View>
              <View style={styles.sharedInfo}>
                <Text style={styles.sharedName}>{space.name}</Text>
                <Text style={styles.sharedType}>{space.type}</Text>
              </View>
              <View style={styles.sharedStats}>
                <Text style={styles.sharedNodes}>{space.nodes} nodes</Text>
                <Text style={styles.sharedContributors}>{space.contributors} authors</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create New Space Toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Launch Space Wizards</Text>
          <View style={styles.createGrid}>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]} onPress={() => { setSpaceType('dept'); setShowAddSpaceModal(true); }}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.createText}>Dept Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]} onPress={() => { setSpaceType('project'); setShowAddSpaceModal(true); }}>
              <Briefcase size={24} color="#7C3AED" />
              <Text style={styles.createText}>Project Space</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]} onPress={() => { setSpaceType('client'); setShowAddSpaceModal(true); }}>
              <Target size={24} color="#10B981" />
              <Text style={styles.createText}>Client Hub</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.createCard, { backgroundColor: '#1E293B' }]} onPress={() => { setSpaceType('project'); setShowAddSpaceModal(true); }}>
              <Shield size={24} color="#F59E0B" />
              <Text style={styles.createText}>Cross-Group</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Team Spaces AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autonomous Space Managers</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Space Manager', color: '#3B82F6' },
              { name: 'Access Controller', color: '#7C3AED' },
              { name: 'Sync Coordinator', color: '#10B981' },
              { name: 'Content Router', color: '#F59E0B' },
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '15' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* CREATE SPACE MODAL */}
      {showAddSpaceModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {spaceType === 'dept' ? 'New Department Space' : spaceType === 'project' ? 'New Project Folder' : 'New Client Hub'}
              </Text>
              <TouchableOpacity onPress={() => setShowAddSpaceModal(false)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Space Designation Name</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. SaaS Billings, Frontend engineering..."
              placeholderTextColor="#4B5563"
              value={spaceName}
              onChangeText={setSpaceName}
            />

            <Text style={styles.inputLabel}>
              {spaceType === 'dept' ? 'Associated Division' : spaceType === 'project' ? 'Parent Department' : 'Industry sector'}
            </Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. Engineering, Sales, Healthcare"
              placeholderTextColor="#4B5563"
              value={spaceDeptName}
              onChangeText={setSpaceDeptName}
            />

            <Text style={styles.inputLabel}>Active Contributors Count</Text>
            <TextInput
              style={styles.configInput}
              placeholder="e.g. 12"
              placeholderTextColor="#4B5563"
              value={spaceMembersCount}
              onChangeText={setSpaceMembersCount}
              keyboardType="numeric"
            />

            <View style={styles.configFieldRow}>
              <Text style={styles.configLabel}>Restrict Private Access</Text>
              <Switch 
                value={spacePrivacy} 
                onValueChange={setSpacePrivacy}
                trackColor={{ false: '#374151', true: '#3B82F6' }}
                thumbColor={spacePrivacy ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.btnCancel, { backgroundColor: '#374151' }]} 
                onPress={() => setShowAddSpaceModal(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnSave, { backgroundColor: '#3B82F6' }]} 
                onPress={handleCreateSpace}
              >
                <Text style={styles.btnText}>Confirm Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* SPACE INSPECTOR DRAWER overlay */}
      {selectedSpace && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{selectedSpace.name}</Text>
                <Text style={styles.modalSubtitle}>{selectedSpace.typeLabel} Folder Profile</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedSpace(null)}>
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.descInline}>{selectedSpace.desc || 'Comprehensive institutional folder mapping resources, SOP nodes, and communication threads.'}</Text>

            <View style={styles.configFieldRow}>
              <Text style={styles.configLabel}>Auto-sync Slack/Docs</Text>
              <Switch 
                value={spaceEnableSync} 
                onValueChange={setSpaceEnableSync}
                trackColor={{ false: '#374151', true: '#10B981' }}
              />
            </View>

            <View style={styles.configFieldRow}>
              <Text style={styles.configLabel}>Public Company-Wide Access</Text>
              <Switch 
                value={spaceEnablePublic} 
                onValueChange={setSpaceEnablePublic}
                trackColor={{ false: '#374151', true: '#3B82F6' }}
              />
            </View>

            <View style={styles.detailsRowBox}>
              <Text style={styles.detailsTitle}>Routing AI agent settings:</Text>
              <View style={styles.aiSettingCard}>
                <Bot size={16} color="#7C3AED" />
                <Text style={styles.aiSettingText}>Dedicated Space Manager connected</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btnCloseModal, { backgroundColor: '#374151' }]} 
              onPress={() => setSelectedSpace(null)}
            >
              <Text style={styles.btnCloseText}>Apply & Close Inspector</Text>
            </TouchableOpacity>
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
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3B82F620', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
  statLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, marginBottom: 20, gap: 10 },
  searchField: { flex: 1, color: '#FFFFFF', fontSize: 13 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  seeAll: { fontSize: 12, color: '#3B82F6', fontWeight: '600' },
  spaceCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#37415130' },
  spaceIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  spaceInfo: { flex: 1, marginLeft: 12 },
  spaceNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  spaceName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  spaceMeta: { flexDirection: 'row', gap: 14, marginTop: 4 },
  spaceMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  spaceMetaText: { fontSize: 11, color: '#6B7280' },
  projectCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6, borderWidth: 1, borderColor: '#37415130' },
  projectIcon: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  projectInfo: { flex: 1, marginLeft: 12 },
  projectName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  projectDept: { fontSize: 11, color: '#9CA3AF' },
  projectStats: { alignItems: 'flex-end' },
  projectNodes: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
  projectTime: { fontSize: 10, color: '#6B7280', marginTop: 2 },
  clientCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6, borderWidth: 1, borderColor: '#37415130' },
  clientIcon: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  clientInfo: { flex: 1, marginLeft: 12 },
  clientName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  clientIndustry: { fontSize: 11, color: '#9CA3AF' },
  clientStats: { alignItems: 'flex-end' },
  clientContacts: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
  clientTime: { fontSize: 10, color: '#6B7280', marginTop: 2 },
  sharedCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 6, borderWidth: 1, borderColor: '#37415130' },
  sharedIcon: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sharedInfo: { flex: 1, marginLeft: 12 },
  sharedName: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  sharedType: { fontSize: 11, color: '#9CA3AF' },
  sharedStats: { alignItems: 'flex-end' },
  sharedNodes: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
  sharedContributors: { fontSize: 10, color: '#6B7280', marginTop: 2 },
  createGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  createCard: { width: '48%', padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#37415130' },
  createText: { fontSize: 12, color: '#FFFFFF', marginTop: 8, textAlign: 'center', fontWeight: '600' },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '600' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  inputLabel: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginTop: 12, marginBottom: 6 },
  configInput: { backgroundColor: '#0F172A', color: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, fontSize: 12, borderWidth: 1, borderColor: '#374151' },
  configFieldRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, marginBottom: 6 },
  configLabel: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  modalActions: { flexDirection: 'row', gap: 8, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415150', paddingTop: 14 },
  btnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnSave: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  descInline: { fontSize: 12, color: '#9CA3AF', lineHeight: 16, marginBottom: 12 },
  detailsRowBox: { marginTop: 14, borderTopWidth: 1, borderTopColor: '#37415140', paddingTop: 12 },
  detailsTitle: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 },
  aiSettingCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0F172A', padding: 10, borderRadius: 8 },
  aiSettingText: { fontSize: 11, color: '#FFFFFF', fontWeight: '500' },
  btnCloseModal: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnCloseText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' }
};