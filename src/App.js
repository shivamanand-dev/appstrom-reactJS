import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/GlobalUi/MainNavbar";
import About from "./components/GlobalUi/About";
import Home from "./components/GlobalUi/Home";
import Alert from "./components/GlobalUi/Alert";
import React from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import LoadingBar from "react-top-loading-bar";
import Profile from "./components/Profile/Profile";
import { useSelector } from "react-redux";
import Activity from "./components/ActivityTracker/Activity";
import ContactUs from "./components/GlobalUi/ContactUs";
import Footer from "./components/GlobalUi/Footer";
import Elaichi from "./components/Elaichi/Elaichi";
import VisitProfile from "./components/Profile/VisitProfile";

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
            <Route exact path="/myprofile" element={<Profile />}></Route>
            {/* ACTIVITY */}
            <Route exact path="/activity" element={<Activity />}></Route>
            {/* Elaichi */}
            <Route exact path="/elaichi" element={<Elaichi />}></Route>
            {/* Visit Profile */}
            <Route exact path="/profile" element={<VisitProfile />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

// "start": "set PORT=80 && react-scripts start",
