import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/questionReducer";
import SVGIcon from "./SVGIcon";

import "../style/Form.css";
import { ANIMATION_DELAY } from "../utils/constant";

function DropdownMenu({ options }) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleShowDropdown = () => {
    if (!showDropdown) {
      setShowDropdown(true);
      setAnimation(true);
    } else {
      setAnimation(false);
      setTimeout(() => {
        setShowDropdown(false);
      }, ANIMATION_DELAY);
    }
  };

  const handleClickOption = (option) => {
    dispatch(addQuestion(option.name));
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleShowDropdown}>
        Add question
        {showDropdown ? <SVGIcon icon="up" /> : <SVGIcon icon="down" />}
      </button>
      {showDropdown && (
        <ul
          className={`dropdown-content ${animation ? "fade-in" : "fade-out"}`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="clickable"
              onClick={() => handleClickOption(option)}
            >
              {option.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
