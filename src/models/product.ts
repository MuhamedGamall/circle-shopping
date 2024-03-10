import mongoose, { model, models, Schema } from "mongoose";
const shipping_details = {
  size: { type: Number },
  size_type: { type: String },
};

const ProductSchema = new Schema(
  {
    is_live: { type: Boolean, default: false },
    purchase_quantity: { type: Number },
    rate: { type: Number },
    store_id: { type: String, required: true },
    store_personal_email: { type: String, required: true },
    title: { type: String },
    images: [{ type: String }],
    description: { type: String },
    model_number: { type: String },
    model_name: { type: String },
    item_pack_quantity: { type: Number, default: 1 },
    warranty: { type: String },
    item_condition: { type: String, default: "New" },
    colour: { type: String },
    box_details: { type: String },
    model_height: { type: String },
    sizes: [{ type: String }],
    specifications: [{ type: String }],
    highlights: [{ type: String }],
    category: new Schema({
      main_category: { type: String, required: true },
      sub_category: { type: String, required: true },
      brand: { type: String, required: true },
    }),
    shipping: {
      shipping_length: shipping_details,
      shipping_height: shipping_details,
      shipping_width_depth: shipping_details,
      shipping_weight: shipping_details,
    },
    price: {
      base_price: { type: Number, default: 0.01 },
      offer: {
        start_date: { type: Date },
        end_date: { type: Date },
        discount_percentage: { type: Number },
      },
    },
    quantity_in_stock: { type: Number, default: 0 },
    max_purchase_quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Product = models?.Product || model<any>("Product", ProductSchema);
