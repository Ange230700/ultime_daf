// src\components\Header.tsx

import { useFilter } from "../contexts/FilterContext";
import Navbar from "./Navbar";

function Header() {
  const { title, setTitle } = useFilter();

  return <Navbar title={title} onTitleChange={setTitle} />;
}

export default Header;
