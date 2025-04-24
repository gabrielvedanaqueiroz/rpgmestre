
import './pagina.css';
import Header from '@/components/header';
import { ReactNode } from 'react';

interface PaginaProps {
  children: ReactNode;
  subtitulo:string;
}

export default function Pagina({children, subtitulo }:PaginaProps) {
  return (
    <div className='pg-page'>
      <Header subtitulo={subtitulo} />
      
      <main className='pg-container'>
        {children}
      </main>
      
    </div>
  );
}
