import {PDFDocument,rgb,degrees} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import type {Cupo} from './tickets';
export async function goldenTicket(c:Cupo){
 const doc=await PDFDocument.create();doc.registerFontkit(fontkit);
 const regular=await doc.embedFont(await readFile(join(process.cwd(),'public/fonts/Poppins-Regular.ttf')),{subset:true});
 const bold=await doc.embedFont(await readFile(join(process.cwd(),'public/fonts/Poppins-Bold.ttf')),{subset:true});
 const p=doc.addPage([860,430]);const ink=rgb(.24,.13,.055),purple=rgb(.37,.12,.58);
 for(let x=0;x<860;x+=4){const t=x/860,l=.5+.5*Math.sin(t*Math.PI);p.drawRectangle({x,y:0,width:4,height:430,color:rgb(.80+.17*l,.56+.28*l,.21+.35*l)});}
 for(let i=0;i<12;i++)p.drawLine({start:{x:40+i*95,y:-100},end:{x:210+i*95,y:520},thickness:20,color:rgb(1,.95,.74),opacity:.09});
 p.drawRectangle({x:15,y:15,width:830,height:400,borderColor:ink,borderWidth:1.8});p.drawRectangle({x:22,y:22,width:816,height:386,borderColor:ink,borderWidth:.6});
 for(const x of [35,825])for(const y of [35,395]){p.drawCircle({x,y,size:5,borderColor:ink,borderWidth:1});p.drawLine({start:{x:x-9,y},end:{x:x+9,y},thickness:.7,color:ink});}
 const text=(s:string,x:number,y:number,size:number,b=false,color=ink)=>p.drawText(s,{x,y,size,font:b?bold:regular,color});
 text('MIRLA COLADA PRESENTA',49,368,9,true);text('GOLDEN TICKET',47,326,38,true);text('MODO CREADOR',49,294,21,true,purple);
 text('Activa tu mente, pierde el miedo y sal a monetizar.',49,274,10);
 p.drawLine({start:{x:49,y:257},end:{x:650,y:257},thickness:.7,color:ink});
 text(c.gift?'ESTE CUPO ES UN REGALO PARA':'ESTE CUPO PERTENECE A',49,239,8,true);
 let size=27;while(bold.widthOfTextAtSize(c.ownerName,size)>590&&size>12)size--;
 const words=c.ownerName.split(/\s+/);let lines=[''];for(const word of words){let i=lines.length-1;if(bold.widthOfTextAtSize(lines[i]+' '+word,size)<=590){lines[i]=(lines[i]+' '+word).trim();continue;}if(lines[i]){lines.push('');i++;}for(const char of word){if(bold.widthOfTextAtSize(lines[i]+char,size)>590){lines.push('');i++;}lines[i]+=char;}}
 lines.slice(0,2).forEach((s,i)=>text(s,49,210-i*27,size,true));
 if(c.gift){let bs=9;while(regular.widthOfTextAtSize('Regalado por '+c.buyerName,bs)>590&&bs>6)bs--;text('Regalado por '+c.buyerName,49,168,bs);}
 text('14 NOVIEMBRE 2026',49,139,12,true);text('Supercines · CC La Granja · Naguanagua',49,120,10);
 text('Masterclass 9:00 a. m. – 12:30 p. m. | Coffee break hasta 1:00 p. m.',49,102,9);
 text('INCLUYE ACCESO · DINÁMICAS · CERTIFICADO · COFFEE BREAK',49,78,8,true);
 text(c.balance>0?`Reserva aprobada · Saldo en puerta: ${c.balance} ${c.currency}`:'Cupo aprobado · Pago completo',49,58,9,true,purple);
 text('Presenta tu cédula y este ticket. No se realizan devoluciones.',49,39,7);
 for(let y=30;y<400;y+=12)p.drawLine({start:{x:684,y},end:{x:684,y:y+5},thickness:.8,color:ink});
 p.drawRectangle({x:706,y:318,width:108,height:49,color:c.gift?purple:ink});text(c.gift?'GIFT':'ACCESO',c.gift?733:719,335,c.gift?22:17,true,rgb(1,.93,.7));
 text('TU PRÓXIMA',714,269,10,true);text('VERSIÓN',714,252,15,true);text('EMPIEZA AQUÍ.',714,232,10,true);
 text('14 · NOV · 26',712,174,13,true);text('09:00 AM',724,152,11);
 text(c.id,701,94,9,true);text('CUPO PERSONAL',712,73,8,true);text('MODO CREADOR',714,54,8);
 doc.setTitle('MODO CREADOR · '+c.ownerName);doc.setAuthor('Mirla Colada');return await doc.save();
}
