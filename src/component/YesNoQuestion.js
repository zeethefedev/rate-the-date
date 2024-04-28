import React, { useState } from "react";
import MovingButton from "./MovingButton";
import { FORM_MODE, INITIAL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { changeAnswers } from "../store/responseReducer";

import "../style/Question.css";
import { changePreview } from "../store/questionReducer";
import Message from "./ErrorMessage";

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
    yesResponse,
  } = props;
  const dispatch = useDispatch();
  const [yesClicked, setYesClicked] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleYesClickedRigged = (event) => {
    event?.preventDefault();
    if (mode === FORM_MODE.RESPONSE) {
      dispatch(changeAnswers({ index: index, value: "yes" }));
    } else {
      dispatch(changePreview({ index: index, answer: "yes" }));
    }

    //with animation
    setYesClicked(true);
    setAnimation(true);
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
              className={`secondary-button secondary-button-red ${
                inputValue === "yes" ? "chosen" : ""
              }`}
              disabled={mode === FORM_MODE.QUESTION}
              onClick={handleYesClickedRigged}
              autoFocus={inputValue === "yes"}
            >
              {yesLabel || INITIAL.YES_BUTTON}
            </button>
            <MovingButton
              buttonStyle="secondary-button secondary-button-red"
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
        {yesClicked && mode !== FORM_MODE.QUESTION && (
          <div className={animation && "fade-in"}>
            {yesResponse || INITIAL.YES_RESPONSE}
          </div>
        )}
        {error && !yesClicked && (
          <Message mode="error" message={errorMessage} />
        )}
      </div>
      {editInput}
    </div>
  );
}

export default YesNoQuestion;
