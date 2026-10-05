import dns from 'node:dns/promises'; import type {MxRecord} from 'node:dns';
export type MxStatus='mx_found'|'null_mx'|'no_mx'|'nxdomain'|'timeout'|'temporary_error';
export interface MxResult {status:MxStatus; records:MxRecord[]}
const cache=new Map<string,Promise<MxResult>>();
export function clearMxCache(){cache.clear()}
export function resolveMxCached(domain:string):Promise<MxResult>{ const key=domain.toLowerCase(); if(!cache.has(key)) cache.set(key,(async()=>{try{const records=await dns.resolveMx(key); if(records.length===0)return {status:'no_mx',records}; if(records.some(r=>r.exchange===''))return {status:'null_mx',records}; return {status:'mx_found',records};}catch(e:unknown){const code=(e as NodeJS.ErrnoException).code; if(code==='ENOTFOUND')return {status:'nxdomain',records:[]}; if(code==='ETIMEOUT')return {status:'timeout',records:[]}; return {status:'temporary_error',records:[]};}})()); return cache.get(key)!; }
