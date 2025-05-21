// src\hooks\useTheme.tsx

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}

export default useTheme;
