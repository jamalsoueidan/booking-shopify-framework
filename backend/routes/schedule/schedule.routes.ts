import { handleController } from "@jamalsoueidan/backend.middlewares.handle-controller";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/backend.middlewares.validate";
import { TagKeys } from "@jamalsoueidan/backend.types.tag";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
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
  scheduleGetGroup,
  scheduleUpdate,
  scheduleUpdateGroup,
} from "./schedule.controller";
import { groupSchema, scheduleSchema, staffSchema } from "./schedule.schema";

const now = new Date();
const weekDays: string[] = [];
const start = startOfWeek(now);
const end = endOfWeek(now);
eachDayOfInterval({ end, start }).forEach((day) => {
  weekDays.push(format(day, "EEEE").toLowerCase());
});

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

export const scheduleRouteGetGroup = {
  method: "get",
  middlewares: [
    validate(checkSchema(staffSchema), checkSchema(groupSchema)),
    handleController(scheduleGetGroup),
  ],
  route: "/schedules/group/:groupId",
};

export const scheduleRouteCreateGroup = {
  method: "post",
  middlewares: [
    validate(
      checkSchema(staffSchema),
      body("days").isArray({ min: 1 }),
      body("days.*").notEmpty().isIn(weekDays),
      body("start").notEmpty().toDate(),
      body("end").notEmpty().toDate(),
      body("tag").notEmpty().isIn(TagKeys),
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
      body("days").isArray({ min: 1 }),
      body("days.*").notEmpty().isIn(weekDays),
      body("start").notEmpty().toDate(),
      body("end").notEmpty().toDate(),
      body("tag").notEmpty().isIn(TagKeys),
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
