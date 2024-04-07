import React from "react";
import { MENU_OPTIONS } from "./utils/constant";
import { useSelector } from "react-redux";
import DropdownMenu from "./component/DropdownMenu";
import { useDispatch } from "react-redux";
import {
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
} from "./store/questionReducer";
import Question from "./component/Question";

function SetupForm() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.reducer.questions);

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

  return (
    <div>
      <h1>Set Up</h1>
      <form>
        {questions.map((question, index) => (
          <div>
            <Question
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
      </form>
      <DropdownMenu options={MENU_OPTIONS} />
      <button>Add question</button>
    </div>
  );
}

export default SetupForm;
