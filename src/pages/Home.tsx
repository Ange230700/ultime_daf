// src\pages\Home.tsx

import { useFilter } from "../contexts/FilterContext";
import { fetchWantedList } from "../api/api";
import type { WantedItem } from "../api/api";
import { useEffect, useState } from "react";
import Thumbnail from "../components/Thumbnail";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

export default function Home() {
  const { title, posterClassification, page } = useFilter();
  const [items, setItems] = useState<WantedItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchWantedList({
      poster_classification: posterClassification,
      page,
      pageSize: 50,
    })
      .then((data) => {
        let fetched = data.items;
        if (title.trim().length > 0) {
          const lower = title.toLowerCase();
          fetched = fetched.filter((item) =>
            item.title.toLowerCase().includes(lower),
          );
        }
        setItems(fetched);
        setTotal(fetched.length);
      })
      .finally(() => setLoading(false));
  }, [title, posterClassification, page]);

  let content: React.ReactNode;
  if (loading) {
    content = <Spinner />;
  } else if (items.length === 0) {
    content = (
      <h2 className="flex-1 text-center py-10 text-6xl">No results found</h2>
    );
  } else {
    content = (
      <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
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
