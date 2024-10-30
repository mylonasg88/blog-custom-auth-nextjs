// export types and form Schemas here

import { z } from "zod";

// export const SignupFormSchema = z
//   .object({
//     email: z.string().email("Please enter a valid email address"),

//     password: z
//       .string()
//       .min(8, { message: "Be at least 8 characters long" })
//       .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
//       .regex(/[0-9]/, { message: "Contain at least one number." })
//       .regex(/[^a-zA-Z0-9]/, {
//         message: "Contain at least one special character.",
//       })
//       .trim(),

//     passwordConfirmation: z
//       .string()
//       .min(6, "Password must be at least 6 characters"),
//   })
//   .superRefine(({ password, passwordConfirmation }, context) => {
//     if (passwordConfirmation !== password) {
//       context.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Passwords do not match",
//       });
//     }
//   });

export const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password cannot be empty"),
});

export const RegisterFormSchema = z
  .object({
    name: z.string().min(1, "Please fill in your name"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Your password must be 8 characters minimum")
      .trim(),
    confirmPassword: z
      .string()
      .min(8, "Your password must be 8 characters minimum"),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must match",
      });
    }
  });

export type FormState =
  | {
      success?: boolean;
      errors?: Partial<Record<'name' | 'email' | 'password' | 'confirmPassword', string[]>>;
      formErrors?: string[];
      message?: string;
    }
    | undefined;
