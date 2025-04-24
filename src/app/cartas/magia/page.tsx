"use client";

import './magia.css';
import { useState } from 'react';
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiFillSignal, AiOutlineClockCircle } from "react-icons/ai";
import { SiAeromexico } from "react-icons/si";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';

export default function CartaMagia(){

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [titulo, setTitulo]            = useState<string>('Título')
  const [texto, setTexto]              = useState<string>(TEXTO);
  const [descricao, setDescricao]      = useState<string>(TEXTO);
  const [nivel, setNivel]              = useState<string>('0');
  const [alcance, setAlcance]          = useState<string>('10 metros');
  const [tempo, setTempo]              = useState<string>('1 ação Bônus');
  const [duracao, setDuracao]          = useState<string>('10 turnos');
  const [componentes, setComponentes]  = useState<string>('V, S, M');

  
  async function onClickGerarImagem(){
    const div = document.getElementById('cartas');
    if (!div) return;

    const canvas = await html2canvas(div, {scale:3});
    const dataURL = canvas.toDataURL('image/png');

    // Criar link para download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'minha-div.png';
    link.click();
  }

  return(

    <Pagina subtitulo='Gerador de carta - Mágia'>

      <div className='cm-div-carta' id='cartas'>
          <div className="cm-carta cm-cor">
            <div className='cm-frente'>

              <div className='cm-topo'>
                
                <div className='cm-icone-fundo'>
                  <div className='cm-icone-frente'>
                    <SiAeromexico size={35} color="#11661c"/>
                  </div>
                </div>

                <div className='ci-me-div-titulo'>

                  <div className='cm-titulo-fundo texto-script '>
                    <label>{titulo}</label>
                  </div>

                  <div className='ci-me-titulo-ponta'/>
                </div>
              </div>

              <div className='cm-meio'>
                <div className='ce-meio-interno'>
                  <article className='cm-me-article texto-script'>
                    {descricao}
                  </article>
                </div>
              </div>
              <div className='cm-rodape'>
                <div className='cm-rodape-interno texto-script'>
                  <div className='cm-rp-item'>
                    <AiFillSignal size={14}/>
                    <label>Nível: {nivel}</label>
                  </div>

                  <div className='cm-rp-item'>
                    <AiFillHourglass size={14}/>
                    <label>Tempo conjuração: {tempo}</label>
                  </div>
                  <div className='cm-rp-item'>
                    <AiFillOpenAI size={14}/> 
                    <label>Alcance: {alcance}</label>
                  </div>
                  <div className='cm-rp-item'>
                    <AiFillExperiment size={14}/> 
                    <label>Componentes: {componentes}</label>
                  </div>
                  <div className='cm-rp-item'>
                    <AiOutlineClockCircle size={14}/>
                    <label>Duração:{duracao}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cm-carta cm-cor-verso">
            <div className='cm-verso'>
              <article className='cm-ve-article'>
                {texto}
              </article>
            </div>
          </div>
      </div>

      <div className='cm-div-edicao'>
          <div className='cm-div-edit'>
            <label>Título:</label>
            <input className='cm-edit' value={titulo} onChange={(e)=>{setTitulo(e.target.value)}} />
          </div>  

          <div className='cm-div-edit'>
            <label>Descrição:</label>
            <textarea className='cm-edit  cm-textearea' value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Texto:</label>
            <textarea className='cm-edit cm-textearea' value={texto} onChange={(e)=>{setTexto(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Nível:</label>
            <input type='number' className='cm-edit' value={nivel} onChange={(e)=>{setNivel(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Alcance:</label>
            <input className='cm-edit' value={alcance} onChange={(e)=>{setAlcance(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Druação:</label>
            <input className='cm-edit' value={duracao} onChange={(e)=>{setDuracao(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Tempo conjuração:</label>
            <input className='cm-edit' value={tempo} onChange={(e)=>{setTempo(e.target.value)}} />
          </div> 

          <div className='cm-div-edit'>
            <label>Componentes:</label>
            <input className='cm-edit' value={componentes} onChange={(e)=>{setComponentes(e.target.value)}} />
          </div> 
          
          <div>
            <button type="button" onClick={onClickGerarImagem} className="cc-botao" >
              Gerar Imagem
            </button>
          </div>
      </div> 
    </Pagina>

  );
}