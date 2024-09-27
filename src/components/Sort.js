"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * SortDropdown component that allows users to sort products based on selected criteria.
 * The sorting options are reflected in the URL query parameters and trigger a navigation update.
 *
 * @component
 * @returns {JSX.Element} A dropdown to select and apply sorting options.
 */
export default function SortDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedSort, setSelectedSort] = useState("id-asc");

    /**
   * useEffect hook that synchronizes the selected sorting option with the current URL parameters.
   * Updates the local state whenever the query parameters in the URL change.
   */
    useEffect(() => {
        const sortBy = searchParams.get("sortBy") || "id";
        const order = searchParams.get("order") || "asc";
        setSelectedSort(`${sortBy}-${order}`);
    },[searchParams])

    /**
   * Updates the URL with new sorting parameters and resets the page number to 1.
   *
   * @param {string} sortBy - The field by which to sort (e.g., "price", "id").
   * @param {string} order - The sort order (either "asc" or "desc").
   */
    const handleSort = (sortBy, order) => {
    const newQuery = new URLSearchParams(window.location.search); // Get the current URL query parameters
    newQuery.set('sortBy', sortBy); 
    newQuery.set('order', order); 
    newQuery.set("page", "1");

    // Navigate to the new URL with updated query parameters
    router.push(`?${newQuery.toString()}`);
    };

    return (
    <div className="inline-flex items-center divide-x  bg-cyan-700 text-gray-100 divide-gray-300 rounded-lg mt-2">
        <label htmlFor="sort" className="px-2 py-1 font-semibold">
            Sort by:{" "}
        </label>
        <select
            id="sort"
            value={selectedSort}
            onChange={(e) => {
                const [sortBy, order] = e.target.value.split("-");
                handleSort(sortBy, order);
                setSelectedSort(e.target.value);
            }}
            className="p-3 bg-cyan-700 text-white font-semibold rounded-r-lg focus:outline-none"
        >
        <option value="id-asc">Default</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
        </select>
    </div>
    );
}