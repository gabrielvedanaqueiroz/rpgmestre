import './modalfila.css';
import { useRef } from 'react';
// import BtnSalvarForm from '../btnsalvarform';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';

function ModalFila(props){

  const nome = useRef('');
  const ca = useRef(0);
  const vida = useRef(0);
  const iniciativa = useRef(0);
  const tipo = useRef(0);
  
  async function onSalvar(e) {

    // let num = numero.current.value;
    // if(num > 0){
    //   //salvar banco 

    //   const docRef = doc(db, "tb_personagem", props.pe_id.trim());
    //   await updateDoc(docRef, {
    //     pe_catotal: num,
    //   });
      
      props.onOcultar();
    // }
    // else
    //   // toast.error('Campo obrigatório não pode ficar vazio')
  }

  return(
    <div className='overlay' key={props.pe_id}>
      <div className='mcat_container'>
        <div className='mcat_titulo'>
          <strong>Adicionar na fila de iniciativa</strong>
        </div>
        <form className='mcat_form' action={(e)=>{onSalvar(e)}} >

          <label>Tipo</label>
          <input className='mcat_edit' type='number' ref={tipo} />

          <label>Nome</label>
          <input className='mcat_edit' ref={nome} />

          <label>Classe de Armadura</label>
          <input className='mcat_edit' type='number' ref={ca} />

          <label>Vida</label>
          <input className='mcat_edit' type='number' ref={vida} />

          <label>Iniciativa</label>
          <input className='mcat_edit' type='number' ref={iniciativa} />

          <div className='mcat_botoes'>
            <button className='mcat_btn-cancelar' onClick={()=>{props.onOcultar()}}>Voltar</button>
            <button className='mcat_btn-cancelar' onClick={()=>{props.onOcultar()}}>Salvar</button>
          </div>
        </form>
      </div>

    </div>
  );

}

export default ModalFila;