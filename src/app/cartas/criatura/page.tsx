"use client";

import './criatura.css';
import { useRef, useState } from "react";
import Image from "next/image";
import { GiChameleonGlyph, GiHeartBeats , GiCheckedShield , GiBootPrints } from "react-icons/gi";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';

export default function CartaCriatura(){

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [titulo, setTitulo]             = useState<string>('Título');
  const [vida, setVida]                 = useState<number>(10);
  const [classeArm, setClasseArm]       = useState<number>(10);
  const [deslocamento, setDeslocamento] = useState<number>(6);
  // const [vida, setVida] = useState<number>(0);
  // const [vida, setVida] = useState<number>(0);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>){
  
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
    
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
    
      reader.readAsDataURL(file);
    } 
    else 
      setImagePreview(null);
  
  }

  function onClickImagem(){
    fileInputRef.current?.click();
  }

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

    <Pagina subtitulo='Gerador de carta - Criatura'>
      
      <div className='cc-container'>
        
        <div className="cc-div-carta" id='cartas'>
          <div className="cc-carta">
            <div className='cc-topo texto-script'>{titulo}</div>
            <div className='cc-meio'>
              {imagePreview ? (
                <div className="cc-div-imagem">
                  <Image src={imagePreview} alt="Preview" className="cc-imagem" fill unoptimized/>
                </div>
              ):
              (<div >
                <GiChameleonGlyph size={95} color="white"/>
              </div>)
            }
          </div>
          <div className='cc-rodape'>
            <div className='cc-meta'>
              <div className="cc-meta-topo">
                <div className="cc-meta-topo-item texto-script"><GiHeartBeats size={15}/> {vida}</div>
                <div className="cc-meta-topo-item texto-script"><GiCheckedShield  size={15}/> {classeArm}</div>
                <div className="cc-meta-topo-item texto-script"><GiBootPrints size={15}/> {deslocamento} </div>
              </div>
              <hr/>
              <div className="cc-meta-texto texto-script"> 
                <div><strong>Bicada:</strong> <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                1,5 m, um alvo. Acerto: 10 (1d10 + 5) de dano perfurante.</label></div>
                <div><strong>Garras:</strong> <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                1,5 m, um alvo. Acerto: 14 (2d8 + 5) de dano cortante. </label></div>
              </div>
            </div>
          </div>
        </div>

          <div className="cc-carta-verso">
            <div className="cc-verso-interno">

              <div>Vida: {vida} (7d10 + 21)</div>
              <div>Classe de armadura: {classeArm} (armadura natural)</div>
              <div>Deslocamento: {deslocamento} metros</div>
              <hr className='cc-linha'/>

              <div className='cc-vi-atributos'>
                <div className="cc-viat-item">
                  <strong>FOR</strong>
                  <label>20(+5)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>DES</strong>
                  <label>10(+0)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CON</strong>
                  <label>12(+1)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>INT</strong>
                  <label>14(+2)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>SAB</strong>
                  <label>16(+3)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CAR</strong>
                  <label>18(+4)</label>
                </div>
              </div>

              <hr className='cc-linha'/>

              <div>Perícias: Percepção +3</div>
              <div>Sentidos: visão no escuro 18m, Percepção passivao 13</div>
              <div>Visão e faro aguçados: tem vantagens nos testes de Sabedoria (Percepção) relacionados à visão e faro.</div>
              
              <hr className='cc-linha'/>

              <div className="cc-verso-texto">
                  
                  <div>
                    <strong>Ataques Múltiplos, </strong>
                    <label>realiza dois ataques: um com 
                    sua bicada e um com suas garras.</label>
                  </div>

                  <div>
                    <strong>Bicada: </strong>
                    <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                    1,5 m, um alvo. Acerto: 10 (1d10 + 5) de dano perfurante.</label>
                  </div>
                  
                  <div>
                    <strong>Garras: </strong> 
                    <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                    1,5 m, um alvo. Acerto: 14 (2d8 + 5) de dano cortante. </label>
                  </div>
                  
                </div>

            </div>
          </div>
        </div>

        <div className='cc-div-edicao'>

          <div className='cc-div-edit'>
            <label>Título:</label>
            <input className='cc-edit' value={titulo} onChange={(e)=>{setTitulo(e.target.value)}} />
          </div>  

          <div className='cc-div-edit'>
            <label>Vida:</label>
            <input type='number' className='cc-edit' value={vida} onChange={(e)=>{setVida(Number(e.target.value))}} />
          </div>  

          <div className='cc-div-edit'>
            <label>Classe de armadura:</label>
            <input type='number' className='cc-edit' value={classeArm} onChange={(e)=>{setClasseArm(Number(e.target.value))}} />
          </div>  

          <div className='cc-div-edit'>
            <label>Deslocamento:</label>
            <input type='number' className='cc-edit' value={deslocamento} onChange={(e)=>{setDeslocamento(Number(e.target.value))}} />
          </div>  
          
          <div className='cc-div-botao'>
            <button type="button" onClick={onClickImagem} className="cc-botao" >
              Selecionar Imagem
            </button>

            <button type="button" onClick={onClickGerarImagem} className="cc-botao" >
              Gerar Imagem
            </button>
          </div>

          <input className='cc-edit-oculto' ref={fileInputRef} type="file" accept="image/*" onChange={onImageChange}/>
          
        </div> 
      </div>
      
    </Pagina>
  );
}