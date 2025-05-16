"use client";

import './missao.css';
import { useState } from 'react';
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiFillSignal, AiOutlineClockCircle } from "react-icons/ai";
import { SiAeromexico } from "react-icons/si";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Image from 'next/image';
import borda from '@/res/borda_magia.png';
import Input from '@/components/input';
import TextArea from '@/components/textearea';
import { IoLeafSharp } from 'react-icons/io5';
import { GiReceiveMoney } from 'react-icons/gi';

// GiReceiveMoney -recomensa, tipo(BiWorld, IoLeafSharp, GiBoxingGlove), nivel AiFillSignal  

export default function CartaMagia(){

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [titulo, setTitulo]            = useState<string>('Coletar Extrato de Cocatriz');
  const [descricao, setDescricao]      = useState<string>(TEXTO);
  const [tipo, setTipo]                = useState<number>(0);
  const [tipoDescricao, setTipoDescricao] = useState<string>('Conclave do Outono');
  const [recompensa, setRecompensa]    = useState<string>('Poção de Cura');
  const [nivelRecompensa, setNivelRecompensa]    = useState<number>(1);

  
  async function onClickGerarImagem(){
    const div = document.getElementById('cartas');
    if (!div) return;

    const canvas = await html2canvas(div, {scale:3});
    const dataURL = canvas.toDataURL('image/png');

    // Criar link para download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'carta-magia.png';
    link.click();
  }

  return(

    <Pagina subtitulo='Gerador de carta - Missão'>

      <div className='cs-container'>

        <div className='cs-div-carta' id='cartas'>

            <div className="cs-carta cs-cor">

              <div className='cs-frente texto-script'>

                <div className='cs-topo'>
                  <label>{titulo}</label>  

                  <div className='cs-tp-tipo'>
                    <IoLeafSharp size={12}/>
                    <label>- {tipoDescricao}</label>
                  </div>
               
                </div>

                <div className='cs-conteudo'>
                  <div className='cs-ct-recompensa'>
                    

                    <div className='cs-tp-tipo'>
                      <AiFillSignal size={12}/>
                      <label>- {tipoDescricao}</label>
                    </div>

                    <label>{recompensa}</label>  
                  </div>

                  <div className='cs-ct-descricao'>
                    {descricao}
                  </div>
                </div>
                
              </div>
            </div>
            
        </div>

        <div className='cs-div-edicao'>

          <Input titulo='Título' value={titulo} onChange={setTitulo} placeholder='Título'/>            
          <Input titulo='Tipo' type='number' value={tipo} onChange={setTipo} placeholder='Tipo'/> {/* combobox*/}           
          <Input titulo='Nível Recompensa' type='number' value={nivelRecompensa} onChange={setNivelRecompensa} placeholder='Nível Recompensa'/>  {/* combobox*/}                
          <Input titulo='Recompensa' value={recompensa} onChange={setRecompensa} placeholder='Recompensa'/>            
          <TextArea titulo='Descrição' value={descricao} onChange={setDescricao}/>
            
          <div>
            <button type="button" onClick={onClickGerarImagem} className="cs-botao" >
              Gerar Imagem
            </button>
          </div>
        </div> 

      </div>
      
    </Pagina>

  );
}