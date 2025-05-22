// src\components\ThemeStyles.tsx

import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import { useToast } from "../contexts/ToastContext";

function ThemeStyles() {
  const { theme } = useTheme();
  const { show } = useToast();

  useEffect(() => {
    // remove the old theme link if present
    const prev = document.getElementById("pr-theme") as HTMLLinkElement;
    if (prev) prev.remove();

    // create & append the new one
    const link = document.createElement("link");
    link.id = "pr-theme";
    link.rel = "stylesheet";
    link.href = `/themes/soho-${theme}/theme.css`;
    document.head.appendChild(link);
  }, [theme, show]);

  return null;
}

export default ThemeStyles;
