// Import des modules React et des composants nécessaires
import React, { useEffect, useState } from "react";
import "../App.css"; // Import du fichier CSS principal
import { useDispatch, useSelector } from "react-redux"; // Import de Redux pour la gestion de l'état global
import "react-datepicker/dist/react-datepicker.css"; // Styles pré-construits pour le composant DatePicker
import dateFormat from "../Features/dateFormat"; // Fonction de formatage de date personnalisée
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'pluginhrnet'; // Composant Dropdown personnalisé provenant du pluginhrnet
import TextInput from "../Component/TextInput"; // Composant TextInput pour les champs de texte
import DateInput from "../Component/DateInput"; // Composant DateInput pour les champs de date

// État initial du formulaire
const initialState = {
  firstName: "",
  lastName: "",
  birthStartDate: new Date(),
  hiringStartDate: new Date(),
  department: "",
  street: "",
  city: "",
  zipCode: "",
  stateAdress: "",
};

// Composant principal pour ajouter un employé
export default function AddEmployee() {
  // Initialisation du dispatch Redux pour la gestion de l'état global
  const dispatch = useDispatch();

  // Extraction des données du state global à l'aide de useSelector
  const reduxDepartment = useSelector((state) => state.appData.department);
  const reduxState = useSelector((state) => state.appData.states);
  const stateArr = reduxState.map((elem) => elem.name);
  const employeeDataLastIndex = useSelector(
    (state) => state.employeeData.at(-1)?.index || 0
  );

  // États locaux pour la gestion du formulaire
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [onFormReset, setOnFormReset] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Effet useEffect pour mettre à jour la localisation de la page dans Redux
  useEffect(() => {
    dispatch({
      type: "userInteraction/updatePageLocation",
      payload: {
        page: "employee",
        pageTitle: "HRnet - Add Employee",
      },
    });
  }, [dispatch]);

  // Fonction pour gérer le changement des champs de formulaire
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: null });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    let formContainsError = false;

    // Validation des champs
    formContainsError = !validateField("firstName", formData.firstName, /^(?=[A-Za-z- ]{2,18}$)[A-Za-z]+(?:[- ]?[A-Za-z]+)*$/, "Invalid first name format") || formContainsError;
    formContainsError = !validateField("lastName", formData.lastName, /^(?=[A-Za-z- ]{2,18}$)[A-Za-z]+(?:[- ]?[A-Za-z]+)*$/, "Invalid last name format") || formContainsError;

    if (formContainsError) {
      console.log("Form is not correct");
      return;
    }

    // Logique d'ajout d'employé
    const employee = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: dateFormat(formData.birthStartDate),
      startDate: dateFormat(formData.hiringStartDate),
      department: formData.department,
      street: formData.street,
      city: formData.city,
      state: formData.stateAdress,
      zipCode: formData.zipCode,
      index: employeeDataLastIndex + 1,
    };

    // Dispatch de l'action Redux pour ajouter un employé
    dispatch({ type: "employeeData/addEmployee", payload: employee });

    console.log("Before opening modal");
    // Ouverture du modal de confirmation
    setModalIsOpen(true);
    console.log("After opening modal");
  };

  // Fonction de validation générique pour les champs du formulaire
  const validateField = (field, value, regex, errorMessage) => {
    if (!regex.test(value)) {
      setFormErrors({ ...formErrors, [field]: errorMessage });
      return false;
    }
    return true;
  };

  // Fonction pour réinitialiser le formulaire
  const emptyForm = () => {
    setOnFormReset(true);
    const form = document.querySelector("form");
    setFormData(initialState);
    form.reset();
  };

  // Effet useEffect pour réinitialiser l'état onFormReset
  useEffect(() => {
    if (onFormReset) {
      setOnFormReset(false);
    }
  }, [onFormReset]);

  // Rendu du composant
  return (
    <>
      {/* Modal pour afficher le message de confirmation */}
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User successfully added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenu du modal */}
          <h2>Employé bien ajouté</h2>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      {/* Section principale pour ajouter un employé */}
      <main className="addEmployeeMain">
        <h1>Add Employee</h1>
        <div className="formContainer">
          {/* Formulaire pour collecter les informations de l'employé */}
          <form id="formAddEmployee">
            {/* Section pour les informations d'identité */}
            <div className="employeeIdInfo formAddEmployee__sectionContainer">
              <p className="formTitle">Identity Information</p>
              <div className="formInfosGroup">
                <div className="employeeIdInfo__name">
                  {/* Champ de texte pour le prénom */}
                  <TextInput
                    label="First Name"
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                    isValid={!formErrors.firstName}
                    errorMessage="Invalid first name format"
                  />
                  {/* Champ de texte pour le nom de famille */}
                  <TextInput
                    label="Last Name"
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                    isValid={!formErrors.lastName}
                    errorMessage="Invalid last name format"
                  />
                </div>
                {/* Champ de date pour la date de naissance */}
                <DateInput
                  label="Birth Date"
                  id="birthStartDate"
                  selected={formData.birthStartDate}
                  onChange={(date) => setFormData({ ...formData, birthStartDate: date })}
                  isValid={!formErrors.birthStartDate}
                  errorMessage="You must fill in this field"
                />
              </div>
            </div>
            {/* Section pour les informations de l'employé */}
            <div className="employeeEnterpriseInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Information</p>
              <div className="formInfosGroup">
                {/* Champ de date pour la date d'embauche */}
                <DateInput
                  label="Hiring Date"
                  id="hiringStartDate"
                  selected={formData.hiringStartDate}
                  onChange={(date) => setFormData({ ...formData, hiringStartDate: date })}
                  isValid={!formErrors.hiringStartDate}
                  errorMessage="You must fill in this field"
                />
                {/* Composant Dropdown pour sélectionner le département */}
                <Dropdown
                  label="Department"
                  id="department"
                  dropdownData={reduxDepartment}
                  onChange={(selection) => setFormData({ ...formData, department: selection })}
                  onReset={onFormReset}
                  className="z-index"
                />
              </div>
            </div>
            {/* Section pour l'adresse de l'employé */}
            <div className="employeeAddressInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Address</p>
              <div className="formInfosGroup">
                {/* Composant Dropdown pour sélectionner l'état */}
                <Dropdown
                  label="State"
                  id="state"
                  dropdownData={stateArr}
                  onChange={(selection) => setFormData({ ...formData, stateAdress: selection })}
                  onReset={onFormReset}
                />
                {/* Champ de texte pour la rue */}
                <TextInput
                  label="Street"
                  id="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={(value) => handleInputChange('street', value)}
                  isValid={!formErrors.street}
                  errorMessage="Street format expected: '21 jump street'"
                />
                <div className="cityZipContainer">
                  {/* Champ de texte pour la ville */}
                  <TextInput
                    label="City"
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                    isValid={!formErrors.city}
                    errorMessage="Invalid city name format"
                  />
                  {/* Champ de texte pour le code postal */}
                  <TextInput
                    label="Zipcode"
                    id="zipCode"
                    placeholder="Zipcode"
                    value={formData.zipCode}
                    onChange={(value) => handleInputChange('zipCode', value)}
                    isValid={!formErrors.zipCode}
                    errorMessage="ZipCode format expected: '98765' or '98765-4321'"
                  />
                </div>
              </div>
            </div>
            {/* Bouton de soumission du formulaire */}
            <div className="submitButtonContainer">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                id="submitFormButton"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
