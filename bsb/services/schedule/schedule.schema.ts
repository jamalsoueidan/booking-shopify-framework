import { Schedule } from "@jamalsoueidan/bsb.types.schedule";
import { Tag, TagKeys } from "@jamalsoueidan/bsb.types.tag";
import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ISchedule extends Omit<Schedule, "_id" | "staff"> {
  staff: Types.ObjectId;
}

export interface IScheduleDocument extends ISchedule, Document {}

export interface IScheduleModel extends Model<IScheduleDocument> {}

export const ScheduleSchema = new mongoose.Schema<
  IScheduleDocument,
  IScheduleModel
>({
  end: {
    index: true,
    required: true,
    type: Date,
  },
  groupId: String,
  shop: {
    index: true,
    required: true,
    type: String,
  },
  staff: { index: true, ref: "Staff", type: Schema.Types.ObjectId },
  start: {
    index: true,
    required: true,
    type: Date,
  },
  tag: {
    default: Tag.weekday,
    enum: TagKeys,
    index: true,
    required: true,
    type: String,
  },
});
