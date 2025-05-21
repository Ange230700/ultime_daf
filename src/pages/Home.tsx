// src\pages\Home.tsx

import { useFilter } from "../contexts/FilterContext";
import { fetchWantedList } from "../api/api";
import type { WantedItem } from "../api/api";
import { useEffect, useState } from "react";
import FiltersNav from "../components/FiltersNav";
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
      title,
      poster_classification: posterClassification,
      page,
      pageSize: 50,
    })
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [title, posterClassification, page]);

  let content: React.ReactNode;
  if (loading) {
    content = <Spinner />;
  } else if (items.length === 0) {
    content = <h2 className="text-center py-10">No results found</h2>;
  } else {
    content = (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {items.map((item) => (
          <Thumbnail key={item.uid} item={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="bg-gray-100">
        <div className="container mx-auto">
          <FiltersNav />
        </div>
      </section>

      {content}

      <Pagination total={total} />
    </>
  );
}
