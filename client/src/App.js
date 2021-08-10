import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Route } from "react-router-dom";

// components
import Home from './Components/Home/Home.js';
// import Navbar from './Components/Navbar';
import VideogameDetail from './Components/VideogameDetail/VideogameDetail.js';
// import CreateVideogame from './Components/CreateVideogame';

export default function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      {/*<Navbar/>*/}
      <Route exact path="/" component={Home} />
      <Route exact path="/videogame/:idVideogame" component={VideogameDetail} />
      {/*<Route exact path="/videogame" component={CreateVideogame} />*/}
    </div>
  );
}

