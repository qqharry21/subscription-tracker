"use client";

import { useCallback } from "react";

import { Calendar } from "./ui/calendar";

import { SubscriptionDayButton } from "./subscription-day-button";

import { useSelectedDate } from "@/context/selected-date-context";
import { isSubscriptionOnDate } from "@/lib/helper";
import { Tables } from "@/types/supabase";

export default function SubscriptionCalendar({
  subscriptions,
}: {
  subscriptions: Tables<"subscription">[];
}) {
  const { selectedDate, setSelectedDate } = useSelectedDate();

  const getSubscriptionForDate = useCallback(
    (date: Date) =>
      subscriptions.filter((sub) => isSubscriptionOnDate(date, sub)),
    [subscriptions],
  );

  return (
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
        day: "group size-full max-md:aspect-square md:min-h-40 overflow-hidden bg-accent hover:bg-accent/80 hover:text-accent-foreground/80 focus:bg-accent/80 focus:text-accent-foreground/80 transition-all",
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
            <SubscriptionDayButton
              day={day}
              existSubscription={existSubscription}
              {...props}
            />
          );
        },
      }}
    />
  );
}
