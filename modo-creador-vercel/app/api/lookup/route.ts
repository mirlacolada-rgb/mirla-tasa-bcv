export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
import {google,failure} from '@/lib/enrollment';
import {approved,ticketToken,type Cupo} from '@/lib/tickets';
const attempts=new Map<string,{count:number;expires:number}>();
export async function POST(request:Request){try{
 const ip=request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';const now=Date.now();
 for(const [key,value] of attempts)if(value.expires<now)attempts.delete(key);
 const attempt=attempts.get(ip)||{count:0,expires:now+60000};if(++attempt.count>12)return failure(Error('Espera un minuto antes de volver a consultar.'),429);attempts.set(ip,attempt);
 if(Number(request.headers.get('content-length')||0)>1000)throw Error('Solicitud demasiado grande.');
 const data=await request.json();const cedula=String(data.cedula||'').trim();if(!/^\d{5,9}$/.test(cedula))throw Error('Escribe tu cédula, solo números.');
 const result=await google({action:'lookup',cedula});
 const tickets=(result.tickets as Cupo[]).map(cupo=>({...cupo,downloadToken:approved(cupo.status)?ticketToken(cupo.id):null}));
 return Response.json({tickets},{headers:{'Cache-Control':'no-store'}});
 }catch(error){return failure(error);}}
