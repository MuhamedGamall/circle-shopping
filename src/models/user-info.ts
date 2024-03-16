import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    phone: { type: String },
    email: { type: String},
    street_address: { type: String},
    postal_code: { type: String },
    city: { type: String},
    country: { type: String},
  },
  { timestamps: true }
);

export const UserInfo =
  models?.UserInfo || model<any>("UserInfo", UserInfoSchema);
