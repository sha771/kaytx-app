const fs = require('fs');
const path = require('path');

// Read the KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS file
const agentsFile = path.join(__dirname, 'shaida the agents lib by shaida/KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS');
const content = fs.readFileSync(agentsFile, 'utf-8');

// The configuration string to add
const configString = '   Configuration: Separate Dashboard | Security Layer | Call | Chat System | Company Setup | General Info (Name, Voice, Role, Availability, Personality, Tone) | Voice & Phone Number | SMS/Voice/Call/Recording/Script/Location/Country/Setting | Model & Language | Timing | Pricing & Price Limit & Negotiation | Integration | Waiting Duration for Call | Behaviour & Limitations | Responsibilities, Routing & Appointment & Scheduling | Task & Remaining Task Complete | Performance & Insights | Summary & Notes | Predictive Layers | Rules & Regulations | Memory | Setup Company (Profile Setup, Product & Pricing, Negotiation Rules, Experience Goal, Training, Knowledge Base, Voice & Personality, Business Hours, Configurations) | 2 Step Verification | Import & Export Data | Reports | Integrations & MCP';

const subAgentConfigString = '      Configuration: Separate Dashboard | Security Layer | Call | Chat System | Company Setup | General Info (Name, Voice, Role, Availability, Personality, Tone) | Voice & Phone Number | SMS/Voice/Call/Recording/Script/Location/Country/Setting | Model & Language | Timing | Pricing & Price Limit & Negotiation | Integration | Waiting Duration for Call | Behaviour & Limitations | Responsibilities, Routing & Appointment & Scheduling | Task & Remaining Task Complete | Performance & Insights | Summary & Notes | Predictive Layers | Rules & Regulations | Memory | Setup Company (Profile Setup, Product & Pricing, Negotiation Rules, Experience Goal, Training, Knowledge Base, Voice & Personality, Business Hours, Configurations) | 2 Step Verification | Import & Export Data | Reports | Integrations & MCP';

// Split into lines
const lines = content.split('\n');
const newLines = [];
let agentsAdded = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);
  
  // Check if this line has "Uses:" but no "Configuration:" in the next line
  if (line.trim().startsWith('Uses:')) {
    // Check if the next line already has Configuration
    const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
    
    // If next line doesn't start with "Configuration:", add it
    if (!nextLine.trim().startsWith('Configuration:')) {
      // Determine if this is a main agent or sub-agent based on indentation
      if (line.startsWith('   Uses:')) {
        // Main agent (3 spaces)
        newLines.push(configString);
        agentsAdded++;
      } else if (line.startsWith('      Uses:')) {
        // Sub-agent (6 spaces)
        newLines.push(subAgentConfigString);
        agentsAdded++;
      }
    }
  }
}

// Write the updated content back to the file
fs.writeFileSync(agentsFile, newLines.join('\n'), 'utf-8');

console.log(`Added configuration sections to ${agentsAdded} agents`);
console.log(`Updated file: ${agentsFile}`);
