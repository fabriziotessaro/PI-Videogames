import React from "react";
import { Link } from 'react-router-dom';

// components


export default function Landing() {
  return (
    <div className="Landing">
      <div className="Access">
        <Link to="/home">Let's fucking GO!</Link>
      </div>
    </div>
  );
}
