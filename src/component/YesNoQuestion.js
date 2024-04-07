import React, { useState } from "react";
import MovingButton from "./MovingButton";
import "../style/Form.css";
import { INITIAL } from "../utils/constant";

function YesNoQuestion({
  questionValue = INITIAL.YES_NO_QUESTION,
  yesLabel = INITIAL.YES_BUTTON,
  noLabel = INITIAL.NO_BUTTON,
  yesResponse = "Come Closer",
  index,
  editInput,
}) {
  const [yesClicked, setYesClicked] = useState(false);

  const handleYesClicked = () => {
    setYesClicked(true);
  };
  return (
    <div key={index} className="form-wrapper field-wrapper">
      {editInput}
      <h1>{questionValue}</h1>
      <div className="button-wrapper">
        <button onClick={handleYesClicked}>{yesLabel}</button>
        <MovingButton label={noLabel} />
      </div>
      {yesClicked && <div>{yesResponse}</div>}
    </div>
  );
}

export default YesNoQuestion;
