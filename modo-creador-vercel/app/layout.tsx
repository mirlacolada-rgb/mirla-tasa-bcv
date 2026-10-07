import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'MODO CREADOR · Mirla Colada',description:'Activa tu mente, pierde el miedo y sal a monetizar. Masterclass presencial con Mirla Colada. 14 de noviembre de 2026, Supercines CC La Granja, Naguanagua.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
