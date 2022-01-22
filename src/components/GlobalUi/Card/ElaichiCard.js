/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const ElaichiCard = (props) => {
  useEffect(() => {
    props.getAllElaichi();
  }, []);

  const elaichState = useSelector((state) => state.elaichi);

  const elaichiArr = elaichState.elaichi;

  //   console.log(elaichState);
  return (
    <>
      {elaichState.loading === true ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {elaichiArr.map((e) => {
            return (
              <Card key={e._id} className="my-3">
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
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
