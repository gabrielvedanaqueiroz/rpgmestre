"use client";

import './modalfila.css';
import { useEffect, useState, useTransition  } from 'react';
import BtnSalvar from '../btnsalvar';
import {db} from '../../services/firebaseConnection';
import {addDoc, collection, query, where, getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface PersonagemProps{
  pe_id: string;
  pe_catotal: number;
  pe_nome: string;
  pe_idclasse: number;
  pe_classe: string;
  pe_vidaatual: number;
}

interface ModalFilaProps {
  onOcultar: () => void;
}

function ModalFila({ onOcultar }: ModalFilaProps){
  
  const [tipo, setTipo] = useState<number>(0);
  const [nome, setNome] = useState<string>('');
  const [ca, setCA]     = useState<number>(0);
  const [vida, setVida] = useState<number>(0);
  const [iniciativa, setIniciativa] = useState<number>(0);
  const [idCampanha, setIdCampanha] = useState<string>(''); 
  const [idJogador, setIdJogador]   = useState<string>(''); 
  const [listaPersonagem, setListaPersonagem] = useState<PersonagemProps[]>([]);
  const [listaPersonagemFiltrado, setListaPersonagemFiltrado] = useState<PersonagemProps[]>([]);
  const [isPending, startTransition] = useTransition();

  const [index, setIndex] = useState(0);

  function nextSlide(aClasse: number){
    setIndex(aClasse === 0 ? 0 : 1); // Alterna entre 0 e 1

    let slide1  = document.getElementById("mfi-slide1");
    let slide2  = document.getElementById("mfi-slide2");

    if(slide1 !== null)
      slide1.style.visibility = (Number(aClasse) === 0 ? 'visible' : 'hidden') ;
      
    if(slide2 !== null)
      slide2.style.visibility = (Number(aClasse) === 1 ? 'visible' : 'hidden') ;
  };

  async function buscarPersonagem(aIdCampanha: string) {
  
    const q = query(collection(db, "tb_personagem"), where("pe_idcampanha", "==", aIdCampanha));
    const querySnapshot = await getDocs(q); 
    let lista:PersonagemProps[] = [];

    try {
      querySnapshot.forEach((doc)=>{
        
        lista.push({
          pe_id: doc.id.trim(),
          pe_catotal: doc.data().pe_catotal,
          pe_nome: doc.data().pe_nome.trim(),
          pe_idclasse: doc.data().pe_idclasse,
          pe_classe: doc.data().pe_classe.trim(),
          pe_vidaatual: doc.data().pe_vidaatual,
        });

      });
      
      setListaPersonagem(lista);
      
    } catch (error) {
      toast.error('Erro ao carregar personagens'+error); 
      console.log('Erro ao carregar personagens: '+error);
    }
      
  }

  useEffect(()=>{
    let idCamp: string = localStorage.getItem('rm@idcampanha') ?? '';
    setIdCampanha(idCamp);

    let idJog: string = localStorage.getItem('rm@idjogador') ?? '';
    setIdJogador(idJog);

    startTransition(() => {
      buscarPersonagem(idCamp);
    });

  }, []);
  
  async function onBuscarJogador(aValue : string ) {

    if(isPending){
      // console.log('ainda buscando jogador');
      setListaPersonagemFiltrado([{
        pe_id: '-1',
        pe_catotal: -1,
        pe_nome: 'Carregando...',
        pe_idclasse: -1,
        pe_classe: 'aguarde...',
        pe_vidaatual: -1,
      }]);
    }
    // else {

      const value = aValue;
      if (value.trim() === "") {
        setListaPersonagemFiltrado([]);
      } 
      else {
        setListaPersonagemFiltrado(
          listaPersonagem.filter((item) =>
            item.pe_nome.toLowerCase().includes(value.toLowerCase())
          )
        );
      }  
      
      // }

  }

  async function onSalvar(e: React.FormEvent) {

    e.preventDefault();
    let lnome = nome.trim();
    let lca   = ca;
    let lvida = vida;
    let lini  = iniciativa;
    let ltipo = tipo;

    let valido = lnome !== '';
    valido = valido && lca > 0;
    valido = valido && lvida > 0;
    valido = valido && lini > 0;

    if(valido){
      await addDoc(collection(db, 'tb_fila'),{
        fi_idcampanha: idCampanha.trim(),
        fi_idpersonagem: idJogador.trim(), 
        fi_nome: lnome.trim(),
        fi_ca: Number(lca),
        fi_vida: Number(lvida),
        fi_iniciativa: Number(lini),
        fi_tipo: Number(ltipo),
      })
      .then(()=>{
        onOcultar();
      })
      .catch((error)=>{
        console.log('Erro ao inserir; '+error);
        toast.error('Erro ao inserir');
      });
      
    }
    else{
      console.log('Campos obrigatórios não podem ficar vazio');
      toast.error('Campo obrigatório não pode ficar vazio')
    }
  }

  return(
    <div className='overlay' key='xpto-fi-modal'>
      <div className='mfi-container'>
        <div className='mfi-titulo'>
          <strong>Adicionar na fila de iniciativa</strong>
        </div>
        <form className='mfi-form' onSubmit={onSalvar} >
          
          <label>Tipo</label>
          <select className='mfi-sel'
            onChange={(e)=>{
              nextSlide(Number(e.target.value));
              setTipo(Number(e.target.value));
            }}>
              <option key='tipo0' value='0'>Monstro</option>
              <option key='tipo1' value='1'>Jogador</option>
  
          </select>
     
          <div className="mfi-slider" style={{ transform: `translateX(-${index * 50}%)` }}>
           
            <div id='mfi-slide1' className="mfi-slide mfi-slide1">

              <div className='mfi-div-edit'>
                <label>Nome</label>
                <input className='mfi-edit' value={nome} onChange={(e)=>{setNome(e.target.value)}} />
              </div>    
              <div className='mfi-div-edit'>
                <label>Iniciativa</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setIniciativa(Number(e.target.value))}}/>
              </div>          
              <div className='mfi-div-edit'>
                <label>Classe de Armadura</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setCA(Number(e.target.value))}} />
              </div>
              <div className='mfi-div-edit'>
                <label>Vida</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setVida(Number(e.target.value))}} />
              </div>              

            </div>

            <div id='mfi-slide2' className="mfi-slide mfi-slide2">

              <div className='mfi-div-busca'>
                <div className='mfi-div-edit'>
                  <label>Nome</label>
                  <input className='mfi-edit' value={nome} onChange={(e)=>{
                      setNome(e.target.value);
                      onBuscarJogador(e.target.value);
                    }} 
                  />
                </div>
                {listaPersonagemFiltrado.length > 0 && (
                    <ul className="mfi-lista-busca">
                      {listaPersonagemFiltrado.map((item) => (
                    
                        <li className='mfi-lista-busca-item'
                          key={item.pe_id}
                          onClick={() => {
                            setNome(item.pe_nome);
                            setCA(item.pe_catotal);
                            setTipo(item.pe_idclasse);
                            setVida(item.pe_vidaatual);
                            setListaPersonagemFiltrado([]);
                          }}
                        >
                          <h4> {item.pe_nome} </h4>
                          {item.pe_classe}    <hr/>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div className='mfi-div-edit'>
                <label>Iniciativa</label>
                <input className='mfi-edit' type='number' value={iniciativa} onChange={(e)=>{setIniciativa(Number(e.target.value))}} />
              </div>
              <div className='mfi-div-edit'>
                <label>Classe de Armadura</label>
                <input className='mfi-edit' type='number' value={ca} readOnly />
              </div>
              <div className='mfi-div-edit'>
                <label>Vida</label>
                <input className='mfi-edit' type='number' value={vida} readOnly />
              </div>
              
            </div>
          
          </div>

          <div className='mfi-botoes'>
            <button className='mfi-btn-cancelar' onClick={()=>{onOcultar()}}>Voltar</button>
            <BtnSalvar esperando='Salvando...' inicial='Salvar' />
          </div>
        </form>
      </div>

    </div>
  );

}

export default ModalFila;