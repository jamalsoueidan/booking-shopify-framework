import { CustomerServiceSearch } from "@jamalsoueidan/backend.services.customer";
import { ControllerProps } from "@jamalsoueidan/backend.types.api";
import { CustomerServiceSearchProps } from "@jamalsoueidan/backend.types.customer";

export const customerGetByName = ({
  query,
}: ControllerProps<CustomerServiceSearchProps>) => CustomerServiceSearch(query);
