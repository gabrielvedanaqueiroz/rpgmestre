'use client';

import './personagem.css';
import Card from "@/components/card";
import Pagina from "@/components/pagina";
import ProgressCircular from '@/components/progresscircular';
import { db } from "@/services/firebaseConnection";
import { getImagem, PersonagemProps } from "@/utils";
import { doc, getDoc} from "firebase/firestore";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react"

export default function Page(){
    
  const params = useParams();
  const id = params?.id as string;
  const [personagem, setPersonagem] = useState<PersonagemProps>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=>{

    async function getCarregarPersonagem(aIdPersonagem:string){

      const docRef = doc(db, "tb_personagem", aIdPersonagem);
      const snapshot = await getDoc(docRef);
      
      let item: PersonagemProps;
      
      if(snapshot.exists()){
 
        if(snapshot.data().pe_ativo){
          item = {
              pe_id: snapshot.id.trim(),
              pe_nome: snapshot.data().pe_nome.trim(),
              pe_nivel: snapshot.data().pe_nivel,
              pe_catotal: snapshot.data().pe_catotal,
              pe_vidaatual: snapshot.data().pe_vidaatual,
              pe_raca: snapshot.data().pe_raca.trim(),
              pe_subraca: snapshot.data().pe_subraca.trim(),
              pe_classe: snapshot.data().pe_classe.trim(),
              pe_subclasse: snapshot.data().pe_subclasse.trim(),      
              pe_tendencia: snapshot.data().pe_tendencia.trim(),      
              pe_antecedente: snapshot.data().pe_antecedente.trim(),
              pe_ativo : snapshot.data().pe_ativo,
              pe_experiencia : snapshot.data().pe_experiencia,
              pe_idclasse: snapshot.data().pe_idclasse,
          };

          setPersonagem(item);

          setLoading(false);
        }                      
      }    
     
    }

    getCarregarPersonagem(id);

  }, []);

  return(
    <Pagina subtitulo='Personagens da campanha'>
      
      <Card>
        {loading ? <div> <ProgressCircular width='50px'/> <label>Carregando....</label> </div>: 
          (
            <div className='ped-cabecalho'>

              <div className='ped-cb-linha1'>
                
                <div className='ped-cb-icone'>
                  <Image src={getImagem(personagem?.pe_idclasse)} className='ped-es-classe' alt='personagem'/> 
                </div>

                <div className='ped-cb-sublinha1'>
                  <strong>{personagem?.pe_nome}</strong>
                  <label>{personagem?.pe_classe} - {personagem?.pe_subclasse}</label>
                  {/* <label>Nome do Jogador</label> */}
                </div>
                
              </div>
              <div className='ped-cb-linha2'>
                <label>{personagem?.pe_raca} {personagem?.pe_subraca}</label>
                <label>{personagem?.pe_antecedente} {personagem?.pe_tendencia}</label>
                nome do jogador
              </div>

              <div className='ped-cb-icone'>Nivel 1</div>
              <div className='ped-cb-icone'>CA 12</div>
              <div className='ped-cb-icone'>Mov 6</div>
              <div className='ped-cb-icone'>Vida 14</div>
              
              <hr/>

            </div>
          )
        }

        
      </Card>
    </Pagina>
  )
}