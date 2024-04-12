import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFormById } from "./api/response.thunk";
import Question from "./component/Question";
import { FORM_MODE } from "./utils/constant";
import { getFromStorage } from "./utils/methods";
import { setAnswers } from "./store/responseReducer";

function ResponseForm() {
  //response/25ab
  const { id } = useParams();
  const dispatch = useDispatch();
  const savedData = getFromStorage(FORM_MODE.RESPONSE);
  const form = useSelector((state) => state.responseReducer.form);

  useEffect(() => {
    dispatch(fetchFormById(id))
      .unwrap()
      .then(() => {
        if (savedData && savedData.responses) {
          dispatch(setAnswers(savedData.responses));
        }
      });
  }, []);

  return (
    <div>
      <h1>Response Form</h1>
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
    </div>
  );
}

export default ResponseForm;
