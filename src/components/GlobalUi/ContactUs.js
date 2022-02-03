import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div className="gradientBackground">
      <div
        className="authContainer"
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          padding: "60px",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: "500" }}>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: "500" }}>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ fontWeight: "500" }}>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your message here"
            />
          </Form.Group>
          <Button
            className="authFormBtnTrans"
            variant="primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
