// src\components\Thumbnail.tsx

import type { WantedItem } from "../api/api";
import { Link } from "react-router-dom";

export default function Thumbnail({ item }: { item: WantedItem }) {
  return (
    <Link
      to={`/details/${item.uid}`}
      className="block bg-white rounded shadow p-2 hover:-translate-y-1 transition"
    >
      <img
        src={item.images[0]?.thumb}
        alt={item.title}
        className="w-full h-40 object-cover rounded"
        loading="lazy"
      />
      <p className="mt-2 font-semibold">{item.title}</p>
    </Link>
  );
}
