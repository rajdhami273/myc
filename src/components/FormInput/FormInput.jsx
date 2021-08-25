import React from "react";
import "./FormInput.css";

export default function FormInput({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  required,
  readOnly,
  ref,
  id
}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="form-input"
        value={value}
        disabled={disabled}
        onBlur={onBlur}
        required={required}
        readOnly={readOnly}
        ref={ref}
      />
      <div className="error-text">{error}&nbsp;</div>
    </div>
  );
}
