import React, { useEffect, useRef, useState } from "react";
import {
  ANIMATION_DELAY,
  BREAKPOINT,
  FORM_MODE,
  MENU_OPTIONS,
} from "./utils/constant";
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
  setClickoutFormEditor,
} from "./store/questionReducer";
import Question from "./component/Question";
import Result from "./component/Result";
import { postForm } from "./api/question.thunk";
import { getFromStorage } from "./utils/methods";
import LoadingOverlay from "./component/LoadingOverlay";
import Dialog from "./component/Dialog";

import "./style/Form.css";
import "./style/Question.css";
import SVGIcon from "./component/SVGIcon";

function FormEditor(props) {
  const { isMobile, checkedViewMode, handleChangeViewMode, handlePostForm } =
    props;
  //responsive break point
  const dispatch = useDispatch();
  const clickout = useSelector(
    (state) => state.questionReducer.clickoutFormEditor
  );
  const [showMenu, setShowMenu] = useState(!isMobile);
  const [animation, setAnimation] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAnimation, setDialogAnimation] = useState(false);
  const body = document.getElementsByTagName("body");

  useEffect(() => {
    setShowMenu(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && clickout) {
      handleToggleWithAnimation(!clickout);
    }
  }, [clickout]);

  const handleToggleWithAnimation = (showCondition) => {
    if (showCondition) {
      setAnimation(true);
      setShowMenu(true);
    } else {
      setAnimation(false);
      setTimeout(() => {
        setShowMenu(false);
      }, ANIMATION_DELAY);
    }
  };

  const handleToggleMenu = () => {
    // animation has to be triggered after mounting and before unmounting
    handleToggleWithAnimation(!showMenu);
    dispatch(setClickoutFormEditor(false));
  };

  const handleOpenDialog = () => {
    if (body) {
      body[0].style.overflow = "hidden";
    }
    setOpenDialog(true);
    setDialogAnimation(true);
  };

  const handleCloseDialog = () => {
    if (body) {
      body[0].style.overflow = "visible";
    }
    setDialogAnimation(false);
    setTimeout(() => {
      setOpenDialog(false);
    }, ANIMATION_DELAY);
  };

  return (
    <div
      className={`form-editor ${
        isMobile && (animation ? "slide-up" : "slide-down")
      }`}
    >
      <div className="container form-editor-container hide-scrollbar">
        {isMobile && (
          <button className="tetriary-button" onClick={handleToggleMenu}>
            {showMenu ? <SVGIcon icon="down" /> : <SVGIcon icon="up" />}
          </button>
        )}
        {showMenu && (
          <div className={`form-content-wrapper`}>
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
          </div>
        )}
      </div>
      <Dialog
        open={openDialog}
        dialogAnimation={dialogAnimation}
        handleYesClicked={handlePostForm}
        handleNoClicked={handleCloseDialog}
      />
    </div>
  );
}

function SetupForm() {
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.QUESTION);
  const dimensions = useSelector((state) => state.questionReducer.dimensions);
  const isMobile = dimensions.width < BREAKPOINT.SMALL;
  const questions = useSelector((state) => state.questionReducer.questions);
  const [questionFadeOut, setQuestionFadeOut] = useState();
  const changeFlag = useSelector((state) => state.questionReducer.changeFlag);
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

  useEffect(() => {
    if (viewMode === FORM_MODE.PREVIEW)
      setFormMessage("This will not send any data");
  }, [viewMode]);

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
      setQuestionFadeOut(index);
      setTimeout(() => {
        dispatch(removeQuestion(index));
        setQuestionFadeOut(); // have to reset
      }, ANIMATION_DELAY);
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

  useEffect(() => {
    if (changeFlag === "ADD") {
      const newQuestionElement = document.getElementById(
        `question-${questions.length - 1}`
      );
      if (newQuestionElement) {
        newQuestionElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [questions.length]);

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
              isMobile={isMobile}
              checkedViewMode={viewMode === FORM_MODE.PREVIEW}
              handleChangeViewMode={handleChangeViewMode}
              handlePostForm={handlePostForm}
            />
            <div
              className="container question-editor hide-scrollbar"
              onClick={() => {
                dispatch(setClickoutFormEditor(true));
              }}
            >
              <form className={`question-form-wrapper ${viewMode}-form`}>
                <div className="setup-form-question">
                  {questions.map((question, index) => (
                    <div
                      id={`question-${index}`}
                      key={index}
                      className={
                        index !== questionFadeOut ? "fade-in" : "fade-out"
                      }
                    >
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
