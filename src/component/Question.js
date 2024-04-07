import React from "react";
import TextInput from "./TextInput";
import YesNoQuestion from "./YesNoQuestion";
import RatingInput from "./RatingInput";
import { useSelector, useDispatch } from "react-redux";
import { FORM_MODE } from "../utils/constant";
import { changeQuestion } from "../store/questionReducer";

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

  //shared component
  const buttonGroup = (
    <div>
      <button onClick={handleRemoveQuestion}>Remove Question</button>
      {question.index > 0 && (
        <button onClick={handleMoveQuestionUp}>Move Up</button>
      )}
      {question.index < questionsLength - 1 && (
        <button onClick={handleMoveQuestionDown}>Move Down</button>
      )}
    </div>
  );

  const handleChangeQuestion = (event) => {
    const questionData = {
      index: question.index,
      value: event.target.value,
    };
    dispatch(changeQuestion(questionData));
  };

  const editInput = mode === FORM_MODE.QUESTION && (
    <div>
      <label>
        Enter your question
        <input
          type="text"
          value={question.value}
          placeholder="enter your question"
          onChange={handleChangeQuestion}
        />
      </label>
      {buttonGroup}
    </div>
  );

  return (
    <div>
      {question.type === "text" && (
        <TextInput
          index={question.index}
          questionValue={question.value}
          editInput={editInput}
        />
      )}
      {question.type === "rating" && (
        <RatingInput
          index={question.index}
          questionValue={question.value}
          editInput={editInput}
        />
      )}
      {question.type === "yesno" && (
        <YesNoQuestion
          index={question.index}
          questionValue={question.value}
          editInput={editInput}
        />
      )}
    </div>
  );
}

export default Question;
