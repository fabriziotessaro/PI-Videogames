import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Videogames.css';

// components
import OneVideogame from './../OneVideogame/OneVideogame.js';
import Filters from './../Filters/Filters.js';

// actions
import {getVideogames} from './../../Actions/Actions.js';

export default function Videogames() {
  // estados
  const [videogamesList, setVideogamesList] = useState([]);
  const [pageProperties, setPageProperties] = useState({
    pageNum: 1,
    pages:[]
  });

  // store stuff
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesList);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    dispatch(getVideogames(false));
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
  },[videogames, pageProperties.pageNum]);

  //funcion para cambiar de pagina de la lista de videojuegos
  function changePage(page){
    var pageCant = Math.ceil(videogames.length / 9);
    switch(page){
      case 'prev':
      if(pageProperties.pageNum !== 1){
        setPageProperties({
          ...pageProperties,
          pageNum: pageProperties.pageNum - 1
        })
      }
      break;
      case 'next':
      if(pageProperties.pageNum < pageCant){
        setPageProperties({
          ...pageProperties,
          pageNum: pageProperties.pageNum + 1
        })
      }
      break;
      case 'first':
      if(pageProperties.pageNum !== 1){
        setPageProperties({
          ...pageProperties,
          pageNum: 1
        })
      }
      break;
      case 'last':
      if(pageProperties.pageNum < pageCant){
        setPageProperties({
          ...pageProperties,
          pageNum: pageCant
        })
      }
      break;
      default:
        setPageProperties({
        ...pageProperties,
        pageNum: page
      })
    }
  }
  return (
    <div className="Videogames">
      <Filters />
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
      <div className="PageButtons">
        <div className="PageArrows">
          <h4 onClick={() => changePage('first')}>&#10094;&#10094;</h4>
          <h4 onClick={() => changePage('prev')}>&#10094;</h4>
        </div>
        <div className="PageNumbers">
          {pageProperties.pages && pageProperties.pages.map(page => 
            <h4 key={page} onClick={() => changePage(page)}>{page}</h4>
          )}
        </div>
        <div className="PageArrows">
          <h4 onClick={() => changePage('next')}>&#10095;</h4>
          <h4 onClick={() => changePage('last')}>&#10095;&#10095;</h4>
        </div>
      </div>
    </div>
  );
}
