import { ShopQuery } from "@jamalsoueidan/bsb.types";
import { z } from "zod";
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
  start: string;
  end: string;
  shop: string;
  anyAvailable?: boolean;
  fulfillmentStatus: BookingFulfillmentStatus;
  title: string;
  timeZone: string;
  isEdit?: boolean;
  isSelfBooked?: boolean;
};

export type Booking = Omit<BookingDocument, "staff"> & {
  customer: Customer;
  product: Product;
  staff: Staff;
};

export const BookingServiceCreateSchema = z.object({
  customerId: z.number(),
  end: z.coerce.date(),
  productId: z.number(),
  staff: z.string(),
  start: z.coerce.date(),
});

export type BookingServiceCreateProps = z.infer<
  typeof BookingServiceCreateSchema
>;

export type BookingServiceFindProps = ShopQuery["shop"];

export const BookingServiceGetAllSchema = z.object({
  end: z.coerce.date(),
  staff: z.string().optional(),
  start: z.coerce.date(),
});

export type BookingServiceGetAllProps = z.infer<
  typeof BookingServiceGetAllSchema
>;

export const BookingServiceUpdateQuerySchema = z.object({
  _id: z.string(),
});

export const BookingServiceUpdateBodySchema = z.object({
  end: z.coerce.date(),
  staff: z.string(),
  start: z.coerce.date(),
});

export interface BookingServiceUpdateProps {
  query: z.infer<typeof BookingServiceUpdateQuerySchema>;
  body: z.infer<typeof BookingServiceUpdateBodySchema>;
}

export const BookingServiceGetByIdSchema = z.object({
  _id: z.string(),
});

export type BookingServiceGetByIdProps = z.infer<
  typeof BookingServiceGetByIdSchema
>;
