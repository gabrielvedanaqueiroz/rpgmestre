import './modalfila.css';
import { useRef } from 'react';
import BtnSalvar from '../btnsalvar';
import {db} from '../../services/firebaseConnection';
import {addDoc, collection} from 'firebase/firestore';
import { toast } from 'react-toastify';

function ModalFila(props){

  const tipoArr = ['Monstro', 'Barbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Guardião'];

  const nome = useRef('');
  const ca = useRef(0);
  const vida = useRef(0);
  const iniciativa = useRef(0);
  const tipo = useRef(0);
  
  async function onSalvar(e) {

    let lnome = nome.current.value;
    let lca   = ca.current.value;
    let lvida = vida.current.value;
    let lini  = iniciativa.current.value;
    let ltipo = tipo.current.value;

    let valido = lnome !== '';
    valido = valido && lca > 0;
    valido = valido && lvida > 0;
    valido = valido && lini > 0;

    if(valido){
      await addDoc(collection(db, 'tb_fila'),{
        fi_idcampanha: 'xpto',
        fi_idpersonagem: 'xpto2', 
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
          <select className='mfi-sel' ref={tipo} >
            {tipoArr.map((item, index)=>{
               return <option key={index} value={index}>{item}</option>
            })}
          </select>

          <label>Nome</label>
          <input className='mfi-edit' ref={nome} />

          <label>Classe de Armadura</label>
          <input className='mfi-edit' type='number' ref={ca} />

          <label>Vida</label>
          <input className='mfi-edit' type='number' ref={vida} />

          <label>Iniciativa</label>
          <input className='mfi-edit' type='number' ref={iniciativa} />

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