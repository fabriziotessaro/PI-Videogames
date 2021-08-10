import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

export default function OneVideogame({id,name,img,genres}) {
  return (
    <div className="OneVideogame">
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img src={img} alt="" height="350" width="500"/>
        <ul>
          {genres.map((genre, index) => 
              <li key={index}>

                {genre.name}
              </li>
            )
          }
        </ul>
      </Link>
    </div>
  );
}
