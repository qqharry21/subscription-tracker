import { Frequency } from "@/types/enums";
import { endOfMonth, isBefore, isSameDay, startOfDay } from "date-fns";
import { Tables } from "../types/supabase";

/**
 * 判斷訂閱是否在指定日期
 * @param date 日期
 * @param subscription 支出
 * @returns 是否在指定日期
 */
export const isSubscriptionOnDate = (
  date: Date,
  subscription: Tables<"subscription">,
) => {
  const { start_date, end_date, frequency } = subscription;
  const startDate = startOfDay(start_date);
  const endDate = end_date ? startOfDay(end_date) : null;
  // if (includeEndTime && endDate) {
  //   endDate.setDate(endDate.getDate() + 1);
  // }
  const checkDate = startOfDay(date);

  switch (frequency) {
    case Frequency.ONE_TIME:
      return isSameDay(startDate, checkDate);

    case Frequency.DAILY:
      return (
        !isBefore(checkDate, startDate) &&
        // 如果包含結束時間，則需檢查是否在結束時間當天
        (!endDate || isBefore(checkDate, endDate))
      );

    case Frequency.WEEKLY:
      return (
        !isBefore(checkDate, startDate) &&
        checkDate.getDay() === startDate.getDay() && // 同一天的星期
        (!endDate || isBefore(checkDate, endDate))
      );

    case Frequency.MONTHLY: {
      if (isBefore(checkDate, startDate)) return false;

      const startDay = startDate.getDate();
      const checkMonthLastDay = endOfMonth(checkDate).getDate();

      // Adjust the day if startDay exceeds the last day of the month
      const adjustedCheckDay = Math.min(startDay, checkMonthLastDay);

      return (
        checkDate.getDate() === adjustedCheckDay &&
        (!endDate || isBefore(checkDate, endDate))
      );
    }

    case Frequency.ANNUALLY: {
      if (isBefore(checkDate, startDate)) return false;

      const startDay = startDate.getDate();
      const startMonth = startDate.getMonth();
      const checkMonthLastDay = endOfMonth(checkDate).getDate();

      // Adjust to the last valid day if the original date does not exist in this year's month
      const adjustedCheckDay = Math.min(startDay, checkMonthLastDay);

      return (
        checkDate.getMonth() === startMonth &&
        checkDate.getDate() === adjustedCheckDay &&
        (!endDate || isBefore(checkDate, endDate))
      );
    }

    default:
      return false;
  }
};
