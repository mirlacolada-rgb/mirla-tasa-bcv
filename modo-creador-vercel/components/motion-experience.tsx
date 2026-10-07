'use client';
import {useEffect,useRef,useState} from 'react';
import {Moon,Sun,Ticket,Check} from 'lucide-react';

export function ThemeToggle(){
 const [night,setNight]=useState(false);
 useEffect(()=>{try{const dark=localStorage.getItem('mirla-theme')==='dark';setNight(dark);document.documentElement.dataset.theme=dark?'dark':'light'}catch{}},[]);
 function toggle(){const next=!night;setNight(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('mirla-theme',next?'dark':'light')}catch{}}
 return <button className="theme-toggle" type="button" onClick={toggle} aria-pressed={night} aria-label={night?'Desactivar modo noche':'Activar modo noche'} title={night?'Modo día':'Modo noche'} data-night={night}><span className="theme-track" aria-hidden="true"><span className="theme-knob"/><Sun className="theme-sun" size={17}/><Moon className="theme-moon" size={17}/></span></button>;
}

export function ReserveSwitch({onActivate,open,disabled=false,className='',label='Reservar mi cupo'}:{onActivate:()=>void;open:boolean;disabled?:boolean;className?:string;label?:string}){
 const [engaged,setEngaged]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)setEngaged(false)},[open]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 function activate(){if(disabled||engaged)return;const el=button.current;if(el)el.style.setProperty('--switch-travel',Math.max(0,el.clientWidth-56)+'px');setEngaged(true);if(matchMedia('(prefers-reduced-motion: reduce)').matches){onActivate();return;}timer.current=setTimeout(()=>{onActivate();timer.current=null},360)}
 return <button ref={button} type="button" className={'reserve-switch '+className} disabled={disabled} data-engaged={engaged} aria-haspopup="dialog" aria-expanded={open} onClick={activate}><span className="switch-thumb" aria-hidden="true">{engaged?<Check size={19}/>:<Ticket size={19}/>}</span><span className="switch-copy">{disabled?label:engaged?(className.includes('nav-switch')?'Abriendo…':'Abriendo tu reserva…'):label}</span><span className="switch-spark" aria-hidden="true"/></button>;
}

export function MotionExperience(){
 const cursor=useRef<HTMLDivElement>(null),progress=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
  const hero=document.querySelector<HTMLElement>('.hero'),heroPhoto=document.querySelector<HTMLElement>('.portrait>img'),words=document.querySelector<HTMLElement>('.hero h1');
  const scenes=Array.from(document.querySelectorAll<HTMLElement>('.section,.closing'));let metrics:{el:HTMLElement;top:number;height:number}[]=[];
  let raf=0,last=0,targetY=window.scrollY,y=targetY,targetX=innerWidth/2,targetPointerY=innerHeight/2,x=targetX,py=targetPointerY,seen=false,heroHeight=hero?.offsetHeight||700,maxScroll=1;
  const viewport=()=>{const v=window.visualViewport;document.documentElement.style.setProperty('--visible-height',`${v?.height??innerHeight}px`);document.documentElement.style.setProperty('--visible-center',`${(v?.offsetTop??0)+(v?.height??innerHeight)/2}px`)};
  const measure=()=>{metrics=scenes.map(el=>{let top=0;let node:HTMLElement|null=el;while(node){top+=node.offsetTop;node=node.offsetParent as HTMLElement|null}return {el,top,height:el.offsetHeight}});heroHeight=hero?.offsetHeight||700;maxScroll=Math.max(1,document.documentElement.scrollHeight-innerHeight);viewport();reduced();wake()};
  function wake(){if(!raf)raf=requestAnimationFrame(tick)}
  function tick(time:number){raf=0;const dt=Math.min(48,last?time-last:16);last=time;const ease=media.matches||!fine.matches?1:1-Math.exp(-dt/65);y+=(targetY-y)*ease;x+=(targetX-x)*ease;py+=(targetPointerY-py)*ease;
   if(progress.current)progress.current.style.transform=`scaleX(${Math.min(1,targetY/maxScroll)})`;
   if(!media.matches&&fine.matches&&innerWidth>760){const p=Math.max(0,Math.min(1,y/heroHeight));heroPhoto?.style.setProperty('transform',`translate3d(0,${p*30}px,0) scale(${1.035+p*.11})`);words?.style.setProperty('--hero-drift',`${-p*25}px`);
    document.documentElement.style.setProperty('--pointer-x',String((x/innerWidth-.5)*2));document.documentElement.style.setProperty('--pointer-y',String((py/innerHeight-.5)*2));
    for(const m of metrics){if(m.top-y>innerHeight+200||m.top+m.height-y< -200)continue;const value=Math.max(-1,Math.min(1,(innerHeight*.5-(m.top-y+m.height*.5))/innerHeight));m.el.style.setProperty('--scene-shift',value.toFixed(4));}
   }
   if(cursor.current&&fine.matches&&!media.matches&&seen){cursor.current.style.transform=`translate3d(${x}px,${py}px,0)`;cursor.current.dataset.visible='true';}
   if(Math.abs(targetY-y)>.2||Math.abs(targetX-x)>.2||Math.abs(targetPointerY-py)>.2)wake();
  }
  const scroll=()=>{targetY=window.scrollY;wake()};
  const pointer=(e:PointerEvent)=>{if(e.pointerType!=='mouse'||!fine.matches)return;targetX=e.clientX;targetPointerY=e.clientY;seen=true;if(cursor.current)cursor.current.dataset.interactive=String(!!(e.target as Element)?.closest('a,button,input,summary,[role=checkbox]'));wake()};
  const leave=()=>{seen=false;if(cursor.current)cursor.current.dataset.visible='false'};
  const pressed=()=>{if(cursor.current)cursor.current.dataset.pressed='true'};const released=()=>{if(cursor.current)cursor.current.dataset.pressed='false'};
  const reduced=()=>{if(media.matches||!fine.matches||innerWidth<=760){heroPhoto?.style.removeProperty('transform');words?.style.removeProperty('--hero-drift');document.documentElement.style.setProperty('--pointer-x','0');document.documentElement.style.setProperty('--pointer-y','0');metrics.forEach(m=>m.el.style.setProperty('--scene-shift','0'));leave()}wake()};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure);document.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerdown',pressed,{passive:true});document.addEventListener('pointerup',released,{passive:true});document.documentElement.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);media.addEventListener('change',reduced);fine.addEventListener('change',reduced);window.visualViewport?.addEventListener('resize',viewport);window.visualViewport?.addEventListener('scroll',viewport);
  const blockPinch=(e:TouchEvent)=>{if(e.touches.length>1&&e.cancelable)e.preventDefault()};
  const blockGesture=(e:Event)=>{if(e.cancelable)e.preventDefault()};
  document.addEventListener('touchmove',blockPinch,{passive:false});document.addEventListener('gesturestart',blockGesture,{passive:false});document.addEventListener('gesturechange',blockGesture,{passive:false});
  const resize=new ResizeObserver(measure);resize.observe(document.body);measure();let disposed=false;document.fonts?.ready.then(()=>{if(!disposed)measure()});
  return ()=>{disposed=true;document.removeEventListener('touchmove',blockPinch);document.removeEventListener('gesturestart',blockGesture);document.removeEventListener('gesturechange',blockGesture);cancelAnimationFrame(raf);resize.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',measure);document.removeEventListener('pointermove',pointer);document.removeEventListener('pointerdown',pressed);document.removeEventListener('pointerup',released);document.documentElement.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);media.removeEventListener('change',reduced);fine.removeEventListener('change',reduced);window.visualViewport?.removeEventListener('resize',viewport);window.visualViewport?.removeEventListener('scroll',viewport);heroPhoto?.style.removeProperty('transform')};
 },[]);
 return <><div className="ambient-scenes" aria-hidden="true"><span className="ambient-orb orb-one"/><span className="ambient-orb orb-two"/></div><div className="reading-progress" aria-hidden="true"><span ref={progress}/></div><div className="cursor-aura" ref={cursor} aria-hidden="true"><span/></div></>;
}
