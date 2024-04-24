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
