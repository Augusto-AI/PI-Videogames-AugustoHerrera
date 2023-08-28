import React from "react";
import { Link } from "react-router-dom";
import "../assets/containers/Landing.scss";
import Fondo from "../assets/Fondo.mp4";

function Landing() {
  return (
    <div className="landing">
      <div className="video">
        <video className="video" autoPlay loop muted>
          <source src={Fondo} type="video/mp4" />
        </video>
        <div className="buttonlanding">
          <Link to="/home">
            <button>ENTER PI</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
