import './progresscircular.css';


interface ProgressCircularProps{
  width: string;
}

export default function ProgressCircular({ width} :ProgressCircularProps){

  return(
    <div className="pc-circular-progress" style={{height:width, width: width}}>
      <div className="pc-spinner"/>
    </div>
  )
}