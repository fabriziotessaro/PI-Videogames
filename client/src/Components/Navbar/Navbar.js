import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './Navbar.css';


// actions
import {getVideogames} from './../../Actions/Actions.js';

export default function Navbar() {
  // estados
  const [search, setSearch] = useState("");

  // store stuff
  const dispatch = useDispatch();


  //funcion para actualizar el valor de busqueda
  function searchHandle(event){
    setSearch(event.target.value);
  }
  // funcion para iniciar la busqueda
  function submitHandle(event){
    event.preventDefault()
    dispatch(getVideogames(search));
  }

  return (
    <div className="Navbar">
      <div className="Options">
        <Link to="/home">Home</Link>
        <Link to="/addvideogame">Add Videogame</Link>
      </div>
      <div className="Search">
        <form onSubmit={(e) => submitHandle(e)}>
          <input onChange={(e) => searchHandle(e)} value={search} />
          <button>Search</button>
        </form>
      </div>
    </div> 
  );
}
