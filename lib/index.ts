import { Category, Currency, Frequency } from "@/types/enums";
import {
  BookUserIcon,
  CircleDollarSignIcon,
  CogIcon,
  Gamepad2Icon,
  GiftIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  HeartPulseIcon,
  HomeIcon,
  LandmarkIcon,
  PizzaIcon,
  PlaneIcon,
  ReceiptIcon,
  ShieldPlusIcon,
  ShoppingCartIcon,
  TramFrontIcon,
} from "lucide-react";

export const category = {
  [Category.FOOD]: {
    label: "食物",
    icon: PizzaIcon,
    color: "hsl(var(--chart-1))",
  },
  [Category.TRANSPORTATION]: {
    label: "交通",
    icon: TramFrontIcon,
    color: "hsl(var(--chart-2))",
  },
  [Category.ENTERTAINMENT]: {
    label: "娛樂",
    icon: Gamepad2Icon,
    color: "hsl(var(--chart-3))",
  },
  [Category.HEALTH]: {
    label: "健康",
    icon: HeartPulseIcon,
    color: "hsl(var(--chart-4))",
  },
  [Category.BILLS]: {
    label: "帳單",
    icon: ReceiptIcon,
    color: "hsl(var(--chart-5))",
  },
  [Category.SHOPPING]: {
    label: "購物",
    icon: ShoppingCartIcon,
    color: "hsl(var(--chart-6))",
  },
  [Category.LEARNING]: {
    label: "教育",
    icon: GraduationCapIcon,
    color: "hsl(var(--chart-7))",
  },
  [Category.TRAVEL]: {
    label: "旅遊",
    icon: PlaneIcon,
    color: "hsl(var(--chart-8))",
  },
  [Category.INVESTMENT]: {
    label: "投資",
    icon: CircleDollarSignIcon,
    color: "hsl(var(--chart-9))",
  },
  [Category.INSURANCE]: {
    label: "保險",
    icon: ShieldPlusIcon,
    color: "hsl(var(--chart-10))",
  },
  [Category.RENTAL]: {
    label: "租金",
    icon: HomeIcon,
    color: "hsl(var(--chart-11))",
  },
  [Category.TAXES]: {
    label: "稅金",
    icon: LandmarkIcon,
    color: "hsl(var(--chart-12))",
  },
  [Category.GIFT]: {
    label: "禮物",
    icon: GiftIcon,
    color: "hsl(var(--chart-13))",
  },
  [Category.FAMILY]: {
    label: "家庭",
    icon: BookUserIcon,
    color: "hsl(var(--chart-14))",
  },
  [Category.CHARITY]: {
    label: "慈善",
    icon: HeartHandshakeIcon,
    color: "hsl(var(--chart-15))",
  },
  [Category.OTHER]: {
    label: "其他",
    icon: CogIcon,
    color: "hsl(var(--chart-16))",
  },
} as const;

export const frequency = {
  [Frequency.ONE_TIME]: "一次性",
  [Frequency.DAILY]: "每日",
  [Frequency.WEEKLY]: "每週",
  [Frequency.MONTHLY]: "每月",
  [Frequency.ANNUALLY]: "每年",
} as const;

export const currency = {
  [Currency.TWD]: {
    label: "台幣",
    symbol: "NT$",
  },
  [Currency.USD]: {
    label: "美金",
    symbol: "$",
  },
  [Currency.JPY]: {
    label: "日幣",
    symbol: "¥",
  },
} as const;

export const thresholds = {
  [Frequency.ONE_TIME]: [3000, 1000],
  [Frequency.DAILY]: [300, 100],
  [Frequency.WEEKLY]: [2100, 700],
  [Frequency.MONTHLY]: [9000, 3000],
  [Frequency.ANNUALLY]: [108000, 36000],
};

export enum Level {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

// export const incomeCategory = {
//   [IncomeCategory.SALARY]: {
//     label: "薪資",
//   },
//   [IncomeCategory.BONUS]: {
//     label: "獎金",
//   },
//   [IncomeCategory.DIVIDEND]: {
//     label: "股息",
//   },
//   [IncomeCategory.SIDE_JOB]: {
//     label: "副業收入",
//   },
//   [IncomeCategory.INVESTMENT]: {
//     label: "投資收益",
//   },
//   [IncomeCategory.RENTAL]: {
//     label: "租金收入",
//   },
//   [IncomeCategory.ROYALTY]: {
//     label: "版稅",
//   },
//   [IncomeCategory.CAPITAL_GAINS]: {
//     label: "資本利得",
//   },
//   [IncomeCategory.PENSION]: {
//     label: "退休金",
//   },
//   [IncomeCategory.INHERITANCE]: {
//     label: "繼承收入",
//   },
//   [IncomeCategory.FREELANCE]: {
//     label: "自由職業收入",
//   },
//   [IncomeCategory.LOTTERY]: {
//     label: "彩票或賭博收入",
//   },
//   [IncomeCategory.TRUST]: {
//     label: "信託收入",
//   },
//   [IncomeCategory.TAX_REFUND]: {
//     label: "退稅",
//   },
//   [IncomeCategory.ANNUITY]: {
//     label: "年金",
//   },
//   [IncomeCategory.GIFT]: {
//     label: "禮物",
//   },
//   [IncomeCategory.OTHER]: {
//     label: "其他",
//   },
// };
