import './modalfila.css';
import { useEffect, useRef, useState } from 'react';
import BtnSalvar from '../btnsalvar';
import {db} from '../../services/firebaseConnection';
import {addDoc, collection} from 'firebase/firestore';
import { toast } from 'react-toastify';

function ModalFila(props){

  const tipoArr = ['Monstro', 'Barbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Guardião'];

  
  const [tipo, setTipo] = useState(0);
  const [nome, setNome] = useState('');
  const [ca, setCA]     = useState(0);
  const [vida, setVida] = useState(0);
  const [iniciativa, setIniciativa] = useState(0);
  // const ca          = useRef(0);
  // const vida        = useRef(0);
  // const iniciativa  = useRef(0);
  // const tipo        = useRef(0);
  const [idCampanha, setIdCampanha] = useState(''); 
  const [idJogador, setIdJogador]   = useState(''); 

  const [index, setIndex] = useState(0);

  function nextSlide(aClasse){
    setIndex((Number(aClasse) === 0 ? 0 : 1)); // Alterna entre 0 e 1
  };

  useEffect(()=>{
    let idCamp= localStorage.getItem('rm@idcampanha');
    setIdCampanha(idCamp);

    let idJog= localStorage.getItem('rm@idjogador');
    setIdJogador(idJog);
  }, []);
  
  async function onBuscarJogador(aNome) {
    
  }

  async function onSalvar(e) {


    let lnome = nome.trim();
    let lca   = ca;
    let lvida = vida;
    let lini  = iniciativa;
    let ltipo = tipo;

    let valido = lnome !== '';
    valido = valido && lca > 0;
    valido = valido && lvida > 0;
    valido = valido && lini > 0;

    console.log(lnome);
    console.log(lca);
    console.log(lvida);
    console.log(lini);
    console.log(ltipo);

    if(valido){
      await addDoc(collection(db, 'tb_fila'),{
        fi_idcampanha: idCampanha,
        fi_idpersonagem: idJogador, 
        fi_nome: lnome.trim(),
        fi_ca: lca,
        fi_vida: lvida,
        fi_iniciativa: lini,
        fi_tipo: ltipo,
      })
      .then(()=>{
        props.onOcultar();
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
    <div className='overlay' key={props.pe_id}>
      <div className='mfi-container'>
        <div className='mfi-titulo'>
          <strong>Adicionar na fila de iniciativa</strong>
        </div>
        <form className='mfi-form' action={(e)=>{onSalvar(e)}} >
          
          <label>Tipo</label>
          <select className='mfi-sel'
            onChange={(e)=>{
              nextSlide(e.target.value);
              setTipo(e.target.value);
            }}>
            {tipoArr.map((item, index)=>{
              return <option key={index} value={index}>{item}</option>
            })}
          </select>
     
          <div className="mfi-slider" style={{ transform: `translateX(-${index * 50}%)` }}>
            <div className="mfi-slide mfi-slide1">

              <div className='mfi-div-edit'>
                <label>Nome</label>
                <input className='mfi-edit' value={nome} 
                  onChange={(e)=>{
                    setNome(e.target.value);
                    onBuscarJogador(e.target.value);
                  }} 
                />
              </div>              
              <div className='mfi-div-edit'>
                <label>Classe de Armadura</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setCA(e.target.value)}} />
              </div>
              <div className='mfi-div-edit'>
                <label>Vida</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setVida(e.target.value)}} />
              </div>
              <div className='mfi-div-edit'>
                <label>Iniciativa</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setIniciativa(e.target.value)}}/>
              </div>

            </div>

            <div className="mfi-slide mfi-slide2">
              <div className='mfi-div-edit'>
                <label>Nome</label>
                <input className='mfi-edit' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
              </div>
              <div className='mfi-div-edit'>
                <label>Classe de Armadura</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setCA(e.target.value)}}/>
              </div>
              <div className='mfi-div-edit'>
                <label>Vida</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setVida(e.target.value)}}/>
              </div>
              <div className='mfi-div-edit'>
                <label>Iniciativa</label>
                <input className='mfi-edit' type='number' onChange={(e)=>{setIniciativa(e.target.value)}} />
              </div>
            </div>
          </div>

          <div className='mfi-botoes'>
            <button className='mfi-btn-cancelar' onClick={()=>{props.onOcultar()}}>Voltar</button>
            <BtnSalvar esperando='Salvando...' inicial='Salvar' />
          </div>
        </form>
      </div>

    </div>
  );

}

export default ModalFila;