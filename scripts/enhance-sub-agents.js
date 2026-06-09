/**
 * =============================================================================
 * SUB-AGENT FEATURE ENHANCEMENT
 * =============================================================================
 * 
 * Enhances sub-agent files with specific features based on their parent agent
 * and department.
 * 
 * @version 1.0.0
 * @lastUpdated 2026-06-07
 */

const fs = require('fs');
const path = require('path');

// Import the comprehensive enhancement functions
const { generateAgentFeatures, formatFeaturesObject } = require('./enhance-all-agents-features-comprehensive.js');

/**
 * Enhance sub-agent files
 */
function enhanceSubAgentFiles() {
  console.log('========================================');
  console.log('ENHANCING SUB-AGENT FILES');
  console.log('========================================\n');
  
  const agentDir = path.join(__dirname, '..', 'app', 'ai-agent');
  
  let successCount = 0;
  let failCount = 0;
  let totalFiles = 0;
  
  // Recursively find all sub-agent files
  function scanSubAgentDirectories(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (file === 'sub-agents') {
          // Process sub-agent files
          const subAgentFiles = fs.readdirSync(fullPath);
          for (const subAgentFile of subAgentFiles) {
            if (subAgentFile.endsWith('.tsx') && subAgentFile !== 'index.tsx') {
              totalFiles++;
              const subAgentPath = path.join(fullPath, subAgentFile);
              const success = enhanceAgentFile(subAgentPath);
              if (success) {
                successCount++;
              } else {
                failCount++;
              }
            }
          }
        } else {
          // Continue scanning
          scanSubAgentDirectories(fullPath);
        }
      }
    }
  }
  
  scanSubAgentDirectories(agentDir);
  
  console.log('\n========================================');
  console.log('SUB-AGENT ENHANCEMENT SUMMARY');
  console.log('========================================');
  console.log(`✓ Successfully enhanced: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Total sub-agents processed: ${totalFiles}`);
  console.log('========================================\n');
}

/**
 * Enhance a single agent file (reused from comprehensive script)
 */
function enhanceAgentFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract agent name from file path
    const fileName = path.basename(filePath, '.tsx');
    const agentName = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Check if file already has enhanced features
    if (content.includes('Separate Dashboard: true') || content.includes('Separate Dashboard: false')) {
      console.log(`  ✓ Already enhanced: ${fileName}`);
      return true;
    }
    
    // Generate features using the comprehensive function
    const features = generateAgentFeatures(filePath, fileName);
    const featuresObject = formatFeaturesObject(features);
    
    // Sub-agents typically don't have separate dashboards
    featuresObject['Separate Dashboard'] = false;
    
    // Generate features section
    let featuresSection = '  features: {\n';
    for (const [key, value] of Object.entries(featuresObject)) {
      featuresSection += `    '${key}': ${JSON.stringify(value)},\n`;
    }
    featuresSection += '  },\n';
    
    // Insert features after the agent object
    const enhancedContent = content.replace(
      /(export const [a-zA-Z0-9_-]+: AIEmployee = \{)/,
      `$1\n${featuresSection}`
    );
    
    fs.writeFileSync(filePath, enhancedContent, 'utf8');
    console.log(`  ✓ Enhanced: ${fileName}`);
    return true;
    
  } catch (error) {
    console.error(`  ✗ Error enhancing ${filePath}:`, error.message);
    return false;
  }
}

// Run enhancement if executed directly
if (require.main === module) {
  enhanceSubAgentFiles();
}

module.exports = {
  enhanceSubAgentFiles,
  enhanceAgentFile,
};
