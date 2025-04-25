
import './page.css';
import FilaIniciativa from '@/components/filainiciativa';
import CardExpansivo from '@/components/cardexpansivo';
import Card from '@/components/card';
import Pagina from '@/components/pagina';
import TileCampanha from '@/components/tilecampanha';

export default async function Home() {  

  return (

    <Pagina subtitulo='Sessão'>
      <div className='ho-container'>

        <CardExpansivo id='xpto-batalha' titulo='Batalha'>
          <FilaIniciativa/>
          <label>calculadora de batalha</label>
        </CardExpansivo>
         
        <Card>
          <TileCampanha/>
        </Card>
        
      </div>
    </Pagina>

  );
}
