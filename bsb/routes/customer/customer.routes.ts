import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import { customerGetByName } from "./customer.controller";

export const customerRouteGetByName = {
  method: "get",
  middlewares: [handleController(customerGetByName)],
  route: "/customers",
};
