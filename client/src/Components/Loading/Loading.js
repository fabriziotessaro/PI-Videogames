import React from "react";
import './Loading.css';
import LoadingGif from '../../Styles/Images/Loading/48094e75e2902a89f7e155baf663c2f1.gif';




export default function Loading() {
  return (
    <div className="Loading">
      <img src={LoadingGif}/>
    </div>
  );
}

