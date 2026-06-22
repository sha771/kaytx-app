/**
 * Agents Brain Configuration
 * Default configuration for the brain system
 * Supports per-agent brains
 */

import { BrainConfig } from './types';

export const DEFAULT_BRAIN_CONFIG: BrainConfig = {
  brainPath: '/agents-brain',
  rawSourcesPath: '/agents-brain/raw',
  wikiPath: '/agents-brain/wiki',
  schemaPath: '/agents-brain/schema',
  indexPath: '/agents-brain/index.md',
  manifestPath: '/agents-brain/.manifest.json',
  logPath: '/agents-brain/log.md',
  maxContextWindow: 128000,
  embeddingModel: 'text-embedding-3-small',
  enableSemanticSearch: true,
};

/**
 * Get configuration for a specific agent's brain
 */
export function getAgentBrainConfig(agentId: string): BrainConfig {
  const basePath = `/agents-brain/agents/${agentId}`;
  
  return {
    brainPath: basePath,
    rawSourcesPath: `${basePath}/raw`,
    wikiPath: `${basePath}/wiki`,
    schemaPath: `${basePath}/schema`,
    indexPath: `${basePath}/index.md`,
    manifestPath: `${basePath}/.manifest.json`,
    logPath: `${basePath}/log.md`,
    maxContextWindow: 128000,
    embeddingModel: 'text-embedding-3-small',
    enableSemanticSearch: true,
  };
}

export const BRAIN_DIRECTORY_STRUCTURE = {
  raw: '/agents-brain/raw',
  wiki: '/agents-brain/wiki',
  schema: '/agents-brain/schema',
  index: '/agents-brain/index.md',
  manifest: '/agents-brain/.manifest.json',
  log: '/agents-brain/log.md',
  agentsBase: '/agents-brain/agents',
};

export const SUPPORTED_SOURCE_TYPES = [
  'document',
  'pdf',
  'markdown',
  'json',
  'text',
  'image',
] as const;

export const WIKILINK_PATTERN = /\[\[([^\]]+)\]\]/g;

export const YAML_FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---\n/;
