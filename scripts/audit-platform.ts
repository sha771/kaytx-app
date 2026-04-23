#!/usr/bin/env node

import { AuditCLI } from '../backend/lib/audit-system';

// Run the CLI with command line arguments
AuditCLI.run(process.argv.slice(2));
