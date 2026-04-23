const fs=require('fs'),path=require('path');
const BASE='c:\\Users\\shaida\\Desktop\\kaytx-full-app\\app';

// Files known to have Monitor icon usage
const files=[
  'ai-agent/engineering/frontend-dev-1.tsx',
  'ai-agent/engineering/frontend-lead.tsx',
  'ai-agent/healthcare/index.tsx',
  'ai-agent/healthcare/telehealth-support.tsx',
  'ai-agent/marketing/vp-digital.tsx',
  'ai-agent/security/index.tsx',
  'ai-agent/security/soc-manager.tsx',
  'ai-agent/trading/index.tsx',
  'ai-agent/trading/trading-desk-manager.tsx',
  'ai-agent/it/index.tsx'
];

let fixed=0;
files.forEach(f=>{
  const fp=path.join(BASE,f);
  if(!fs.existsSync(fp))return;
  let c=fs.readFileSync(fp,'utf8');
  
  // Replace Monitor icon usage with Activity (always imported)
  // but first check if Activity is in imports
  if(c.includes('icon: Monitor')||c.includes('icon:Monitor')){
    c=c.replace(/icon:\s*Monitor/g,'icon: Activity');
    // Also add Activity to imports if not present
    if(!c.includes('Activity')){
      c=c.replace(/from 'lucide-react-native';/,", Activity from 'lucide-react-native';");
    }
    fs.writeFileSync(fp,c,'utf8');
    fixed++;
    console.log('Fixed: '+f);
  }
});

console.log('Fixed '+fixed+' files');
