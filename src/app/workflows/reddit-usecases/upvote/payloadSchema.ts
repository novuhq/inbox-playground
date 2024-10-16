import { z } from "zod";

export const payloadSchema = z.object({
  firstName: z.string().default("John"), 
  lastName: z.string().default("Doe"),
});
