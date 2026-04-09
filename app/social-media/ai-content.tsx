 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Sparkles,
  Copy,
  RefreshCw,
  Send,
  Hash,
  Image,
  Video,
  FileText,
  Lightbulb,
  Target,
  Smile,
  Zap,
  ChevronRight,
  Check,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ContentTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface GeneratedContent {
  id: string;
  content: string;
  hashtags: string[];
  platform: string;
}

export default function AIContentGenerator() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('professional');
  const [selectedLength, setSelectedLength] = useState<string>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tones = [
    { id: 'professional', label: 'Professional', emoji: '👔' },
    { id: 'casual', label: 'Casual', emoji: '😊' },
    { id: 'humorous', label: 'Humorous', emoji: '😄' },
    { id: 'inspirational', label: 'Inspirational', emoji: '✨' },
    { id: 'educational', label: 'Educational', emoji: '📚' },
  ];

  const lengths = [
    { id: 'short', label: 'Short', desc: '< 100 chars' },
    { id: 'medium', label: 'Medium', desc: '100-200 chars' },
    { id: 'long', label: 'Long', desc: '> 200 chars' },
  ];

  const templates: ContentTemplate[] = [
    { id: 'product', title: 'Product Launch', description: 'Announce new products or features', icon: Zap, color: '#FF9500' },
    { id: 'tips', title: 'Tips & Tricks', description: 'Share valuable insights', icon: Lightbulb, color: '#FFCC00' },
    { id: 'engagement', title: 'Engagement Post', description: 'Increase audience interaction', icon: Smile, color: '#FF2D55' },
    { id: 'promotion', title: 'Promotion', description: 'Sales and special offers', icon: Target, color: '#34C759' },
    { id: 'story', title: 'Story/Reel', description: 'Short-form video content', icon: Video, color: '#AF52DE' },
    { id: 'article', title: 'Blog Promotion', description: 'Drive traffic to articles', icon: FileText, color: '#007AFF' },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a topic or idea for your content.');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const mockContent: GeneratedContent[] = [
        {
          id: '1',
          content: `🚀 Exciting news! We're thrilled to announce our latest innovation that's about to change the game. After months of development, we're ready to share something special with you.\n\nStay tuned for the big reveal! 👀`,
          hashtags: ['#Innovation', '#ComingSoon', '#GameChanger', '#Tech'],
          platform: 'Instagram',
        },
        {
          id: '2',
          content: `Big announcement coming soon! 🎉\n\nWe've been working on something incredible behind the scenes. Can't wait to share it with you all.\n\nDrop a 🔥 if you're ready!`,
          hashtags: ['#Announcement', '#StayTuned', '#Excited'],
          platform: 'Twitter',
        },
        {
          id: '3',
          content: `I'm excited to share that our team has been working on a groundbreaking project that will transform how businesses approach ${prompt}.\n\nAfter extensive research and development, we're preparing for an announcement that I believe will make a significant impact in our industry.\n\nWhat challenges are you currently facing in this area? I'd love to hear your thoughts in the comments.`,
          hashtags: ['#BusinessGrowth', '#Innovation', '#Leadership', '#Industry'],
          platform: 'LinkedIn',
        },
      ];

      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = (id: string, content: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    Alert.alert('Copied!', 'Content copied to clipboard.');
  };

  const handleRegenerate = (id: string) => {
    Alert.alert('Regenerating...', 'Creating a new variation of this content.');
  };

  const handleUseContent = (content: GeneratedContent) => {
    Alert.alert(
      'Use Content',
      `Open this content in the post scheduler for ${content.platform}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Schedule', onPress: () => console.log('Navigate to scheduler') },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Content Generator',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Quick Templates */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <TouchableOpacity
                  key={template.id}
                  style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => setPrompt(`Create a ${template.title.toLowerCase()} post about `)}
                >
                  <View style={[styles.templateIcon, { backgroundColor: `${template.color}15` }]}>
                    <IconComponent size={20} color={template.color} />
                  </View>
                  <Text style={[styles.templateTitle, { color: theme.colors.text }]}>{template.title}</Text>
                  <Text style={[styles.templateDesc, { color: theme.colors.secondaryText }]}>{template.description}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Prompt Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>What&apos;s your content about?</Text>
          <View style={[styles.inputCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TextInput
              style={[styles.promptInput, { color: theme.colors.text }]}
              placeholder="E.g., Our new product launch, industry trends, company milestone..."
              placeholderTextColor={theme.colors.secondaryText}
              multiline
              value={prompt}
              onChangeText={setPrompt}
              textAlignVertical="top"
            />
            <View style={styles.inputFooter}>
              <TouchableOpacity style={styles.inputAction}>
                <Image size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputAction}>
                <Hash size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <Text style={[styles.charCount, { color: theme.colors.secondaryText }]}>{prompt.length}/500</Text>
            </View>
          </View>
        </View>

        {/* Tone Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tone</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tones.map((tone) => (
              <TouchableOpacity
                key={tone.id}
                style={[
                  styles.toneChip,
                  { 
                    backgroundColor: selectedTone === tone.id ? `${theme.colors.primary}15` : theme.colors.cardBackground,
                    borderColor: selectedTone === tone.id ? theme.colors.primary : 'transparent',
                  },
                ]}
                onPress={() => setSelectedTone(tone.id)}
              >
                <Text style={styles.toneEmoji}>{tone.emoji}</Text>
                <Text style={[styles.toneLabel, { color: selectedTone === tone.id ? theme.colors.primary : theme.colors.text }]}>
                  {tone.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Length Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Length</Text>
          <View style={styles.lengthContainer}>
            {lengths.map((length) => (
              <TouchableOpacity
                key={length.id}
                style={[
                  styles.lengthOption,
                  { 
                    backgroundColor: selectedLength === length.id ? `${theme.colors.primary}15` : theme.colors.cardBackground,
                    borderColor: selectedLength === length.id ? theme.colors.primary : 'transparent',
                  },
                ]}
                onPress={() => setSelectedLength(length.id)}
              >
                <Text style={[styles.lengthLabel, { color: selectedLength === length.id ? theme.colors.primary : theme.colors.text }]}>
                  {length.label}
                </Text>
                <Text style={[styles.lengthDesc, { color: theme.colors.secondaryText }]}>{length.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: theme.colors.primary, opacity: isGenerating ? 0.7 : 1 }]}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Sparkles size={20} color="#FFF" />
          )}
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </Text>
        </TouchableOpacity>

        {/* Generated Content */}
        {generatedContent.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Generated Content</Text>
            {generatedContent.map((content) => {
              const PlatformIcon = content.platform === 'Instagram' ? Instagram : content.platform === 'Twitter' ? Twitter : Linkedin;
              const platformColor = content.platform === 'Instagram' ? '#E4405F' : content.platform === 'Twitter' ? '#1DA1F2' : '#0A66C2';
              
              return (
                <View key={content.id} style={[styles.generatedCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.generatedHeader}>
                    <View style={[styles.platformBadge, { backgroundColor: `${platformColor}15` }]}>
                      <PlatformIcon size={16} color={platformColor} />
                      <Text style={[styles.platformBadgeText, { color: platformColor }]}>{content.platform}</Text>
                    </View>
                    <View style={styles.generatedActions}>
                      <TouchableOpacity style={styles.actionBtn} onPress={() => handleRegenerate(content.id)}>
                        <RefreshCw size={16} color={theme.colors.secondaryText} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionBtn} onPress={() => handleCopy(content.id, content.content)}>
                        {copiedId === content.id ? (
                          <Check size={16} color="#34C759" />
                        ) : (
                          <Copy size={16} color={theme.colors.secondaryText} />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={[styles.generatedContent, { color: theme.colors.text }]}>{content.content}</Text>
                  <View style={styles.hashtagsContainer}>
                    {content.hashtags.map((tag, index) => (
                      <View key={index} style={[styles.hashtag, { backgroundColor: `${theme.colors.primary}10` }]}>
                        <Text style={[styles.hashtagText, { color: theme.colors.primary }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={[styles.useButton, { borderColor: theme.colors.primary }]}
                    onPress={() => handleUseContent(content)}
                  >
                    <Send size={16} color={theme.colors.primary} />
                    <Text style={[styles.useButtonText, { color: theme.colors.primary }]}>Use This Content</Text>
                    <ChevronRight size={16} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* Tips */}
        <View style={[styles.tipsCard, { backgroundColor: '#007AFF10', borderColor: '#007AFF' }]}>
          <Lightbulb size={20} color="#007AFF" />
          <View style={styles.tipsContent}>
            <Text style={[styles.tipsTitle, { color: theme.colors.text }]}>Pro Tips</Text>
            <Text style={[styles.tipsText, { color: theme.colors.secondaryText }]}>
              • Be specific about your topic for better results{'\n'}
              • Include your target audience in the prompt{'\n'}
              • Regenerate multiple times for variety
            </Text>
          </View>
        </View>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  templateCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  inputCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  promptInput: {
    fontSize: 15,
    lineHeight: 22,
    minHeight: 100,
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  inputAction: {
    padding: 8,
    marginRight: 8,
  },
  charCount: {
    marginLeft: 'auto',
    fontSize: 12,
  },
  toneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
    gap: 8,
  },
  toneEmoji: {
    fontSize: 16,
  },
  toneLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  lengthContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  lengthOption: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  lengthLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  lengthDesc: {
    fontSize: 11,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 10,
    marginBottom: 24,
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  generatedCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  generatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  platformBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  generatedActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  generatedContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  hashtag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  hashtagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  useButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    gap: 8,
  },
  useButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    gap: 12,
    marginBottom: 20,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  tipsText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
