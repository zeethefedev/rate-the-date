import React, { useEffect, useState } from "react";
import { FORM_MODE, MENU_OPTIONS } from "./utils/constant";
import { useSelector } from "react-redux";
import DropdownMenu from "./component/DropdownMenu";
import { useDispatch } from "react-redux";
import {
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
  setQuestions,
  validatePreview,
  setDimensions,
} from "./store/questionReducer";
import Question from "./component/Question";
import Result from "./component/Result";
import { postForm } from "./api/question.thunk";
import { getFromStorage } from "./utils/methods";
import LoadingOverlay from "./component/LoadingOverlay";

import "./style/Form.css";
import "./style/Question.css";
import Dialog from "./component/Dialog";

function FormEditor({ checkedViewMode, handleChangeViewMode, handlePostForm }) {
  const dimensions = useSelector((state) => state.questionReducer.dimensions);
  const [showMenu, setShowMenu] = useState(dimensions.width > 600);
  const [openDialog, setOpenDialog] = useState(false);
  const body = document.getElementsByTagName("body");

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOpenDialog = () => {
    if (body) {
      body[0].style.overflow = "hidden";
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (body) {
      body[0].style.overflow = "visible";
    }
    setOpenDialog(false);
  };
  return (
    <div className="form-editor">
      <div className="container">
        <button onClick={handleToggleMenu}>{showMenu ? "Hide" : "Show"}</button>
        {showMenu && (
          <div className="form-editor-content">
            <DropdownMenu options={MENU_OPTIONS} />
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="required"
                checked={checkedViewMode}
                onChange={handleChangeViewMode}
              />
              View as User
            </label>
            <button className="primary-button-red" onClick={handleOpenDialog}>
              Submit Form
            </button>
          </div>
        )}
      </div>
      <Dialog
        open={openDialog}
        handleYesClicked={handlePostForm}
        handleNoClicked={handleCloseDialog}
      />
    </div>
  );
}

function SetupForm() {
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.QUESTION);
  const questions = useSelector((state) => state.questionReducer.questions);
  const formLoading = useSelector((state) => state.questionReducer.loading);
  const formSubmitted = useSelector((state) => state.questionReducer.submitted);
  const responseFormLink = useSelector(
    (state) => state.questionReducer.responseFormLink
  );
  const [viewMode, setViewMode] = useState(FORM_MODE.QUESTION);
  const [formMessage, setFormMessage] = useState("This will not send any data");

  const handleResize = () => {
    dispatch(setDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);

    if (savedData && savedData.questions) {
      dispatch(setQuestions(savedData.questions));
    }
  }, []);

  const handleChangeViewMode = () => {
    if (viewMode === FORM_MODE.QUESTION) {
      setViewMode(FORM_MODE.PREVIEW);
    } else {
      setViewMode(FORM_MODE.QUESTION);
    }
  };

  const handleRemoveQuestion = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(removeQuestion(index));
    }
  };

  const handleMoveQuestionUp = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(moveQuestionUp(index));
    }
  };

  const handleMoveQuestionDown = (event, index) => {
    event.preventDefault();
    if (index !== null && index !== undefined) {
      dispatch(moveQuestionDown(index));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(validatePreview());

    const errors = questions.map((question) => checkError(question));
    const allValid = errors.every((err) => err === false);
    if (allValid) {
      setFormMessage("Form submitted");
    } else {
      setFormMessage("Form has error, check again");
    }
  };

  const handlePostForm = () => {
    dispatch(postForm(questions));
  };

  const checkError = (question) => {
    const error = !!(question.required && !question.preview.answer);
    return error;
  };

  return (
    <div>
      {formSubmitted ? (
        <Result formLink={responseFormLink} />
      ) : (
        <div className="setup-form-page" id="scroll-wrapper">
          <LoadingOverlay open={formLoading} />
          <h1>Set Up</h1>
          <div className="setup-form-wrapper">
            <FormEditor
              checkedViewMode={viewMode === FORM_MODE.PREVIEW}
              handleChangeViewMode={handleChangeViewMode}
              handlePostForm={handlePostForm}
            />
            <div className="container question-editor">
              <form className={`question-form-wrapper ${viewMode}-form`}>
                <div className="setup-form-question">
                  {questions.map((question, index) => (
                    <div key={index}>
                      <Question
                        index={index}
                        mode={viewMode}
                        question={question}
                        handleRemoveQuestion={(event) =>
                          handleRemoveQuestion(event, index)
                        }
                        handleMoveQuestionUp={(event) =>
                          handleMoveQuestionUp(event, index)
                        }
                        handleMoveQuestionDown={(event) =>
                          handleMoveQuestionDown(event, index)
                        }
                      />
                    </div>
                  ))}
                </div>
                {viewMode === FORM_MODE.PREVIEW && (
                  <div className="button-with-helpertext">
                    <button onClick={handleSubmit}>Submit Answers</button>
                    <div className="helpertext">{formMessage}</div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetupForm;
