 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Camera, Mail, Phone, MapPin, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useApi } from './hooks/useApi';
import apiClient from '@/lib/api-client';

export default function ProfileScreen() {
  const { theme } = useTheme();

  // Fetch user profile from backend
  const { data: userData, loading, error, refetch } = useApi(() => apiClient.getCurrentUser());

  // Handle loading state
  if (loading) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => router.back()}
      >
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading profile...</Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  // Handle error state
  if (error || !userData) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => router.back()}
      >
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: theme.colors.text }]}>
              {error || 'Failed to load profile'}
            </Text>
            <TouchableOpacity 
              style={[styles.retryButton, { backgroundColor: theme.colors.primary }]} 
              onPress={refetch}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  // Transform backend data to display format
  const profileData = {
    name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Unknown User',
    username: userData.email ? `@${userData.email.split('@')[0]}` : '@user',
    avatar: userData.avatar || 'https://i.pravatar.cc/300?img=3',
    email: userData.email || 'No email',
    phone: userData.phone || 'No phone',
    location: userData.location || 'No location',
    joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }) : 'Unknown',
    bio: userData.bio || 'No bio available',
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => router.back()}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
              <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: theme.colors.primary }]}>
                <Camera size={18} color="white" />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.name, { color: theme.colors.text }]}>{profileData.name}</Text>
            <Text style={[styles.username, { color: theme.colors.secondaryText }]}>{profileData.username}</Text>
            
            <Text style={[styles.bio, { color: theme.colors.text }]}>{profileData.bio}</Text>
          </View>

          <View style={[styles.infoSection, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.infoItem}>
              <Mail size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Email</Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>{profileData.email}</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, styles.infoItemBorder, { borderTopColor: theme.colors.border }]}>
              <Phone size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Phone</Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>{profileData.phone}</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, styles.infoItemBorder, { borderTopColor: theme.colors.border }]}>
              <MapPin size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Location</Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>{profileData.location}</Text>
              </View>
            </View>
            
            <View style={[styles.infoItem, styles.infoItemBorder, { borderTopColor: theme.colors.border }]}>
              <Calendar size={20} color={theme.colors.secondaryText} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.secondaryText }]}>Joined</Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>{profileData.joinDate}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    marginBottom: 16,
  },
  bio: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 32,
  },
  infoSection: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  infoItemBorder: {
    borderTopWidth: 1,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
  },
  editButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});