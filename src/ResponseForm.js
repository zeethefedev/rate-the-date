import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFormById, updateForm } from "./api/response.thunk";
import Question from "./component/Question";
import { FORM_MODE } from "./utils/constant";
import { getFromStorage } from "./utils/methods";
import { setAnswers, validateAnswers } from "./store/responseReducer";
import Result from "./component/Result";
import LoadingOverlay from "./component/LoadingOverlay";

function ResponseForm() {
  //response/4848
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.RESPONSE);
  const answers = useSelector((state) => state.responseReducer.responses);
  const formLoading = useSelector((state) => state.responseReducer.loading);
  const formSubmitted = useSelector((state) => state.responseReducer.submitted);
  const [formError, setFormError] = useState(true);

  useEffect(() => {
    dispatch(fetchFormById(id))
      .unwrap()
      .then(() => {
        if (savedData && savedData.responses) {
          dispatch(setAnswers(savedData.responses));
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  }, []);

  const checkError = (answer) => {
    const error = !!(answer.required && !answer.response);
    return error;
  };

  useEffect(() => {
    const errors = answers.map((answer) => checkError(answer));
    const allValid = errors.every((err) => err === false);
    setFormError(!allValid);
    console.log(errors);
  }, [answers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(validateAnswers());
    if (!formError) {
      dispatch(updateForm({ id, answers }));
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <Result mode={FORM_MODE.RESPONSE} />
      ) : (
        <div>
          <LoadingOverlay open={formLoading} />
          <h1>Response Form</h1>
          <form>
            {answers && (
              <div>
                {answers.map((question, index) => (
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
            <button disabled={formError} onClick={handleSubmit}>
              Submit Answers
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResponseForm;
