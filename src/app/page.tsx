
import './page.css';
import FilaIniciativa from '@/components/filainiciativa';
import CardExpansivo from '@/components/cardexpansivo';
import Card from '@/components/card';
import Pagina from '@/components/pagina';

export default function Home() {

  
  return (

    <Pagina subtitulo='Sessão'>
      <div className='ho-container'>

        <CardExpansivo id='xpto-batalha' titulo='Batalha'>
          <FilaIniciativa/>
        </CardExpansivo>
        
        <Card>
          <strong>Informação da campanha ativa  <h1>8 jogadores</h1>  </strong>
          <strong>Criar campanha</strong>          
        </Card>
        
      </div>
    </Pagina>

  );
}
