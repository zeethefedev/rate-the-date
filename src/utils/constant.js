export const INITIAL = {
  TEXT_QUESTION: "What's on your mind?",
  RATING_QUESTION: "Rate this date from bad to great",
  YES_NO_QUESTION: "Would you like a kiss?",
  YES_BUTTON: "Yes",
  NO_BUTTON: "No",
};

export const SETUP_FORM_INITIAL = [
  { index: 0, type: "text", value: INITIAL.TEXT_QUESTION },
  { index: 1, type: "rating", value: "rating question" },
  { index: 2, type: "yesno", value: "yes no question" },
];

export const FORM_MODE = {
  QUESTION: "question",
  RESPONSE: "response",
};

export const MENU_OPTIONS = [
  { index: 0, name: "text", displayName: "Add Text Field" },
  { index: 1, name: "rating", displayName: "Add Rating Field" },
  { index: 2, name: "yesno", displayName: "Add Yes No Field" },
];
