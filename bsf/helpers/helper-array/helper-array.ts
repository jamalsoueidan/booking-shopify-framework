export const soryTextBy =
  <T extends string>(key: T) =>
  <K extends Record<T, string>>(a: K, b: K) => {
    if (a && b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
    }
    return 0;
  };

export const sortDateBy =
  <T extends string>(key: T) =>
  <K extends Record<T, string>>(a: K, b: K) => {
    if (a && b) {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
    }
    return 0;
  };
