# Scanner Module

Responsible for traversing the codebase and extracting metadata about files, services, and dependencies.

## Components

- **FileScanner**: Traverses directories and collects file metadata
- **ASTParser**: Parses TypeScript files using TypeScript Compiler API
- **ImportExtractor**: Extracts import and export statements
- **MetadataCollector**: Aggregates file metadata

## Features

- Parallel scanning using worker threads
- Pattern-based file inclusion/exclusion
- Incremental scanning with file hash caching
- Support for TypeScript and JavaScript files

## Usage

```typescript
import { CodeScanner } from './scanner';

const scanner = new CodeScanner({
  includePatterns: ['**/*.ts', '**/*.tsx'],
  excludePatterns: ['**/node_modules/**'],
  parallelWorkers: 4,
});

const result = await scanner.scanDirectory('./backend');
```
