# Reporter Module

Generates comprehensive reports in multiple formats (JSON, Markdown, HTML).

## Components

- **ReportGenerator**: Main report generation orchestrator
- **SummaryReporter**: Generates summary reports
- **DetailedReporter**: Generates detailed reports with all issues
- **ProgressReporter**: Tracks progress between scans
- **CertificationReporter**: Generates production-ready certification reports
- **Exporters**: Format-specific exporters (JSON, Markdown, HTML, PDF)

## Features

- Multi-format report export
- Progress tracking between scans
- Visual charts and graphs
- Actionable recommendations
- Certification criteria validation

## Usage

```typescript
import { ReportGenerator } from './reporter';

const reporter = new ReportGenerator({
  defaultFormat: 'markdown',
  includeGraphs: true,
});

const summary = reporter.generateSummaryReport(issues);
const detailed = reporter.generateDetailedReport(issues, scanResult);
const progress = reporter.generateProgressReport(currentIssues, previousIssues);

await reporter.exportReport(summary, 'markdown', './reports/summary.md');
```
