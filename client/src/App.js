import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

// components
import Home from './Components/Home';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
