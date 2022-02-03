import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AddActivity from "./AddActivity";
import AllActivity from "./AllActivity";

const Activity = () => {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <div>
          <p>Log in First</p>
        </div>
      ) : (
        <>
          <Container>
            <div style={{maxWidth: "600px", margin: "0 auto" }}>
              {/* <h2>Activity Tracker</h2> */}

              <AddActivity />
              <AllActivity />
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Activity;
