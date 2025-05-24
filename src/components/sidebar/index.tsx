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

  function pathSegment():number{

    if (pathName === '/')
      return 0;

    let firstSegment = pathName.split('/')[1];

    switch (firstSegment) {
      case 'personagens':
        return 1;
      case 'cartas':
        return 2;
      case 'anotacoes':
        return 3;
      case 'perfil':
        return 4;
      default :
        return 0;
    }
    
  }

  return(
    <aside className='sd-container'>

      <Image className='sd_logo'src={logo} alt='RPGMestre'/>

      <ul className='sd-div-top'>
        <li key='sdbt1' className={pathSegment() === 0?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/'> 
            <BiSolidHome size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt2' className={pathSegment() === 1?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/personagens'> 
            <IoPersonSharp size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt3' className={pathSegment() === 2?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/cartas'> 
            <GiCardBurn size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

        <li key='sdbt4' className={pathSegment() === 3?'sd-div-item-selecionado': 'sd-div-item'} >
          <Link href='/anotacoes'> 
            <FaNoteSticky size={45} color='#fff' className='sd-container-img'/>
          </Link>
        </li>

      </ul>

      <ul className='siv-div-bottom'>
        <li key='sdbb1' className={pathSegment() === 4?'sd-div-item-selecionado': 'sd-div-item'} >
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