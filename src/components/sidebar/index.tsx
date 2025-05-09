"use client";

import './sidebar.css';
import { memo } from "react";
import logo from '@/res/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { IoPersonSharp } from "react-icons/io5";
import { GiCardBurn } from 'react-icons/gi';
import { CiSettings } from 'react-icons/ci';
import { BiLogOutCircle, BiSolidHome } from 'react-icons/bi';
import { FaNoteSticky } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

function Sidebar() {

  const pathName = usePathname();

  return(
    <aside className='sd-container'>

      <Image className='sd_logo'src={logo} alt='RPGMestre'/>

      <ul className='sd-div-top'>
        <li key='sdbt1' className={pathName === '/'?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/'> 
            <BiSolidHome size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt2' className={pathName === '/personagens'?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/personagens'> 
            <IoPersonSharp size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt3' className={pathName === '/cartas'?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/cartas'> 
            <GiCardBurn size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt4' className={pathName === '/anotacoes'?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/anotacoes'> 
            <FaNoteSticky size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

      </ul>

      <ul className='siv-div-bottom'>
        <li key='sdbb1' className={pathName === '/perfil'?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/perfil'> 
            <CiSettings size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>
        <li key='sdbb2' className={'sd-div-item'} >
          <BiLogOutCircle size={45} color='#fff'  className='sd-container-img'/>
        </li>
      </ul>     
    </aside>
  )
}

export default memo(Sidebar);