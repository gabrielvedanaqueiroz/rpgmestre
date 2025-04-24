
import './card.css';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

function Card({children }:CardProps){
  
  return(
    <section className="card-container" >
      {children}
    </section>
  );
}

export default Card;
