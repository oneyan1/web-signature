import React, { useState } from 'react';

const TextInput = ({ label, type }) => {
  const [inputValue, setInputValue] = useState({});

  const inputChangeHundler = event => {
    setInputValue({ [event.target.name]: event.target.value });
  };

  return (
    <div className='input-field'>
      <input
        placeholder={label}
        id={label}
        type={type}
        name={label}
        className='validate'
        onChange={inputChangeHundler}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default TextInput;
