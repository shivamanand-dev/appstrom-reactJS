import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../redux";
import { setNavProgress } from "../../redux";

const Login = ({ setAlert, setNavProgress }) => {
  document.title = "AppStrom - Sign In";
  const REACT_APP_AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;
  // State on change
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  //   Navigate
  const navigate = useNavigate();

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // props.setNavProgress(10);
    setNavProgress(10);
    // Fetch
    const response = await fetch(`${REACT_APP_AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    // props.setNavProgress(70);
    setNavProgress(50);
    const resJSON = await response.json();

    if (resJSON.success) {
      localStorage.setItem("token", resJSON.authToken);
      navigate("/myprofile");
      setAlert("Logged in successfully", "success");
      // props.showAlert("Logged in successfully", "success");
      setNavProgress(70);
      console.log(resJSON.user.username);
      localStorage.setItem("username", resJSON.user.username);
      setNavProgress(100);
      // props.setNavProgress(100);
    } else {
      setAlert(resJSON.error, "danger");
      setNavProgress(100);
    }
  };

  //   Handle OnChange
  const handleOnchange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  return (
    //          ------- MAIN GRADIENT BACKGROUND --------
    <div
      className="gradientBackground"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {/* ---- PERSON ICON AND LOGIN FORM CONTAINER ----- */}
      <div
        className="d-flex justify-content-between align-items-center authContainer"
        style={{ padding: "15px" }}
      >
        {/*  --- PERSON ICON ---  */}

        <div className="text-center displayNone" style={{ width: "100%" }}>
          <i className="bi bi-person-circle" style={{ fontSize: "200px" }}></i>
        </div>

        {/* --- LOGIN FORM --- */}

        <div style={{ width: "100%", margin: "0 auto", padding: "10px" }}>
          <Form
            style={{ maxWidth: "300px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="username">
                Email or Username
              </Form.Label>
              <Form.Control
                type="text"
                minLength={5}
                placeholder="email id or username"
                required
                onChange={handleOnchange}
                name="username"
                value={credential.username}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="password">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                minLength={7}
                placeholder="Enter your Password"
                required
                onChange={handleOnchange}
                name="password"
                value={credential.password}
              />
            </Form.Group>
            {/* --- LOGIN BUTTON --- */}
            <Button
              className="authFormBtnTrans"
              variant="primary"
              style={{ boxShadow: "none", width: "100%" }}
              type="submit"
            >
              <span>LOG IN</span>
            </Button>

            <Form.Group style={{ margin: "20px 40px" }} className="mb-3">
              Not yet Registered? <span> </span>
              <Link
                to="/signup"
                style={{ boxShadow: "none", textDecoration: "none" }}
              >
                Sign up
              </Link>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertState: state.alert,
    progress: state.progress.progress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (message, type) => dispatch(setAlert(message, type)),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
