'use client';

import './personagem.css';
import Card from "@/components/card";
import Pagina from "@/components/pagina";
import ProgressCircular from '@/components/progresscircular';
import { db } from "@/services/firebaseConnection";
import { getImagem, onModificador, PersonagemProps } from "@/utils";
import { doc, getDoc} from "firebase/firestore";
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from "react"
import { AiFillSignal } from 'react-icons/ai';
import { BsPassportFill } from 'react-icons/bs';
import { GiBootPrints, GiCheckedShield, GiHeartBeats, GiPsychicWaves, GiPunchBlast, GiSandsOfTime } from 'react-icons/gi';
import { IoIosPerson } from 'react-icons/io';
import { RiCompass3Fill } from 'react-icons/ri';

export default function Page(){
    
  const params = useParams();
  const id = params?.id as string;
  const [personagem, setPersonagem] = useState<PersonagemProps>();

  const [modForca, setModForca]               = useState<number>(0);
  const [modDestreza, setModDestreza]         = useState<number>(0);
  const [modConstituicao, setModConstituicao] = useState<number>(0);
  const [modInteligencia, setModInteligencia] = useState<number>(0);
  const [modSabedoria, setModSabedoria]       = useState<number>(0);
  const [modCarisma, setModCarisma]           = useState<number>(0);

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
              pe_idraca: snapshot.data().pe_idraca,
              pe_movimento: snapshot.data().pe_movimento,
              pe_bproficiencia: snapshot.data().pe_bproficiencia,
              pe_forca: snapshot.data().pe_forca,
              pe_constituicao: snapshot.data().pe_constituicao,
              pe_destreza: snapshot.data().pe_destreza,
              pe_inteligencia: snapshot.data().pe_inteligencia,
              pe_sabedoria: snapshot.data().pe_sabedoria,
              pe_carisma: snapshot.data().pe_carisma,
              pe_sgforca: snapshot.data().pe_sgforca,
              pe_sgdestreza: snapshot.data().pe_sgdestreza,
              pe_sgconstituicao: snapshot.data().pe_sgconstituicao,
              pe_sginteligencia: snapshot.data().pe_sginteligencia,
              pe_sgsabedoria: snapshot.data().pe_sgsabedoria,
              pe_sgcarisma: snapshot.data().pe_sgcarisma,
              pe_proatletismo: snapshot.data().pe_proatletismo,
              pe_proacrobacia: snapshot.data().pe_proacrobacia,
              pe_proprestidigitacao: snapshot.data().pe_proprestidigitacao,
              pe_profurtividade: snapshot.data().pe_profurtividade,
              pe_proarcanismo: snapshot.data().pe_proarcanismo,
              pe_prohistoria: snapshot.data().pe_prohistoria,
              pe_proinvestigacao: snapshot.data().pe_proinvestigacao,
              pe_pronatureza: snapshot.data().pe_pronatureza,
              pe_proreligiao: snapshot.data().pe_proreligiao,
              pe_prolidaranimais: snapshot.data().pe_prolidaranimais,
              pe_prointuicao: snapshot.data().pe_prointuicao,
              pe_promedicina: snapshot.data().pe_promedicina,
              pe_propercepcao: snapshot.data().pe_propercepcao,
              pe_problefar: snapshot.data().pe_problefar,
              pe_prointimidacao: snapshot.data().pe_prointimidacao,
              pe_proatuacao: snapshot.data().pe_proatuacao,
              pe_propersusao: snapshot.data().pe_propersusao,

          };

          setPersonagem(item);
          setModForca(onModificador(item?.pe_forca));
          setModDestreza(onModificador(item?.pe_destreza));
          setModConstituicao(onModificador(item?.pe_constituicao));
          setModInteligencia(onModificador(item?.pe_inteligencia));
          setModSabedoria(onModificador(item?.pe_sabedoria));
          setModCarisma(onModificador(item?.pe_carisma));

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

  function divHabItem(aAtiva:boolean|undefined, aValorHab: number, aDescricao:string, aSalvaGuarda: boolean = false){

    aAtiva = (aAtiva != undefined ? aAtiva: false);
    let bprof = (personagem?.pe_bproficiencia != undefined ? personagem?.pe_bproficiencia : 0);
    let valor = (aAtiva ? aValorHab + bprof : aValorHab);

    return(
      <div className={`ped-hab-item ${aSalvaGuarda && 'ped-hi-salvaguarda'}`}>
        <div className={`ped-hi-prof ${aAtiva &&' ped-hi-profativo'}`}/>
        <div className='ped-hi-valor'>{valor}</div>
        <label>{aDescricao}</label>
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
                  {onBloco3Info(personagem?.pe_catotal, 'Classe de Armadura', <GiCheckedShield size={15}/>)}
                  {onBloco3Info(personagem?.pe_movimento, 'Movimentação', <GiBootPrints size={15}/>)}

                  {/* {onFlag('C. Armadura', 12)} */}
                  {/* {onFlag('Iniciativa', 2)} */}
                  {/* {onFlag('Movimento', 6)} */}
                  {/* {onFlag('Percepção', 12)} */}
                  {/* {onFlag('B. Profic', 2)} */}
                </div>        

              </section>                                   

              <section className='ped-habilidades'>

                <div className='ped-habilidade'>
                  <strong>Força</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modForca}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_forca}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sgforca, modForca, 'Salva-guarda', true)}
                  
                  {divHabItem(personagem?.pe_proacrobacia, modForca, 'Atletismo')}

                </div>

                <div className='ped-habilidade'>
                  <strong>Destreza</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modDestreza}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_destreza}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sgdestreza, modDestreza, 'Salva-guarda', true)}
                  
                  {divHabItem(personagem?.pe_proacrobacia, modDestreza, 'Acrobacia')}
                  {divHabItem(personagem?.pe_proprestidigitacao, modDestreza, 'Prestidigitação')}
                  {divHabItem(personagem?.pe_profurtividade, modDestreza, 'Furtividade')}

                </div>

                <div className='ped-habilidade'>
                  <strong>Constituição</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modConstituicao}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_constituicao}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sgconstituicao, modConstituicao, 'Salva-guarda', true)}

                </div>

                <div className='ped-habilidade'>
                  <strong>Inteligência</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modInteligencia}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_inteligencia}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sginteligencia, modInteligencia, 'Salva-guarda', true)}
                  
                  {divHabItem(personagem?.pe_proarcanismo, modInteligencia, 'Arcanismo')}
                  {divHabItem(personagem?.pe_prohistoria, modInteligencia, 'História')}
                  {divHabItem(personagem?.pe_proinvestigacao, modInteligencia, 'Investigação')}
                  {divHabItem(personagem?.pe_pronatureza, modInteligencia, 'Natureza')}
                  {divHabItem(personagem?.pe_proreligiao, modInteligencia, 'Religião')}

                </div>

                <div className='ped-habilidade'>
                  <strong>Sabedoria</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modSabedoria}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_sabedoria}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sgsabedoria, modSabedoria, 'Salva-guarda', true)}
                  {/* <hr/> */}
                  
                  {divHabItem(personagem?.pe_prolidaranimais, modSabedoria, 'Lidar com Animais')}
                  {divHabItem(personagem?.pe_prointuicao, modSabedoria, 'Intuição')}
                  {divHabItem(personagem?.pe_promedicina, modSabedoria, 'Medicina')}
                  {divHabItem(personagem?.pe_propercepcao, modSabedoria, 'Percepção')}
                  {divHabItem(personagem?.pe_prosobrevivencia, modSabedoria, 'Sobrevicência')}

                </div>

                <div className='ped-habilidade'>
                  <strong>Carisma</strong>

                  <div className='ped-hab-cabecalho'>

                    <div className='ped-hab-mod'>
                      <strong>{modCarisma}</strong>
                      <label>Modificador</label>
                    </div>

                    <div className='ped-hab-valor'>
                      <strong>{personagem?.pe_carisma}</strong>
                      <label>Valor</label>
                    </div>
                  </div>
                  
                  {divHabItem(personagem?.pe_sgcarisma, modCarisma, 'Salva-guarda', true)}
                  
                  {divHabItem(personagem?.pe_problefar, modCarisma, 'Blefar')}
                  {divHabItem(personagem?.pe_prointimidacao, modCarisma, 'Intimidação')}
                  {divHabItem(personagem?.pe_proatuacao, modCarisma, 'Atuação')}
                  {divHabItem(personagem?.pe_propersusao, modCarisma, 'Persuasão')}

                </div>

                <div className='ped-habilidade ped-hi-gap'>
                  
                  {onBloco3Info(personagem?.pe_destreza, 'Iniciativa', <GiSandsOfTime size={15}/>)}
                  {onBloco3Info(personagem?.pe_bproficiencia, 'Bônus de Preficiência', <GiPunchBlast size={15}/>)}
                  {onBloco3Info(personagem?.pe_sabedoria, 'Percepção Passiva', <GiPsychicWaves size={15}/>)}
                </div>

              </section>
            </main>
          )
        }
        
      </Card>
    </Pagina>
  )
}