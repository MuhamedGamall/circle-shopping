import { model, models, Schema } from "mongoose";

const StoreSchema = new Schema(
  {
    display_name: { type: String, required: true },
    business_email: { type: String, required: true },
    finance_email: { type: String, required: true },
    store_phone_number: { type: String, required: true },
  },
  { timestamps: true }
  
);

export const Store = models?.Store || model<any>("store", StoreSchema);
