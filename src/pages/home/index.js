import './home.css';
import FilaIniciativa from '../../components/filainiciativa';
import CardExpanssivo from '../../components/cardexpansivo';
import Card from '../../components/card';

function Home(){

  return(
    <div className='ho-container'>
      
      <CardExpanssivo id='card-1' titulo='Campanha'>
        <ul>
          <li>campanha (descrição da campanha)</li>
          <li>{ <FilaIniciativa/>}</li>
        </ul>  
      </CardExpanssivo>
      
      <Card>
      chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white
      </Card>
      
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