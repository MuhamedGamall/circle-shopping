import * as z from "zod";
export const profileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, {
      message: "Field is required.",
    })
    .max(30, { message: "First name should be on a lot of 30 characters." })
    .optional(),
  last_name: z
    .string()
    .trim()
    .min(1, {
      message: "Field is required.",
    })
    .max(30, { message: "Last name should be on a lot of 30 characters." })
    .optional(),
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+(\.\d{1,2})?$/.test(`${value}`) &&
        value.length <= 20 &&
        value.length >= 10,
      " Field is required."
    )
    .optional(),
  street_address: z.string().trim().max(191, "Address is too long").optional(),
  city: z
    .string()
    .trim()
    .max(48, "City must be at most 30 characters long")
    .optional(),
  postal_code: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+(\.\d{1,2})?$/.test(`${value}`) &&
        value.length <= 6 &&
        value.length >= 4,
      "Field is required."
    )
    .optional(),
  email: z.string(),
  country: z.string().trim().optional(),
});
