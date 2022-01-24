/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import ElaichiCard from "../GlobalUi/Card/ElaichiCard";
import axios from "axios";
import { getAllElaichi } from "../../redux";
import { setNavProgress } from "../../redux";
import { connect } from "react-redux";

const Elaichi = ({ getAllElaichi, setNavProgress, elaichi }) => {
  // useEffect(() => {
  //   getAllElaichi(0);
  // }, []);

  const [elaichiInput, setElaichiInput] = useState({
    elaichi: "",
    elaichiType: "public",
  });

  //   REACT_APP_ELAICHI_BASE_URL
  const REACT_APP_ELAICHI_BASE_URL = process.env.REACT_APP_ELAICHI_BASE_URL;

  //   Handle On change in Input
  const handleOnChange = (e) => {
    // console.log(e.target.name + " : " + e.target.value);

    setElaichiInput({ ...elaichiInput, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setNavProgress(30);
    await axios.post(`${REACT_APP_ELAICHI_BASE_URL}/createpost`, elaichiInput, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    setNavProgress(50);

    getAllElaichi(0);

    setNavProgress(70);

    setElaichiInput({
      elaichi: "",
      elaichiType: "public",
    });
    setNavProgress(100);
  };
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {/* Elaichi wala Form */}
      <Form
        className="mb-3 p-3 pb-0 border border-bottom-0 border-secondary rounded bg-light"
        onSubmit={handleOnSubmit}
      >
        <Form.Group>
          <Form.Control
            style={{ border: "none", boxShadow: "none" }}
            placeholder="What's Happening?? 😉"
            as="textarea"
            name="elaichi"
            onChange={handleOnChange}
            value={elaichiInput.elaichi}
            rows={3}
          />
        </Form.Group>
        <div className="d-flex justify-content-between pb-3">
          <div className="d-flex align-items-center">
            {/* Select */}
            <label htmlFor="elaichiType">
              {elaichiInput.elaichiType === "public" ? (
                <i className="bi bi-globe text-secondary"></i>
              ) : elaichiInput.elaichiType === "private" ? (
                <i className="bi bi-lock-fill text-secondary"></i>
              ) : (
                ""
              )}
            </label>
            <select
              className="form-select border border-0"
              onChange={handleOnChange}
              name="elaichiType"
              defaultValue={elaichiInput.elaichiType}
              style={{ boxShadow: "none" }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Post Button */}
          <Button
            variant="outline-dark"
            className="rounded-pill"
            style={{ boxShadow: "none", width: "100px" }}
            type="submit"
            disabled={elaichiInput.elaichi === "" ? true : false}
          >
            Post
          </Button>
        </div>
      </Form>

      <div>
        <ElaichiCard url={REACT_APP_ELAICHI_BASE_URL} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    elaichi: state.elaichi,
    progress: state.progress.progress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllElaichi: (page) => dispatch(getAllElaichi(page)),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Elaichi);
