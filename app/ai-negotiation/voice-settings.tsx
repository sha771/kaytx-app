 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { Settings, Volume2, Mic, CirclePlay, Save, RotateCcw } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VoiceProfile {
  id: string;
  name: string;
  language: string;
  accent: string;
  gender: string;
  pitch: number;
  speed: number;
  isActive: boolean;
}

export default function VoiceSettingsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedProfile, setSelectedProfile] = useState<string>('profile1');
  const [profiles] = useState<VoiceProfile[]>([
    { id: 'profile1', name: 'Persuasive Male', language: 'English', accent: 'US', gender: 'Male', pitch: 0.9, speed: 0.95, isActive: true },
    { id: 'profile2', name: 'Confident Female', language: 'English', accent: 'UK', gender: 'Female', pitch: 1.0, speed: 1.0, isActive: false },
    { id: 'profile3', name: 'Expert Voice', language: 'English', accent: 'US', gender: 'Male', pitch: 0.85, speed: 0.9, isActive: false },
  ]);

  const [pitch, setPitch] = useState(0.9);
  const [speed, setSpeed] = useState(0.95);
  const [volume, setVolume] = useState(0.85);
  const [useBackgroundMusic, setUseBackgroundMusic] = useState(false);
  const [usePersuasiveTone, setUsePersuasiveTone] = useState(true);
  const [emotionalTone, setEmotionalTone] = useState('confident');

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Voice Settings',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Mic size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Voice Profiles</Text>
          </View>
          
          {profiles.map((profile) => (
            <TouchableOpacity
              key={profile.id}
              style={[
                styles.profileCard,
                selectedProfile === profile.id && styles.profileCardActive
              ]}
              onPress={() => setSelectedProfile(profile.id)}
            >
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileDetail}>
                  {profile.language} • {profile.accent} • {profile.gender}
                </Text>
                <View style={styles.profileStats}>
                  <Text style={styles.profileStat}>Pitch: {profile.pitch}</Text>
                  <Text style={styles.profileStat}>Speed: {profile.speed}</Text>
                </View>
              </View>
              {profile.isActive && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              )}
              <TouchableOpacity style={styles.playButton}>
                <CirclePlay size={24} color="#10B981" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Volume2 size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Voice Customization</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Pitch</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>{pitch.toFixed(1)}</Text>
              <View style={styles.sliderButtons}>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setPitch(Math.max(0.5, pitch - 0.1))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setPitch(Math.min(2.0, pitch + 0.1))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Speed</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>{speed.toFixed(1)}</Text>
              <View style={styles.sliderButtons}>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setSpeed(Math.max(0.5, speed - 0.1))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setSpeed(Math.min(2.0, speed + 0.1))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Volume</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>{volume.toFixed(1)}</Text>
              <View style={styles.sliderButtons}>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setVolume(Math.max(0, volume - 0.1))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sliderButton}
                  onPress={() => setVolume(Math.min(1.0, volume + 0.1))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Negotiation Tone</Text>
            <View style={styles.toneButtons}>
              {['confident', 'persuasive', 'assertive', 'collaborative'].map((tone) => (
                <TouchableOpacity
                  key={tone}
                  style={[
                    styles.toneButton,
                    emotionalTone === tone && styles.toneButtonActive
                  ]}
                  onPress={() => setEmotionalTone(tone)}
                >
                  <Text style={[
                    styles.toneButtonText,
                    emotionalTone === tone && styles.toneButtonTextActive
                  ]}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Advanced Options</Text>
          </View>

          <View style={styles.switchItem}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Background Music</Text>
              <Text style={styles.switchDescription}>Add subtle background music to calls</Text>
            </View>
            <Switch
              value={useBackgroundMusic}
              onValueChange={setUseBackgroundMusic}
              trackColor={{ false: '#374151', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Persuasive Language</Text>
              <Text style={styles.switchDescription}>Use persuasive techniques in conversation</Text>
            </View>
            <Switch
              value={usePersuasiveTone}
              onValueChange={setUsePersuasiveTone}
              trackColor={{ false: '#374151', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <RotateCcw size={18} color="#9CA3AF" />
            <Text style={styles.secondaryButtonText}>Reset to Default</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton}>
            <Save size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  profileCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#1A3A2E',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  profileStats: {
    flexDirection: 'row',
    gap: 12,
  },
  profileStat: {
    fontSize: 12,
    color: '#10B981',
  },
  activeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playButton: {
    padding: 8,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    minWidth: 40,
  },
  sliderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sliderButton: {
    backgroundColor: '#374151',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  toneButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toneButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  toneButtonActive: {
    backgroundColor: '#1A3A2E',
    borderColor: '#10B981',
  },
  toneButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  toneButtonTextActive: {
    color: '#10B981',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchInfo: {
    flex: 1,
    marginRight: 12,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
