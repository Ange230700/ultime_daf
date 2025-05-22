// src\pages\Details.tsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItemDetails } from "../api/api";
import type { WantedItem } from "../api/api";
import Spinner from "../components/Spinner";

export default function Details() {
  const { uid } = useParams<{ uid: string }>();
  const [item, setItem] = useState<WantedItem | null>(null);

  useEffect(() => {
    if (!uid) return;
    fetchItemDetails(uid).then(setItem);
  }, [uid]);

  if (!item) return <Spinner />;

  const rows = [
    ["Place of Birth", item.place_of_birth],
    ["Race", item.race],
    ["Sex", item.sex],
    ["Hair", item.hair],
    ["Eyes", item.eyes],
    ["Classification", item.poster_classification],
  ];

  return (
    <article className="prose mx-auto my-8">
      <Link to="/" className="text-blue-600 underline">
        &larr; Back
      </Link>

      <h1>{item.title}</h1>
      <img
        src={item.images[0]?.large}
        alt={item.title}
        className="my-4 w-full max-w-md rounded shadow"
      />

      <div className="space-y-4">
        {item.description && (
          <p>
            <strong>Description:</strong> {item.description}
          </p>
        )}
        {item.caution && (
          <p>
            <strong>Caution:</strong> {item.caution}
          </p>
        )}
        {item.details && (
          <p>
            <strong>Details:</strong> {item.details}
          </p>
        )}
        {item.remarks && (
          <p>
            <strong>Remarks:</strong> {item.remarks}
          </p>
        )}
      </div>

      <table className="mt-6 w-full table-auto border">
        <tbody>
          {rows.map(
            ([label, value]) =>
              value && (
                <tr key={label}>
                  <th className="border px-2 py-1 text-left">{label}</th>
                  <td className="border px-2 py-1">{value}</td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </article>
  );
}
