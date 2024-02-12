// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./Page/Index";
import AddEmployee from "./Page/AddEmployee";
import Erreur from "./Component/Erreur"; 
import Header from "./Component/Header";
import { useSelector } from "react-redux";

function App() {
  document.title = useSelector((state) => state.userInteraction.pageTitle);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
    </>
  );
}

export default App;
