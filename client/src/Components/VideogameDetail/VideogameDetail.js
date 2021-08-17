import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './VideogameDetail.css';

// actions:
import {getVideogameDetail} from './../../Actions/Actions.js'


export default function VideogameDetail(props) {
  const {idVideogame} = props.match.params;
  const dispatch = useDispatch();
  const videogame = useSelector(state => state.videogameDetail);
  // despacha el juego
  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
  },[])

  useEffect(() => {
    document.querySelector(".Description").innerHTML = videogame.description;
  },[videogame])
  return (
    <div className="VideogameDetail">
      <div className="Image">
        <img src={videogame.background_image} heigth="350" width="600" />
      </div>
      <div className="DetailInformation">
        <div className="Title">
          <h1>{videogame.name}</h1>
        </div>
        <h2><span className="Arrow">&#5125;</span> Fecha de lanzamiento: <span className="ReleaseDate">{videogame.released}</span></h2>
        <h2><span className="Arrow">&#5125;</span> Rating: <span className="Rating">{videogame.rating}</span></h2>
        <h2><span className="Arrow">&#5125;</span> Generos:
          <span className="Video-Genres">
              {videogame.categories && videogame.categories.map((genre, index) => 
                  <span className={`Genre ${genre.name}`} key={index}>
                    {genre.name === "Massive Multiplayer" ? "MMO" : genre.name}
                  </span>
                )
              }   
          </span>
        </h2>
        <h2><span className="Arrow">&#5125;</span> Plataformas:
          <span className="Video-Platforms">
              {videogame.platforms && videogame.platforms.map((plat, index) => 
                  <span className={`Platform ${plat.name}`} key={index}>
                    {plat.name === "Massive Multiplayer" ? "MMO" : plat.name}
                  </span>
                )
              }   
          </span>
        </h2>
      </div>
      <div className="Description-Conteiner">
        <h2>Descripcion</h2>
        <div className="Description"></div>
      </div>
    </div>
  );
}