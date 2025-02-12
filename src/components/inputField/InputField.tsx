import React from "react";
import "./styles.scss";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  id,
  placeholder,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
