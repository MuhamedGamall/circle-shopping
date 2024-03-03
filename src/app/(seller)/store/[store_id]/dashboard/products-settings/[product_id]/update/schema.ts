import * as z from "zod";
const shipping = z.object({
  size: z.number().refine((value) => value >= 1, "Field is required"),
  size_type: z.string().min(1, { message: "Field is required" }),
});
export const priceSchema = z.object({
  // is_live: z
  //   .boolean()
  //   .refine((value) => value === true || false, "Field is required")
  //   .default(false),
  // title: z
  //   .string()
  //   .trim()
  //   .min(5, { message: "Field is required" })
  //   .max(200, { message: "Titel should be on a lot of 200 characters." }),
  // image: z.string(),
  // description: z
  //   .string()
  //   .trim()
  //   .max(4000, { message: "Titel should be on a lot of 4000 characters." })
  //   .optional(),
  // department: z.string().trim().min(1, { message: "Field is required" }),
  // model_number: z
  //   .string()
  //   .trim()
  //   .max(1000, {
  //     message: "Model number should be on a lot of 1000 characters.",
  //   })
  //   .optional(),
  // model_name: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "Field is required" })
  //   .max(1000, {
  //     message: "Model name should be on a lot of 1000 characters.",
  //   }),
  // item_pack_quantity: z
  //   .number()
  //   .refine((value) => value >= 1, "Field is required")
  //   .default(1),
  // warranty: z.string().min(1, { message: "Field is required" }),
  // item_condition: z
  //   .string()
  //   .refine((value) => value === "new" || value === "used", "Invalid Field"),
  // colour: z.string().min(1, { message: "Field is required" }),
  // box_details: z
  //   .string()
  //   .trim()
  //   .min(5, { message: "It must contain 5 characters." })
  //   .max(1000, {
  //     message: "Should be on a lot of 1000 characters.",
  //   }),
  // model_height: z
  //   .string()
  //   .trim()
  //   .min(5, { message: "It must contain 5 characters." })
  //   .max(1000, {
  //     message: "Should be on a lot of 1000 characters.",
  //   }),
  // sizes: z
  //   .array(z.string().min(1, { message: "Field is require" }))
  //   .min(1, { message: "At least one size must be added." }),
  // specifications: z
  //   .array(
  //     z.string().min(1, { message: "Field is require" }).max(200, {
  //       message: "Should be on a lot of 200 characters.",
  //     })
  //   )
  //   .optional(),
  // highlights: z
  //   .array(
  //     z.string().min(1, { message: "Field is required" }).max(200, {
  //       message: "Should be on a lot of 200 characters.",
  //     })
  //   )
  //   .optional(),
  // shipping: z.object({
  //   shipping_length: shipping,
  //   shipping_height: shipping,
  //   shipping_width_depth: shipping,
  //   shipping_weight: shipping,
  // }),
  price: z.object({
    base_price: z
      .number()
      .refine((value) => value >= 0.01, "Invalid Price")
      .default(0.01),
    offer: z.object({
      is_offered: z
        .boolean()
        .refine((value) => value === true || false, "Field is required")
        .default(false),
      start_date: z
        .date()
        .refine(
          (value) => !isNaN(new Date(value).getTime()),
          "Date format should be YYYY-MM-DD HH:mm:ss."
        )
        .nullable(),

      end_date: z
        .date()
        .refine(
          (value) => !isNaN(new Date(value).getTime()),
          "Date format should be YYYY-MM-DD HH:mm:ss."
        )
        .nullable(),

      discount_percentage: z
        .number()
        .refine((value) => value > -1 && value <= 100),
    }),
  }),
  // quantity_in_stock: z
  //   .number()
  //   .refine((value) => value >= 0, "Invalid Field")
  //   .default(0),
  // max_purchase_quantity: z
  //   .number()
  //   .refine((value) => value >= 1, "Invalid Field")
  //   .default(1),
});
export const itemConditionSchema = z.object({
  item_condition: z.string().min(1, { message: "Field is required" }),
});
export const warrantySchema = z.object({
  warranty: z.string().min(1, { message: "Field is required" }),
});
export const imageSchema = z.object({
  image: z.string().refine(value=> value),
});
