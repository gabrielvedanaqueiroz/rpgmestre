import './filainiciativa.css';
import { useEffect, useState } from 'react';
import finalizar from '../../res/parar.svg'
import adicionar from '../../res/adicionar.svg'
import anterior from '../../res/anterior.svg'
import proximo from '../../res/proximo.svg'
import remover from '../../res/delete.svg'
import ca from '../../res/ca.svg'
import vida from '../../res/vida.svg'
import iniciativa from '../../res/iniciativa.svg'
import mais from '../../res/expandir_mais.svg'
import menos from '../../res/expandir_menos.svg'
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getImagem } from '../../utils';
import ModalFila from '../modalfila';
import { toast } from 'react-toastify';


function FilaIniciativa(){
    
  const [posicao, setPosicao] = useState(0);
  const [turno, setTurno] = useState(1);
  const [lista, setLista] = useState([]);
  const [idCampanha, setIdCampanha] = useState(''); 

  const [showModal, setShowModal] = useState(false);

  async function buscar() {
    let pos = Number(localStorage.getItem('rm@filainiposicao'));
    setPosicao(pos);

    let tur = Number(localStorage.getItem('rm@filainiturno'));
    tur = (tur === 0? 1: tur);
    setTurno(tur);

    let idCamp= localStorage.getItem('rm@idcampanha');
    setIdCampanha(idCamp);

    const q = query(collection(db, "tb_fila"), where("fi_idcampanha", "==", idCamp));//pegar id da campanha
    const querySnapshot = await getDocs(q); 
    let lista = [];

    try {
      let i = 0;
      querySnapshot.forEach((doc)=>{
        
        lista.push({
          fi_id: doc.id.trim(),
          fi_ca: doc.data().fi_ca,
          fi_idpersonagem: doc.data().fi_idpersonagem.trim(),
          fi_iniciativa: doc.data().fi_iniciativa,
          fi_nome: doc.data().fi_nome.trim(),
          fi_tipo: doc.data().fi_tipo,
          fi_vida: doc.data().fi_vida,
          fi_idcampanha : doc.data().fi_idcampanha.trim(),
          fi_posicao : i,
        });

        i++;
      });
      lista.sort((a, b)=> a.fi_iniciativa < b.fi_iniciativa);
      lista.forEach((item, index) => item.fi_posicao = index); // Posição começa em 1
      
      setLista(lista);
      
    } catch (error) {
      toast.error('Erro ao carregar fila de iniciativa'+error); 
      console.log('Erro ao carregar fila iniciativa: '+error);
    }
  }

  useEffect(()=>{
    buscar();
  },[lista]);

  function onProximo(){

    if(lista.length > 0){
      let pos = 0;

      if(posicao < (lista.length -1 ))
        pos = posicao+1;

      setPosicao(pos);
      localStorage.setItem('rm@filainiposicao', pos);

      if(pos === 0 ){
        let tur = turno;
        tur++;
        setTurno(tur);
        localStorage.setItem('rm@filainiturno', tur);

        let lbl = document.getElementById("lblturno");

        // Salva os estilos originais
        let corFundoOriginal = lbl.style.backgroundColor;
        let corTextoOriginal = lbl.style.color;

        // Aplica a nova cor
        lbl.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--cor-primaria'); 
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
      let pos = posicao;

      if (posicao > 0)
        pos = posicao-1;

      setPosicao(pos);
      localStorage.setItem('rm@filainiposicao', pos);
    }
      
  }

  function onFinalizarCombate(){
    
    localStorage.setItem('rm@filainiturno', '0');
    localStorage.setItem('rm@filainiposicao', '0');

    buscar()
  }

  function onAdicionar(){
     /*
      selectionar de dos personagens e mosntros existentes 
      modal
      filtrar os nao adicionado
    */ 

      setShowModal(true);
  }

  async function onVidaInc(aId, aVida){

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

  async function onVidaDec(aId, aVida){
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

  async function onRemover(aId){
    const docRef = doc(db, "tb_fila", aId);
    await deleteDoc(docRef)
    .then(()=>{})
    .catch((error)=>{
      toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  }

  return (
    <div>
      <div className='fi-div-iniciativa'>
        <strong className='fi-div-iniciativa-titulo'>Fila de Iniciativa</strong>

        <div className='fi-div-fila'>
          
          <ul style={{display: 'flex', flexDirection:'column'}}>

            {/* navigator */ }
            <li> 
              <div className='fi-navigator'>
                <img className='fi-navigator-btn' src={adicionar} alt='adicionar' onClick={onAdicionar}/>
                <img className='fi-navigator-btn' src={finalizar} alt='finalizar combate' onClick={onFinalizarCombate}/>
                <div className='fi-navigator-div'/>
                <img className='fi-navigator-btn' src={anterior} alt='anterior' onClick={onAnterior}/>
                <img className='fi-navigator-btn' src={proximo} alt='proximo' onClick={onProximo}/>
                <div className='fi-navigator-div'/>
                <label className='fi-navigator-turno' id="lblturno">Turno: {turno}</label>
              </div> 
            </li>

            {/* lista de iniciativa */ }
            {lista.map((item)=>{
              return(
                <li key={item.fi_id} className={Number(item.fi_posicao) === posicao? 'fi-item-selecionado': 'fi-item'}>
                  
                  <div className='fi-item-left'>
                    <div className ={ Number(item.fi_posicao) === posicao? 'fi-div-tipo-selecionado': 'fi-div-tipo'}>
                      <img className='pri_img-esquerda' src={getImagem(item.fi_tipo)} alt='personagem'/> 
                    </div>
                  </div>            

                  <div className='fi-item-center'>
                    <strong>{item.fi_nome}</strong> 
                    <div className='fi-item-sublinha'>
                      <div className='fi-div-sublinha'> <img src={vida} alt='vida'/> {item.fi_vida} </div>
                      <div className='fi-div-sublinha'> <img src={ca} alt='classe de armadura'/> {item.fi_ca} </div>
                      <div className='fi-div-sublinha'> <img src={iniciativa} alt='iniciaiva'/> {item.fi_iniciativa} </div>
                      
                      { Number(item.fi_posicao) === posicao? 
                        (
                          <div className='fi-div-vida'>
                            <img src={mais} alt='aumentar vida' onClick={()=>{onVidaInc(item.fi_id, item.fi_vida)}}/>
                            <div className='fi-navigator-div'/>
                            <img src={menos} alt='diminuir vida' onClick={()=>{onVidaDec(item.fi_id, item.fi_vida)}}/>
                          </div>
                        ): <div/>
                      }
                    </div>
                   
                  </div>            

                  <div className='fi-item-right'>
                    <img src={remover} alt='apagar' onClick={()=>{onRemover(item.fi_id)} }/>  
                  </div>            
                </li>
              ) 
            })}   

          </ul>
        </div>
      </div>
      {showModal && (
        <ModalFila onOcultar={()=>{
          buscar();
          setShowModal(false);
        }}/>
      )}
    </div>
   
  )
}

export default FilaIniciativa;