import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
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
    props.setNavProgress(10);
    // Fetch
    const response = await fetch(`${REACT_APP_AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    props.setNavProgress(70);
    const resJSON = await response.json();
    console.log(resJSON);

    if (resJSON.success) {
      localStorage.setItem("token", resJSON.authToken);
      navigate("/profile");
      props.showAlert("Logged in successfully", "success");
      props.setNavProgress(100);
    } else {
      props.showAlert(resJSON.error, "danger");
      props.setNavProgress(100);
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
    <div>
      <Form
        style={{ maxWidth: "300px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            minLength={5}
            placeholder="Enter Username"
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
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            minLength={7}
            placeholder="Password"
            required
            onChange={handleOnchange}
            name="password"
            value={credential.password}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Link to="/signup" style={{ boxShadow: "none" }}>
            Not yet Registered? SignUp
          </Link>
        </Form.Group>
        <Button variant="primary" style={{ boxShadow: "none" }} type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
