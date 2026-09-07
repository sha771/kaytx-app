# Patches for Package Resolution Issues

This directory contains patches to fix package resolution issues with pnpm and Metro bundler.

## Files

### `empty-css.js`
Empty module placeholder for CSS imports. This allows CSS modules to be resolved without errors in React Native/Expo builds.

### `fix-pnpm-exports.js`
Script to fix pnpm package.json exports configuration. This resolves issues where pnpm symlinks point to non-existent files.

## Issues Fixed

1. **pnpm package.json exports warnings** - Removed invalid exports fields from package.json files that point to non-existent files
2. **CSS module import errors** - Added CSS handling in metro.config.js to resolve CSS modules

## How to Apply

Run the fix script:
```bash
node patches/fix-pnpm-exports.js
```

## Configuration Changes

### `.npmrc`
Added pnpm configuration to improve compatibility:
- `node-linker=hoisted` - Use node-modules layout for better compatibility
- `auto-install-peers=true` - Enable auto-install-peers

### `metro.config.js`
Added CSS module handling:
- Added `css` and `module.css` to source extensions
- Added custom `resolveRequest` to handle CSS imports by returning an empty module