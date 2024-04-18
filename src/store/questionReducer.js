import { createSlice } from "@reduxjs/toolkit";
import { SETUP_FORM_INITIAL } from "../utils/constant";
import { fetchForms, postForm } from "../api/question.thunk";
import {
  getNoClickedCount,
  replaceQuestion,
  saveQuestionsToStorage,
} from "./method.reducer";

const initialState = {
  questions: SETUP_FORM_INITIAL,
  preview: [],
  loading: false,
  submitted: false,
  responseFormLink: "",
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    changeQuestion: (state, action) => {
      const questionData = action.payload;
      const newQuestions = state.questions.map((question) =>
        question.index === questionData.index
          ? {
              ...question,
              value: questionData.value,
              required: questionData.required,
              rigged: questionData.rigged,
              errorMessage: questionData.errorMessage,
            }
          : question
      );
      state.questions = newQuestions;
      saveQuestionsToStorage(newQuestions);
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
      saveQuestionsToStorage(state.questions);
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
      saveQuestionsToStorage(state.questions);
    },
    moveQuestionUp: (state, action) => {
      const currentQuestion = state.questions.find(
        (question) => question.index === action.payload
      );
      const aboveQuestion = state.questions.find(
        (question) => question.index === action.payload - 1
      );

      const newQuestionsReplace = replaceQuestion(
        replaceQuestion(state.questions, action.payload, aboveQuestion),
        action.payload - 1,
        currentQuestion
      );

      state.questions = newQuestionsReplace;
      saveQuestionsToStorage(state.questions);
    },
    moveQuestionDown: (state, action) => {
      const currentQuestion = state.questions.find(
        (question) => question.index === action.payload
      );
      const belowQuestion = state.questions.find(
        (question) => question.index === action.payload + 1
      );

      const newQuestionsReplace = replaceQuestion(
        replaceQuestion(state.questions, action.payload, belowQuestion),
        action.payload + 1,
        currentQuestion
      );

      state.questions = newQuestionsReplace;
      saveQuestionsToStorage(state.questions);
    },
    changePreview: (state, action) => {
      const previewData = action.payload;
      const newQuestions = state.questions.map((question) =>
        question.index === previewData.index
          ? {
              ...question,
              preview: {
                answer: previewData.answer,
                touched: true,
              },
            }
          : question
      );
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
    },
    setNoClickedCount: (state, action) => {
      const questionData = action.payload;
      const newQuestions = getNoClickedCount(state.questions, questionData);
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
    },
    validatePreview: (state) => {
      //set touched = true
      const newQuestions = state.questions.map((question) => ({
        ...question,
        preview: {
          ...question.preview,
          touched: true,
        },
      }));
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
    },
    resetQuestionForm: (state) => {
      state.loading = false;
      state.submitted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET - test
      .addCase(fetchForms.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      //POST
      .addCase(postForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(postForm.fulfilled, (state, action) => {
        console.log(action.payload);
        const formId = action.payload._id;
        state.responseFormLink = `/response/${formId}`;
        state.loading = false;
        state.submitted = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuestions,
  changeQuestion,
  addQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown,
  changePreview,
  setNoClickedCount,
  validatePreview,
  resetQuestionForm,
} = questionSlice.actions;

export default questionSlice.reducer;
