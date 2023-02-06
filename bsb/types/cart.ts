export interface Cart {
  cartId?: string;
  staff: string;
  start: Date;
  end: Date;
  shop: string;
  createdAt: Date;
}
export interface CartGetByStaff {
  start: string;
  end: string;
  staff: string;
}
