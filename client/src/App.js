import React from "react";
import { Route, Switch } from 'react-router-dom';

// css
import './Styles/App.css';

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
          <Navbar/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/videogame/:idVideogame" component={VideogameDetail}/>
          <Route exact path="/addvideogame" component={CreateVideogame}/>
        </Route>
      </Switch>
    </div>
  );
}

