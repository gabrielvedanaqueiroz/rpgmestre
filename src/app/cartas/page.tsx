import './cartas.css';
import { GiBurningEye, GiAncientSword, GiChameleonGlyph  } from "react-icons/gi";
import Link from "next/link";
import Pagina from '@/components/pagina';
import Card from '@/components/card';
import { LuScrollText } from 'react-icons/lu';

export default function Carta(){

  return(
    <Pagina subtitulo='Gerador de carta'>

      <Card>
        <label>Selecione uma opção</label>

        <div className='ca-div-cartas'>

          <Link className="ca-carta ca-magia" href="/cartas/magia">
            <GiBurningEye size={24} color="white"/>
            <label>Magias</label>
          </Link>            

          <Link className="ca-carta ca-item" href="/cartas/item">
            <GiAncientSword size={24} color="white"/>
            <label className="text-white">Item</label>
          </Link>

          <Link className="ca-carta ca-criatura" href="/cartas/criatura">
            <GiChameleonGlyph size={24} color="white"/>
            <label className="text-white">Criatura</label>
          </Link>

          <Link className="ca-carta ca-missao" href="/cartas/missao">
            <LuScrollText  size={24} color="white"/>
            <label className="text-white">Missão</label>
          </Link>

        </div>
      </Card>
      
    </Pagina>

  );
}