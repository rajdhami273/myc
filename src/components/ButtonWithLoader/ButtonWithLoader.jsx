import React from "react";
import "./ButtonWithLoader.css";

export default function ButtonWithLoader({
  title,
  onClick,
  disabled,
  type,
  className,
}) {
  return (
    /* eslint-disable */
    <button
      className={"btn" + " " + className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span style={disabled ? { opacity: 0.2 } : {}}>{title} </span>
      {disabled && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </button>
  );
}
