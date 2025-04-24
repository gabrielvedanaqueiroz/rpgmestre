
import './page.css';
import FilaIniciativa from '@/components/filainiciativa';
import CardExpansivo from '@/components/cardexpansivo';
import Card from '@/components/card';
import Pagina from '@/components/pagina';
import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import Link from 'next/link';
import { CampanhaProps } from '@/utils';


async function getContarPersonagem(aIdCampanha:string) {
  
  const q = query(collection(db, "tb_personagem"), where("pe_idcampanha", "==", aIdCampanha));
  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
}

async function getCarregarCampanha(aIdJogador:String) {
  const q = query(collection(db, "tb_campanha"), where("cp_idjogador", "==", aIdJogador));
  const querySnapshot = await getDocs(q);
  let lista: CampanhaProps[] = [];

  querySnapshot.forEach((doc)=>{
    if(doc){
      
      lista.push({
        cp_id: doc.id.trim(),
        cp_ativa: doc.data().cp_ativa,
        cp_descricao: doc.data().cp_descricao.trim(),
        cp_nome: doc.data().cp_nome.trim(),
      });
      
    }
  });

  return lista;

}

function getCampanhaAtiva(lista: CampanhaProps[]) : CampanhaProps | undefined {
  return lista.find(item => item.cp_ativa);
}

export default async function Home() {  
  
  const listaCampanha: CampanhaProps[] = await getCarregarCampanha(process.env.NEXT_PUBLIC_IDJOGADOR as string);
  const campanhaAtiva: CampanhaProps | undefined = getCampanhaAtiva(listaCampanha);
  const idCampanha: string = (campanhaAtiva? campanhaAtiva.cp_id: (process.env.NEXT_PUBLIC_IDCAMPANHA as string))
  const countPersonagem: number = await getContarPersonagem(idCampanha);

  return (

    <Pagina subtitulo='Sessão'>
      <div className='ho-container'>

        <CardExpansivo id='xpto-batalha' titulo='Batalha'>
          <FilaIniciativa/>
          <label>calculadora de batalha</label>
        </CardExpansivo>
         
        <Card>
          {
            campanhaAtiva ?
            (
              <div>
                <strong>{campanhaAtiva.cp_nome}</strong><br/>
                <article>{campanhaAtiva.cp_descricao}</article><br/>
                <Link href='/personagens'> <h1>{countPersonagem} jogadores</h1> </Link>
                <strong>Encerrar campanha</strong><br/>       
                <strong>Apagar campanha</strong> <label>pedir pra digiar para confirmar</label>  <br/>      
                <strong>Editar campanha</strong>  <br/>        
                <hr/>
              </div>
            )
            : <div/>
          }
          
          <strong>Lista de campanhas</strong>   <br/>    
          <ul>
          {
            listaCampanha.map((item)=>{
              return(
                <li key={item.cp_id}>
                  {item.cp_nome}<br/>
                  {/* <a href='/'>link da ficha</a> */}
                  <hr/>
                </li>
              )
            })
          }
          </ul> 
          <strong>Criar campanha</strong>   <br/>     
        </Card>
        
      </div>
    </Pagina>

  );
}
