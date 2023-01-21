export const isEmail = (
  error: string
): ((input: string) => string | undefined) => {
  return (input: string) => {
    const filter =
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(input)) {
      return error;
    }
  };
};

export const isDate = (error: string): ((input: any) => string | undefined) => {
  return (input: string) => {
    if (new Date(input).toString() === "Invalid Date") {
      return error;
    }
  };
};

export const isPhoneNumber = (
  error: string
): ((input: string) => string | undefined) => {
  return (input: string) => {
    const filter = /^(\+|\d)[\d]{7,16}$/im;
    if (!filter.test(input)) {
      return error;
    }
  };
};

export const isSelectedDays = (
  error: string
): ((input: string[]) => string | undefined) => {
  return (input: string[]) => {
    if (input.length <= 0) {
      return error;
    }
  };
};

export const notEmptyObject = (
  error: string
): ((input: any) => string | undefined) => {
  return (input: any) => {
    const foundError = Object.keys(input).some((k) => !input[k]);
    if (foundError) {
      return error;
    }
    return undefined;
  };
};
