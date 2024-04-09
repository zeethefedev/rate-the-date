import React, { useState } from "react";
import "../style/Form.css";

const randomCoordinates = (width, height) => {
  const x = (Math.floor(Math.random() * 101) / 150) * height;
  const y = (Math.floor(Math.random() * 101) / 150) * width;
  return { x, y };
};
function MovingButton({ label, disabled }) {
  const [position, setPosition] = useState("relative");
  const [coordinates, setCoordinates] = useState({
    x: "auto",
    y: "auto",
  });
  const [count, setCount] = useState(0);

  const changeCoordinates = (event) => {
    event.preventDefault();
    if (!disabled) {
      //change position
      setPosition("absolute");
      //change coordinates
      setCoordinates(randomCoordinates(window.innerHeight, window.innerWidth));
      setCount(count + 1);
    }
  };

  return (
    <button
      className="moving-button"
      style={{
        position: position,
        top: coordinates.x,
        left: coordinates.y,
      }}
      onClick={changeCoordinates}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default MovingButton;
