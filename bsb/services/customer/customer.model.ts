import mongoose, { Model } from "mongoose";
import { CustomerSchema, ICustomerDocument, ICustomerModel } from "./customer.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const CustomerModel: Model<ICustomerDocument, {}, {}, {}, ICustomerModel> =
  mongoose.models.customer || mongoose.model<ICustomerDocument, ICustomerModel>("customer", CustomerSchema, "Customer");
