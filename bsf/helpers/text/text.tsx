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

export const soryByLabel = (a: SoryByLabelItem, b: SoryByLabelItem) =>
  soryByTextKey("label")(a, b);

export const soryByTextKey =
  (key: string) => (a: SoryByLabelItem, b: SoryByLabelItem) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };

interface SortByDateItem {
  value: string;
}

export const sortByDate = (a: SortByDateItem, b: SortByDateItem) =>
  sortByDateKey("value")(a, b);

export const sortByDateKey = (key: string) => (a: any, b: any) => {
  const dateA = new Date(a[key]);
  const dateB = new Date(b[key]);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
};
