import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './VideogameDetail.css';

// sprite error
import GameOverSprite from '../../Styles/Images/Loading/tumblr_5aeabd8d5a03b654d026c658e05378fc_df3aa529_250.gif';


// components
import Loading from './../Loading/Loading.js';

// actions:
import {getVideogameDetail} from './../../Actions/Actions.js'


export default function VideogameDetail(props) {
  const {idVideogame} = props.match.params;
  const dispatch = useDispatch();
  const videogame = useSelector(state => state.videogameDetail);
  const [loading, setLoading] = useState(true);

  // despacha el juego
  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
  },[])

  useEffect(() => {
    // cada vez que se carguen los detalles de un nuevo juego se pondra la pantalla de carga
    setLoading(true);
    // como la descripcion ya viene en formato html, se imprime de esta manera
    if(!videogame.hasOwnProperty("msg")){
      document.querySelector(".Description").innerHTML = videogame.description;
    }
    // la pantalla se quitara luego de 3s
    setTimeout(() => {setLoading(false)}, 3000);
  },[videogame])
  return (
    <div className="VideogameDetail">
    {loading &&
      <Loading/>
    }
    {videogame.hasOwnProperty("msg") || Object.keys(videogame).length === 0 &&
        <div className="GameNotFound">
          <div className="GameOver"> 
            <h1>GAME OVER</h1>
            <h3>Game Not Found...</h3>
            <div className="TryAgain">
              <h2>Try Again?</h2>
              <Link className="Yes" to="/home">Yes</Link>
              <Link className="No" to="/">No</Link>
            </div>
          </div>
          <img src={GameOverSprite}/>
        </div>
      }
      <div className="Image">
        {videogame.background_image !== "" && videogame.background_image !== null && videogame.background_image !== undefined ?
            <img src={videogame.background_image} heigth="350" width="600" />
          :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        }
      </div>
      <div className="DetailInformation">
        <div className="Title">
          <h1>{videogame.name}</h1>
        </div>
        <h2><span className="Arrow">&#5125;</span> Fecha de lanzamiento: <span className="ReleaseDate">{videogame.released}</span></h2>
        <h2><span className="Arrow">&#5125;</span> Rating: <span className="Rating">{videogame.rating}</span></h2>
        <h2><span className="Arrow">&#5125;</span> Generos:
          <span className="Detail-Genres">
              {videogame.categories && videogame.categories.length === 0 ?
                  <span className={`Genre`}>
                    No se encontraron generos
                  </span>
                : videogame.platforms && videogame.categories.map((genre, index) => 
                  <span className={`Genre ${genre.name}`} key={index}>
                    {genre.name === "Massive Multiplayer" ? "MMO" : genre.name}
                  </span>
                )
              }   
          </span>
        </h2>
        <h2><span className="Arrow">&#5125;</span> Plataformas:
          <span className="Detail-Platforms">
              {videogame.platforms && videogame.platforms.length === 0 ? 
                  <span className={`Platform`}>
                     No se encontraron plataformas
                  </span>
                :videogame.platforms && videogame.platforms.map((plat, index) => 
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
        <p className="Description"></p>
      </div>
    </div>
  );
}