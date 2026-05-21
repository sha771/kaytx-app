const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'shaida the agents lib by shaida', 'ai agents 1108');
const content = fs.readFileSync(filePath, 'utf-8');

// Split into lines
const lines = content.split('\n');

// Function to generate configuration based on agent name
function generateConfiguration(agentName) {
  const lowerName = agentName.toLowerCase();
  
  let config = [];
  
  // Dashboard - all agents get a dashboard
  config.push('Dashboard: Custom agent dashboard');
  
  // Security layer - all agents need security
  config.push('Security: 2FA, encryption, access control');
  
  // Communication features based on agent type
  if (lowerName.includes('support') || lowerName.includes('customer') || lowerName.includes('service') || lowerName.includes('receptionist') || lowerName.includes('call router')) {
    config.push('Call: Voice calls, recording, IVR');
    config.push('Chat: Live chat, messaging, bot integration');
    config.push('SMS: SMS notifications, two-way messaging');
  }
  
  // Sales agents get call/chat features
  if (lowerName.includes('sales') || lowerName.includes('negotiation') || lowerName.includes('business development')) {
    config.push('Call: Outbound calls, call recording, dialer');
    config.push('Chat: Sales chat, lead qualification');
    config.push('SMS: Follow-up SMS, appointment reminders');
  }
  
  // Marketing agents get analytics and content features
  if (lowerName.includes('marketing') || lowerName.includes('content') || lowerName.includes('social media') || lowerName.includes('seo') || lowerName.includes('brand')) {
    config.push('Chat: Social media integration, content publishing');
    config.push('Analytics: Campaign tracking, ROI measurement');
  }
  
  // Operations/Project management agents get scheduling features
  if (lowerName.includes('operations') || lowerName.includes('project') || lowerName.includes('workflow') || lowerName.includes('process') || lowerName.includes('task')) {
    config.push('Scheduling: Task management, deadline tracking');
    config.push('Routing: Work assignment, workflow automation');
  }
  
  // Finance agents get pricing and reporting features
  if (lowerName.includes('finance') || lowerName.includes('accounting') || lowerName.includes('treasury') || lowerName.includes('budget') || lowerName.includes('pricing')) {
    config.push('Pricing: Price limits, negotiation rules, approval workflows');
    config.push('Reports: Financial reports, audit trails');
  }
  
  // HR agents get scheduling and employee management features
  if (lowerName.includes('hr') || lowerName.includes('human resources') || lowerName.includes('recruiting') || lowerName.includes('talent') || lowerName.includes('training')) {
    config.push('Scheduling: Interview scheduling, onboarding workflows');
    config.push('Chat: Employee communication, feedback collection');
  }
  
  // Technology/IT agents get integration and monitoring features
  if (lowerName.includes('technology') || lowerName.includes('it') || lowerName.includes('devops') || lowerName.includes('security') || lowerName.includes('engineering')) {
    config.push('Integration: API connections, system monitoring');
    config.push('Security: Access policies, vulnerability scanning');
  }
  
  // General info for all agents
  config.push('General: Name, role, availability, personality, tone settings');
  
  // Voice and phone for customer-facing agents
  if (lowerName.includes('customer') || lowerName.includes('support') || lowerName.includes('sales') || lowerName.includes('service')) {
    config.push('Voice: Custom voice, phone number, recording, script library');
    config.push('Location: Country/region settings, timezone');
  }
  
  // Model and language for all agents
  config.push('Model: AI model selection, language settings, multilingual support');
  
  // Timing and availability
  config.push('Timing: Business hours, availability schedule, timezone');
  
  // Pricing for sales/finance agents
  if (lowerName.includes('sales') || lowerName.includes('pricing') || lowerName.includes('negotiation') || lowerName.includes('revenue')) {
    config.push('Pricing: Price limits, discount rules, negotiation parameters');
  }
  
  // Integration for all agents
  config.push('Integration: Third-party connections, webhooks, MCP');
  
  // Waiting duration for call agents
  if (lowerName.includes('call') || lowerName.includes('support') || lowerName.includes('service')) {
    config.push('Call Settings: Wait duration, queue management, callback options');
  }
  
  // Behaviour and limitations
  config.push('Behaviour: Response guidelines, limitations, guardrails');
  
  // Responsibilities and routing
  config.push('Responsibilities: Task routing, appointment scheduling, escalation rules');
  
  // Task management
  config.push('Tasks: Task tracking, completion status, priority management');
  
  // Performance and insights
  config.push('Performance: Metrics tracking, insights dashboard, KPI monitoring');
  
  // Summary and notes
  config.push('Notes: Activity summary, interaction logs, annotations');
  
  // Predictive layers
  if (lowerName.includes('analytics') || lowerName.includes('forecast') || lowerName.includes('predictor') || lowerName.includes('intelligence')) {
    config.push('Predictive: AI predictions, trend analysis, forecasting');
  }
  
  // Rules and regulations
  config.push('Rules: Compliance rules, regulatory requirements, policy enforcement');
  
  // Memory
  config.push('Memory: Conversation history, context retention, learning');
  
  // Company setup
  config.push('Company Setup: Profile, products, pricing, knowledge base, business hours');
  
  // Import/Export
  config.push('Data: Import/export, backup, data migration');
  
  // Reports
  config.push('Reports: Custom reports, scheduled reports, data visualization');
  
  return config.join(' | ');
}

// Process the file
const newLines = [];
let inTable = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is the table header line
  if (line.includes('| No. |') && line.includes('| Name of Agent')) {
    // Replace the header with new structure including configuration
    newLines.push('| No. | Name of Agent                          | Uses of Agents                          | Configuration Options');
    newLines.push('|-----|----------------------------------------|----------------------------------------|----------------------------------------|');
    inTable = true;
    continue;
  }
  
  // Check if this is a table row
  if (inTable && line.startsWith('|') && line.includes('|')) {
    // Skip separator lines (lines with only dashes)
    if (line.match(/^\|[\s\-]+\|[\s\-]+\|[\s\-]+\|$/)) {
      continue;
    }
    
    // Parse the row
    const parts = line.split('|').map(p => p.trim());
    
    // Extract the number, agent name, and uses (columns 1, 2, and 3)
    const number = parts[1] || '';
    const agentName = parts[2] || '';
    const uses = parts[3] || '';
    
    // Skip rows with no valid agent name
    const trimmedName = agentName.trim();
    if (!trimmedName || trimmedName.match(/^[-\s]+$/) || trimmedName === '-----' || trimmedName === '--------') {
      continue;
    }
    
    // Generate configuration based on agent name
    const config = generateConfiguration(agentName);
    
    // Create new row with number, name, uses, and configuration
    newLines.push(`| ${number} | ${agentName.padEnd(38)} | ${uses.padEnd(38)} | ${config}`);
    continue;
  }
  
  // If we're no longer in the table (empty line or separator line after table)
  if (inTable && (line.trim() === '' || line.startsWith('===='))) {
    inTable = false;
  }
  
  // Keep all other lines as is
  newLines.push(line);
}

// Write the transformed file
const outputPath = path.join(__dirname, 'shaida the agents lib by shaida', 'ai agents 1108');
fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');

console.log('File transformed successfully!');
console.log('Added: Configuration Options column with detailed features for each agent');
