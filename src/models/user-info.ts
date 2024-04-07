import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    ban: {
      is_banned: { type: Boolean, default: false },
      reason: { type: String },
    },
    phone: { type: String },
    email: { type: String, required: true },
    street_address: { type: String },
    postal_code: { type: String },
    city: { type: String },
    country: { type: String },
    total_products_sold: { type: Number, default: 0 },
    total_amount_paid: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserInfo =
  models?.UserInfo || model<any>("UserInfo", UserInfoSchema);
