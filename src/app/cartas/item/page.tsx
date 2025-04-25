"use client";

import './item.css';
import { ReactNode, useRef, useState } from "react";
import { GiAncientSword } from "react-icons/gi";
import Image from "next/image";
import html2canvas from 'html2canvas';
import Pagina from '@/components/pagina';

export default function CartaItem(){

  const TEXTO:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar arcu nibh, vel mattis sapien vestibulum ac. Sed dictum eu elit quis pharetra. Vestibulum vel nibh sed dolor placerat facilisis. Sed tincidunt placerat mattis. Vivamus pulvinar nisl eleifend purus imperdiet, ultricies porta nisi convallis. Cras tincidunt neque id feugiat sodales. Morbi enim odio, molestie convallis est vitae, iaculis fermentum nisi.';
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo]       = useState<string>('Título');
  const [descricao, setDescricao] = useState<string>(TEXTO);
  const [valor, setValor]         = useState<number>(0);
  const [texto, setTexto]         = useState<string>(TEXTO);
  const [carga, setCarga]         = useState<number>(9);

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

  function onGergarCargas(): ReactNode{

    const divs = [];
    for (let index = 0; index < carga; index++) {
      divs.push(
        <div key={index} className="ci-carga" />
      );
    }

    return (
      <div className='ci-tpi-carga'> 
        {divs}             
      </div>
    );
  }

  function onEditarValor(aValor: string){
    if(Number(aValor) < 0)
      aValor = '0';

    setValor(Number(aValor));   
  }

  function onEditarCarga(aValor: string){
    if(Number(aValor) > 8)
      aValor = '8';

    if(Number(aValor) < 0)
      aValor = '0';

    setCarga(Number(aValor));   
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

    <Pagina subtitulo='Gerador de carta - Item'>
      <div className="ci-div-carta" id='cartas'>

        <div className='ci-carta ci-cor'>
          
          <div className='ci-topo'>
          <div className='ci-tp-interno'>
            <div className= {carga >= 1? 'ci-tpi-imagem-comcarga':'ci-tpi-imagem'}>
              {imagePreview ? (
                  <div className="ci-div-imagem">
                    <Image src={imagePreview} alt="Preview" className="ci-imagem" fill unoptimized/>
                  </div>
                ):
                (<GiAncientSword size={120}/> )
              }           
            </div>
            
            {carga >= 1 && (onGergarCargas())}  
          </div>
            
          </div>

          <div className='ci-meio'>

            <div className='ci-me-fundo'>
              <div className='ci-me-frente texto-script'>
                <div className='ci-me-valor'>{valor}</div>
                <div className='ci-me-valor'>PO</div>
              </div>
            </div>

            <div className='ci-me-div-titulo'>

              <div className='ci-me-titulo texto-script'>
                {titulo}
              </div>
              <div className='ci-me-titulo-ponta'>

              </div>
            </div>
            
          </div>

          <div className='ci-rodape'>
            <div className='ci-rp-interno'>
              <article className='ci-rp-texto texto-script'>
                {descricao}
              </article>
            </div>

          </div>

        </div>

        <div className='ci-carta ci-cor-verso'>
          <div className='ci-interno-verso'>
            <article className='ci-vs-texto'> 
              {texto}
            </article>
          </div>
        </div>
        </div>

        <div className='ci-div-edicao'>
        <div className='ci-div-edit'>
          <label>Título:</label>
          <input className='ci-edit' value={titulo} onChange={(e)=>{setTitulo(e.target.value)}} />
        </div>  

        <div className='ci-div-edit'>
          <label>Descrição:</label>
          <textarea className='ci-edit  ci-textearea' value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} />
        </div> 

        <div className='ci-div-edit'>
          <label>Texto:</label>
          <textarea className='ci-edit ci-textearea' value={texto} onChange={(e)=>{setTexto(e.target.value)}} />
        </div> 

        <div className='ci-div-edit'>
          <label>Valor:</label>
          <input type='number' className='ci-edit' value={valor} onChange={(e)=>{onEditarValor(e.target.value)}} />
        </div> 

        <div className='ci-div-edit'>
          <label>Carga:</label>
          <input type='number' className='ci-edit' value={carga} onChange={(e)=>{onEditarCarga(e.target.value)}} />
        </div> 

        <div className='ci-div-botao'>

          <button type="button" onClick={onClickImagem} className="ci-botao" >
            Selecionar Imagem
          </button>

          <button type="button" onClick={onClickGerarImagem} className="ci-botao" >
            Gerar Imagem
          </button>

        </div>

        <input className='ci-edit-oculto' ref={fileInputRef} type="file" accept="image/*" onChange={onImageChange}/>

        </div>
    </Pagina>

  )
}