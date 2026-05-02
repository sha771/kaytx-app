/**
 * Patched react-native-web exports for web compatibility
 * Fixes StyleSheet.create is not a function error
 */

// @ts-nocheck
import * as RNWeb from 'react-native-web';

// Create a robust StyleSheet implementation
const createStyleSheet = () => {
  const registry = new Map();
  let id = 0;

  return {
    create: <T extends Record<string, any>>(styles: T): T => {
      const result = {} as T;
      for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
          const styleId = `style_${++id}`;
          registry.set(styleId, styles[key]);
          result[key] = styles[key];
        }
      }
      return result;
    },
    flatten: (style: any) => {
      if (Array.isArray(style)) {
        return Object.assign({}, ...style.map(s => s || {}));
      }
      return style || {};
    },
    compose: (style1: any, style2: any) => {
      return [style1, style2];
    },
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    absoluteFillObject: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    hairlineWidth: 1,
  };
};

// Use native StyleSheet if available, otherwise use our implementation
let StyleSheet;
if (RNWeb.StyleSheet && typeof RNWeb.StyleSheet.create === 'function') {
  StyleSheet = RNWeb.StyleSheet;
} else {
  StyleSheet = createStyleSheet();
}

// Export everything from react-native-web EXCEPT StyleSheet
export const {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Button,
  FlatList,
  SectionList,
  Switch,
  ActivityIndicator,
  Modal,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Animated,
  Platform,
  Dimensions,
  PixelRatio,
  LayoutAnimation,
  UIManager,
  Alert,
  AppRegistry,
  AppState,
  AsyncStorage,
  BackHandler,
  Clipboard,
  DeviceEventEmitter,
  DeviceInfo,
  Easing,
  InteractionManager,
  Keyboard,
  Linking,
  NativeModules,
  PanResponder,
  PermissionsAndroid,
  Settings,
  Share,
  Systrace,
  TimePickerAndroid,
  ToastAndroid,
  Vibration,
  YellowBox,
  findNodeHandle,
  processColor,
  render,
  unmountComponentAtNode,
  NativeEventEmitter,
  I18nManager,
  LogBox,
  requireNativeComponent,
  unstable_batchedUpdates,
  useColorScheme,
  useWindowDimensions,
  AccessibilityInfo,
  Appearance,
} = RNWeb;

// Export the working StyleSheet
export { StyleSheet };

// Create a patched default export that includes the working StyleSheet
const PatchedRNWeb = {
  ...RNWeb,
  StyleSheet,
};

// Default export with patched StyleSheet
export default PatchedRNWeb;
