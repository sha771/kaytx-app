const fs = require('fs');
const path = require('path');

// Read the ai agents 1108 file
const agentsFile = path.join(__dirname, 'shaida the agents lib by shaida/ai agents 1108');
const content = fs.readFileSync(agentsFile, 'utf-8');

// The configuration string to add
const configString = ' | Configuration: Separate Dashboard | Security Layer | Call | Chat System | Company Setup | General Info (Name, Voice, Role, Availability, Personality, Tone) | Voice & Phone Number | SMS/Voice/Call/Recording/Script/Location/Country/Setting | Model & Language | Timing | Pricing & Price Limit & Negotiation | Integration | Waiting Duration for Call | Behaviour & Limitations | Responsibilities, Routing & Appointment & Scheduling | Task & Remaining Task Complete | Performance & Insights | Summary & Notes | Predictive Layers | Rules & Regulations | Memory | Setup Company (Profile Setup, Product & Pricing, Negotiation Rules, Experience Goal, Training, Knowledge Base, Voice & Personality, Business Hours, Configurations) | 2 Step Verification | Import & Export Data | Reports | Integrations & MCP';

// Split into lines
const lines = content.split('\n');
const newLines = [];
let agentsAdded = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Skip header lines and separator lines
  if (line.startsWith('| No.') || line.startsWith('|-----')) {
    newLines.push(line);
    continue;
  }
  
  // Check if this is an agent row (starts with | number |)
  const match = line.match(/^\|\s*(\d+)\s*\|/);
  if (match) {
    // Check if this line already has Configuration
    if (!line.includes('Configuration:')) {
      // Add the configuration column
      newLines.push(line + configString);
      agentsAdded++;
    } else {
      newLines.push(line);
    }
  } else {
    newLines.push(line);
  }
}

// Write the updated content back to the file
fs.writeFileSync(agentsFile, newLines.join('\n'), 'utf-8');

console.log(`Added configuration sections to ${agentsAdded} agents`);
console.log(`Updated file: ${agentsFile}`);
