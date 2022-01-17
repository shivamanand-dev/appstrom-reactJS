import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import About from "./components/About";
import Home from "./components/Home";
import Alert from "./components/Alert";
import React from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import LoadingBar from "react-top-loading-bar";
import Profile from "./components/Profile/Profile";
import { useSelector } from "react-redux";
import Activity from "./components/ActivityTracker/Activity";
import ContactUs from "./components/ContactUs";

function App() {
  // const [progress, setProgress] = useState(0);
  const state = useSelector((state) => state.progress);

  // const setNavProgress = (progress) => {
  //   setProgress(progress);
  // };

  return (
    <div>
      <Router>
        <MainNavbar />
        <div style={{ height: "64px" }}></div>
        <Alert />
        <div style={{ height: "50px" }}></div>
        <div className="container mt-3">
          <LoadingBar color="#f11946" height={2} progress={state.progress} />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/contactus" element={<ContactUs />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            {/* Login */}
            <Route exact path="/login" element={<Login />}></Route>
            {/* Sign up */}
            <Route exact path="/signup" element={<Signup />}></Route>
            {/* PROFILE */}
            <Route exact path="/profile" element={<Profile />}></Route>
            {/* ACTIVITY */}
            <Route exact path="/activity" element={<Activity />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

// "start": "set PORT=80 && react-scripts start",
