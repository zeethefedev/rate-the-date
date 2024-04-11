import { saveToStorage } from "../utils/methods";

export const saveToQuestionsToStorage = (questionData) => {
  saveToStorage("questions", questionData);
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
