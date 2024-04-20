import React from "react";
import "../style/SubComponent.css";
import SVGIcon from "./SVGIcon";

function EditQuestionDialog(props) {
  const { open, question, handleChangeQuestion, handleCloseEditDialog } = props;
  return (
    <div>
      {open && (
        <div className="dialog-overlay-wrapper" style={{ top: window.scrollY }}>
          <div className="dialog-overlay">
            <div className="dialog-overlay-content">
              <button className="close-button" onClick={handleCloseEditDialog}>
                <SVGIcon icon="close" />
              </button>
              <div className="dialog-overlay-form">
                <div className="dialog-overlay-input">
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
                        onChange={(event) =>
                          handleChangeQuestion(event, "rigged")
                        }
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
                </div>
                <button
                  className="secondary-button secondary-button-red"
                  onClick={handleCloseEditDialog}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditQuestionDialog;
