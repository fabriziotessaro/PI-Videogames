import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Videogames.css';

// components
import OneVideogame from './../OneVideogame/OneVideogame.js';
import Filters from './../Filters/Filters.js';
import Loading from './../Loading/Loading.js';

// actions
import {getVideogames} from './../../Actions/Actions.js';

export default function Videogames() {
  // estados
  const [videogamesList, setVideogamesList] = useState([]);
  const [pageProperties, setPageProperties] = useState({
    pageNum: 1,
    pageCant: 1,
    actualPages:[1]
  });
  const [loading, setLoading] = useState(true);

  // store stuff
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesList);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    if(videogames.length === 0){
      dispatch(getVideogames(false));
    }
  },[]);

  // actualiza el componente cuando se actualiza el estado de `videogamesList` 
  // o los filtros o se cambia de pagina
  useEffect(() => {
    var actualPage = videogames.slice((pageProperties.pageNum*9)-9, 9*pageProperties.pageNum);
    if(videogames.length > 9){
      setPageProperties({
          ...pageProperties,
          pageCant: Math.ceil(videogames.length / 9),
          actualPages: videogames.length <= 15 ? 
          [1,2] : [1,2,3]

      })
    }
    if(!loading){
      setLoading(true);
    }

    setVideogamesList(actualPage);
  },[videogames, pageProperties.pageNum]);

  // Control de la pantalla de carga
  useEffect(() => {
    // si carga el Home
    if(videogamesList.length !== 0 && videogames.length > 15 && pageProperties.pageNum === 1){
     setLoading(false);
    }
    if(videogamesList.length !== 0 && videogames.length > 15 && pageProperties.pageNum !== 1){
     setLoading(false);
    }
    // si se hace una busqueda
    else if(videogamesList.length !== 0 && videogames.length <= 15 && pageProperties.pageNum === 1){
      setTimeout(() => {setLoading(false)},2000);
    }
    else if(videogamesList.length !== 0 && videogames.length <= 15 && pageProperties.pageNum !== 1){
      setTimeout(() => {setLoading(false)},2000);
    }
  },[videogames, videogamesList])
  // si se cambia de pagina, no aparece la pantalla de carga
  useEffect(() => {
    if(videogamesList.length !== 0){
      setLoading(false)
    }
  },[pageProperties.pageNum])

  //funcion para cambiar de pagina de la lista de videojuegos
  function changePage(pageSelected){
    var page = pageSelected;
    // posicion actual
    switch(page){
      case 'prev':
      if(pageProperties.pageNum !== 1){
        page = pageProperties.pageNum - 1;
        setPageProperties({
          ...pageProperties,
          pageNum: pageProperties.pageNum - 1,
          actualPages: pageProperties.pageCant <= 2 ? [1,2] 
          : page > 1 ? [page-1,page,page+1] 
          : [1,2,3]
        })
      }
      break;
      case 'next':
      if(pageProperties.pageNum < pageProperties.pageCant){
        page = pageProperties.pageNum + 1;
        setPageProperties({
          ...pageProperties,
          pageNum: pageProperties.pageNum + 1,
          actualPages: pageProperties.pageCant <= 2 ? [1,2] 
          : page < pageProperties.pageCant ? [page-1,page,page+1] 
          : [pageProperties.pageCant-2,pageProperties.pageCant-1,pageProperties.pageCant]
        })
      }
      break;
      case 'first':
      if(pageProperties.pageNum !== 1){
        page = 1;
        setPageProperties({
          ...pageProperties,
          pageNum: 1,
          actualPages: [1,2,3]
        })
      }
      break;
      case 'last':
      if(pageProperties.pageNum < pageProperties.pageCant){
        page = pageProperties.pageCant;
        setPageProperties({
          ...pageProperties,
          pageNum: pageProperties.pageCant,
          actualPages: pageProperties.pageCant <= 2 ? [1,2] 
          : [pageProperties.pageCant-2,pageProperties.pageCant-1,pageProperties.pageCant]
        })
      }
      break;
      default:
        setPageProperties({
          ...pageProperties,
          pageNum: page,
          actualPages: pageProperties.pageCant <= 2 ? [1,2] 
          : page === 1 ? [1,2,3] 
          : page === pageProperties.pageCant ? [pageProperties.pageCant-2,pageProperties.pageCant-1,pageProperties.pageCant] 
          : [page-1,page,page+1]
        })
      break;
    }
  }
  return (
    <div className="Videogames">
      <Filters />
      {loading &&
        <Loading />
      }
      <div className="VideogamesList">
        {videogamesList && videogamesList.map((game, index) => 
          <OneVideogame
            key={index}
            id={game.id}
            name={game.name}
            img={game.background_image}
            rating={game.rating}
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
        {pageProperties.actualPages.map(page => 
          <h4 className={page === pageProperties.pageNum ? "Actual" : ""} 
            key={page} onClick={() => changePage(page)}>{page}
          </h4>
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
