import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const baseURL = "http://localhost:5500/api/auth";
  // State on change
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    promocode: "hellopass",
    appliedPromocode: "",
    openningBalance: 0,
  });

  //   Navigate
  const navigate = useNavigate();

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // // Fetch
    const response = await fetch(`${baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const resJSON = await response.json();
    // console.log(resJSON);

    if (resJSON.success) {
      navigate("/");
      props.showAlert("Signed up successfully", "success");
    } else {
      props.showAlert(resJSON.error, "danger");
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
    <div className="mt-3">
      <Form
        style={{ maxWidth: "300px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="text"
            placeholder="Name"
            name="name"
            value={credential.name}
            required
            minLength={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="email"
            placeholder="Enter email"
            name="email"
            value={credential.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
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
          <Form.Label htmlFor="password">Password</Form.Label>
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

        <Form.Group className="mb-3">
          <Form.Label htmlFor="appliedPromocode">PromoCode</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="text"
            placeholder="PromoCode"
            name="appliedPromocode"
            value={credential.appliedPromocode}
            required
            minLength={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="promocode">Your PromoCode</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type="text"
            placeholder="PromoCode"
            name="username"
            value={credential.username}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Link to="/login" style={{ boxShadow: "none" }}>
            Allready Registered? Log In
          </Link>
        </Form.Group>

        <Button variant="primary" style={{ boxShadow: "none" }} type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
