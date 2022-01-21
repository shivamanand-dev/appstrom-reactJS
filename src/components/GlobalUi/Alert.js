import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alertState = useSelector((state) => state.alert);
  return (
    <div style={{ height: "50px", maxWidth: "350px", float: "right" }}>
      {alertState && (
        <div
          className={`alert alert-${alertState.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alertState.message}</strong>
        </div>
      )}
    </div>
  );
};

export default Alert;