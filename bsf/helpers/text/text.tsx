/* eslint-disable @typescript-eslint/no-explicit-any */
export const titlize = (string: string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");

export const padTo2Digits = (num: number) => String(num).padStart(2, "0");

export const soryByLabel = (a: any, b: any) => soryByTextKey("label")(a, b);

export const soryByTextKey = (key: string) => (a: any, b: any) => {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
};

export const sortByDate = (a: any, b: any) => sortByDateKey("value")(a, b);

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
