import {randomUUID} from 'node:crypto'; import {verifyMailbox} from './mailbox-checker'; import type {SmtpOptions,SmtpResult} from './smtp-client';
export function randomRecipient(domain:string){return `random-${randomUUID()}@${domain}`}
export function verifyCatchAll(domain:string,mxHost:string,options:SmtpOptions):Promise<SmtpResult>{return verifyMailbox(randomRecipient(domain),mxHost,options)}
