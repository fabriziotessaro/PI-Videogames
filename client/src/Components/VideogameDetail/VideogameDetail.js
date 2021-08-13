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
    document.querySelector("#description").innerHTML = videogame.description;
  },[videogame])

  return (
    <div className="VideogameDetail">
      <h1>{videogame.name}</h1>
      <img src={videogame.background_image} heigth="350" width="600" />
      <p>{videogame.categories}</p>
      <div id="description"></div>
      <p>{videogame.released}</p>
      <p>{videogame.rating}</p>
      <p>{videogame.platforms}</p>
    </div>
  );
}