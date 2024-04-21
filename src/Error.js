import React from "react";
import { useNavigate } from "react-router-dom";

function Error({ errorMessage }) {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="wrapper">
      <h1>Error</h1>
      <div>{errorMessage}</div>
      <button
        className="primary-button primary-button-red"
        onClick={handleBackToHome}
      >
        Back to Home page
      </button>
    </div>
  );
}

export default Error;
