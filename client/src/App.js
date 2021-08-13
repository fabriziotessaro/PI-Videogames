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
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/">
          <Route exact path="/home">
            <Navbar/>
            <Home/>
          </Route>
          <Route exact path="/videogame/:idVideogame">
            <Navbar/>
            <VideogameDetail/>
          </Route>
          <Route exact path="/addvideogame">
            <Navbar/>
            <CreateVideogame/>
          </Route>
        </Route>
      </Switch>
    </div>
  );
}

