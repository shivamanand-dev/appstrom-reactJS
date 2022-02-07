import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../redux";
import { setNavProgress } from "../../redux";

const Signup = ({ setAlert, setNavProgress }) => {
  const baseURL = process.env.REACT_APP_AUTH_BASE_URL;
  // State on change
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    promocode: "",
    appliedPromocode: "",
    openningBalance: 0,
    gender: "",
    dateOfBirth: "",
    location: "",
  });

  document.title = "AppStrom - Sign Up";

  //   Navigate
  const navigate = useNavigate();

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNavProgress(3);
    // Fetch
    const response = await fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    setNavProgress(70);
    const resJSON = await response.json();
    console.log(resJSON);

    if (resJSON.success) {
      localStorage.setItem("token", resJSON.authToken);
      localStorage.setItem("username", resJSON.user.username);
      navigate("/myprofile");
      // props.setNavProgress(100);
      setAlert("Logged in successfully", "success");
    } else {
      // props.showAlert(resJSON.error, "danger");
      setAlert(resJSON.error, "danger");
      setNavProgress(100);
      // props.setNavProgress(100);
    }
  };

  //   Handle OnChange
  const handleOnChange = (e) => {
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
      {/* ---- PERSON ICON AND SIGN UP FORM CONTAINER ----- */}

      <div
        className="d-flex justify-content-between align-items-center authContainer"
        style={{ padding: "15px" }}
      >
        {/*  --- PERSON ICON ---  */}

        <div className="text-center displayNone" style={{ width: "100%" }}>
          <i className="bi bi-person-circle" style={{ fontSize: "200px" }}></i>
        </div>

        {/* ---- SIGN UP FORM ----   */}

        <div
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "10px",
            height: "90%",
            overflowY: "scroll",
          }}
        >
          <Form
            style={{ maxWidth: "300px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="name">
                Name<span style={{ color: "#dd1919" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                placeholder="Enter Name"
                name="name"
                value={credential.name}
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="email">
                Email address<span style={{ color: "#dd1919" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="email"
                placeholder="Enter email id"
                name="email"
                value={credential.email}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="username">
                Username<span style={{ color: "#dd1919" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                placeholder="Username"
                name="username"
                value={credential.username}
                required
                minLength={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="password">
                Password<span style={{ color: "#dd1919" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="password"
                placeholder="Password"
                name="password"
                value={credential.password}
                required
                minLength={7}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                // onChange={handleOnChange}
                type="password"
                placeholder="Re-enter Password"
                // name="password"
                // value={credential.password}
                // required
                // minLength={7}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="location">
                Location
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                placeholder="Enter your location"
                name="location"
                value={credential.location}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }} htmlFor="dateOfBirth">
                Date of Birth
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="date"
                name="dateOfBirth"
                value={credential.dateOfBirth}
              />
            </Form.Group>

            {/* --- GENDER --- */}

            <div className="mb-3">
              {/* --- LABEL FOR GENDER --- */}
              <div className="mb-1">
                <label style={{ fontWeight: "500" }} htmlFor="elaichiType">
                  Gender
                </label>
              </div>

              {/* --- MALE - RADIO BUTTON --- */}

              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange={handleOnChange}
                  type="radio"
                  name="elaichiType"
                />
                <label className="form-check-label" htmlFor="elaichiType">
                  Male
                </label>
              </div>

              {/* --- FEMALE - RADIO BUTTON --- */}

              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange={handleOnChange}
                  type="radio"
                  name="elaichiType"
                  checked
                />
                <label className="form-check-label" htmlFor="elaichiType">
                  Female
                </label>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label
                style={{ fontWeight: "500" }}
                htmlFor="appliedPromocode"
              >
                Promo Code
              </Form.Label>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                placeholder="Enter Promo code"
                name="appliedPromocode"
                value={credential.appliedPromocode}
                minLength={3}
              />
            </Form.Group>

            {/* SIGN UP BUTTON */}

            <Button
              className="authFormBtnTrans"
              variant="primary"
              style={{ boxShadow: "none", width: "100%" }}
              type="submit"
            >
              <span>SIGN UP</span>
            </Button>

            <Form.Group style={{ margin: "20px 40px" }} className="mb-3">
              Already Registered? <span> </span>
              <Link
                to="/login"
                style={{ boxShadow: "none", textDecoration: "none" }}
              >
                Log in
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
