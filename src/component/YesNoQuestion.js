import React, { useState } from "react";
import MovingButton from "./MovingButton";
import "../style/Form.css";
import { FORM_MODE, INITIAL } from "../utils/constant";

function YesNoQuestion(props) {
  const {
    questionValue = INITIAL.YES_NO_QUESTION,
    inputValue,
    required,
    index,
    editInput,
    mode,
    rigged,
    handleYesClicked,
    handleNoClicked,
    error,
    errorMessage,
    yesLabel = INITIAL.YES_BUTTON,
    noLabel = INITIAL.NO_BUTTON,
    yesResponse = "Come Closer",
  } = props;
  const [yesClicked, setYesClicked] = useState(false);

  const handleYesClickedRigged = (event) => {
    event?.preventDefault();
    setYesClicked(true);
  };

  return (
    <div className="form-wrapper field-wrapper">
      {editInput}
      <h1>
        {questionValue}
        {required && <span>*</span>}
        {rigged && <span>#</span>}
      </h1>
      {rigged ? (
        <div className="button-wrapper">
          <button
            disabled={mode === FORM_MODE.QUESTION}
            onClick={handleYesClickedRigged}
          >
            {yesLabel}
          </button>
          <MovingButton
            inputValue
            questionIndex={index}
            disabled={mode === FORM_MODE.QUESTION}
            label={noLabel}
          />
        </div>
      ) : (
        <div className="button-wrapper">
          <button
            disabled={mode === FORM_MODE.QUESTION}
            onClick={handleYesClicked}
          >
            {yesLabel}
          </button>
          <button
            disabled={mode === FORM_MODE.QUESTION}
            onClick={handleNoClicked}
          >
            {noLabel}
          </button>
        </div>
      )}
      {yesClicked && <div>{yesResponse}</div>}
      {error && mode === FORM_MODE.RESPONSE && (
        <div>{errorMessage || INITIAL.ERROR_MESSAGE}</div>
      )}
    </div>
  );
}

export default YesNoQuestion;
