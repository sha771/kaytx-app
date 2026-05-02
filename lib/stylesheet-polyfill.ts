/**
 * StyleSheet polyfill for react-native-web
 * Fixes "StyleSheet.create is not a function" error
 */

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  flatten: (style: any) => style,
  compose: (style1: any, style2: any) => [style1, style2],
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  } as const,
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  } as const,
  hairlineWidth: 1,
};

export default StyleSheet;
