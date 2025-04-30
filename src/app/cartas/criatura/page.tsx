"use client";

import './criatura.css';
import { useRef, useState } from "react";
import Image from "next/image";
import { GiChameleonGlyph, GiHeartBeats , GiCheckedShield , GiBootPrints, GiBatwingEmblem } from "react-icons/gi";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Input from '@/components/input';

export default function CartaCriatura(){

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [titulo, setTitulo]             = useState<string>('Título');
  const [vida, setVida]                 = useState<number>(10);
  const [vidadados, setVidaDados]       = useState<string>('');
  const [classeArm, setClasseArm]       = useState<number>(10);
  const [deslocamento, setDeslocamento] = useState<number>(6);
  const [ataques, setAtaques]           = useState<string>('');
  const [forca, setForca]               = useState<number>(0);
  const [destreza, setDestreza]         = useState<number>(0);
  const [constituicao, setConstituicao] = useState<number>(0);
  const [inteligencia, setInteligencia] = useState<number>(0);
  const [sabedoria, setSabedoria]       = useState<number>(0);
  const [carisma, setCarisma]           = useState<number>(0);
  const [pericias, setPericias]         = useState<string>('');

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
        
        <section className="cc-div-carta" id='cartas'>
          <div className="cc-carta">
            <div className='cc-topo texto-script'>{titulo}</div>
            <div className='cc-meio'>
              {imagePreview ? (
                <div className="cc-div-imagem">
                  <Image src={imagePreview} alt="Preview" className="cc-imagem" fill unoptimized/>
                </div>
              ):
              (<div >
                {/* <GiChameleonGlyph size={95} color="white"/> */}
                <GiBatwingEmblem size={120} color="white"/>
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
                {/* <div><strong>Bicada:</strong> <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                1,5 m, um alvo. Acerto: 10 (1d10 + 5) de dano perfurante.</label></div>
                <div><strong>Garras:</strong> <label>Ataque Corpo-a-Corpo com Arma: +7 para atingir, alcance 
                1,5 m, um alvo. Acerto: 14 (2d8 + 5) de dano cortante. </label></div> */}
                {ataques}
              </div>
            </div>
          </div>
        </div>

          <div className="cc-carta-verso">
            <div className="cc-verso-interno">

              <div>Vida: {vida} ({vidadados})</div>
              <div>Classe de armadura: {classeArm} (armadura natural)</div>
              <div>Deslocamento: {deslocamento} metros</div>
              <hr className='cc-linha'/>

              <div className='cc-vi-atributos'>
                <div className="cc-viat-item">
                  <strong>FOR</strong>
                  <label>{forca}(-2)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>DES</strong>
                  <label>{destreza}(+3)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CON</strong>
                  <label>{constituicao}+1</label>
                </div>
                <div className="cc-viat-item">
                  <strong>INT</strong>
                  <label>{inteligencia}(0)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>SAB</strong>
                  <label>{sabedoria}(+1)</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CAR</strong>
                  <label>{carisma}(+2)</label>
                </div>
              </div>

              <hr className='cc-linha'/>
              <div className="cc-verso-texto">
                {pericias}
              </div>
              {/* <div>Perícias: Percepção +3</div>
              <div>Sentidos: visão no escuro 18m, Percepção passivao 13</div>
              <div>Visão e faro aguçados: tem vantagens nos testes de Sabedoria (Percepção) relacionados à visão e faro.</div> */}
              
              <hr className='cc-linha'/>

              <div className="cc-verso-texto">
                {ataques}
                  {/* <div>
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
                  </div> */}
                  
                </div>

            </div>
          </div>
        </section>

        <section className='cc-div-edicao'>

          <Input titulo='Título' value={titulo} onChange={setTitulo}/>

          <div className='cc-div-agrupar-linha'>

            <Input type='number' titulo='Vida' value={vida} onChange={setVida}/>
            <Input titulo='Dados' value={vidadados} onChange={setVidaDados}/>
            <Input type='number' titulo='CA' value={classeArm} onChange={setClasseArm}/>
            <Input type='number' titulo='Deslocamento' value={deslocamento} onChange={setDeslocamento}/>
            
          </div>     

          <div className='cc-div-edit'>
            <label>Ataques</label>
            <textarea className='cc-textearea' value={ataques} onChange={(e)=>{setAtaques(e.target.value)}} />
          </div>      

          <hr/>

          <div className='cc-div-agrupar-linha'>

            <Input type='number' titulo='For' value={forca} onChange={setForca}/>
            <Input type='number' titulo='Des' value={destreza} onChange={setDestreza}/>
            <Input type='number' titulo='Con' value={constituicao} onChange={setConstituicao}/>
            
          </div>   

          <div className='cc-div-agrupar-linha'>

            <Input type='number' titulo='Int' value={inteligencia} onChange={setInteligencia}/>
            <Input type='number' titulo='Sab' value={sabedoria} onChange={setSabedoria}/>
            <Input type='number' titulo='Car' value={carisma} onChange={setCarisma}/>
            
          </div>   

          <hr/>

          <div className='cc-div-edit'>
            <label>Perícias</label>
            <textarea className='cc-textearea' value={pericias} onChange={(e)=>{setPericias(e.target.value)}} />
          </div>  
          
          <div className='cc-div-botao'>
            <button type="button" onClick={onClickImagem} className="cc-botao" >
              Selecionar Imagem
            </button>
            
            <input className='cc-edit-oculto' ref={fileInputRef} type="file" accept="image/*" onChange={onImageChange}/>

            <button type="button" onClick={onClickGerarImagem} className="cc-botao" >
              Gerar Imagem
            </button>
          </div>          
          
        </section> 
      </div>
      
    </Pagina>
  );
}