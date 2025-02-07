import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 強制轉換數字格式，其數值字串不可小於 0
 * @param value
 * @returns
 */
export const formatNumber = (value: string) => {
  const num = Number(value);
  if (num < 0) {
    return 0;
  }
  return num;
};
