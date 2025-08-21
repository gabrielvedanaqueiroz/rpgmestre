"use client";

import './criatura.css';
import { useRef, useState } from "react";
import Image from "next/image";
import { GiChameleonGlyph, GiHeartBeats , GiCheckedShield , GiBootPrints } from "react-icons/gi";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';
import Input from '@/components/input';
import TextArea from '@/components/textearea';

interface AtaqueProps{
  titulo: string;
  descricao: string;
}

export default function CartaCriatura(){

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo]             = useState<string>('Título');
  const [vida, setVida]                 = useState<number>(10);
  const [vidadados, setVidaDados]       = useState<string>('');
  const [classeArm, setClasseArm]       = useState<number>(10);
  const [deslocamento, setDeslocamento] = useState<number>(6);
  
  const [lstAtaque, setLstAtaque]       = useState<AtaqueProps[]>([]);
  const [atTitulo, setAtTitulo]         = useState<string>('');
  const [atDescricao, setAtDescricao]   = useState<string>('');
  
  const [forca, setForca]               = useState<number>(0);
  const [destreza, setDestreza]         = useState<number>(0);
  const [constituicao, setConstituicao] = useState<number>(0);
  const [inteligencia, setInteligencia] = useState<number>(0);
  const [sabedoria, setSabedoria]       = useState<number>(0);
  const [carisma, setCarisma]           = useState<number>(0);
  const [mdForca, setMdForca]               = useState<number>(0);
  const [mdDestreza, setMdDestreza]         = useState<number>(0);
  const [mdConstituicao, setMdConstituicao] = useState<number>(0);
  const [mdInteligencia, setMdInteligencia] = useState<number>(0);
  const [mdSabedoria, setMdSabedoria]       = useState<number>(0);
  const [mdCarisma, setMdCarisma]           = useState<number>(0);

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
    link.download = 'carta-criatura.png';
    link.click();
  }

  function onClickLimpar(){
    setImagePreview(null);
    setTitulo('Título');
    setVida(10);
    setVidaDados('');
    setClasseArm(10);
    setDeslocamento(6);
  
    setLstAtaque([]);
    setAtTitulo('');
    setAtDescricao('');
  
    setForca(0);
    setDestreza(0);
    setConstituicao(0);
    setInteligencia(0);
    setSabedoria(0);
    setCarisma(0);
    setMdForca(0);
    setMdDestreza(0);
    setMdConstituicao(0);
    setMdInteligencia(0);
    setMdSabedoria(0);
    setMdCarisma(0);

    setPericias('');
  }

  function onEditarForca(aValor: number){
    onEditarValor(aValor, 1);
  }

  function onEditarDestreza(aValor: number){
    onEditarValor(aValor, 2);
  }

  function onEditarConstituicao(aValor: number){
    onEditarValor(aValor, 3);
  }

  function onEditarInteligencia(aValor: number){
    onEditarValor(aValor, 4);
  }

  function onEditarSabedoria(aValor: number){
    onEditarValor(aValor, 5);
  }

  function onEditarCarisma(aValor: number){
    onEditarValor(aValor, 6);
  }

  function onEditarValor(aValor: number, aAtributo: number){
    
    let aux = (aValor - 10) / 2;
    let modificador =  Math.floor(aux);

    switch (aAtributo) {
      case 1:
        setForca(aValor);
        setMdForca(modificador);
      break;
      case 2:
        setDestreza(aValor);
        setMdDestreza(modificador);
      break;
      case 3:
        setConstituicao(aValor);
        setMdConstituicao(modificador);
      break;
      case 4:
        setInteligencia(aValor);
        setMdInteligencia(modificador);
      break;
      case 5:
        setSabedoria(aValor);
        setMdSabedoria(modificador);
      break;
      case 6:
        setCarisma(aValor);
        setMdCarisma(modificador);
      break;
    }
  }

  function onAddListaAtaque(){

    if((atTitulo != '') && (atDescricao != '')){
      let item : AtaqueProps = {
        titulo : atTitulo,
        descricao : atDescricao,
      }
  
      let lista = lstAtaque;
      lista.push(item);
  
      setLstAtaque(lista);
      setAtTitulo('');
      setAtDescricao('');
    }
    
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
                <GiChameleonGlyph size={95} color="white"/>
              </div>)
              }
            </div>

            <div className='cc-rodape'>
              <div className='cc-meta'>
                <div className="cc-meta-topo">
                  <div className="cc-meta-topo-item texto-script"><GiHeartBeats size={15}/> {vida}</div>
                  <div className="cc-meta-topo-item texto-script"><GiCheckedShield size={15}/> {classeArm}</div>
                  <div className="cc-meta-topo-item texto-script"><GiBootPrints size={15}/> {deslocamento} </div>
                </div>
                <hr/>
                <div className="cc-meta-texto texto-script"> 
                  <ul>
                    {lstAtaque.map((item, index)=>(
                      <li key={index}>
                        <strong>{item.titulo}: </strong> 
                        <label>{item.descricao}</label>
                      </li>
                    ))}
                  </ul>                
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
                  <label>{forca}({mdForca})</label>
                </div>
                <div className="cc-viat-item">
                  <strong>DES</strong>
                  <label>{destreza}({mdDestreza})</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CON</strong>
                  <label>{constituicao} ({mdConstituicao})</label>
                </div>
                <div className="cc-viat-item">
                  <strong>INT</strong>
                  <label>{inteligencia}({mdInteligencia})</label>
                </div>
                <div className="cc-viat-item">
                  <strong>SAB</strong>
                  <label>{sabedoria}({mdSabedoria})</label>
                </div>
                <div className="cc-viat-item">
                  <strong>CAR</strong>
                  <label>{carisma}({mdCarisma})</label>
                </div>
              </div>

              <hr className='cc-linha'/>
              <article className="cc-verso-texto">
                {pericias}
              </article>
              
              <hr className='cc-linha'/>

              <div className="cc-verso-texto">
                <ul>
                  {lstAtaque.map((item, index)=>(
                    <li key={index}>
                      <strong>{item.titulo}: </strong> 
                      <label>{item.descricao}</label>
                    </li>
                  ))}
                </ul>  
                  
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

          <hr/>
          <div className='cc-div-agrupar-linha'>
            <Input titulo='Ataque' value={atTitulo} onChange={setAtTitulo}/>
            <button className='cc-btn-ataque' onClick={onAddListaAtaque}>Adicionar</button>
          </div> 

          <TextArea titulo='Descrição' value={atDescricao} onChange={setAtDescricao}/> 

          <hr/>

          <div className='cc-div-agrupar-linha'>

            <Input type='number' titulo='For' value={forca} onChange={onEditarForca}/>
            <Input type='number' titulo='Des' value={destreza} onChange={onEditarDestreza}/>
            <Input type='number' titulo='Con' value={constituicao} onChange={onEditarConstituicao}/>
            
          </div>   

          <div className='cc-div-agrupar-linha'>

            <Input type='number' titulo='Int' value={inteligencia} onChange={onEditarInteligencia}/>
            <Input type='number' titulo='Sab' value={sabedoria} onChange={onEditarSabedoria}/>
            <Input type='number' titulo='Car' value={carisma} onChange={onEditarCarisma}/>
            
          </div>   

          <hr/>

          <TextArea titulo='Perícias' value={pericias} onChange={setPericias}/> 
          
          <div className='cc-div-botao'>
            <button type="button" onClick={onClickImagem} className="cc-botao" >
              Selecionar Imagem
            </button>
            
            <input className='cc-edit-oculto' ref={fileInputRef} type="file" accept="image/*" onChange={onImageChange}/>

            <button type="button" onClick={onClickLimpar} className="cc-botao" >
              Limpar Carta
            </button>

            <button type="button" onClick={onClickGerarImagem} className="cc-botao" >
              Gerar Carta
            </button>
          </div>          
          
        </section> 
      </div>
      
    </Pagina>
  );
}