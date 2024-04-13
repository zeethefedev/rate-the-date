import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFormById, updateForm } from "./api/response.thunk";
import Question from "./component/Question";
import { FORM_MODE } from "./utils/constant";
import { getFromStorage } from "./utils/methods";
import { setAnswers, validateAnswers } from "./store/responseReducer";

function ResponseForm() {
  //response/25ab
  const { id } = useParams();
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.RESPONSE);
  const form = useSelector((state) => state.responseReducer.form);
  const answers = useSelector((state) => state.responseReducer.responses);

  useEffect(() => {
    dispatch(fetchFormById(id))
      .unwrap()
      .then(() => {
        if (savedData && savedData.responses) {
          dispatch(setAnswers(savedData.responses));
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(validateAnswers());
    const errors = answers.map((answer) => answer.error);
    const allValid = errors.every((err) => err === false);
    if (allValid) {
      // console.log(answers);
      dispatch(updateForm({ id, answers }));
    }
  };

  return (
    <div>
      <h1>Response Form</h1>
      <form>
        {form?.questions && (
          <div>
            {form.questions.map((question, index) => (
              <div key={index}>
                <Question
                  index={index}
                  mode={FORM_MODE.RESPONSE}
                  question={question}
                />
              </div>
            ))}
          </div>
        )}
        <button onClick={handleSubmit}>Submit Answers</button>
      </form>
    </div>
  );
}

export default ResponseForm;
