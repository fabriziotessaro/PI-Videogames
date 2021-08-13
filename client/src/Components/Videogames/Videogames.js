import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// components
import OneVideogame from './../OneVideogame/OneVideogame.js';

// actions
import {getVideogames, getGenres, getFilteredVideogames} from './../../Actions/Actions.js';

export default function Videogames() {
  // estados
  const [videogamesList, setVideogamesList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterList, setFilterList] = useState({
    categories: "see-all",
    isMyGame: "see-all",
    order: "Rdesc"
  });
  const [pageProperties, setPageProperties] = useState({
    pageNum: 1,
    pages:[]
  });

  // store stuff
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesList);
  const categories = useSelector(state => state.genres);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    dispatch(getVideogames(false));
    dispatch(getGenres());
  },[]);

  // actualiza el componente cuando se actualiza el estado de `videogamesList` 
  // o los filtros o se cambia de pagina
  useEffect(() => {
    var actualPage = videogames.slice((pageProperties.pageNum*9)-9, 9*pageProperties.pageNum);
    var pageCant = Math.ceil(videogames.length / 9);
    var pages = [];
    console.log(actualPage)
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

  //funcion para actualizar el valor de busqueda
  function searchHandle(event){
    setSearch(event.target.value);
  }
  // funcion para iniciar la busqueda
  function submitHandle(event){
    event.preventDefault()
    dispatch(getVideogames(search));
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
    <div className="Search">
      <form onSubmit={(e) => submitHandle(e)}>
        <input onChange={(e) => searchHandle(e)} value={search} />
        <button>Search</button>
      </form>
    </div>
      <div className="Filters">
        <div className="OneFilter">
          <label>Genero</label>
          <select name="categories" onChange={(e) => filterHandle(e)} defaultValue={filterList.categories}>
            <option value="see-all">see-all</option>
          {categories && categories.map(genre =>
            <option key={genre.id} value={genre.id}>
            {genre.name}
            </option>
          )}
          </select>
        </div>
        <div className="OneFilter">
          <label>Tipo</label>
          <select name="isMyGame" onChange={(e) => filterHandle(e)} defaultValue={filterList.isMyGame}>
            <option value="see-all">see-all</option>
            <option value={true}>De la BD</option>
            <option value={false}>De la API</option>
          </select>
        </div>
        <div className="OneFilter">
          <label>Ordenar</label>
          <select name="order" onChange={(e) => filterHandle(e)} defaultValue={filterList.order}>
            <option value="Rdesc">Rating &#9660;</option>
            <option value="Rasc">Rating &#9650;</option>
            <option value="A-Z">Nombre A-Z&#129045;</option>
            <option value="Z-A">Nombre Z-A&#129047;</option>
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
