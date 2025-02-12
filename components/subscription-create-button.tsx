"use client";

import { useSubscription } from "@/context/subscription-provider";
import { useIsScroll } from "@/hooks/use-is-scroll";
import { PlusIcon } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const SubscriptionCreateButton = () => {
  const isScrolled = useIsScroll();
  const { setIsDialogOpen } = useSubscription();
  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isScrolled && (
        <m.div
          className="fixed right-16 bottom-16 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full"
                  type="button"
                  onClick={handleClick}
                >
                  <PlusIcon size={24} />
                  <span className="sr-only">Create subscription</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Create your new subscription
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </m.div>
      )}
    </AnimatePresence>
  );
};
