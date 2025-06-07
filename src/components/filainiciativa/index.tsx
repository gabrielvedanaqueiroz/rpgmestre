"use client";

import './filainiciativa.css';
import { useEffect, useState } from 'react';
import finalizar from '@/res/parar.svg'
import adicionar from '@/res/adicionar.svg'
import anterior from '@/res/anterior.svg'
import proximo from '@/res/proximo.svg'
import ca from '@/res/ca.svg'
import vida from '@/res/vida.svg'
import iniciativa from '@/res/iniciativa.svg'
import {db} from '@/services/firebaseConnection';
import {collection, query, where, getDocs, doc, deleteDoc, updateDoc, orderBy } from 'firebase/firestore';
import { getImagem, jCondicao } from '@/utils';
import Image from 'next/image';
import ModalFila from '../modalfila';
import { toast } from 'react-toastify';
import { GiAchillesHeel, GiArmSling, GiBackPain, GiBandaged, GiBoneGnawer, GiCementShoes, GiComa, GiDeadHead, GiEgyptianWalk, GiEskimo, GiInvisible, GiPsychicWaves, GiWorriedEyes } from 'react-icons/gi';
import { FaMinus, FaPersonFalling, FaPlus } from 'react-icons/fa6';
import { MdDeleteOutline, MdPersonPin } from 'react-icons/md';
import ModalCondicao from '../modalcondicao';
import { BiDotsVerticalRounded } from 'react-icons/bi';


interface FilaProps{
  fi_id: string;
  fi_ca: number;
  fi_idpersonagem: number;
  fi_iniciativa: number;
  fi_nome: string;
  fi_tipo: number;
  fi_vida: number;
  fi_idcampanha: string;
  fi_posicao: number;
  fi_condicao: number;
};

function FilaIniciativa(){

  const [posicao, setPosicao] = useState<number>(0);
  const [turno, setTurno] = useState<number>(1);
  const [lista, setLista] = useState<FilaProps[]>([]);

  const [showModalAddFila, setShowModalAddFila] = useState<boolean>(false);
  const [showModalAddCondicao, setShowModalAddCondicao] = useState<boolean>(false);
  const [showMenuPopup, setShowMenuPopup] = useState<boolean>(false);  
  const [showCondicaoDetalhe, setShowCondicaoDetalhe] = useState<boolean>(false);

  const [idFila, setIdFila] = useState<string>('');
  const [condicaoItem, setCondicaoItem] = useState({nome:'', efeito:''});

  async function buscar() {
    let pos = Number(localStorage.getItem('rm@filainiposicao'));
    setPosicao(pos);

    let tur = Number(localStorage.getItem('rm@filainiturno'));
    tur = (tur === 0? 1: tur);
    setTurno(tur);

    let idCamp = localStorage.getItem('rm@idcampanha') ?? process.env.NEXT_PUBLIC_IDCAMPANHA as string;
    
    const q = query(collection(db, "tb_fila"), where("fi_idcampanha", "==", idCamp), orderBy("fi_iniciativa", "desc"));
    const querySnapshot = await getDocs(q); 
    let lista: FilaProps[] = [];

    try {
      let i = 0;
      querySnapshot.forEach((doc)=>{
        
        lista.push({
          fi_id: doc.id.trim(),
          fi_ca: doc.data().fi_ca,
          fi_idpersonagem: doc.data().fi_idpersonagem.trim(),
          fi_iniciativa: Number(doc.data().fi_iniciativa),
          fi_nome: doc.data().fi_nome.trim(),
          fi_tipo: doc.data().fi_tipo,
          fi_vida: doc.data().fi_vida,
          fi_idcampanha : doc.data().fi_idcampanha.trim(),
          fi_posicao : i,
          fi_condicao: doc.data().fi_condicao| 0,
        });

        i++;
      });
      
      setLista(lista);
      
    } catch (error) {
      toast.error('Erro ao carregar fila de iniciativa'+error); 
      console.log('Erro ao carregar fila iniciativa: '+error);
    }
  }

  useEffect(()=>{
    buscar();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('Tecla ESC pressionada!');
        setShowMenuPopup(false);
        setShowModalAddCondicao(false);
        setShowModalAddFila(false);
        setShowCondicaoDetalhe(false);
      }
    };

    if (typeof window !== 'undefined') 
      window.addEventListener('keydown', handleEsc);

    // Limpeza do listener ao desmontar o componente
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };

  },[lista]);

  function onProximo(){
    
    if(lista.length > 0){
      let pos:number = 0;

      if(posicao < (lista.length -1 ))
        pos = posicao+1;

      setPosicao(pos);
      localStorage.setItem('rm@filainiposicao', pos.toString());

      if(pos === 0 ){
        let tur:number = turno;
        tur++;
        setTurno(tur);
        localStorage.setItem('rm@filainiturno', tur.toString());

        let lbl = document.getElementById("lblturno") as HTMLElement;

        // Salva os estilos originais
        let corFundoOriginal = lbl.style.backgroundColor;
        let corTextoOriginal = lbl.style.color;

        // Aplica a nova cor
        lbl.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--cor-selecionada'); 
        lbl.style.color           = "white";

        setTimeout(() => {
          lbl.style.backgroundColor = corFundoOriginal;
          lbl.style.color = corTextoOriginal;
        }, 1000);
      }
    }
      
  }

  function onAnterior(){

    if(lista.length > 0){
      let pos:number = posicao;

      if (posicao > 0)
        pos = posicao-1;

      setPosicao(pos);
      localStorage.setItem('rm@filainiposicao', pos.toString());
    }
      
  }

  function onFinalizarCombate(){
    
    localStorage.setItem('rm@filainiturno', '0');
    localStorage.setItem('rm@filainiposicao', '0');
    setPosicao(0);
    setTurno(1);
    // buscar()
  }

  function onAdicionar(){
    setShowModalAddFila(true);
  }

  async function onVidaInc(aId:string, aVida:number){

    let lvida = aVida;
    lvida++;

    const docRef = doc(db, "tb_fila", aId);
      await updateDoc(docRef, {
        fi_vida: lvida,
      }
    )
    .then(()=>{ })
    .catch((error)=>{
      console.log('Erro ao editar: '+error);
      toast.error('Erro ao editar');
    });
  }

  async function onVidaDec(aId:string, aVida:number){
    let lvida = aVida;
    lvida--;

    if(lvida < 0)
      lvida = 0;

    const docRef = doc(db, "tb_fila", aId);
      await updateDoc(docRef, {
        fi_vida: lvida,
      }
    )
    .then(()=>{ })
    .catch((error)=>{
      console.log('Erro ao editar: '+error);
      toast.error('Erro ao editar');
    });
  }

  async function onRemover(aId:string){
    
    setShowMenuPopup(false); 
    
    const docRef = doc(db, "tb_fila", aId);
    await deleteDoc(docRef)
    .then(()=>{ })
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  

  }

  function onCondicao(aIndex: number){

    if((aIndex > 0) && (aIndex < jCondicao.length)){

      let item = jCondicao[aIndex];
      let icon;

      switch (aIndex) {
    
        case 2:
          icon = <GiBackPain size={20}/>   
          break;
        case 3:
          icon = <GiComa size={20}/>   
          break;
        case 4:
          icon = <GiWorriedEyes size={20}/>   
          break;
        case 5:
          icon = <FaPersonFalling size={20}/>   
          break;
        case 6:
          icon = <GiEskimo size={20}/>   
          break;
        case 7:
          icon = <GiBoneGnawer size={20}/>   
          break;
        case 8:
          icon = <GiAchillesHeel size={20}/>   
          break;
        case 9:
          icon = <GiArmSling size={20}/>   
          break;
        case 10:
          icon = <GiDeadHead size={20}/>   
          break;
        case 11:
          icon = <GiInvisible size={20}/>   
          break;
        case 12:
          icon = <GiEgyptianWalk size={20}/>   
          break;
        case 13:
          icon = <GiCementShoes size={20}/>   
          break;
        case 14:
          icon = <GiPsychicWaves size={20}/>   
          break;
        default:
          icon = <GiBandaged size={20}/>   
          break;    
        }
      
      return(
        <div > {/*className='fi-div-condicao'*/}
          <button className='fi-btn' onClick={()=>{onCondicaoDetalhe(aIndex)}}>
            {icon}
            <label className='fi-co-descricao'>{item.nome}</label>
          </button>
          
        </div>
      );
    }
    else
    return;    
  }

  function onModalCondicao(aId: string){
    setShowMenuPopup(false); 
    setIdFila(aId);
    setShowModalAddCondicao(true);     
  }

  function onShowMenu(aId: string){
    setIdFila(aId);
    setShowMenuPopup(true); 
    setShowCondicaoDetalhe(false); 
  }

  function onCondicaoDetalhe(aIndex: number){

    if(!showCondicaoDetalhe){
      let item = jCondicao[aIndex];
      setCondicaoItem(item);
    }
    
    setShowCondicaoDetalhe(!showCondicaoDetalhe);  
  }

  return (

    <section className='fi-container'>
      
      <div className='fi-div-iniciativa'>
        
        <strong className='fi-div-iniciativa-titulo'>Fila de Iniciativa</strong>

        <div className='fi-div-fila'>
          
          <ul style={{display: 'flex', flexDirection:'column'}}>

            {/* navigator */ }
            <li> 
              <div className='fi-navigator'>
                <Image className='fi-navigator-btn' src={adicionar} alt='adicionar' onClick={onAdicionar}/>
                <Image className='fi-navigator-btn' src={finalizar} alt='finalizar combate' onClick={onFinalizarCombate}/>
                <div className='fi-navigator-div'/>
                <Image className='fi-navigator-btn' src={anterior} alt='anterior' onClick={onAnterior}/>
                <Image className='fi-navigator-btn' src={proximo} alt='proximo' onClick={onProximo}/>
                <div className='fi-navigator-div'/>
                <label className='fi-navigator-turno' id="lblturno">Turno: {turno}</label>
              </div> 
            </li>

            {/* lista de iniciativa */ }
            {lista.map((item)=>{
              return(
                <li key={item.fi_id} className={Number(item.fi_posicao) === posicao? 'fi-item-selecionado': 'fi-item'}>
                  
                  <div className='fi-item-left'>
                    <div className ='fi-div-tipo'>
                      <Image src={getImagem(item.fi_tipo)} alt='personagem'/> 
                    </div>
                  </div>            

                  <div className='fi-item-center'>
                    <strong>{item.fi_nome} </strong> 
                    <div className='fi-item-sublinha'>
                      <div className='fi-div-sublinha'> <Image src={vida} alt='vida'/> {item.fi_vida} </div>
                      <div className='fi-div-sublinha'> <Image src={ca} alt='classe de armadura'/> {item.fi_ca} </div>
                      <div className='fi-div-sublinha'> <Image src={iniciativa} alt='iniciaiva'/> {item.fi_iniciativa} </div>
                      
                      {onCondicao(item.fi_condicao)}
                     
                      <div className='fi-div-vida'>
                        
                        <button className='fi-btn' onClick={()=>{onVidaDec(item.fi_id, item.fi_vida)}}>
                          <FaMinus size={14} aria-label='diminuir vida'/> 
                        </button>
  
                        <div className='fi-div-vida-div'/>

                        <button className='fi-btn' onClick={()=>{onVidaInc(item.fi_id, item.fi_vida)}}>
                          <FaPlus size={14} aria-label='aumentar vida'/> 
                        </button>

                      </div>
                     
                    </div>
                   
                  </div>            

                  <div className='fi-item-right'>
                    <button className='fi-btn' 
                      onClick={(e)=>{
                        e.preventDefault();
                        onShowMenu(item.fi_id);
                        // const [position, setPosition] = useState({ x: 0, y: 0 });
                        // style={{ top: position.y, left: position.x }}
                        // setPosition({ x: e.clientX, y: e.clientY });
                      }}>
                      <BiDotsVerticalRounded size={20} />
                    </button>                 
                    
                  </div>            
                </li>
              ) 
            })}   

          </ul>

          {showMenuPopup && (
            <ul className="fi-menu" >
              <li key='fi-menu-contexto1' className="fi-menu-item">
                <button className='fi-btn' onClick={()=>{onModalCondicao(idFila)} }>
                  <MdPersonPin size={20}/>
                  <label>Trocar Condição</label>
                </button>                         
              </li>
              <li key='fi-menu-contexto2'><hr/></li>
              <li key='fi-menu-contexto3' className="fi-menu-item">
                <button className='fi-btn' onClick={()=>{onRemover(idFila)}}>
                  <MdDeleteOutline size={20} />
                  <label>Excluir</label>
                </button> 
              </li>              
            </ul>
          )}

        </div>

      </div>      

      {showModalAddFila && (
        <ModalFila 
          onOcultar={()=>{
            buscar();
            setShowModalAddFila(false);
          }}
        />
      )} 

      {showModalAddCondicao && (
        <ModalCondicao idFila={idFila} 
          onOcultar={()=>{
            buscar();
            setShowModalAddCondicao(false);
          }}
        />
      )} 

      {showCondicaoDetalhe &&( 
        <div className='fi-co-detalhe'>
          <strong>{condicaoItem.nome}</strong><br/>
          <article className='fi-coa-detalhe'>
            {condicaoItem.efeito}
          </article>
        </div> 
      )}
      
    </section>
   
  )
}

export default FilaIniciativa;