import * as z from "zod";
export const changePasswordSchema = z.object({
  current_password: z.string().trim(),
  new_password: z
    .string()
    .trim()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(30, { message: "Last name should be on a lot of 30 characters." }),
  confirm_password: z
    .string()
    .trim()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(30, { message: "Last name should be on a lot of 30 characters." }),
});
export const checkPassword = z.object({
 password: z.string().trim().min(5, { message: "Password must be at least 5 characters long" }),
});
