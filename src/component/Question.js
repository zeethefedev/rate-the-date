import React from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import { changePreview, changeQuestion } from "../store/questionReducer";
import { changeAnswers } from "../store/responseReducer";

import SVGIcon from "./SVGIcon";
import "../style/Question.css";

function ButtonGroup({
  showMoveUp,
  showMoveDown,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
}) {
  return (
    <div>
      <button onClick={handleRemoveQuestion}>
        <SVGIcon icon="delete" />
      </button>
      <button onClick={handleMoveQuestionUp} disabled={!showMoveUp}>
        <SVGIcon icon="up" />
      </button>
      <button onClick={handleMoveQuestionDown} disabled={!showMoveDown}>
        <SVGIcon icon="down" />
      </button>
    </div>
  );
}

function EditQuestionComponent(props) {
  const {
    questionValue,
    questionRequired,
    questionType,
    questionRigged,
    handleChangeQuestion,
    errorMessage,
  } = props;
  return (
    <div className="edit-question-wrapper">
      <label>
        Enter your question:{" "}
        <input
          className="input-text"
          type="text"
          value={questionValue}
          placeholder="enter your question"
          onChange={(event) => handleChangeQuestion(event, "value")}
        />
      </label>
      <div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="required"
            checked={questionRequired}
            onChange={(event) => handleChangeQuestion(event, "required")}
          />
          Required
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="rigged"
            checked={questionRigged}
            disabled={questionType !== "yesno"}
            onChange={(event) => handleChangeQuestion(event, "rigged")}
          />
          Rigged
        </label>
      </div>
      <label>
        Enter your error message:{" "}
        <input
          type="text"
          value={errorMessage}
          placeholder="enter your error message"
          onChange={(event) => handleChangeQuestion(event, "errorMessage")}
        />
      </label>
      <ButtonGroup {...props} />
    </div>
  );
}

function Question({
  index,
  question,
  mode = FORM_MODE.QUESTION,
  inputPlaceholder,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
}) {
  const dispatch = useDispatch();
  const questionsLength = useSelector(
    (state) => state.questionReducer.questions
  ).length;

  const preview = useSelector(
    (state) => state.questionReducer.questions[index].preview
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
      if (question.type === "rating") {
        return preview.answer === "0/5" && preview.touched;
      } else {
        return !preview.answer && preview.touched;
      }
    } else {
      return !answer.response && answer.touched;
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
    const questionData = {
      ...question,
      [mode]:
        event.target[
          mode === "value" || mode === "errorMessage" ? "value" : "checked"
        ],
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

  const editInput = mode === FORM_MODE.QUESTION && (
    <EditQuestionComponent
      questionValue={question.value}
      questionRequired={question.required}
      questionType={question.type}
      questionRigged={question.rigged}
      errorMessage={question.errorMessage}
      handleChangeQuestion={handleChangeQuestion}
      showMoveUp={question.index > 0}
      showMoveDown={question.index < questionsLength - 1}
      handleRemoveQuestion={handleRemoveQuestion}
      handleMoveQuestionUp={handleMoveQuestionUp}
      handleMoveQuestionDown={handleMoveQuestionDown}
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
          error={question.required && inputError()}
          errorMessage={question.errorMessage}
          placeholder={inputPlaceholder}
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
          error={question.required && inputError()}
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
          error={question.required && inputError()}
          errorMessage={question.errorMessage}
        />
      )}
    </div>
  );
}

export default Question;
