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

export const getFromStorage = () => {
  const item = window.sessionStorage.getItem("FORM");
  if (item) {
    return JSON.parse(item);
  }
};

export const saveToStorage = (key, value) => {
  const form = window.sessionStorage.getItem("FORM");
  let newForm;
  if (form) {
    newForm = {
      ...JSON.parse(form),
      [key]: value,
    };
  } else {
    newForm = { [key]: value };
  }
  window.sessionStorage.setItem("FORM", JSON.stringify(newForm));
};
