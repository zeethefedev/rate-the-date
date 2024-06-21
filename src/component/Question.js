import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import {
  ANIMATION_DELAY,
  BREAKPOINT,
  FORM_MODE as FORM,
} from "../utils/constant";
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

function Question({ data, mode = FORM.QUESTION, handleRemoveQuestion }) {
  const isSetupForm = [FORM.QUESTION, FORM.PREVIEW].includes(mode);
  const { index, type, required, preview, response } = data;
  const { value, touched } = isSetupForm ? preview : data;

  const dispatch = useDispatch();
  const dimensions = useSelector((state) => state.responsiveReducer.dimensions);
  const isMobile = dimensions.width < BREAKPOINT.SMALL;

  const inputValue = isSetupForm ? value : response;
  const inputError = !inputValue && touched;
  const showError = required && (mode === FORM.QUESTION || !!inputError);

  const handleInputChange = (event, ratings) => {
    let newValue = isSetupForm ? preview : value;
    if (type === "text") {
      newValue = event.target.value;
    } else if (type === "rating") {
      newValue = ratings;
    }
    handleChangeResponse({ index, value: newValue });
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
      ...data,
      [mode]: event.target[textFields.includes(mode) ? "value" : "checked"],
    };
    dispatch(changeQuestion(questionData));
  };

  const handleYesClicked = (event) => {
    event.preventDefault();
    handleChangeResponse({ index, value: "yes" });
  };

  const handleNoClicked = (event) => {
    event.preventDefault();
    handleChangeResponse({ index, value: "no" });
  };

  const handleChangeResponse = (newInput) => {
    if (isSetupForm) {
      dispatch(changePreview(newInput));
    } else {
      //response mode
      dispatch(changeAnswers(newInput));
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAnimation, setDialogAnimation] = useState(false);
  const handleOpenEditDialog = (event) => {
    event.preventDefault();
    setOpenDialog(true);
    setDialogAnimation(true);
  };

  const handleCloseEditDialog = (event) => {
    event.preventDefault();
    setDialogAnimation(false);
    setTimeout(() => {
      setOpenDialog(false);
    }, ANIMATION_DELAY);
  };

  const editInput = mode === FORM.QUESTION && (
    <EditQuestionComponent
      question={data}
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
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError}
          data={data}
        />
      )}
      {type === "rating" && (
        <RatingInput
          mode={mode}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={showError}
          isMobile={isMobile}
          data={data}
        />
      )}
      {type === "yesno" && (
        <YesNoQuestion
          mode={mode}
          inputValue={inputValue}
          editInput={editInput}
          handleYesClicked={handleYesClicked}
          handleNoClicked={handleNoClicked}
          error={showError}
          data={data}
        />
      )}
    </div>
  );
}

export default Question;
