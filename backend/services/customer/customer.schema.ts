import { Customer } from "@jamalsoueidan/backend.types.customer";
import mongoose, { Document, Model } from "mongoose";

export interface ICustomer extends Omit<Customer, "_id"> {}

export interface ICustomerDocument extends ICustomer, Document {}

export interface ICustomerModel extends Model<ICustomerDocument> {}

export const CustomerSchema = new mongoose.Schema<
  ICustomerDocument,
  ICustomerModel
>({
  customerId: { index: true, required: true, type: Number },
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  shop: { index: true, type: String },
});

CustomerSchema.virtual("fullname").get(function test() {
  return `${this.firstName} ${this.lastName}`;
});

CustomerSchema.index(
  {
    customerId: 1,
    shop: 1,
  },
  {
    unique: true,
  },
);
