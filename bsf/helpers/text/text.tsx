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
