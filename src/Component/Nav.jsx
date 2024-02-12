import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Nav() {
  // Utilise le hook useSelector pour extraire la propriété "page" du state Redux
  const page = useSelector((state) => state.userInteraction.page);

  // Rendu du composant
  return (
    <nav>
      {/* Première div pour le lien "Current Employees" */}
      <div
        // La classe "navLinkContainer" est toujours présente
        // La classe "navLinkContainer--selected" est ajoutée conditionnellement si la page est "index"
        className={`navLinkContainer ${
          page === "index" ? "navLinkContainer--selected" : ""
        }`}
      >
        {/* Lien vers la page principale */}
        <Link to={"/"}>Current Employees</Link>
      </div>

      {/* Deuxième div pour le lien "Add Employee" */}
      <div
        // La classe "navLinkContainer" est toujours présente
        // La classe "navLinkContainer--selected" est ajoutée conditionnellement si la page est "employee"
        className={`navLinkContainer ${
          page === "employee" ? "navLinkContainer--selected" : ""
        }`}
      >
        {/* Lien vers la page d'ajout d'employé */}
        <Link to={"/addemployee"}>Add Employee</Link>
      </div>
    </nav>
  );
}
