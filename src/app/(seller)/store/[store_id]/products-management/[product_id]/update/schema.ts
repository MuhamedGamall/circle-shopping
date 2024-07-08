import * as z from "zod";

export const priceSchema = z.object({
  price: z.object({
    base_price: z.coerce
      .number()
      .refine((value) => value >= 0.01, "Invalid Price"),
  }),
});
export const offerSchema = z.object({
  offer: z.object({
    start_date: z.coerce
      .date({
        required_error: "Start date is required.",
      })
      .nullable(),
    end_date: z.coerce
      .date({
        required_error: "End date is required.",
      })
      .nullable(),
    discount_percentage: z.coerce
      .number()
      .refine(
        (value) => value >= 1 && value <= 100,
        "Discount percentage must be between 1% and 100%."
      ),
  }),
});
export const productBasicSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Field is required" })
    .max(200, { message: "Titel should be on a lot of 200 characters." })
    .refine(
      (value) =>
        /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
          value
        ),
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    ),
  description: z
    .string()
    .trim()
    .max(4000, {
      message: "description should be on a lot of 4000 characters.",
    })
    .refine(
      (value) =>
        value
          ? /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
              value
            )
          : true,
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    )
    .optional(),
  model_number: z
    .string()
    .trim()
    .max(1000, {
      message: "Model number should be on a lot of 1000 characters.",
    })
    .refine(
      (value) =>
        /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
          value
        ),
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    )
    .optional(),
  item_pack_quantity: z.coerce
    .number()
    .refine((value) => value >= 0, "Field is required"),
  sizes: z.array(z.string()),
  colours: z.array(z.string()),
});

export const productDetailsSchema = z.object({
  quantity_in_stock: z.coerce
    .number()
    .refine((value) => value >= 0, "Invalid Field"),
  max_purchase_quantity: z.coerce
    .number()
    .refine((value) => value >= 1, "Invalid Field"),
  specifications: z
    .array(
      z
        .string()
        .min(1, { message: "Field is require" })
        .max(200, {
          message: "Should be on a lot of 200 characters.",
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Please enter English characters only.",
        })
    )
    .optional(),
  highlights: z
    .array(
      z
        .string()
        .min(1, { message: "Field is required" })
        .max(200, {
          message: "Should be on a lot of 200 characters.",
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Please enter English characters only.",
        })
    )
    .optional(),
  model_name: z
    .string()
    .trim()
    .min(1, { message: "Field is required" })
    .max(1000, {
      message: "Model name should be on a lot of 1000 characters.",
    })
    .refine(
      (value) =>
        /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
          value
        ),
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    ),

  colour: z.string().min(1, { message: "Field is required" }),
  box_details: z
    .string()
    .trim()
    .min(5, { message: "It must contain 5 characters." })
    .max(1000, {
      message: "Should be on a lot of 1000 characters.",
    })
    .refine(
      (value) =>
        /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
          value
        ),
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    ),
  model_height: z
    .string()
    .trim()
    .min(1, { message: "It must contain 1 characters." })
    .max(1000, {
      message: "Should be on a lot of 1000 characters.",
    })
    .refine(
      (value) =>
        /^[a-zA-Z0-9](?:[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*[a-zA-Z0-9])?/.test(
          value
        ),
      {
        message:
          "Please enter English characters, numbers, and symbols only. The value should not start or end with symbols.",
      }
    ),
});
export const categoryForm = z.object({
  category: z.object({
    main_category: z.string().min(1, { message: "Field is required" }),
    sub_category: z.string().min(1, { message: "Field is required" }),
    brand: z
      .string()
      .trim()
      .min(1, { message: "It must contain 1 character." })
      .max(50, {
        message: "Should be on a lot of 50 characters.",
      }),
  }),
});

export const itemConditionSchema = z.object({
  item_condition: z
    .string()
    .refine((value) => value === "New" || value === "Used", "Invalid Field"),
});

export const warrantySchema = z.object({
  warranty: z.string().min(1, { message: "Field is required" }),
});

const shipping = z.object({
  size: z.coerce
    .number()
    .refine((value) => value >= 1, { message: "Field is required" }),
  size_type: z.string().min(1, { message: "Field is required" }),
});
export const shippingSchema = z.object({
  shipping: z.object({
    shipping_length: shipping,
    shipping_height: shipping,
    shipping_width_depth: shipping,
    shipping_weight: shipping,
  }),
});
