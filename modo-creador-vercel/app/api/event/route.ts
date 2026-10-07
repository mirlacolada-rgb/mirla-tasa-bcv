export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import {settings,google,rate,deadline} from '@/lib/enrollment';
export async function GET(){
 const s=settings();const [quote,stats]=await Promise.all([rate(),s.url&&s.secret?google({action:'stats'}).catch(()=>null):Promise.resolve(null)]);
 return Response.json({connected:!!(s.url&&s.secret),percent:stats?.percent??null,rate:quote?.value??null,rateDate:quote?.date??null,soldOut:stats?.soldOut??false,closed:Date.now()>=deadline},{headers:{'Cache-Control':'no-store'}});
}
