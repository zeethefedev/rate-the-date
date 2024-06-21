import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchFormById, updateForm } from "../api/response.thunk";
import { saveResponsesToStorage, getNoClickedCount } from "./method.reducer";
import { clearStorage } from "../utils/methods";
import { FORM_MODE } from "../utils/constant";

const initialState = {
  responses: [],
  loading: false,
  submitted: false,
  errorMessage: "",
};

export const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    setAnswers: (state, action) => {
      state.responses = action.payload;
    },
    changeAnswers: (state, action) => {
      const answerData = action.payload;
      const newResponseProps = {
        response: answerData.value,
        touched: true,
      };
      const newResponses = state.responses.map((response) =>
        response.index === answerData.index
          ? { ...response, ...newResponseProps }
          : response
      );
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
    setNoClickedCount: (state, action) => {
      const answerData = action.payload;
      const newResponses = getNoClickedCount(state.responses, answerData);
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
    validateAnswers: (state) => {
      const newResponses = state.responses.map((response) => ({
        ...response,
        touched: true,
      }));
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
    resetResponseForm: (state) => {
      state.loading = false;
      state.submitted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.responses = action.payload.questions.map((question, index) => ({
          ...question,
          index,
        }));
        state.loading = false;
        saveResponsesToStorage(state.responses);
      })
      //PATCH
      .addCase(updateForm.fulfilled, (state) => {
        state.loading = false;
        state.submitted = true;

        // clear storage in case user want to create a new form
        clearStorage(FORM_MODE.QUESTION.toUpperCase());
      })
      .addMatcher(
        isAnyOf(fetchFormById.pending, updateForm.pending),
        (state) => {
          state.loading = true;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const {
  setAnswers,
  changeAnswers,
  setNoClickedCount,
  validateAnswers,
  resetResponseForm,
} = responseSlice.actions;

export default responseSlice.reducer;
