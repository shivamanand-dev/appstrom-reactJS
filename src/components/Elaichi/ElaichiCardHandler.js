/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import SpinnerLoading from "../GlobalUi/SpinnerJs/SpinnerLoading";
import ElaichiCard from "../GlobalUi/Card/ElaichiCard";

const ElaichiCardHandler = (props) => {
  const [page, setPage] = useState(0);
  // Saving fetch Data
  const [elaichis, setElaichis] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  // UseEffect
  useEffect(() => {
    fetchElaichi(0);
  }, [props.post]);

  // fetch Elaichi for the first time
  const fetchElaichi = async (initialPage) => {
    // props.setProgress(10);
    setLoading(true);
    const url = `${props.url}/${initialPage}`;

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

    setPage(1);

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
                <ElaichiCard
                  key={e._id}
                  element={e}
                  setAlert={props.setAlert}
                  setNavProgress={props.setNavProgress}
                  fetchElaichi={fetchElaichi}
                />
              );
            })}
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default ElaichiCardHandler;
