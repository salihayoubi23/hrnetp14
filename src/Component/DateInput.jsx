// DateInput.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ label, name, selected, onChange, error }) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>{label}</label>
      <DatePicker
        showIcon
        name={name}
        id={name}
        selected={selected}
        onChange={onChange}
        className={error ? 'inputError' : ''}
      />
      {error && <div className="errorInfo">{error}</div>}
    </div>
  );
};

export default DateInput;
