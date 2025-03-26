import './filainiciativa.css';
import { useEffect, useState } from 'react';
import seta from '../../res/setabaixo.svg'
import finalizar from '../../res/parar.svg'
import adicionar from '../../res/adicionar.svg'
import anterior from '../../res/anterior.svg'
import proximo from '../../res/proximo.svg'

function FilaIniciativa(){
    
  const [posicao, setPosicao] = useState(0);
  const [turno, setTurno] = useState(1);

  const array = [{"nome":"NPC1", "vida": 55, "iniciativa": 3}, {"nome":"JOGADOR8888888888888", "vida": 55, "iniciativa": 4}, {"nome":"RUBAO", "vida": 55, "iniciativa": 4},
    {"nome":"NPC1", "vida": 55, "iniciativa": 3}, {"nome":"JOGADOR", "vida": 55, "iniciativa": 4}, {"nome":"RUBAO", "vida": 55, "iniciativa": 4}
  ];

  async function buscar() {
    let pos = Number(localStorage.getItem('rm@filainiposicao'));
    setPosicao(pos);

    let tur = Number(localStorage.getItem('rm@filainiturno'));
    tur = (tur === 0? 1: tur);
    setTurno(tur);
  }

  useEffect(()=>{
    buscar();
  },[]);

  function onProximo(){
    let pos = 0;

    if(posicao < (array.length -1 ))
      pos = posicao+1;

    setPosicao(pos);
    localStorage.setItem('rm@filainiposicao', pos);

    if(pos === 0 ){
      let tur = turno;
      tur++;
      setTurno(tur);
      localStorage.setItem('rm@filainiturno', tur);
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

  return (
   
    <div className='fi-div-iniciativa'>
      <strong className='fi-div-iniciativa-titulo'>Fila de Iniciativa</strong>

      <div className='fi-div-fila'>
        
        <ul style={{display: 'flex', flexDirection:'column'}}>
        {/* <ul style={{display: 'flex', gap: '8px'}}> */}
          
          <li> 
            <div className='fi-navigator'>
              <img className='fi-navigator-btn' src={adicionar} alt='adicionar' onClick={onAdicionar}/>
              <img className='fi-navigator-btn' src={finalizar} alt='finalizar combate' onClick={onFinalizarCombate}/>
              <div className='fi-navigator-div'/>
              <img className='fi-navigator-btn' src={anterior} alt='anterior' onClick={onAnterior}/>
              <img className='fi-navigator-btn' src={proximo} alt='proximo' onClick={onProximo}/>
              <div className='fi-navigator-div'/>
              <label className='fi-navigator-turno'>Turno: {turno}</label>
            </div> 
          </li>

          {array.map((item, index)=>{
            return(
              <li key={index} className={index === posicao? 'fi-iniciativa-item-selecionado': 'fi-iniciativa-item'}>
                <div className='fi-iniciativa-item-conteudo'>
                  <div className= {index === posicao? 'fi-div-vida-selecionado': 'fi-div-vida'} > <label>{item.vida}</label> </div>
                  <div className='fi-iniciativa-item-linha1'>
                    <label>{item.nome}</label>
                    <label>{index % 2 === 0? 'Monstro': 'Personagem' }</label>  
                  </div>
                </div>  
                {(index === posicao? <img className='fi-posicao' src={seta} alt='atual'/>: <div/>)}
                
              </li>
            ) 
          })}          
          
        </ul>
      </div>
    </div>
   
  )
}

export default FilaIniciativa;