// src/components/FiltersNav.tsx
import { useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import type { MenuItem } from "primereact/menuitem";
import {
  POSTER_CLASSIFICATIONS,
  CLASS_LABELS,
} from "../constants/classifications";
import { useFilter } from "../contexts/FilterContext";

export default function FiltersNav() {
  const { posterClassification, setPosterClassification, setPage } =
    useFilter();

  // Build the TabMenu model from your constants
  const items: MenuItem[] = POSTER_CLASSIFICATIONS.map((cls) => ({
    label: CLASS_LABELS[cls],
    key: cls, // store the classification in `key`
  }));

  // Derive initial activeIndex from current context
  const initialIndex = POSTER_CLASSIFICATIONS.findIndex(
    (cls) => cls === posterClassification,
  );
  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  // Keep the tab highlight in sync if posterClassification changes externally
  useEffect(() => {
    const idx = POSTER_CLASSIFICATIONS.findIndex(
      (cls) => cls === posterClassification,
    );
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [posterClassification, activeIndex]);

  // When the user clicks a tab...
  const onTabChange = (e: { index: number }) => {
    const newIndex = e.index;
    const cls = POSTER_CLASSIFICATIONS[newIndex];

    setActiveIndex(newIndex);
    setPosterClassification(cls);
    setPage(1);
  };

  return (
    <div className="card">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={onTabChange}
      />
    </div>
  );
}
