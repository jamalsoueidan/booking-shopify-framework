import { ShopQuery } from "@jamalsoueidan/backend.types.api";
import { Customer } from "@jamalsoueidan/backend.types.customer";
import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";

export enum BookingFulfillmentStatus {
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FULFILLED = "fulfilled",
  BOOKED = "booked",
  DEFAULT = "default",
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
export type BookingServiceGetByIdProps = Pick<BaseBooking, "_id"> & {
  staff?: string | string[];
};
