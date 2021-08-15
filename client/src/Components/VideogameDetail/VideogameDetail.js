import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

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
        <h2>Fecha de lanzamiento: <div className="ReleaseDate">{videogame.released}</div></h2>
        <h2>Rating: <div className="Rating">{videogame.rating}</div></h2>
        <h2>Generos:
          <div className="Video-Genres">
              {videogame.categories && videogame.categories.map((genre, index) => 
                  <div className={`Genre ${genre}`} key={index}>
                    {genre === "Massive Multiplayer" ? "MMO" : genre}
                  </div>
                )
              }   
          </div>
        </h2>
        <h2>Plataformas:
          <div className="Video-Genres">
              {videogame.platforms && videogame.platforms.map((plat, index) => 
                  <div className={`Genre ${plat}`} key={index}>
                    {plat === "Massive Multiplayer" ? "MMO" : plat}
                  </div>
                )
              }   
          </div>
        </h2>
      </div>
      <div className="Description-Conteiner">
        <h2>Descripcion</h2>
        <div className="Description"></div>
      </div>
    </div>
  );
}