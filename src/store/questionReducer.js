import { createSlice } from "@reduxjs/toolkit";
import { SETUP_FORM_INITIAL } from "../utils/constant";

const initialState = {
  value: 0,
  questions: SETUP_FORM_INITIAL,
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    changeQuestion: (state, action) => {
      const questionData = action.payload;
      const newQuestions = state.questions.map((question) =>
        question.index === questionData.index
          ? {
              ...question,
              value: questionData.value,
            }
          : question
      );
      state.questions = newQuestions;
    },
    addQuestion: (state, action) => {
      const newQuestion = {
        ...SETUP_FORM_INITIAL.find(
          (question) => question.type === action.payload
        ),
        index: state.questions.length,
      };
      const newQuestions = [...state.questions, newQuestion];
      state.questions = newQuestions;
      console.log(state.questions);
    },
    removeQuestion: (state, action) => {
      const newQuestions = state.questions.filter(
        (question) => question.index !== action.payload
      );

      const newQuestionIndex = newQuestions.map((question, index) => ({
        ...question,
        index: index,
      }));

      state.questions = newQuestionIndex;
      console.log(state.questions);
    },
    moveQuestionUp: (state, action) => {
      const currentQuestion = state.questions.find(
        (question) => question.index === action.payload
      );
      const aboveQuestion = state.questions.find(
        (question) => question.index === action.payload - 1
      );

      const newQuestionsReplace = state.questions
        .map((question) =>
          question.index === action.payload
            ? {
                ...aboveQuestion,
                index: question.index,
              }
            : question
        )
        .map((question) =>
          question.index === action.payload - 1
            ? {
                ...currentQuestion,
                index: question.index,
              }
            : question
        );

      state.questions = newQuestionsReplace;
    },
    moveQuestionDown: (state, action) => {
      const currentQuestion = state.questions.find(
        (question) => question.index === action.payload
      );
      const belowQuestion = state.questions.find(
        (question) => question.index === action.payload + 1
      );

      const newQuestionsReplace = state.questions
        .map((question) =>
          question.index === action.payload
            ? {
                ...belowQuestion,
                index: question.index,
              }
            : question
        )
        .map((question) =>
          question.index === action.payload + 1
            ? {
                ...currentQuestion,
                index: question.index,
              }
            : question
        );

      state.questions = newQuestionsReplace;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeQuestion,
  addQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown,
} = questionSlice.actions;

export default questionSlice.reducer;
