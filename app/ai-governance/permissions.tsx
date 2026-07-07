/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Lock, Users, Shield, Key, Eye, AlertTriangle, CheckCircle, 
  ArrowLeft, ChevronRight, UserCog, Database, Brain, Zap,
  Settings, GitBranch, Network, Activity, Crown, Grid,
  RefreshCw, UserCheck, Link2, Layers, ShieldCheck, Ban, LockOpen
} from 'lucide-react-native';

interface Role {
  id: string;
  name: string;
  users: number;
  permissions: number;
  lastModified: string;
}

interface Permission {
  id: string;
  resource: string;
  action: string;
  level: 'read' | 'write' | 'admin' | 'none';
}

interface AccessRequest {
  id: string;
  user: string;
  resource: string;
  requested: string;
  status: 'pending' | 'approved' | 'denied';
}

const roles: Role[] = [
  { id: '1', name: 'AI Administrator', users: 5, permissions: 42, lastModified: '2024-01-18' },
  { id: '2', name: 'Model Developer', users: 24, permissions: 28, lastModified: '2024-01-15' },
  { id: '3', name: 'Data Scientist', users: 18, permissions: 22, lastModified: '2024-01-12' },
  { id: '4', name: 'Compliance Officer', users: 8, permissions: 35, lastModified: '2024-01-10' },
  { id: '5', name: 'Auditor', users: 12, permissions: 18, lastModified: '2024-01-08' },
];

const accessRequests: AccessRequest[] = [
  { id: '1', user: 'John Smith', resource: 'GPT-4-Turbo Model', requested: '2024-01-20', status: 'pending' },
  { id: '2', user: 'Sarah Johnson', resource: 'Customer Data Lake', requested: '2024-01-19', status: 'pending' },
  { id: '3', user: 'Mike Chen', resource: 'Policy Engine Config', requested: '2024-01-18', status: 'approved' },
  { id: '4', user: 'Emily Davis', resource: 'Audit Logs Export', requested: '2024-01-17', status: 'denied' },
];

const permissionMatrix = [
  { resource: 'Model Registry', admin: 5, write: 12, read: 42 },
  { resource: 'Training Data', admin: 3, write: 18, read: 35 },
  { resource: 'Policy Engine', admin: 4, write: 8, read: 24 },
  { resource: 'Audit Logs', admin: 6, write: 10, read: 38 },
  { resource: 'Model Deployment', admin: 2, write: 6, read: 15 },
];

const permissionDependencies = [
  { id: '1', permission: 'Model Deployment', dependsOn: ['Model Registry', 'Policy Engine'], status: 'valid' },
  { id: '2', permission: 'Training Data Access', dependsOn: ['Data Governance'], status: 'valid' },
  { id: '3', permission: 'Audit Log Export', dependsOn: ['Audit Logs'], status: 'valid' },
  { id: '4', permission: 'Policy Configuration', dependsOn: ['Policy Engine', 'Model Registry'], status: 'warning' },
];

const leastPrivilegeEnforcement = [
  { id: '1', user: 'John Smith', role: 'Model Developer', violations: 2, lastReview: '2 days ago' },
  { id: '2', user: 'Sarah Johnson', role: 'Data Scientist', violations: 0, lastReview: '1 day ago' },
  { id: '3', user: 'Mike Chen', role: 'AI Administrator', violations: 5, lastReview: '3 days ago' },
  { id: '4', user: 'Emily Davis', role: 'Compliance Officer', violations: 1, lastReview: '5 days ago' },
];

const accessControlPolicies = [
  { id: '1', policy: 'Zero Trust Architecture', status: 'active', coverage: '98%' },
  { id: '2', policy: 'Principle of Least Privilege', status: 'active', coverage: '95%' },
  { id: '3', policy: 'Separation of Duties', status: 'active', coverage: '92%' },
  { id: '4', policy: 'Just-in-Time Access', status: 'enforcing', coverage: '88%' },
];

export default function PermissionsScreen() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'denied': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return '#ef4444';
      case 'write': return '#f59e0b';
      case 'read': return '#06b6d4';
      default: return '#9ca3af';
    }
  };

  const RoleCard = ({ role }: { role: Role }) => (
    <TouchableOpacity 
      style={[styles.roleCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}
      onPress={() => setSelectedRole(role)}
    >
      <View style={styles.roleHeader}>
        <View style={[styles.roleIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <UserCog size={24} color="#06b6d4" />
        </View>
        <View style={styles.roleInfo}>
          <Text style={[styles.roleName, { color: '#f9fafb' }]}>{role.name}</Text>
          <Text style={[styles.roleMeta, { color: '#9ca3af' }]}>
            {role.users} users • {role.permissions} permissions
          </Text>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
      <View style={styles.roleFooter}>
        <Text style={[styles.roleModified, { color: '#6b7280' }]}>Modified: {role.lastModified}</Text>
      </View>
    </TouchableOpacity>
  );

  const AccessRequestCard = ({ request }: { request: AccessRequest }) => (
    <View style={[styles.requestCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderLeftWidth: 3, borderLeftColor: getStatusColor(request.status) }]}>
      <View style={styles.requestHeader}>
        <View style={[styles.requestIcon, { backgroundColor: `${getStatusColor(request.status)}20` }]}>
          <Key size={20} color={getStatusColor(request.status)} />
        </View>
        <View style={styles.requestInfo}>
          <Text style={[styles.requestUser, { color: '#f9fafb' }]}>{request.user}</Text>
          <Text style={[styles.requestResource, { color: '#9ca3af' }]}>{request.resource}</Text>
        </View>
        <View style={[styles.requestStatus, { backgroundColor: `${getStatusColor(request.status)}20` }]}>
          <Text style={[styles.requestStatusText, { color: getStatusColor(request.status) }]}>{request.status}</Text>
        </View>
      </View>
      <Text style={[styles.requestDate, { color: '#6b7280' }]}>Requested: {request.requested}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#f9fafb" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Permissions & Access</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Role-Based Access Control Dashboard</Text>
          </View>
        </View>

        {/* Executive Governance Layer */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Executive Governance Layer</Text>
          <View style={[styles.executiveContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.executiveHeader}>
              <View style={styles.executiveProfile}>
                <View style={[styles.executiveAvatar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Crown size={28} color="#06b6d4" />
                </View>
                <View style={styles.executiveInfo}>
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Access Control Governance</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Role-Based Access Matrix</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>SECURED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>67</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Total Users</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>145</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Permissions</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>5</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Roles</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>2</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Role-Based Access Matrix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Role-Based Access Matrix</Text>
          <View style={[styles.matrixContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.matrixHeader}>
              <View style={styles.matrixHeaderCell}>
                <Text style={[styles.matrixHeaderText, { color: '#9ca3af' }]}>Resource</Text>
              </View>
              <View style={styles.matrixHeaderCell}>
                <Text style={[styles.matrixHeaderText, { color: '#9ca3af' }]}>Admin</Text>
              </View>
              <View style={styles.matrixHeaderCell}>
                <Text style={[styles.matrixHeaderText, { color: '#9ca3af' }]}>Dev</Text>
              </View>
              <View style={styles.matrixHeaderCell}>
                <Text style={[styles.matrixHeaderText, { color: '#9ca3af' }]}>Data</Text>
              </View>
              <View style={styles.matrixHeaderCell}>
                <Text style={[styles.matrixHeaderText, { color: '#9ca3af' }]}>Audit</Text>
              </View>
            </View>
            <View style={styles.matrixRow}>
              <View style={styles.matrixCell}>
                <Text style={[styles.matrixCellText, { color: '#f9fafb' }]}>Model Registry</Text>
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <CheckCircle size={16} color="#10b981" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <CheckCircle size={16} color="#f59e0b" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <CheckCircle size={16} color="#06b6d4" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <CheckCircle size={16} color="#06b6d4" />
              </View>
            </View>
            <View style={styles.matrixRow}>
              <View style={styles.matrixCell}>
                <Text style={[styles.matrixCellText, { color: '#f9fafb' }]}>Policy Engine</Text>
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <CheckCircle size={16} color="#10b981" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(156, 163, 175, 0.2)' }]}>
                <Text style={[styles.matrixCellText, { color: '#9ca3af' }]}>-</Text>
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(156, 163, 175, 0.2)' }]}>
                <Text style={[styles.matrixCellText, { color: '#9ca3af' }]}>-</Text>
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <CheckCircle size={16} color="#06b6d4" />
              </View>
            </View>
            <View style={styles.matrixRow}>
              <View style={styles.matrixCell}>
                <Text style={[styles.matrixCellText, { color: '#f9fafb' }]}>Data Lake</Text>
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <CheckCircle size={16} color="#10b981" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <CheckCircle size={16} color="#06b6d4" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <CheckCircle size={16} color="#f59e0b" />
              </View>
              <View style={[styles.matrixCell, { backgroundColor: 'rgba(156, 163, 175, 0.2)' }]}>
                <Text style={[styles.matrixCellText, { color: '#9ca3af' }]}>-</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Access Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Access Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Users size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>67</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Total Users</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Shield size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>145</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Permissions</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>2</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Pending Requests</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Roles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>User Roles</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Add Role</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rolesGrid}>
            {roles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </View>
        </View>

        {/* Permission Matrix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Permission Matrix</Text>
          <View style={[styles.matrixContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.matrixHeader}>
              <Text style={[styles.matrixHeaderLabel, { color: '#9ca3af' }]}>Resource</Text>
              <Text style={[styles.matrixHeaderLabel, { color: '#ef4444' }]}>Admin</Text>
              <Text style={[styles.matrixHeaderLabel, { color: '#f59e0b' }]}>Write</Text>
              <Text style={[styles.matrixHeaderLabel, { color: '#06b6d4' }]}>Read</Text>
            </View>
            {permissionMatrix.map((item, index) => (
              <View key={index} style={styles.matrixRow}>
                <View style={styles.matrixResource}>
                  <Database size={16} color="#06b6d4" />
                  <Text style={[styles.matrixResourceText, { color: '#f9fafb' }]}>{item.resource}</Text>
                </View>
                <View style={[styles.matrixCell, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                  <Text style={[styles.matrixCellText, { color: '#ef4444' }]}>{item.admin}</Text>
                </View>
                <View style={[styles.matrixCell, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <Text style={[styles.matrixCellText, { color: '#f59e0b' }]}>{item.write}</Text>
                </View>
                <View style={[styles.matrixCell, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Text style={[styles.matrixCellText, { color: '#06b6d4' }]}>{item.read}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Access Requests */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Access Requests</Text>
          <View style={styles.requestsGrid}>
            {accessRequests.map(request => (
              <AccessRequestCard key={request.id} request={request} />
            ))}
          </View>
        </View>

        {/* Least Privilege Enforcement */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Least Privilege Enforcement</Text>
          <View style={[styles.privilegeContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.privilegeItem}>
              <View style={[styles.privilegeIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <CheckCircle size={24} color="#10b981" />
              </View>
              <View style={styles.privilegeInfo}>
                <Text style={[styles.privilegeTitle, { color: '#f9fafb' }]}>Principle of Least Privilege</Text>
                <Text style={[styles.privilegeStatus, { color: '#10b981' }]}>Enforced across all systems</Text>
              </View>
            </View>
            <View style={styles.privilegeItem}>
              <View style={[styles.privilegeIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Eye size={24} color="#06b6d4" />
              </View>
              <View style={styles.privilegeInfo}>
                <Text style={[styles.privilegeTitle, { color: '#f9fafb' }]}>Access Review Cycle</Text>
                <Text style={[styles.privilegeStatus, { color: '#06b6d4' }]}>Quarterly automated reviews</Text>
              </View>
            </View>
            <View style={styles.privilegeItem}>
              <View style={[styles.privilegeIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <AlertTriangle size={24} color="#f59e0b" />
              </View>
              <View style={styles.privilegeInfo}>
                <Text style={[styles.privilegeTitle, { color: '#f9fafb' }]}>Privilege Escalation Alerts</Text>
                <Text style={[styles.privilegeStatus, { color: '#f59e0b' }]}>3 alerts this month</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Permission Dependency Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Permission Dependencies</Text>
          <View style={[styles.dependencyContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.dependencyNode}>
              <View style={[styles.dependencyDot, { backgroundColor: '#ef4444' }]} />
              <Text style={[styles.dependencyLabel, { color: '#f9fafb' }]}>Admin Access</Text>
            </View>
            <View style={[styles.dependencyLine, { backgroundColor: '#ef4444' }]} />
            <View style={styles.dependencyNode}>
              <View style={[styles.dependencyDot, { backgroundColor: '#f59e0b' }]} />
              <Text style={[styles.dependencyLabel, { color: '#f9fafb' }]}>Write Access</Text>
            </View>
            <View style={[styles.dependencyLine, { backgroundColor: '#f59e0b' }]} />
            <View style={styles.dependencyNode}>
              <View style={[styles.dependencyDot, { backgroundColor: '#06b6d4' }]} />
              <Text style={[styles.dependencyLabel, { color: '#f9fafb' }]}>Read Access</Text>
            </View>
          </View>
        </View>

        {/* Advanced Permission Dependencies */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Advanced Permission Dependencies</Text>
          <View style={[styles.advancedDependencyContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {permissionDependencies.map(dep => (
              <View key={dep.id} style={[styles.dependencyRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.dependencyRowInfo}>
                  <View style={[styles.dependencyRowIcon, { backgroundColor: dep.status === 'valid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Link2 size={16} color={dep.status === 'valid' ? '#10b981' : '#f59e0b'} />
                  </View>
                  <View style={styles.dependencyRowDetails}>
                    <Text style={[styles.dependencyRowPermission, { color: '#f9fafb' }]}>{dep.permission}</Text>
                    <Text style={[styles.dependencyRowDepends, { color: '#9ca3af' }]}>Depends on: {dep.dependsOn.join(', ')}</Text>
                  </View>
                </View>
                <View style={[styles.dependencyRowStatus, { backgroundColor: dep.status === 'valid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                  <ShieldCheck size={14} color={dep.status === 'valid' ? '#10b981' : '#f59e0b'} />
                  <Text style={[styles.dependencyRowStatusText, { color: dep.status === 'valid' ? '#10b981' : '#f59e0b' }]}>{dep.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Least Privilege Enforcement Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Least Privilege Enforcement Dashboard</Text>
          <View style={[styles.enforcementContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {leastPrivilegeEnforcement.map(item => (
              <View key={item.id} style={[styles.enforcementRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.enforcementUserInfo}>
                  <View style={[styles.enforcementUserIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <UserCheck size={18} color="#06b6d4" />
                  </View>
                  <View style={styles.enforcementUserDetails}>
                    <Text style={[styles.enforcementUserName, { color: '#f9fafb' }]}>{item.user}</Text>
                    <Text style={[styles.enforcementUserRole, { color: '#9ca3af' }]}>{item.role}</Text>
                  </View>
                </View>
                <View style={styles.enforcementMetrics}>
                  <View style={styles.enforcementMetric}>
                    <Layers size={14} color={item.violations === 0 ? '#10b981' : '#f59e0b'} />
                    <Text style={[styles.enforcementMetricLabel, { color: '#9ca3af' }]}>Violations</Text>
                    <Text style={[styles.enforcementMetricValue, { color: item.violations === 0 ? '#10b981' : '#f59e0b' }]}>{item.violations}</Text>
                  </View>
                  <View style={styles.enforcementMetric}>
                    <RefreshCw size={14} color="#9ca3af" />
                    <Text style={[styles.enforcementMetricLabel, { color: '#9ca3af' }]}>Last Review</Text>
                    <Text style={[styles.enforcementMetricValue, { color: '#f9fafb' }]}>{item.lastReview}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Access Control Policies */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Access Control Policies</Text>
          <View style={[styles.policiesContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {accessControlPolicies.map(policy => (
              <View key={policy.id} style={[styles.policyRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.policyInfo}>
                  <View style={[styles.policyIcon, { backgroundColor: policy.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)' }]}>
                    {policy.status === 'active' ? <ShieldCheck size={18} color="#10b981" /> : <LockOpen size={18} color="#06b6d4" />}
                  </View>
                  <View style={styles.policyDetails}>
                    <Text style={[styles.policyName, { color: '#f9fafb' }]}>{policy.policy}</Text>
                    <View style={[styles.policyStatus, { backgroundColor: policy.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)' }]}>
                      <Text style={[styles.policyStatusText, { color: policy.status === 'active' ? '#10b981' : '#06b6d4' }]}>{policy.status}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.policyCoverage}>
                  <Text style={[styles.policyCoverageLabel, { color: '#9ca3af' }]}>Coverage</Text>
                  <Text style={[styles.policyCoverageValue, { color: '#06b6d4' }]}>{policy.coverage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  executiveContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  executiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  executiveProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  executiveAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  executiveInfo: {
    flex: 1,
  },
  executiveName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  executiveRole: {
    fontSize: 12,
    fontWeight: '500',
  },
  executiveBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  executiveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  executiveMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  executiveMetric: {
    alignItems: 'center',
    flex: 1,
  },
  executiveMetricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  executiveMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  overviewContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    alignItems: 'center',
    flex: 1,
  },
  overviewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  rolesGrid: {
    gap: 12,
  },
  roleCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  roleMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  roleFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  roleModified: {
    fontSize: 12,
    fontWeight: '400',
  },
  matrixContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  matrixHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  matrixHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  matrixHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  matrixHeaderLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  matrixRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  matrixResource: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matrixResourceText: {
    fontSize: 13,
    fontWeight: '500',
  },
  matrixCell: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixCellText: {
    fontSize: 12,
    fontWeight: '500',
  },
  requestsGrid: {
    gap: 12,
  },
  requestCard: {
    padding: 16,
    borderRadius: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  requestInfo: {
    flex: 1,
  },
  requestUser: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  requestResource: {
    fontSize: 12,
    fontWeight: '400',
  },
  requestStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  requestStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  requestDate: {
    fontSize: 11,
    fontWeight: '400',
  },
  privilegeContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  privilegeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  privilegeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  privilegeInfo: {
    flex: 1,
  },
  privilegeTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  privilegeStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  dependencyContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dependencyNode: {
    alignItems: 'center',
    gap: 8,
  },
  dependencyDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dependencyLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  dependencyLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  advancedDependencyContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  dependencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dependencyRowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  dependencyRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dependencyRowDetails: {
    flex: 1,
  },
  dependencyRowPermission: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  dependencyRowDepends: {
    fontSize: 12,
    fontWeight: '500',
  },
  dependencyRowStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dependencyRowStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  enforcementContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  enforcementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  enforcementUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  enforcementUserIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enforcementUserDetails: {
    flex: 1,
  },
  enforcementUserName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  enforcementUserRole: {
    fontSize: 12,
    fontWeight: '500',
  },
  enforcementMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  enforcementMetric: {
    alignItems: 'center',
    gap: 6,
  },
  enforcementMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  enforcementMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  policiesContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  policyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  policyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyDetails: {
    flex: 1,
  },
  policyName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  policyStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  policyStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  policyCoverage: {
    alignItems: 'flex-end',
  },
  policyCoverageLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  policyCoverageValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
