"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function SubscriptionLabel() {
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
            className="w-full cursor-pointer truncate rounded-sm bg-neutral-700 p-1 text-left transition-all duration-200 select-none group-data-outside:bg-neutral-800 group-data-outside:group-hover:bg-neutral-700 group-data-outside:group-data-selected:bg-neutral-700 hover:!bg-neutral-500"
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
}
