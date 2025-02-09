"use client";

import { format } from "date-fns";
import { createContext, use, useCallback, useState } from "react";
import { DayButtonProps } from "react-day-picker";

import SubscriptionLabel from "./subscription-label";
import { Calendar } from "./ui/calendar";

import { isSubscriptionOnDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Tables } from "@/types/supabase";

const SelectedDateContext = createContext<{
  selected?: Date;
  setSelected?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}>({});

export default function SubscriptionCalendar({
  subscriptions,
}: {
  subscriptions: Tables<"subscription">[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const getSubscriptionForDate = useCallback(
    (date: Date) =>
      subscriptions.filter((sub) => isSubscriptionOnDate(date, sub)),
    [subscriptions],
  );
  return (
    <SelectedDateContext.Provider
      value={{ selected: selectedDate, setSelected: setSelectedDate }}
    >
      <Calendar
        mode="single"
        required
        selected={selectedDate}
        onSelect={setSelectedDate}
        captionLayout="dropdown"
        className="w-full px-0"
        classNames={{
          month: "w-full",
          weekdays: "w-full items-center justify-between gap-2",
          weekday: "w-full select-none bg-accent/50 py-2",
          week: "justify-between items-center gap-2 max-w-full",
          day: "group size-full max-sm:aspect-square sm:min-h-24 md:min-h-40 overflow-hidden bg-accent hover:bg-accent/80 hover:text-accent-foreground/80 focus:bg-accent/80 focus:text-accent-foreground/80 transition-all",
          dropdowns: "gap-x-4",
          selected:
            "bg-accent ring ring-primary ring-offset-2 text-accent-foreground hover:bg-accent/80 focus:bg-accent/80 hover:text-accent-foreground/80 focus:text-accent-foreground/80",
          outside:
            "bg-accent/50 text-accent-foreground/50 aria-selected:bg-accent/60 aria-selected:hover:bg-accent/60 aria-selected:hover:text-accent-foreground opacity-100 transition-all aria-selected:opacity-100",
        }}
        otherClassNames={{
          years_dropdown: "text-xl font-bold gap-x-2 select-none",
          months_dropdown: "text-xl font-bold gap-x-2 select-none",
        }}
        components={{
          DayButton: ({ day, ...props }) => {
            const existSubscription = getSubscriptionForDate(day.date);
            return (
              <DayButton
                day={day}
                existSubscription={existSubscription}
                {...props}
              />
            );
          },
        }}
      />
    </SelectedDateContext.Provider>
  );
}

interface CustomDayButtonProps extends DayButtonProps {
  existSubscription: Tables<"subscription">[];
}
const DayButton = ({
  day,
  existSubscription,
  className,
  ...props
}: CustomDayButtonProps) => {
  const { setSelected } = use(SelectedDateContext);
  return (
    <div
      role="button"
      className={cn(
        className,
        "relative size-full min-h-[inherit] cursor-pointer overflow-hidden focus:outline-none",
      )}
      tabIndex={-1}
      aria-label={props["aria-label"]}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center p-2">
        <span className="mb-1 block w-full flex-1 text-center select-none md:mb-2">
          {format(day.date, "d")}
        </span>
        <div className="hidden w-full gap-2 md:grid">
          {existSubscription.map((subscription) => (
            <SubscriptionLabel
              key={`${subscription.id}-${day.date}`}
              subscription={subscription}
            />
          ))}
        </div>
        <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-2 md:hidden">
          {Array.from({ length: 8 }).map((subscription, index) => (
            <div
              key={`${day.date}-${index}`}
              className="bg-primary/80 text-primary-foreground/80 size-1 shrink-0 rounded-md"
            />
          ))}
        </div>
      </div>
      <div
        className="absolute top-0 left-0 z-[5] size-full"
        onClick={() => setSelected?.(day.date)}
      ></div>
    </div>
  );
};
