import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Navbar.css';


// actions
import {getVideogames} from './../../Actions/Actions.js';

export default function Navbar() {
  // estados
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState({
    navMenu: false,
    quitMenu: false
  });

  // store stuff
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogamesList);


  //funcion para actualizar el valor de busqueda
  function searchHandle(event){
    setSearch(event.target.value);
  }
  // funcion para iniciar la busqueda
  function submitHandle(event){
    event.preventDefault()
    dispatch(getVideogames(search));
  }
  // trae todos los juegos predeterminados de home
  function homeHandle(value){
    if(videogames.length < 100){
      dispatch(getVideogames(value));
      setSearch("");
    }
  }

  function showMenuHandle(menu){
    if(menu === "Menu"){
      if(showMenu.quitMenu){
        setShowMenu({
          ...showMenu,
          quitMenu: false,
          navMenu: !showMenu.navMenu
        })
      }
      else{
        setShowMenu({
          ...showMenu,
          navMenu: !showMenu.navMenu
        })
      }
    }
    else{
      setShowMenu({
        ...showMenu,
        quitMenu: !showMenu.quitMenu
      })
    }
  }

  return (
    <div className="Navbar">
      <div className="Options">
        <a onClick={() => showMenuHandle("Menu")}>Menu</a>
        <div className={showMenu.navMenu ? "NavMenu NavMenuActive" : "NavMenu"}>
          <Link to="/home" onClick={() => {homeHandle(false); showMenuHandle("Menu")}}>Home</Link>
          <Link to="/addvideogame" onClick={() => showMenuHandle("Menu")}>Add Videogame</Link>
          <a id="Quit" onClick={() => showMenuHandle("quitMenu")}>Quit</a>
        </div>
      </div>
      <div className="Search">
        <form onSubmit={(e) => submitHandle(e)}>
          <input onChange={(e) => searchHandle(e)} value={search} />
          <button>Search</button>
        </form>
      </div>
      <div className={showMenu.quitMenu ? "QuitMenu QuitMenuActive" : "QuitMenu"}>
        <h1>Quit Game</h1>
        <h2>¿Estas seguro que deseas salir?</h2>
        <div className="QuitButtons">
          <Link className="Si" to="/" onClick={() => showMenuHandle("Menu")}>Si</Link>
          <a className="No" onClick={() => showMenuHandle("quitMenu")}>No</a>
        </div>
      </div>
      <div className={showMenu.navMenu ? "PauseBackground PauseActive" : "PauseBackground"}
        onClick={() => showMenuHandle("Menu")}>
      </div>
    </div> 
  );
}
