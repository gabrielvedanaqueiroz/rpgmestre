import './filainiciativa.css';
import { useEffect, useState } from 'react';
import seta from '../../res/setabaixo.svg'

function FilaIniciativa(){
    
  const [posicao, setPosicao] = useState(0);
  const array = [{"nome":"NPC1", "vida": 55, "iniciativa": 3}, {"nome":"JOGADOR8888888888888", "vida": 55, "iniciativa": 4}, {"nome":"RUBAO", "vida": 55, "iniciativa": 4},
    {"nome":"NPC1", "vida": 55, "iniciativa": 3}, {"nome":"JOGADOR", "vida": 55, "iniciativa": 4}, {"nome":"RUBAO", "vida": 55, "iniciativa": 4}
  ];

  useEffect(()=>{
    let pos = Number(localStorage.getItem('rm@filainiposicao'));
    setPosicao(pos);
  },[]);

  function onProximo(){
    let pos = 0;

    if(posicao < (array.length -1 ))
      pos = posicao+1;

    setPosicao(pos);
    localStorage.setItem('rm@filainiposicao', pos);
  }

  return (
   
    <div className='fi-div-iniciativa'>
      <strong className='fi-div-iniciativa-titulo'>Fila de Iniciativa</strong>

      <div className='fi-div-fila'>
        <ul style={{display: 'flex', gap: '8px'}}>
          {array.map((item, index)=>{
            return(
              <li key={index} className={index === posicao? 'fi-iniciativa-item-selecionado': 'fi-iniciativa-item'}>

                <div className= {index === posicao? 'fi-div-vida-selecionado': 'fi-div-vida'} > <label>{item.vida}</label> </div>

                <div className='fi-iniciativa-item-linha1'>
                  <label>{item.nome}</label>
                  <label>{index % 2 === 0? 'Monstro': 'Personagem' }</label>  
                </div>

                {(index === posicao? <img className='fi-posicao' src={seta} alt='atual'/>: <div/>)}
                
              </li>
            ) 
          })}

          <li><button onClick={onProximo}> Proximo  </button></li>

        </ul>
      </div>
    </div>
   
  )
}

export default FilaIniciativa;