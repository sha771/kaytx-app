// Add Sub-Agents section to all department index.tsx files
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app', 'ai-agent');

const deptConfig = [
  { folder: 'customer', subCount: 42, color: '#06B6D4', icon: 'Headphones' },
  { folder: 'sales', subCount: 42, color: '#FF9500', icon: 'TrendingUp' },
  { folder: 'marketing', subCount: 45, color: '#E91E63', icon: 'Megaphone' },
  { folder: 'operations', subCount: 39, color: '#607D8B', icon: 'Settings' },
  { folder: 'finance', subCount: 39, color: '#2E7D32', icon: 'DollarSign' },
  { folder: 'tech', subCount: 48, color: '#1565C0', icon: 'Cpu' },
  { folder: 'hr', subCount: 33, color: '#9C27B0', icon: 'Users' },
  { folder: 'legal', subCount: 30, color: '#3F51B5', icon: 'Scale' },
  { folder: 'data', subCount: 39, color: '#6366F1', icon: 'Database' },
  { folder: 'product', subCount: 30, color: '#8B5CF6', icon: 'Package' },
  { folder: 'security', subCount: 36, color: '#F44336', icon: 'Shield' },
  { folder: 'research', subCount: 27, color: '#10B981', icon: 'Telescope' },
  { folder: 'admin', subCount: 27, color: '#475569', icon: 'Building' },
  { folder: 'trading', subCount: 54, color: '#10B981', icon: 'TrendingUp' },
  { folder: 'realestate', subCount: 42, color: '#8B5CF6', icon: 'Building2' },
  { folder: 'insurance', subCount: 48, color: '#F59E0B', icon: 'Shield' },
  { folder: 'healthcare', subCount: 42, color: '#EF4444', icon: 'Heart' },
  { folder: 'manufacturing', subCount: 42, color: '#6366F1', icon: 'Factory' },
  { folder: 'transportation', subCount: 42, color: '#0EA5E9', icon: 'Truck' },
  { folder: 'government', subCount: 36, color: '#475569', icon: 'Landmark' },
  { folder: 'supply-chain', subCount: 30, color: '#0EA5E9', icon: 'Package' },
  { folder: 'ai-mgmt', subCount: 18, color: '#8B5CF6', icon: 'Bot' },
];

let updated = 0;

for (const dept of deptConfig) {
  const indexPath = path.join(baseDir, dept.folder, 'index.tsx');
  
  if (!fs.existsSync(indexPath)) {
    console.log(`SKIP: ${indexPath} does not exist`);
    continue;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Skip if already has Sub-Agents section
  if (content.includes('Sub-Agents')) {
    console.log(`SKIP: ${dept.folder}/index.tsx already has Sub-Agents section`);
    continue;
  }
  
  // Add the Sub-Agents section before AgentFeatures or at the end of ScrollView
  const subAgentSection = `
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>${dept.subCount} helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${dept.folder}/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '${dept.color}15' }]}>
          <${dept.icon} size={20} color="${dept.color}" />
          <Text style={[styles.subAgentButtonText, { color: '${dept.color}' }]}>View All ${dept.subCount} Sub-Agents</Text>
          <ArrowRight size={18} color="${dept.color}" />
        </TouchableOpacity>
      </View>
`;

  // Insert before AgentFeatures or before closing </ScrollView>
  if (content.includes('<AgentFeatures')) {
    content = content.replace('<AgentFeatures', subAgentSection + '\n      <AgentFeatures');
  } else {
    content = content.replace('</ScrollView>', subAgentSection + '\n    </ScrollView>');
  }
  
  // Add styles if not present
  if (!content.includes('subAgentButton')) {
    content = content.replace(
      /actionText:\{[^}]+\}/,
      match => match + ',\n  subAgentButton:{flexDirection:\'row\',alignItems:\'center\',padding:16,borderRadius:12,gap:10,marginTop:8},\n  subAgentButtonText:{fontSize:15,fontWeight:\'600\',flex:1}'
    );
    // Fallback: add before closing });
    if (!content.includes('subAgentButton')) {
      content = content.replace(
        /}\);?\s*$/,
        '  subAgentButton:{flexDirection:\'row\',alignItems:\'center\',padding:16,borderRadius:12,gap:10,marginTop:8},\n  subAgentButtonText:{fontSize:15,fontWeight:\'600\',flex:1}\n});'
      );
    }
  }
  
  // Ensure ArrowRight is imported
  if (!content.includes('ArrowRight')) {
    content = content.replace(
      /from 'lucide-react-native';/,
      ', ArrowRight } from \'lucide-react-native\';'
    );
    // Fix double comma case
    content = content.replace(/, , ArrowRight/g, ', ArrowRight');
  }
  
  fs.writeFileSync(indexPath, content, 'utf8');
  updated++;
  console.log(`UPDATED: ${dept.folder}/index.tsx`);
}

console.log(`\nDone! Updated ${updated} department index files`);
