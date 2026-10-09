const fs=require('node:fs');const path=require('node:path');const cp=require('node:child_process');
const root=process.cwd();const env=path.join(root,'.env');const local=path.join(root,'.env.local');const example=path.join(root,'.env.example');
if(!fs.existsSync(env)){if(fs.existsSync(local))fs.copyFileSync(local,env);else if(fs.existsSync(example))fs.copyFileSync(example,env);else{console.error('Missing .env.example. Run this command from the project root.');process.exit(1)}}
cp.execFileSync(process.platform==='win32'?'npx.cmd':'npx',['prisma','generate'],{stdio:'inherit',cwd:root});cp.execFileSync(process.platform==='win32'?'npx.cmd':'npx',['prisma','migrate','deploy'],{stdio:'inherit',cwd:root});console.log('MailVerify Local setup complete. Start with: npm run dev:clean');
