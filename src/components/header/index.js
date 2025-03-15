import './header.css';
import logo from '../../res/logo.svg';
import {memo} from 'react';

const Header = memo(()=>{

  return(
    <header className='hd-container'>
      <div className='hd-titulo'>
        <img src={logo} alt='RPGMstre'/>
        <h2>RPGMestre</h2>
      </div>
      <label>Subtitulo</label>
    </header>
  )
});

export default Header;