import { Category, Currency, Frequency } from "@/types/enums";
import { date, z } from "zod";

const idSchema = z.string().optional();
const titleSchema = z
  .string()
  .min(1, {
    message: "項目名稱為必填",
  })
  .max(255);

const frequencySchema = z.nativeEnum(Frequency);
const currencySchema = z.nativeEnum(Currency);
const amountSchema = z.number().min(1, {
  message: "金額必須大於 1",
});
const noteSchema = z.string().max(255, { message: "描述最多 255 字元" });

export const subscriptionSchema = z
  .object({
    id: idSchema,
    title: titleSchema,
    start_date: z.string({ message: "開始日期為必填" }),
    end_date: z.string().optional().nullable(),
    currency: currencySchema,
    // currencyRate: z.number(),
    amount: amountSchema.max(500000, {
      message: "金額必須介於 1 至 500,000 之間",
    }),
    category: z.nativeEnum(Category),
    frequency: frequencySchema,
    note: noteSchema,
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

export type ExpenseFormValue = z.infer<typeof subscriptionSchema>;

export const incomeSchema = z.object({
  id: idSchema,
  title: titleSchema,
  date: date({ message: "日期為必填" }),
  currency: currencySchema,
  amount: amountSchema.max(10000000, {
    message: "金額必須介於 1 至 10,000,000 之間",
  }),
  category: z.nativeEnum(Category),
  frequency: frequencySchema,
  description: noteSchema,
});
