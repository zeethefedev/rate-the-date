import { createSlice } from "@reduxjs/toolkit";
import { fetchFormById, updateForm } from "../api/response.thunk";
import { saveResponsesToStorage, getNoClickedCount } from "./method.reducer";

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
      .addCase(fetchFormById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.responses = action.payload.questions.map((question, index) => ({
          ...question,
          index: index,
        }));
        state.loading = false;
      })
      .addCase(fetchFormById.rejected, (state) => {
        console.log("failed");
      })
      //PATCH
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = true;
        console.log("updated", action.payload);
      });
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
