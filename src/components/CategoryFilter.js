"use client";
import { useRouter } from "next/navigation";

export default function Filter({ categories, selectedCategory }) {
    const router = useRouter();

    const toggleDropdown = () => {
    const dropDown = document.getElementById("dropdown");
    dropDown.classList.toggle("hidden");
    };

    const handleFilter = (category) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", category);
    searchParams.set("page", "1");

    // Update the URL with the selected category
    router.push(`?${searchParams.toString()}`);
    
    // Close the dropdown
    toggleDropdown();
    };

    return (
    <form >
        <div className="flex w-full md:w-auto md:mb-0 relative">
        <button
            onClick={toggleDropdown}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4  font-semibold text-center text-gray-100 bg-cyan-700 border border-cyan-700 rounded-lg hover:bg-cyan-900 "
            type="button"
        >
            {selectedCategory || "All categories"}
            <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
            />
            </svg>
        </button>
        <div
            id="dropdown"
            className="z-10 absolute top-[100%] hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
            <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
            >
            <li
                onClick={() => handleFilter("")}
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
            >
                All categories
            </li>
            {categories.map((name) => (
                <li key={name}>
                <button
                    onClick={() => handleFilter(name)}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                >
                    {name}
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    </form>
    );
}