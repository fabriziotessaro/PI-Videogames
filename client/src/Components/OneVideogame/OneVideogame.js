import React from "react";
import { Link } from 'react-router-dom';

export default function OneVideogame({id,name,img,genres}) {
  return (
    
    <div className="OneVideogame">
      <Link to={`/videogame/${id}`}>
        <div className="Video-Title">
          <h1>{name}</h1>
        </div>
        <div className="Video-Image">
          <img src={img} alt=""/>
        </div>
        <div className="Video-Genres">
            {genres.map((genre, index) => 
                <div className={`Genre ${genre.name}`} key={index}>
                  {genre.name === "Massive Multiplayer" ? "MMO" : genre.name}
                </div>
              )
            } 
           
        </div>
      </Link>
    </div>
  );
}
