"use client";

import { createContext, use, useState } from "react";

const SelectedDateContext = createContext<{
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}>({
  setSelectedDate: () => {},
});

export default function SelectedDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  return (
    <SelectedDateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
}

export function useSelectedDate() {
  const context = use(SelectedDateContext);
  if (!context) {
    throw new Error(
      "useSelectedDate must be used within a SelectedDateProvider",
    );
  }
  return context;
}
