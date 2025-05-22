// src\components\Navbar.tsx

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import type { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import type { ChangeEvent } from "react";
import { useFilter } from "../contexts/FilterContext";

export interface NavbarProps {
  title: string;
  onTitleChange: (newValue: string) => void;
}

type NavbarMenuItem = MenuItem & {
  label?: string;
  icon?: number | string;
  command?: () => void;
};

export default function Navbar({
  title,
  onTitleChange,
}: Readonly<NavbarProps>) {
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const { resetFilters } = useFilter();

  const handleLogoClick = () => {
    resetFilters();
  };

  const items: NavbarMenuItem[] = [
    {
      label: "Stats",
      icon: "pi pi-chart-bar",
      command: () => {
        navigate("/stats");
      },
    },
  ];

  const start = (
    <Link
      to="/"
      onClick={handleLogoClick}
      className="flex transform items-center transition-transform duration-200 ease-in-out hover:scale-120"
    >
      <img alt="logo" src="/assets/DAF-logo.png" className="mr-2 h-16 w-auto" />
    </Link>
  );

  const end = (
    <section className="align-items-center flex gap-2">
      <InputText
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTitleChange(e.currentTarget.value)
        }
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Button
        icon={theme === "dark" ? "pi pi-sun" : "pi pi-moon"}
        rounded
        aria-label="Toggle theme"
        onClick={toggle}
      />
    </section>
  );

  return (
    <nav className="card mb-4 shadow-md">
      <Menubar model={items} start={start} end={end} />
    </nav>
  );
}
