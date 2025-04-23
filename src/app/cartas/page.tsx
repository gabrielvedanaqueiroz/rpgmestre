import './cartas.css';
import { GiBurningEye, GiAncientSword, GiChameleonGlyph  } from "react-icons/gi";
import Link from "next/link";
import Pagina from '@/components/pagina';
import Card from '@/components/card';

export default function Carta(){

  return(
    <Pagina subtitulo='Gerador de carta'>

      <Card>
        <label>escolha uma opção</label>

        <div className='ca-div-cartas'>

          <Link className="ca-carta ca-magia" href="/cartas/magia">
            <GiBurningEye size={24} color="white"/>
            <label>Magias</label>
          </Link>            

          <Link className="ca-carta ca-item" href="/cartas/item">
            <GiAncientSword size={24} color="white"/>
            <label className="text-white">Itens</label>
          </Link>

          <Link className="ca-carta ca-criatura" href="/cartas/criatura">
            <GiChameleonGlyph size={24} color="white"/>
            <label className="text-white">Criatura</label>
          </Link>

        </div>
      </Card>
      
    </Pagina>

  );
}