import React from "react";
import { Link } from 'react-router-dom';
import './OneVideogame.css';

export default function OneVideogame({id,name,img,genres,platforms}) {
  return (
    
    <div className="OneVideogame">
      <Link to={`/videogame/${id}`}>
        <div className="Video-Details">
          <div className="Video-Title">
            <h1>{name}</h1>
          </div>
          <div className="Video-Genres">
            {genres.map((genre, index) => 
                <div className={`Genre ${genre.name}`} key={index}>
                  {genre.name === "Massively Multiplayer" ? "MMO" : genre.name}
                </div>
              )
            } 
          </div>
          <div className="Video-Platforms">
            {platforms.map((plat, index) => 
                <div className={`Platform ${plat.name}`} key={index}>
                  {plat.name}
                </div>
              )
            } 
          </div>
        </div>
        <div className="Video-Image">
          <img src={img} alt=""/>
        </div>
      </Link>
    </div>
  );
}
