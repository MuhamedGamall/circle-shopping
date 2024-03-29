import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    ban: {
      is_banned: { type: Boolean, default: false ,required: true},
      reason: { type: String ,required: true},
    },
    phone: { type: String },
    email: { type: String, required: true },
    street_address: { type: String },
    postal_code: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const UserInfo =
  models?.UserInfo || model<any>("UserInfo", UserInfoSchema);
