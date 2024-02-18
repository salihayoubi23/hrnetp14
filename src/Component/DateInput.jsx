// Importation des modules nécessaires depuis React et react-datepicker
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Composant réutilisable pour la saisie de dates.
 * @param {Object} props - Propriétés du composant
 * @param {string} props.label - Libellé du champ de date
 * @param {string} props.name - Nom du champ de date
 * @param {Date} props.selected - Date sélectionnée
 * @param {Function} props.onChange - Fonction de rappel appelée lorsqu'une date est modifiée
 * @param {string} props.error - Message d'erreur à afficher (s'il y a lieu)
 * @returns {JSX.Element} Composant DateInput
 */
const DateInput = ({ label, name, selected, onChange, error }) => {
  return (
    // Conteneur principal du champ de date
    <div className="inputContainer">
      {/* Libellé du champ de date */}
      <label htmlFor={name}>{label}</label>
      {/* Composant DatePicker de react-datepicker */}
      <DatePicker
        // Affiche une icône à côté du champ de date
        showIcon
        // Nom et ID du champ de date
        name={name}
        id={name}
        // Date sélectionnée et fonction de rappel lors de la modification de la date
        selected={selected}
        onChange={onChange}
        // Applique une classe d'erreur si une erreur est présente
        className={error ? 'inputError' : ''}
      />
      {/* Affiche un message d'erreur s'il y a une erreur */}
      {error && <div className="errorInfo">{error}</div>}
    </div>
  );
};

// Exportation du composant DateInput
export default DateInput;
