// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { employees } from "../Data/mockEmployee";
import { states } from "../Data/mockState";
import { department } from "../Data/mockDepartment";

// Slice pour la gestion des données des employés
const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState: employees,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Slice pour la gestion des données de l'application (États, Départements, etc.)
const appDataSlice = createSlice({
  name: "appData",
  initialState: { states, department },
  reducers: {},
});

// Slice pour la gestion de la recherche
const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    updateSearch: (state, action) => {
      return action.payload.toLowerCase();
    },
  },
});

// Slice pour la gestion des interactions utilisateur (Page actuelle, Titre de la page, etc.)
const userInteractionSlice = createSlice({
  name: "userInteraction",
  initialState: {
    page: null,
    pageTitle: null,
  },
  reducers: {
    updatePageLocation: (state, action) => {
      state.page = action.payload.page;
      state.pageTitle = action.payload.pageTitle;
    },
  },
});

// Exporte les actions et sélecteurs
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
