
import { db } from '@/services/firebaseConnection';
import './tilecampanha.css';
import { CampanhaProps } from '@/utils';
import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

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

export default async function TileCampanha( ){

  const listaCampanha: CampanhaProps[] = await getCarregarCampanha(process.env.NEXT_PUBLIC_IDJOGADOR as string);
  const campanhaAtiva: CampanhaProps | undefined = getCampanhaAtiva(listaCampanha);
  const idCampanha: string = (campanhaAtiva? campanhaAtiva.cp_id: (process.env.NEXT_PUBLIC_IDCAMPANHA as string))
  const countPersonagem: number = await getContarPersonagem(idCampanha);

  return(
    <div>

      {
        campanhaAtiva ?
          (
            <section key={campanhaAtiva?.cp_id} className='tc-container'>
              <strong>Campanha: {campanhaAtiva?.cp_nome}</strong>
              <article>{campanhaAtiva?.cp_descricao}</article>
              <div className='tc-navigator'>
                <div >
                <Link href='/personagens'> {countPersonagem} personagens </Link>
                </div>
                <hr/>
                <Link href='/editar'>Editar</Link>
                <hr/>
                <Link href='/visualizar'>Visualizar</Link>
                <hr/>
                <Link href='/editar'>Encerrar</Link>
                <hr/>
                <Link href='/editar'>Apagar</Link> {/* pedir pra digiatr para confirmar */}
              </div>
            </section>
          )
          :<div/>
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

    </div>
  );
}