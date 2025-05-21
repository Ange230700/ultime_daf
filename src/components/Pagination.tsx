// src\components\Pagination.tsx

import { useFilter } from "../contexts/FilterContext";

export default function Pagination({
  total,
  pageSize = 50,
}: Readonly<{
  total: number;
  pageSize?: number;
}>) {
  const { page, setPage } = useFilter();
  const maxPage = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ←
      </button>

      <span>
        Page {page} / {maxPage}
      </span>

      <button
        disabled={page >= maxPage}
        onClick={() => setPage(page + 1)}
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
}
