import "./App.css";
import React, { useState } from "react";
import Dasboard from "./components/Dasboard";
import Nifty from "./components/Nifty";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/Sign_up";
import FinNifty from "./components/FinNifty";
import BankNifty from "./components/BankNifty";
import DataContex from "./state/Data/DataContex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  // Set the URL for the API
  const host = `https://prickly-eel-waistcoat.cyclic.app/`;

  // Create state for alert
  const [alert, setAlert] = useState(null);

  // Function to show alert message
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    // Clear the alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <DataContex host={host}>
        <Router>
         {localStorage.getItem("x-auth-token")? <Navbar /> : ""}
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/dasboard" element={<Dasboard host={host} />} />
            <Route exact path="/" element={<About />} />
            <Route exact path="/nifty" element={<Nifty host={host} />} />
            <Route
              exact
              path="/bank_nifty"
              element={<BankNifty host={host} />}
            />
            <Route
              exact
              path="/login"
              element={<Login host={host} showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signUp"
              element={<SignUp host={host} showAlert={showAlert} />}
            />
            <Route exact path="/fin_nifty" element={<FinNifty host={host} />} />
          </Routes>
        </Router>
      </DataContex>
    </>
  );
};

export default App;
