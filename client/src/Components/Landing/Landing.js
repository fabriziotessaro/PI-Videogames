import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css';

// components


export default function Landing() {
  return (
    <div className="Landing">
      <div className="Title">
        <h1>WELCOME TO VIDEOMANIA</h1>
      </div>
      <div className="Access">
        <Link to="/home">START!</Link>
      </div>
    </div>
  );
}
