import React from "react";
import "../assets/components/Footer.scss";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Cambia esta línea

const Footer = () => (
  <footer className="footer">
    <p>APP creado con RAWG API por Augusto Herrera para PI Henry 2023.</p>
    <div className="social-icons">
      <a
        href="https://www.linkedin.com/in/augusto-herrera-velasquez-36679060/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="icon" />
      </a>
      <a
        href="https://github.com/Augusto-AI/HENRY-Pokemon-PI-Augusto"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="icon" />
      </a>
    </div>
  </footer>
);

export default Footer;
