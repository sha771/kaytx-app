/**
 * Stub for react-native-web getStyleSheet internal
 * Fixes "getStyleSheet is not defined" error
 */

export function getStyleSheet(
  initialStyles: any,
  styleName: string,
  generalStyleName: string,
  platform: string
) {
  // Return the styles as-is for web platform
  return initialStyles;
}

export default getStyleSheet;
