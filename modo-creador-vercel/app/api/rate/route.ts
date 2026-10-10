export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import {rate} from '@/lib/enrollment';
export async function GET(){const quote=await rate();return Response.json({rate:quote?.value??null,rateDate:quote?.date??null},{headers:{'Cache-Control':'no-store'}});}
