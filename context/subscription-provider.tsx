"use client";

import { createContext, use, useState } from "react";

import { SubscriptionForm } from "@/components/subscription-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { Tables } from "@/types/supabase";

const SubscriptionContext = createContext<{
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSubscription?: Tables<"subscription">;
  setSelectedSubscription: React.Dispatch<
    React.SetStateAction<Tables<"subscription"> | undefined>
  >;
}>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  setSelectedSubscription: () => {},
});

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    Tables<"subscription"> | undefined
  >();

  const onDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedSubscription(undefined);
    }
    setIsDialogOpen(open);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        selectedSubscription,
        setSelectedSubscription: setSelectedSubscription,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
      <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          // onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>

          <SubscriptionForm
            mode={selectedSubscription ? "update" : "create"}
            defaultValues={selectedSubscription}
          />
        </DialogContent>
      </Dialog>
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = use(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSelectedSubscription must be used within a SelectedSubscriptionProvider",
    );
  }
  return context;
};
