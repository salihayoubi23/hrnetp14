/**
 * Composant fonctionnel représentant l'en-tête de l'application.
 * Il affiche le logo de l'entreprise et le nom, ainsi qu'une barre de navigation.
 *
 * @component
 * 
 */
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Nav from "./Nav";
import Logo from "../Asset/Image/logoHrNet.svg";

/**
 * Fonctionnel composant représentant l'en-tête de l'application.
 *
 * @returns {JSX.Element} Composant Header
 */
export default function Header() {
  return (
    // Contenu du composant Header
    <header>
      {/* Section pour le logo et le nom de l'entreprise */}
      <div className="enterprise">
        {/* Utilisation de la balise Link de React Router pour la navigation */}
        <Link to={"/"}>
          {/* Conteneur pour le logo de l'entreprise */}
          <div className="logoContainer">
            <img src={Logo} alt="Logo Wealth Health" />
          </div>
          {/* Conteneur pour le nom de l'entreprise */}
          <div className="name">
            Wealth Health - <span>HRnet</span>
          </div>
        </Link>
      </div>
      {/* Section pour la navigation (utilisation du composant Nav) */}
      <div className="navContainer">
        <Nav />
      </div>
    </header>
  );
}
