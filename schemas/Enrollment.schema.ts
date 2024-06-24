import { z } from "h3-zod";

export default z.object({
    student: z.string(),
    course: z.string(),
    payable_amount: z.number(),
    due_amount: z.number(),
    next_payment_date: z.string().nullable(),
    payment_emis: z.array(
        z.object({
        amount: z.string(),
        date: z.string(),
        })
    ),
});