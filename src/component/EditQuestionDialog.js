import React from "react";
import "../style/SubComponent.css";
import SVGIcon from "./SVGIcon";

function EditQuestionDialog(props) {
  const { open, question, handleChangeQuestion, handleCloseEditDialog } = props;
  return (
    <div>
      {open && (
        <div className="dialog-overlay-wrapper">
          <div className="dialog-overlay">
            <button onClick={handleCloseEditDialog}>
              <SVGIcon icon="close" />
            </button>
            <div>
              <label>
                Enter your question:{" "}
                <input
                  className="input-text"
                  type="text"
                  value={question.value}
                  placeholder="enter your question"
                  onChange={(event) => handleChangeQuestion(event, "value")}
                />
              </label>
              <div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="required"
                    checked={question.required}
                    onChange={(event) =>
                      handleChangeQuestion(event, "required")
                    }
                  />
                  Required
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="rigged"
                    checked={question.rigged}
                    disabled={question.type !== "yesno"}
                    onChange={(event) => handleChangeQuestion(event, "rigged")}
                  />
                  Rigged
                </label>
              </div>
              <label>
                Enter your error message:{" "}
                <input
                  type="text"
                  value={question.errorMessage}
                  placeholder="enter your error message"
                  onChange={(event) =>
                    handleChangeQuestion(event, "errorMessage")
                  }
                />
              </label>
              <button onClick={handleCloseEditDialog}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditQuestionDialog;
