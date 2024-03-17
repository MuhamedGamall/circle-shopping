import { model, models, Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    personal_email: { type: String, required: true },
    store_id: { type: String, required: true },
    product_id: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Notification =
  models?.Notification || model<any>("Notification", NotificationSchema);
