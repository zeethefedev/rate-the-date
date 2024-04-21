import { FORM_MODE } from "./constant";

export function sortArrayOfObjectsByIndex(array, index) {
  return array.sort((a, b) => (a[index] > b[index] ? 1 : -1));
}

export function replaceItem(array, index, newItem) {
  if (index < 0 || index >= array.length) {
    return "Index out of bounds";
  }

  array[index] = newItem;
  return array;
}

export const getFromStorage = (mode = FORM_MODE.QUESTION) => {
  const item = window.sessionStorage.getItem(mode.toUpperCase());
  if (item) {
    return JSON.parse(item);
  }
};

export const saveToStorage = (key, value, mode = FORM_MODE.QUESTION) => {
  const form = window.sessionStorage.getItem(mode.toUpperCase());
  let newForm;
  if (form) {
    newForm = {
      ...JSON.parse(form),
      [key]: value,
    };
  } else {
    newForm = { [key]: value };
  }
  window.sessionStorage.setItem(mode.toUpperCase(), JSON.stringify(newForm));
};

export const saveFirstLoadToStorage = (value) => {
  window.sessionStorage.setItem("FIRSTLOADED", value);
};

export const getFirstLoadFromStorage = () => {
  const item = window.sessionStorage.getItem("FIRSTLOADED");
  return item;
};

export const clearStorage = (key) => {
  if (key) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
};
