import mongoose from "mongoose";
import { IScheduleDocument, IScheduleModel, ScheduleSchema } from "./schedule.schema";

export const ScheduleModel = mongoose.model<IScheduleDocument, IScheduleModel>("schedule", ScheduleSchema, "Schedule");
