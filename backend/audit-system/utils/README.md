# Utils Module

Shared utility functions used across the audit system.

## Components

- **FileUtils**: File system operations (read, write, hash, copy)
- **PathUtils**: Path manipulation and normalization
- **HashUtils**: File hashing and content-addressable storage
- **StringUtils**: String similarity and comparison
- **DateUtils**: Date formatting and manipulation
- **LoggerUtils**: Structured logging utilities

## Features

- Safe file system operations
- Content-addressable storage using hashes
- String similarity algorithms (Jaccard, Levenshtein)
- Structured logging with levels
- Error handling utilities

## Usage

```typescript
import { FileUtils, HashUtils, StringUtils } from './utils';

// File operations
const content = await FileUtils.readFile('./path/to/file.ts');
const hash = HashUtils.hashContent(content);

// String similarity
const similarity = StringUtils.jaccardSimilarity(str1, str2);

// Logging
Logger.info('Scanning files...', { count: 100 });
```
