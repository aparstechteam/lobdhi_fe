import { z } from "h3-zod";

const StudentSchema = z.object({
  name: z
    .string({
      required_error: "Please enter your name",
      invalid_type_error: "Please enter a valid name",
    })
    .min(6),
  sms: z.string().min(11),
  phone: z.string().min(11),
  batch: z.string().min(6),
  batch_time: z.string().min(6),
});

export default StudentSchema;
