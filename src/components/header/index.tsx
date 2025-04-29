import ProgressCircular from '../progresscircular';
import './header.css';
import {memo} from 'react';

interface HeaderProps {
  subtitulo: string;
}

const Header = memo(({ subtitulo }: HeaderProps)=>{

  return(
    <header className='hd-container'>
      <h2>RPGMestre</h2>  
      <label>{subtitulo}</label>   
    </header>
  )
});

export default Header;