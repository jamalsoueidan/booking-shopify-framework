import { CustomerServiceSearch } from "@jamalsoueidan/bsb.services.customer";
import { ControllerProps } from "@jamalsoueidan/bsb.types.api";
import { CustomerServiceSearchProps } from "@jamalsoueidan/bsb.types.customer";

export const customerGetByName = ({
  query,
}: ControllerProps<CustomerServiceSearchProps>) => CustomerServiceSearch(query);
