const fs=require('fs'),p=require('path'),B='c:\\Users\\shaida\\Desktop\\kaytx-full-app\\app\\ai-agent';
const files=['product/vp-product-operations','product/ai-product-manager','product/ai-product-owner','product/ai-product-manager-sub','product/ai-product-analyst','product/ai-ux-researcher','product/ai-product-marketer','product/ai-release-manager','security/ai-ciso'];
files.forEach(f=>{
const fp=p.join(B,f+'.tsx');
let c=fs.readFileSync(fp,'utf8');
const m=c.match(/import \{([^}]+)\} from 'lucide-react-native'/);
if(m){
const icons=[...new Set(m[1].split(',').map(i=>i.trim()))];
const newImp="import { "+icons.join(', ')+" } from 'lucide-react-native'";
c=c.replace(m[0],newImp);
fs.writeFileSync(fp,c);
console.log('Fixed:',f,icons.length,'icons');
}else{
console.log('No match:',f);
}
});
