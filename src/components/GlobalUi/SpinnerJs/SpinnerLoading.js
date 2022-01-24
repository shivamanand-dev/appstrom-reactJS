import React from "react";

const SpinnerLoading = () => {
  return (
    <div>
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoading;
