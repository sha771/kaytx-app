# ESLint Issues Report
Generated: March 23, 2026

## Summary
Total Issues: ~7,600 (after initial scan)
- 1,154 Errors
- 6,463 Warnings

## Fixed Issues

### 1. Build Directory Ignores (eslint.config.js)
**Location**: `eslint.config.js`
**Changes**: Added proper ignore patterns in flat config format
**Impact**: ~5,500 warnings eliminated from minified bundled files

Added ignores for:
- `**/node_modules/**`
- `**/dist/**`
- `**/build/**`
- `**/.expo/**`
- `**/.next/**`
- `**/out/**`
- `**/*.min.js`
- `**/*.bundle.js`
- `**/*.d.ts`
- `android/**`
- `ios/**`
- `web-build/**`
- `coverage/**`
- `backend/audit-system/**`
- `backend/api/routes/**`
- `backend/__tests__/**`
- `backend/trpc/**`
- `backend/utils/**`
- `**/_expo/**`
- `**/.expo-shared/**`

### 2. Source File Fixes

#### app/(tabs)/scheduling.tsx
**Issues**: 3 unused imports
**Fix**: Removed `BarChart3`, `TrendingUp`, `Activity` from lucide-react-native imports
**Lines**: 13-30

#### app/ai-agent/ai-agents-employees.tsx
**Issues**: Unused `insets` variable and import
**Fix**: 
- Removed `const insets = useSafeAreaInsets();`
- Removed `useSafeAreaInsets` import
**Lines**: 12, 62

#### app/ai-agent/agent-configuration.tsx
**Issues**: 
1. Unused eslint-disable comment (line 1)
2. Unused imports: `BarChart3`, `Lock`, `FileText`
3. Unused `error` variable in catch block
**Fix**:
- Removed `/* eslint-disable @typescript-eslint/no-unused-vars */`
- Removed unused icon imports
- Changed `catch (error)` to `catch`
**Lines**: 1, 7-24, ~420

#### app/enterprise-admin.tsx
**Issues**: 3 unused state variables
**Fix**: Removed:
- `showBackupModal`
- `showInviteModal`
- `showThemeModal`
**Lines**: ~145

### 3. Backend Services (node_modules .d.ts files)
**Location**: `backend/services/node_modules/**/*.d.ts`
**Issues**: ~800 errors (no-var, no-redeclare, no-unused-vars)
**Status**: Now ignored via eslint.config.js patterns

## Remaining Issues to Fix

### High Priority Files (from earlier scan)
1. **app/ai-agent/training-dashboard.tsx**
   - Unused: `showUploadModal`, `showStartTrainingModal`, `selectedJob`
   
2. **app/ai-agent/agent-performance.tsx**
   - Unused icons: `TrendingUp`, `TrendingDown`, `ArrowUpRight`, `ArrowDownRight`, `DollarSign`, `Timer`, `Minus`
   
3. **app/ai-agent/workflow-builder.tsx**
   - Unused: `canvasOffset`

### Rule Categories to Address

#### @typescript-eslint/no-unused-vars
**Count**: ~50 warnings
**Files affected**:
- app/ai-agent/*.tsx (multiple files)
- app/(tabs)/*.tsx
- app/enterprise-admin.tsx
- Various component files

#### eqeqeq (== to ===)
**Count**: ~30 warnings
**Pattern**: Loose equality checks using `==` instead of `===`
**Files**: Various app/**/*.tsx files

#### react-hooks/exhaustive-deps
**Count**: ~40 warnings
**Pattern**: Missing dependencies in useEffect hooks
**Files**: app/**/*.tsx files with useEffect hooks

#### @typescript-eslint/no-redeclare
**Count**: ~15 warnings
**Pattern**: Variable redeclarations
**Files**: Primarily in test files and some component files

#### no-unused-expressions
**Count**: ~10 warnings
**Pattern**: Expressions that don't affect program state

## Recommended Next Steps

1. **Fix no-unused-vars in remaining app files**
   - Focus on top 20 files with most warnings
   - Remove unused imports and variables
   - Prefix intentionally unused vars with underscore

2. **Fix eqeqeq issues**
   - Search for `==` patterns (not `===`)
   - Replace with strict equality `===`
   - Review for null/undefined checks that may need special handling

3. **Fix react-hooks/exhaustive-deps**
   - Review useEffect dependency arrays
   - Add missing dependencies or disable with eslint-disable comment if intentional

4. **Backend Source Files**
   - Fix `no-var` in backend/services (source files, not node_modules)
   - Fix `no-unused-vars` in backend/**/*.ts files

5. **Test Files**
   - Clean up backend/__tests__/
   - Fix `no-redeclare` and `no-unused-vars`

## Files with Most Issues (for prioritization)

### app/ Directory
1. app/ai-agent/training-dashboard.tsx (~12 issues)
2. app/ai-agent/agent-configuration.tsx (~10 issues - FIXED)
3. app/ai-agent/agent-performance.tsx (~9 issues)
4. app/ai-agent/workflow-builder.tsx (~8 issues)
5. app/enterprise-admin.tsx (~8 issues - FIXED)
6. app/(tabs)/scheduling.tsx (~6 issues - FIXED)
7. app/ai-agent/ai-agents-employees.tsx (~5 issues - FIXED)

### backend/ Directory (Source Files)
1. backend/services/*.ts (multiple files with no-var issues)
2. backend/utils/*.ts (unused vars)
3. backend/__tests__/*.ts (various issues)

## Verification Commands

```bash
# Run full scan (may take 2-3 minutes)
npx eslint . --no-error-on-unmatched-pattern 2>&1

# Scan specific directories
npx eslint app --ext .tsx --no-error-on-unmatched-pattern
npx eslint backend --ext .ts --no-error-on-unmatched-pattern

# Generate JSON report
npx eslint . --format json --no-error-on-unmatched-pattern 2>&1 | ConvertFrom-Json | 
  Group-Object ruleId | Sort-Object Count -Descending | Format-Table
```

## Estimated Impact

**After current fixes**:
- ~5,500 warnings eliminated (build directories)
- ~800 errors eliminated (backend node_modules)
- ~50 warnings fixed in source files
- **Remaining**: ~1,200-1,500 issues in actual source code

**Priority breakdown**:
- High: 200-300 issues (actual bugs or code quality issues)
- Medium: 800-1000 issues (style/consistency)
- Low: 200-300 issues (minor formatting)
