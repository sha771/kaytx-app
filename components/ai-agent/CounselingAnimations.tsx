import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';

// ============================================
// ANIMATION UTILITIES
// ============================================

export const useFadeIn = (duration = 300, delay = 0) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [duration, delay, opacity]);

  return opacity;
};

export const useSlideUp = (duration = 400, delay = 0) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration, delay, translateY, opacity]);

  return { translateY, opacity };
};

export const useScale = (duration = 200) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
};

export const usePulse = () => {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [pulse]);

  return pulse;
};

export const useStaggeredAnimation = (itemCount: number, baseDelay = 100) => {
  const animations = useRef(
    Array.from({ length: itemCount }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  ).current;

  useEffect(() => {
    const staggerAnimations = animations.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 300,
          delay: index * baseDelay,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 300,
          delay: index * baseDelay,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(50, staggerAnimations).start();
  }, [itemCount, baseDelay, animations]);

  return animations;
};

// ============================================
// ANIMATED COMPONENTS
// ============================================

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: any;
  delay?: number;
  onPress?: () => void;
  disabled?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  delay = 0,
  onPress,
  disabled = false,
}) => {
  const { translateY, opacity } = useSlideUp(400, delay);
  const { scale, onPressIn, onPressOut } = useScale();

  const handlePress = () => {
    if (onPress && !disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.card,
          style,
          {
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
  style?: any;
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  children,
  index,
  style,
}) => {
  const animations = useStaggeredAnimation(1, index * 100);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: animations[0]?.opacity || 1,
          transform: [{ translateY: animations[0]?.translateY || 0 }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

interface AnimatedBadgeProps {
  text: string;
  color?: string;
  animated?: boolean;
  style?: any;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text,
  color = '#6366f1',
  animated = false,
  style,
}) => {
  const pulse = usePulse();

  return (
    <Animated.View
      style={[
        styles.badge,
        { backgroundColor: color },
        style,
        animated && { transform: [{ scale: pulse }] },
      ]}
    >
      <Text style={styles.badgeText}>{text}</Text>
    </Animated.View>
  );
};

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
}) => {
  const { scale, onPressIn, onPressOut } = useScale();

  const colors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    danger: '#ef4444',
    ghost: 'transparent',
  };

  const heights = {
    small: 36,
    medium: 44,
    large: 52,
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.button,
          {
            height: heights[size],
            backgroundColor: variant === 'ghost' ? 'transparent' : colors[variant],
            borderWidth: variant === 'ghost' ? 1 : 0,
            borderColor: '#6366f1',
            opacity: disabled ? 0.5 : 1,
            transform: [{ scale }],
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'ghost' ? '#6366f1' : '#fff'} />
        ) : (
          <View style={styles.buttonContent}>
            {icon}
            <Text
              style={[
                styles.buttonText,
                variant === 'ghost' && { color: '#6366f1' },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  animated?: boolean;
  style?: any;
}

export const AnimatedProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#6366f1',
  height = 8,
  animated = true,
  style,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: Math.min(progress, 100),
        duration: 500,
        useNativeDriver: false,
        easing: Easing.out(Easing.cubic),
      }).start();
    } else {
      progressAnim.setValue(Math.min(progress, 100));
    }
  }, [progress, animated, progressAnim]);

  return (
    <View style={[styles.progressContainer, { height }, style]}>
      <Animated.View
        style={[
          styles.progressBar,
          { backgroundColor: color },
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

interface SkeletonProps {
  width?: number | string;
  height?: number;
  circle?: boolean;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  circle = false,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [shimmer]);

  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: circle ? height / 2 : 4,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [
              {
                translateX: shimmer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 200],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

interface TypingIndicatorProps {
  style?: any;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ style }) => {
  const [dots] = useState(() =>
    Array.from({ length: 3 }, () => new Animated.Value(0))
  );

  useEffect(() => {
    const animations = dots.map((dot, index) =>
      Animated.sequence([
        Animated.delay(index * 150),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        ),
      ])
    );

    Animated.parallel(animations).start();
  }, [dots]);

  return (
    <View style={[styles.typingContainer, style]}>
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={[
            styles.typingDot,
            {
              opacity: dot,
              transform: [
                {
                  translateY: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -4],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: number;
  style?: any;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 12,
  style,
}) => {
  const pulse = usePulse();

  const colors = {
    online: '#22c55e',
    offline: '#6b7280',
    busy: '#ef4444',
    away: '#f59e0b',
  };

  return (
    <Animated.View
      style={[
        styles.statusIndicator,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors[status],
          transform: status === 'online' ? [{ scale: pulse }] : undefined,
        },
        style,
      ]}
    />
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  skeleton: {
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  shimmer: {
    width: 200,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
  },
  statusIndicator: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default {
  AnimatedCard,
  AnimatedListItem,
  AnimatedBadge,
  AnimatedButton,
  AnimatedProgressBar,
  Skeleton,
  TypingIndicator,
  StatusIndicator,
  useFadeIn,
  useSlideUp,
  useScale,
  usePulse,
  useStaggeredAnimation,
};
