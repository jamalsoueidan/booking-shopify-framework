import { Booking } from "@jamalsoueidan/bsb.types";
import { Document, Model, Schema, Types } from "mongoose";

export interface IBooking extends Omit<Booking, "_id" | "staff"> {
  staff: Types.ObjectId;
}

export interface IBookingDocument extends IBooking, Document {}

export interface IBookingModel extends Model<IBookingDocument> {}

export const BookingSchema = new Schema<IBookingDocument, IBookingModel>({
  anyAvailable: {
    default: false,
    type: Boolean,
  },
  customerId: Number,
  end: {
    index: true,
    required: true,
    type: Date,
  },
  fulfillmentStatus: {
    default: null,
    type: String,
  },
  isEdit: {
    default: false,
    type: Boolean,
  },
  isSelfBooked: {
    default: false,
    type: Boolean,
  },
  lineItemId: {
    index: true,
    type: Number,
    unqiue: true,
  },
  lineItemTotal: {
    default: 1,
    type: Number,
  },
  orderId: {
    index: true,
    type: Number,
  },
  productId: Number,
  shop: {
    index: true,
    required: true,
    type: String,
  },
  staff: {
    ref: "Staff",
    required: true,
    type: Schema.Types.ObjectId,
  },
  start: {
    index: true,
    required: true,
    type: Date,
  },
  timeZone: String,
  title: String,
});
