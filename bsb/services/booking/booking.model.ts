import mongoose, { Model, model } from "mongoose";
import { BookingSchema, IBookingDocument, IBookingModel } from "./booking.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const BookingModel: Model<IBookingDocument, {}, {}, {}, IBookingModel> =
  mongoose.models.booking || model<IBookingDocument, IBookingModel>("booking", BookingSchema, "Booking");
