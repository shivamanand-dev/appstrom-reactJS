import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../redux";
import { setNavProgress } from "../../redux";
import axios from "axios";

const ContactUs = ({ setAlert, setNavProgress }) => {
  document.title = "AppStrom - Contact Us";
  const REACT_APP_CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL;

  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });
  //   Navigate
  const navigate = useNavigate();
  //   Handle On change in Input
  const handleOnChange = (e) => {
    // console.log(e.target.name + " : " + e.target.value);
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  // Handle on submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${REACT_APP_CONTACT_EMAIL}`, message, {});

    setNavProgress(70);
    navigate("/about");
    setAlert("Mail Sent", "success");

    setNavProgress(100);
  };
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "40px 60px",
        border: "1px solid grey",
        borderRadius: "5px"
      }}
    >
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={handleOnChange}
            name="name"
            value={message.name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontWeight: "500" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={handleOnChange}
            name="email"
            value={message.email}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: "500" }}>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Type your message here"
            onChange={handleOnChange}
            name="message"
            value={message.message}
          />
        </Form.Group>
        <Button
          className="authFormBtnTrans"
          variant="primary"
          type="submit"
          style={{ width: "100%"}}
        >
          Submit
        </Button>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
