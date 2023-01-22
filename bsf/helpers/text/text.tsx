export const titlize = (string: string) => {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");
};

export const padTo2Digits = (num: number) => {
  return String(num).padStart(2, "0");
};

interface SoryByLabelItem {
  label: string;
}

export const soryByLabel = (a: SoryByLabelItem, b: SoryByLabelItem) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

interface SortByDateItem {
  value: string;
}

export const sortByDate = function (a: SortByDateItem, b: SortByDateItem) {
  const dateA = new Date(a.value);
  const dateB = new Date(b.value);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
};
