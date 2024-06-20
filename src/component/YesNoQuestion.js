import React, { useState } from "react";
import MovingButton from "./MovingButton";
import { FORM_MODE, INITIAL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { changeAnswers } from "../store/responseReducer";

import "../style/Question.css";
import { changePreview } from "../store/questionReducer";
import Message from "./Message";

function YesNoQuestion(props) {
  const {
    inputValue,
    editInput,
    mode,
    handleYesClicked,
    handleNoClicked,
    error,
    data,
  } = props;

  const {
    index,
    value,
    required,
    rigged,
    errorMessage,
    yesLabel,
    noLabel,
    yesResponse,
  } = data;

  const dispatch = useDispatch();
  const [yesClicked, setYesClicked] = useState(false);
  const [animation, setAnimation] = useState(true);
  const isResponseForm = mode === FORM_MODE.RESPONSE;
  const isSetupForm = mode === FORM_MODE.QUESTION;

  const handleYesClickedRigged = (event) => {
    event?.preventDefault();
    const newInput = { index, value: "yes" };
    if (isResponseForm) {
      dispatch(changeAnswers(newInput));
    } else {
      dispatch(changePreview(newInput));
    }

    //with animation
    setYesClicked(true);
    setAnimation(true);
  };

  return (
    <div className="field-wrapper">
      <div className="form-wrapper">
        <h3 className="input-label">
          {value}
          {required && <span>*</span>}
          {rigged && !isResponseForm && <span>#</span>}
        </h3>
        {rigged ? (
          <div className="button-wrapper">
            <button
              className={`secondary-button secondary-button-red ${
                inputValue === "yes" ? "chosen" : ""
              }`}
              disabled={isSetupForm}
              onClick={handleYesClickedRigged}
              autoFocus={inputValue === "yes"}
            >
              {yesLabel || INITIAL.YES_BUTTON}
            </button>
            <MovingButton
              buttonStyle="secondary-button secondary-button-red"
              questionIndex={index}
              disabled={isSetupForm}
              label={noLabel || INITIAL.NO_BUTTON}
              autoFocus={inputValue === "no"}
            />
          </div>
        ) : (
          <div className="button-wrapper">
            {["yes", "no"].map((value) => (
              <button
                className={`secondary-button secondary-button-red ${
                  inputValue === value ? "chosen" : ""
                }`}
                disabled={isSetupForm}
                onClick={value === "yes" ? handleYesClicked : handleNoClicked}
                autoFocus={inputValue === value}
              >
                {(value === "yes" ? yesLabel : noLabel) ||
                  INITIAL[`${value.toUpperCase()}_BUTTON`]}
              </button>
            ))}
          </div>
        )}
        {yesClicked && !isSetupForm && (
          <div className={animation && "fade-in"}>
            <Message
              mode="info"
              message={yesResponse || INITIAL.YES_RESPONSE}
            />
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
