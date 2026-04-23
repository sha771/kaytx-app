import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './backend/db/drizzle-schema.ts',
  out: './backend/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/enterprise_db',
  },
  verbose: true,
  strict: true,
});
