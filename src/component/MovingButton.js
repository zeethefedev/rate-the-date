import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../style/Form.css";
import { setNoClickedCount } from "../store/questionReducer";

const MAX_CLICK = 10;
const randomCoordinates = (width, height) => {
  const x = (Math.floor(Math.random() * 101) / 150) * height;
  const y = (Math.floor(Math.random() * 101) / 150) * width;
  return { x, y };
};
function MovingButton({ questionIndex, label, disabled }) {
  const dispatch = useDispatch();
  const [position, setPosition] = useState("relative");
  const [display, setDisplay] = useState("block");
  const [coordinates, setCoordinates] = useState({
    x: "auto",
    y: "auto",
  });
  const [count, setCount] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    if (!disabled) {
      if (count !== MAX_CLICK) {
        //change position
        setPosition("absolute");
        //change coordinates
        setCoordinates(
          randomCoordinates(window.innerHeight, window.innerWidth)
        );
        //track number of no clicked
        setCount(count + 1);
        dispatch(
          setNoClickedCount({
            index: questionIndex,
            noClickedCount: count + 1,
          })
        );
      } else {
        setDisplay("none");
      }
    }
  };

  return (
    <button
      className="moving-button"
      style={{
        position: position,
        display: display,
        top: coordinates.x,
        left: coordinates.y,
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default MovingButton;
