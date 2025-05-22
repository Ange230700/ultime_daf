// src\components\Header.tsx

import { useFilter } from "../contexts/FilterContext";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FiltersNav from "./FiltersNav";

export default function Header() {
  const { title, setTitle } = useFilter();
  const location = useLocation();

  const isDetailsPage = location.pathname.startsWith("/details");
  const isStatsPage = location.pathname.includes("/stats");

  return (
    <header style={{ backgroundColor: "var(--surface-card)" }}>
      <Navbar title={title} onTitleChange={setTitle} />
      {!isDetailsPage && !isStatsPage && (
        <section className="flex justify-center">
          <FiltersNav />
        </section>
      )}
    </header>
  );
}
