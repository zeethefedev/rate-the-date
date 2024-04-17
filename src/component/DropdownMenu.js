import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/questionReducer";
import "../style/Form.css";
function DropdownMenu({ options }) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOption = (option) => {
    dispatch(addQuestion(option.name));
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={handleShowDropdown}>
        Add question
      </button>
      {showDropdown && (
        <ul className="dropdown-content">
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
