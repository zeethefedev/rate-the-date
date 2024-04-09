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
        <div className="dropdown-content">
          {options.map((option, index) => (
            <button key={index} onClick={() => handleClickOption(option)}>
              {option.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
