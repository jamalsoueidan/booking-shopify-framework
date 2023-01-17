import { Staff } from "./staff";
import { Customer } from "./customer";
import { Product } from "./product";

export enum BookingFulfillmentStatus {
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FULFILLED = "fulfilled",
  BOOKED = "booked",
}

export interface Booking {
  _id: string;
  productId: number;
  orderId: number;
  lineItemId: number;
  lineItemTotal: number;
  customerId: number;
  staff: string;
  start: Date;
  end: Date;
  shop: string;
  anyAvailable?: boolean;
  fulfillmentStatus: BookingFulfillmentStatus;
  title: string;
  timeZone: string;
  isEdit?: boolean;
  isSelfBooked?: boolean;
}

export interface BookingAggreate
  extends Omit<Booking, "staff" | "start" | "end"> {
  customer: Customer;
  product: Product;
  staff: Staff;
  start: string;
  end: string;
}

export interface BookingBodyUpdate extends Pick<Booking, "staff"> {
  start: string;
  end: string;
}

export interface BookingBodyCreate
  extends Pick<Booking, "productId" | "customerId" | "staff"> {
  start: string;
  end: string;
}

export interface BookingQuery
  extends Pick<Booking, "start" | "end">,
    Partial<Pick<Booking, "staff">> {}
