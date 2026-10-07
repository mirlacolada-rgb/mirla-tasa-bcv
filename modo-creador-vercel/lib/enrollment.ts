
export const deadline=new Date('2026-11-13T19:00:00-04:00').getTime();
export function settings(){const e=process.env;return {url:e.GOOGLE_SCRIPT_URL,secret:e.GOOGLE_SHARED_SECRET};}
export async function google(payload:Record<string,unknown>){const s=settings();if(!s.url||!s.secret)throw new Error('Las inscripciones online todavía no están habilitadas. Escríbenos por WhatsApp.');if(!s.url.startsWith('https://script.google.com/macros/s/'))throw Error('La conexión de inscripciones no está disponible.');const r=await fetch(s.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...payload,secret:s.secret}),signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error('No pudimos conectar con el registro. Intenta nuevamente.');const result=await r.json() as any;if(!result.ok)throw Error(result.error||'No pudimos completar la solicitud.');return result;}
export async function rate(){
 try{
  const r=await fetch('https://ve.dolarapi.com/v1/dolares/oficial',{
   headers:{'User-Agent':'MirlaColada-BCV/1.0','Accept':'application/json'},
   signal:AbortSignal.timeout(10000)
  });
  if(!r.ok)return null;
  const data=await r.json() as {moneda?:string;fuente?:string;promedio?:number;fechaActualizacion?:string};
  const value=Number(data.promedio),date=Date.parse(data.fechaActualizacion||'');
  if(data.moneda!=='USD'||data.fuente!=='oficial'||!Number.isFinite(value)||value<=0||!Number.isFinite(date)||Date.now()-date>7*86400000||date>Date.now()+86400000)return null;
  return {value,date:data.fechaActualizacion!};
 }catch{return null;}
}
export function failure(error:unknown,status=400){return Response.json({error:error instanceof Error?error.message:'No pudimos completar la solicitud.'},{status,headers:{'Cache-Control':'no-store'}})}
