import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { X, Users, Hash, Lock, Check } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface CreateChannelModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (channelId: string) => void;
}

type ChannelType = 'dm' | 'group' | 'channel';

export default function CreateChannelModal({ visible, onClose, onSuccess }: CreateChannelModalProps) {
  const theme = useTheme();
  const [channelType, setChannelType] = useState<ChannelType>('dm');
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isOrgWide, setIsOrgWide] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const createChannelMutation = trpc.messaging.createChannel.useMutation();

  // Mock users - in real app, fetch from API
  const mockUsers: User[] = [
    { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 'user2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: 'user3', name: 'Carol White', email: 'carol@example.com' },
    { id: 'user4', name: 'David Brown', email: 'david@example.com' },
    { id: 'user5', name: 'Emma Davis', email: 'emma@example.com' },
  ];

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = async () => {
    // Validation
    if (channelType === 'dm' && selectedUsers.length !== 1) {
      Alert.alert('Error', 'Please select exactly one user for a direct message');
      return;
    }

    if (channelType === 'group' && selectedUsers.length < 2) {
      Alert.alert('Error', 'Please select at least 2 users for a group chat');
      return;
    }

    if (channelType === 'channel' && !channelName.trim()) {
      Alert.alert('Error', 'Please enter a channel name');
      return;
    }

    if (channelType === 'group' && !channelName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    setIsCreating(true);

    try {
      const result = await createChannelMutation.mutateAsync({
        type: channelType,
        name: channelName.trim(),
        description: description.trim(),
        memberIds: selectedUsers,
        visibility: isOrgWide ? 'org' : 'private',
      });

      onSuccess(result.channelId);
      handleClose();
      Alert.alert('Success', `${channelType === 'dm' ? 'DM' : channelType === 'group' ? 'Group' : 'Channel'} created successfully`);
    } catch (error) {
      console.error('Failed to create channel:', error);
      Alert.alert('Error', 'Failed to create channel. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setChannelType('dm');
    setChannelName('');
    setDescription('');
    setSelectedUsers([]);
    setIsOrgWide(false);
    onClose();
  };

  const getChannelTypeIcon = (type: ChannelType) => {
    switch (type) {
      case 'dm':
        return Users;
      case 'group':
        return Lock;
      case 'channel':
        return Hash;
    }
  };

  const getChannelTypeName = (type: ChannelType) => {
    switch (type) {
      case 'dm':
        return 'Direct Message';
      case 'group':
        return 'Private Group';
      case 'channel':
        return 'Channel';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Create Conversation
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Channel Type Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Conversation Type
            </Text>
            <View style={styles.typeGrid}>
              {(['dm', 'group', 'channel'] as ChannelType[]).map(type => {
                const IconComponent = getChannelTypeIcon(type);
                const isSelected = channelType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeCard,
                      {
                        backgroundColor: isSelected ? theme.colors.primary + '20' : theme.colors.cardBackground,
                        borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                      },
                    ]}
                    onPress={() => setChannelType(type)}
                  >
                    <IconComponent
                      size={24}
                      color={isSelected ? theme.colors.primary : theme.colors.secondaryText}
                    />
                    <Text
                      style={[
                        styles.typeName,
                        { color: isSelected ? theme.colors.primary : theme.colors.text },
                      ]}
                    >
                      {getChannelTypeName(type)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Channel Name */}
          {(channelType === 'group' || channelType === 'channel') && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {channelType === 'group' ? 'Group Name' : 'Channel Name'}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder={`Enter ${channelType === 'group' ? 'group' : 'channel'} name...`}
                placeholderTextColor={theme.colors.secondaryText}
                value={channelName}
                onChangeText={setChannelName}
              />
            </View>
          )}

          {/* Description */}
          {(channelType === 'group' || channelType === 'channel') && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Description (Optional)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  },
                ]}
                placeholder="Add a description..."
                placeholderTextColor={theme.colors.secondaryText}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          {/* Organization Wide Channel */}
          {channelType === 'channel' && (
            <View style={styles.section}>
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Text style={[styles.switchLabel, { color: theme.colors.text }]}>
                    Organization Wide
                  </Text>
                  <Text style={[styles.switchDescription, { color: theme.colors.secondaryText }]}>
                    All organization members can see and join this channel
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.switch,
                    {
                      backgroundColor: isOrgWide ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => setIsOrgWide(!isOrgWide)}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      {
                        backgroundColor: 'white',
                        transform: [{ translateX: isOrgWide ? 20 : 0 }],
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* User Selection */}
          {channelType !== 'channel' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {channelType === 'dm' ? 'Select User' : 'Add Members'}
                {channelType === 'group' && ` (${selectedUsers.length} selected)`}
              </Text>
              {mockUsers.map(user => {
                const isSelected = selectedUsers.includes(user.id);
                return (
                  <TouchableOpacity
                    key={user.id}
                    style={[
                      styles.userRow,
                      {
                        backgroundColor: isSelected ? theme.colors.primary + '10' : 'transparent',
                      },
                    ]}
                    onPress={() => toggleUserSelection(user.id)}
                  >
                    <View style={[styles.avatar, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
                        {user.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={[styles.userName, { color: theme.colors.text }]}>
                        {user.name}
                      </Text>
                      <Text style={[styles.userEmail, { color: theme.colors.secondaryText }]}>
                        {user.email}
                      </Text>
                    </View>
                    {isSelected && (
                      <Check size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* Create Button */}
        <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
          <TouchableOpacity
            style={[
              styles.createButton,
              {
                backgroundColor: theme.colors.primary,
                opacity: isCreating ? 0.6 : 1,
              },
            ]}
            onPress={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.createButtonText}>
                Create {getChannelTypeName(channelType)}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  typeName: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  switch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  createButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
};
