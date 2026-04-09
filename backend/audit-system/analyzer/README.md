# Analyzer Module

Performs deep analysis on scanned code to identify patterns, dependencies, and potential issues.

## Components

- **DependencyAnalyzer**: Builds dependency graphs and detects cycles
- **ComplexityAnalyzer**: Calculates code complexity metrics
- **CoverageAnalyzer**: Integrates with Jest coverage reports
- **SecurityAnalyzer**: Identifies security vulnerabilities

## Features

- Dependency graph construction with cycle detection (Tarjan's algorithm)
- Cyclomatic and cognitive complexity calculation
- Test coverage measurement and gap identification
- Security vulnerability detection based on OWASP guidelines

## Usage

```typescript
import { StaticAnalyzer } from './analyzer';

const analyzer = new StaticAnalyzer();
const graph = analyzer.analyzeDependencies(scanResult);
const complexity = analyzer.analyzeComplexity(fileMetadata);
const coverage = analyzer.analyzeTestCoverage(sourceFiles, testFiles);
```
