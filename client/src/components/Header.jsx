import React from "react";
import { Link } from "react-router-dom";
import "../assets/components/Header.scss";
import Logo from "../assets/Logo.png";

const Header = ({ landing }) => {
  return (
    <header className="header">
      <Link to="/home">
        <img className="header__img" src={Logo} alt="Logo" />
      </Link>

      {landing !== "landing" && (
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="header__home">EXIT</h3>
          </Link>
        </div>
      )}

      {landing !== "landing" && (
        <div>
          <Link to="/home/create" style={{ textDecoration: "none" }}>
            <h3 className="header__create">CREAR VideoGame</h3>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
