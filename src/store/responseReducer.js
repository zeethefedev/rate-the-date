import { createSlice } from "@reduxjs/toolkit";
import { fetchFormById } from "../api/response.thunk";
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAnswers, changeAnswers, setNoClickedCount } =
  responseSlice.actions;

export default responseSlice.reducer;
