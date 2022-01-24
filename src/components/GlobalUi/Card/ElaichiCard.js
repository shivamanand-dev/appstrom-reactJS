/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const ElaichiCard = (props) => {
  // UseState

  // Elaichi State coming from Store
  const elaichState = useSelector((state) => state.elaichi);
  const elaichiArr = elaichState.elaichi;

  // Function to convert time
  const dateConvert = (time) => {
    const now = new Date();
    const date = new Date(time);

    const difference = now - date;

    const timeInMin = Math.round(difference / 60000);

    if (timeInMin < 60) {
      return timeInMin + " min";
    } else {
      const timeInHr = Math.round(timeInMin / 60);
      if (timeInHr < 24) {
        return timeInHr + " hr";
      } else {
        return Math.round(timeInHr / 24) + " days";
      }
    }
  };

  //   console.log(elaichState);
  return (
    <>
      {elaichState.loading === true ? (
        <>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <div>
          {elaichiArr.map((e) => {
            return (
              <Card key={e._id} className="my-3">
                <Card.Body>
                  <Card.Title>
                    {e.name} -{" "}
                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                      {dateConvert(e.time)} ago
                    </span>
                  </Card.Title>
                  <Card.Text>{e.elaichi}</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ElaichiCard;
