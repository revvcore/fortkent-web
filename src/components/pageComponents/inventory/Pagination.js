"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalItems, itemsPerPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("p")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems <= itemsPerPage) return null;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", newPage);
    router.replace(`?${params.toString()}`);
  };

  // Helper to generate page numbers with ellipsis if needed
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, current, and neighbors
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (left > 2) {
        pages.push("...");
      }

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-4 items-center space-x-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-slate-100 rounded disabled:opacity-50"
      >
        <ChevronLeft className="inline-block size-4" />
      </button>
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-2 mx-1 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 rounded ${
              page === currentPage
                ? "bg-primary-500 text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-slate-100 rounded disabled:opacity-50"
      >
        <ChevronRight className="inline-block size-4" />
      </button>
    </div>
  );
}
