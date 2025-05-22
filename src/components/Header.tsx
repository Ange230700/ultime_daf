// src\components\Header.tsx

import { useFilter } from "../contexts/FilterContext";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FiltersNav from "./FiltersNav";

function Header() {
  const { title, setTitle } = useFilter();
  const location = useLocation();

  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <div style={{ backgroundColor: "var(--surface-card)" }}>
      <Navbar title={title} onTitleChange={setTitle} />
      {!isDetailsPage && (
        <div className="flex justify-center">
          <FiltersNav />
        </div>
      )}
    </div>
  );
}

export default Header;
