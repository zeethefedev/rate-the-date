import { createSlice } from "@reduxjs/toolkit";
import { FORM_MODE, SETUP_FORM_INITIAL } from "../utils/constant";
import { fetchForms, postForm } from "../api/question.thunk";
import {
  getNoClickedCount,
  replaceQuestion,
  saveQuestionsToStorage,
} from "./method.reducer";
import { clearStorage } from "../utils/methods";

const initialState = {
  changeFlag: "",
  clickoutFormEditor: false,
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
    setClickoutFormEditor: (state, action) => {
      state.clickoutFormEditor = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.changeFlag = "";
    },
    changeQuestion: (state, action) => {
      const questionData = action.payload;
      const newQuestionProps = {
        value: questionData.value,
        required: questionData.required || questionData.rigged,
        rigged: questionData.rigged,
        errorMessage: questionData.required ? questionData.errorMessage : "",
        // placeholder: questionData.placeholder,
        yesLabel: questionData.yesLabel,
        noLabel: questionData.noLabel,
        yesResponse: questionData.yesResponse,
      };
      const newQuestions = state.questions.map((question) =>
        question.index === questionData.index
          ? { ...question, ...newQuestionProps }
          : question
      );
      state.questions = newQuestions;
      saveQuestionsToStorage(newQuestions);
      state.changeFlag = "";
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
      state.changeFlag = "ADD";
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
      state.changeFlag = "REMOVE";
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
      state.changeFlag = "MOVE_UP";
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
      state.changeFlag = "MOVE_DOWN";
    },
    changePreview: (state, action) => {
      const previewData = action.payload;
      const previewProps = {
        answer: previewData.answer,
        touched: true,
      };
      const newQuestions = state.questions.map((question) =>
        question.index === previewData.index
          ? { ...question, ...previewProps }
          : question
      );
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
      state.changeFlag = "";
    },
    setNoClickedCount: (state, action) => {
      const questionData = action.payload;
      const newQuestions = getNoClickedCount(state.questions, questionData);
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
      state.changeFlag = "";
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
      state.changeFlag = "";
    },
    resetQuestionForm: (state) => {
      // clearStorage(FORM_MODE.QUESTION.toUpperCase());
      state.questions = SETUP_FORM_INITIAL;
      state.loading = false;
      state.submitted = false;
      state.changeFlag = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //GET - test
      .addCase(fetchForms.fulfilled, (action) => {
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

        // clear storage in case user want to create a new form
        clearStorage(FORM_MODE.QUESTION.toUpperCase());
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setClickoutFormEditor,
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
