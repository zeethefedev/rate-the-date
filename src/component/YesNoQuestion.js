import React, { useState } from "react";
import MovingButton from "./MovingButton";
import { FORM_MODE, INITIAL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { changeAnswers } from "../store/responseReducer";

import "../style/Question.css";

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
  const dispatch = useDispatch();
  const [yesClicked, setYesClicked] = useState(false);

  const handleYesClickedRigged = (event) => {
    event?.preventDefault();
    dispatch(changeAnswers({ index: index, value: "yes" }));
    setYesClicked(true);
  };

  return (
    <div className="field-wrapper">
      <div className="form-wrapper">
        <h3>
          {questionValue}
          {required && <span>*</span>}
          {rigged && <span>#</span>}
        </h3>
        {rigged ? (
          <div className="button-wrapper">
            <button
              className="secondary-button"
              disabled={mode === FORM_MODE.QUESTION}
              onClick={handleYesClickedRigged}
              autoFocus={inputValue === "yes"}
            >
              {yesLabel}
            </button>
            <MovingButton
              buttonStyle="secondary-button"
              questionIndex={index}
              disabled={mode === FORM_MODE.QUESTION}
              label={noLabel}
              autoFocus={inputValue === "no"}
            />
          </div>
        ) : (
          <div className="button-wrapper">
            <button
              className={`secondary-button secondary-button-red ${
                inputValue === "yes" ? "chosen" : ""
              }`}
              disabled={mode === FORM_MODE.QUESTION}
              onClick={handleYesClicked}
              autoFocus={inputValue === "yes"}
            >
              {yesLabel}
            </button>
            <button
              className={`secondary-button secondary-button-red ${
                inputValue === "no" ? "chosen" : ""
              }`}
              disabled={mode === FORM_MODE.QUESTION}
              onClick={handleNoClicked}
              autoFocus={inputValue === "no"}
            >
              {noLabel}
            </button>
          </div>
        )}
        {yesClicked && <div>{yesResponse}</div>}
        {error && (
          <div className="helpertext">
            {errorMessage || INITIAL.ERROR_MESSAGE}
          </div>
        )}
      </div>
      {editInput}
    </div>
  );
}

export default YesNoQuestion;
