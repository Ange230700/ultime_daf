// src\components\Pagination.tsx

import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import { useFilter } from "../contexts/FilterContext";

interface PaginationProps {
  total: number;
}

export default function Pagination({ total }: Readonly<PaginationProps>) {
  const { page, setPage, pageSize, setPageSize } = useFilter();

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.page + 1);
    setPageSize(event.rows);
  };

  return (
    <div className="my-4 flex justify-center">
      <Paginator
        first={(page - 1) * pageSize}
        rows={pageSize}
        totalRecords={total}
        onPageChange={onPageChange}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        currentPageReportTemplate="{first}–{last} of {totalRecords}"
      />
    </div>
  );
}
