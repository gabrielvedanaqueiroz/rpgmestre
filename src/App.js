import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar'; 
import RoutersApp from './routers';

function App() {

  return (
    <div>
      
      <div className="app-container">
        <Sidebar/>
        <div className='app-conteudo'>
          <Header/>
          <RoutersApp/>  
        </div>        
      </div>
    </div>
  );
}

export default App;
