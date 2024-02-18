// Importation des modules nécessaires depuis React
import React from 'react';

/**
 * Composant réutilisable pour la saisie de texte.
 * @param {Object} props - Propriétés du composant
 * @param {string} props.label - Libellé du champ de texte
 * @param {string} props.name - Nom du champ de texte
 * @param {string} props.value - Valeur actuelle du champ de texte
 * @param {Function} props.onChange - Fonction de rappel appelée lorsqu'une saisie est modifiée
 * @param {string} props.error - Message d'erreur à afficher (s'il y a lieu)
 * @returns {JSX.Element} Composant TextInput
 */
const TextInput = ({ label, name, value, onChange, error }) => {
  //console.log("Rendering TextInput:", name, value, error);

  return (
    // Conteneur principal du champ de texte
    <div className="inputContainer">
      {/* Libellé du champ de texte */}
      <label htmlFor={name}>{label}</label>
      {/* Champ de texte de base de HTML */}
      <input
        // Type de champ : texte
        type="text"
        // Nom et ID du champ de texte
        name={name}
        id={name}
        // Valeur actuelle du champ de texte
        value={value}
        // Fonction de rappel lors de la modification du champ de texte
        onChange={(e) => {
          // Affichage d'informations de débogage sur la saisie
          console.log("Input change:", e.target.value);
          // Appel de la fonction de rappel pour mettre à jour la valeur
          onChange(e.target.value);
        }}
        // Applique une classe d'erreur si une erreur est présente
        className={error ? 'inputError' : ''}
      />
      {/* Affiche un message d'erreur s'il y a une erreur */}
      {error && <div className="errorInfo">{error}</div>}
    </div>
  );
};

// Exportation du composant TextInput
export default TextInput;
