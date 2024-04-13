import { createSlice } from "@reduxjs/toolkit";
import { fetchFormById, updateForm } from "../api/response.thunk";
import { saveResponsesToStorage } from "./method.reducer";

const initialState = {
  form: "",
  responses: [],
  preview: [],
  loading: false,
  submitted: false,
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
      const newResponses = state.responses.map((response) =>
        response.index === answerData.index
          ? {
              ...response,
              response: answerData.value,
              touched: true,
            }
          : response
      );
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
    setNoClickedCount: (state, action) => {
      const answerData = action.payload;
      const newResponses = state.responses.map((response) =>
        response.index === answerData.index
          ? {
              ...response,
              noClickedCount: answerData.noClickedCount,
            }
          : response
      );
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
    validateAnswers: (state) => {
      const newResponses = state.responses.map((response) => ({
        ...response,
        touched: true,
        error:
          response.require &&
          !response.response &&
          response.touched &&
          !response.rigged,
      }));
      state.responses = newResponses;
      saveResponsesToStorage(state.responses);
    },
  },
  extraReducers: (builder) => {
    builder
      //POST
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.form = action.payload;
        state.responses = state.form.questions.map((question, index) => ({
          ...question,
          index: index,
        }));
        // state.loading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        console.log("updated");
        console.log(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAnswers, changeAnswers, setNoClickedCount, validateAnswers } =
  responseSlice.actions;

export default responseSlice.reducer;
