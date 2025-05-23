// src\pages\Home.tsx

import { useFilter } from "../contexts/FilterContext";
import { fetchWantedList } from "../api/api";
import type { WantedItem } from "../api/api";
import { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { useToast } from "../contexts/ToastContext";

export default function Home() {
  const { title, posterClassification, page, pageSize, setPage } = useFilter();
  const [items, setItems] = useState<WantedItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  // 1. Whenever filters change, reset back to page 1
  useEffect(() => {
    setPage(1);
  }, [title, posterClassification, pageSize, setPage]);

  useEffect(() => {
    setLoading(true);
    fetchWantedList({
      ...(title.trim() && { title: title.trim() }),
      poster_classification: posterClassification,
      page,
      pageSize,
    })
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        show({
          severity: "error",
          summary: "Failed to load wanted list",
          detail: err.message,
        });
        setItems([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [title, posterClassification, page, pageSize, show]);

  let content: React.ReactNode;
  if (loading) {
    content = (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (items.length === 0) {
    content = (
      <div className="flex flex-1 items-center justify-center">
        <h2 className="flex-1 py-10 text-center text-6xl">No results found</h2>
      </div>
    );
  } else {
    content = (
      <div className="grid flex-1 auto-rows-fr grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <Thumbnail key={item.uid} item={item} />
        ))}
      </div>
    );
  }

  return (
    <section className="flex flex-1 flex-col gap-4">
      <Pagination total={total} />
      {content}
      <Pagination total={total} />
    </section>
  );
}
