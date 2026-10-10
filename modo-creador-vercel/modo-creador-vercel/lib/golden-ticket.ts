import {PDFDocument,rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import type {Cupo} from './tickets';
export async function goldenTicket(c:Cupo){
 if(!/^\d{3}$/.test(c.ticketCode||''))throw Error('Actualiza Apps Script para habilitar el nuevo ticket con código.');
 const doc=await PDFDocument.create();doc.registerFontkit(fontkit);
 const regular=await doc.embedFont(await readFile(join(process.cwd(),'public/fonts/Poppins-Regular.ttf')),{subset:true});
 const bold=await doc.embedFont(await readFile(join(process.cwd(),'public/fonts/Poppins-Bold.ttf')),{subset:true});
 const p=doc.addPage([420,740]),white=rgb(.98,.95,1),pink=rgb(.87,.60,.96),muted=rgb(.77,.69,.83);
 for(let y=0;y<740;y+=2){const glow=Math.exp(-Math.pow((y-450)/210,2));p.drawRectangle({x:0,y,width:420,height:2,color:rgb(.09+.16*glow,.035+.03*glow,.14+.18*glow)});}
 p.drawCircle({x:400,y:510,size:165,color:rgb(.62,.24,.77),opacity:.10});p.drawCircle({x:22,y:560,size:95,color:pink,opacity:.06});
 p.drawRectangle({x:18,y:18,width:384,height:704,borderColor:pink,borderWidth:.6,opacity:.35});
 const text=(s:string,x:number,y:number,size:number,b=false,color=white)=>p.drawText(s,{x,y,size,font:b?bold:regular,color});
 const lines=(s:string,x:number,y:number,size:number,b=false,maxWidth=348,maxLines=3):number=>{
  const font=b?bold:regular;let result:string[]=[''];
  for(const word of s.split(/\s+/)){let last=result.length-1;const candidate=(result[last]+' '+word).trim();if(font.widthOfTextAtSize(candidate,size)<=maxWidth){result[last]=candidate;continue;}if(result[last])result.push('');for(const ch of word){last=result.length-1;if(font.widthOfTextAtSize(result[last]+ch,size)>maxWidth)result.push('');result[result.length-1]+=ch;}}
  if(result.length>maxLines&&size>7)return lines(s,x,y,size-1,b,maxWidth,maxLines);
  result.forEach((line,i)=>text(line,x,y-i*(size*1.35),size,b));return result.length*size*1.35;
 };
 text('mirla colada.',36,685,15,true);text('MASTERCLASS PRESENCIAL',36,661,8,true,pink);
 text('MODO',33,606,47,true);text('CREADOR',33,558,47,true,pink);
 text('Tu próxima versión empieza aquí.',36,535,10,false,muted);
 p.drawRectangle({x:36,y:493,width:c.gift?122:106,height:25,color:rgb(.54,.22,.70),opacity:.65});text(c.gift?'GIFT · ES UN REGALO':'TU ENTRADA',46,502,8,true);
 text('PERSONA QUE RECLAMA EL CUPO',36,473,8,true,muted);
 lines(c.ownerName,36,450,22,true,348,2);
 text('CÉDULA',36,379,7,true,muted);text(c.ownerCedula||'Por confirmar con Mirla',36,363,11,true);
 if(c.gift)lines('Regalado por '+c.buyerName,36,342,9,false,348,2);
 const reserved=c.balance>0||c.status==='reservado';
 p.drawRectangle({x:36,y:213,width:348,height:100,color:rgb(.64,.34,.76),opacity:.15,borderColor:pink,borderWidth:.5});
 text(reserved?'RESERVADO':'PAGO COMPLETO',49,291,15,true,pink);
 if(reserved){text(Math.abs(c.paid-c.total/2)<.011?'Reserva del 50% aprobada.':'Tu lugar está reservado.',49,272,10);text(`Abono aprobado: ${c.paid.toFixed(2)} ${c.currency}`,49,253,9);text(`Saldo en puerta: ${c.balance.toFixed(2)} ${c.currency}`,49,234,9,true);}
 else {text('¡Todo listo para vivir MODO CREADOR!',49,272,10);text('Sin saldo pendiente. Acceso al evento',49,253,9);text('con este ticket y tu cédula.',49,234,9);}
 text('14 NOVIEMBRE 2026',36,184,12,true);text('Supercines · CC La Granja · Naguanagua',36,165,9);
 text('9:00 a. m. - 12:30 p. m. · Masterclass',36,148,9,false,muted);text('12:30 p. m. - 1:00 p. m. · Coffee break',36,132,9,false,muted);
 text('Acceso · Dinámicas · Certificado · Coffee break',36,112,8);
 p.drawLine({start:{x:36,y:98},end:{x:384,y:98},color:pink,thickness:.5,opacity:.5});
 text('CÓDIGO DE TU CUPO',36,77,7,true,muted);text(c.ticketCode,35,43,29,true,pink);
 text(c.id,177,73,9,true);text('Personal · Sujeto a verificación de identidad',177,57,6.5,false,muted);text('No se realizan devoluciones.',177,43,6.5,false,muted);
 doc.setTitle('MODO CREADOR · Ticket '+c.ticketCode+' · '+c.ownerName);doc.setAuthor('Mirla Colada');return await doc.save();
}
