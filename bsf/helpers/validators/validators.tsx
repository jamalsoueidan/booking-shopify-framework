export const isEmail =
  (error: string): ((input: string) => string | undefined) =>
  (input: string) => {
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(input)) {
      return error;
    }
    return undefined;
  };

export const isDate =
  (error: string): ((input: string) => string | undefined) =>
  (input: string) => {
    if (new Date(input).toString() === "Invalid Date") {
      return error;
    }
    return undefined;
  };

export const isPhoneNumber =
  (error: string): ((input: string) => string | undefined) =>
  (input: string) => {
    const filter = /^(\+|\d)[\d]{7,16}$/im;
    if (!filter.test(input)) {
      return error;
    }
    return undefined;
  };

export const isSelectedDays =
  (error: string): ((input: string[]) => string | undefined) =>
  (input: string[]) => {
    if (input.length <= 0) {
      return error;
    }
    return undefined;
  };

export const notEmptyObject =
  (error: string): ((input: Record<string, string>) => string | undefined) =>
  (input: Record<string, string>) => {
    const foundError = Object.keys(input).some((k) => !input[k]);
    if (foundError) {
      return error;
    }
    return undefined;
  };
