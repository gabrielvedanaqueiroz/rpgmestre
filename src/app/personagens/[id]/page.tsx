'use client';

import HintButton from '@/components/btnhint';
import './personagem.css';
import Card from "@/components/card";
import Pagina from "@/components/pagina";
import { db } from "@/services/firebaseConnection";
import { PersonagemProps } from "@/utils";
import { doc, getDoc} from "firebase/firestore";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react"

export default function Page(){
    
  const params = useParams();
  const id = params?.id as string;
  const [personagem, setPersonagem] = useState<PersonagemProps>();

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
        }                      
      }    
     
    }

    getCarregarPersonagem(id);

  }, []);

  const subtitulo: string = `Personagens da campanha - ${personagem?.pe_nome}`;

  return(
    <Pagina subtitulo={subtitulo}>
      <Card>
        {personagem?.pe_nome}<br/>
        <strong>{id}</strong>

        <div className="infinite-circular-progress">
          <div className="spinner"/>
        </div>

        <HintButton hintContent='hint legenda do botao' bgcor='#000' cor='white'>
          <strong>teste </strong>
        </HintButton>
      </Card>
    </Pagina>
  )
}