// src\components\Header.tsx

import { useFilter } from "../contexts/FilterContext";
import Navbar from "./Navbar";
import FiltersNav from "./FiltersNav";

function Header() {
  const { title, setTitle } = useFilter();

  return (
    <>
      <Navbar title={title} onTitleChange={setTitle} />
      <section>
        <div className="container mx-auto">
          <FiltersNav />
        </div>
      </section>
    </>
  );
}

export default Header;
