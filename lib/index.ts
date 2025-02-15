import {
  Category,
  Currency,
  Frequency,
  NotificationFrequency,
} from "@/types/enums";
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
    label: "Food",
    icon: PizzaIcon,
    color: "hsl(var(--chart-1))",
  },
  [Category.TRANSPORTATION]: {
    label: "Transportation",
    icon: TramFrontIcon,
    color: "hsl(var(--chart-2))",
  },
  [Category.ENTERTAINMENT]: {
    label: "Entertainment",
    icon: Gamepad2Icon,
    color: "hsl(var(--chart-3))",
  },
  [Category.HEALTH]: {
    label: "Health",
    icon: HeartPulseIcon,
    color: "hsl(var(--chart-4))",
  },
  [Category.BILLS]: {
    label: "Bills",
    icon: ReceiptIcon,
    color: "hsl(var(--chart-5))",
  },
  [Category.SHOPPING]: {
    label: "Shopping",
    icon: ShoppingCartIcon,
    color: "hsl(var(--chart-6))",
  },
  [Category.LEARNING]: {
    label: "Learning",
    icon: GraduationCapIcon,
    color: "hsl(var(--chart-7))",
  },
  [Category.TRAVEL]: {
    label: "Travel",
    icon: PlaneIcon,
    color: "hsl(var(--chart-8))",
  },
  [Category.INVESTMENT]: {
    label: "Investment",
    icon: CircleDollarSignIcon,
    color: "hsl(var(--chart-9))",
  },
  [Category.INSURANCE]: {
    label: "Insurance",
    icon: ShieldPlusIcon,
    color: "hsl(var(--chart-10))",
  },
  [Category.RENTAL]: {
    label: "Rental",
    icon: HomeIcon,
    color: "hsl(var(--chart-11))",
  },
  [Category.TAXES]: {
    label: "Taxes",
    icon: LandmarkIcon,
    color: "hsl(var(--chart-12))",
  },
  [Category.GIFT]: {
    label: "Gift",
    icon: GiftIcon,
    color: "hsl(var(--chart-13))",
  },
  [Category.FAMILY]: {
    label: "Family",
    icon: BookUserIcon,
    color: "hsl(var(--chart-14))",
  },
  [Category.CHARITY]: {
    label: "Charity",
    icon: HeartHandshakeIcon,
    color: "hsl(var(--chart-15))",
  },
  [Category.OTHER]: {
    label: "Other",
    icon: CogIcon,
    color: "hsl(var(--chart-16))",
  },
} as const;

export const frequency = {
  [Frequency.ONE_TIME]: "Once",
  [Frequency.DAILY]: "Daily",
  [Frequency.WEEKLY]: "Weekly",
  [Frequency.MONTHLY]: "Monthly",
  [Frequency.ANNUALLY]: "Annually",
} as const;

export const currency = {
  [Currency.TWD]: {
    label: "TWD",
    symbol: "NT$",
  },
  [Currency.USD]: {
    label: "USD",
    symbol: "$",
  },
  [Currency.JPY]: {
    label: "JPY",
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

export const notificationFrequency = {
  [NotificationFrequency.ONE_DAY_BEFORE]: "One day before",
  [NotificationFrequency.ONE_WEEK_BEFORE]: "One week before",
  [NotificationFrequency.ONE_MONTH_BEFORE]: "One month before",
  [NotificationFrequency.NONE]: "None",
};

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
