"use client";

import './btnhint.css'; 
import { ReactNode, useState } from 'react';

interface BtnHintProps{
   children: ReactNode;
   hintContent: string;
   bgcor: string;
   cor:string;
}

export default function BtnHint({ children = null, hintContent, bgcor = 'red', cor = 'green' }: BtnHintProps) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='container'>
    <button style={{ background: bgcor, color: cor }}
      className='button'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
    
    {isHovered && (
      <div className='hintModal'>
        <div className='hintContent'>
          {hintContent}
        </div>
      </div>
    )}
  </div>
  );
}