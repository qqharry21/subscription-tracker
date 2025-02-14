"use client";

import { createContext, use, useMemo, useCallback, useState } from "react";

import { SubscriptionForm } from "@/components/subscription-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UnsavedAlertDialog } from "@/components/unsaved-alert";

import { Tables } from "@/types/supabase";

interface SubscriptionContextType {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedSubscription?: Tables<"subscription">;
  setSelectedSubscription: (subscription?: Tables<"subscription">) => void;
  setIsDirty: (isDirty: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

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

  const handleDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedSubscription(undefined);
    }
    setIsDialogOpen(open);
  }, []);

  const handleCloseDialog = useCallback(
    (e: Event) => {
      if (isDirty) {
        e.preventDefault();
        setShowAlert(true);
      }
    },
    [isDirty],
  );

  const handleContinueAction = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const contextValue = useMemo<SubscriptionContextType>(
    () => ({
      selectedSubscription,
      setSelectedSubscription,
      isDialogOpen,
      setIsDialogOpen,
      setIsDirty,
    }),
    [selectedSubscription, isDialogOpen],
  );

  const dialogContent = useMemo(
    () => (
      <DialogContent
        onEscapeKeyDown={handleCloseDialog}
        onPointerDownOutside={handleCloseDialog}
      >
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
        </DialogHeader>

        <SubscriptionForm
          mode={selectedSubscription ? "update" : "create"}
          defaultValues={selectedSubscription}
        />
      </DialogContent>
    ),
    [selectedSubscription, handleCloseDialog],
  );

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        {dialogContent}
      </Dialog>
      <UnsavedAlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        onContinueAction={handleContinueAction}
      />
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = use(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }

  return context;
};
