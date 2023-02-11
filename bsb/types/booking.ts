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

export type BookingDocument = {
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

type BookingAggreate = Omit<BookingDocument, "staff"> & {
  customer: Customer;
  product: Product;
  staff: Staff;
};

export type BookingServiceCreateProps = Pick<
  BookingDocument,
  "customerId" | "end" | "productId" | "staff" | "start"
>;

export type BookingServiceFindProps = ShopQuery["shop"];

export type BookingServiceGetAllReturn = BookingAggreate;
export type BookingServiceGetAllProps = Pick<BookingDocument, "end" | "start"> &
  Partial<Pick<BookingDocument, "staff">>;

export type BookingServiceUpdateQueryProps = Pick<BookingDocument, "_id">;

export type BookingServiceUpdateBodyProps = Pick<
  BookingDocument,
  "start" | "end" | "staff"
>;

export interface BookingServiceUpdateProps {
  query: BookingServiceUpdateQueryProps;
  body: BookingServiceUpdateBodyProps;
}

export type BookingServiceGetByIdReturn = BookingAggreate;
export type BookingServiceGetByIdProps = Pick<BookingDocument, "_id">;
