import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css';

// sprites
import LinkRunning from '../../Styles/Images/Landing/39874722_60x60.gif';
import SonicRunning from '../../Styles/Images/Landing/giphy.gif';
import PikachuRunning from '../../Styles/Images/Landing/pikachu.gif';
import KirbyRunning from '../../Styles/Images/Landing/cd44334923c5a5d94e7cf4ab8f5f2f7f_w200.gif';


export default function Landing() {

  return (
    <div className="Landing">
      <div className="Title">
        <h1>LEGEND OF GAMES</h1>
      </div>
      <div className="Access">
        <Link to="/home">START!</Link>
      </div>
      <div className="Information">
        <h4>&#10095; Bienvenido! &#10094;</h4>
        <p>
          Esta página web te brindará una galeria con más de
          500,000 videojuegos, donde podrás acceder a ellos y ver
          un poco de su información a detalle. También podrás agregar
          el que quieras solo completando un simple formulario.
          <br/><br/>
          Esta página consume la API RAWG para obtener los videojuegos,
          y para almacenar los que se agreguen utiliza una base de datos
          propia y sencilla.
        </p>
      </div>
      <div className="LinkSprite">
        <img src={LinkRunning}/>
      </div>
      <div className="KirbySprite">
        <img src={KirbyRunning}/>
      </div>
      <div className="PikachuSprite">
        <img src={PikachuRunning}/>
      </div>
      <div className="SonicSprite">
        <img src={SonicRunning}/>
      </div>

      <div className="FLASHBANG">
      </div>
    </div>
  );
}
