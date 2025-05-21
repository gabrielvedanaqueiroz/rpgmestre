"use client"
import Card from '@/components/card';
import MensagemFlash from '@/components/mensagemflash';
import Pagina from '@/components/pagina';
import { useState } from 'react';

export default function Anotacao() {

  const [show, setShow] = useState<boolean>(false);
  return (
    <Pagina subtitulo='Anotações da campanha'>
      <Card>
        <button onClick={()=>{
          setShow(!show);
        }}>mensagem</button>
     
        {show && 
          <MensagemFlash 
            mensagem='Cadastro salvo com sucesso, elro lero mauh ioj okhagggg iu  gbbhyg a hauh h ahh uyh ayghgy gggg' 
            tipo='esucess'
          />}
      </Card>
    </Pagina>
  );
}
