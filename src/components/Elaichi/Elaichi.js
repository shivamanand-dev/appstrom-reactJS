import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form } from "react-bootstrap";

const Elaichi = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {/* Elaichi wala Form */}
      <Form className="mb-3">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            placeholder="What's Happening?? 😉"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button
          variant="primary"
          style={{ boxShadow: "none", width: "100%" }}
          type="submit"
        >
          Post
        </Button>
      </Form>
      <Card>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Elaichi;
