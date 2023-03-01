export interface Customer {
  _id: string;
  customerId: number;
  firstName: string;
  lastName: string;
  fullname: string;
  email: string;
  phone: string;
  shop: string;
}

export interface CustomerQuery
  extends Pick<Customer, "customerId" | "firstName" | "lastName"> {}

export type CustomerServiceFindAndUpdateProps = {
  customerGraphqlApiId: string;
  customerId: number;
};

export type CustomerServiceSearchProps = {
  name: string;
};
