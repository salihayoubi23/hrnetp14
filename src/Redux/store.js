/**
 * Ce module définit et exporte le magasin Redux configuré avec les tranches (slices)
 * pour gérer les données des employés, les données de l'application, la recherche
 * et les interactions utilisateur.
 * @module store
 */

import { createSlice, configureStore } from '@reduxjs/toolkit';

// Importation des données initiales fictives pour les employés, les états et les départements
import { employees } from "../Data/mockEmployee";
import { states } from "../Data/mockState";
import { department } from "../Data/mockDepartment";

// Slice pour la gestion des données des employés
const employeeDataSlice = createSlice({
  name: "employeeData", // Nom du slice
  initialState: employees, // État initial défini par les données fictives d'employés
  reducers: {
    /**
     * Action pour ajouter un employé à l'état.
     * @function
     * @param {Array} state - État actuel du slice (liste d'employés).
     * @param {Object} action - Objet d'action contenant le nouvel employé à ajouter.
     */
    addEmployee: (state, action) => {
      state.push(action.payload); // Action pour ajouter un employé à l'état
    },
  },
});

// Slice pour la gestion des données de l'application (États, Départements, etc.)
const appDataSlice = createSlice({
  name: "appData", // Nom du slice
  initialState: { states, department }, // État initial avec les données initiales d'états et de départements
  reducers: {}, // Aucune action définie pour ce slice dans cet exemple
});

// Slice pour la gestion de la recherche
const searchSlice = createSlice({
  name: 'search', // Nom du slice
  initialState: '', // État initial, une chaîne vide
  reducers: {
    /**
     * Action pour mettre à jour la recherche en convertissant en minuscules.
     * @function
     * @param {string} state - État actuel du slice (chaîne de recherche).
     * @param {Object} action - Objet d'action contenant la nouvelle valeur de recherche.
     * @returns {string} - Nouvelle valeur de recherche en minuscules.
     */
    updateSearch: (state, action) => {
      return action.payload.toLowerCase(); // Action pour mettre à jour la recherche en convertissant en minuscules
    },
  },
});

// Slice pour la gestion des interactions utilisateur (Page actuelle, Titre de la page, etc.)
const userInteractionSlice = createSlice({
  name: "userInteraction", // Nom du slice
  initialState: {
    page: null,
    pageTitle: null,
  }, // État initial pour les informations d'interaction utilisateur
  reducers: {
    /**
     * Action pour mettre à jour la page actuelle et le titre de la page.
     * @function
     * @param {Object} state - État actuel du slice (informations d'interaction utilisateur).
     * @param {Object} action - Objet d'action contenant la nouvelle page et le nouveau titre de la page.
     */
    updatePageLocation: (state, action) => {
      state.page = action.payload.page; // Action pour mettre à jour la page actuelle
      state.pageTitle = action.payload.pageTitle; // Action pour mettre à jour le titre de la page
    },
  },
});

// Exporte les actions et sélecteurs pour une utilisation dans d'autres parties de l'application
export const { updateSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search;
export const selectEmployeeData = (state) => state.employeeData;

// Configuration du magasin Redux avec les slices définis
export const store = configureStore({
  reducer: {
    employeeData: employeeDataSlice.reducer,
    appData: appDataSlice.reducer,
    userInteraction: userInteractionSlice.reducer,
    search: searchSlice.reducer,
  },
});
