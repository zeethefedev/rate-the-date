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
