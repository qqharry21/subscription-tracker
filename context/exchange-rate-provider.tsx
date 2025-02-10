"use client";

import React, { createContext, use } from "react";

const ExchangeRateContext = createContext<any[] | null>(null);

export const ExchangeRateProvider = ({
  children,
  exchangeRates,
}: {
  children: React.ReactNode;
  exchangeRates: any[];
}) => {
  return (
    <ExchangeRateContext.Provider value={exchangeRates}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRates = () => {
  const context = use(ExchangeRateContext);
  if (!context) {
    throw new Error(
      "useExchangeRates must be used within an ExchangeRateProvider",
    );
  }
  return context;
};
