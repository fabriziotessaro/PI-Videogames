import React from "react";
import { Link } from 'react-router-dom';

export default function OneVideogame({id,name,img,genres}) {
  return (
    <div className="OneVideogame">
      <Link to={`/videogame/${id}`}>
        <h1>{name}</h1>
        <img src={img} alt=""/>
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
