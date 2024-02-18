/**
 * Composant DataTableComponent pour afficher un tableau de données avec fonction de recherche.
 * @module DataTableComponent
 */
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import "../App.css"
// Importations des actions et des sélecteurs depuis le store Redux
import { updateSearch, selectSearch, selectEmployeeData } from '../Redux/store'; 

/**
 * Configuration des colonnes pour le tableau DataTable.
 * @constant
 * @type {Object[]}
 * @property {string} name - Nom de la colonne.
 * @property {function} selector - Fonction pour extraire la valeur de la colonne à partir de la ligne de données.
 * @property {boolean} sortable - Indique si la colonne est sortable.
 */
const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dateOfBirth,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "Street",
    selector: (row) => row.street,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zipCode,
    sortable: true,
  },
];

/**
 * Composant principal DataTableComponent.
 * @function
 * @returns {JSX.Element} Élément JSX représentant le composant DataTableComponent.
 */

export default function DataTableComponent() {
  // Utilisation du hook useDispatch pour obtenir la fonction dispatch
  const dispatch = useDispatch();

  // Utilisation du hook useSelector pour obtenir l'état de la recherche depuis le store Redux
  const search = useSelector(selectSearch);

  // Utilisation du hook useSelector pour obtenir les données des employés depuis le store Redux
  const data = useSelector(selectEmployeeData);

  // Filtrage des données en fonction de la recherche
  const filteredData = data.filter((elem) => {
    return (
      elem.firstName.toLowerCase().includes(search) ||
      elem.lastName.toLowerCase().includes(search) ||
      elem.department.toLowerCase().includes(search) ||
      elem.street.toLowerCase().includes(search) ||
      elem.city.toLowerCase().includes(search) ||
      elem.state.toLowerCase().includes(search) ||
      elem.zipCode.includes(search) ||
      elem.startDate.includes(search) ||
      elem.dateOfBirth.includes(search)
    );
  });

  // Effet déclenché à chaque changement dans les données ou la recherche (pour l'instant, c'est vide)
  useEffect(() => {
    
  }, [data, search]);

   /**
   * Fonction pour gérer le changement dans le champ de recherche.
   * @function
   * @param {Object} e - Événement de changement de champ de recherche.
   * @returns {void}
   */
  function handleSearchChange(e) {
    // Convertir la valeur de recherche en minuscules
    const searchValue = e.target.value.toLowerCase();
    // Dispatch de l'action pour mettre à jour la recherche dans le store Redux
    dispatch(updateSearch(searchValue));
  }

  // Rendu du composant DataTableComponent
  return (
    <>
      {/* Zone de recherche avec un champ d'entrée */}
      <div className="searchBoxContainer">
        <input
          type="text"
          name="searchBox"
          id="searchBox"
          placeholder="Name, Address, Department..."
          value={search}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      
      {/* Condition pour afficher soit le tableau de données, soit un message si aucune donnée n'est disponible */}
      {filteredData.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          className="dataTableComponent"
        />
      ) : (
        <div className="noData">No Data to display</div>
      )}
    </>
  );
}
