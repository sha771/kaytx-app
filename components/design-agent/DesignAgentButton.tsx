/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';
import { Palette, Sparkles, Wand2 } from 'lucide-react-native';
import { useDesignAgent } from '@/providers/DesignAgentProvider';
import { useTheme } from '@/providers/ThemeProvider';

interface DesignAgentButtonProps {
  pagePath: string;
  pageName: string;
  size?: 'small' | 'medium';
  variant?: 'icon' | 'minimal';
}

export function DesignAgentButton({
  pagePath,
  pageName,
  size = 'small',
  variant = 'icon',
}: DesignAgentButtonProps) {
  const { theme } = useTheme();
  const { openPanel, getPageCustomization } = useDesignAgent();
  const [pressed, setPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const hasCustomization = !!getPageCustomization(pagePath);
  const iconSize = size === 'small' ? 18 : 22;

  React.useEffect(() => {
    // Subtle pulse animation to draw attention
    const pulseSequence = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseSequence).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, []);

  const handlePressIn = () => {
    setPressed(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.85,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    openPanel();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  if (variant === 'minimal') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
        style={[
          styles.minimalButton,
          {
            backgroundColor: hasCustomization
              ? theme.colors.primary + '15'
              : 'transparent',
            borderColor: hasCustomization
              ? theme.colors.primary + '30'
              : theme.colors.border,
          },
        ]}
      >
        <View style={styles.minimalContent}>
          <Palette size={14} color={theme.colors.primary} />
          <Text
            style={[
              styles.minimalLabel,
              { color: theme.colors.primary },
            ]}
            numberOfLines={1}
          >
            {hasCustomization ? 'Design Applied' : 'Customize'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.pulseRing,
          {
            borderColor: theme.colors.primary,
            opacity: pulseOpacity,
          },
        ]}
        pointerEvents="none"
      />

      {/* Main button */}
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: hasCustomization ? '0deg' : rotation },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          style={[
            styles.button,
            {
              width: size === 'small' ? 34 : 40,
              height: size === 'small' ? 34 : 40,
              borderRadius: size === 'small' ? 17 : 20,
              backgroundColor: hasCustomization
                ? theme.colors.primary + '20'
                : theme.colors.cardBackground,
              borderColor: hasCustomization
                ? theme.colors.primary + '40'
                : theme.colors.border,
              shadowColor: hasCustomization
                ? theme.colors.primary
                : theme.colors.text,
            },
          ]}
        >
          {/* Gradient overlay effect */}
          <View
            style={[
              styles.gradientOverlay,
              {
                borderRadius: size === 'small' ? 17 : 20,
                backgroundColor: hasCustomization
                  ? theme.colors.primary + '10'
                  : 'transparent',
              },
            ]}
          />

          {/* Icon */}
          {hasCustomization ? (
            <Sparkles size={iconSize - 2} color={theme.colors.primary} />
          ) : (
            <Wand2 size={iconSize - 2} color={theme.colors.primary} />
          )}

          {/* Active indicator dot */}
          {hasCustomization && (
            <View
              style={[
                styles.activeDot,
                { backgroundColor: theme.colors.success },
              ]}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedContainer: {
    zIndex: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'visible',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
  },
  activeDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  minimalButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 8,
  },
  minimalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  minimalLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});