"use client";

import './missao.css';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Input from '@/components/input';
import TextArea from '@/components/textearea';
import { IoLeafSharp } from 'react-icons/io5';
import { GiBoxingGlove, GiReceiveMoney } from 'react-icons/gi';
import { BiWorld } from 'react-icons/bi';
import MensagemFlash from '@/components/mensagemflash';
import { VscDebugBreakpointLog } from 'react-icons/vsc';

export default function CartaMagia(){

  function onTipo(){

    switch (tipoId) {
      case 1:
        return <IoLeafSharp size={18}/> 
      case 2:        
        return <GiBoxingGlove size={18}/>       
      default:
        return <BiWorld size={18}/>
    }
     
  }

  function onRecompensa(){

    if(tipoId === 1){
      switch (recompensaNivel) {
        case 1:
          return '100 PO';
        case 2: 
          return '200 PO';
        case 3: 
          return '500 PO';    
        default:
          return '1000 PO';
      }
    }
    else{
      switch (recompensaNivel) {
        case 1:
          return '50 PO';
        case 2: 
          return '100 PO';
        case 3: 
          return '200 PO';    
        default:
          return '300 PO';
      }
    }
    
  }

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [titulo, setTitulo]            = useState<string>('Título');
  const [descricao, setDescricao]      = useState<string>(TEXTO);
  const [tipoId, setTipoId]            = useState<number>(0);
  const [recompensaAdicional, setRecompensa]    = useState<string>('Recompensa adicional');
  const [recompensaNivel, setNivelRecompensa]   = useState<number>(1);

  const [show, setShow]= useState<boolean>(false);
  
  async function onClickGerarImagem(){

    // setShow(true);
    // return;

    const div = document.getElementById('cartas');
    if (!div) return;

    const canvas = await html2canvas(div, {scale:3});
    const dataURL = canvas.toDataURL('image/png');

    // Criar link para download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'carta-missao.png';
    link.click();
  }

  return(

    <Pagina subtitulo='Gerador de carta - Missão'>

      {show && (<MensagemFlash mensagem='teste de mensagem' tipo='sucess'/>)}

      <div className='cs-container'>

        <section className='cs-div-carta' id='cartas'>

            <div className="cs-carta cs-cor">

              <div className='cs-frente texto-script'>

                <section className='cs-topo'>
                  
                  <div className='cs-tp-titulo'>
                    <div className='cs-circulo'>
                      {onTipo()}  
                    </div>
                    
                    <label>{titulo}</label>  
                  </div>            

                  <div className='cs-tp-recompensa'>
                   
                    <div className='cs-circulo'>
                      <GiReceiveMoney size={14}/>
                    </div>
                    <label>{onRecompensa()} - {recompensaAdicional}</label>             

                  </div>      

                </section>

                <section className='cs-conteudo'>
                  <div className='cs-ct-div-separador'>
                    <div className='cs-ct-linha'/>
                    <div className='cs-ct-losango-left'>                    
                      <VscDebugBreakpointLog size={8}/> 
                    </div>
                    <div className='cs-ct-losango-right'>
                      <VscDebugBreakpointLog size={8}/> 
                    </div>      
                  </div>
                  <article>{descricao}</article> 
                </section>
                
              </div>
            </div>
            
        </section>

        <section className='cs-div-edicao'>

          <Input titulo='Título' value={titulo} onChange={setTitulo} placeholder='Título'/>      
          <div className="cbx-div-edit">
            <label>Tipo Missão</label>
            <select id="meu-combo" className="cbx-edit" value={tipoId} onChange={(e)=>{setTipoId(Number(e.target.value) )}}>
              <option value="">Selecione...</option>
              <option value={1}>Conclave do Outono</option>
              <option value={2}>Quebra-Queixo</option>
              <option value={3}>Mundo</option>
            </select>
          </div>                
          <div className="cbx-div-edit">
            <label>Nível Reconpensa</label>
            <select id="meu-combo" className="cbx-edit" value={recompensaNivel} onChange={(e)=>{setNivelRecompensa(Number(e.target.value) )}}>
              <option value="">Selecione...</option>
              <option value={1}>Nível 1</option>
              <option value={2}>Nível 2</option>
              <option value={3}>Nível 3</option>
              <option value={4}>Nível 4</option>
            </select>
          </div>
          <Input titulo='Recompensa Adicional' value={recompensaAdicional} onChange={setRecompensa} placeholder='Recompensa Adicional'/>            
          <TextArea titulo='Descrição' value={descricao} onChange={setDescricao}/>

          <div>
            <button type="button" onClick={onClickGerarImagem} className="cs-botao" >
              Gerar Carta
            </button>
          </div>
        </section> 

      </div>
      
    </Pagina>

  );
}