import './sidebar.css';
import { useState } from 'react';
import config from '../../res/config.svg';
import personagem from '../../res/personagem.svg';
import inc from '../../res/inc.svg';
import home from '../../res/home.svg';
import caracteristica from '../../res/caracteristica.svg';
import logo from '../../res/logo.svg';
import logout from '../../res/logout.svg';
import monstro from '../../res/monstro.svg';
import {memo} from 'react';

const Sidebar = memo(()=>{

  const [menu, setMenu] = useState(1);  

  return (
    
    <div className='sd-container'>
      <img className='sd_logo'src={logo} alt='RPGMestre'/>
   
      <ul className='sd-div-top'>
        <li key='sdbt1' className={menu===1?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={home} alt='home' onClick={()=>{setMenu(1)}}/>
        </li>
        <li key='sdbt2' className={menu===2?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={personagem} alt='pj' onClick={()=>{setMenu(2)}}/>
        </li>
        <li key='sdbt3' className={menu===3?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={inc} alt='npc' onClick={()=>{setMenu(3)}}/>
        </li>
        <li key='sdbt4' className={menu===4?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={monstro} alt='monstros' onClick={()=>{setMenu(4)}}/>
        </li>
        <li key='sdbt5' className={menu===5?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={caracteristica} alt='anotacao' onClick={()=>{setMenu(5)}}/>
        </li>
      </ul>

      <ul className='siv-div-bottom'>
        <li key='sdbb1' className={menu===6?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={config} alt='perfil' onClick={()=>{setMenu(6)}}/>
        </li>
        <li key='sdbb2' className={menu===7?'sd-div-item-selecionado': 'sd-div-item'} >
          <img className='sd-container-img' src={logout} alt='deslogar' onClick={()=>{setMenu(7)}}/>
        </li>
      </ul>        
    </div>

  );
});

export default Sidebar;
