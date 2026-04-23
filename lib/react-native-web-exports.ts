// Stubs for react-native-web missing exports

// createElement stub
export function unstable_createElement(type: any, props?: any, ...children: any[]) {
  return {
    type,
    props: { ...props, children },
    key: props?.key ?? null,
  };
}

// findNodeHandle stub
export function findNodeHandle(componentOrHandle: any): number | null {
  return null;
}

// processColor stub
export function processColor(color?: string | number): number | undefined {
  if (typeof color === 'number') return color;
  if (typeof color === 'string') {
    // Simple hex/rgb to number conversion would go here
    return 0;
  }
  return undefined;
}

// render stub
export function render(element: any, container: any, callback?: () => void) {
  if (callback) callback();
  return element;
}

// Default exports for compatibility
export default {
  unstable_createElement,
  findNodeHandle,
  processColor,
  render,
};
