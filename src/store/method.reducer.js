import { FORM_MODE } from "../utils/constant";
import { saveToStorage } from "../utils/methods";

export const saveQuestionsToStorage = (questionData) => {
  saveToStorage("questions", questionData, FORM_MODE.QUESTION);
};

export const saveResponsesToStorage = (responseData) => {
  saveToStorage("responses", responseData, FORM_MODE.RESPONSE);
};

export const getFormData = (rawData) => {
  const formattedData = {
    questions: rawData.map((question) => ({
      type: question.type,
      value: question.value,
      required: question.required,
      rigged: question.rigged,
      errorMessage: question.errorMessage,
    })),
  };
  return formattedData;
};
