import { model } from "mongoose";
import { BookingSchema, IBookingDocument, IBookingModel } from "./booking.schema";

export const BookingModel = model<IBookingDocument, IBookingModel>("booking", BookingSchema, "Booking");
