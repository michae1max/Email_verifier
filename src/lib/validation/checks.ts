import validator from 'validator'; import fs from 'node:fs'; import path from 'node:path';
const disposable=new Set(fs.readFileSync(path.join(process.cwd(),'data/disposable-domains.txt'),'utf8').split(/\r?\n/).map(x=>x.trim().toLowerCase()).filter(Boolean));
const roles=new Set(JSON.parse(fs.readFileSync(path.join(process.cwd(),'data/role-addresses.json'),'utf8')) as string[]);
export const isSyntaxValid=(email:string)=>validator.isEmail(email,{allow_utf8_local_part:true});
export const isDisposable=(domain:string)=>disposable.has(domain.toLowerCase());
export const isRoleAddress=(local:string)=>roles.has(local.toLowerCase());
