export const ANIMATION_DELAY = 100;

export const BREAKPOINT = {
  MOBILE: 600,
  SMALL: 769,
  MEDIUM: 992,
  LARGE: 1200,
};

export const INITIAL = {
  TEXT_QUESTION: "What's on your mind?",
  RATING_QUESTION: "Rate this date from bad to great",
  YES_NO_QUESTION: "Would you like a kiss?",
  YES_BUTTON: "Yes",
  NO_BUTTON: "No",
  ERROR_MESSAGE: "Please enter a valid answer",
  SUCCESS_MESSAGE: "Success",
  INFO_MESSAGE: "",
  YES_RESPONSE: "Come Closer",
};

export const SETUP_FORM_INITIAL = [
  {
    index: 0,
    type: "text",
    value: INITIAL.TEXT_QUESTION,
    required: false,
    rigged: false,
    preview: { answer: "", touched: false },
  },
  {
    index: 1,
    type: "rating",
    value: "rating question",
    required: false,
    rigged: false,
    preview: { answer: "", touched: false },
  },
  {
    index: 2,
    type: "yesno",
    value: "yes no question",
    required: false,
    rigged: false,
    yesLabel: INITIAL.YES_BUTTON,
    noLabel: INITIAL.NO_BUTTON,
    preview: { answer: "", touched: false },
  },
];

export const FORM_MODE = {
  QUESTION: "question",
  RESPONSE: "response",
  PREVIEW: "preview",
};

export const MENU_OPTIONS = [
  { index: 0, name: "text", displayName: "Add Text Field" },
  { index: 1, name: "rating", displayName: "Add Rating Field" },
  { index: 2, name: "yesno", displayName: "Add Yes No Field" },
];

export const QUESTION_FIELDS = [
  {
    name: "value",
    type: "text",
    label: "Enter your question:",
    placeholder: "enter your question",
  },
  {
    name: "required",
    type: "checkbox",
    label: "Required",
  },
  {
    name: "rigged",
    type: "checkbox",
    label: "Rigged",
  },
  {
    name: "errorMessage",
    type: "text",
    label: "Enter your error message:",
    placeholder: "eg: Please enter a valid answer",
  },
  {
    name: "yesLabel",
    type: "text",
    label: "Enter your yes label:",
  },
  {
    name: "noLabel",
    type: "text",
    label: "Enter your no label:",
  },
  {
    name: "yesResponse",
    type: "text",
    label: "Enter your yes messsage (rigged)",
  },
];
