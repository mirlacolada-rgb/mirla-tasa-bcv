'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,ChevronRight,Expand,Type,Layers,X,RotateCcw} from 'lucide-react';
import assets from './guide-assets.json';
import extra from './extra-guides.json';
import {cameraPages} from './camera-pages';
const guides=[
{id:'camara',n:'01',title:'5 pasos para perder el miedo a la cámara',short:'Pierde el miedo',heading:'Enciende tu confianza.',topic:'CONFIANZA FRENTE A LA CÁMARA',description:'Conecta con el lente, graba sin buscar la perfección y ponte a prueba con un reto de tres días.',tags:['Confianza','Práctica'],pages:cameraPages.map((p,i)=>({...p,asset:assets[i]}))},
{id:'hooks',n:'02',title:'15 hooks irresistibles para tus Reels y TikToks',short:'Atrapa la atención',heading:'Haz que se queden.',topic:'HOOKS PARA REELS Y TIKTOKS',description:'Quince ganchos para conectar, despertar curiosidad y presentar productos de forma natural.',tags:['Hooks','Contenido'],pages:extra.hooks},
{id:'marcas',n:'03',title:'Cómo escribirle a las marcas y conseguir tu primera colaboración',short:'Conecta con marcas',heading:'Tu talento tiene valor.',topic:'COLABORACIONES CON MARCAS',description:'Prepara tu pitch, adapta una plantilla de mensaje y presenta tu propuesta con profesionalismo.',tags:['Marcas','Colaboraciones'],pages:extra.marcas}
];
export default function Guides(){
 const [route,setRoute]=useState(''),[index,setIndex]=useState(0),[textMode,setTextMode]=useState(false),[zoom,setZoom]=useState(false),[done,setDone]=useState(false);
 const touch=useRef({x:0,y:0}),heading=useRef<HTMLHeadingElement>(null),dialog=useRef<HTMLDialogElement>(null);
 const active=route.startsWith('#guias'),selected=guides.find(g=>route==='#guias/'+g.id),reader=!!selected,guide=selected||guides[0],pages=guide.pages,last=pages.length-1;
 useEffect(()=>{const sync=()=>{const hash=location.hash;const g=guides.find(g=>hash==='#guias/'+g.id);if(g){try{const saved=JSON.parse(localStorage.getItem('mirla-guide-'+(g.id==='camara'?'camera':g.id))||'{}');setIndex(Number.isInteger(saved.index)&&saved.index>=0&&saved.index<g.pages.length?saved.index:0);setDone(saved.done===true)}catch{setIndex(0);setDone(false)}}setRoute(hash);document.body.classList.toggle('mc-guides-active',hash.startsWith('#guias'));};sync();window.addEventListener('hashchange',sync);return()=>{window.removeEventListener('hashchange',sync);document.body.classList.remove('mc-guides-active')}},[]);
 useEffect(()=>{if(active){heading.current?.focus({preventScroll:true});requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}))}},[route]);
 useEffect(()=>{document.title=reader?guide.title+' · Mirla Colada':active?'Guías gratuitas · Mirla Colada':'MODO CREADOR · Mirla Colada'},[route]);
 useEffect(()=>{if(!reader)return;try{localStorage.setItem('mirla-guide-'+(guide.id==='camara'?'camera':guide.id),JSON.stringify({index,done}))}catch{}},[index,done,route]);
 useEffect(()=>{if(!zoom)return;dialog.current?.showModal();const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before}},[zoom]);
 function go(n:number){setIndex(Math.max(0,Math.min(last,n)));setDone(false);const toolbar=document.querySelector('.mg-toolbar');if(toolbar&&toolbar.getBoundingClientRect().top<0)toolbar.scrollIntoView({block:'start',behavior:'instant'})}
 useEffect(()=>{if(!reader)return;const key=(e:KeyboardEvent)=>{if(zoom||/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();setIndex(i=>Math.min(last,i+1))}if(e.key==='ArrowLeft'){e.preventDefault();setIndex(i=>Math.max(0,i-1))}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[reader,zoom,last]);
 if(!active)return null;
 return <main className="mg-page" id="guias" aria-label="Guías gratuitas de Mirla">
 <div className="mg-topline"><a href={reader?'#guias':'#'}><ArrowLeft size={16}/>{reader?'Todas las guías':'Volver a la masterclass'}</a><span>MIRLA COLADA / RECURSOS GRATIS</span></div>
 {!reader?<>
 <div className="mg-intro"><span className="mg-kicker"><span/> UN REGALO PARA TU LADO CREADOR</span><h1 ref={heading} tabIndex={-1}>Menos miedo.<br/><span>Más acción.</span></h1><p>Guías para dar ese primer paso, a tu ritmo.<br/>Abre una, explora sus ideas y empieza a crear.</p></div>
 <div className="mg-catalog" aria-label="Las tres guías gratuitas">{guides.map(g=><article className="mg-card" key={g.id}>
 <a className="mg-card-cover" href={'#guias/'+g.id} aria-label={'Abrir guía: '+g.title}><img src={g.pages[0].asset} alt={'Portada: '+g.title} width="941" height="1672"/><span className="mg-cover-label"><BookOpen size={16}/> GUÍA {g.n}</span></a>
 <div className="mg-card-copy"><span className="mg-pill">GRATIS · {g.pages.length} DIAPOSITIVAS</span><h2>{g.short}</h2><h3>{g.title}</h3><p>{g.description}</p><div className="mg-tags">{g.tags.map(t=><span key={t}>{t}</span>)}</div><a className="mg-button mg-primary" href={'#guias/'+g.id}>Explorar la guía<ArrowRight size={19}/></a></div>
 </article>)}</div><p className="mg-coming">Tres guías. Un mismo propósito: que te atrevas a crear.</p>

 </>:<>
 <div className="mg-reader-heading"><div><span className="mg-kicker">GUÍA {guide.n} · {guide.topic}</span><h1 ref={heading} tabIndex={-1}>{guide.heading}</h1></div><span className="mg-reader-count">0{index+1}<span> / {String(pages.length).padStart(2,'0')}</span></span></div>
 <div className="mg-reader">
 <aside className="mg-index"><p>TU RECORRIDO</p>{pages.map((p,i)=><button key={p.tag} onClick={()=>go(i)} aria-current={index===i?'step':undefined}><span className="mg-number">0{i+1}</span><span><small>{p.tag}</small>{p.title}</span><ChevronRight size={16}/></button>)}<div className="mg-aside-note"><BookOpen size={20}/><p>No tienes que hacerlo perfecto.<br/><strong>Solo tienes que empezar.</strong></p></div></aside>
 <section className="mg-viewer" aria-label="Lector de diapositivas">
 <div className="mg-toolbar"><div className="mg-view-toggle" role="group" aria-label="Formato de lectura"><button aria-pressed={!textMode} onClick={()=>setTextMode(false)}><Layers size={16}/><span>Diseño</span></button><button aria-pressed={textMode} onClick={()=>setTextMode(true)}><Type size={17}/><span>Leer texto</span></button></div><button className="mg-expand" onClick={()=>setZoom(true)} aria-label="Ampliar diapositiva"><Expand size={18}/></button></div>
 <div className="mg-stage" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY}}} onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)go(index+(dx<0?1:-1))}}>
 {textMode?<article className="mg-text" key={'text'+index}><span className="mg-pill">{pages[index].tag}</span><h2>{pages[index].title}</h2>{pages[index].text.map((p,i)=><p key={i}>{p}</p>)}</article>:<img className="mg-slide" key={index} src={pages[index].asset} alt={pages[index].tag+': '+pages[index].title+'. Usa Leer texto para acceder al contenido.'} width="941" height="1672" draggable={false}/>}
 </div>
 <div className="mg-controls"><button className="mg-arrow" onClick={()=>go(index-1)} disabled={index===0} aria-label="Diapositiva anterior"><ArrowLeft size={20}/></button><div className="mg-dots" aria-label="Seleccionar diapositiva">{pages.map((p,i)=><button key={i} aria-label={'Diapositiva '+(i+1)+': '+p.title} aria-pressed={index===i} onClick={()=>go(i)}/>)}</div><button className="mg-arrow" onClick={()=>index<last?go(index+1):setDone(true)} aria-label={index===last?'Completar guía':'Siguiente diapositiva'}>{index===last?<Check size={20}/>:<ArrowRight size={20}/>}</button></div>
 <p className="mg-caption" aria-live="polite">{pages[index].tag} · {pages[index].title}</p>
 {done&&<div className="mg-complete" role="status"><Check size={23}/><div><strong>Ahora te toca a ti.</strong><p>Lleva una idea de esta guía a la práctica. ¡Enciende tu modo creador!</p><button onClick={()=>go(0)}><RotateCcw size={14}/>Volver al inicio</button></div></div>}
 </section>
 </div></>}
 {zoom&&<dialog className="mg-dialog" ref={dialog} onCancel={()=>setZoom(false)} onClick={e=>{if(e.target===e.currentTarget)setZoom(false)}}><div className="mg-dialog-bar"><span>{pages[index].tag} · 0{index+1}/{String(pages.length).padStart(2,'0')}</span><button onClick={()=>setZoom(false)} aria-label="Cerrar ampliación" autoFocus><X size={22}/></button></div><img src={pages[index].asset} alt={pages[index].title} width="941" height="1672"/></dialog>}

 <div className="mg-bottom"><span>Hecho para que te atrevas.</span><a href="#">MODO CREADOR <ArrowRight size={15}/></a></div>
 </main>
}
