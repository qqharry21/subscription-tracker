"use client";

import * as React from "react";
import { ClassNames, DayPicker, DropdownProps } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zhTW } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  otherClassNames?: Partial<
    Omit<
      ClassNames,
      | "month"
      | "months"
      | "month_caption"
      | "month_grid"
      | "caption_label"
      | "nav"
      | "dropdowns"
      | "button_previous"
      | "button_next"
      | "weeks"
      | "weekdays"
      | "weekday"
      | "week"
      | "day_button"
      | "day"
      | "selected"
      | "today"
      | "outside"
      | "disabled"
      | "range_middle"
      | "hidden"
    >
  >;
};

function Calendar({
  className,
  classNames,
  otherClassNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={zhTW}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        month: cn("space-y-4", classNames?.month),
        months: cn(
          "relative flex flex-col space-y-4 sm:flex-row sm:space-y-0",
          classNames?.months,
        ),
        month_caption: cn(
          "relative flex items-center justify-center",
          classNames?.month_caption,
        ),
        month_grid: cn(
          "w-full border-collapse space-y-1",
          classNames?.month_grid,
        ),
        caption_label: cn("text-sm font-medium", classNames?.caption_label),
        nav: cn(
          "absolute inset-x-0 flex items-center justify-between",
          classNames?.nav,
        ),
        dropdowns: cn(
          "flex items-center justify-center gap-x-2",
          classNames?.dropdowns,
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "z-10 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          classNames?.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "z-10 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          classNames?.button_next,
        ),
        weeks: cn("w-full border-collapse space-y-1", classNames?.weeks),
        weekdays: cn("flex", classNames?.weekdays),
        weekday: cn(
          "text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal",
          classNames?.weekday,
        ),
        week: cn("mt-2 flex w-full", classNames?.week),
        day_button: cn(
          "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md",
          classNames?.day_button,
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "group size-8 p-0 font-normal aria-selected:opacity-100",
          classNames?.day,
        ),
        range_end: cn("day-range-end", classNames?.range_end),
        selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          classNames?.selected,
        ),
        today: cn("bg-accent text-accent-foreground", classNames?.today),
        outside: cn(
          "day-outside text-accent-foreground aria-selected:bg-accent/50 aria-selected:text-accent-foreground opacity-50 aria-selected:opacity-30",
          classNames?.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", classNames?.disabled),
        range_middle: cn(
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
          classNames?.range_middle,
        ),
        hidden: cn("invisible", classNames?.hidden),
        ...otherClassNames,
      }}
      components={{
        ...components,
        Dropdown: CustomMonthYearDropdown,
        Chevron: CustomChevron,
      }}
      startMonth={new Date(2024, 12)}
      endMonth={new Date(2080, 11)}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

const CustomChevron = ({ ...props }) => {
  return props.orientation === "left" ? (
    <ChevronLeftIcon {...props} size={16} />
  ) : (
    <ChevronRightIcon {...props} size={16} />
  );
};

const CustomMonthYearDropdown = ({
  value,
  onChange,
  options,
  className,
  ...props
}: DropdownProps) => {
  const selected = React.useMemo(
    () => options?.find((option) => option.value === value),
    [value, options],
  );
  const handleChange = (value: string) => {
    const changeEvent = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };
  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger
        className={cn(
          "h-7 border-none p-0 shadow-none focus:ring-0",
          className,
        )}
        aria-label={props["aria-label"]}
        disabled={props.disabled}
      >
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        <ScrollArea className="h-50">
          {options?.map((option, id: number) => (
            <SelectItem
              key={`${option.value}-${id}`}
              value={option.value?.toString() ?? ""}
            >
              {option.label}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export { Calendar };
