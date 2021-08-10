import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// components
import OneVideogame from './../OneVideogame/OneVideogame.js';

// actions
import {getVideogames} from './../../Actions/Actions.js';

export default function Videogames() {
  const [videogamesList, setVideogamesList] = useState([]);

  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesLoaded);

  // despacha todos los juegos cuando se monta el componente
  useEffect(() => {
    dispatch(getVideogames(false))
  },[])

  // actualiza el componente cuando se actualiza el estado de `videogamesLoaded`
  useEffect(() => {
    setVideogamesList(videogames);
  },[videogames])

  return (
    <div className="Videogames">
      {videogamesList.map((game, index) => 
        <OneVideogame
          key={index}
          id={game.id}
          name={game.name}
          img={game.background_image}
          genres={game.genres}
        />)
      }
    </div>
  );
}
