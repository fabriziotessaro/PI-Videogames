import React from "react";
import { Route, Switch } from 'react-router-dom';

// css
import './Styles/Home.css';

// components
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import VideogameDetail from './Components/VideogameDetail/VideogameDetail.js';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame.js';
import Landing from './Components/Landing/Landing.js';

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home}/>
        <Route exact path="/videogame/:idVideogame" component={VideogameDetail}/>
        <Route exact path="/addvideogame" component={CreateVideogame}/>
      </Switch>
    </div>
  );
}

