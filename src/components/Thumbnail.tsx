// src\components\Thumbnail.tsx

import type { WantedItem } from "../api/api";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

export default function Thumbnail({ item }: { readonly item: WantedItem }) {
  const header = (
    <img
      src={item.images[0]?.thumb}
      alt={item.title}
      className="w-full h-80 object-cover rounded-t"
      loading="lazy"
    />
  );
  return (
    <Link
      to={`/details/${item.uid}`}
      className="block rounded shadow p-2 hover:-translate-y-1 transition"
    >
      <Card
        header={header}
        title={item.title}
        className="shadow hover:shadow-lg transition-shadow rounded overflow-hidden"
        style={{ width: "100%", height: "100%" }}
      />
    </Link>
  );
}
