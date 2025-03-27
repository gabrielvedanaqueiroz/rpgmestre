import './filainiciativa.css';
import { useEffect, useState } from 'react';
import seta from '../../res/setabaixo.svg'
import finalizar from '../../res/parar.svg'
import adicionar from '../../res/adicionar.svg'
import anterior from '../../res/anterior.svg'
import proximo from '../../res/proximo.svg'
import remover from '../../res/delete.svg'
import {db} from '../../services/firebaseConnection';
import {collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

function FilaIniciativa(){
    
  const [posicao, setPosicao] = useState(0);
  const [turno, setTurno] = useState(1);
  const [lista, setLista] = useState([]);

  async function buscar() {
    let pos = Number(localStorage.getItem('rm@filainiposicao'));
    setPosicao(pos);

    let tur = Number(localStorage.getItem('rm@filainiturno'));
    tur = (tur === 0? 1: tur);
    setTurno(tur);

    const q = query(collection(db, "tb_fila"), where("fi_idcampanha", "==", 'xpto'));//pegar id da campanha
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
      lista.forEach((item, index) => {
        item.fi_posicao = index; // Posição começa em 1
      });
      
      setLista(lista);
      
    } catch (error) {
      // toast.error('Erro ao carregar inventario'+error); 
      console.log('Erro ao carregar fila iniciativa: '+error);
    }
  }

  useEffect(()=>{
    buscar();
  },[]);

  function onProximo(){
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

  function onAnterior(){
    let pos = posicao;

    if (posicao > 0)
      pos = posicao-1;

    setPosicao(pos);
    localStorage.setItem('rm@filainiposicao', pos);

    // if(pos === 0 ){
    //   let tur = turno;
    //   tur++;
    //   setTurno(tur);
    //   localStorage.setItem('rm@filainiturno', tur);
    // }
      
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
  }

  async function onRemover(aId){
    const docRef = doc(db, "tb_fila", aId);
    await deleteDoc(docRef)
    .then(()=>{})
    .catch((error)=>{
      // toast.error('Erro ao excluir');
      console.log('erro ao buscar '+error);
    });  
  }

  return (
   
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
              <li key={item.fi_id} className={Number(item.fi_posicao) === posicao? 'fi-iniciativa-item-selecionado': 'fi-iniciativa-item'}>
                <div className='fi-iniciativa-item-conteudo'>
                  <div className= { Number(item.fi_posicao) === posicao? 'fi-div-vlriniciativa-selecionado': 'fi-div-vlriniciativa'} > <label>{item.fi_iniciativa}</label> </div>
                  <div className='fi-iniciativa-item-linha1'>
                    <strong>{item.fi_nome}</strong>
                    <label className='fi-iniciativa-item-sublinha'>CA: {item.fi_ca} HP: {item.fi_vida} Ini: {item.fi_iniciativa}</label>
                  </div>
                  <img className={ Number(item.fi_posicao) === posicao? 'fi-btnremover-selecionado': 'fi-navigator-btn'} src={remover} alt='apagar' onClick={onRemover}/>
                </div>  
                {(Number(item.fi_posicao) === posicao? <img className='fi-posicao' src={seta} alt='atual'/>: <div/>)}
                
              </li>
            ) 
          })}   

        </ul>
      </div>
    </div>
   
  )
}

export default FilaIniciativa;