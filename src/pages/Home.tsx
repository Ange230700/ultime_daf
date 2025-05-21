// src\pages\Home.tsx

import { useFilter } from "../contexts/FilterContext";
import { fetchWantedList } from "../api/api";
import type { WantedItem } from "../api/api";
import { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

export default function Home() {
  const { title, posterClassification, page, pageSize, setPage } = useFilter();
  const [items, setItems] = useState<WantedItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
        console.error("Failed to load wanted list", err);
        setItems([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [title, posterClassification, page, pageSize]);

  let content: React.ReactNode;
  if (loading) {
    content = <Spinner />;
  } else if (items.length === 0) {
    content = (
      <h2 className="flex-1 py-10 text-center text-6xl">No results found</h2>
    );
  } else {
    content = (
      <div className="grid flex-1 gap-3 p-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Thumbnail key={item.uid} item={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      {content}
      <Pagination total={total} />
    </>
  );
}
