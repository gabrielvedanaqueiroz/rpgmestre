"use client";

import './cardexpansivo.css';
import expandir from '@/res/expandir_mais.svg';
import recolher from '@/res/expandir_menos.svg';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

interface CardExpansivoProps {
  id: string;
  titulo: string;
  children: ReactNode;
}

function CardExpansivo({ id, titulo, children }: CardExpansivoProps){

  const [img, setImg] = useState(recolher);

  function toggleCard(){
    
    const div     = document.getElementById(id); 

    if(div){
      
      const content = div.querySelector('.content') as HTMLElement | null;
      if(content){
        if (div.classList.contains('expanded')) {
          setImg(expandir);
          content.style.display = "none";
          div.style.height      = "50px";                  // Retorna à altura inicial
          div.classList.remove('expanded');
        } 
        else {
          setImg(recolher);
          content.style.display = "block";
          div.style.height      = div.scrollHeight + "px"; // Ajusta à altura do conteúdo
          div.classList.add('expanded');
        }

      }
      
    }

  }

  return(
    <section key={id} id={id} className="ce-container expanded" >

      <div className='ce-titulo'> <strong onClick={()=>{toggleCard()}}>{titulo}</strong> </div>

      <Image className='ce-container-img-expadir' src={img} alt='expandir/recolher' onClick={()=>{toggleCard()}}/>

      <div className="content" style={{display: "block"}}>
        {children}
      </div> 
    </section>

  );
}

export default CardExpansivo;