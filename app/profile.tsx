import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Camera, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const profileData = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://i.pravatar.cc/300?img=3',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'Digital nomad, coffee enthusiast, and tech lover. Building the future one message at a time.',
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
});