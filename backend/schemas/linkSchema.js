import { z } from "zod";

export const linkSchema = z.object({
  index: z.string().min(3, "Name must be atleast 3 characters long"),
  link: z
    .string()
    .regex(
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
      "Please provide a valid website link (e.g., https://example.com)",
    ),
});
