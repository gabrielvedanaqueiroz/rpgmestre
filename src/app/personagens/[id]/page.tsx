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
import { ReactNode, useEffect, useState } from "react"
import { IconManifestType } from 'react-icons';
import { AiFillSignal } from 'react-icons/ai';
import { BsPassportFill } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa6';
import { GiBootPrints, GiCheckedShield, GiHeartBeats, GiPsychicWaves, GiPunchBlast, GiSandsOfTime } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';
import { MdShield } from 'react-icons/md';
import { RiCompass3Fill } from 'react-icons/ri';

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

  // function onFlag(aDescricao: string, aValor: number|undefined){
  //   return <div className='ped-flag'>
  //           <div className='ped-flag-interno'>
  //             <label>{aDescricao}</label> 
  //             {aValor}
  //           </div>
  //         </div>
  // }

  function onBloco3Info(aValor: number|undefined, aDescricao:string, aIcon: ReactNode){
    return(
      <div className='ped-cb-info-col'>
        {aIcon}
        <label>{aValor}</label>
        <hr/>
        <div className='ped-cb-info'>
        
          <label>{aDescricao}</label>
        </div>
      </div> 
    ) 
  }

  function onClasseIcone(){
    let idclasse = personagem?.pe_idclasse != undefined ? personagem?.pe_idclasse : 0;

    return <Image src={getImagem(idclasse)} className='ped-cb-classe' alt='personagem'/> 
  }

  return(
    <Pagina subtitulo='Personagens da campanha'>
      
      <Card>
        { loading ? 
          <div> <ProgressCircular width='50px'/> <label>Carregando....</label> </div> : 
          (
            <main>

              <section className='ped-cabecalho'>
                
                <div className='ped-cb-icone'>
                  {onClasseIcone()}
                </div>

                <div className='ped-cb-bloco1'>
                  <strong>{personagem?.pe_nome}</strong>
                  <label>{personagem?.pe_classe} - {personagem?.pe_subclasse}</label>
                  <div className='ped-cb-info'>
                    <AiFillSignal size={15}/> 
                    <label>Nível: {personagem?.pe_nivel} - Experiência: {personagem?.pe_experiencia}</label>
                  </div> 
                </div>
                
                <div className='ped-cb-bloco2'>
                  <div className='ped-cb-info'>
                    <IoIosPerson size={15}/>
                    <label>{personagem?.pe_raca} {personagem?.pe_subraca}</label>
                  </div> 

                  <div className='ped-cb-subbloco2'>
                    <div>
                      {personagem?.pe_antecedente} 
                      <hr/>
                      <div className='ped-cb-info'>
                        <BsPassportFill  size={15}/>  
                        <label>Antencedente</label>
                      </div>
                    </div>

                    <div>
                      {personagem?.pe_tendencia} 
                      <hr/>
                      <div className='ped-cb-info'>
                        <RiCompass3Fill size={15}/> 
                        <label>Alinhamento</label>
                      </div>  
                    </div>                 
                  </div>
                </div>       

                <div className='ped-cb-bloco3'>

                  {onBloco3Info(personagem?.pe_vidaatual, 'Vida', <GiHeartBeats size={15}/>)}
                  {onBloco3Info(personagem?.pe_vidaatual, 'Classe de Armadura', <GiCheckedShield size={15}/>)}
                  {onBloco3Info(personagem?.pe_vidaatual, 'Movimentação', <GiBootPrints size={15}/>)}
                  {onBloco3Info(personagem?.pe_vidaatual, 'Iniciativa', <GiSandsOfTime size={15}/>)}
                  {onBloco3Info(personagem?.pe_vidaatual, 'Bônus de Preficiência', <GiPunchBlast size={15}/>)}
                  {onBloco3Info(personagem?.pe_vidaatual, 'Percepção Passiva', <GiPsychicWaves size={15}/>)}

                  {/* {onFlag('C. Armadura', 12)} */}
                  {/* {onFlag('Iniciativa', 2)} */}
                  {/* {onFlag('Movimento', 6)} */}
                  {/* {onFlag('Percepção', 12)} */}
                  {/* {onFlag('B. Profic', 2)} */}
                </div>        

              </section>                                   

              <section className='ped-habilidade'>
                <div className='ped-habilidade-item'>
                  <strong>Força</strong>

                  <div className='teste'>

                    <div className='ped-hab-mod'>
                      <strong>2</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>12</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  <hr/>
                  <label>* 12 salva-guarda </label>
                  <hr/>
                  <label>° acrobacia 2 </label>

                </div>
                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>

                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>

                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>

                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>

                <div className='ped-habilidade'>

                  ° <strong>acrobacia</strong> 3

                </div>
              </section>
            </main>
          )
        }
        
      </Card>
    </Pagina>
  )
}