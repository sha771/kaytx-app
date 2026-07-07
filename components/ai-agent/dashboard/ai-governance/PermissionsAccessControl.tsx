import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, User, Lock, Key, Eye, AlertTriangle, CheckCircle, Users, Database, Zap, FileText, Settings, GitBranch, Activity } from 'lucide-react-native';

interface Permission {
  id: string;
  name: string;
  type: 'user' | 'agent' | 'data' | 'model' | 'execution';
  scope: string;
  accessLevel: 'read' | 'write' | 'admin' | 'execute';
  status: 'active' | 'pending' | 'revoked';
  lastUsed: string;
  dependencies: string[];
}

interface PermissionsAccessControlProps {
  permissions: Permission[];
}

export default function PermissionsAccessControl({ permissions }: PermissionsAccessControlProps) {
  const { theme } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return '#06B6D4';
      case 'agent': return '#8B5CF6';
      case 'data': return '#10B981';
      case 'model': return '#F59E0B';
      case 'execution': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeBackground = (type: string) => {
    const color = getTypeColor(type);
    return color + '15';
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'read': return '#10B981';
      case 'write': return '#F59E0B';
      case 'admin': return '#EF4444';
      case 'execute': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'revoked': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const typeIcon = {
    user: User,
    agent: Zap,
    data: Database,
    model: FileText,
    execution: Activity,
  };

  const roleBasedAccessMatrix = [
    { role: 'CAIO', users: 5, permissions: 128, color: '#EF4444' },
    { role: 'AI Engineer', users: 42, permissions: 89, color: '#F59E0B' },
    { role: 'Data Scientist', users: 28, permissions: 64, color: '#8B5CF6' },
    { role: 'Compliance Officer', users: 15, permissions: 45, color: '#10B981' },
    { role: 'Auditor', users: 8, permissions: 32, color: '#06B6D4' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Permissions & Access Control
        </Text>
      </View>

      {/* Role-Based Access Matrix */}
      <View style={[styles.matrixSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.matrixHeader}>
          <Users size={18} color="#06B6D4" />
          <Text style={[styles.matrixTitle, { color: theme.colors.text }]}>
            Role-Based Access Matrix
          </Text>
        </View>
        <View style={styles.matrixGrid}>
          {roleBasedAccessMatrix.map((role) => (
            <View key={role.role} style={styles.matrixCard}>
              <View style={[styles.roleBadge, { backgroundColor: role.color + '20' }]}>
                <Text style={[styles.roleText, { color: role.color }]}>
                  {role.role}
                </Text>
              </View>
              <View style={styles.roleStats}>
                <View style={styles.roleStat}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Users
                  </Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {role.users}
                  </Text>
                </View>
                <View style={styles.roleStat}>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Permissions
                  </Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {role.permissions}
                  </Text>
                </View>
              </View>
              <View style={[styles.accessBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.accessFill, 
                    { backgroundColor: role.color, width: `${(role.permissions / 128) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Permission Dependency Graph */}
      <View style={[styles.dependencySection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.dependencyHeader}>
          <GitBranch size={18} color="#8B5CF6" />
          <Text style={[styles.dependencyTitle, { color: theme.colors.text }]}>
            Permission Dependency Graph
          </Text>
        </View>
        <View style={styles.dependencyGraph}>
          <View style={styles.dependencyLevel}>
            <View style={[styles.dependencyNode, { backgroundColor: '#EF4444' + '20', borderColor: '#EF4444', borderWidth: 1 }]}>
              <Shield size={16} color="#EF4444" />
              <Text style={[styles.nodeText, { color: theme.colors.text }]}>
                Admin Access
              </Text>
            </View>
          </View>
          <View style={[styles.dependencyConnector, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
          <View style={styles.dependencyLevel}>
            <View style={[styles.dependencyNode, { backgroundColor: '#F59E0B' + '20', borderColor: '#F59E0B', borderWidth: 1 }]}>
              <Lock size={16} color="#F59E0B" />
              <Text style={[styles.nodeText, { color: theme.colors.text }]}>
                Write Access
              </Text>
            </View>
            <View style={[styles.dependencyNode, { backgroundColor: '#8B5CF6' + '20', borderColor: '#8B5CF6', borderWidth: 1 }]}>
              <Zap size={16} color="#8B5CF6" />
              <Text style={[styles.nodeText, { color: theme.colors.text }]}>
                Execute Access
              </Text>
            </View>
          </View>
          <View style={[styles.dependencyConnector, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
          <View style={styles.dependencyLevel}>
            <View style={[styles.dependencyNode, { backgroundColor: '#10B981' + '20', borderColor: '#10B981', borderWidth: 1 }]}>
              <Eye size={16} color="#10B981" />
              <Text style={[styles.nodeText, { color: theme.colors.text }]}>
                Read Access
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Permission Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.permissionsScroll}
      >
        {permissions.map((permission) => {
          const typeColor = getTypeColor(permission.type);
          const typeBackground = getTypeBackground(permission.type);
          const accessLevelColor = getAccessLevelColor(permission.accessLevel);
          const statusColor = getStatusColor(permission.status);
          const TypeIcon = typeIcon[permission.type];

          return (
            <View 
              key={permission.id} 
              style={[
                styles.permissionCard, 
                { 
                  backgroundColor: typeBackground,
                  borderColor: typeColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.permissionHeader}>
                <View style={[styles.permissionIcon, { backgroundColor: typeColor + '20' }]}>
                  <TypeIcon size={24} color={typeColor} />
                </View>
                <View style={styles.permissionStatus}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {permission.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.permissionName, { color: theme.colors.text }]}>
                {permission.name}
              </Text>
              <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.typeText, { color: typeColor }]}>
                  {permission.type.toUpperCase()}
                </Text>
              </View>

              <View style={styles.permissionScope}>
                <Text style={[styles.scopeLabel, { color: theme.colors.textSecondary }]}>
                  Scope
                </Text>
                <Text style={[styles.scopeValue, { color: theme.colors.text }]}>
                  {permission.scope}
                </Text>
              </View>

              <View style={styles.accessLevelSection}>
                <View style={styles.accessLevelRow}>
                  <Key size={14} color={accessLevelColor} />
                  <Text style={[styles.accessLevelLabel, { color: theme.colors.textSecondary }]}>
                    Access Level
                  </Text>
                  <View style={[styles.accessLevelBadge, { backgroundColor: accessLevelColor + '20' }]}>
                    <Text style={[styles.accessLevelText, { color: accessLevelColor }]}>
                      {permission.accessLevel.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.dependenciesSection}>
                <Text style={[styles.dependenciesLabel, { color: theme.colors.textSecondary }]}>
                  Dependencies ({permission.dependencies.length})
                </Text>
                <View style={styles.dependenciesList}>
                  {permission.dependencies.slice(0, 3).map((dep, index) => (
                    <View key={index} style={styles.dependencyItem}>
                      <GitBranch size={10} color={theme.colors.textSecondary} />
                      <Text style={[styles.dependencyText, { color: theme.colors.text }]}>
                        {dep}
                      </Text>
                    </View>
                  ))}
                  {permission.dependencies.length > 3 && (
                    <Text style={[styles.moreDependencies, { color: theme.colors.textSecondary }]}>
                      +{permission.dependencies.length - 3} more
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.permissionFooter}>
                <Activity size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  Last used {permission.lastUsed}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Least-Privilege Enforcement Dashboard */}
      <View style={[styles.enforcementSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.enforcementHeader}>
          <Lock size={18} color="#10B981" />
          <Text style={[styles.enforcementTitle, { color: theme.colors.text }]}>
            Least-Privilege Enforcement Dashboard
          </Text>
        </View>
        <View style={styles.enforcementGrid}>
          <View style={styles.enforcementCard}>
            <View style={styles.enforcementIconRow}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={[styles.enforcementLabel, { color: theme.colors.textSecondary }]}>
                Principle Compliance
              </Text>
            </View>
            <Text style={[styles.enforcementValue, { color: '#10B981' }]}>
              96.8%
            </Text>
            <View style={[styles.enforcementBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.enforcementFill, { backgroundColor: '#10B981', width: '96.8%' }]} />
            </View>
          </View>
          <View style={styles.enforcementCard}>
            <View style={styles.enforcementIconRow}>
              <AlertTriangle size={20} color="#F59E0B" />
              <Text style={[styles.enforcementLabel, { color: theme.colors.textSecondary }]}>
                Over-privileged Accounts
              </Text>
            </View>
            <Text style={[styles.enforcementValue, { color: '#F59E0B' }]}>
              12
            </Text>
            <View style={[styles.enforcementBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <View style={[styles.enforcementFill, { backgroundColor: '#F59E0B', width: '15%' }]} />
            </View>
          </View>
          <View style={styles.enforcementCard}>
            <View style={styles.enforcementIconRow}>
              <Shield size={20} color="#06B6D4" />
              <Text style={[styles.enforcementLabel, { color: theme.colors.textSecondary }]}>
                Access Reviews
              </Text>
            </View>
            <Text style={[styles.enforcementValue, { color: '#06B6D4' }]}>
              847
            </Text>
            <View style={[styles.enforcementBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.enforcementFill, { backgroundColor: '#06B6D4', width: '78%' }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  matrixSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  matrixHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  matrixTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  matrixGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  matrixCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '600',
  },
  roleStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  roleStat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  accessBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  accessFill: {
    height: '100%',
    borderRadius: 2,
  },
  dependencySection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dependencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dependencyTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  dependencyGraph: {
    gap: 8,
  },
  dependencyLevel: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  dependencyNode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  nodeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dependencyConnector: {
    height: 20,
    width: 2,
    alignSelf: 'center',
  },
  permissionsScroll: {
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  permissionCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 260,
  },
  permissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  permissionName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  permissionScope: {
    marginBottom: 12,
  },
  scopeLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  scopeValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  accessLevelSection: {
    marginBottom: 12,
  },
  accessLevelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accessLevelLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  accessLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  accessLevelText: {
    fontSize: 10,
    fontWeight: '600',
  },
  dependenciesSection: {
    marginBottom: 12,
  },
  dependenciesLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  dependenciesList: {
    gap: 6,
  },
  dependencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dependencyText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreDependencies: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  permissionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  enforcementSection: {
    borderRadius: 12,
    padding: 16,
  },
  enforcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  enforcementTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  enforcementGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  enforcementCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  enforcementIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  enforcementLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  enforcementValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  enforcementBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  enforcementFill: {
    height: '100%',
    borderRadius: 3,
  },
});