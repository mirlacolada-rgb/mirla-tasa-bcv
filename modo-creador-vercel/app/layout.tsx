import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={title:'MODO CREADOR · Mirla Colada',description:'Activa tu mente, pierde el miedo y sal a monetizar. Masterclass presencial con Mirla Colada. 14 de noviembre de 2026, Supercines CC La Granja, Naguanagua.',icons:{icon:'/favicon.svg'}};
export const viewport: Viewport={width:'device-width',initialScale:1,maximumScale:1,userScalable:false,viewportFit:'cover'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('mirla-theme')==='light'?'light':'dark'}catch{}"}}/></head><body>{children}</body></html>}
