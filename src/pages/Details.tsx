// src\pages\Details.tsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItemDetails } from "../api/api";
import type { WantedItem } from "../api/api";
import Spinner from "../components/Spinner";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SafeHtml from "../components/SafeHtml";

export default function Details() {
  const { uid } = useParams<{ uid: string }>();
  const [item, setItem] = useState<WantedItem | null>(null);

  useEffect(() => {
    if (!uid) return;
    fetchItemDetails(uid).then(setItem);
  }, [uid]);

  if (!item) return <Spinner />;

  const rows = [
    { field: "Place of Birth", value: item.place_of_birth ?? "Unknown" },
    { field: "Race", value: item.race ?? "Unknown" },
    { field: "Sex", value: item.sex ?? "Unknown" },
    { field: "Hair", value: item.hair ?? "Unknown" },
    { field: "Eyes", value: item.eyes ?? "Unknown" },
    { field: "Classification", value: item.poster_classification ?? "Unknown" },
  ];

  return (
    <article className="prose mx-auto my-8">
      <Link to="/">
        <Button label="&larr; Back" />
      </Link>

      <h1>{item.title}</h1>
      <Image
        src={item.images[0]?.large}
        alt={item.title}
        className="my-4 w-full max-w-md rounded shadow"
      />

      <div className="space-y-4">
        {item.description && (
          <div>
            <strong>Description:</strong> {item.description}
          </div>
        )}
        {item.caution && (
          <div>
            <strong>Caution:</strong>{" "}
            <SafeHtml html={item.caution} className="mt-1 ml-4" />
          </div>
        )}
        {item.details && (
          <div>
            <strong>Details:</strong>{" "}
            <SafeHtml html={item.details} className="mt-1 ml-4" />
          </div>
        )}
        {item.remarks && (
          <div>
            <strong>Remarks:</strong>{" "}
            <SafeHtml html={item.remarks} className="mt-1 ml-4" />
          </div>
        )}
      </div>

      <div className="mt-6 px-40">
        <DataTable
          value={rows}
          stripedRows
          tableStyle={{ width: "100%", minWidth: "30rem" }}
        >
          <Column field="field" header="Field" style={{ width: "40%" }} />
          <Column field="value" header="Value" />
        </DataTable>
      </div>
    </article>
  );
}
