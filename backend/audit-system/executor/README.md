# Executor Module

Executes remediation actions with automatic backup, testing, and rollback capabilities.

## Components

- **SafeExecutor**: Orchestrates safe execution of remediation actions
- **BackupManager**: Creates and manages file backups
- **RollbackManager**: Restores files from backups
- **TestRunner**: Runs tests after each action
- **ActionExecutors**: Specific executors for each action type

## Features

- Automatic backup before modifications
- Test execution after each action
- Automatic rollback on test failure
- Dependency-ordered execution
- Transaction-like semantics for file operations

## Usage

```typescript
import { SafeExecutor } from './executor';

const executor = new SafeExecutor({
  testAfterEachAction: true,
  rollbackOnFailure: true,
});

const result = await executor.executeAction(action);
if (!result.success) {
  console.error('Action failed, rolled back:', result.error);
}
```
