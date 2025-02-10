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

const SubscriptionSelectedContext = createContext<{
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

export const SubscriptionSelectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    Tables<"subscription"> | undefined
  >();

  return (
    <SubscriptionSelectedContext.Provider
      value={{
        selectedSubscription,
        setSelectedSubscription: setSelectedSubscription,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          // onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>
          <SubscriptionForm mode={selectedSubscription ? "update" : "create"} />
        </DialogContent>
      </Dialog>
      {/* <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </SubscriptionSelectedContext.Provider>
  );
};

export const useSubscriptionSelected = () => {
  const context = use(SubscriptionSelectedContext);
  if (!context) {
    throw new Error(
      "useSelectedSubscription must be used within a SelectedSubscriptionProvider",
    );
  }
  return context;
};
