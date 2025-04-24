import Card from '@/components/card';
import Pagina from '@/components/pagina';
import { db } from '@/services/firebaseConnection';
import {collection, query, where, getDocs } from 'firebase/firestore';

interface PersonagemProps{
  pe_id: string;
  pe_nome:string;
  pe_nivel:number;
  pe_catotal:number;
  pe_vidaatual:number;
  pe_raca:string;
  pe_subraca:string;
  pe_classe:string;
  pe_subclasse:string;
  pe_tendencia: string;
  pe_antecedente: string;
  pe_ativo: boolean;
  pe_experiencia:string;
  pe_idclasse:string;
}

async function getCarregarPersonagem(aIdCampanha:string) {

  const q = query(collection(db, "tb_personagem"), where("pe_idcampanha", "==", aIdCampanha));
  const querySnapshot = await getDocs(q);
  let lista: PersonagemProps[] = [];

  querySnapshot.forEach((doc)=>{
    if(doc){
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
        });
      }              
    }
  });

  return lista;
}

export default async function Personagem() {

  const lista : PersonagemProps[] = await getCarregarPersonagem(process.env.NEXT_PUBLIC_IDCAMPANHA as string);

  return (
    <Pagina subtitulo='Personagens da campanha'>
      <Card>
        <ul>
          {
            lista.map((item)=>{
              return(
                <li key={item.pe_id}>
                  {item.pe_nome}<br/>
                  <a href='/'>link da ficha</a>
                  <hr/>
                </li>
              )
            })
          }
        </ul>
      </Card>
    </Pagina>
  );
}
