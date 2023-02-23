import { isValidObject } from "@jamalsoueidan/bsb.middlewares.validate";
import { Schema } from "express-validator";

export const staffSchema: Schema = {
  staff: {
    custom: isValidObject,
    in: ["query"],
    notEmpty: true,
  },
};

export const scheduleSchema: Schema = {
  schedule: {
    custom: isValidObject,
    in: ["params"],
    notEmpty: true,
  },
};

export const groupSchema: Schema = {
  groupId: {
    in: ["params"],
    notEmpty: true,
  },
};
