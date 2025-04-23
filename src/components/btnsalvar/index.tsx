'use client';

import './btnsalvar.css';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

interface BtnSalvarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inicial: string;
  esperando: string;
}

function BtnSalvar({ inicial, esperando, ...rest }: BtnSalvarProps){

  const { pending } = useFormStatus(); 

  return(
    
    <button className='btn-salvar' type='submit' disabled={pending}>
       {pending ? esperando : inicial}
    </button>
  );
}

export default BtnSalvar;