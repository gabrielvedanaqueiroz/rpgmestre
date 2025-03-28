import './btnsalvar.css';
import { useFormStatus } from 'react-dom';

function BtnSalvar(props){

  const { pending } = useFormStatus(); 

  return(
    <button className='btn-salvar' type='submmit' disabled={pending}>
       {pending ? props.esperando : props.inicial}
    </button>
  );
}

export default BtnSalvar;