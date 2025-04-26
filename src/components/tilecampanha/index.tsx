
import { db } from '@/services/firebaseConnection';
import './tilecampanha.css';
import { CampanhaProps } from '@/utils';
import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { MdArrowOutward, MdDeleteOutline } from 'react-icons/md';
import { GoIssueClosed } from 'react-icons/go';
import { RiDeleteBin5Line } from 'react-icons/ri';
import BtnHint from '../btnhint';
import { FaPlus } from 'react-icons/fa6';

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
            <section key={campanhaAtiva?.cp_id} className='tc-ativa-container'>

              <div className='tc-ativa-topotitulo'>
                <strong>Campanha: {campanhaAtiva?.cp_nome}</strong>

                <div className='tc-navigator'>
                  <Link href='/editar'>
                    <BtnHint bgcor='var(--cor-elementos)' cor='white' hintContent='Editar campanha'>
                      <CiEdit size={25}/>
                    </BtnHint>
                  </Link>
                  <hr/>
                  <Link href='/visualizar'>
                    <BtnHint bgcor='var(--cor-elementos)' cor='white' hintContent='Visualizar campanha'>
                      <MdArrowOutward size={25}/>
                    </BtnHint>
                  </Link>
                  <hr/>
                  <Link href='/encerrar'>
                    <BtnHint bgcor='var(--cor-elementos)' cor='white' hintContent='Encerrar campanha'>
                      <GoIssueClosed size={25}/>
                    </BtnHint>
                  </Link>
                  <hr/>
                  <Link href='/apagar'>
                    <BtnHint bgcor='var(--cor-elementos)' cor='white' hintContent='Apagar'>
                      <MdDeleteOutline  size={25}/> 
                    </BtnHint>   
                  </Link> {/* pedir pra digiatr para confirmar */}
                  <hr/>
                  <div >
                  <Link href='/personagens'> {countPersonagem} personagens </Link>
                  </div>
                </div>
              </div>
              
              <article>{campanhaAtiva?.cp_descricao}</article>              

            </section>
          )
          :<div/>
      }
      <hr/>
      <strong>Lista de campanhas</strong>   <br/>    
      <ul>
      {
        listaCampanha.map((item)=>{
          return(
            <li key={item.cp_id}>
              {item.cp_nome}<br/>
              <hr/>
            </li>
          )
        })
      }
      </ul> 
      <Link href='/nova' className='tc-nova'>
        <FaPlus size={15}/>
        Criar uma campanha
      </Link>    

    </div>
  );
}