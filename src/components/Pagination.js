"use client";

import { useState } from "react";

export default function PaginationComponent({ currentPage, totalPages }) {
    const [page, setPage] = useState(currentPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.location.search = `?page=${newPage}`;
        }
    };

    return (
        <div className="flex justify-center space-x-1 text-gray-800">
            {/* Previous page Button */}
            <button
                title="previous"
                type="button"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-gray-100 hover:bg-slate-900 ${
                    page === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/*Number button of pages we get from the total pages length*/}
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    type="button"
                    title={`Page ${i + 1}`}
                    onClick={() => handlePageChange(i + 1)}
                    className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md ${
                    page === i + 1
                        ? "bg-slate-800 text-white font-semibold"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            {/* Next page Button */}
            <button
                title="next"
                type="button"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:border-gray-100 hover:bg-slate-900 ${
                    page === totalPages ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4"
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}