/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  X,
  Wand2,
  Sparkles,
  Palette,
  RotateCcw,
  Check,
  History,
  MessageSquare,
  Lightbulb,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle,
  Clock,
} from 'lucide-react-native';
import { useDesignAgent, DesignChanges, DesignCustomization } from '@/providers/DesignAgentProvider';
import { useTheme } from '@/providers/ThemeProvider';

const PANEL_WIDTH = 340;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DesignAgentPanelProps {
  currentPagePath: string;
  currentPageName: string;
}

// Suggested prompts for quick actions
const SUGGESTED_PROMPTS = [
  {
    icon: '🎨',
    text: 'Make this more minimal and clean',
    description: 'Simplify layout, reduce clutter',
  },
  {
    icon: '🔵',
    text: 'Apply a blue color scheme',
    description: 'Professional blue theme',
  },
  {
    icon: '🌙',
    text: 'Switch to dark mode',
    description: 'Dark color scheme throughout',
  },
  {
    icon: '📊',
    text: 'Add a revenue chart to the top',
    description: 'Show revenue visualization',
  },
  {
    icon: '📐',
    text: 'Make layout more compact',
    description: 'Tighter spacing and smaller elements',
  },
];

function ChangesPreview({ changes }: { changes: DesignChanges }) {
  const { theme } = useTheme();
  const changeCount = Object.keys(changes).length;

  if (changeCount === 0) {
    return (
      <View style={[styles.emptyPreview, { backgroundColor: theme.colors.cardBackground }]}>
        <Lightbulb size={24} color={theme.colors.secondaryText} />
        <Text style={[styles.emptyPreviewText, { color: theme.colors.secondaryText }]}>
          Describe how you'd like to customize this page
        </Text>
      </View>
    );
  }

  const changeItems: { label: string; value: string; color: string }[] = [];

  if (changes.layout?.type) {
    changeItems.push({
      label: 'Layout',
      value: `Changed to ${changes.layout.type}`,
      color: theme.colors.primary,
    });
  }
  if (changes.colors) {
    const colorChanges = Object.entries(changes.colors)
      .filter(([, v]) => v !== undefined)
      .map(([k]) => k);
    if (colorChanges.length > 0) {
      changeItems.push({
        label: 'Colors',
        value: `Updated ${colorChanges.length} color token${colorChanges.length > 1 ? 's' : ''}`,
        color: '#AF52DE',
      });
    }
  }
  if (changes.widgets?.hidden && changes.widgets.hidden.length > 0) {
    changeItems.push({
      label: 'Widgets',
      value: `Hidden ${changes.widgets.hidden.length} widget${changes.widgets.hidden.length > 1 ? 's' : ''}`,
      color: '#FF9500',
    });
  }
  if (changes.widgets?.added && changes.widgets.added.length > 0) {
    changeItems.push({
      label: 'Additions',
      value: `Adding ${changes.widgets.added.length} new element${changes.widgets.added.length > 1 ? 's' : ''}`,
      color: '#34C759',
    });
  }
  if (changes.visibility) {
    const visChanges = Object.entries(changes.visibility)
      .filter(([, v]) => v !== undefined)
      .length;
    if (visChanges > 0) {
      changeItems.push({
        label: 'Visibility',
        value: `Modified ${visChanges} element${visChanges > 1 ? 's' : ''}`,
        color: '#5AC8FA',
      });
    }
  }
  if (changes.typography) {
    changeItems.push({
      label: 'Typography',
      value: 'Adjusted text styles',
      color: '#FF2D92',
    });
  }

  return (
    <View style={[styles.previewContainer, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.previewHeader}>
        <Eye size={14} color={theme.colors.primary} />
        <Text style={[styles.previewTitle, { color: theme.colors.text }]}>Changes Preview</Text>
      </View>
      {changeItems.map((item, index) => (
        <View key={index} style={styles.changeItem}>
          <View style={[styles.changeDot, { backgroundColor: item.color }]} />
          <Text style={[styles.changeLabel, { color: theme.colors.text }]}>{item.label}</Text>
          <Text style={[styles.changeValue, { color: theme.colors.secondaryText }]}>— {item.value}</Text>
        </View>
      ))}
    </View>
  );
}

function HistoryPanel({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const { customizationHistory, resetCustomization, getPageCustomization, applyCustomization, currentCustomizations } = useDesignAgent();

  const sortedHistory = [...customizationHistory]
    .filter(h => h.appliedAt)
    .sort((a, b) => new Date(b.appliedAt!).getTime() - new Date(a.appliedAt!).getTime());

  if (sortedHistory.length === 0) {
    return (
      <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
        <History size={32} color={theme.colors.secondaryText} />
        <Text style={[styles.emptyStateText, { color: theme.colors.secondaryText }]}>
          No customization history yet
        </Text>
        <Text style={[styles.emptyStateSubtext, { color: theme.colors.secondaryText }]}>
          Your design changes will appear here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.historyScroll} showsVerticalScrollIndicator={false}>
      {sortedHistory.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.historyItem,
            { backgroundColor: theme.colors.cardBackground },
            currentCustomizations?.id === item.id && {
              borderColor: theme.colors.primary,
              borderWidth: 1,
            },
          ]}
          onPress={() => {
            applyCustomization(item);
            onClose();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.historyItemHeader}>
            <Clock size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.historyItemDate, { color: theme.colors.secondaryText }]}>
              {new Date(item.appliedAt || item.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {currentCustomizations?.id === item.id && (
              <CheckCircle size={14} color={theme.colors.success} />
            )}
          </View>
          <Text style={[styles.historyItemPrompt, { color: theme.colors.text }]} numberOfLines={2}>
            "{item.prompt}"
          </Text>
          <Text style={[styles.historyItemPage, { color: theme.colors.secondaryText }]}>
            {item.pageName}
          </Text>
          <TouchableOpacity
            style={[styles.resetButton, { borderColor: theme.colors.error + '30' }]}
            onPress={() => {
              Alert.alert(
                'Reset Customization',
                `This will remove all customizations for "${item.pageName}". Continue?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => resetCustomization(item.pagePath),
                  },
                ]
              );
            }}
          >
            <RotateCcw size={12} color={theme.colors.error} />
            <Text style={[styles.resetButtonText, { color: theme.colors.error }]}>Reset</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export function DesignAgentPanel({ currentPagePath, currentPageName }: DesignAgentPanelProps) {
  const { theme } = useTheme();
  const {
    isOpen,
    closePanel,
    currentCustomizations,
    processingPrompt,
    processDesignPrompt,
    applyCustomization,
    resetCustomization,
    getPageCustomization,
    undoLastCustomization,
  } = useDesignAgent();

  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'design' | 'history'>('design');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [previewChanges, setPreviewChanges] = useState<DesignChanges | null>(null);
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const existingCustomization = getPageCustomization(currentPagePath);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 90,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: PANEL_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleSubmitPrompt = async () => {
    if (!prompt.trim() || processingPrompt) return;

    try {
      const changes = await processDesignPrompt(prompt.trim(), currentPagePath, currentPageName);
      setPreviewChanges(changes);
      setPrompt('');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error processing design prompt:', error);
    }
  };

  const handleApply = async () => {
    if (currentCustomizations) {
      await applyCustomization(currentCustomizations);
      closePanel();
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Design',
      'This will remove all customizations for this page. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => resetCustomization(currentPagePath),
        },
      ]
    );
  };

  const handleSuggestionPress = async (suggestion: typeof SUGGESTED_PROMPTS[0]) => {
    setPrompt(suggestion.text);
    try {
      const changes = await processDesignPrompt(suggestion.text, currentPagePath, currentPageName);
      setPreviewChanges(changes);
      setShowSuggestions(false);
    } catch (error) {
      console.error('Error processing suggestion:', error);
    }
  };

  const isPanelVisible = isOpen;

  return (
    <>
      {/* Overlay */}
      {isPanelVisible && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
              }),
            },
          ]}
          pointerEvents={isOpen ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closePanel}
          />
        </Animated.View>
      )}

      {/* Panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.background,
            borderLeftColor: theme.colors.border,
            transform: [{ translateX: slideAnim }],
            shadowColor: theme.colors.text,
          },
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.headerLeft}>
              <View style={[styles.headerIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                <Wand2 size={18} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Design Agent</Text>
                <Text style={[styles.headerSubtitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                  {currentPageName}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={closePanel}
              style={[styles.closeButton, { backgroundColor: theme.colors.cardBackground }]}
            >
              <X size={16} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {/* Tab bar */}
          <View style={[styles.tabBar, { borderBottomColor: theme.colors.border }]}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'design' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
              ]}
              onPress={() => setActiveTab('design')}
            >
              <Palette size={14} color={activeTab === 'design' ? theme.colors.primary : theme.colors.secondaryText} />
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'design' ? theme.colors.primary : theme.colors.secondaryText },
                ]}
              >
                Design
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'history' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
              ]}
              onPress={() => setActiveTab('history')}
            >
              <History size={14} color={activeTab === 'history' ? theme.colors.primary : theme.colors.secondaryText} />
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'history' ? theme.colors.primary : theme.colors.secondaryText },
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {activeTab === 'design' ? (
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Existing customization badge */}
              {existingCustomization && (
                <View style={[styles.customizationBadge, { backgroundColor: theme.colors.primary + '10' }]}>
                  <Sparkles size={14} color={theme.colors.primary} />
                  <Text style={[styles.customizationBadgeText, { color: theme.colors.primary }]}>
                    Customized — {new Date(existingCustomization.appliedAt || existingCustomization.createdAt).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity onPress={handleReset}>
                    <RotateCcw size={14} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              )}

              {/* Suggested prompts */}
              {showSuggestions && (
                <View style={styles.suggestionsContainer}>
                  <Text style={[styles.suggestionsTitle, { color: theme.colors.secondaryText }]}>
                    Try these suggestions:
                  </Text>
                  {SUGGESTED_PROMPTS.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.suggestionCard, { backgroundColor: theme.colors.cardBackground }]}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionIcon}>{suggestion.icon}</Text>
                      <View style={styles.suggestionContent}>
                        <Text style={[styles.suggestionText, { color: theme.colors.text }]}>
                          {suggestion.text}
                        </Text>
                        <Text style={[styles.suggestionDescription, { color: theme.colors.secondaryText }]}>
                          {suggestion.description}
                        </Text>
                      </View>
                      <ChevronDown size={14} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Changes Preview */}
              {(previewChanges || currentCustomizations?.changes) && (
                <ChangesPreview changes={previewChanges || currentCustomizations!.changes} />
              )}

              {/* Action buttons */}
              {(previewChanges || currentCustomizations) && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleApply}
                    activeOpacity={0.8}
                  >
                    <Check size={18} color="#FFFFFF" />
                    <Text style={styles.applyButtonText}>Apply Changes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.undoButton, { borderColor: theme.colors.border }]}
                    onPress={() => {
                      if (currentCustomizations) {
                        undoLastCustomization(currentPagePath);
                        setPreviewChanges(null);
                      } else {
                        setPreviewChanges(null);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <RotateCcw size={16} color={theme.colors.text} />
                    <Text style={[styles.undoButtonText, { color: theme.colors.text }]}>Undo</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Processing indicator */}
              {processingPrompt && (
                <View style={[styles.processingContainer, { backgroundColor: theme.colors.cardBackground }]}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                  <Text style={[styles.processingText, { color: theme.colors.secondaryText }]}>
                    AI is analyzing your request...
                  </Text>
                </View>
              )}

              {/* Spacer for keyboard */}
              <View style={{ height: 100 }} />
            </ScrollView>
          ) : (
            <HistoryPanel onClose={() => setActiveTab('design')} />
          )}

          {/* Input area */}
          {activeTab === 'design' && (
            <View style={[styles.inputContainer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
              <View style={[styles.inputWrapper, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                <TextInput
                  ref={inputRef}
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Describe your design changes..."
                  placeholderTextColor={theme.colors.secondaryText}
                  value={prompt}
                  onChangeText={setPrompt}
                  multiline
                  maxLength={500}
                  editable={!processingPrompt}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor: prompt.trim() && !processingPrompt
                        ? theme.colors.primary
                        : theme.colors.cardBackground,
                    },
                  ]}
                  onPress={handleSubmitPrompt}
                  disabled={!prompt.trim() || processingPrompt}
                >
                  {processingPrompt ? (
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                  ) : (
                    <Sparkles size={16} color={prompt.trim() ? '#FFFFFF' : theme.colors.secondaryText} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={[styles.inputHint, { color: theme.colors.secondaryText }]}>
                Describe layout, colors, widgets, or any design changes
              </Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 9998,
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Math.min(PANEL_WIDTH, SCREEN_WIDTH),
    zIndex: 9999,
    borderLeftWidth: 1,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    maxWidth: 200,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  customizationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
  },
  customizationBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  suggestionsContainer: {
    marginTop: 16,
    gap: 8,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  suggestionIcon: {
    fontSize: 20,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  suggestionDescription: {
    fontSize: 11,
    marginTop: 2,
  },
  previewContainer: {
    marginTop: 16,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  changeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  changeLabel: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 70,
  },
  changeValue: {
    fontSize: 12,
    flex: 1,
  },
  emptyPreview: {
    marginTop: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  emptyPreviewText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  applyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  undoButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  processingContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 10,
  },
  processingText: {
    fontSize: 13,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    maxHeight: 80,
    lineHeight: 20,
    paddingVertical: 4,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHint: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
  // History tab styles
  emptyState: {
    margin: 16,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 13,
    textAlign: 'center',
  },
  historyScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyItem: {
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    gap: 6,
  },
  historyItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyItemDate: {
    fontSize: 11,
    flex: 1,
  },
  historyItemPrompt: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  historyItemPage: {
    fontSize: 11,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
  },
  resetButtonText: {
    fontSize: 11,
    fontWeight: '500',
  },
});