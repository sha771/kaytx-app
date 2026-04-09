# Detector Module

Identifies specific code quality issues based on analysis results and predefined rules.

## Components

- **DuplicateServiceDetector**: Finds services with overlapping functionality
- **IncompleteImplementationDetector**: Identifies TODO comments and missing error handling
- **UnusedCodeDetector**: Finds unused imports, files, and dead code
- **ConfigurationDetector**: Identifies configuration conflicts and duplicates
- **SecurityDetector**: Detects security vulnerabilities
- **DocumentationDetector**: Finds missing documentation

## Features

- Similarity-based duplicate detection (Jaccard index)
- Pattern-based incomplete implementation detection
- Reference-based unused code detection
- Rule-based security vulnerability detection
- Configurable detection thresholds

## Usage

```typescript
import { IssueDetector } from './detector';

const detector = new IssueDetector({
  duplicateThreshold: 0.7,
  coverageThreshold: 0.8,
});

const duplicates = detector.detectDuplicateServices(graph, scanResult);
const incomplete = detector.detectIncompleteImplementations(scanResult);
const unused = detector.detectUnusedCode(graph);
```
