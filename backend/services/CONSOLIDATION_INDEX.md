# Service Consolidation Plan

This document outlines the plan to consolidate duplicate services in the kaytx platform.

## Identified Duplicates

### 1. Memory Services (4 versions → 1)
**Duplicate Files:**
- `agent-memory-service.ts`
- `consolidated-memory-service.ts`
- `unified-memory-management-service.ts`
- `unified-memory-service.ts`

**Action:** Consolidate into `consolidated-memory-service.ts`
**Reason:** `consolidated-memory-service.ts` already has the most complete implementation

### 2. Audit Services (3 versions → 1)
**Duplicate Files:**
- `consolidated-audit-service.ts`
- `security-audit-service.ts`
- `unified-audit-service.ts`

**Action:** Consolidate into `consolidated-audit-service.ts`
**Reason:** `consolidated-audit-service.ts` has the most comprehensive features

### 3. Platform Sync Services (2 versions → 1)
**Duplicate Files:**
- `consolidated-platform-sync-service.ts`
- `platform-data-sync-service.ts`

**Action:** Consolidate into `consolidated-platform-sync-service.ts`
**Reason:** Already has unified sync logic

### 4. Decision Logging (2 versions → 1)
**Duplicate Files:**
- `consolidated-decision-logging-service.ts`
- `decision-logger.ts`

**Action:** Consolidate into `consolidated-decision-logging-service.ts`
**Reason:** More complete implementation with service structure

### 5. Error Recovery (2 versions → 1)
**Duplicate Files:**
- `consolidated-error-recovery-service.ts`
- `error-recovery-service.ts`

**Action:** Consolidate into `consolidated-error-recovery-service.ts`
**Reason:** More comprehensive error handling

## Consolidation Steps

### Phase 1: Memory Service Consolidation
1. Review `consolidated-memory-service.ts` as base
2. Merge useful code from other memory services
3. Update all imports to use single service
4. Delete duplicate files
5. Run tests

### Phase 2: Audit Service Consolidation
1. Use `consolidated-audit-service.ts` as base
2. Merge security audit features
3. Update imports
4. Delete duplicates
5. Verify tests

### Phase 3: Platform Sync Consolidation
1. Extend `consolidated-platform-sync-service.ts`
2. Add missing methods from `platform-data-sync-service.ts`
3. Update imports
4. Delete duplicate

### Phase 4: Decision Logging Consolidation
1. Keep `consolidated-decision-logging-service.ts`
2. Merge `decision-logger.ts` utilities
3. Update imports
4. Delete duplicate

### Phase 5: Error Recovery Consolidation
1. Use `consolidated-error-recovery-service.ts`
2. Add missing methods from `error-recovery-service.ts`
3. Update imports
4. Delete duplicate

## Migration Commands

After consolidation, run:

```bash
# Update imports in affected files
# Example: Find all imports of removed services
grep -r "from.*agent-memory-service" backend/
grep -r "from.*unified-memory-service" backend/

# Update to consolidated service
sed -i 's|@/services/agent-memory-service|@/services/consolidated-memory-service|g' backend/**/*.ts
```

## Validation Checklist

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] No runtime errors in development
- [ ] Code coverage maintained (80%+)
- [ ] Documentation updated
- [ ] API documentation synchronized
