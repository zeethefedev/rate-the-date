import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import { ANIMATION_DELAY, BREAKPOINT, FORM_MODE } from "../utils/constant";
import { changePreview, changeQuestion } from "../store/questionReducer";
import { changeAnswers } from "../store/responseReducer";
import SVGIcon from "./SVGIcon";
import EditQuestionDialog from "./EditQuestionDialog";

import "../style/Question.css";

function ButtonGroup({
  showMoveUp,
  showMoveDown,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
  handleOpenEditDialog,
}) {
  return (
    <div className="edit-button-group">
      <button className="secondary-button" onClick={handleRemoveQuestion}>
        <SVGIcon icon="delete" />
      </button>
      <button
        className="secondary-button"
        onClick={handleMoveQuestionUp}
        disabled={!showMoveUp}
      >
        <SVGIcon icon="up" />
      </button>
      <button
        className="secondary-button"
        onClick={handleMoveQuestionDown}
        disabled={!showMoveDown}
      >
        <SVGIcon icon="down" />
      </button>
      <button className="secondary-button" onClick={handleOpenEditDialog}>
        <SVGIcon icon="edit" />
      </button>
    </div>
  );
}

function EditQuestionComponent(props) {
  const {
    openDialog,
    dialogAnimation,
    question,
    handleChangeQuestion,
    handleCloseEditDialog,
    handleRemoveQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
  } = props;

  const dimensions = useSelector((state) => state.questionReducer.dimensions);
  const clickout = useSelector(
    (state) => state.questionReducer.clickoutFormEditor
  );
  const isMobile = dimensions.width < BREAKPOINT.SMALL;
  const [showButtonGroup, setShowButtonGroup] = useState(!isMobile);

  const handleToggleButtonGroup = (event) => {
    event.preventDefault();
    if (isMobile) {
      if (clickout) {
        setShowButtonGroup(!showButtonGroup);
      }
    } else {
      setShowButtonGroup(!showButtonGroup);
    }
  };

  useEffect(() => {
    setShowButtonGroup(dimensions.width > BREAKPOINT.MEDIUM);
  }, [dimensions.width, openDialog]);

  useEffect(() => {
    if (showButtonGroup && isMobile) {
      setShowButtonGroup(false);
    }
  }, [handleRemoveQuestion, handleMoveQuestionUp, handleMoveQuestionDown]);

  return (
    <div className="edit-question-wrapper">
      <EditQuestionDialog
        open={openDialog}
        dialogAnimation={dialogAnimation}
        question={question}
        handleChangeQuestion={handleChangeQuestion}
        handleCloseEditDialog={handleCloseEditDialog}
      />
      <div className="edit-menu-group">
        <button
          className="secondary-button edit-menu-button"
          onClick={handleToggleButtonGroup}
        >
          <SVGIcon icon="menu" />
        </button>
        {showButtonGroup && (
          <div className="edit-button-group-wrapper">
            <ButtonGroup {...props} />
          </div>
        )}
      </div>
    </div>
  );
}

function Question({
  index,
  question,
  mode = FORM_MODE.QUESTION,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
}) {
  const dispatch = useDispatch();
  const questionsLength = useSelector(
    (state) => state.questionReducer?.questions
  ).length;

  const preview = useSelector(
    (state) => state.questionReducer?.questions[index]?.preview
  );

  const answer = useSelector((state) => state.responseReducer.responses[index]);

  const inputValue = () => {
    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      return preview.answer;
    } else {
      return answer.response;
    }
  };

  const inputError = () => {
    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      return !preview.answer && preview.touched;
    } else {
      return !answer.response && answer.touched;
    }
  };

  const showError = () => {
    if (mode === FORM_MODE.QUESTION) {
      return question.required;
    } else {
      return question.required && inputError();
    }
  };

  const handleInputChange = (event, ratings) => {
    let newInput =
      mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW
        ? preview
        : answer;
    if (question.type === "text") {
      newInput = { value: event.target.value, touched: true };
    } else if (question.type === "rating") {
      newInput = { value: ratings, touched: true };
    }

    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      dispatch(changePreview({ index: index, answer: newInput.value }));
    } else {
      //response mode
      dispatch(changeAnswers({ index: index, value: newInput.value }));
    }
  };

  const handleChangeQuestion = (event, mode) => {
    const textFields = [
      "value",
      "errorMessage",
      "placeholder",
      "yesLabel",
      "noLabel",
      "yesResponse",
    ];
    const questionData = {
      ...question,
      [mode]: event.target[textFields.includes(mode) ? "value" : "checked"],
    };
    dispatch(changeQuestion(questionData));
  };

  const handleYesClicked = (event) => {
    event.preventDefault();
    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      dispatch(changePreview({ index: index, answer: "yes" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index: index, value: "yes" }));
    }
  };

  const handleNoClicked = (event) => {
    event.preventDefault();
    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      dispatch(changePreview({ index: index, answer: "no" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index: index, value: "no" }));
    }
  };

  const body = document.getElementsByTagName("body");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAnimation, setDialogAnimation] = useState(false);
  const handleOpenEditDialog = (event) => {
    event.preventDefault();
    if (body) {
      body[0].style.overflow = "hidden";
    }
    setOpenDialog(true);
    setDialogAnimation(true);
  };

  const handleCloseEditDialog = (event) => {
    event.preventDefault();
    if (body) {
      body[0].style.overflow = "visible";
    }
    setDialogAnimation(false);
    setTimeout(() => {
      setOpenDialog(false);
    }, ANIMATION_DELAY);
  };

  const editInput = mode === FORM_MODE.QUESTION && (
    <EditQuestionComponent
      question={question}
      openDialog={openDialog}
      dialogAnimation={dialogAnimation}
      handleChangeQuestion={handleChangeQuestion}
      showMoveUp={question.index > 0}
      showMoveDown={question.index < questionsLength - 1}
      handleRemoveQuestion={handleRemoveQuestion}
      handleMoveQuestionUp={handleMoveQuestionUp}
      handleMoveQuestionDown={handleMoveQuestionDown}
      handleOpenEditDialog={handleOpenEditDialog}
      handleCloseEditDialog={handleCloseEditDialog}
    />
  );

  return (
    <div>
      {question.type === "text" && (
        <TextInput
          mode={mode}
          required={question.required}
          questionValue={question.value}
          inputValue={inputValue()}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError()}
          errorMessage={question.errorMessage}
          placeholder={question.placeholder}
        />
      )}
      {question.type === "rating" && (
        <RatingInput
          mode={mode}
          required={question.required}
          questionValue={question.value}
          inputValue={inputValue()}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError()}
          errorMessage={question.errorMessage}
        />
      )}
      {question.type === "yesno" && (
        <YesNoQuestion
          index={index}
          mode={mode}
          required={question.required}
          rigged={question.rigged}
          questionValue={question.value}
          inputValue={inputValue()}
          editInput={editInput}
          handleYesClicked={handleYesClicked}
          handleNoClicked={handleNoClicked}
          error={showError()}
          errorMessage={question.errorMessage}
          yesLabel={question.yesLabel}
          noLabel={question.noLabel}
          yesResponse={question.yesResponse}
        />
      )}
    </div>
  );
}

export default Question;
