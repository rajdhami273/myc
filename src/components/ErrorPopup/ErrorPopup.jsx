import React from "react";
import "./ErrorPopup.css";

export default function ErrorPopup({ message, onClick }) {
  return (
    <div className="popup" onClick={onClick}>
      {message}
    </div>
  );
}
