export const titlize = (string: string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");

export const padTo2Digits = (num: number) => String(num).padStart(2, "0");

export const soryByLabel = (a: Record<string, string>, b: Record<string, string>) => soryByTextKey("label")(a, b);

export const soryByTextKey = (key: string) => (a: Record<string, string>, b: Record<string, string>) => {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
};

export const sortByDate = (a: Record<string, string>, b: Record<string, string>) => sortByDateKey("value")(a, b);

export const sortByDateKey = (key: string) => (a: Record<string, string>, b: Record<string, string>) => {
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
