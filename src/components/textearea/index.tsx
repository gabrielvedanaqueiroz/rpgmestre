"use client";

import './textarea.css';

interface TextAreaPros<T extends string >{
  titulo: string;
  onChange?: (value: T) => void;
  value: T;
}

export default function TextArea<T extends string >({ titulo, onChange, value}: TextAreaPros<T>){

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const parsedValue = (inputValue as T);

    if (onChange) 
      onChange(parsedValue);
  };

  return(
    <div className='tx-div-edit'>
      <label>{titulo}</label>
      <textarea className='tx-textearea' value={value} onChange={handleChange} />
    </div> 
  )
}
