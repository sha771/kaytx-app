import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Building2,
  Users,
  Crown,
  Shield,
  Settings,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Organization {
  id: string;
  name: string;
  plan: 'enterprise' | 'business' | 'pro';
  members: number;
  admins: number;
  created: string;
  billing: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'invited' | 'inactive';
  joinedDate: string;
  avatar: string;
  department: string;
}

interface Department {
  id: string;
  name: string;
  members: number;
  admin: string;
  color: string;
}

const organization: Organization = {
  id: '1',
  name: 'Acme Corporation',
  plan: 'enterprise',
  members: 247,
  admins: 8,
  created: '2023-01-15',
  billing: 'Annual',
};

const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@acme.com',
    role: 'owner',
    status: 'active',
    joinedDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    department: 'Engineering',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@acme.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-02-01',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    department: 'Product',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@acme.com',
    role: 'member',
    status: 'active',
    joinedDate: '2023-03-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    department: 'Sales',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@acme.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-02-15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    department: 'Marketing',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@acme.com',
    role: 'member',
    status: 'invited',
    joinedDate: '-',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    department: 'Support',
  },
];

const departments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    members: 65,
    admin: 'John Doe',
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Product',
    members: 28,
    admin: 'Jane Smith',
    color: '#34C759',
  },
  {
    id: '3',
    name: 'Sales',
    members: 42,
    admin: 'Mike Johnson',
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'Marketing',
    members: 35,
    admin: 'Sarah Williams',
    color: '#AF52DE',
  },
  {
    id: '5',
    name: 'Support',
    members: 48,
    admin: 'Tom Anderson',
    color: '#5AC8FA',
  },
  {
    id: '6',
    name: 'Finance',
    members: 15,
    admin: 'Lisa Martinez',
    color: '#FF3B30',
  },
];

export default function OrganizationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'members' | 'departments'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return '#FF3B30';
      case 'admin': return '#FF9500';
      case 'member': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return Crown;
      case 'admin': return Shield;
      case 'member': return Users;
      default: return Users;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'invited': return '#FF9500';
      case 'inactive': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return '#FF3B30';
      case 'business': return '#FF9500';
      case 'pro': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const renderMember = ({ item }: { item: Member }) => {
    const roleColor = getRoleColor(item.role);
    const RoleIcon = getRoleIcon(item.role);
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.memberCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.memberHeader}>
          <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
          <View style={styles.memberInfo}>
            <Text style={[styles.memberName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.memberEmail, { color: theme.colors.secondaryText }]}>
              {item.email}
            </Text>
            <View style={styles.memberMeta}>
              <View style={[styles.roleBadge, { backgroundColor: `${roleColor}20` }]}>
                <RoleIcon size={12} color={roleColor} />
                <Text style={[styles.roleText, { color: roleColor }]}>
                  {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.memberDetails}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
              Department:
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.department}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
              Joined:
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {item.joinedDate}
            </Text>
          </View>
        </View>

        <View style={styles.memberActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Edit size={16} color={theme.colors.text} />
          </TouchableOpacity>
          {item.role !== 'owner' && (
            <TouchableOpacity style={styles.actionIcon}>
              <Trash2 size={16} color="#FF3B30" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderDepartment = ({ item }: { item: Department }) => (
    <View style={[styles.departmentCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.departmentHeader}>
        <View style={[styles.departmentIcon, { backgroundColor: `${item.color}20` }]}>
          <Building2 size={24} color={item.color} />
        </View>
        <View style={styles.departmentInfo}>
          <Text style={[styles.departmentName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.departmentAdmin, { color: theme.colors.secondaryText }]}>
            Admin: {item.admin}
          </Text>
        </View>
        <View style={styles.departmentStats}>
          <Text style={[styles.memberCount, { color: theme.colors.text }]}>{item.members}</Text>
          <Text style={[styles.memberLabel, { color: theme.colors.secondaryText }]}>members</Text>
        </View>
      </View>

      <View style={styles.departmentActions}>
        <TouchableOpacity 
          style={[styles.departmentButton, { backgroundColor: theme.colors.background }]}
        >
          <UserPlus size={16} color={theme.colors.text} />
          <Text style={[styles.departmentButtonText, { color: theme.colors.text }]}>
            Add Members
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.departmentButton, { backgroundColor: theme.colors.background }]}
        >
          <Settings size={16} color={theme.colors.text} />
          <Text style={[styles.departmentButtonText, { color: theme.colors.text }]}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Organization</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['overview', 'members', 'departments'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <View style={styles.section}>
            <View style={[styles.orgCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.orgHeader}>
                <View style={[styles.orgIcon, { backgroundColor: `${getPlanColor(organization.plan)}20` }]}>
                  <Building2 size={32} color={getPlanColor(organization.plan)} />
                </View>
                <View style={styles.orgInfo}>
                  <Text style={[styles.orgName, { color: theme.colors.text }]}>
                    {organization.name}
                  </Text>
                  <View style={[styles.planBadge, { backgroundColor: `${getPlanColor(organization.plan)}20` }]}>
                    <Text style={[styles.planText, { color: getPlanColor(organization.plan) }]}>
                      {organization.plan.toUpperCase()} PLAN
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.orgStats}>
                <View style={styles.statItem}>
                  <Users size={24} color={theme.colors.primary} />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {organization.members}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                    Members
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Shield size={24} color={theme.colors.primary} />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {organization.admins}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                    Admins
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Calendar size={24} color={theme.colors.primary} />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {organization.created}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                    Created
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.editOrgButton, { backgroundColor: theme.colors.primary }]}
              >
                <Edit size={16} color="#FFFFFF" />
                <Text style={styles.editOrgButtonText}>Edit Organization</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity 
                style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <UserPlus size={24} color={theme.colors.primary} />
                <Text style={[styles.actionText, { color: theme.colors.text }]}>Invite Members</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <Building2 size={24} color={theme.colors.primary} />
                <Text style={[styles.actionText, { color: theme.colors.text }]}>New Department</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'members' && (
          <View style={styles.section}>
            <View style={styles.searchHeader}>
              <TextInput
                style={[styles.searchInput, { 
                  backgroundColor: theme.colors.cardBackground,
                  color: theme.colors.text,
                }]}
                placeholder="Search members..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity 
                style={[styles.inviteButton, { backgroundColor: theme.colors.primary }]}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={members}
              renderItem={renderMember}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.membersList}
            />
          </View>
        )}

        {selectedTab === 'departments' && (
          <View style={styles.section}>
            <View style={styles.departmentsHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Departments</Text>
              <TouchableOpacity 
                style={[styles.newDeptButton, { backgroundColor: theme.colors.primary }]}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.newDeptButtonText}>New Department</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={departments}
              renderItem={renderDepartment}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.departmentsList}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
  },
  orgCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  orgHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  orgIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  orgInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orgName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  planText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orgStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  editOrgButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  editOrgButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  membersList: {
    gap: 12,
  },
  memberCard: {
    padding: 16,
    borderRadius: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 13,
    marginBottom: 8,
  },
  memberMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  memberDetails: {
    marginBottom: 12,
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailLabel: {
    fontSize: 13,
    width: 90,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  memberActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionIcon: {
    padding: 8,
  },
  departmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newDeptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  newDeptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  departmentsList: {
    gap: 12,
  },
  departmentCard: {
    padding: 16,
    borderRadius: 12,
  },
  departmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  departmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  departmentAdmin: {
    fontSize: 13,
  },
  departmentStats: {
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 24,
    fontWeight: '700',
  },
  memberLabel: {
    fontSize: 12,
  },
  departmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  departmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  departmentButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
