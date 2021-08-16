import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Filters.css';

// actions
import {getGenres, getPlatforms, getFilteredVideogames} from './../../Actions/Actions.js';

export default function Filters() {
  // estados
  const [filterList, setFilterList] = useState({
    categories: "default",
    platforms: "default",
    isMyGame: "default",
    order: "default"
  });

  // store stuff
  const dispatch = useDispatch();
  const categories = useSelector(state => state.genres);
  const platforms = useSelector(state => state.platforms);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  },[]);

  // despacha filtrados cada vez que se cambia un filtro
  useEffect(() => {
    dispatch(getFilteredVideogames(filterList))
  },[filterList]);

  // funcion para cambiar el estado de los filtros
  function filterHandle(event){
    let value = event.target.value;
    if(event.target.name === "isMyGame"){
      switch(event.target.value){
        case "true":
        value = true;
        break;
        case "false":
        value = false;
        break;
        default:
        break;
      }
    }
    setFilterList({
      ...filterList,
      [event.target.name]: value
    });
  }
  return (
    <div className="Filters">
      <div className="Filter Group1">
        <div className="OneFilter">
          <select name="categories" onChange={(e) => filterHandle(e)} defaultValue={filterList.categories}>
            <option value="default">TODOS LOS GENEROS</option>
          {categories && categories.map(genre =>
            <option key={genre.id} value={genre.id}>
            {genre.name.toUpperCase()}
            </option>
          )}
          </select>
        </div>
        <div className="OneFilter">
          <select name="platforms" onChange={(e) => filterHandle(e)} defaultValue={filterList.categories}>
            <option value="default">TODAS LAS PLATAFORMAS</option>
          {platforms && platforms.map(plat =>
            <option key={plat.id} value={plat.id}>
            {plat.name.toUpperCase()}
            </option>
          )}
          </select>
        </div>
      </div>
      <div className="Filter Group2">
        <div className="OneFilter">
          <select name="isMyGame" onChange={(e) => filterHandle(e)} defaultValue={filterList.isMyGame}>
            <option value="default">TODOS LOS JUEGOS</option>
            <option value={false}>API RAWG</option>
            <option value={true}>AGREGADOS</option>
          </select>
        </div>
        <div className="OneFilter">
          <select name="order" onChange={(e) => filterHandle(e)}>
            <option value="default">ORDENAR</option>
            <option value="Rdesc">RATING &#9660;</option>
            <option value="Rasc">RATING &#9650;</option>
            <option value="A-Z">NOMBRE A-Z&#129045;</option>
            <option value="Z-A">NOMBRE Z-A&#129047;</option>
          </select>
        </div>
      </div>
    </div>
  );
}
