export * from "./booking";
export * from "./cart";
export * from "./collection";
export * from "./customer";
export * from "./notification";
export * from "./notification-template";
export * from "./product";
export * from "./schedule";
export * from "./settings";
export * from "./staff";
export * from "./user";
export * from "./widget";

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload?: T;
}

export interface ShopQuery {
  shop: string;
}
