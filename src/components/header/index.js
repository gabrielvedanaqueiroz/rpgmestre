import './header.css';
import {memo} from 'react';

const Header = memo(()=>{

  return(
    <header className='hd-container'>
      <h2>RPGMestre</h2>     
      <label>Subtitulo</label>
    </header>
  )
});

export default Header;