"use client";

import { createContext, use, useState } from "react";

import { SubscriptionForm } from "@/components/subscription-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import { UnsavedAlertDialog } from "@/components/unsaved-alert";
import { Tables } from "@/types/supabase";

const SubscriptionContext = createContext<{
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSubscription?: Tables<"subscription">;
  setSelectedSubscription: React.Dispatch<
    React.SetStateAction<Tables<"subscription"> | undefined>
  >;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  setSelectedSubscription: () => {},
  setIsDirty: () => {},
});

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    Tables<"subscription"> | undefined
  >();
  console.log("🚨 - selectedSubscription", selectedSubscription);

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
        setIsDirty,
      }}
    >
      {children}
      <Dialog open={isDialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => {
            if (isDirty) {
              e.preventDefault();
              setShowAlert(true);
            }
          }}
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
      <UnsavedAlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        onContinueAction={() => setIsDialogOpen(false)}
      />
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
