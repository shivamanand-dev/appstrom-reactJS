import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SpinnerLoading from "../GlobalUi/SpinnerJs/SpinnerLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import ElaichiCard from "../GlobalUi/Card/ElaichiCard";
import ProfileCard from "../GlobalUi/Card/ProfileCard";
import { connect } from "react-redux";
import { setAlert } from "../../redux";
import { setNavProgress } from "../../redux";

const VisitProfile = ({ setAlert, setNavProgress }) => {
  const { state } = useLocation();
  const { username } = state;

  const REACT_APP_AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

  const [page, setPage] = useState(0);

  // Saving fetch Data
  const [elaichis, setElaichis] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  // UseEffect
  useEffect(() => {
    fetchElaichi(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch Elaichi for the first time
  const fetchElaichi = async (initialPage) => {
    // props.setProgress(10);
    setLoading(true);
    const url = `${REACT_APP_AUTH_BASE_URL}/profile/${username}/${initialPage}`;

    // Axios
    await axios
      .get(`${url}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const user = res.data.user;
        const elaichi = res.data.elaichi;
        const totalElaichis = res.data.totalElaichis;

        setElaichis(elaichi);
        setTotalResults(totalElaichis);
        setUserInfo(user);
      });

    setPage(1);

    setLoading(false);
  };

  // Next on Scroll Function
  const fetchMoreData = async () => {
    const url = `${REACT_APP_AUTH_BASE_URL}/profile/${username}/${page}`;
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
  // console.log(userInfo);
  return (
    <>
      {loading === true ? (
        <>
          <SpinnerLoading />
        </>
      ) : (
        <>
          <ProfileCard
            userData={{ users: userInfo }}
            fetchElaichi={fetchElaichi}
            setAlert={setAlert}
            setNavProgress={setNavProgress}
          />
          <div
            style={{
              maxWidth: "550px",
              minWidth: "300px",
              margin: "0 auto",
            }}
          >
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
                    setNavProgress={setNavProgress}
                    setAlert={setAlert}
                    fetchElaichi={fetchElaichi}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </>
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VisitProfile);
