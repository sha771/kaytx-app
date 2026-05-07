const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing');

function fixDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const fp=p.join(dir,f);
    if(f.endsWith('.tsx')) {
      let c=fs.readFileSync(fp,'utf8');
      if(c.includes('ChartBar') && !c.includes('ChartBarBig')) {
        // Fix imports
        c=c.replace(/ChartBar, ChartBar,/g,'ChartBarBig,');
        c=c.replace(/, ChartBar,/g,', ChartBarBig,');
        c=c.replace(/import \{ Activity, ChartBar,/g,'import { Activity, ChartBarBig,');
        c=c.replace(/import \{ ChartBar, ChartBar,/g,'import { ChartBarBig,');
        c=c.replace(/import \{ Megaphone, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar,/g,'import { Megaphone, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig,');
        // Fix usage
        c=c.replace(/ChartBar size=/g,'ChartBarBig size=');
        c=c.replace(/icon:ChartBar}/g,'icon:ChartBarBig}');
        c=c.replace(/ChartBar, CircleCheck/g,'ChartBarBig, CircleCheck');
        fs.writeFileSync(fp,c,'utf8');
        console.log('Fixed ChartBar: '+f);
      } else if(c.includes('ChartBar, ChartBar')) {
        c=c.replace(/ChartBar, ChartBar/g,'ChartBarBig');
        fs.writeFileSync(fp,c,'utf8');
        console.log('Fixed dup ChartBar: '+f);
      }
    }
  });
}

// Fix main marketing dir
fixDir(d);
// Fix sub-agents dir
fixDir(p.join(d,'sub-agents'));

console.log('ChartBar fixes done!');
