import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import OneVideogame from './../OneVideogame/OneVideogame.js';

// actions
import {getVideogames, getGenres, getPlatforms, getFilteredVideogames} from './../../Actions/Actions.js';

export default function Videogames() {
  // estados
  const [videogamesList, setVideogamesList] = useState([]);
  const [filterList, setFilterList] = useState({
    categories: "default",
    platforms: "default",
    isMyGame: "default",
    order: "default"
  });
  const [pageProperties, setPageProperties] = useState({
    pageNum: 1,
    pages:[]
  });

  // store stuff
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesList);
  const categories = useSelector(state => state.genres);
   const platforms = useSelector(state => state.platforms);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    dispatch(getVideogames(false));
    dispatch(getGenres());
    dispatch(getPlatforms());
  },[]);

  // actualiza el componente cuando se actualiza el estado de `videogamesList` 
  // o los filtros o se cambia de pagina
  useEffect(() => {
    var actualPage = videogames.slice((pageProperties.pageNum*9)-9, 9*pageProperties.pageNum);
    var pageCant = Math.ceil(videogames.length / 9);
    var pages = [];
    for(let page = 1; page <= pageCant; page++){
      pages.push(page);
    }

    setPageProperties({
      ...pageProperties,
      pages: pages
    });
    setVideogamesList(actualPage);
  },[videogames, filterList, pageProperties.pageNum]);
  // despacha filtrados cada vez que se cambia un filtro
  useEffect(() => {
    dispatch(getFilteredVideogames(filterList))
  },[filterList]);

  // funcion para cambiar el estado de los filtros
  function filterHandle(event){
    let value = event.target.value;
    if(event.target.name === "isMyGame"){
      value = event.target.value === "true" ? true : false;
    }
    setFilterList({
      ...filterList,
      [event.target.name]: value
    });
  }

  //funcion para cambiar de pagina de la lista de videojuegos
  function changePage(page){
    setPageProperties({
      ...pageProperties,
      pageNum: page
    })
  }
  return (
    <div className="Videogames">
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
      <div className="VideogamesList">
        {videogamesList && videogamesList.map((game, index) => 
          <OneVideogame
            key={index}
            id={game.id}
            name={game.name}
            img={game.background_image}
            genres={game.categories}
            platforms={game.platforms}
          />)
        }
      </div>
      <div className="VideogamesList">
        {pageProperties.pages && pageProperties.pages.map(page => 
          <div key={page} onClick={() => changePage(page)}>
          <h4>{page}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
