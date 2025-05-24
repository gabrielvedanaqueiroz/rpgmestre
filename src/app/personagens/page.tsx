import './personagens.css';
import Card from '@/components/card';
import Pagina from '@/components/pagina';
import { db } from '@/services/firebaseConnection';
import {collection, query, where, getDocs } from 'firebase/firestore';
import {getImagem, PersonagemProps} from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';

async function getCarregarPersonagem(aIdCampanha:string) {

  const q = query(collection(db, "tb_personagem"), where("pe_idcampanha", "==", aIdCampanha));
  const querySnapshot = await getDocs(q);
  let lista: PersonagemProps[] = [];

  querySnapshot.forEach((doc)=>{
    if(doc){

      //exibir apenas ativos (sera que tem que ser assim?)
      if(doc.data().pe_ativo){ 
        lista.push({
          pe_id: doc.id.trim(),
          pe_nome: doc.data().pe_nome.trim(),
          pe_nivel: doc.data().pe_nivel,
          pe_catotal: doc.data().pe_catotal,
          pe_vidaatual: doc.data().pe_vidaatual,
          pe_raca: doc.data().pe_raca.trim(),
          pe_subraca: doc.data().pe_subraca.trim(),
          pe_classe: doc.data().pe_classe.trim(),
          pe_subclasse: doc.data().pe_subclasse.trim(),      
          pe_tendencia: doc.data().pe_tendencia.trim(),      
          pe_antecedente: doc.data().pe_antecedente.trim(),
          pe_ativo : doc.data().pe_ativo,
          pe_experiencia : doc.data().pe_experiencia,
          pe_idclasse: doc.data().pe_idclasse,
          pe_idraca: doc.data().pe_idraca,
        });
      }              
    }

  });

  // console.log(lista);
  return lista;
}

export default async function Personagem() {

  const lista : PersonagemProps[] = await getCarregarPersonagem(process.env.NEXT_PUBLIC_IDCAMPANHA as string);

  return (
    <Pagina subtitulo='Personagens da campanha'>
      <Card >
        <ul className='pe-grid'>
          {
            lista.map((item)=>{
              return(
                <li key={item.pe_id} className='pe-grid-item'>
                  <strong>{item.pe_nome}<br/></strong>
                  
                  <div className='pe-grid-informacao'>

                    <div className='pe-div-esquerda'>
                      <Image src={getImagem(item.pe_idclasse)} className='pe-es-classe' unoptimized alt='personagem'/> 
                    </div>
                    
                    <div className='pe-div-centro'>
                      <label>{item.pe_classe} - {item.pe_subclasse}</label>
                      <label>{item.pe_raca} {item.pe_subraca}</label>
                      <div className='pe-ce-linha3'>
                        <div>
                          <label>{item.pe_antecedente}</label>
                          <hr/>
                          <label>Antecedente</label>
                        </div>
                        <div>
                          <label>{item.pe_tendencia}</label>
                          <hr/>
                          <label>Tendência</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className='pe-div-direita'>
                      <div className='pe-dr-vida'>
                        {item.pe_vidaatual}
                      </div>
                      <div className='pe-dr-nivel'>
                        <label>{item.pe_nivel}</label>
                        <label>Nível</label>
                      </div>
                    </div>
                  </div>

                  <hr/>
                  <Link href={`/personagens/${item.pe_id}`} style={{ justifySelf:'flex-end', alignSelf: 'flex-end', marginTop: 4} }>
                    <div className='pe-link'>
                      <label>Ficha</label>
                      <AiOutlineRight size={12} color='white'/>
                    </div>
                    
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </Card>
    </Pagina>
  );
}
