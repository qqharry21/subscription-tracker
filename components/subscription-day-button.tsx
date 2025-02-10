import { format } from "date-fns";
import { DayButtonProps } from "react-day-picker";

import { useSelectedDate } from "@/context/selected-date-context";
import { useSubscriptionSelected } from "@/context/subscription-selected-provider";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { Tables } from "@/types/supabase";

interface CustomDayButtonProps extends DayButtonProps {
  existSubscription: Tables<"subscription">[];
}
export const SubscriptionDayButton = ({
  day,
  existSubscription,
  className,
  ...props
}: CustomDayButtonProps) => {
  const { setSelectedDate } = useSelectedDate();
  const { setIsDialogOpen, setSelectedSubscription } =
    useSubscriptionSelected();

  const handleClick = (subscription: Tables<"subscription">) => {
    setIsDialogOpen(true);
    setSelectedSubscription(subscription);
  };

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
            <Button
              key={`${subscription.id}-${day.date}`}
              className="bg-primary/80 hover:!bg-primary/90 group-data-outside:bg-primary/40 group-data-outside:group-hover:bg-primary/80 group-data-outside:group-data-selected:bg-primary/80 z-10 h-7 w-full justify-start select-none"
              size="sm"
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(subscription);
              }}
            >
              {subscription.name}
            </Button>
          ))}
        </div>
        <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-2 md:hidden">
          {existSubscription.map((subscription) => (
            <div
              key={`${subscription.id}-${day.date}`}
              className="bg-primary/80 text-primary-foreground/80 size-1 shrink-0 rounded-md"
            />
          ))}
        </div>
      </div>
      <div
        className="absolute top-0 left-0 z-[5] size-full"
        onClick={() => setSelectedDate?.(day.date)}
      ></div>
    </div>
  );
};
