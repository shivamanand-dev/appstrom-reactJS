/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import SpinnerLoading from "../SpinnerJs/SpinnerLoading";

const ElaichiCard = (props) => {
  const [page, setPage] = useState(0);

  // Saving fetch Data
  const [elaichis, setElaichis] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  // UseEffect
  useEffect(() => {
    fetchElaichi();
  }, []);

  // fetch Elaichi for the first time
  const fetchElaichi = async () => {
    // props.setProgress(10);
    setLoading(true);
    const url = `${props.url}/${page}`;

    // Axios
    await axios
      .get(`${url}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const elaichi = res.data.elaichi;
        const totalElaichis = res.data.totalElaichis;

        setElaichis(elaichi);
        setTotalResults(totalElaichis);
      });

    setPage(page + 1);

    setLoading(false);
  };

  // Next on Scroll Function
  const fetchMoreData = async () => {
    const url = `${props.url}/${page}`;
    setPage(page + 1);

    // Axios
    await axios
      .get(`${url}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const elaichi = res.data.elaichi;
        const totalElaichis = res.data.totalElaichis;

        setElaichis(elaichis.concat(elaichi));
        setTotalResults(totalElaichis);
      });
  };

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
      {loading === true ? (
        <>
          <SpinnerLoading />
        </>
      ) : (
        <>
          <InfiniteScroll
            dataLength={elaichis.length}
            next={fetchMoreData}
            hasMore={elaichis.length !== totalResults}
            loader={<SpinnerLoading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* Infinite Scroll */}
            {elaichis.map((e) => {
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
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default ElaichiCard;
