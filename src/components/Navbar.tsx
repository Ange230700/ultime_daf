// src\components\Navbar.tsx

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import type { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { /*useNavigate,*/ Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import type { ChangeEvent } from "react";

export interface NavbarProps {
  title: string;
  onTitleChange: (newValue: string) => void;
}

type NavbarMenuItem = MenuItem & {
  label?: string;
  icon?: number | string;
  command?: () => void;
};

function Navbar({ title, onTitleChange }: NavbarProps) {
  const { theme, toggle } = useTheme();
  //   const navigate = useNavigate();

  const items: NavbarMenuItem[] = [
    // {
    //   label: "Home",
    //   icon: "pi pi-home",
    //   command: () => {
    //     navigate("/");
    //   },
    // },
  ];

  const start = (
    <Link to="/" className="flex items-center">
      <img alt="logo" src="/assets/DAF-logo.png" className="h-16 w-auto mr-2" />
    </Link>
  );

  const end = (
    <div className="flex align-items-center gap-2">
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
    </div>
  );

  return (
    <div className="card shadow-md mb-4">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbar;
