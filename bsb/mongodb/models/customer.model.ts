import mongoose, { Document } from "mongoose";
import { Customer } from "@jamalsoueidan/bsb.mongodb.types";

export interface ICustomerModel extends Omit<Customer, "_id">, Document {}

export const CustomerSchema = new mongoose.Schema({
  customerId: { type: Number, required: true, index: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  shop: { type: String, index: true },
});

CustomerSchema.virtual("fullname").get(function () {
  return `${this.firstName  } ${  this.lastName}`;
});

CustomerSchema.index(
  {
    customerId: 1,
    shop: 1,
  },
  {
    unique: true,
  }
);

export const CustomerModel = mongoose.model<ICustomerModel>(
  "customer",
  CustomerSchema,
  "Customer"
);
