import { createSlice } from "@reduxjs/toolkit";
import { FORM_MODE, SETUP_FORM_INITIAL } from "../utils/constant";
import { fetchForms, postForm } from "../api/question.thunk";
import { getNoClickedCount, saveQuestionsToStorage } from "./method.reducer";
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
      const questionToRemove = action.payload;
      const newQuestions = state.questions.filter(
        (question) => question.index !== questionToRemove.index
      );

      const newQuestionIndex = newQuestions.map((question, index) => ({
        ...question,
        index: index,
      }));

      state.questions = newQuestionIndex;
      saveQuestionsToStorage(state.questions);
      state.changeFlag = "REMOVE";
    },
    reorderQuestions: (state, action) => {
      state.changeFlag = "REORDER";
      const newQuestions = action.payload.map((question, index) => ({
        ...question,
        index,
      }));
      state.questions = newQuestions;
      saveQuestionsToStorage(state.questions);
    },
    changePreview: (state, action) => {
      const previewData = action.payload;
      const previewProps = {
        value: previewData.value,
        touched: true,
      };
      const newQuestions = state.questions.map((question) =>
        question.index === previewData.index
          ? { ...question, preview: previewProps }
          : question
      );
      state.questions = newQuestions;
      console.log(newQuestions);
      console.log(action.payload);
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
  reorderQuestions,
  changePreview,
  setNoClickedCount,
  validatePreview,
  resetQuestionForm,
} = questionSlice.actions;

export default questionSlice.reducer;
