import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/bsb.middlewares.validate";
import { TagKeys } from "@jamalsoueidan/bsb.types.tag";
import { body, checkSchema, query } from "express-validator";
import {
  scheduleCreateOrUpdateApp,
  scheduleGetAllApp,
} from "./schedule.application";
import {
  scheduleCreate,
  scheduleCreateGroup,
  scheduleDestroy,
  scheduleDestroyGroup,
  scheduleGetAll,
  scheduleUpdate,
  scheduleUpdateGroup,
} from "./schedule.controller";
import { groupSchema, scheduleSchema, staffSchema } from "./schedule.schema";

export const scheduleRouteGetAll = {
  method: "get",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      query("start").notEmpty().toDate(),
      query("end").notEmpty().toDate(),
    ),
    handleController(scheduleGetAllApp, scheduleGetAll),
  ],
  route: "/schedules",
};

/*
 * Create
 **************************** */

export const scheduleRouteCreate = {
  method: "post",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      body("start").notEmpty().toDate(),
      body("end").notEmpty().toDate(),
      body("tag").notEmpty().isIn(TagKeys),
    ),
    handleController(scheduleCreateOrUpdateApp, scheduleCreate),
  ],
  route: "/schedules",
};

export const scheduleRouteUpdate = {
  method: "put",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      checkSchema({
        schedule: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
      }),
      body("start").notEmpty().toDate(),
      body("end").notEmpty().toDate(),
    ),
    handleController(scheduleCreateOrUpdateApp, scheduleUpdate),
  ],
  route: "/schedules/:schedule",
};

export const scheduleRouteDestroy = {
  method: "delete",
  middlewares: [
    validate(checkSchema(scheduleSchema), checkSchema(staffSchema)),
    handleController(scheduleCreateOrUpdateApp, scheduleDestroy),
  ],
  route: "/schedules/:schedule",
};

/*
 * Group
 **************************** */

export const scheduleRouteCreateGroup = {
  method: "post",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      body().isArray({ min: 1 }),
      body("*.start").notEmpty().toDate(),
      body("*.end").notEmpty().toDate(),
      body("*.tag").notEmpty().isIn(TagKeys),
    ),
    handleController(scheduleCreateOrUpdateApp, scheduleCreateGroup),
  ],
  route: "/schedules/group",
};

export const scheduleRouteUpdateGroup = {
  method: "put",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      checkSchema(groupSchema),
      body("start").notEmpty().toDate(),
      body("end").notEmpty().toDate(),
    ),
    handleController(scheduleCreateOrUpdateApp, scheduleUpdateGroup),
  ],
  route: "/schedules/group/:groupId",
};

export const scheduleRouteDestroyGroup = {
  method: "delete",
  middlewares: [
    validate(checkSchema(staffSchema), checkSchema(groupSchema)),
    handleController(scheduleCreateOrUpdateApp, scheduleDestroyGroup),
  ],
  route: "/schedules/group/:groupId",
};
