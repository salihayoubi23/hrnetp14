import "../App.css"
import { Link } from 'react-router-dom';

const Erreur = () => {
  return (
    // Conteneur principal de la page d'erreur, utilise les styles de la classe 'pageWrapper'
    <div className="pageWrapper">
      {/* Titre de l'erreur 404, utilise les styles de la classe 'errorNumber' */}
      <h1 className="errorNumber">404</h1>
      {/* Message d'erreur, utilise les styles de la classe 'errorMessage' */}
      <p className="errorMessage">Oups! La page que vous demandez n&apos;existe pas.</p>
      {/* Lien pour retourner à la page d'accueil, utilise les styles de la classe 'backHomeLink' */}
      <p className="backHomeLink">
        {/* Utilisation du composant Link pour créer un lien vers la page d'accueil */}
        <Link to={'/'}>-Retourner sur la page d&apos;accueil</Link>
      </p>
    </div>
  );
};

// Exporte le composant Error pour pouvoir l'utiliser ailleurs dans l'application
export default Erreur;