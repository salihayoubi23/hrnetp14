import React, { useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "../../Features/dateFormat";
import Modal from "react-modal";
import Dropdown from 'pluginhrnet';

export default function AddEmployee() {
  const dispatch = useDispatch();

  const employeeDataLastIndex = useSelector(
    (state) => state.employeeData.at(-1).index
  );
  const reduxState = useSelector((state) => state.appData.states);
  const stateArr = reduxState.map((elem) => elem.name);
  const reduxDepartment = useSelector((state) => state.appData.department);

  // Change page title
  useEffect(() => {
    dispatch({
      type: "userInteraction/updatePageLocation",
      payload: {
        page: "employee",
        pageTitle: "HRnet - Add Employee",
      },
    });
  }, [dispatch]);

  // Form Handling
  const [birthStartDate, setBirthStartDate] = useState(new Date());
  const [isBirthDateValid, setIsBirthDateValid] = useState(true);
  const [hiringStartDate, setHiringStartDate] = useState(new Date());
  const [isHiringDateValid, setIsHiringDateValid] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [department, setDepartment] = useState();
  const [street, setStreet] = useState("");
  const [isStreetValid, setIsStreetValid] = useState(true);
  const [city, setCity] = useState("");
  const [isCityValid, setIsCityValid] = useState(true);
  const [zipCode, setZipCode] = useState("");
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);
  const [stateAdress, setStateAdress] = useState();
  const [onFormReset, setOnFormReset] = useState(false);

  const regexName = /^(?=[A-Za-z- ]{2,18}$)[A-Za-z]+(?:[- ]?[A-Za-z]+)*$/;
  const regexStreet = /^[0-9]+(?: [a-zA-Z-]+)*$/;
  const regexZipCode = /^\d{5}(?:-\d{4})?$/;

  function handleSubmit(e) {
    e.preventDefault();

    let formContainsError = false;

    if (!regexName.test(firstName)) {
      setIsFirstNameValid(false);
      formContainsError = true;
    } else {
      if (!isFirstNameValid) {
        setIsFirstNameValid(true);
      }
    }

    if (!regexName.test(lastName)) {
      setIsLastNameValid(false);
      formContainsError = true;
    } else {
      if (!isLastNameValid) {
        setIsLastNameValid(true);
      }
    }

    if (!regexName.test(city)) {
      setIsCityValid(false);
      formContainsError = true;
    } else {
      if (!isCityValid) {
        setIsCityValid(true);
      }
    }

    if (!regexStreet.test(street)) {
      setIsStreetValid(false);
      formContainsError = true;
    } else {
      if (!isStreetValid) {
        setIsStreetValid(true);
      }
    }

    if (birthStartDate === null) {
      setIsBirthDateValid(false);
      setBirthStartDate(new Date());
      formContainsError = true;
    } else {
      if (!isBirthDateValid) {
        setIsBirthDateValid(true);
      }
    }

    if (hiringStartDate === null) {
      setIsHiringDateValid(false);
      setHiringStartDate(new Date());
      formContainsError = true;
    } else {
      if (!isHiringDateValid) {
        setIsHiringDateValid(true);
      }
    }

    if (!regexZipCode.test(zipCode)) {
      setIsZipCodeValid(false);
      formContainsError = true;
    } else {
      if (!isZipCodeValid) {
        setIsZipCodeValid(true);
      }
    }

    const stateShort = () => {
      const foundState = reduxState.find((elem) => elem.name === stateAdress);
      return foundState.abbreviation;
    };

    if (formContainsError) {
      console.log("Form is not correct");
      return;
    } else {
      const employee = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateFormat(birthStartDate),
        startDate: dateFormat(hiringStartDate),
        department: department,
        street: street,
        city: city,
        state: stateShort(),
        zipCode: zipCode,
        index: employeeDataLastIndex + 1,
      };
      dispatch({ type: "employeeData/addEmployee", payload: employee });
      openModal();
    }
  }

  // Modal Handling
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    emptyForm();
  };

  const customModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Empty form function
  function emptyForm() {
    setOnFormReset(true);
    const form = document.querySelector("form");
    setBirthStartDate(new Date());
    setHiringStartDate(new Date());
    form.reset();
  }

  useEffect(() => {
    if (onFormReset) {
      setOnFormReset(false);
    }
  }, [onFormReset]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyle}
        contentLabel="Form validation Modal"
      >
        <h2>User successfully added</h2>
        <button onClick={closeModal}>close</button>
      </Modal>

      <main className="addEmployeeMain">
        <h1>Add Employee</h1>
        <div className="formContainer">
          <form id="formAddEmployee">
            <div className="employeeIdInfo formAddEmployee__sectionContainer">
              <p className="formTitle">Identy Informations</p>
              <div className="formInfosGroup">
                <div className="employeeIdInfo__name">
                  <div className="inputContainer">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      className={!isFirstNameValid ? "inputError" : ""}
                    />
                    {!isFirstNameValid ? (
                      <div className="errorInfo">
                        <p>Invalid name format</p>
                      </div>
                    ) : (
                      <div className="errorInfo"></div>
                    )}
                  </div>

                  <div className="inputContainer">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lasttName"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      className={!isLastNameValid ? "inputError" : ""}
                    />
                    {!isLastNameValid ? (
                      <div className="errorInfo">
                        <p>Invalid name format</p>
                      </div>
                    ) : (
                      <div className="errorInfo"></div>
                    )}
                  </div>
                </div>
                <div className="inputContainer">
                  <label htmlFor="birthStartDate">Birth Date</label>
                  <DatePicker
                    showIcon
                    name="birstStartDate"
                    id="birthStartDate"
                    selected={birthStartDate}
                    onChange={(date) => setBirthStartDate(date)}
                    className={!isBirthDateValid ? "inputError" : ""}
                  />
                  {!isBirthDateValid ? (
                    <div className="errorInfo">
                      <p>You must filled this field</p>
                    </div>
                  ) : (
                    <div className="errorInfo"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="employeeEnterpriseInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Informations</p>
              <div className="formInfosGroup">
                <div className="inputContainer">
                  <label htmlFor="hiringStartDate">Hiring Date</label>
                  <DatePicker
                    showIcon
                    name="hiringStartDate"
                    id="hiringStartDate"
                    selected={hiringStartDate}
                    onChange={(date) => setHiringStartDate(date)}
                    className={!isHiringDateValid ? "inputError" : ""}
                  />
                  {!isHiringDateValid ? (
                    <div className="errorInfo">
                      <p>You must filled this field</p>
                    </div>
                  ) : (
                    <div className="errorInfo"></div>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="department">Department</label>
                  <Dropdown
                    name="department"
                    id="department"
                    dropdownData={reduxDepartment}
                    onChange={(selection) => setDepartment(selection)}
                    onReset={onFormReset}
                  />
                </div>
              </div>
            </div>
            <div className="employeeAddressInfo  formAddEmployee__sectionContainer">
              <p className="formTitle">Employee Address</p>
              <div className="formInfosGroup">
                <div className="inputContainer">
                  <label htmlFor="state">State</label>
                  <Dropdown
                    name="state"
                    id="state"
                    dropdownData={stateArr}
                    onChange={(selection) => setStateAdress(selection)}
                    onReset={onFormReset}
                  />
                  <div className="errorInfo"></div>
                </div>
                <div className="inputContainer">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Street"
                    onChange={(e) => setStreet(e.target.value)}
                    className={!isStreetValid ? "inputError" : ""}
                  />
                  {!isStreetValid ? (
                    <div className="errorInfo">
                      <p>Street format expected: "21 jump street"</p>
                    </div>
                  ) : (
                    <div className="errorInfo"></div>
                  )}
                </div>

                <div className="cityZipContainer">
                  <div className="inputContainer">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                      className={!isCityValid ? "inputError" : ""}
                    />
                    {!isCityValid ? (
                      <div className="errorInfo">
                        <p>Invalid city name format</p>
                      </div>
                    ) : (
                      <div className="errorInfo"></div>
                    )}
                  </div>

                  <div className="inputContainer">
                    <label htmlFor="zipCode">Zipcode</label>
                    <input
                      type="number"
                      name="zipCode"
                      id="zipCode"
                      placeholder="Zipcode"
                      onChange={(e) => setZipCode(e.target.value)}
                      className={!isZipCodeValid ? "inputError" : ""}
                    />
                    {!isZipCodeValid ? (
                      <div className="errorInfo">
                        <p>ZipCode format expected: "98765" or "98765-4321"</p>
                      </div>
                    ) : (
                      <div className="errorInfo"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
