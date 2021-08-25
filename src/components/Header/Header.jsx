import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <div className="hamburger">
        {new Array(3).fill("").map((item, index) => {
          return <span className="hamburger-line"></span>;
        })}
        {/* &#9776; */}
      </div>
      <div className="logo">LOGO</div>
      <a href="/auth" onClick={() => localStorage.clear()} className="logout">
        &#128244;
      </a>
    </div>
  );
}
