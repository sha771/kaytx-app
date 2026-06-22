const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app', 'ai-agent');
const gamingDir = path.join(baseDir, 'gaming-esports');
const gamingSubDir = path.join(gamingDir, 'sub-agents');

// Create directories
if (!fs.existsSync(gamingDir)) {
  fs.mkdirSync(gamingDir, { recursive: true });
}
if (!fs.existsSync(gamingSubDir)) {
  fs.mkdirSync(gamingSubDir, { recursive: true });
}

// Icons from lucide-react-native
const icons = [
  'Gamepad2', 'Trophy', 'Users', 'Monitor', 'Headphones',
  'Video', 'ChartBarBig', 'Target', 'Zap', 'Crown',
  'Star', 'Award', 'Medal', 'Sword', 'Shield',
  'Flame', 'Sparkles', 'Rocket', 'TrendingUp', 'Activity',
  'Globe', 'MessageSquare', 'Calendar', 'Clock', 'Settings',
  'Database', 'Server', 'Cloud', 'Lock', 'Key',
  'Eye', 'EyeOff', 'Fingerprint', 'Scan', 'Search',
  'Filter', 'Sort', 'Sliders', 'Maximize', 'Minimize'
];

// Gaming & Esports - 10 Main Agents
const mainAgents = [
  {
    id: 'esports-director',
    name: 'AI Esports Director',
    title: 'AI Esports Director',
    description: 'The AI Esports Director oversees all competitive gaming operations, tournament management, team strategy, and esports business development.',
    capabilities: ['Tournament Management', 'Team Strategy', 'Player Development', 'Sponsor Relations', 'Broadcast Coordination', 'Revenue Optimization', 'Analytics', 'Brand Management'],
    icon: 'Trophy',
    color: '#9C27B0',
    type: 'employee',
    humanCost: '$175k/year',
    aiCost: '$4k/year',
    efficiency: '44x efficiency improvement',
    level: 'director',
    reportsTo: 'ceo'
  },
  {
    id: 'game-producer',
    name: 'AI Game Producer',
    title: 'AI Game Producer',
    description: 'The AI Game Producer manages game development pipelines, coordinates cross-functional teams, and ensures timely delivery of high-quality gaming experiences.',
    capabilities: ['Project Management', 'Team Coordination', 'Quality Assurance', 'Timeline Management', 'Budget Control', 'Stakeholder Communication', 'Risk Management', 'Delivery Excellence'],
    icon: 'Gamepad2',
    color: '#E91E63',
    type: 'employee',
    humanCost: '$145k/year',
    aiCost: '$3k/year',
    efficiency: '48x efficiency improvement',
    level: 'manager',
    reportsTo: 'cto'
  },
  {
    id: 'esports-analyst',
    name: 'AI Esports Analyst',
    title: 'AI Esports Analyst',
    description: 'The AI Esports Analyst provides deep competitive intelligence, match analysis, player performance metrics, and strategic insights for teams and organizations.',
    capabilities: ['Match Analysis', 'Player Performance Tracking', 'Competitive Intelligence', 'Strategy Development', 'Data Visualization', 'Predictive Analytics', 'Scouting Reports', 'Meta Analysis'],
    icon: 'ChartBarBig',
    color: '#2196F3',
    type: 'employee',
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    level: 'analyst',
    reportsTo: 'esports-director'
  },
  {
    id: 'community-manager',
    name: 'AI Gaming Community Manager',
    title: 'AI Gaming Community Manager',
    description: 'The AI Gaming Community Manager builds and engages gaming communities across platforms, moderates discussions, and fosters positive player relationships.',
    capabilities: ['Community Building', 'Social Media Management', 'Content Moderation', 'Event Coordination', 'Player Support', 'Feedback Collection', 'Crisis Management', 'Brand Advocacy'],
    icon: 'Users',
    color: '#4CAF50',
    type: 'employee',
    humanCost: '$75k/year',
    aiCost: '$2k/year',
    efficiency: '38x efficiency improvement',
    level: 'manager',
    reportsTo: 'esports-director'
  },
  {
    id: 'stream-coordinator',
    name: 'AI Stream Coordinator',
    title: 'AI Stream Coordinator',
    description: 'The AI Stream Coordinator manages live streaming operations, content schedules, technical setup, and viewer engagement for gaming content creators.',
    capabilities: ['Stream Management', 'Content Scheduling', 'Technical Setup', 'Viewer Engagement', 'Analytics Tracking', 'Multi-platform Coordination', 'Quality Control', 'Monetization Strategy'],
    icon: 'Video',
    color: '#FF5722',
    type: 'employee',
    humanCost: '$65k/year',
    aiCost: '$2k/year',
    efficiency: '33x efficiency improvement',
    level: 'coordinator',
    reportsTo: 'esports-director'
  },
  {
    id: 'tournament-organizer',
    name: 'AI Tournament Organizer',
    title: 'AI Tournament Organizer',
    description: 'The AI Tournament Organizer plans and executes esports tournaments, manages brackets, handles registrations, and ensures fair competition standards.',
    capabilities: ['Tournament Planning', 'Bracket Management', 'Registration Systems', 'Rule Enforcement', 'Scheduling', 'Prize Distribution', 'Venue Coordination', 'Broadcast Integration'],
    icon: 'Target',
    color: '#FFC107',
    type: 'employee',
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '43x efficiency improvement',
    level: 'manager',
    reportsTo: 'esports-director'
  },
  {
    id: 'game-designer',
    name: 'AI Game Designer',
    title: 'AI Game Designer',
    description: 'The AI Game Designer creates engaging game mechanics, balanced gameplay systems, and immersive player experiences across various gaming genres.',
    capabilities: ['Game Mechanics Design', 'Balance Tuning', 'Level Design', 'Player Progression Systems', 'UI/UX Design', 'Narrative Design', 'Prototyping', 'Playtesting Analysis'],
    icon: 'Sparkles',
    color: '#9C27B0',
    type: 'employee',
    humanCost: '$105k/year',
    aiCost: '$3k/year',
    efficiency: '35x efficiency improvement',
    level: 'designer',
    reportsTo: 'game-producer'
  },
  {
    id: 'esports-marketing-manager',
    name: 'AI Esports Marketing Manager',
    title: 'AI Esports Marketing Manager',
    description: 'The AI Esports Marketing Manager develops and executes marketing campaigns, manages sponsor partnerships, and drives audience growth for esports brands.',
    capabilities: ['Campaign Strategy', 'Sponsor Management', 'Brand Partnerships', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'Budget Management', 'ROI Tracking'],
    icon: 'Rocket',
    color: '#E91E63',
    type: 'employee',
    humanCost: '$95k/year',
    aiCost: '$2k/year',
    efficiency: '48x efficiency improvement',
    level: 'manager',
    reportsTo: 'esports-director'
  },
  {
    id: 'player-development-coach',
    name: 'AI Player Development Coach',
    title: 'AI Player Development Coach',
    description: 'The AI Player Development Coach analyzes player performance, creates training programs, and provides personalized coaching to improve competitive gaming skills.',
    capabilities: ['Performance Analysis', 'Training Program Design', 'Skill Development', 'Mental Conditioning', 'VOD Review', 'Strategy Coaching', 'Progress Tracking', 'Scout Evaluation'],
    icon: 'TrendingUp',
    color: '#4CAF50',
    type: 'employee',
    humanCost: '$85k/year',
    aiCost: '$2k/year',
    efficiency: '43x efficiency improvement',
    level: 'coach',
    reportsTo: 'esports-director'
  },
  {
    id: 'esports-operations-manager',
    name: 'AI Esports Operations Manager',
    title: 'AI Esports Operations Manager',
    description: 'The AI Esports Operations Manager oversees daily operations, facility management, team logistics, and operational efficiency for esports organizations.',
    capabilities: ['Operations Management', 'Facility Coordination', 'Team Logistics', 'Resource Allocation', 'Process Optimization', 'Vendor Management', 'Budget Control', 'Reporting'],
    icon: 'Settings',
    color: '#607D8B',
    type: 'employee',
    humanCost: '$90k/year',
    aiCost: '$2k/year',
    efficiency: '45x efficiency improvement',
    level: 'manager',
    reportsTo: 'esports-director'
  }
];

// Gaming & Esports - 30 Sub-Agents
const subAgents = [
  { id: 'cast-producer', name: 'AI Cast Producer', description: 'Manages esports broadcast production and commentary coordination.' },
  { id: 'observer-director', name: 'AI Observer Director', description: 'Controls spectator camera angles and observer modes for broadcasts.' },
  { id: 'stats-tracker', name: 'AI Stats Tracker', description: 'Tracks and displays real-time game statistics during matches.' },
  { id: 'anti-cheat-specialist', name: 'AI Anti-Cheat Specialist', description: 'Monitors and detects cheating in competitive gaming environments.' },
  { id: 'referee-bot', name: 'AI Referee Bot', description: 'Enforces game rules and handles dispute resolution.' },
  { id: 'draft-analyst', name: 'AI Draft Analyst', description: 'Analyzes draft strategies and provides pick/ban recommendations.' },
  { id: 'meta-researcher', name: 'AI Meta Researcher', description: 'Researches and tracks current game meta trends and strategies.' },
  { id: 'vod-reviewer', name: 'AI VOD Reviewer', description: 'Reviews gameplay footage for analysis and improvement insights.' },
  { id: 'scout-bot', name: 'AI Scout Bot', description: 'Scouts and evaluates potential player talent across servers.' },
  { id: 'team-composition-analyst', name: 'AI Team Composition Analyst', description: 'Analyzes optimal team compositions and synergies.' },
  { id: 'social-media-automation', name: 'AI Social Media Automation', description: 'Automates social media posting and engagement for gaming brands.' },
  { id: 'content-moderator', name: 'AI Content Moderator', description: 'Moderates chat and community content for toxicity and policy violations.' },
  { id: 'discord-manager', name: 'AI Discord Manager', description: 'Manages Discord servers, bots, and community engagement.' },
  { id: 'ticket-support', name: 'AI Ticket Support', description: 'Handles player support tickets and issue resolution.' },
  { id: 'faq-bot', name: 'AI FAQ Bot', description: 'Provides automated answers to frequently asked questions.' },
  { id: 'stream-tech', name: 'AI Stream Tech', description: 'Manages technical aspects of live streaming setup and troubleshooting.' },
  { id: 'overlay-manager', name: 'AI Overlay Manager', description: 'Designs and manages on-screen overlays for streams.' },
  { id: 'audio-engineer', name: 'AI Audio Engineer', description: 'Manages audio quality and sound levels for broadcasts.' },
  { id: 'clip-editor', name: 'AI Clip Editor', description: 'Automatically creates and edits highlight clips from streams.' },
  { id: 'thumbnail-generator', name: 'AI Thumbnail Generator', description: 'Generates engaging thumbnails for video content.' },
  { id: 'bracket-manager', name: 'AI Bracket Manager', description: 'Manages tournament brackets and match scheduling.' },
  { id: 'registration-bot', name: 'AI Registration Bot', description: 'Handles tournament registrations and player verification.' },
  { id: 'prize-distributor', name: 'AI Prize Distributor', description: 'Manages prize pool distribution and payment processing.' },
  { id: 'rule-enforcer', name: 'AI Rule Enforcer', description: 'Ensures compliance with tournament rules and regulations.' },
  { id: 'level-designer', name: 'AI Level Designer', description: 'Designs and balances game levels and maps.' },
  { id: 'qa-tester', name: 'AI QA Tester', description: 'Automated testing for game bugs and issues.' },
  { id: 'ux-researcher', name: 'AI UX Researcher', description: 'Conducts user experience research and testing.' },
  { id: 'monetization-specialist', name: 'AI Monetization Specialist', description: 'Optimizes in-game monetization strategies.' },
  { id: 'analytics-dashboard', name: 'AI Analytics Dashboard', description: 'Provides comprehensive analytics and reporting dashboards.' },
  { id: 'inventory-manager', name: 'AI Inventory Manager', description: 'Manages gaming equipment and inventory logistics.' }
];

function generateAgentFile(agent, isSubAgent = false) {
  const iconIndex = icons.indexOf(agent.icon) !== -1 ? icons.indexOf(agent.icon) : Math.floor(Math.random() * icons.length);
  const icon = isSubAgent ? icons[Math.floor(Math.random() * icons.length)] : agent.icon;
  
  let content = `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ${icon} } from 'lucide-react-native';

export default function ${agent.name.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const agent = {
    id: '${agent.id}',
    name: '${agent.name}',
    title: '${agent.title || agent.name}',
    description: '${agent.description}',
    capabilities: ${JSON.stringify(agent.capabilities || ['Task Automation', 'Data Processing', 'Workflow Management'])},
    icon: ${icon},
    color: '${agent.color}',
    type: '${agent.type || 'agent'}' as const,
    humanCost: '${agent.humanCost || '$50k/year'}',
    aiCost: '${agent.aiCost || '$1k/year'}',
    efficiency: '${agent.efficiency || '50x efficiency improvement'}',
    replacesRole: '${agent.id}'`;

  if (agent.level) {
    content += `,
    hierarchy: {
      department: 'Gaming & Esports',
      level: '${agent.level}',
      reportsTo: '${agent.reportsTo || 'esports-director'}'`;
    if (agent.manages) {
      content += `,
      manages: ${JSON.stringify(agent.manages)}`;
    }
    content += `
    }`;
  } else {
    content += `,
    hierarchy: {
      department: 'Gaming & Esports'`;
    if (agent.reportsTo) {
      content += `,
      reportsTo: '${agent.reportsTo}'`;
    }
    content += `
    }`;
  }

  content += `,
    infrastructure: {
      status: 'online',
      health: ${95 + Math.floor(Math.random() * 5)},
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: '${agent.level === 'director' ? 'enterprise' : 'standard'}',
    },
    roiMetrics: {
      savingsPerMonth: '$${Math.floor(Math.random() * 10) + 1},${Math.floor(Math.random() * 900) + 100}',
      tasksAutomatedDaily: ${Math.floor(Math.random() * 500) + 500},
      responseTime: '${(Math.random() * 2 + 0.5).toFixed(1)}s',
      accuracyRate: '${(Math.random() * 3 + 96).toFixed(1)}%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
`;

  return content;
}

// Generate main agents
mainAgents.forEach((agent, index) => {
  const fileName = `${agent.id}.tsx`;
  const filePath = path.join(gamingDir, fileName);
  fs.writeFileSync(filePath, generateAgentFile(agent));
  console.log(`Created: ${fileName}`);
});

// Generate sub-agents
subAgents.forEach((agent, index) => {
  const fileName = `${agent.id}.tsx`;
  const filePath = path.join(gamingSubDir, fileName);
  fs.writeFileSync(filePath, generateAgentFile(agent, true));
  console.log(`Created: sub-agents/${fileName}`);
});

console.log('\nGaming & Esports department created successfully!');
console.log(`- ${mainAgents.length} main agents`);
console.log(`- ${subAgents.length} sub-agents`);
