// src\providers\FilterProvider.tsx

import React, { useState, useMemo, useCallback } from "react";
import { FilterContext } from "../contexts/FilterContext";

const initialTitle = "";
const initialPosterClassification = "";
const initialPage = 1;
const initialPageSize = 50;

export function FilterProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [title, setTitle] = useState(initialTitle);
  const [posterClassification, setPosterClassification] = useState(
    initialPosterClassification,
  );
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const resetFilters = useCallback(() => {
    setTitle(initialTitle);
    setPosterClassification(initialPosterClassification);
    setPage(initialPage);
    setPageSize(initialPageSize);
  }, []);

  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
      posterClassification,
      setPosterClassification,
      page,
      setPage,
      pageSize,
      setPageSize,
      resetFilters,
    }),
    [
      title,
      posterClassification,
      page,
      pageSize,
      resetFilters,
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
