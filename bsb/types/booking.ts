import { ShopQuery } from "@jamalsoueidan/bsb.types";
import { Customer } from "./customer";
import { Product } from "./product";
import { Staff } from "./staff";

export enum BookingFulfillmentStatus {
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FULFILLED = "fulfilled",
  BOOKED = "booked",
}

export type BaseBooking = {
  _id: string;
  productId: number;
  orderId: number;
  lineItemId: number;
  lineItemTotal: number;
  customerId: number;
  staff: string;
  end: Date;
  start: Date;
  shop: string;
  anyAvailable?: boolean;
  fulfillmentStatus: BookingFulfillmentStatus;
  title: string;
  timeZone: string;
  isEdit?: boolean;
  isSelfBooked?: boolean;
};

export type Booking = Omit<BaseBooking, "staff"> & {
  customer: Customer;
  product: Product;
  staff: Staff;
};

export type BookingServiceCreateProps = Pick<
  BaseBooking,
  "customerId" | "end" | "productId" | "staff" | "start"
>;

export type BookingServiceFindProps = ShopQuery["shop"];

export type BookingServiceGetAllReturn = Booking;
export type BookingServiceGetAllProps = Pick<BaseBooking, "end" | "start"> & {
  staff?: string | string[];
};

export type BookingServiceUpdateQueryProps = Pick<BaseBooking, "_id">;

export type BookingServiceUpdateBodyProps = Pick<
  BaseBooking,
  "start" | "end" | "staff"
>;

export interface BookingServiceUpdateProps {
  query: BookingServiceUpdateQueryProps;
  body: BookingServiceUpdateBodyProps;
}

export type BookingServiceGetByIdReturn = Booking;
export type BookingServiceGetByIdProps = Pick<BaseBooking, "_id">;
