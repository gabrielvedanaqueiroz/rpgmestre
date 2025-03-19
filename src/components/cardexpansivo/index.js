import './cardexpansivo.css';
import expandir from '../../res/expandir_mais.svg';
import recolher from '../../res/expandir_menos.svg';
import { useState } from 'react';

function CardExpanssivo({id, titulo, children }){

  const [img, setImg] = useState(recolher);

  function toggleCard(){
    
    const div = document.getElementById(id); 
    const content = div.querySelector('.content');

    if (div.classList.contains('expanded')) {
      setImg(expandir);
      content.style.display = "none";
      div.style.height = "50px"; // Retorna à altura inicial
      div.classList.remove('expanded');
    } 
    else {
      setImg(recolher);
      content.style.display = "block";
      div.style.height = div.scrollHeight + "px"; // Ajusta à altura do conteúdo
      div.classList.add('expanded');
    }
  }

  return(
    <div key={id} id={id} className="ca-container expanded" >

      <strong className='ca-titulo' onClick={()=>{toggleCard()}}>{titulo}</strong>

      <img className='ca-container-img-expadir' src={img} alt='expandir/recolher' onClick={()=>{toggleCard()}}/>

      <div className="content" style={{display: "block"}}>
        {children}
      </div> 
    </div>

  );
}

export default CardExpanssivo;