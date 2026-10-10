import {checkMailbox} from './smtp-client'; import type {SmtpOptions,SmtpResult} from './smtp-client';
export function verifyMailbox(email:string,mxHost:string,options:SmtpOptions):Promise<SmtpResult>{return checkMailbox(email,mxHost,options)}
