"use client";

import './magia.css';
import { useState } from 'react';
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiFillSignal, AiOutlineClockCircle } from "react-icons/ai";
import { SiAeromexico } from "react-icons/si";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Image from 'next/image';
import borda from '@/res/borda_magia.png';
import Input from '@/components/input';
import TextArea from '@/components/textearea';

export default function CartaMagia(){

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [titulo, setTitulo]            = useState<string>('Título')
  const [texto, setTexto]              = useState<string>(TEXTO);
  const [descricao, setDescricao]      = useState<string>(TEXTO);
  const [nivel, setNivel]              = useState<number>(0);
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
    link.download = 'carta-magia.png';
    link.click();
  }

  return(

    <Pagina subtitulo='Gerador de carta - Mágia'>

      <div className='cm-container'>

        <div className='cm-div-carta' id='cartas'>
            <div className="cm-carta cm-cor">
              <div className='cm-frente'>

                <div className='cm-topo'>
                  
                  <Image src={borda} alt='borda' unoptimized className='cm-borda-topo'/>  
                  
                  <div className='cm-icone-fundo'>
                    <div className='cm-icone-frente'>
                      <SiAeromexico size={35} color="#11661c"/>
                    </div>
                  </div>

                  <div className='cm-me-div-titulo'>

                    <div className='cm-titulo-fundo texto-script '>
                      <label>{titulo}</label>
                    </div>

                    <div className='cm-me-titulo-ponta'/>
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

                  <Image src={borda} alt='borda' unoptimized className='cm-borda-rodape'/>  

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

          <Input titulo='Título' value={titulo} onChange={setTitulo} placeholder='Título'/>            

          <TextArea titulo='Descrição' value={descricao} onChange={setDescricao}/>
          
          <TextArea titulo='Texto' value={texto} onChange={setTexto}/>

          <Input type='number' titulo='Nível' value={nivel} onChange={setNivel} placeholder='Nível'/>        
          <Input titulo='Alcance' value={alcance} onChange={setAlcance} placeholder='Alcance'/>
          <Input titulo='Duração' value={duracao} onChange={setDuracao} placeholder='Duração'/>
          <Input titulo='Tempo de conjuração' value={tempo} onChange={setTempo} placeholder='Tempo de conjuração'/>
          <Input titulo='Componentes' value={componentes} onChange={setComponentes} placeholder='Componentes'/>
          
          <div>
            <button type="button" onClick={onClickGerarImagem} className="cm-botao" >
              Gerar Carta
            </button>
          </div>
        </div> 

      </div>
      
    </Pagina>

  );
}