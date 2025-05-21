// src\components\Header.tsx

import { useFilter } from "../contexts/FilterContext";
import Navbar from "./Navbar";
import FiltersNav from "./FiltersNav";

function Header() {
  const { title, setTitle } = useFilter();

  return (
    <div style={{ backgroundColor: "var(--surface-card)" }}>
      <Navbar title={title} onTitleChange={setTitle} />
      <div className="flex justify-center">
        <FiltersNav />
      </div>
    </div>
  );
}

export default Header;
