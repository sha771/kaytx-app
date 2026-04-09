// Web stub for react-native-reanimated
// Provides mock implementations for web builds
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import type { ComponentType } from 'react';
import { View } from 'react-native';

// Reanimated exports mock
export const Animated = {
  View: View,
  Text: View,
  Image: View,
  ScrollView: View,
  FlatList: View,
  createAnimatedComponent: <P extends object>(Component: ComponentType<P>): ComponentType<P> => Component,
};

// Layout animations (mock)
export const FadeIn = { duration: 300 };
export const FadeInUp = { duration: 300 };
export const FadeInDown = { duration: 300 };
export const FadeInLeft = { duration: 300 };
export const FadeInRight = { duration: 300 };
export const FadeOut = { duration: 300 };
export const FadeOutUp = { duration: 300 };
export const FadeOutDown = { duration: 300 };
export const BounceIn = { duration: 300 };
export const BounceOut = { duration: 300 };
export const SlideInLeft = { duration: 300 };
export const SlideInRight = { duration: 300 };
export const SlideOutLeft = { duration: 300 };
export const SlideOutRight = { duration: 300 };
export const ZoomIn = { duration: 300 };
export const ZoomOut = { duration: 300 };

// Entry/Exit animations
export const Layout = { duration: 300 };
export const Easing = {
  linear: (t: number): number => t,
  ease: (t: number): number => t,
  quad: (t: number): number => t * t,
  cubic: (t: number): number => t * t * t,
};

// Worklets (mock)
export function runOnUI<T extends (...args: any[]) => any>(worklet: T): T {
  return worklet;
}

export function runOnJS<T extends (...args: any[]) => any>(fn: T): T {
  return fn;
}

export function useSharedValue<T>(initial: T): { value: T } {
  const [value, setValue] = React.useState(initial);
  return {
    get value() { return value; },
    set value(v: T) { setValue(v); },
  };
}

export function useAnimatedStyle<T extends object>(styleWorklet: () => T): T {
  return styleWorklet() || {} as T;
}

export function useAnimatedProps<T extends object>(propsWorklet: () => T): T {
  return propsWorklet() || {} as T;
}

export function useAnimatedReaction<T>(prepare: () => T, react: (result: T) => void): void {
   
  React.useEffect(() => {
    const result = prepare();
    react(result);
  }, []);
}

export function useAnimatedGestureHandler<T extends Record<string, (...args: any[]) => any>>(handlers: T): T {
  return handlers;
}

export function useAnimatedScrollHandler<T extends Record<string, (...args: any[]) => any>>(handlers: T): T {
  return handlers;
}

export function cancelAnimation(sharedValue: { value: unknown }): void {
  // Mock implementation
}

export function withTiming(toValue: number, config?: object, callback?: (finished: boolean) => void): number {
  if (callback) callback(true);
  return toValue;
}

export function withSpring(toValue: number, config?: object, callback?: (finished: boolean) => void): number {
  if (callback) callback(true);
  return toValue;
}

export function withDecay(config?: object, callback?: (finished: boolean) => void): number {
  if (callback) callback(true);
  return 0;
}

export function withDelay(delay: number, animation: unknown): unknown {
  return animation;
}

export function withSequence(...animations: unknown[]): unknown {
  return animations[animations.length - 1];
}

export function withRepeat(animation: unknown, numberOfReps?: number, reverse?: boolean, callback?: (finished: boolean) => void): unknown {
  if (callback) callback(true);
  return animation;
}

export function interpolate(value: number, inputRange: number[], outputRange: number[], extrapolate?: string): number {
  return outputRange[0] || 0;
}

export function interpolateColor(value: number, inputRange: number[], outputRange: string[]): string {
  return outputRange[0] || '#000';
}

export function Extrapolation(): { CLAMP: string; EXTEND: string; IDENTITY: string } {
  return { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
}

export function measure(ref: React.RefObject<any>): { x: number; y: number; width: number; height: number; pageX: number; pageY: number } {
  return { x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 };
}

export function scrollTo(ref: React.RefObject<any>, x: number, y: number, animated: boolean): void {
  // Mock implementation
}

export function dispatchCommand(ref: React.RefObject<any>, command: string, args?: unknown[]): void {
  // Mock implementation
}

export const SensorType = {
  ACCELEROMETER: 'accelerometer',
  GYROSCOPE: 'gyroscope',
  GRAVITY: 'gravity',
  MAGNETIC_FIELD: 'magnetic_field',
  ROTATION: 'rotation',
};

export function useAnimatedSensor(sensorType: string, config?: object): { sensor: { value: { x: number; y: number; z: number } } } {
  return { sensor: { value: { x: 0, y: 0, z: 0 } } };
}

export function useFrameCallback(callback: (frameInfo: { timestamp: number }) => void): void {
   
  React.useEffect(() => {
    const id = requestAnimationFrame(callback as FrameRequestCallback);
    return () => cancelAnimationFrame(id);
  }, []);
}

export function useAnimatedRef(): React.RefObject<any> {
  return React.useRef(null);
}

export function withClamp(config: { min?: number; max?: number }, animation: unknown): unknown {
  return animation;
}

export function createWorkletRuntime(name: string): object {
  return {};
}

export function makeMutable<T>(initial: T): { value: T } {
  return { value: initial };
}

export function makeShareableCloneRecursive<T>(value: T): T {
  return value;
}

// Reanimated 2 compatibility
export default {
  Animated,
  FadeIn,
  FadeInUp,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutUp,
  FadeOutDown,
  BounceIn,
  BounceOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
  Layout,
  Easing,
  runOnUI,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  cancelAnimation,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  interpolateColor,
  measure,
  scrollTo,
  dispatchCommand,
  SensorType,
  useAnimatedSensor,
  useFrameCallback,
  useAnimatedRef,
  withClamp,
  createWorkletRuntime,
  makeMutable,
  makeShareableCloneRecursive,
};
