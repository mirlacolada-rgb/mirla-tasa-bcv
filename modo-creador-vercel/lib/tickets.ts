import {createHmac,timingSafeEqual} from 'node:crypto';
import {settings} from './enrollment';
export type Cupo={id:string;status:string;ownerName:string;buyerName:string;gift:boolean;balance:number;currency:string};
export const approved=(status:string)=>['reservado','confirmado'].includes(status);
function signature(value:string){const secret=settings().secret;if(!secret)throw Error('La consulta no está disponible.');return createHmac('sha256',secret).update('modo-creador-ticket:'+value).digest('base64url');}
export function ticketToken(id:string){const value=Buffer.from(JSON.stringify({id,exp:Date.now()+15*60*1000})).toString('base64url');return value+'.'+signature(value);}
export function verifyTicket(token:string){const [value,sig,...rest]=token.split('.');if(!value||!sig||rest.length)throw Error('Vuelve a consultar tu cupo para descargar el ticket.');const a=Buffer.from(sig),b=Buffer.from(signature(value));if(a.length!==b.length||!timingSafeEqual(a,b))throw Error('Ticket no válido.');const data=JSON.parse(Buffer.from(value,'base64url').toString('utf8'));if(!/^MC-[A-F0-9]{8}$/.test(data.id)||!Number.isFinite(data.exp)||data.exp<Date.now())throw Error('Vuelve a consultar tu cupo: el enlace venció.');return String(data.id);}
