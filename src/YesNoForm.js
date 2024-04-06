import React, { useState } from "react";
import MovingButton from "./component/MovingButton";
import "./style/Form.css";
import { INITIAL } from "./utils/constant";

function YesNoForm({
  question = INITIAL.YES_NO_QUESTION,
  yesLabel = INITIAL.YES_BUTTON,
  noLabel = INITIAL.NO_BUTTON,
}) {
  const [yesClicked, setYesClicked] = useState(false);
  const handleYesClicked = () => {
    setYesClicked(true);
  };
  return (
    <div className="form-wrapper">
      <h1>{question}</h1>
      <div className="button-wrapper">
        <button onClick={handleYesClicked}>{yesLabel}</button>
        <MovingButton label={noLabel} />
      </div>
      {yesClicked && <div>Come Closer</div>}
    </div>
  );
}

export default YesNoForm;
