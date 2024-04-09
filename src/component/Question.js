import React from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import { changeQuestion } from "../store/questionReducer";

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
  question,
  mode = FORM_MODE.QUESTION,
  handleRemoveQuestion,
  handleMoveQuestionUp,
  handleMoveQuestionDown,
}) {
  const dispatch = useDispatch();
  const questionsLength = useSelector(
    (state) => state.reducer.questions
  ).length;

  const handleChangeQuestion = (event, mode) => {
    const questionData = {
      ...question,
      [mode]: event.target[mode === "value" ? "value" : "checked"],
    };
    dispatch(changeQuestion(questionData));
  };

  const handleYesClicked = (event) => {
    event.preventDefault();
  };

  const handleNoClicked = (event) => {
    event.preventDefault();
  };

  const editInput = mode === FORM_MODE.QUESTION && (
    <EditQuestionComponent
      questionValue={question.value}
      questionRequired={question.required}
      questionType={question.type}
      questionRigged={question.rigged}
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
          editInput={editInput}
        />
      )}
      {question.type === "rating" && (
        <RatingInput
          mode={mode}
          required={question.required}
          questionValue={question.value}
          editInput={editInput}
        />
      )}
      {question.type === "yesno" && (
        <YesNoQuestion
          mode={mode}
          required={question.required}
          rigged={question.rigged}
          questionValue={question.value}
          editInput={editInput}
          handleYesClicked={handleYesClicked}
          handleNoClicked={handleNoClicked}
        />
      )}
    </div>
  );
}

export default Question;
