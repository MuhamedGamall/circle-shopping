import * as z from 'zod';
export const formSchema = z.object({
  password: z
    .string()
    .trim()
    .min(5, {
      message: "password must be at least 5 characters.",
    })
    .max(30, { message: "password should be on a lot of 30 characters." }),
  email: z.string().trim().email("Please enter valid email address"),
});