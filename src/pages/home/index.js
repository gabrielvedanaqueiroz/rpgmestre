import './home.css';
import seta from '../../res/setabaixo.svg'

function Home(){

  function onIniciativa(){
    let array = [{"nome":"NPC1", "vida": 55, "iniciativa": 3}, {"nome":"JOGADOR", "vida": 55, "iniciativa": 4},];

    return(
      
      <div className='ho-div-iniciativa'>
        <strong className='ho-div-iniciativa-titulo'>fila de iniciativa</strong>

        <div className='ho-div-fila'>
          {array.map((item, index)=>{
            return(
              <div className={index === 1? 'ho-iniciativa-item-selecionado': 'ho-iniciativa-item'}>
                <div>

                  <div className='ho-iniciativa-item-linha1'>
                    <label key={index}>{item.nome}</label>
                    <label>{item.vida}</label>
                  </div>

                  {(index === 1? <img className='ho-iniciativa-item-linha2' src={seta} alt='atual'/>: <div/>)}
                </div>
                
              </div>
            ) 
          })}

          <button>Proximo</button>
        </div>
      </div>
    );
  }


  return(
    <div className='ho-container'>
      
      <div className='card'>
        <ul>
          <li>campanha (descrição da campanha)</li>
          <li></li>
          <li>{onIniciativa()}</li>
        </ul>  
      </div>
      
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      
      <div className='card'>
        outras campanhas (divs redendos com uma foto e nome da campanha )
        
        <ul>
          <li>campanha1 </li>
          <li>campanha2</li>
          <li>campanha3</li>
          <li>campanha4</li>
          <li>campanha5</li>
        </ul>
        
      </div>

      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div>
      <div className='card'>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </div> 
    </div>
  )
}

export default Home;