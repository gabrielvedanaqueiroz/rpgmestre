import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar'; 
import RoutersApp from './routers';

function App() {

  return (
    <div>
      <Header/>
      <div className="App">
        <Sidebar/>
        <div className='conteudo'>
          <RoutersApp/>  
        </div>        
      </div>
    </div>
  );
}

export default App;
