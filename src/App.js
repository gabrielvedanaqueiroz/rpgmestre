import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <img src={logo} alt='pj'/>
        <img src={logo} alt='npc'/>
        <img src={logo} alt='monstros'/>
        <img src={logo} alt='anotacao'/>

        <img src={logo} alt='deslogar'/>
      </div>

      <div className='conteudo'>chat, no react quero fazer um item suspenso com o fundo da tela ghostwhite e o item com o fundo white</div>
    </div>
  );
}

export default App;
