import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../store/questionReducer";
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
    <div class="dropdown">
      <button class="dropbtn" onClick={handleShowDropdown}>
        Dropdown
      </button>
      {showDropdown && (
        <div class="dropdown-content">
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
