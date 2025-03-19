import './card.css';

function Card({children }){
  
  return(
    <div className="card-container" >
      {children}
    </div>
  );
}

export default Card;
