import { z } from "h3-zod";

export default z.object({
  phone: z.string().min(10),
  password: z.string().min(8),
});