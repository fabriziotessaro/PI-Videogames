import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// actions
import {getGenres, getPlatforms, postVideogame} from './../../Actions/Actions.js';

export default function CreateVideogame(){
  const [formState, setFormState] = useState({
    name:"",
    description:"",
    releaseDate:"",
    rating:"",
    genres:[],
    platforms:[]
  });
  const [answer, setAnswer] = useState({});
  const [errors, setErrors] = useState({});

  // store stuff
  const dispatch = useDispatch();
  const categories = useSelector(state => state.genres);
  const platforms = useSelector(state => state.platforms);
  const postAnswer = useSelector(state => state.postAnswer);

  // despacha estados del store cuando se monta el componente
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  },[]);

  // setea la respuesta que se recibe al agregar un juego
  useEffect(() => {
    setAnswer(postAnswer);
  },[postAnswer]);

  // si hay una respuesta, la muestra una vez y luego la borra
  useEffect(() => {
    if(answer.hasOwnProperty("created")){
      alert(answer.created);
      setAnswer({});
    }
  },[answer]);

  // funcion para cambiar el formState
  function changeHandle(event){
    var array = []; // array para agregar platforms o genres
    var found; // variable para comprobar que no se repitan platforms o genres

    // agregar generos al videojuego
    if(event.target.name === "genres" && event.target.value !== ""){
      array = formState.genres;
      found = array.find(a => a === parseInt(event.target.value));
      if(!found){
        array.push(parseInt(event.target.value));
        setFormState({
          ...formState,
          genres: array
        });
      }
    }
    // agregar plataformas al videojuego
    else if(event.target.name === "platforms" && event.target.value !== ""){
      array = formState.platforms;
      found = array.find(a => a === parseInt(event.target.value));
      if(!found){
        array.push(parseInt(event.target.value));
        setFormState({
          ...formState,
          platforms: array
        });
      }
    }
    // agregar otros campos al juego
    else{
      setFormState({
        ...formState,
        [event.target.name]: event.target.value
      });
    }
  }
  // funcion para enviar los datos del formState
  function submitHandle(event){
    event.preventDefault();

    // validacion del form, guardo resultados
    let validate = validateForm(formState);

    // si no hay errores, postea el videojuego
    if(Object.keys(validate).length === 0){
      dispatch(postVideogame(formState)); 
    }
    // si los hay, los setea en el estado de errores
    else{
      setErrors(validate);
    }
  }

  // borrar genero o plataforma seleccionada
  function deleteSelected(span){
    var array = formState[span.name];
    array = array.filter(a => a !== span.value);
    setFormState({
      ...formState,
      [span.name]: array
    });
  }
  return (
    <div className="CreateVideogame">
        <div className="CreationForm">
          <h1>Agrega un Videojuego</h1>
          <form onSubmit={(e) => submitHandle(e)}>
            <div className="Column1">
              <div className="FormField">
                <h3>Titulo</h3>
                <input className={errors.name && "Error"} name="name" value={formState.name} onChange={(e) => changeHandle(e)}/>
                {errors.name && <h4>{errors.name}</h4>}
              </div>
              <div className="FormField">
                <h3>Fecha de Lanzamiento</h3>
                <input className={errors.releaseDate && "Error"} type="date" name="releaseDate" value={formState.releaseDate} onChange={(e) => changeHandle(e)}/>
                {errors.releaseDate && <h4>{errors.releaseDate}</h4>}
              </div>
              <div className="FormField">
                <h3>Rating</h3>
                <input className={errors.rating && "Error"} name="rating" value={formState.rating} onChange={(e) => changeHandle(e)}/>
                {errors.rating && <h4>{errors.rating}</h4>}
              </div>
            </div>
            <div className="Column2">  
              <div className="FormField">
                <h3>Generos</h3>
                <select className={errors.genres && "Error"} name="genres" onChange={(e) => changeHandle(e)}>
                    <option value=""></option>
                  {categories && categories.map(genre =>
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  )}
                </select>
                {errors.genres && <h4>{errors.genres}</h4>}
              </div>
              <div className="FormField">
                <h3>Plataformas</h3>
                <select className={errors.platforms && "Error"} name="platforms" onChange={(e) => changeHandle(e)}>
                    <option value=""></option>
                  {platforms && platforms.map(plat =>
                    <option key={plat.id} value={plat.id}>{plat.name}</option>
                  )}
                </select>
                {errors.platforms && <h4>{errors.platforms}</h4>}
              </div>
            </div>
            <div className="DescriptionField">
              <div className="FormField">
                <h3>Descripcion</h3>
                <textarea className={errors.description && "Error"} name="description" onChange={(e) => changeHandle(e)}/>
                {errors.description && <h4>{errors.description}</h4>}
              </div>
            </div>
            <div className="FormFooter">
              <button>Agregar</button>
            </div>
          </form>
        </div>
        <div className="ViewSelected">
          <div className="SelectList Genres">
            <h4>Generos seleccionados</h4>
            <div className="Collection">
              {formState.genres.length === 0 ? <h4 className="Empty">No hay generos</h4> : 
                formState.genres.map(genre => { 
                  let genreName = categories.find(cat => cat.id === genre).name
                  return(
                    <h5 key={genre}>{genreName}
                    <span onClick={() => deleteSelected({name:"genres", value:genre})}> X </span></h5>
                  )
                })
              }
            </div>
          </div>
          <div className="SelectList Platforms">
            <h4>Plataformas seleccionadas</h4>
            <div className="Collection">
              {formState.platforms.length === 0 ? <h4 className="Empty">No hay plataformas</h4> :
                formState.platforms.map(plat => {
                  let platName = platforms.find(pat => pat.id === plat).name
                  return(
                    <h5 key={plat}>{platName} 
                    <span onClick={() => deleteSelected({name:"platforms", value:plat})}> X </span></h5>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  );
}

// funcion para validar inputs
function validateForm(form){
  let errors = {};
  const VOID_FIELD = "Campo obligatorio.";
  if(!form.name){
    errors.name = VOID_FIELD;
  }
  if(!form.releaseDate){
    errors.releaseDate = VOID_FIELD;
  } 
  if(!form.rating){
    errors.rating = VOID_FIELD;
  } else if(isNaN(form.rating)){
    errors.rating = "Solo se admiten numeros.";
  }
  if(form.genres.length === 0){
    errors.genres = VOID_FIELD;
  } 
  if(form.platforms.length === 0){
    errors.platforms = VOID_FIELD;
  } 
  if(!form.description){
    errors.description = VOID_FIELD;
  } 

  return errors
}
