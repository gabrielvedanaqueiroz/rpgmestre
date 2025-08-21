"use client";

import './magia.css';
import { useState } from 'react';
import { AiFillExperiment, AiFillHourglass, AiFillOpenAI, AiFillSignal, AiOutlineClockCircle } from "react-icons/ai";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Input from '@/components/input';
import TextArea from '@/components/textearea';
import { GiMagicSwirl } from 'react-icons/gi';
import { LiaBrainSolid } from 'react-icons/lia';

export default function CartaMagia(){

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [titulo, setTitulo]            = useState<string>('Título')
  const [texto, setTexto]              = useState<string>(TEXTO);
  const [descricao, setDescricao]      = useState<string>(TEXTO);
  const [nivel, setNivel]              = useState<number>(0);
  const [alcance, setAlcance]          = useState<string>('10 metros');
  const [tempo, setTempo]              = useState<string>('1 ação Bônus');
  const [duracao, setDuracao]          = useState<string>('10 turnos');
  const [compVocal, setCompVocal]         = useState<boolean>(false);
  const [compSomatico, setCompSomatico]   = useState<boolean>(false);
  const [compMaterial, setCompMaterial]   = useState<boolean>(false);
  const [concentracao, setConcentracao]   = useState<boolean>(false);
  
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

  function onComponentes(){
    
    let aux : string;

    if((!compVocal) && (!compSomatico) && (!compMaterial))
      aux = 'Sem'
    else {
      aux  =  (compVocal ? 'V, ': '') 
            + (compSomatico ? 'S, ': '') 
            + (compMaterial ? 'M, ': '');
      aux = aux.slice(0, -2);
    }
    return aux;
  }

  return(

    <Pagina subtitulo='Gerador de carta - Mágia'>

      <div className='cm-container'>

        <div className='cm-div-carta' id='cartas'>
            <section className="cm-carta cm-cor">
              <div className='cm-frente'>

                <section className='cm-topo'>
                  <GiMagicSwirl size={35} />
                  <label className='texto-script'>{titulo}</label>
                </section>

                <section className='cm-meio'>
                  <article className='cmm-descricao texto-script'>
                    {descricao}
                  </article>
                </section>

                <section className='cm-rodape'>

                  <div className='cmr-interno texto-script'>
                    <div className='cmr-item'>
                      <AiFillSignal size={14}/>
                      <label>Nível: {nivel}</label>
                    </div>
                    
                    <div className='cmr-item'>
                      <AiFillHourglass size={14}/>
                      <label>Tempo conjuração: {tempo}</label>
                    </div>
                    
                    <div className='cmr-item'>
                      <AiFillOpenAI size={14}/> 
                      <label>Alcance: {alcance}</label>
                    </div>

                    <div className='cmr-item'>
                      <AiOutlineClockCircle size={14}/>
                      <label>Duração: {duracao}</label>
                    </div>
                    
                    <div className='cmr-item'>
                      <AiFillExperiment size={14}/> 
                      <label>Componentes: {onComponentes()} </label>
                    </div>

                    {concentracao && (
                      <div className='cmr-item'>
                        <LiaBrainSolid  size={14}/> 
                        <label>Concentração</label>
                      </div>
                    )}                    
                    
                  </div>
                </section>

              </div>
            </section>

            <section className="cm-carta cm-cor-verso">
              <div className='cm-verso'>
                <article className='cm-ve-article'>
                  {texto}
                </article>
              </div>
            </section>
        </div>

        <div className='cm-div-edicao'>

          <Input titulo='Título' value={titulo} onChange={setTitulo} placeholder='Título'/>            

          <TextArea titulo='Descrição' value={descricao} onChange={setDescricao}/>
          
          <TextArea titulo='Texto' value={texto} onChange={setTexto}/>

          <div className='cme-linha'>
            <Input type='number' titulo='Nível' value={nivel} onChange={setNivel} placeholder='Nível'/>        
            <Input titulo='Tempo de conjuração' value={tempo} onChange={setTempo} placeholder='Tempo de conjuração'/>
          </div>
          
          <div className='cme-linha'>
            <Input titulo='Alcance' value={alcance} onChange={setAlcance} placeholder='Alcance'/>
            <Input titulo='Duração' value={duracao} onChange={setDuracao} placeholder='Duração'/>
          </div>

          <div>
            <label>Componentes</label>
            <div className='cmve-componentes'>
              
              <div className='cmve-checkbox'>
                <input type='checkbox' checked={compVocal} onChange={(e)=>(setCompVocal(e.target.checked))}/>
                Vocal 
              </div> 

              <div className='cmve-checkbox'>
                <input type='checkbox' checked={compSomatico} onChange={(e)=>(setCompSomatico(e.target.checked))}/>
                Somatico 
              </div> 

              <div className='cmve-checkbox'>
                <input type='checkbox' checked={compMaterial} onChange={(e)=>(setCompMaterial(e.target.checked))}/>
                Material 
              </div> 
            </div>
          </div>         

          <div className='cmve-checkbox'>
            <input type='checkbox' checked={concentracao} onChange={(e)=>(setConcentracao(e.target.checked))}/>
            Concentração 
          </div>          
          
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