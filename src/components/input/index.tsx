"use client";

import './input.css';

interface InputPros<T extends string | number>{
  titulo: string;
  type?: 'text' | 'number' | 'email' | 'password';
  onChange?: (value: T) => void;
  value: T;
  placeholder?: string;
  name?: string;
  readOnly?: boolean;
}

export default function Input<T extends string | number>({ titulo, type = 'text', onChange,  
  value,  placeholder, name, readOnly = false}: InputPros<T>){

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedValue = type === 'number' ? (Number(inputValue) as T) : (inputValue as T);

    if (onChange) 
      onChange(parsedValue);
  };

  return(
    <div className='ip-div-edit'>
      <label>{titulo}</label>
      <input className='ip-edit' type={type} value={value} onChange={handleChange}
       placeholder={placeholder} name={name} readOnly={readOnly}/>
    </div>
  )
}