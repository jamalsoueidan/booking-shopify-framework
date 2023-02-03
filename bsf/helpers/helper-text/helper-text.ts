export const titlize = (string: string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");

export const padTo2Digits = (num: number) => String(num).padStart(2, "0");
