export interface Notification {
  _id: string;
  orderId: number;
  lineItemId: number;
  message: string;
  receiver: string;
  scheduled: Date;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  isStaff: boolean;
  batchId: string;
  template: string;
  shop: string;
}

export interface NotificationQuery {
  orderId: number;
  lineItemId: number;
}

export interface NotificationBody {
  to: "customer" | "staff";
  message: string;
}
