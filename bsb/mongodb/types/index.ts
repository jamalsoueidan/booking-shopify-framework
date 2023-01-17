export * from "./booking";
export * from "./cart";
export * from "./collection";
export * from "./customer";
export * from "./notification-template";
export * from "./notification";
export * from "./product";
export * from "./schedule";
export * from "./settings";
export * from "./staff";
export * from "./widget";
export * from "./user";

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload?: T;
}
