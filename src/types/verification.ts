export type VerificationStatus = 'pending'|'invalid_format'|'disposable'|'invalid_domain'|'does_not_accept_email'|'accepted_but_catchall_test_inconclusive'|'likely_deliverable'|'catch_all'|'accept_all'|'rejected'|'blocked'|'unknown';
export type EvidenceStrength = 'Strong technical evidence'|'Moderate technical evidence'|'Domain-only evidence'|'Inconclusive'|'Rejected'|'Invalid';
export interface NormalizedEmail { originalInput:string; normalized:string; localPart:string; domain:string; }
export interface CandidateEvidence { email:string; status:VerificationStatus; score:number|null; syntaxValid:boolean; mxFound:boolean; smtpAccepted:boolean|null; smtpRejected:boolean|null; catchAll:boolean|null; disposable:boolean; roleAddress:boolean; patternScore:number|null; reasons:string[]; }
