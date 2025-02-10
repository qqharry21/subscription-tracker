import { Category, Currency, Frequency } from "@/types/enums";
import { z } from "zod";

export const subscriptionSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Name is required",
      })
      .max(255),
    start_date: z.string({ message: "Start date is required" }),
    end_date: z.string().optional().nullable(),
    currency: z.nativeEnum(Currency),
    // currencyRate: z.number(),
    amount: z
      .number()
      .min(1, {
        message: "Amount must be greater than 0",
      })
      .max(500000, {
        message: "Amount must be less than 500,000",
      }),
    category: z.nativeEnum(Category),
    frequency: z.nativeEnum(Frequency),
    note: z.string().max(255, {
      message: "Note must be smaller than 255 words",
    }),
  })
  .refine(
    (data) => {
      if (data.end_date !== undefined && data.end_date !== null) {
        // return data.end_date > data.start_date;
      }
      return true;
    },
    {
      message: "結束日期必須晚於開始日期",
      path: ["endTime"],
    },
  );

export type SubscriptionFormValue = z.infer<typeof subscriptionSchema>;
