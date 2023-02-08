import mongoose, { Model } from "mongoose";
import { IScheduleDocument, IScheduleModel, ScheduleSchema } from "./schedule.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const ScheduleModel: Model<IScheduleDocument, {}, {}, {}, IScheduleModel> =
  mongoose.models.schedule || mongoose.model<IScheduleDocument, IScheduleModel>("schedule", ScheduleSchema, "Schedule");
