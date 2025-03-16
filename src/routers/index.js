import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/';
import Private from './private';
import NaoEncontrado from '../pages/naoencontrado';

function RoutersApp(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Private> <Home/> </Private>}/> 
    
        {/* <Route path='/login' element={<Login/>}/>  */}
        <Route path='*' element={<NaoEncontrado/>}/> 
      </Routes>
    </BrowserRouter>
  );

}
export default RoutersApp;