import './home.css';
import FilaIniciativa from '../../components/filainiciativa';
import CardExpanssivo from '../../components/cardexpansivo';
import Card from '../../components/card';
import { useEffect } from 'react';

function Home(){

  useEffect(()=>{
    localStorage.setItem('rm@idcampanha', 'FixTbjH5BXP0s2EG89Cb'); 
    localStorage.setItem('rm@idjogador', 'ZQjnWZxVdhQTfyMq3zTQmq901He2'); 
  },[]);

  return(
    <div className='ho-container'>
      
      <CardExpanssivo id='card-1' titulo='Campanha'>
        <p>
          campanha (descrição da campanha)
          chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
          chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
          chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
          chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
        </p>
        
      </CardExpanssivo>
      
      <CardExpanssivo id='card-2' titulo='Batalha'>
        <FilaIniciativa/>
      </CardExpanssivo>
      
      <Card>
        outras campanhas (divs redendos com uma foto e nome da campanha )
        
        <ul>
          <li>campanha1 </li>
          <li>campanha2</li>
          <li>campanha3</li>
          <li>campanha4</li>
          <li>campanha5</li>
        </ul>
        
      </Card>

      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
    </div>
  )
}

export default Home;