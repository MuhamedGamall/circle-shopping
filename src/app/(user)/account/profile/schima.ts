import * as z from "zod";
export const profileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, { message: "Invalid filed." })
    .max(30, { message: "First name should be on a lot of 30 characters." }),
  last_name: z
    .string()
    .trim()
    .min(3, { message: "Invalid filed." })

    .max(30, { message: "Last name should be on a lot of 30 characters." }),
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+$/.test(`${value}`) && value.length <= 20 && value.length >= 10,
      "Invalid Field."
    ),
  street_address: z
    .string()
    .trim()
    .min(5, { message: "Invalid field" })
    .max(191, "Address is too long"),
  city: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^[A-Za-z]+$/g.test(`${value}`) &&
        value.length <= 48 &&
        value.length >= 2,
      "Invalid Field."
    ),
  postal_code: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+$/.test(`${value}`) && value.length <= 6 && value.length >= 4,
      "Invalid Field."
    ),
  email: z.string(),
  country: z.string().trim(),
});
