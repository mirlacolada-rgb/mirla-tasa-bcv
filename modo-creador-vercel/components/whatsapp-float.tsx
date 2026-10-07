'use client';
import {useEffect,useRef,useState,type PointerEvent} from 'react';
import {ChevronLeft,X} from 'lucide-react';

const destination='https://wa.me/584243315783';
export function WhatsAppFloat(){
 const [hidden,setHidden]=useState(false),[moving,setMoving]=useState(false),[offset,setOffset]=useState({x:0,y:0});
 const drag=useRef({active:false,startX:0,startY:0,x:0,y:0,moved:false});
 useEffect(()=>{try{setHidden(localStorage.getItem('mirla-whatsapp-hidden')==='true')}catch{}},[]);
 function conceal(value:boolean){setHidden(value);setMoving(false);setOffset({x:0,y:0});try{localStorage.setItem('mirla-whatsapp-hidden',String(value))}catch{}}
 function begin(e:PointerEvent<HTMLAnchorElement>){if(e.pointerType==='mouse'&&e.button!==0)return;drag.current={active:true,startX:e.clientX,startY:e.clientY,x:0,y:0,moved:false}}
 function move(e:PointerEvent<HTMLAnchorElement>){const d=drag.current;if(!d.active)return;d.x=e.clientX-d.startX;d.y=e.clientY-d.startY;if(Math.hypot(d.x,d.y)>6){d.moved=true;setMoving(true);e.currentTarget.setPointerCapture(e.pointerId);const box=e.currentTarget.getBoundingClientRect(),left=box.left-offset.x,top=box.top-offset.y;setOffset({x:Math.max(8-left,Math.min(window.innerWidth-box.width-8-left,d.x)),y:Math.max(8-top,Math.min(window.innerHeight-box.height-8-top,d.y))});}}
 function end(e:PointerEvent<HTMLAnchorElement>){const d=drag.current;if(!d.active)return;d.active=false;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(d.moved&&(d.x>20||Math.hypot(d.x,d.y)>48))conceal(true);else{setMoving(false);setOffset({x:0,y:0})}}
 return <aside className="whatsapp-float" aria-label="Contacto con Mirla" data-hidden={hidden} data-moving={moving} style={{transform:`translate3d(${offset.x}px,${offset.y}px,0)`}}>{hidden?<button type="button" className="whatsapp-restore" aria-label="Mostrar botón de WhatsApp de Mirla" title="Mostrar WhatsApp" onClick={()=>conceal(false)}><ChevronLeft size={16}/></button>:<><a className="whatsapp-glass" href={destination} target="_blank" rel="noopener noreferrer" aria-label="Chatear con Mirla por WhatsApp" title="Chatea con Mirla · arrastra hacia el borde para ocultar" draggable={false} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onPointerCancel={()=>{drag.current.active=false;drag.current.moved=true;setMoving(false);setOffset({x:0,y:0})}} onClick={e=>{if(drag.current.moved){e.preventDefault();drag.current.moved=false}}}>
 <svg viewBox="0 0 24 24" width="25" height="25" aria-hidden="true" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12a11.9 11.9 0 0 0-3.5-8.5ZM12 22a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 0 1 2 12 10 10 0 0 1 12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10Zm5.5-7.5c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2-.8 1-1 1.2-.3.2-.6.1a8.2 8.2 0 0 1-2.5-1.6 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.6L8.9 7c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4s.2-1.3.2-1.4-.2-.3-.5-.4Z"/></svg>
 </a><button type="button" className="whatsapp-hide" aria-label="Ocultar botón de WhatsApp" title="Ocultar" onClick={()=>conceal(true)}><X size={12}/></button></>}</aside>;
}
