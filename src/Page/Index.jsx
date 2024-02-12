import React, { useEffect } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import DataTableComponent from "../Component/DataTable";

// Composant Index
const Index = () => {
  // Initialise le dispatch Redux
  const dispatch = useDispatch();

  // Effet secondaire pour mettre à jour la localisation de la page dans le store Redux
  useEffect(() => {
    try {
      dispatch({
        type: "userInteraction/updatePageLocation",
        payload: {
          page: "index",
          pageTitle: "HRnet - Current Employees",
        },
      });
    } catch (error) {
      // Gestion d'erreur en cas de problème avec la mise à jour de la localisation
      console.error("Error updating page location:", error);
    }
  }, [dispatch]); // Déclenche l'effet uniquement lorsque le dispatch change

  // Rendu du composant
  return (
    <main className="indexMain">
      <h1>Current Employee</h1>
      <section className="dataTableContainer">
        {/* Utilisation du composant DataTableComponent */}
        <DataTableComponent />
      </section>
    </main>
  );
};

export default Index;
