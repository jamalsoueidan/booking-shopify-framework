import mongoose from "mongoose";
import { CustomerSchema, ICustomerDocument, ICustomerModel } from "./customer.schema";

export const CustomerModel = mongoose.model<ICustomerDocument, ICustomerModel>("customer", CustomerSchema, "Customer");
