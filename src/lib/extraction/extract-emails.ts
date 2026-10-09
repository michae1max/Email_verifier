import * as cheerio from 'cheerio';
import {normalizeEmail} from './normalize-email';
const token=/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+/ig;
function normalizeSeparators(input:string){return input.replace(/\\r\\n|\\n|\\r|\\t/g,'\n');}
export function extractEmailsFromText(input:string):string[]{ const found=normalizeSeparators(input).replace(/mailto:/gi,'').match(token)??[]; const seen=new Set<string>(); return found.map(x=>normalizeEmail(x).normalized).filter(x=>{if(!x||seen.has(x))return false;seen.add(x);return true;}); }
export function extractEmailsFromHtml(input:string):string[]{ const $=cheerio.load(input); $('script,style,noscript').remove(); return extractEmailsFromText($.root().text()); }
export function extractEmails(input:string,type:'text'|'html'='text'){return type==='html'?extractEmailsFromHtml(input):extractEmailsFromText(input)}
