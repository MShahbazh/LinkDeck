import { z } from "zod";

export const signSchema = z.object({
  name: z
    .string()
    .regex(/^\S+$/, "Spaces are not allowed in Name")
    .min(3, "Name must be atleast 3 characters long"),
  username: z
    .string()
    .regex(/^\S+$/, "Spaces are not allowed in Name")
    .regex(/^[a-zA-Z0-9 ]+$/, "Special Character are not allowed in Username")
    .min(3, "Username must be atleast 3 characters long"),
  password: z
    .string()
    .regex(/^\S+$/, "Spaces are not allowed in Password")
    .min(3, "Password must be atleast 3 characters long"),
});

export const loginSchema = z.object({
  username: z
    .string()
    .regex(/^\S+$/, "Spaces are not allowed in Username")
    .regex(/^[a-zA-Z0-9 ]+$/, "Special Character are not allowed in Username")
    .min(3, "Username must be atleast 3 characters long"),
  password: z
    .string()
    .regex(/^\S+$/, "Spaces are not allowed in Password")
    .min(3, "Password must be atleast 3 characters long"),
});
