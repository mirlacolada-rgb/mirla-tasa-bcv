import {google,failure} from '@/lib/enrollment';
import {approved,verifyTicket,type Cupo} from '@/lib/tickets';
import {goldenTicket} from '@/lib/golden-ticket';
export const runtime='nodejs';export const dynamic='force-dynamic';export const maxDuration=60;
export async function POST(request:Request){try{
 if(Number(request.headers.get('content-length')||0)>1500)throw Error('Solicitud no válida.');
 const data=await request.json();if(typeof data.token!=='string'||data.token.length>1000)throw Error('Consulta tu cupo antes de descargar el ticket.');
 const id=verifyTicket(data.token);const result=await google({action:'ticket',id});const c=result.ticket as Cupo;
 if(!c||!approved(c.status))return failure(new Error('Tu cupo aún no ha sido aprobado.'),403);
 const bytes=await goldenTicket(c);return new Response(new Uint8Array(bytes).buffer,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${id}${c.gift?'-GIFT':''}.pdf"`,'Cache-Control':'no-store'}});
 }catch(e){return failure(e);}}
