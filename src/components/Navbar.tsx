// src\components\Navbar.tsx

import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

type NavbarMenuItem = MenuItem & {
  label?: string;
  icon?: number | string;
  command?: () => void;
};

export default function Navbar() {
  const navigate = useNavigate();

  const items: NavbarMenuItem[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
  ];

  const start = (
    <img alt="logo" src="/assets/DAF-logo.png" height={40} className="mr-2" />
  );

  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
    </div>
  );

  return (
    <div className="card shadow-md mb-4">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
