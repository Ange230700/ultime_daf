// src\components\Spinner.tsx

import { ProgressSpinner } from "primereact/progressspinner";

export default function Spinner() {
  return (
    <div className="flex-1 py-10 text-center">
      <ProgressSpinner />
    </div>
  );
}
