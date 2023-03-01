import { handleController } from "@jamalsoueidan/backend.middlewares.handle-controller";
import { customerGetByName } from "./customer.controller";

export const customerRouteGetByName = {
  method: "get",
  middlewares: [handleController(customerGetByName)],
  route: "/customers",
};
