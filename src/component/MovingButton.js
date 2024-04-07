import React, { useState } from "react";
import "../style/Form.css";

const randomCoordinates = () => {
  const x = Math.floor(Math.random() * 101);
  const y = Math.floor(Math.random() * 101);
  return { x, y };
};
function MovingButton({ label }) {
  const [position, setPosition] = useState("relative");
  const [coordinates, setCoordinates] = useState({
    x: "auto",
    y: "auto",
  });
  const [count, setCount] = useState(0);

  const changeCoordinates = () => {
    //change position
    setPosition("absolute");

    //change coordinates
    setCoordinates(randomCoordinates());
    setCount(count + 1);
    // console.log(coordinates, count);
  };

  return (
    <button
      className="moving-button"
      style={{
        position: position,
        top: (coordinates.y / 150) * window.innerHeight,
        left: (coordinates.x / 150) * window.innerWidth,
      }}
      onClick={changeCoordinates}
    >
      {label}
    </button>
  );
}

export default MovingButton;
