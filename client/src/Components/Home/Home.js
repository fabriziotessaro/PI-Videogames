import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// components
import Videogames from './../Videogames/Videogames.js';


export default function Home() {
  

  return (
    <div className="Home">
      <Videogames />
      
    </div>
  );
}

