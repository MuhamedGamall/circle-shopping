import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    main_category: {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
    sub_categories: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    folder_cloudinary_images_id: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category =
  models?.Category || model<any>("Category", CategorySchema);
