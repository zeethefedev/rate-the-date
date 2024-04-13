import React from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import { changePreview, changeQuestion } from "../store/questionReducer";
import { changeAnswers } from "../store/responseReducer";

function ButtonGroup({
  showMoveUp,
  showMoveDown,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
}) {
  return (
    <div>
      <button onClick={handleRemoveQuestion}>Remove Question</button>
      {showMoveUp && <button onClick={handleMoveQuestionUp}>Move Up</button>}
      {showMoveDown && (
        <button onClick={handleMoveQuestionDown}>Move Down</button>
      )}
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
    <div>
      <label>
        Enter your question:{" "}
        <input
          type="text"
          value={questionValue}
          placeholder="enter your question"
          onChange={(event) => handleChangeQuestion(event, "value")}
        />
      </label>
      <label>
        <input
          type="checkbox"
          id="required"
          checked={questionRequired}
          onChange={(event) => handleChangeQuestion(event, "required")}
        />
        Required
      </label>
      <label>
        Enter your error message:{" "}
        <input
          type="text"
          value={errorMessage}
          placeholder="enter your error message"
          onChange={(event) => handleChangeQuestion(event, "errorMessage")}
        />
      </label>
      {questionType === "yesno" && (
        <label>
          <input
            type="checkbox"
            id="rigged"
            checked={questionRigged}
            onChange={(event) => handleChangeQuestion(event, "rigged")}
          />
          Rigged
        </label>
      )}
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

  const inputValue =
    mode === FORM_MODE.QUESTION ? preview.answer : answer.response;
  const inputError =
    mode === FORM_MODE.QUESTION
      ? question.type === "rating"
        ? preview.answer === "0/5" && preview.touched
        : !preview.answer && preview.touched
      : answer.error;

  const handleInputChange = (event, ratings) => {
    let newInput = mode === FORM_MODE.QUESTION ? preview : answer;
    if (question.type === "text") {
      newInput = { value: event.target.value, touched: true };
    } else if (question.type === "rating") {
      newInput = { value: ratings, touched: true };
    }
    if (mode === FORM_MODE.QUESTION) {
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
    if (mode === FORM_MODE.QUESTION) {
      dispatch(changePreview({ index: index, answer: "true" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index: index, value: "true" }));
    }
  };

  const handleNoClicked = (event) => {
    event.preventDefault();
    if (mode === FORM_MODE.QUESTION) {
      dispatch(changePreview({ index: index, answer: "false" }));
    } else {
      //response mode
      dispatch(changeAnswers({ index: index, value: "false" }));
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
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={question.required && inputError}
          errorMessage={question.errorMessage}
          placeholder={inputPlaceholder}
        />
      )}
      {question.type === "rating" && (
        <RatingInput
          mode={mode}
          required={question.required}
          questionValue={question.value}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          editInput={editInput}
          error={question.required && inputError}
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
          inputValue={inputValue}
          editInput={editInput}
          handleYesClicked={handleYesClicked}
          handleNoClicked={handleNoClicked}
          error={question.required && inputError}
          errorMessage={question.errorMessage}
        />
      )}
    </div>
  );
}

export default Question;
