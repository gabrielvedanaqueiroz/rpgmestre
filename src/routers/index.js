import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/';
import NPC from '../pages/npcs';
import Personagens from '../pages/personagens';
import Perfil from '../pages/perfil';
import Anotacoes from '../pages/anotacoes';
import Private from './private';
import NaoEncontrado from '../pages/naoencontrado';
import Header from '../components/header';
import Sidebar from '../components/sidebar'; 
import './routers.css';

function RoutersApp(){

  return(

    <BrowserRouter>

      <div >
        <div className="app-container">
          <Sidebar/>
          <div className='app-conteudo'>
            <Header/>
            <Routes>
              <Route path='/' element={<Private> <Home/> </Private>}/> 
              <Route path='/npcs' element={<Private> <NPC/> </Private>}/> 
              <Route path='/personagens' element={<Private> <Personagens/> </Private>}/> 
              <Route path='/perfil' element={<Private> <Perfil/> </Private>}/> 
              <Route path='/anotacoes' element={<Private> <Anotacoes/> </Private>}/> 
          
              {/* <Route path='/login' element={<Login/>}/>  */}
              <Route path='*' element={<NaoEncontrado/>}/> 
            </Routes>
          </div>        
        </div>
      </div>
      
    </BrowserRouter>
  );

}
export default RoutersApp;