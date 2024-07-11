import { z } from "zod";

export const PostItemformSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    startingPrice: z.string().min(1, { message: "Starting price is required." }),
    file: z.string().optional()
  })