import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    street_address: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserInfo =
  models?.UserInfo || model<any>("UserInfo", UserInfoSchema);
