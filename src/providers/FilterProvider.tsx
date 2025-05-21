// src\providers\FilterProvider.tsx

import React, { useState, useMemo } from "react";
import { FilterContext } from "../contexts/FilterContext";

export function FilterProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [title, setTitle] = useState("");
  const [posterClassification, setPosterClassification] = useState("");
  const [page, setPage] = useState(1);

  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
      posterClassification,
      setPosterClassification,
      page,
      setPage,
    }),
    [
      title,
      posterClassification,
      page,
      // note: React guarantees the setter functions have stable identity,
      // so you don’t need to include setTitle, setPosterClassification or setPage here
    ],
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
