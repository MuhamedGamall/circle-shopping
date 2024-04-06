import { model, models, Schema } from "mongoose";

const PurchaseSchema = new Schema(
  {
    order_id: { type: String, unique: true, required: true },
    store_id: { type: String, unique: true, required: true },
    customer_id: { type: String, required: true },
    product_ids: { type: [String] },
    products_quantity: { type: Number, required: true },
    total_purchase: { type: Number, required: true },
    costumer_details: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      street_address: { type: String, required: true },
      postal_code: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Purchase =
  models?.Purchase || model<any>("Purchase", PurchaseSchema);
