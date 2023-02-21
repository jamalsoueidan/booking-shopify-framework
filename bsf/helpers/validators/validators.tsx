import { ErrorContent, validator } from "@shopify/react-form";

export const isEmail =
  (error: string) =>
  (input: string): string | undefined => {
    const filter =
      /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(input)) {
      return error;
    }
    return undefined;
  };

export const isDate =
  (error: string) =>
  (input: Date | undefined): string | undefined => {
    if (new Date(input || "").toString() === "Invalid Date") {
      return error;
    }
    return undefined;
  };

export function isPhoneNumber(error: ErrorContent<string>) {
  return validator(
    (input: string) =>
      input !== "" && (input.match(/^(\+|\d)[\d]{7,16}$/im) || []).length > 0,
  )(error);
}

export function isHourMinuteFormat(error: ErrorContent<string>) {
  return validator(
    (input: string) =>
      input !== "" &&
      (input.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/im) || []).length > 0,
  )(error);
}

export const isSelectedDays =
  (error: string) =>
  (input: string[]): string | undefined => {
    if (input.length <= 0) {
      return error;
    }
    return undefined;
  };

export function notEmptyObject<T>(error: ErrorContent<T>) {
  return validator((input: T) => Object.values(input || {}).some((v) => v), {
    skipOnEmpty: false,
  })(error);
}
