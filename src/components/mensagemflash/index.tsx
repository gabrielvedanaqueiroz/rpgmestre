import './mensagemflash.css';

import { useEffect, useState } from "react";

interface MensagemFlashProps{
  mensagem:string;
  tipo: string;
}

const MensagemFlash: React.FC<MensagemFlashProps> = ({mensagem, tipo}:MensagemFlashProps) =>{

  const [visible, setVisible] = useState<boolean>(true);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setVisible(false)
    }, 3000);

    return ()=> clearTimeout(timer);

  }, []);

  if((!visible)) return null;
  
  return(
    <div className={`fm-container ${tipo === 'sucess'?" fm-sucesso ":" fm-erro "}`}>
      {mensagem}
    </div>
  )

}

export default MensagemFlash;