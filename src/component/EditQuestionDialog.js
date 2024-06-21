import React, { useState } from "react";
import "../style/SubComponent.css";
import SVGIcon from "./SVGIcon";
import { QUESTION_FIELDS } from "../utils/constant";
import Dialog from "./Dialog";
import { useDispatch } from "react-redux";
import { changeQuestion } from "../store/questionReducer";

function EditInput(props) {
  const { fieldName, value, checked, disabled, handleChange } = props;
  const matchedField = QUESTION_FIELDS.find(
    (field) => field.name === fieldName
  );
  const { type, label, placeholder, name } = matchedField;

  return (
    <label>
      {type === "text" && label}
      <input
        name={name}
        type={type}
        value={type === "text" && value}
        checked={type === "checkbox" && checked}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {type === "checkbox" && label}
    </label>
  );
}

function EditQuestionDialog(props) {
  const { open, dialogAnimation, question, handleCloseEditDialog } = props;
  const dispatch = useDispatch();
  const [questionState, setQuestionState] = useState(question);
  const { type, value, required, rigged, errorMessage } = questionState;

  const handleChange = (event) => {
    const textFields = [
      "value",
      "errorMessage",
      "placeholder",
      "yesLabel",
      "noLabel",
      "yesResponse",
    ];
    const name = event.target.name;
    const questionData = {
      ...questionState,
      [name]: event.target[textFields.includes(name) ? "value" : "checked"],
    };
    setQuestionState(questionData);
  };

  const handleSaveButtonClick = () => {
    dispatch(changeQuestion(questionState));
  };

  return (
    <Dialog open={open} dialogAnimation={dialogAnimation}>
      <button className="close-button" onClick={handleCloseEditDialog}>
        <SVGIcon icon="close" />
      </button>
      <div className="dialog-overlay-form">
        <div className="dialog-overlay-input">
          <EditInput
            {...props}
            fieldName="value"
            value={value}
            handleChange={handleChange}
          />
          <EditInput
            {...props}
            fieldName="required"
            checked={required}
            handleChange={handleChange}
          />
          <EditInput
            {...props}
            fieldName="rigged"
            checked={rigged}
            disabled={type !== "yesno"}
            handleChange={handleChange}
          />
          <EditInput
            {...props}
            fieldName="errorMessage"
            value={errorMessage}
            disabled={!required}
            handleChange={handleChange}
          />
          {type === "yesno" && (
            <>
              {["yesLabel", "noLabel", "yesResponse"].map((prop) => (
                <EditInput
                  {...props}
                  fieldName={prop}
                  value={questionState[prop]}
                  disabled={prop === "yesResponse" && !rigged}
                  handleChange={handleChange}
                />
              ))}
            </>
          )}
        </div>
        <button
          className="secondary-button secondary-button-red submit-button"
          onClick={handleSaveButtonClick}
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}

export default EditQuestionDialog;
