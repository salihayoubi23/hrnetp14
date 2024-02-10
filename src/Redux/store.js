// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { employees } from "../Data/mockEmployee";
import { states } from "../Data/mockState";
import { department } from "../Data/mockDepartment";

const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState: employees,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

const appDataSlice = createSlice({
  name: "appData",
  initialState: { states, department },
  reducers: {},
});

// Intégration de la logique de recherche dans le même fichier
const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    updateSearch: (state, action) => {
      return action.payload.toLowerCase();
    },
  },
});

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

export const { updateSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search;
export const selectEmployeeData = (state) => state.employeeData;

export const store = configureStore({
  reducer: {
    employeeData: employeeDataSlice.reducer,
    appData: appDataSlice.reducer,
    userInteraction: userInteractionSlice.reducer,
    search: searchSlice.reducer,
  },
});
