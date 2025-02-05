"use client";

import { useState } from "react";

import { Tables } from "@/types/supabase";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function SubscriptionLabel({
  subscription,
}: {
  subscription: Tables<"subscription">;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-primary/80 hover:!bg-primary/90 group-data-outside:bg-primary/40 group-data-outside:group-hover:bg-primary/80 group-data-outside:group-data-selected:bg-primary/80 z-10 h-7 w-full justify-start select-none"
            size="sm"
            variant="default"
            onClick={handleClick}
          >
            {subscription.name}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-[600px] overflow-auto">
            <div className="p-4">
              <p>{subscription.name}</p>
              <p>{subscription.amount}</p>
              <p>{subscription.start_date}</p>
              <p>{subscription.end_date}</p>
              <p>{subscription.category}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
