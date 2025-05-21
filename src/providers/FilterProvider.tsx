// src\providers\FilterProvider.tsx

import React, { useState } from "react";
import { FilterContext } from "../contexts/FilterContext";

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  const [posterClassification, setPosterClassification] = useState("");
  const [page, setPage] = useState(1);

  return (
    <FilterContext.Provider
      value={{
        title,
        setTitle,
        posterClassification,
        setPosterClassification,
        page,
        setPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
