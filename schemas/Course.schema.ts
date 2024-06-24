import { z } from "h3-zod";

export default z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  time: z.string().optional(),
  fee: z.number().nonnegative(),
  duration: z.number().nonnegative(),
});
