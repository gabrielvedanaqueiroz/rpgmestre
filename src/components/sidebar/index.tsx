"use client";

import './sidebar.css';
import { memo, useEffect } from "react";
import { useState } from 'react';
import logo from '@/res/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { IoPersonSharp } from "react-icons/io5";
import { GiCardBurn } from 'react-icons/gi';
import { CiSettings } from 'react-icons/ci';
import { BiLogOutCircle, BiSolidHome } from 'react-icons/bi';
import { FaNoteSticky } from "react-icons/fa6";

function Sidebar() {

  const [menu, setMenu] = useState<number>(1); 

  return(
    <div className='sd-container'>
      <Image className='sd_logo'src={logo} alt='RPGMestre'/>
      <ul className='sd-div-top'>
        <li key='sdbt1' className={menu===1?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/'> 
            <BiSolidHome size={45} color='#fff' className='sd-container-img' onClick={()=>{setMenu(1)}}/>
          </Link>
        </li>

        <li key='sdbt2' className={menu===2?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/personagens'> 
            <IoPersonSharp size={45} color='#fff' className='sd-container-img' onClick={()=>{setMenu(2)}}/>
          </Link>
        </li>

        <li key='sdbt3' className={menu===3?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/cartas'> 
            <GiCardBurn size={45} color='#fff' className='sd-container-img' onClick={()=>{setMenu(3)}}/>
          </Link>
        </li>

        <li key='sdbt4' className={menu===4?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/anotacoes'> 
            <FaNoteSticky size={45} color='#fff' className='sd-container-img' onClick={()=>{setMenu(4)}}/>
          </Link>
        </li>

      </ul>

      <ul className='siv-div-bottom'>
        <li key='sdbb1' className={menu===5?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/perfil'> 
            <CiSettings size={45} color='#fff' className='sd-container-img' onClick={()=>{setMenu(5)}}/>
          </Link>
        </li>
        <li key='sdbb2' className={menu===6?'sd-div-item-selecionado': 'sd-div-item'} >
          <BiLogOutCircle size={45} color='#fff'  className='sd-container-img' onClick={()=>{setMenu(6)}}/>
        </li>
      </ul>     
    </div>
  )
}

export default memo(Sidebar);