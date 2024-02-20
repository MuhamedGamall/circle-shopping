import * as z from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const createStoreSchema = z.object({
  display_name: z
    .string()
    .trim()
    .min(1, { message: "Invalid filed." })
    .max(30, { message: "First name should be on a lot of 30 characters." }),
  business_email: z.string().trim().email("Please enter valid email"),
  finance_email: z.string().trim().email("Please enter valid email"),
  store_phone_number: z.string().trim() .refine(
    (value) =>
      /^\d+$/.test(`${value}`) && value.length <= 20 && value.length >= 5,
    "Invalid number."
  ),
});
