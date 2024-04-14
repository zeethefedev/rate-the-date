import React from "react";

function Error({ errorMessage }) {
  return (
    <div>
      <h1>Error</h1>
      <div>{errorMessage}</div>
    </div>
  );
}

export default Error;
