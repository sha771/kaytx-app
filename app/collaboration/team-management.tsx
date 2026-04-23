 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Users, Plus, Edit2, Trash2, Mail, Shield, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  joinedDate: string;
  lastActive: string;
}

export default function TeamManagementScreen() {
  const insets = useSafeAreaInsets();
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      role: 'Admin',
      department: 'Sales',
      status: 'active',
      permissions: ['Full Access', 'User Management', 'Billing'],
      joinedDate: 'Jan 2023',
      lastActive: '2 min ago',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Manager',
      department: 'Marketing',
      status: 'active',
      permissions: ['View Reports', 'Manage Campaigns', 'Team Access'],
      joinedDate: 'Mar 2023',
      lastActive: '1 hour ago',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@company.com',
      role: 'Member',
      department: 'Sales',
      status: 'active',
      permissions: ['View Data', 'Create Leads'],
      joinedDate: 'Jun 2023',
      lastActive: '5 hours ago',
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily@company.com',
      role: 'Member',
      department: 'Support',
      status: 'pending',
      permissions: ['View Tickets'],
      joinedDate: 'Today',
      lastActive: 'Never',
    },
  ]);

  const deleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'Admin': '#EF4444',
      'Manager': '#F59E0B',
      'Member': '#60A5FA',
    };
    return colors[role] || '#6B7280';
  };

  const getStatusColor = (status: TeamMember['status']) => {
    const colors = {
      active: '#10B981',
      inactive: '#6B7280',
      pending: '#F59E0B',
    };
    return colors[status];
  };

  const activeCount = members.filter(m => m.status === 'active').length;
  const pendingCount = members.filter(m => m.status === 'pending').length;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Team Management',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Team Members</Text>
            <Text style={styles.headerSubtitle}>{members.length} total members</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Users size={18} color="#60A5FA" />
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={18} color="#F59E0B" />
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Shield size={18} color="#10B981" />
          <Text style={styles.statValue}>{members.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {members.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
                </View>
                <View style={styles.memberMetaRow}>
                  <Mail size={12} color="#9CA3AF" />
                  <Text style={styles.memberEmail}>{member.email}</Text>
                </View>
              </View>
            </View>

            <View style={styles.memberDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Role:</Text>
                <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(member.role) + '20' }]}>
                  <Text style={[styles.roleBadgeText, { color: getRoleBadgeColor(member.role) }]}>
                    {member.role}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Department:</Text>
                <Text style={styles.detailValue}>{member.department}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Joined:</Text>
                <Text style={styles.detailValue}>{member.joinedDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last Active:</Text>
                <Text style={styles.detailValue}>{member.lastActive}</Text>
              </View>
            </View>

            <View style={styles.permissionsSection}>
              <Text style={styles.permissionsTitle}>Permissions:</Text>
              <View style={styles.permissionsList}>
                {member.permissions.map((permission, index) => (
                  <View key={index} style={styles.permissionChip}>
                    <Shield size={10} color="#60A5FA" />
                    <Text style={styles.permissionText}>{permission}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.memberActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Edit2 size={16} color="#60A5FA" />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Shield size={16} color="#F59E0B" />
                <Text style={[styles.actionButtonText, { color: '#F59E0B' }]}>Permissions</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => deleteMember(member.id)}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.inviteCard}>
          <Users size={32} color="#60A5FA" />
          <Text style={styles.inviteCardTitle}>Invite Team Members</Text>
          <Text style={styles.inviteCardDescription}>Add new members to your team</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60A5FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  memberCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  memberAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#60A5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  memberMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberEmail: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  memberDetails: {
    backgroundColor: '#0F1621',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  permissionsSection: {
    marginBottom: 12,
  },
  permissionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  permissionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  permissionText: {
    fontSize: 11,
    color: '#93C5FD',
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#60A5FA',
  },
  inviteCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  inviteCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  inviteCardDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
