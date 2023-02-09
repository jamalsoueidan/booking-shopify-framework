export interface Cart {
  cartId?: string;
  staff: string;
  start: Date;
  end: Date;
  shop: string;
  createdAt: Date;
}
export type CartGetByStaff = Pick<Cart, "start" | "end" | "staff">;
