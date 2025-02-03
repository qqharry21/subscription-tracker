"use client";

import { format } from "date-fns";
import { createContext, use, useCallback, useState } from "react";
import { DayButtonProps } from "react-day-picker";

import { Types } from "@/lib/global";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const SelectedDateContext = createContext<{
  selected?: Date;
  setSelected?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}>({});

export default function SubscriptionCalendar({
  subscriptions,
}: {
  subscriptions: Types.subscription[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const getSubscriptionForDate = useCallback(
    (date: Date) => subscriptions.filter((subscription) => subscription),
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
        className="mx-auto w-full max-w-6xl max-md:px-0"
        classNames={{
          month: "w-full space-y-12",
          weeks: "space-y-4",
          weekdays: "w-full items-center justify-between gap-2",
          weekday: "w-full select-none bg-accent/50 py-2",
          week: "justify-between items-center gap-2 max-w-full",
          day: "group size-full max-sm:aspect-square sm:min-h-24 md:min-h-40 overflow-hidden bg-accent hover:bg-accent/80 hover:text-accent-foreground/80 focus:bg-accent/80 focus:text-accent-foreground/80 transition-all",
          button_next: "border-none",
          button_previous: "border-none",
          dropdowns: "gap-x-4 h-10",
          nav: "justify-center top-12 gap-4",
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
  existSubscription: Types.subscription[];
}
const DayButton = ({
  day,
  existSubscription,
  className,
  ...props
}: CustomDayButtonProps) => {
  const { setSelected } = use(SelectedDateContext);
  return (
    <button
      className={cn(
        className,
        "relative flex size-full min-h-[inherit] flex-grow cursor-pointer flex-col overflow-hidden focus:outline-none",
      )}
      {...props}
      onClick={() => setSelected?.(undefined)}
      onDoubleClick={() => setSelected?.(day.date)}
    >
      <div className="w-full p-2">
        <span className="mb-2 block w-full text-center">
          {format(day.date, "d")}
        </span>
        <div className="grid w-full gap-2">
          {[1, 2, 3].map((_, index) => (
            <SubscriptionLabel
              key={index}
              // key={subscription.id}
              // subscription={subscription}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

const SubscriptionLabel = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <>
      <HoverCard openDelay={500} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div
            className="w-full cursor-pointer truncate rounded-sm bg-neutral-700 p-1 text-left transition-all duration-200 group-data-outside:bg-neutral-800 group-data-outside:group-hover:bg-neutral-700 group-data-outside:group-data-selected:bg-neutral-700 hover:!bg-neutral-500"
            onClick={handleClick}
          >
            Netflix
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="flex w-fit flex-col gap-2 !opacity-100"
          side="bottom"
        >
          Netflix
        </HoverCardContent>
      </HoverCard>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>編輯支出</DialogTitle>
          </DialogHeader>
          <div className="max-h-[600px] overflow-auto">Test</div>
        </DialogContent>
      </Dialog>
    </>
  );
};
