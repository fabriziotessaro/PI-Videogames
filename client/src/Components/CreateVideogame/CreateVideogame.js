import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateVideogame.css'

// actions
import {getGenres, getPlatforms, postVideogame} from './../../Actions/Actions.js';

export default function CreateVideogame(){
  const [formState, setFormState] = useState({
    name:"",
    description:"",
    releaseDate:"",
    rating:"",
    background_image:"",
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
      setTimeout(() => {
        // al enviar false, setea la respuesta como vacia 
        dispatch(postVideogame(false)); 
        setAnswer({});
      },3000);
    }
  },[answer]);

  // funcion para cambiar el formState
  function changeHandle(event){
    // setea el estado
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
    // setea errores en false (durante el onchange)
    setErrors(validateForm({
      ...formState,
      [event.target.name]: event.target.value
    }, false));
  }

  // funcion para agregar generos o plataformas al juego
  function addSelected(field){
    var array = []; // array para agregar platforms o genres
    var found; // variable para comprobar que no se repitan platforms o genres
    var selectValue = document.querySelector(`select[name='${field}']`).value; // valor del select

    // agregar generos al videojuego
    if(field === "genres" && selectValue !== ""){
      array = formState.genres;
      found = array.find(a => a === parseInt(selectValue));
      if(!found){
        array.push(parseInt(selectValue));
        setFormState({
          ...formState,
          genres: array
        });
      }
    }
    // agregar plataformas al videojuego
    else if(field === "platforms" && selectValue !== ""){
      array = formState.platforms;
      found = array.find(a => a === parseInt(selectValue));
      if(!found){
        array.push(parseInt(selectValue));
        setFormState({
          ...formState,
          platforms: array
        });
      }
    }
  }

  // funcion para enviar los datos del formState
  function submitHandle(event){
    event.preventDefault();

    // validacion del form para hacer submit(true), guardo resultados
    let validate = validateForm(formState, true);

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
      {answer.hasOwnProperty("created") &&
        <div className="AnswerPopUp">
        {answer.created ?
          <h2>¡Videojuego agregado con exito!</h2>
          :
          <h2 className="Exists">¡El Videojuego ya existe!</h2>
        }
        </div>
      }
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
              <div className="SelectField">
                <select className={errors.genres && "Error"} name="genres">
                    <option value=""></option>
                  {categories && categories.map(genre =>
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  )}
                </select>
                <button onClick={() => addSelected('genres')} type="button">+</button>
              </div>
              {errors.genres && <h4>{errors.genres}</h4>}
            </div>
            <div className="FormField">
              <h3>Plataformas</h3>
              <div className="SelectField">
                <select className={errors.platforms && "Error"} name="platforms">
                    <option value=""></option>
                  {platforms && platforms.map(plat =>
                    <option key={plat.id} value={plat.id}>{plat.name}</option>
                  )}
                </select>
                <button onClick={() => addSelected('platforms')} type="button">+</button>
              </div>
              {errors.platforms && <h4>{errors.platforms}</h4>}
            </div>
            <div className="FormField">
              <h3>Imagen</h3>
              <input className={errors.background_image && "Error"} name="background_image" 
              onChange={(e) => changeHandle(e)}/>
              {errors.background_image && <h4>{errors.background_image}</h4>}
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
      <div className="PrevView">
        <div className="ViewImage">
        {formState.background_image !== "" && !errors.background_image ? 
          <img src={formState.background_image}/> 
          :
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        }
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
    </div>
  );
}

// funcion para validar inputs
// submit = true / false (onchange)
function validateForm(form,submit){
  let errors = {};
  const VOID_FIELD = "Campo vacio.";

  // valida que ningun campo este vacio si se submitea
  if(submit){
    for(let field in form){
      if(typeof form[field] === 'string'){
        if(form[field].trim() === ""){
          errors[field] = VOID_FIELD;
        }
      }
      else if(form[field].length === 0){
        errors[field] = VOID_FIELD;
      }
    }
  }

  if(isNaN(form.rating)){
    errors.rating = "Solo se admiten numeros.";
  }

  const regUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  if(!regUrl.test(form.background_image) && form.background_image.trim() !== ""){
    errors.background_image = "URL no valida.";
  }
  
  return errors
}
