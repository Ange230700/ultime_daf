// src\main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider /*, PrimeReactContext */ } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ThemeStyles from "./components/ThemeStyles.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import App from "./App.tsx";
import { FilterProvider } from "./providers/FilterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemeStyles />
      <PrimeReactProvider>
        <FilterProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FilterProvider>
      </PrimeReactProvider>
    </ThemeProvider>
  </StrictMode>,
);
