import React from "react";
import { useHistory } from "react-router-dom";
import "./Landing.css";

export default function Landing(props) {
  const history = useHistory();
  return (
    <div className="landing-container">
      <h1>Into the Landing Page</h1>
      <button
        type="button"
        className="btn btn-neon"
        onClick={() => history.push("/auth")}
      >
        Enter the app
      </button>
    </div>
  );
}
