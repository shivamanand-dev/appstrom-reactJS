import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";
import React, { useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import LoadingBar from "react-top-loading-bar";
import Profile from "./components/Profile/Profile";

function App() {
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const setNavProgress = (progress) => {
    setProgress(progress);
  };

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
          <LoadingBar color="#f11946" height={2} progress={progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home setNavProgress={setNavProgress} />}
            ></Route>
            <Route
              exact
              path="/about"
              element={<About setNavProgress={setNavProgress} />}
            ></Route>
            {/* Login */}
            <Route
              exact
              path="/login"
              element={
                <Login setNavProgress={setNavProgress} showAlert={showAlert} />
              }
            ></Route>
            {/* Sign up */}
            <Route
              exact
              path="/signup"
              element={
                <Signup setNavProgress={setNavProgress} showAlert={showAlert} />
              }
            ></Route>
            <Route
              exact
              path="/profile"
              element={
                <Profile
                  setNavProgress={setNavProgress}
                  showAlert={showAlert}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

// "start": "set PORT=80 && react-scripts start",
