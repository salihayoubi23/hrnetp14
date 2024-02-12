// TextInput.jsx
import React from 'react';

const TextInput = ({ label, name, value, onChange, error }) => {
  //console.log("Rendering TextInput:", name, value, error);

  return (
    <div className="inputContainer">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(e) => {
          console.log("Input change:", e.target.value);
          onChange(e.target.value);
        }}
        className={error ? 'inputError' : ''}
      />
      {error && <div className="errorInfo">{error}</div>}
    </div>
  );
};


export default TextInput;
