"use client";

import './modalvida.css';
import { useState } from "react";
import Input from "../input";
import BtnSalvar from "../btnsalvar";
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { toast } from 'react-toastify';

interface ModalVidaProps{
  idFila: string;
  vida: number;
  onOcultar: () => void;
}

export default function ModalVida(params: ModalVidaProps){

  const [vidaTemp, setVidaTemp] = useState<number>(0);
  const [negativo, setNegativo] = useState<boolean>(true);

  async function onSalvar(e: React.FormEvent) {

    e.preventDefault();
    let valor = 0;
    if(negativo)
      valor = (params.vida - Number(vidaTemp))
    else
      valor = (params.vida + Number(vidaTemp));

    const docRef = doc(db, "tb_fila", params.idFila);
      await updateDoc(docRef, {
        fi_vida: valor,
      }
    )
    .then(()=>{ 
      params.onOcultar() 
    })
    .catch((error)=>{
      console.log('Erro ao trocar condicao: '+error);
      toast.error('Erro ao trocar condicao');
    });
  }

  return(
    <div className='overlay' key='xpto-fv-modal'>
      <div className='mvd-container'>
        <div className='mvd-titulo'>
          <strong>Ajuste de Vida</strong>
        </div>
        <form className='mvd-form' onSubmit={onSalvar} >
          
          <div className='mvd-linha1'>
            <label>Vida Atual: </label>
            <label>{params.vida}</label>
          </div>

          <div className='mvd-linha2'>
            <button className='fi-btn' 
              onClick={(e)=>{
                e.preventDefault();
                setNegativo(!negativo);
              }}>
              {
                negativo ? 
                  <FaMinus size={14} aria-label='diminuir vida'/> 
                  : <FaPlus size={14} aria-label='diminuir vida'/> 
              } 
            </button>
            <div>
              <Input type='number' titulo="" placeholder="Vida temp" value={vidaTemp} onChange={setVidaTemp} name="vidaTemp" />
            </div>
          </div>         
          <hr/>
          <div className='mvd-linha3'>
            <label>=  </label>
            <label>{
              negativo ? (params.vida - Number(vidaTemp)) : (params.vida + Number(vidaTemp))  
            }</label>
          </div>
          <div className='mvd-botoes'>
            <button className='mvd-btn-cancelar' onClick={()=>{params.onOcultar()}}>Voltar</button>
            <BtnSalvar esperando='Salvando...' inicial='Salvar' />
          </div>
        </form>
      </div>
    </div>
  )
}