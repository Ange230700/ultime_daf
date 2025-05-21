// src\contexts\FilterContext.tsx

import React, { createContext, useContext } from "react";

export interface FilterContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  posterClassification: string;
  setPosterClassification: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be inside FilterProvider");
  return ctx;
}
