import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";
import React, { useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div>
      <Router>
        <MainNavbar />
        <Alert alert={alert} />
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            {/* Login */}
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            {/* Sign up */}
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
