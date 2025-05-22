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

  function onFlag(aDescricao: string, aValor: number|undefined){
    return <div className='ped-flag'>
            <div className='ped-flag-interno'>
              <label>{aDescricao}</label> 
              {aValor}
            </div>
          </div>
  }

  return(
    <Pagina subtitulo='Personagens da campanha'>
      
      <Card>
        {loading ? <div> <ProgressCircular width='50px'/> <label>Carregando....</label> </div>: 
          (
            <main>

              <section className='ped-cabecalho'>

                <div className='ped-cb-linha1'>
                  
                  <div className='ped-cb-icone'>
                    {
                      personagem?.pe_idclasse != undefined ? 
                      <Image src={getImagem(personagem?.pe_idclasse)} className='ped-es-classe' alt='personagem'/> :
                      <Image src={getImagem(0)} className='ped-es-classe' alt='personagem'/> 
                    }
                    
                  </div>

                  <div className='ped-cb-bloco1'>
                    <strong>{personagem?.pe_nome}</strong>
                    <label>{personagem?.pe_classe} - {personagem?.pe_subclasse}</label>
                    <label>Nível: {personagem?.pe_nivel} - Experiência: {personagem?.pe_experiencia}</label>
                  </div>
                  
                  <div className='ped-cb-bloco2'>
                    <label>{personagem?.pe_raca} {personagem?.pe_subraca}</label>

                    <div className='ped-cb-bloco4'>
                      <div>
                        {personagem?.pe_antecedente} 
                        <hr/>
                        <label>Antencedente</label>
                      </div>

                      <div>
                        {personagem?.pe_tendencia} 
                        <hr/>
                        <label>Alinhamento</label>
                      </div>                 
                    </div>
                    
                  </div>                 

                </div>
              
                <hr/>
                <div className='ped-cb-linha2'>
                  {onFlag('Vida', 14)}
                  {onFlag('Classe de Armadura', 12)}
                  {onFlag('Movimentação', 6)}
                  {onFlag('Percepção', 12)}
                  {onFlag('Iniciativa', 2)}
                  {onFlag('B Proficiencia', 2)}                  
                </div>
                              
                <hr/>             

              </section>    

                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>

              <section>

              </section>
            </main>
          )
        }
        
      </Card>
    </Pagina>
  )
}