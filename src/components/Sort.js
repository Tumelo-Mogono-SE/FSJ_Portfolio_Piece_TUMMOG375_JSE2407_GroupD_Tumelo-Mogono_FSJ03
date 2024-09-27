"use client"
import { useRouter } from "next/navigation";

export default function SortDropdown() {
    const router = useRouter();

    const handleSort = (sortBy, order) => {
    const newQuery = new URLSearchParams(window.location.search); // Get the current URL query parameters
    newQuery.set('sortBy', sortBy); 
    newQuery.set('order', order); 
    newQuery.set("page", "1");

    // Navigate to the new URL with updated query parameters
    router.push(`?${newQuery.toString()}`);
    };

    return (
    <div className="flex sm:w-[95%] max-w-[21rem] md:w-full">
        <label htmlFor="sort" className="w-20 my-auto font-semibold">
            Sort by:{" "}
        </label>
        <select
            id="sort"
            onChange={(e) => {
                const [sortBy, order] = e.target.value.split("-");
                handleSort(sortBy, order);
            }}
            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
        <option value="id-asc">Default</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
        </select>
    </div>
    );
}