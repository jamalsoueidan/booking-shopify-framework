import { CustomValidator, validationResult } from "express-validator";
import { ValidatorsSchema } from "express-validator/src/middlewares/schema";
import { isValidObjectId } from "mongoose";

export const validate = (...args) => [
  ...args,
  (req, res, next) => {
    const validate = validationResult(req);
    if (validate.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({
      error: validate.mapped(),
      success: false,
    });
  },
];

export const isValidObject: ValidatorsSchema["custom"] = {
  errorMessage: "not valid objectId",
  options: (value: CustomValidator) => isValidObjectId(value),
};
