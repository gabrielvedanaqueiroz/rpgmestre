import './header.css';
import logo from '../../res/logo.svg';

function Header(){

  return(
    <header className='header'>
      <div className='titulo'>
        <img src={logo} alt='RPGMstre'/>
        <h2>RPGMestre</h2>
      </div>
      <label>Subtitulo</label>
    </header>
  )
}

export default Header;