import {BrowserRouter, Routes, Route} from 'react-router';
import Home from '../pages/home/';
import Private from './private';
import NaoEncontrado from '../pages/naoencontrado';

function RoutersApp(){


  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Private> <Home/> </Private>}/> {/* elemento de validacao de acesso. GV 16-02-2025 */}
    
        {/* <Route path='/login' element={<Login/>}/>  */}
        <Route path='*' element={<NaoEncontrado/>}/> 
      </Routes>
    </BrowserRouter>
  );

}
export default RoutersApp;