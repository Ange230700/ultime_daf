// src\components\FiltersNav.tsx

import {
  POSTER_CLASSIFICATIONS,
  CLASS_LABELS,
} from "../constants/classifications";
import { useFilter } from "../contexts/FilterContext";

export default function FiltersNav() {
  const { posterClassification, setPosterClassification, setPage } =
    useFilter();

  function select(cls: string) {
    setPosterClassification(cls);
    setPage(1);
  }

  return (
    <nav className="flex flex-wrap gap-2 bg-blue-800 p-2">
      {POSTER_CLASSIFICATIONS.map((cls) => (
        <button
          key={cls}
          onClick={() => select(cls)}
          className={`
            px-3 py-1 rounded-t-md
            ${
              posterClassification === cls
                ? "bg-gray-200 text-blue-900"
                : "bg-blue-700 text-white hover:bg-gray-200 hover:text-blue-900"
            }
          `}
        >
          {CLASS_LABELS[cls]}
        </button>
      ))}
    </nav>
  );
}
