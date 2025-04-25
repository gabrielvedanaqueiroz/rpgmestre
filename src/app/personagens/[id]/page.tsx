import Card from "@/components/card";
import Pagina from "@/components/pagina";
import { db } from "@/services/firebaseConnection";
import { PersonagemProps } from "@/utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from "next";

// async function getCarregarPersonagem(aIdPersonagem:string) {

//   const q = query(collection(db, "tb_personagem"), where("pe_idcampanha", "==", aIdPersonagem));
//   const querySnapshot = await getDocs(q);
//   let item: PersonagemProps;

//   querySnapshot.forEach((doc)=>{
//     if(doc){
//       if(doc.data().pe_ativo){
//         item = {
//           pe_id: doc.id.trim(),
//           pe_nome: doc.data().pe_nome.trim(),
//           pe_nivel: doc.data().pe_nivel,
//           pe_catotal: doc.data().pe_catotal,
//           pe_vidaatual: doc.data().pe_vidaatual,
//           pe_raca: doc.data().pe_raca.trim(),
//           pe_subraca: doc.data().pe_subraca.trim(),
//           pe_classe: doc.data().pe_classe.trim(),
//           pe_subclasse: doc.data().pe_subclasse.trim(),      
//           pe_tendencia: doc.data().pe_tendencia.trim(),      
//           pe_antecedente: doc.data().pe_antecedente.trim(),
//           pe_ativo : doc.data().pe_ativo,
//           pe_experiencia : doc.data().pe_experiencia,
//           pe_idclasse: doc.data().pe_idclasse,
//         };
//       }              
//     }
//   });

//   return {};
// }

type Props = {
  params: {id:string};
}

// export default async function Page({ params:{id}}: Props){
export default async function Page(){

  const subtitulo: string = `Personagens da campanha - `;

  return(
      <Pagina subtitulo={subtitulo}>
        <Card>
          oi
          {/* <strong>{id}</strong> */}
        </Card>
      </Pagina>
  )
}