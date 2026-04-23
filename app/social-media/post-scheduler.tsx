 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Image,
  Video,
  Link,
  Hash,
  Clock,
  Calendar,
  Globe,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Sparkles,
  Send,
  Save,
  Eye,
  ChevronDown,
  MapPin,
  AtSign,
  Smile,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  selected: boolean;
  charLimit: number;
}

export default function PostScheduler() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [postContent, setPostContent] = useState('');
  const [scheduleDate] = useState('Today');
  const [scheduleTime] = useState('2:00 PM');
  const [autoHashtags, setAutoHashtags] = useState(true);
  const [crossPost, setCrossPost] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', selected: true, charLimit: 2200 },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2', selected: true, charLimit: 280 },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', selected: false, charLimit: 63206 },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', selected: false, charLimit: 3000 },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', selected: false, charLimit: 5000 },
  ]);

  const togglePlatform = (id: string) => {
    setPlatforms(prev =>
      prev.map(p => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const selectedPlatforms = platforms.filter(p => p.selected);
  const minCharLimit = Math.min(...selectedPlatforms.map(p => p.charLimit));
  const isOverLimit = postContent.length > minCharLimit;

  const handleAIGenerate = () => {
    Alert.alert(
      'AI Content Generator',
      'Generate engaging content ideas based on your brand voice and trending topics.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Generate', onPress: () => setPostContent('🚀 Exciting news! We\'re launching something amazing that will transform how you work. Stay tuned for the big reveal! #Innovation #ComingSoon') },
      ]
    );
  };

  const handleSchedule = () => {
    if (!postContent.trim()) {
      Alert.alert('Error', 'Please enter some content for your post.');
      return;
    }
    if (selectedPlatforms.length === 0) {
      Alert.alert('Error', 'Please select at least one platform.');
      return;
    }
    Alert.alert(
      'Post Scheduled!',
      `Your post will be published on ${scheduleDate} at ${scheduleTime} to ${selectedPlatforms.map(p => p.name).join(', ')}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Create Post',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Platform Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Select Platforms</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <TouchableOpacity
                  key={platform.id}
                  style={[
                    styles.platformChip,
                    { 
                      backgroundColor: platform.selected ? `${platform.color}15` : theme.colors.cardBackground,
                      borderColor: platform.selected ? platform.color : 'transparent',
                    },
                  ]}
                  onPress={() => togglePlatform(platform.id)}
                >
                  <IconComponent size={18} color={platform.selected ? platform.color : theme.colors.secondaryText} />
                  <Text style={[styles.platformChipText, { color: platform.selected ? platform.color : theme.colors.secondaryText }]}>
                    {platform.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Content Editor */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Content</Text>
            <TouchableOpacity style={styles.aiButton} onPress={handleAIGenerate}>
              <Sparkles size={16} color="#AF52DE" />
              <Text style={styles.aiButtonText}>AI Generate</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.editorCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              placeholder="What's on your mind?"
              placeholderTextColor={theme.colors.secondaryText}
              multiline
              value={postContent}
              onChangeText={setPostContent}
              textAlignVertical="top"
            />
            <View style={styles.editorFooter}>
              <View style={styles.editorActions}>
                <TouchableOpacity style={styles.editorAction}>
                  <Image size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <Video size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <Link size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <Hash size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <AtSign size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <MapPin size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editorAction}>
                  <Smile size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.charCount, { color: isOverLimit ? '#FF3B30' : theme.colors.secondaryText }]}>
                {postContent.length}/{minCharLimit}
              </Text>
            </View>
          </View>
        </View>

        {/* Schedule Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Schedule</Text>
          <View style={[styles.scheduleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TouchableOpacity style={styles.scheduleRow}>
              <View style={styles.scheduleLeft}>
                <View style={[styles.scheduleIcon, { backgroundColor: '#007AFF15' }]}>
                  <Calendar size={18} color="#007AFF" />
                </View>
                <View>
                  <Text style={[styles.scheduleLabel, { color: theme.colors.secondaryText }]}>Date</Text>
                  <Text style={[styles.scheduleValue, { color: theme.colors.text }]}>{scheduleDate}</Text>
                </View>
              </View>
              <ChevronDown size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
            <View style={[styles.scheduleDivider, { backgroundColor: theme.colors.border }]} />
            <TouchableOpacity style={styles.scheduleRow}>
              <View style={styles.scheduleLeft}>
                <View style={[styles.scheduleIcon, { backgroundColor: '#FF950015' }]}>
                  <Clock size={18} color="#FF9500" />
                </View>
                <View>
                  <Text style={[styles.scheduleLabel, { color: theme.colors.secondaryText }]}>Time</Text>
                  <Text style={[styles.scheduleValue, { color: theme.colors.text }]}>{scheduleTime}</Text>
                </View>
              </View>
              <ChevronDown size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
            <View style={[styles.scheduleDivider, { backgroundColor: theme.colors.border }]} />
            <TouchableOpacity style={styles.scheduleRow}>
              <View style={styles.scheduleLeft}>
                <View style={[styles.scheduleIcon, { backgroundColor: '#34C75915' }]}>
                  <Globe size={18} color="#34C759" />
                </View>
                <View>
                  <Text style={[styles.scheduleLabel, { color: theme.colors.secondaryText }]}>Timezone</Text>
                  <Text style={[styles.scheduleValue, { color: theme.colors.text }]}>UTC-5 (EST)</Text>
                </View>
              </View>
              <ChevronDown size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Advanced Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Advanced Options</Text>
          <View style={[styles.optionsCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Hash size={18} color="#007AFF" />
                <View style={styles.optionText}>
                  <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Auto-generate Hashtags</Text>
                  <Text style={[styles.optionSubtitle, { color: theme.colors.secondaryText }]}>AI suggests relevant hashtags</Text>
                </View>
              </View>
              <Switch
                value={autoHashtags}
                onValueChange={setAutoHashtags}
                trackColor={{ false: '#E5E5EA', true: `${theme.colors.primary}50` }}
                thumbColor={autoHashtags ? theme.colors.primary : '#F4F4F4'}
              />
            </View>
            <View style={[styles.optionDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <Globe size={18} color="#34C759" />
                <View style={styles.optionText}>
                  <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Cross-platform Optimization</Text>
                  <Text style={[styles.optionSubtitle, { color: theme.colors.secondaryText }]}>Adapt content for each platform</Text>
                </View>
              </View>
              <Switch
                value={crossPost}
                onValueChange={setCrossPost}
                trackColor={{ false: '#E5E5EA', true: `${theme.colors.primary}50` }}
                thumbColor={crossPost ? theme.colors.primary : '#F4F4F4'}
              />
            </View>
          </View>
        </View>

        {/* Best Time Suggestion */}
        <View style={[styles.suggestionCard, { backgroundColor: '#FF950010', borderColor: '#FF9500' }]}>
          <Sparkles size={20} color="#FF9500" />
          <View style={styles.suggestionContent}>
            <Text style={[styles.suggestionTitle, { color: theme.colors.text }]}>AI Recommendation</Text>
            <Text style={[styles.suggestionText, { color: theme.colors.secondaryText }]}>
              Based on your audience, the best time to post is between 2-4 PM EST for maximum engagement.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: theme.colors.background, paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={[styles.actionButton, styles.draftButton, { borderColor: theme.colors.border }]}>
          <Save size={18} color={theme.colors.text} />
          <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.previewButton, { borderColor: theme.colors.primary }]}>
          <Eye size={18} color={theme.colors.primary} />
          <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.scheduleButton, { backgroundColor: theme.colors.primary }]} onPress={handleSchedule}>
          <Send size={18} color="#FFF" />
          <Text style={[styles.actionButtonText, { color: '#FFF' }]}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#AF52DE15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#AF52DE',
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
  },
  platformChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  editorCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 140,
  },
  editorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  editorActions: {
    flexDirection: 'row',
    gap: 16,
  },
  editorAction: {
    padding: 4,
  },
  charCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  scheduleCard: {
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  scheduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  scheduleValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  scheduleDivider: {
    height: 1,
    marginHorizontal: 14,
  },
  optionsCard: {
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
  },
  optionDivider: {
    height: 1,
    marginHorizontal: 14,
  },
  suggestionCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    gap: 12,
    marginBottom: 20,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 13,
    lineHeight: 18,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  draftButton: {
    borderWidth: 1,
  },
  previewButton: {
    borderWidth: 2,
  },
  scheduleButton: {
    flex: 1.5,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
