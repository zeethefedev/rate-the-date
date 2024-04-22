import React, { useState } from "react";
import MovingButton from "./MovingButton";
import { FORM_MODE, INITIAL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { changeAnswers } from "../store/responseReducer";

import "../style/Question.css";
import { changePreview } from "../store/questionReducer";
import SVGIcon from "./SVGIcon";

function YesNoQuestion(props) {
  const {
    questionValue,
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
    yesLabel,
    noLabel,
    yesResponse = "Come Closer",
  } = props;
  const dispatch = useDispatch();
  const [yesClicked, setYesClicked] = useState(false);

  const handleYesClickedRigged = (event) => {
    event?.preventDefault();
    if (mode === FORM_MODE.RESPONSE) {
      dispatch(changeAnswers({ index: index, value: "yes" }));
    } else {
      dispatch(changePreview({ index: index, answer: "yes" }));
    }
    setYesClicked(true);
  };

  return (
    <div className="field-wrapper">
      <div className="form-wrapper">
        <h3 className="input-label">
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
              {yesLabel || INITIAL.YES_BUTTON}
            </button>
            <MovingButton
              buttonStyle="secondary-button"
              questionIndex={index}
              disabled={mode === FORM_MODE.QUESTION}
              label={noLabel || INITIAL.NO_BUTTON}
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
              {yesLabel || INITIAL.YES_BUTTON}
            </button>
            <button
              className={`secondary-button secondary-button-red ${
                inputValue === "no" ? "chosen" : ""
              }`}
              disabled={mode === FORM_MODE.QUESTION}
              onClick={handleNoClicked}
              autoFocus={inputValue === "no"}
            >
              {noLabel || INITIAL.NO_BUTTON}
            </button>
          </div>
        )}
        {yesClicked && mode !== FORM_MODE.QUESTION && <div>{yesResponse}</div>}
        {error && !yesClicked && (
          <div className="error-text error-message-wrapper">
            <SVGIcon icon="error" height="1em" width="1em" />
            {errorMessage || INITIAL.ERROR_MESSAGE}
          </div>
        )}
      </div>
      {editInput}
    </div>
  );
}

export default YesNoQuestion;
