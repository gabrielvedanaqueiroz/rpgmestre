import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar'; 
import Home from './pages/home';

function App() {

  return (
    <div>
      <Header/>
      <div className="App">
        
        <Home/>
        <Sidebar/>
        {/* <div className='conteudo'></div> */}
      </div>
    </div>
  );
}

export default App;
