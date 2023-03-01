export interface NotificationTemplate {
  _id: string;
  name: string;
  message: string;
  senderName: string;
  shop: string;
  language: string;
}

export interface NotificationTemplateBodyUpdate
  extends Partial<Omit<NotificationTemplate, "_id" | "shop">> {}
