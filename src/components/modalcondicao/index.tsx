"use client";

import { useState } from 'react';
import './modalcondicao.css';
import BtnSalvar from '../btnsalvar';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { toast } from 'react-toastify';
import { jCondicao } from '@/utils';

interface ModalCondicaoProps {
  idFila: string;
  onOcultar: () => void;
}

export default function ModalCondicao({idFila, onOcultar }: ModalCondicaoProps){

  const [condicao, setCondicao] = useState<number>(0);

  async function onSalvar(e: React.FormEvent) {

    e.preventDefault();

    const docRef = doc(db, "tb_fila", idFila);
      await updateDoc(docRef, {
        fi_condicao: condicao,
      }
    )
    .then(()=>{ 
      onOcultar() 
    })
    .catch((error)=>{
      console.log('Erro ao trocar condicao: '+error);
      toast.error('Erro ao trocar condicao');
    });
  }

  return(
    <div className='overlay' key='xpto-fic-modal'>
      <div className='mfic-container'>
        <div className='mfic-titulo'>
          <strong>Adicionar uma condição</strong>
        </div>
        <form className='mfic-form' onSubmit={onSalvar} >
          
          <label>Condição</label>
          <select className='mfic-sel'
            onChange={(e)=>{ setCondicao(Number(e.target.value)); }}>
              {
                jCondicao.map((element, index) => {
                  return <option key={index} value={index}>{element.nome}</option>;   
                })
              }
  
          </select>

          <div className='mfic-botoes'>
            <button className='mfic-btn-cancelar' onClick={()=>{onOcultar()}}>Voltar</button>
            <BtnSalvar esperando='Salvando...' inicial='Salvar' />
          </div>
        </form>
      </div>  

    </div>
  )
}
