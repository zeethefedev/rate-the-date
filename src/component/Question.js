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

function ButtonGroup({ handleRemoveQuestion, handleOpenEditDialog }) {
  const functions = [
    { icon: "delete", onClick: handleRemoveQuestion },
    { icon: "edit", onClick: handleOpenEditDialog },
  ];
  return (
    <div className="edit-button-group">
      {functions.map((func) => (
        <button
          className="secondary-button"
          onClick={func.onClick}
          disabled={func.disabled}
        >
          <SVGIcon icon={func.icon} />
        </button>
      ))}
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
    dimensions,
  } = props;

  const isMobile = dimensions.width < BREAKPOINT.SMALL;
  const clickout = useSelector(
    (state) => state.questionReducer.clickoutFormEditor
  );
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
  }, [handleRemoveQuestion]);

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
  question,
  mode = FORM_MODE.QUESTION,
  handleRemoveQuestion,
}) {
  const { index, type, required, preview } = question;

  const dispatch = useDispatch();

  const answer = question;

  const dimensions = useSelector((state) => state.responsiveReducer.dimensions);
  const isMobile = dimensions.width < BREAKPOINT.SMALL;

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
      return required;
    } else {
      return required && inputError();
    }
  };

  const handleInputChange = (event, ratings) => {
    let newInput =
      mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW
        ? preview
        : answer;
    if (type === "text") {
      newInput = { value: event.target.value, touched: true };
    } else if (type === "rating") {
      newInput = { value: ratings, touched: true };
    }

    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      dispatch(changePreview({ index, answer: newInput.value }));
    } else {
      //response mode
      dispatch(changeAnswers({ index, value: newInput.value }));
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
      dispatch(changePreview({ index, answer: "yes" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index, value: "yes" }));
    }
  };

  const handleNoClicked = (event) => {
    event.preventDefault();
    if (mode === FORM_MODE.QUESTION || mode === FORM_MODE.PREVIEW) {
      dispatch(changePreview({ index, answer: "no" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index, value: "no" }));
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
      handleRemoveQuestion={handleRemoveQuestion}
      handleOpenEditDialog={handleOpenEditDialog}
      handleCloseEditDialog={handleCloseEditDialog}
      dimensions={dimensions}
    />
  );

  return (
    <div>
      {type === "text" && (
        <TextInput
          mode={mode}
          inputValue={inputValue()}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError()}
          question={question}
        />
      )}
      {type === "rating" && (
        <RatingInput
          mode={mode}
          inputValue={inputValue()}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError()}
          isMobile={isMobile}
          question={question}
        />
      )}
      {type === "yesno" && (
        <YesNoQuestion
          mode={mode}
          inputValue={inputValue()}
          editInput={editInput}
          handleYesClicked={handleYesClicked}
          handleNoClicked={handleNoClicked}
          error={showError()}
          question={question}
        />
      )}
    </div>
  );
}

export default Question;
